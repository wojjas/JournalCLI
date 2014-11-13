/**
 * Logger that logs messages, log entries.
 */
var log = angular.module('log', []);

log.controller('Log', ['$scope', 'messenger',
    function ($scope, messenger) {

        //Create time stamp of now on format HH:mm:ss:zzz where zzz are milliseconds.
        function nowTimeStamp() {
            var now = new Date();
            var zeroPaddedMilliseconds;
            var milliseconds = now.getMilliseconds().toString();

            switch (milliseconds.length) {
                case 1:
                    zeroPaddedMilliseconds = ('00' + milliseconds).slice(-3);
                    break;
                case 2:
                    zeroPaddedMilliseconds = ('0' + milliseconds).slice(-3);
                    break;
                default:
                    zeroPaddedMilliseconds = milliseconds;
            }
            return ('0' + now.getHours()).slice(-2) + ":" +
                ('0' + now.getMinutes()).slice(-2) + ":" +
                ('0' + now.getSeconds()).slice(-2) + ":" +
                zeroPaddedMilliseconds;
        }

        var logEntries = [];

        $scope.logEntries = logEntries;
        $scope.maxNofEntries = 10;

        $scope.$watch(function(){return messenger.getData().id}, function () {
            if (messenger.getData() && messenger.getData().message) {
                if(logEntries.length === $scope.maxNofEntries){
                    logEntries.shift();
                }
                logEntries.push(nowTimeStamp() + ' - ' + messenger.getData().message);
            }
        });

    }]);