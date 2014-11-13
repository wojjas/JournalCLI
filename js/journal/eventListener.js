/**
 * Listens for and logs Application Cache events.
 */
(function () {
    'use strict';

    angular
        .module('eventListener')
        .controller('EventListener', ['$scope', 'messenger', EventListener]);

        function EventListener($scope, messenger) {

            messenger.setData('Window Load');

            //Setup Event handlers if application cache exists:
            if(Modernizr.applicationcache){
                window.applicationCache.onupdateready = function (e) {
                    messenger.setData('Update Ready');
                    messenger.setData('Swapping Cache');
                    applicationCache.swapCache(); //Really needed?

                    //Automatically reload the page:
                    //location.reload();
                };

                window.applicationCache.onchecking = function (e) {
                    messenger.setData('Checking');
                };

                window.applicationCache.onnoupdate = function (e) {
                    messenger.setData('NoUpdate');
                };

                window.applicationCache.oncached = function (e) {
                    messenger.setData('Cached');
                };

                window.applicationCache.onobsolete = function (e) {
                    messenger.setData('Obsolete');
                };

                window.applicationCache.ondownloading = function (e) {
                    messenger.setData('Downloading');
                };

                window.applicationCache.onerror = function (e) {
                    messenger.setData('Error');
                };
            }
        }
})();

