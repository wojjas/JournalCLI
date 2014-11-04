JournalCLI
==========

A notebook for misc purposes, client side.

Techniques demonstrated:
========================
AngularJS.
Application Cache, used for real offline-web-application solution.
CORS, Client and Server can be hosted from different domains.
"Offline detection", Ajax call verify that server (for saving messages etc.) 
is responding (=is connected)

Known issues:
=============
Synchronous Ajax-calls to check connection are made on GUI thread. This makes GUI freeze.
Reproduce by stopping server. Or make server take its time responding :-) (System.Threading.Thread.Sleep(8000);)

Checking connectivity (not carrying about error cause) continues to do ajax-get-calls 
thus uses bandwidth (for the get-request). 
Possible solutions:
    Check more seldom if offline. 
    Let user initiate check. 
    Use sockets to communicate.
