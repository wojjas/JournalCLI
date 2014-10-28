/**
 * Created by Wojtek on 2014-10-21.
 */

var log;

function logEvent(msg) {
    //TODO: replace this DOM-manipulation with AngularJS binding.
    log.html(log.html() + "<li>" + msg + "</li>");
}

$(function () {
//    if(window.applicationCache){
    if(Modernizr.applicationcache){
        log = $("#log");

        if(!document.getElementById("log")){
            alert("ERROR: An event log container is required.");
        }


        window.applicationCache.onchecking = function (e) {
            logEvent('Checking');
        }

        window.applicationCache.onnoupdate = function (e) {
            logEvent('NoUpdate');
        }

        window.applicationCache.oncached = function (e) {
            logEvent('Chached');
        }

        window.applicationCache.onobsolete = function (e) {
            logEvent('Obsolete');
        }

        window.applicationCache.ondownloading = function (e) {
            logEvent('Downloading');
        }

        window.applicationCache.onerror = function (e) {
            logEvent('Error');
        }

        logEvent('Window Load');
    }

})


