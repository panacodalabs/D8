var date, date2, date3;

wruTest.test([
    {
        name: "add...",
        setup: function() {
            date = new D8();
            date2 = new Date();
        },
        test: function () {
            for (var i = 0; i < 10000; i += 95) {
                wruTest.assert("Day: " + date.addDays(i).format('dd.mm.yy'), date2.getTime() + (1000 * 60 * 60 * 24 * i) === date.addDays(i).getTimestamp());
                wruTest.assert("Day: ", date.addDays(i * 10).format('dd.mm.yy'), date2.getTime() + (1000 * 60 * 60 * 24 * i * 10) === date.addDays(i * 10).getTimestamp());

                wruTest.assert("Hour: " + date.addDays(i).format('dd.mm.yy'), date2.getTime() + (1000 * 60 * 60 * i) === date.addHours(i).getTimestamp());
                wruTest.assert("Hour: ", date.addDays(i * 10).format('dd.mm.yy'), date2.getTime() + (1000 * 60 * 60 * i * 10) === date.addHours(i * 10).getTimestamp());

                wruTest.assert("Minute: " + date.addDays(i).format('dd.mm.yy'), date2.getTime() + (1000 * 60 * i) === date.addMinutes(i).getTimestamp());
                wruTest.assert("Minute: ", date.addDays(i * 10).format('dd.mm.yy'), date2.getTime() + (1000 * 60 * i * 10) === date.addMinutes(i * 10).getTimestamp());

            }
        }
    },
    {
        name: "leap years",
        setup: function() {
            date = D8.create('01.01.2000');
        },
        test: function () {
            for (var i = 0; i < 1000; i++) {
                wruTest.assert('Year ' + date.format('dd.mm.yyyy'), date.format('dd.mm.') === '01.01.');
                //every four years, besides every 100 years, but every 400 years
                if (((i % 4) === 0 && i % 100 !== 0) || i % 400 === 0) {
                    wruTest.assert('isLeapYear', date.isLeapYear());
                    date = date.addDays(366);

                } else {
                    date = date.addDays(365);
                }
            }
        }
    },
    {
        name: "timebetween",
        setup: function() {
            date = D8.create('01.01.2012');
            date2 = D8.create('01.01.2012');
            date3 = D8.create('01.01.2012');
        },
        test: function () {
            for (var i = 0; i < 500; i++) {
                wruTest.assert('TimeBetween ' + date.timeBetween(date2), date2.timeBetween(date, 'hours') === i);
                date = date.addHours(1);

                wruTest.assert('TimeBetween ' + date.timeBetween(date2), date2.timeBetween(date3, 'days') === i);
                date3 = date3.addDays(1);
            }
        }
    },
    {
        name: "calendar week",
        setup: function() {
            //start on Thuesday
            date = D8.create('05.01.2012');
        },
        test: function () {
            for (var i = 0; i < 150; i++) {
                wruTest.assert('calendar week ' + date.format('dd.mm.yyyy')
                    + ' i: ' + (i % 52) + 1 + ' week: ' + date.getCalendarWeek(),
                    date.getCalendarWeek() === (i % 52) + 1);
                date = date.addDays(7);
            }
        }
    }
]);

        