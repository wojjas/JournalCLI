var box;
var messages = [];

function isOnLine() {
    return navigator.onLine;
}

function reportOnlineStatus(){
    $("#onlineStatus").html((isOnLine() ? "Yes" : "No"));
}

function storeMessage(){
    var message = box.val();
    if(!isOnLine()){
        storeMessageLocal(message);
    }
    else{
        storeMessageRemote(message);
    }
}
function storeMessageLocal(msg){
    messages.push(msg);
    clearUI();
    logEvent('Message saved locally: "' + msg + '"');
}
function storeMessageRemote(msg){
    messages.push(msg);
    sendMessagesToServer();
    clearUI();
}

function sendMessagesToServer(){
    var serviceUrl = "http://localhost:56962/api/Message/post";
    var type = "POST";

    messages.reverse();
    while(messages.length > 0){
        var msg = messages.pop();
        var data = {message: msg};

        $.ajax({
            type: type,
            url: serviceUrl,
            data: data
        }).done(function (responseData) {
            logEvent(responseData.Status);
        }).error(function (jqXHR, textStatus, errorThrown) {
            logEvent(jqXHR.responseText || textStatus);
        });



//            $.post("/messages/save", {"Message": msg}, function(e){
//                logEvent(e.status);
//            }, "json");

//        $.post("http://localhost:64411/api/Message/post", {"Message": msg}, function(e){
//            logEvent(e.Status);
//        }, "json");

        //http://localhost:49992/Home/Index         //this gets us to the server but it returns an 404.
        //http://localhost:49992/api/Message/get
    }
}

function clearUI(){
    box.val("");
    box.focus();
}

$(function(){
    if(Modernizr.applicationcache){
        box = $("#journalText");

        //Event handlers:
        $("#sendButton").click(function(e){
            storeMessage();
        });

        //Event listeners:
        window.applicationCache.onupdateready = function (e) {
            logEvent("update ready");
            logEvent("swapping cache");
            applicationCache.swapCache();
        };

        window.addEventListener("online", function(e){
            reportOnlineStatus();
            sendMessagesToServer();
        }, true);

        window.addEventListener("offline", function (e) {
            reportOnlineStatus();
        }, true);

        reportOnlineStatus();
    }
})
