/**
 * For inter-controller-communication.
 * Listening controllers should use:
 * $scope$watch(function() {return Messenger.getData().id}, ...
 */
app.factory('Messenger', function($rootScope){
    var data = {
        id: false,
        message: '',
        setMessage: function (msg) {
            this.id = !this.id;
            this.message = msg;
        }
    };

    return{
        setData:function(message){
            data.setMessage(message);

            //Needed to make $watch():es aware if data set from code.
            if (!$rootScope.$$phase) {
                $rootScope.$apply();
            }
        },

        getData:function(){
            return data;
        }
    }
});
