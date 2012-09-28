# Profiler

RingoJS comes with a [profiler module](/api/master/ringo/profiler) which allows to measure execution time of JavaScript functions. 

To make the profiler work you need to run in interpreter mode, i.e. with -o/--optlevel set to -1:

    ringo -o -1

The [profiler middleware](/api/master/ringo/middleware/profiler) will try to do that for you by restarting request evaluation in interpreter mode, but since most modules in RingoJS are now shared that will result in profiling to be applied to very few modules.

Once you are running in interpreter mode, the easiest way to profile your code is to use the [profile function](/api/master/ringo/profiler#profile) exported by `ringo/profiler`. Simply pass a function to it, and it returns an object containing the result returned or error thrown by function evaluation as well as the profiler containing its evaluation data.