test('D8 static properties', function() {

    ok(D8.hasOwnProperty('now'), 'D8.now is defined.');
    ok(typeof D8.now === 'function', 'D8.now() is a function.');

    ok(D8.hasOwnProperty('getCalendarWeek'), 'D8.getCalendarWeek is defined.');
    ok(typeof D8.getCalendarWeek === 'function', 'D8.getCalendarWeek() is a function.');

    ok(D8.hasOwnProperty('getCalendarWeekByDate'), 'D8.getCalendarWeekByDate is defined.');
    ok(typeof D8.getCalendarWeekByDate === 'function', 'D8.getCalendarWeekByDate() is a function.');

    ok(D8.hasOwnProperty('getDatesOfCalendarWeek'), 'D8.getDatesOfCalendarWeek is defined.');
    ok(typeof D8.getDatesOfCalendarWeek === 'function', 'D8.getDatesOfCalendarWeek() is a function.');

    ok(D8.hasOwnProperty('getDateByWeekdayAndCalendarWeek'), 'D8.getDateByWeekdayAndCalendarWeek is defined.');
    ok(typeof D8.getDateByWeekdayAndCalendarWeek === 'function', 'D8.getDateByWeekdayAndCalendarWeek() is a function.');

    ok(D8.hasOwnProperty('create'), 'D8.create is defined.');
    ok(typeof D8.create === 'function', 'D8.create() is a function.');

    ok(D8.hasOwnProperty('isLeapYear'), 'D8.isLeapYear is defined.');
    ok(typeof D8.isLeapYear === 'function', 'D8.isLeapYear() is a function.');

    ok(D8.hasOwnProperty('isDST'), 'D8.isDST is defined.');
    ok(typeof D8.isDST === 'function', 'D8.isDST() is a function.');
});

test('Object properties', function() {

    var date = new D8();

    ok(date.hasOwnProperty('addDays'), 'addDays is defined.');
    ok(typeof date.addDays === 'function', 'addDays() is a function.');

    ok(date.hasOwnProperty('addHours'), 'addHours is defined.');
    ok(typeof date.addHours === 'function', 'addHours() is a function.');

    ok(date.hasOwnProperty('addMinutes'), 'addMinutes is defined.');
    ok(typeof date.addMinutes === 'function', 'addMinutes() is a function.');

    ok(date.hasOwnProperty('addSeconds'), 'addSeconds is defined.');
    ok(typeof date.addSeconds === 'function', 'addSeconds() is a function.');

    ok(date.hasOwnProperty('addMilliseconds'), 'addMilliseconds is defined.');
    ok(typeof date.addMilliseconds === 'function', 'addMilliseconds() is a function.');

    ok(date.hasOwnProperty('tomorrow'), 'tomorrow is defined.');
    ok(typeof date.tomorrow === 'function', 'tomorrow() is a function.');

    ok(date.hasOwnProperty('yesterday'), 'yesterday is defined.');
    ok(typeof date.yesterday === 'function', 'yesterday() is a function.');

    ok(date.hasOwnProperty('getTimestamp'), 'getTimestamp is defined.');
    ok(typeof date.getTimestamp === 'function', 'getTimestamp() is a function.');

    ok(date.hasOwnProperty('timeBetween'), 'timeBetween is defined.');
    ok(typeof date.timeBetween === 'function', 'timeBetween() is a function.');

    ok(date.hasOwnProperty('getCalendarWeek'), 'getCalendarWeek is defined.');
    ok(typeof date.getCalendarWeek === 'function', 'getCalendarWeek() is a function.');

    ok(date.hasOwnProperty('format'), 'format is defined.');
    ok(typeof date.format === 'function', 'format() is a function.');

    ok(date.hasOwnProperty('getDatesOfCalendarWeek'), 'getDatesOfCalendarWeek is defined.');
    ok(typeof date.getDatesOfCalendarWeek === 'function', 'getDatesOfCalendarWeek() is a function.');

    ok(date.hasOwnProperty('isLeapYear'), 'isLeapYear is defined.');
    ok(typeof date.isLeapYear === 'function', 'isLeapYear() is a function.');

    ok(date.hasOwnProperty('isDST'), 'isDST is defined.');
    ok(typeof date.isDST === 'function', 'isDST() is a function.');

    /* cleanup */
    date = null;
});