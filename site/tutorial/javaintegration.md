Scripting Java with JavaScript
=================

Storing the revisions as full text is wasteful. We could just store the *differences* between the revisions. Typical diff algorithms you might know from version control system only deal with per-line differences. For natural text this is not very useful. We want to see character by character changes.

The "google-diff-match-patch" library does just that. It is available in multiple languages - even JavaScript - but for performance reasons and because I want to talk about Java integration, we will use the Java version.

<div class="knowmore">

   If you wonder what "character by character changes" mean, try the demo here: <http://neil.fraser.name/software/diff_match_patch/svn/trunk/demos/demo_diff.html>.


   Mention <http://mozilla.org/rhino/ScriptingJava.html> and other resources

</div>

[Download the zip file](code.google.com/p/google-diff-match-patch/downloads/) and extract the java file "java/diff_match_patch.java" into a new directory "./lib" in our wiki directory. Then compile the java file with (I assume you have a Java Development Kit installed!)

    $ javac diff_match_patch.java
   
   
// FIXME to be continued