D8 - The next generation Date object for JavaScript
===================================================

Description
-----------

D8 is a lightweight JavaScript library, that wraps JS's date object and extends it with lots of features that address common use cases when dealing with dates.

Usage
-------

    var d1 = new D8();
    var d2 = new D8.create('12/31/2011');

    d1.format('mm/dd/yyyy');
    // 07/28/2011

    d2.isLeapYear();
    // false

    D8.isLeapYear(2012);
    // true

    d1.getCalendarWeek();
    // 30

    d1.timeBetween(d2);
    // 13423729316

    d1.timeBetween(d2, 'days');
    // 155

    d1.timeBetween(d2, 'days', false);
    // 155.3661575810185

    var d3 = d1.addHours(12);

    d3.format('mm/dd/yyyy');
    // 07/29/2011

    var d4 = d3.tomorrow();
    d4.format('mm/dd/yyyy');
    // 07/30/2011

    var dates = d1.getDatesOfCalendarWeek();
    for(var i = 0; i < dates.length; i++) {
        dates[i].format('mm/dd/yyyy');
    }
    // 07/24/2011
    // 07/25/2011
    // 07/26/2011
    // 07/27/2011
    // 07/28/2011
    // 07/29/2011
    // 07/30/2011

    var d5 = D8.getDateByWeekdayAndCalendarWeek(30, 4, 2011);
    d5.format('mm/dd/yyyy');
    // 07/28/2011

License
-------

D8 is licensed under the MIT license.