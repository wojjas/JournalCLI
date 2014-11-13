/**
 * Created by Wojtek on 2014-11-07.
 */
/**
 * Listens for and logs Application Cache events.
 */
var eventListener = angular.module('EventListener', []);

eventListener.controller('OfflineEventsCtrl', ['$scope', 'Messenger',
    function OfflineEventsCtrl($scope, Messenger) {

        Messenger.setData('Window Load');

        //Setup Event handlers if application cache exists:
        if(Modernizr.applicationcache){
            window.applicationCache.onupdateready = function (e) {
                Messenger.setData('Update Ready');
                Messenger.setData('Swapping Cache');
                applicationCache.swapCache(); //Really needed?

                //Automatically reload the page:
                //location.reload();
            };

            window.applicationCache.onchecking = function (e) {
                Messenger.setData('Checking');
            };

            window.applicationCache.onnoupdate = function (e) {
                Messenger.setData('NoUpdate');
            };

            window.applicationCache.oncached = function (e) {
                Messenger.setData('Cached');
            };

            window.applicationCache.onobsolete = function (e) {
                Messenger.setData('Obsolete');
            };

            window.applicationCache.ondownloading = function (e) {
                Messenger.setData('Downloading');
            };

            window.applicationCache.onerror = function (e) {
                Messenger.setData('Error');
            };
        }
    }]);


