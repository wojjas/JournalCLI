/**
 * For inter-controller-communication.
 * Listening controllers should use:
 * $scope$watch(function() {return messenger.getData().id}, ...
 */
(function(){
    'use strict';

    app.factory('messenger', function($rootScope){
        var data = {
            touchedFlag: false,
            message: '',
            setMessage: setMessage
        };

        var service = {
            setData: setData,
            getData: getData
        };

        return service;


        function setData(message){
            data.setMessage(message);

            //Needed to make $watch():es aware if data set from code.
            if (!$rootScope.$$phase) {
                $rootScope.$apply();
            }
        }
        function getData(){
            return data;
        }

        function setMessage(message) {
            data.touchedFlag = !data.touchedFlag;
            data.message = message;
        }
    });
})();
