"use strict";
class timeString {
    //***********************************************************************/
    //* Name:    timeString.dayFromJD								*/
    //* Type:    Function									*/
    //* Purpose: Calendar day (minus year) from Julian Day			*/
    //* Arguments:										*/
    //*   jd   : Julian Day									*/
    //* Return value:										*/
    //*   String date in the form DD-MONTH						*/
    //***********************************************************************/
    static dayFromJD(jd) {
        let cal = Computus.jd2cal(jd);
        return ((cal[2] < 10 ? "0" : "") + cal[2] + Computus.monthTable['EN'][1][cal[1]]);
    }
    //***********************************************************************/
    //* Name:    timeString.fromMinutes									*/
    //* Type:    Function									*/
    //* Purpose: convert time of day in minutes to a zero-padded string	*/
    //*		suitable for printing to the form text fields			*/
    //* Arguments:										*/
    //*   minutes : time of day in minutes						*/
    //* Return value:										*/
    //*   string of the format HH:MM:SS, minutes and seconds are zero padded*/
    //***********************************************************************/
    static fromMinutes(minutes) {
        var floatHour = minutes / 60.0;
        var hour = Math.floor(floatHour);
        var floatMinute = 60.0 * (floatHour - Math.floor(floatHour));
        var minute = Math.floor(floatMinute);
        var floatSec = 60.0 * (floatMinute - Math.floor(floatMinute));
        var second = Math.floor(floatSec + 0.5);
        if (second > 59) {
            second = 0;
            minute += 1;
        }
        var timeStr = hour + ":";
        if (minute < 10) //	i.e. only one digit
            timeStr += "0" + minute + ":";
        else
            timeStr += minute + ":";
        if (second < 10) //	i.e. only one digit
            timeStr += "0" + second;
        else
            timeStr += second;
        return timeStr;
    }
    //***********************************************************************/
    //* Name:    timeString.shortAMPM							*/
    //* Type:    Function									*/
    //* Purpose: convert time of day in minutes to a zero-padded string	*/
    //*		suitable for printing to the form text fields.  If time	*/
    //*		crosses a day boundary, date is appended.				*/
    //* Arguments:										*/
    //*   minutes : time of day in minutes						*/
    //*   JD  : julian day									*/
    //* Return value:										*/
    //*   string of the format HH:MM[AM/PM] (DDMon)					*/
    //***********************************************************************/
    // timeString.shortAMPM returns a zero-padded string (HH:MM *M) given time in 
    // minutes and appends short date if time is > 24 or < 0, resp.
    static shortAMPM(minutes, JD) {
        var julianday = JD;
        var floatHour = minutes / 60.0;
        var hour = Math.floor(floatHour);
        var floatMinute = 60.0 * (floatHour - Math.floor(floatHour));
        var minute = Math.floor(floatMinute);
        var floatSec = 60.0 * (floatMinute - Math.floor(floatMinute));
        var second = Math.floor(floatSec + 0.5);
        var PM = false;
        minute += (second >= 30) ? 1 : 0;
        if (minute >= 60) {
            minute -= 60;
            hour++;
        }
        var daychange = false;
        if (hour > 23) {
            hour -= 24;
            daychange = true;
            julianday += 1.0;
        }
        if (hour < 0) {
            hour += 24;
            daychange = true;
            julianday -= 1.0;
        }
        if (hour > 12) {
            hour -= 12;
            PM = true;
        }
        if (hour == 12) {
            PM = true;
        }
        if (hour == 0) {
            PM = false;
            hour = 12;
        }
        var timeStr = hour + ":";
        if (minute < 10) //	i.e. only one digit
            timeStr += "0" + minute + ((PM) ? "PM" : "AM");
        else
            timeStr += "" + minute + ((PM) ? "PM" : "AM");
        if (daychange)
            return timeStr + " " + timeString.dayFromJD(julianday);
        return timeStr;
    }
    //***********************************************************************/
    //* Name:    timeString.AMPMDate							*/
    //* Type:    Function									*/
    //* Purpose: convert time of day in minutes to a zero-padded string	*/
    //*		suitable for printing to the form text fields, and appends	*/
    //*		the date.									*/
    //* Arguments:										*/
    //*   minutes : time of day in minutes						*/
    //*   JD  : julian day									*/
    //* Return value:										*/
    //*   string of the format HH:MM[AM/PM] DDMon					*/
    //***********************************************************************/
    // timeString.AMPMDate returns a zero-padded string (HH:MM[AM/PM]) given time 
    // in minutes and julian day, and appends the short date
    static AMPMDate(minutes, JD) {
        var julianday = JD;
        var floatHour = minutes / 60.0;
        var hour = Math.floor(floatHour);
        var floatMinute = 60.0 * (floatHour - Math.floor(floatHour));
        var minute = Math.floor(floatMinute);
        var floatSec = 60.0 * (floatMinute - Math.floor(floatMinute));
        var second = Math.floor(floatSec + 0.5);
        minute += (second >= 30) ? 1 : 0;
        if (minute >= 60) {
            minute -= 60;
            hour++;
        }
        if (hour > 23) {
            hour -= 24;
            julianday += 1.0;
        }
        if (hour < 0) {
            hour += 24;
            julianday -= 1.0;
        }
        var PM = false;
        if (hour > 12) {
            hour -= 12;
            PM = true;
        }
        if (hour == 12) {
            PM = true;
        }
        if (hour == 0) {
            PM = false;
            hour = 12;
        }
        var timeStr = hour + ":";
        if (minute < 10) //	i.e. only one digit
            timeStr += "0" + minute + ((PM) ? "PM" : "AM");
        else
            timeStr += minute + ((PM) ? "PM" : "AM");
        return timeStr + " " + timeString.dayFromJD(julianday);
    }
    //***********************************************************************/
    //* Name:    timeString.appendDate								*/
    //* Type:    Function									*/
    //* Purpose: convert time of day in minutes to a zero-padded 24hr time	*/
    //*		suitable for printing to the form text fields.  If time	*/
    //*		crosses a day boundary, date is appended.				*/
    //* Arguments:										*/
    //*   minutes : time of day in minutes						*/
    //*   JD  : julian day									*/
    //* Return value:										*/
    //*   string of the format HH:MM (DDMon)						*/
    //***********************************************************************/
    // timeString.appendDate returns a zero-padded string (HH:MM) given time in minutes
    // and julian day, and appends the short date if time crosses a day boundary
    static appendDate(minutes, JD) {
        var julianday = JD;
        var floatHour = minutes / 60.0;
        var hour = Math.floor(floatHour);
        var floatMinute = 60.0 * (floatHour - Math.floor(floatHour));
        var minute = Math.floor(floatMinute);
        var floatSec = 60.0 * (floatMinute - Math.floor(floatMinute));
        var second = Math.floor(floatSec + 0.5);
        minute += (second >= 30) ? 1 : 0;
        if (minute >= 60) {
            minute -= 60;
            hour++;
        }
        var daychange = false;
        if (hour > 23) {
            hour -= 24;
            julianday += 1.0;
            daychange = true;
        }
        if (hour < 0) {
            hour += 24;
            julianday -= 1.0;
            daychange = true;
        }
        var timeStr = hour + ":";
        if (minute < 10) //	i.e. only one digit
            timeStr += "0" + minute;
        else
            timeStr += minute;
        if (daychange)
            return timeStr + " " + timeString.dayFromJD(julianday);
        return timeStr;
    }
}
/******************************************************************************/ 
