"use strict";
/**
 * Name: weekdayTest
 * Purpose: Test Computus.weekday function
 * @param start Startyear for test
 * @param years Number of years for test
 */
function weekdayTest(start, years) {
    var d = new Date(start, 0, 1, 0, 12, 0, 0);
    var y = start;
    var OK = true;
    var nOK = 0;
    console.log("Start:" + start);
    while (y < (start + years)) {
        var wt = d.getDay();
        var ok = d.getDay() == Computus.weekday(d.getFullYear(), d.getMonth(), d.getDate());
        OK = OK && ok;
        if (!ok) {
            console.log(d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate());
            nOK++;
        }
        d.setTime(d.getTime() + 864e5);
        y = d.getFullYear();
        if (nOK >= 50)
            break;
    }
    console.log("OK " + start + ":" + y + ": " + OK);
}
