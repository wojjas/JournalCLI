(function () {
    'use strict;'

    angular
        .module('journal')
        .controller('Journal', ['$scope', 'messenger', Journal]);

        function Journal($scope, messenger) {

            var server = {
                //"http://localhost:56962/api/message/"
                //"http://localhost:8081/api/message/"
                //"http://journal.wojjas.com/api/message/"
                url: 'http://journal.wojjas.com/api/message/',
                isConnected: false,
                setIsConnected: function (trueOrFalse) {
                    this.isConnected = trueOrFalse;
                    this.checkingConnection = false;
                    this.setContinuousChecking();
                },
                //Checks if connection with server of interest is up.
                //checkRequestedExplicitly if true, the request for checking came explicitly and
                //not from a periodical check that happens every XX seconds.
                checkConnection: function (async, sendLocallyStored) {
                    if(this.checkingConnection){
                        return;
                    }
                    this.checkingConnection = true;
                    var that = this;

                    $.ajax({
                        type: 'GET',
                        url: this.url,
                        cached: false,
                        async: async,   //According to spec this shouldn't work for CORS, but it does.
                        timeout: 1500
                    }).done(function (responseData) {
                        log('Server response: ' + responseData, true);
                        if(responseData === 'Happy-Clappy'){
                            that.setIsConnected(true);
                            if(sendLocallyStored){
                                $scope.$apply(); //TODO: use a watch instead?
                                server.sendMessage(message);
                            }
                        }
                        else{
                            that.setIsConnected(false);
                            log('Server responded but not with the expected message', true);
                        }
                    }).error(function (jqXHR, textStatus, errorThrown) {
                        var exception = '';
                        if(errorThrown){
                            exception = ", error thrown: " + errorThrown;
                        }
                        log(jqXHR.responseText || textStatus + exception, true);

                        that.setIsConnected(false);
                    });
                },
                continuousConnectionChecking: undefined,
                setContinuousChecking: function () {
                    //It costs bandwidth to continuously verify with get-requests when we are online.
                    //Check is made before each send-attempt.
                    if(this.isConnected){
                        clearInterval(this.continuousConnectionChecking);
                        this.continuousConnectionChecking = undefined;
                    }
                    else if(this.continuousConnectionChecking === undefined){
                        this.continuousConnectionChecking = setInterval(function(){server.checkConnection(true, true)}, 6000);
                    }
                },
                checkingConnection: false,
                connectionLastChecked: '',

                sendMessage: function(messageObject) {
                    var messages = messageObject.messages;
                    //Clone to a local variable:
                    var messagesLocal = messages.slice(0, messages.length);

                    messagesLocal.reverse();
                    while (messagesLocal.length > 0) {
                        var msg = messagesLocal.pop();
                        var data = {message: msg};

                        $.ajax({
                            type: "POST",
                            url: this.url,
                            data: data,
                            dataType: 'json'
                        }).done(function (responseData) {
                            log(responseData.Status);
                            messageObject.removeMessage();
                        }).error(function (jqXHR, textStatus, errorThrown) {
                            var exception = '';
                            if(errorThrown){
                                exception = ", error thrown: " + errorThrown;
                            }

                            log(jqXHR.responseText || textStatus + exception);
                        });
                    }
                },
                isConnectedString: function () {
                    return this.isConnected ? "Yes" : "No";
                }
            };

            var message = {
                messages: [],
                message:'',

                addMessage: function(){
                    this.messages.push(this.message);
                    window.localStorage['messages'] = JSON.stringify(this.messages);
                },
                removeMessage: function () {
                    this.messages.shift(); //shift() from original what was pop()'ed from reversed clone.
                    window.localStorage['messages'] = JSON.stringify(this.messages);
                }
            }

            function log(message, hideFromEventLog){
                var hideFromEventLog = hideFromEventLog;

                if(!hideFromEventLog){
                    messenger.setData(message);
                }
                console.debug(message);
            }


            $scope.server = server;

            if(window.localStorage['messages']){
                message.messages = JSON.parse(window.localStorage['messages']);

                for(var i = 0, len = message.messages.length; i < len; i++ ){
                    //TODO: Not working yet. Probably no listening LogCtrl at this point.
                    log('Saved locally: "' + message.messages[i] + '"');
                }

                server.checkConnection(true, true);
            }
            $scope.message = message;
            $scope.debugMode = false;

            server.checkConnection(false, false);
            server.setContinuousChecking();

            //Event handlers:
            $scope.handleSendClick = function () {
                message.addMessage();
                server.checkConnection(false, false);

                if (server.isConnected){
                    server.sendMessage(message);
                }
                else{
                    log('Saved locally: "' + message.message + '"');
                }

                //Message has been sent and displayed, clear it.
                message.message = '';

                //TODO: use Angular directive to focus to the message-box:
                // good ex: (http://stackoverflow.com/questions/25698697/angularjs-set-focus)
                var box = $("#journalText");
                box.focus();
            };
        }
})();



