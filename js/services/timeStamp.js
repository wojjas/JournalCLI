(function () {
    'use strict;'

    app.factory('timeStamp', function(){

        var service = {
            now: now
        }

        return service;


        //Create time stamp of now on format HH:mm:ss:zzz where zzz are milliseconds.
        function now() {
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
    });
})();
