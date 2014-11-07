/**
 * Created by Wojtek on 2014-11-07.
 */

app.factory('Logger', function ($rootScope) {
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
        var timeStamp =
            ('0' + now.getHours()).slice(-2) + ":" +
            ('0' + now.getMinutes()).slice(-2) + ":" +
            ('0' + now.getSeconds()).slice(-2) + ":" +
            zeroPaddedMilliseconds;
        return timeStamp;
    }

    var Message = function Message(){
        var messages = [];

        return{
            logMessage: function (message) {
                messages.push(nowTimeStamp() +" - " + message);
                $rootScope.$broadcast('newLogMessage', messages);
            }
        };
    };

    return new Message();
});