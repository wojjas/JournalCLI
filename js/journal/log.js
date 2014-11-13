/**
 * Logger that logs messages, log entries.
 */
(function(){
    'use strict';

    angular
        .module('log')
        .controller('Log', ['$scope', 'messenger', 'timeStamp', Log]);

    function Log($scope, messenger, timeStamp) {

        var logEntries = [];

        $scope.logEntries = logEntries;
        $scope.maxNofEntries = 10;

        $scope.$watch(function(){return messenger.getData().touchedFlag}, function () {
            if (messenger.getData() && messenger.getData().message) {
                if(logEntries.length === $scope.maxNofEntries){
                    logEntries.shift();
                }
                logEntries.push(timeStamp.now() + ' - ' + messenger.getData().message);
            }
        });
    }
})();

