# Ringo with Spring

Because there is more talk about using Spring and Ringo together, Jim Cook thought he would [share][1] some code they use to make it easy to get a reference to the Spring `ApplicationContext` from within your controllers. In a Java controller, you usually get a reference to Spring's context in your Servlet's `init()` method because you end up calling a static helper function and passing in your `ServletConfig`. Ringo adheres to the JSGI specification which is agnostic to how infrastructure like Spring is made available to the controller layer.

Ringo uses the `org.ringojs.jsgi.JsgiServlet` class to bootstrap the SSJS environment. We extend this class to provide some Spring helper functions that can be accessed from a Ringo controller.

    package org.ringojs.jsgi;

    import org.springframework.context.ApplicationContext;
    import org.springframework.web.context.support.WebApplicationContextUtils;

    import javax.servlet.ServletConfig;
    import javax.servlet.ServletContext;
    import javax.servlet.ServletException;

    public class ExtJsgiServlet extends JsgiServlet {

        private ApplicationContext _springContext;

        @Override
        public void init(ServletConfig config) throws ServletException {
            super.init(config);
            final ServletContext context = config.getServletContext();
            _springContext = WebApplicationContextUtils
                    .getRequiredWebApplicationContext(context);
        }

        public ApplicationContext getSpringContext() {
            return _springContext;
        }

        public Object getBean(String name) {
            return _springContext.getBean(name);
        }
    }

In order to launch your Ringo web application using this servlet, you simply replace the `JsgiServlet` with `ExtJsgiServlet`.

## web.xml

    <servlet>
        <servlet-name>ringo</servlet-name>
        <servlet-class>org.ringojs.jsgi.ExtJsgiServlet</servlet-class>
        <init-param>
            <param-name>optlevel</param-name>
            <param-value>0</param-value>
        </init-param>
    </servlet>

    <servlet-mapping>
        <servlet-name>ringo</servlet-name>
        <url-pattern>/*</url-pattern>
    </servlet-mapping>

The cool thing is that the Servlet instance (the `ExtJsgiServlet` class) is now available to your controller using the `request.env` property. The 'env' property is part of the JSGI specification and it is the place where all of the custom keys used by the server or middleware MUST be placed. So, here is what your controller might look like:

    app.post('/profiles/:profileId', function (req, profileId) {
        // Get access to the servlet using the 'env' garbage dump property.
        var servlet = req.env.servlet;

        // Use the servlet's getBean(String) function to
        // retrieve a configured bean from Spring.
        var datasource = servlet.getBean('datasource');

        // Or maybe you are using Spring's reloadable resource bundles for
        // externalizing your website's localized content.
        var context = servlet.getSpringContext();
        var welcomeMessage = context
                .getMessage('welcome', null, req.env.servletRequest.locale);
    });

You may notice that the `welcomeMessage` example uses another property stored on the context; the servlet request. It's funny how the JSGI specification does not mention Locale. It is so important to globalization. At least Ringo has made it accessible by exposing the original Java servlet request object off the `env` property...

  [1]: https://groups.google.com/group/ringojs/browse_frm/thread/2ded4b08c2fd6571?hl=en