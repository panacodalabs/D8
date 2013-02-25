module("D8");
test( "yesterday test", function() {

    var yesterdayStartsAtMidnight = function() {
        var date = D8.create('01.01.2010');
        for(var i=0; i < 1500; i++) {
            date = date.yesterday();
            if(date.format('HH') !== 0) {
                return false;
            }
        }
        return true;
    }

    var yesterdayIsThePreviousDay = function() {
        var date = D8.create('01.01.2010');
        for(var i=0; i < 1500; i++) {
            var dateTimestamp = date.date.timeStamp;
            date = date.yesterday();
            if((dateTimestamp - 86400000) == date.date.timeStamp) {
                return false;
            }
        }
        return true;
    }

	ok( yesterdayStartsAtMidnight(), 'Yesterday starts at Midnight.' );
	ok( yesterdayIsThePreviousDay(), 'Yesterday is the previous day.' );
});