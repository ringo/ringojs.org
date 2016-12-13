# Changelog for RingoJS 0.10

Release date: 27 November 2013

## New features and major changes

 * chainable [JSGI response helpers](https://ringojs.org/api/v0.10/ringo/jsgi/response/)
 * Httpclient:
   * prevent exception if response body is empty
   * new connectTimeout and readTimeout (see [request](https://ringojs.org/api/v0.10/ringo/httpclient/#request))
 * new [Websocket.sendBinary()](https://ringojs.org/api/v0.10/ringo/httpserver/#WebSocket.prototype.sendBinary)
 * fix `ringo-admin --force` not working on Windows
 * promise improvements:
  * PromiseList can now take a string of promises, or an array of promises
  * new `syncCallbacks` argument [WorkerPromise](https://ringojs.org/api/master/ringo/worker/#WorkerPromise)
 * JVM shutdown hook fails gracefully on google appengine
 * fix [quarterInYear](https://ringojs.org/api/master/ringo/utils/dates/#quarterInYear) calculation
 * Ringo Worker retrieval fixed for situations where code execution is triggered by a thread outside of Ringo's control
 * various additions and improvements to our unit tests

## Contributors

  * Jim Cook
  * Robert Gaggl
  * Bill Lee
  * Fabien Meghazi
  * Philipp Naderer
  * Siarhei Nekhviadovich
  * Simon Oberhammer
  * Hannes Wallnöfer