module("D8");
test( "tomorrow test", function() {

    var tomorrowStartsAtMidnight = function() {
        var date = D8.create('01.01.2010');
        for(var i=0; i < 1500; i++) {
            date = date.tomorrow();
            if(date.format('HH') !== 0) {
                return false;
            }
        }
        return true;
    }

    var tomorrowIsTheDayFollowingToday = function() {
        var date = D8.create('01.01.2010');
        for(var i=0; i < 1500; i++) {
            var dateTimestamp = date.date.timeStamp;
            date = date.tomorrow();
            if((dateTimestamp + 86400000) == date.date.timeStamp) {
                return false;
            }
        }
        return true;
    }

	ok( tomorrowStartsAtMidnight(), 'Tomorrow starts at Midnight.' );
	ok( tomorrowIsTheDayFollowingToday(), 'Tomorrow is the day following today' );
});