/**
 * Created by Wojtek on 2014-11-07.
 */
/**
 * Listens for and logs Application Cache events.
 */
var eventListener = angular.module('EventListener', []);

eventListener.controller('OfflineEventsCtrl', ['$scope', 'Logger', '$timeout',
    function ($scope, Logger, $timeout) {

        $scope.$on('newLogMessage', function (event, messages) {
            $scope.detectedEvents = messages;
            //Scope needs to be updated at any time this event is handled.
            //We can't just call $scope.$watch(), we have to use $timeout with 0 so that
            //it gets scheduled to fire as soon as possible.
            $timeout(
                $scope.$watch('detectedEvents', function () { }),
                0);
        });

        Logger.logMessage('Window Load');

        //Setup Event handlers if application cache exists:
        if(Modernizr.applicationcache){
            window.applicationCache.onupdateready = function (e) {
                Logger.logMessage('Update Ready');
                Logger.logMessage('Swapping Cache');
                applicationCache.swapCache(); //Really needed?

                //Automatically reload the page:
                //location.reload();
            }

            window.applicationCache.onchecking = function (e) {
                Logger.logMessage('Checking');
            }

            window.applicationCache.onnoupdate = function (e) {
                Logger.logMessage('NoUpdate');
            }

            window.applicationCache.oncached = function (e) {
                Logger.logMessage('Chached');
            }

            window.applicationCache.onobsolete = function (e) {
                Logger.logMessage('Obsolete');
            }

            window.applicationCache.ondownloading = function (e) {
                Logger.logMessage('Downloading');
            }

            window.applicationCache.onerror = function (e) {
                Logger.logMessage('Error');
            }
        }
    }]);


