var app = angular.module('Journal', []);

app.controller('JournalCtrl', ['$scope', function ($scope) {

    var server = {
      sendMessage: function(messages) {
          var serviceUrl = "http://localhost:56962/api/Message/post";
          var type = "POST";

          messages.reverse();
          while (messages.length > 0) {
              var msg = messages.pop();
              var data = {message: msg};

              $.ajax({
                  type: type,
                  url: serviceUrl,
                  data: data,
                  dataType: 'json'
              }).done(function (responseData) {
                  logEvent(responseData.Status);
              }).error(function (jqXHR, textStatus, errorThrown) {
                  logEvent(jqXHR.responseText || textStatus);
              });
          }
      },
      isConnectedString: function () {
          return navigator.onLine ? "Yes" : "No";
      },
      isConnectedBool: function () {
          return navigator.onLine;
      }
    };

    var message = {
        messages: [],
        message:'',

        addMessage: function(){
            this.messages.push(this.message);
        }
    }

    $scope.server = server;
    $scope.message = message;
    $scope.debugMode = false;


    //Event handlers:
    $scope.handleSendClick = function () {
        message.addMessage();

        if (server.isConnectedBool()){
            server.sendMessage(message.messages);
        }
        else{
            logEvent('Message saved locally: "' + message.message + '"');
        }

        message.message = '';

        //TODO: use directive to focus to the message-box:
        // good ex: (http://stackoverflow.com/questions/25698697/angularjs-set-focus)
        var box = $("#journalText");
        box.focus();
    };

    if(Modernizr.applicationcache){
        window.applicationCache.onupdateready = function (e) {
            logEvent("update ready");
            logEvent("swapping cache");
            applicationCache.swapCache();
        };

        window.addEventListener("offline", function (e) {
            $scope.$apply();
        }, true);

        window.addEventListener("online", function(e){
            $scope.$apply();
            server.sendMessage(message.messages);
        }, true);
    }
}]);

