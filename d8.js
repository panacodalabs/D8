/*!
 * D8 - The next generation Date object for JavaScript
 *
 * Copyright (C) 2011 by Panacoda GmbH
 * MIT Licensed
 *
 * @author Dominik Laubach
 * @version 0.1
 */

var D8 = (function() {

    var date = null;

    function addDays(days) {
        return this.addMilliseconds(days * 24 * 60 * 60 * 1000);
    }

    function addHours(hours) {
        return this.addMilliseconds(hours * 60 * 60 * 1000);
    }

    function addMinutes(minutes) {
        return this.addMilliseconds(minutes * 60 * 1000);
    }

    function addSeconds(seconds) {
        return this.addMilliseconds(seconds * 1000);
    }

    function addMilliseconds(milliseconds) {
        var date = new D8();
        date.date = new Date(this.getTimestamp() + milliseconds);
        return date;
    }

    function tomorrow() {
        return this.addDays(1);
    }

    function yesterday() {
        return this.addDays(-1);
    }

    function getTimestamp() {
        return this.date.getTime();
    }

    function timeBetween(date, returnType, round) {
        var firstDateInMilliseconds = this.getTimestamp() ? this.getTimestamp() : null;
        var secondDateInMilliseconds = date.getTimestamp() ? date.getTimestamp() : null;
        round = !(round === false);

        if (firstDateInMilliseconds && secondDateInMilliseconds) {
            var timeBetween;
            switch (returnType) {
                case 'days':
                    timeBetween = (secondDateInMilliseconds - firstDateInMilliseconds) / (24 * 60 * 60 * 1000);
                    break;
                case 'hours':
                    timeBetween = (secondDateInMilliseconds - firstDateInMilliseconds) / (60 * 60 * 1000);
                    break;
                case 'minutes':
                    timeBetween = (secondDateInMilliseconds - firstDateInMilliseconds) / (60 * 1000);
                    break;
                case 'seconds':
                    timeBetween = (secondDateInMilliseconds - firstDateInMilliseconds) / 1000;
                    break;
                case 'milliseconds':
                default:
                    timeBetween = (secondDateInMilliseconds - firstDateInMilliseconds);
                    break;
            }
            if(round) {
                timeBetween = Math.round(timeBetween);
            }
            return timeBetween;
        } else if (firstDateInMilliseconds) {
            throw('Error: Invalid d8 object passed when calling timeBetween()!');
        } else {
            throw('Error: Trying to access timeBetween() on an invalid d8 object.');
        }
    }

    function getCalendarWeek() {
        year = parseInt(this.format('yyyy'));
        month = parseInt(this.format('m'));
        day = parseInt(this.format('d'));

        var a = Math.floor((14 - (month)) / 12);
        var y = year + 4800 - a;
        var m = (month) + (12 * a) - 3;
        var jd = day + Math.floor(((153 * m) + 2) / 5) + (365 * y) + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
        var d4 = (jd + 31741 - (jd % 7)) % 146097 % 36524 % 1461;
        var L = Math.floor(d4 / 1460);
        var d1 = ((d4 - L) % 365) + L;
        var calendarWeek = Math.floor(d1 / 7) + 1;

        return calendarWeek;
    }

    function format(format, utc) {
        if (isNaN(this.getTimestamp())) {
            throw('Error: Trying to access format() on an invalid d8 object.');
        }

        var token = /d{1,4}|D{1}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g;
        var timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g;
        var timezoneClip = /[^-+\dA-Z]/g;
        var pad = function (val, len) {
            val = String(val);
            len = len || 2;
            while (val.length < len) val = "0" + val;
            return val;
        };

        if (arguments.length == 1 && Object.prototype.toString.call(this.date) == "[object String]" && !/\d/.test(this.date)) {
            format = this.date;
            date = undefined;
        }

        var day_names = [
            "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
            "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
        ]
        var month_names = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
            "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
        ];

        var _ = utc ? "getUTC" : "get";
        var d = this.date[_ + "Date"]();
        var D = this.date[_ + "Day"]();
        var m = this.date[_ + "Month"]();
        var y = this.date[_ + "FullYear"]();
        var H = this.date[_ + "Hours"]();
        var Min = this.date[_ + "Minutes"]();
        var s = this.date[_ + "Seconds"]();
        var L = this.date[_ + "Milliseconds"]();
        var o = utc ? 0 : this.date.getTimezoneOffset();
        var flags = {
            d:    d,
            dd:   pad(d),
            ddd:  day_names[D],
            dddd: day_names[D + 7],
            D:    D,
            m:    m + 1,
            mm:   pad(m + 1),
            mmm:  month_names[m],
            mmmm: month_names[m + 12],
            yy:   String(y).slice(2),
            yyyy: y,
            h:    H % 12 || 12,
            hh:   pad(H % 12 || 12),
            H:    H,
            HH:   pad(H),
            M:    Min,
            MM:   pad(Min),
            s:    s,
            ss:   pad(s),
            l:    pad(L, 3),
            L:    pad(L > 99 ? Math.round(L / 10) : L),
            t:    H < 12 ? "a" : "p",
            tt:   H < 12 ? "am" : "pm",
            T:    H < 12 ? "A" : "P",
            TT:   H < 12 ? "AM" : "PM",
            Z:    utc ? "UTC" : (String(this).match(timezone) || [""]).pop().replace(timezoneClip, ""),
            o:    (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
            S:    ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
        };

        var result = format.replace(token, function ($0) {
            return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
        });
        if(Number(result) == result) {
            return Number(result);
        }
        return result;
    }

    function getDatesOfCalendarWeek(startWeekOnMonday) {
        year = this.format('yyyy');
        var newYear = D8.create('01/01/' + year);
        var newYearWeekDay = newYear.format('D');

        var firstWeek = null;
        if (startWeekOnMonday) {
            firstWeek = newYearWeekDay == 1 ? newYear : newYear.addDays(8 - (newYearWeekDay == 0 ? 7 : newYearWeekDay));
        } else {
            firstWeek = newYearWeekDay == 0 ? newYear : newYear.addDays(7 - newYearWeekDay);
        }

        var calendarWeek = this.getCalendarWeek();

        var requiredWeek = firstWeek.addDays((calendarWeek - 1) * 7);

        var dates = [];
        for (var i = 0; i < 7; i++) {
            var date = requiredWeek.addDays(i);
            date = D8.create(date.format('mm') + '/' + date.format('dd') + '/' + date.format('yyyy'));
            dates.push(date);
        }

        return dates;
    }

    function isLeapYear() {
        var year = Number(this.format('yyyy'));
        return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
    }

    return {
        date: new Date(),
        addDays: addDays,
        addHours: addHours,
        addMinutes: addMinutes,
        addSeconds: addSeconds,
        addMilliseconds: addMilliseconds,
        timeBetween: timeBetween,
        yesterday: yesterday,
        tomorrow: tomorrow,
        getTimestamp: getTimestamp,
        getCalendarWeek: getCalendarWeek,
        format: format,
        getDatesOfCalendarWeek: getDatesOfCalendarWeek,
        isLeapYear: isLeapYear
    };

});

D8.now = function() {
    var date = new D8();
    date.date = new Date();
    return date;
}

D8.getCalendarWeek = (function(year, month, day) {
    var a = Math.floor((14 - (month)) / 12);
    var y = year + 4800 - a;
    var m = (month) + (12 * a) - 3;
    var jd = day + Math.floor(((153 * m) + 2) / 5) + (365 * y) + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
    var d4 = (jd + 31741 - (jd % 7)) % 146097 % 36524 % 1461;
    var L = Math.floor(d4 / 1460);
    var d1 = ((d4 - L) % 365) + L;
    var calendarWeek = Math.floor(d1 / 7) + 1;

    return calendarWeek;
});

D8.getDatesOfCalendarWeek = (function(calendarWeek, startWeekOnMonday, year) {
    year = year && !isNaN(year) ? year : (this.date ? this.format('yyyy') : D8.now().format('yyyy'));
    var newYear = this.create('01/01/' + year);
    var newYearWeekDay = newYear.format('D');

    var firstWeek = null;
    if (startWeekOnMonday) {
        firstWeek = newYearWeekDay == 1 ? newYear : newYear.addDays(8 - (newYearWeekDay == 0 ? 7 : newYearWeekDay));
    } else {
        firstWeek = newYearWeekDay == 0 ? newYear : newYear.addDays(7 - newYearWeekDay);
    }

    calendarWeek = calendarWeek ? calendarWeek : this.getCalendarWeek();

    var requiredWeek = firstWeek.addDays((calendarWeek - 1) * 7);

    var dates = [];
    for (var i = 0; i < 7; i++) {
        var date = requiredWeek.addDays(i);
        date = this.create(date.format('mm') + '/' + date.format('dd') + '/' + date.format('yyyy'));
        dates.push(date);
    }

    return dates;
});

D8.getDateByWeekdayAndCalendarWeek = (function(weekDay, calendarWeek, year) {
    if (calendarWeek && !isNaN(calendarWeek) && ((weekDay && !isNaN(weekDay)) || weekDay === 0)) {
        var dates = this.getDatesOfCalendarWeek(calendarWeek, false, year);
        if (dates && dates.length > 0 && dates[weekDay]) {
            return dates[weekDay];
        } else {
            throw('Error: Day ' + weekDay + ' of calendar week ' + calendarWeek + ' could not be found!');
        }
    } else {
        throw('Error: Please pass a valid calendarWeek and a valid day of the week!');
    }
});

D8.create = (function(dateString) {
    var milliseconds = typeof(dateString) === 'number' ? dateString : null;

    if (!milliseconds) {
        var regexResult = /(\d{1,2})\.(\d{1,2})\.(\d{2,4})/.exec(dateString);
        if (regexResult && regexResult[1] && regexResult[2] && regexResult[3]) {
            var date = dateString.split(' ');
            dateString = regexResult[2] + '/' + regexResult[1] + '/' + regexResult[3] + (date[1] ? ' ' + date[1] : '');
        } else {
            regexResult = /(\d{2,4})-(\d{1,2})-(\d{1,2})/.exec(dateString);
            if (regexResult && regexResult[1] && regexResult[2] && regexResult[3]) {
                date = dateString.split(' ');
                dateString = regexResult[2] + '/' + regexResult[3] + '/' + regexResult[1] + (date[1] ? ' ' + date[1] : '');
            }
        }
        milliseconds = Date.parse(dateString);
    }

    if (dateString && !milliseconds) {
        throw('Error: Invalid dateString \'' + dateString + '\' passed to create().');
    } else if (!dateString) {
        return D8.now();
    }

    var date = new D8();
    date.date = new Date(milliseconds);
    return date;
});

D8.isLeapYear = (function(year) {
    if(year) {
        year = Number(year);
        if(year) {
            return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
        } else {
            throw 'No valid year (number) passed.';
        }
    } else {
        throw 'No year passed.';
    }
});

var Ø = D8;