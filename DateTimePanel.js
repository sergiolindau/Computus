"use strict";
//http://www.htmldockfloat.com/demo/JavaScriptDockFloatSimpleDemo.html
//addLanguageChangeHandle(function(code){console.log("language change: "+code)});
function setSelectDate(select_element, days) {
    var noptdays = select_element.options.length;
    if (noptdays < days) {
        var doc = select_element.ownerDocument;
        while (select_element.options.length < days) {
            var opt = doc.createElement("option");
            opt.text = (select_element.options.length + 1).toString();
            if (select_element.add.length === 2) {
                select_element.add(opt, null); // standards compliant
            }
            else {
                select_element.add(opt); // IE only
            }
        }
        doc = null;
    }
    else if (noptdays > days) {
        while (select_element.options.length > days) {
            select_element.options.remove(select_element.options.length - 1);
        }
    }
}
function initDateTimePanel() {
    DOM$.select.fillRange("UTCDate", 1, 31);
    DOM$.select.fillRange("UTCHours", 0, 23);
    DOM$.select.fillRange("UTCMinutes", 0, 59);
    DOM$.select.fillRange("UTCSeconds", 0, 59);
    DOM$.select.fillRange("LocalDate", 1, 31);
    DOM$.select.fillRange("LocalHours", 0, 23);
    DOM$.select.fillRange("LocalMinutes", 0, 59);
    DOM$.select.fillRange("LocalSeconds", 0, 59);
}
var dateUTC = new DateTimeTick(), dateTAI, dateTT, dateTCG;
dateUTC.setStartAction(function () {
    DOM$.c("RunStop")[0].value = "Stop";
    //		DOM$.c("RunStop")[1].value = "Stop";
});
dateUTC.setStopAction(function () {
    DOM$.c("RunStop")[0].value = "Run";
    //		DOM$.c("RunStop")[1].value = "Run";
});
//alert(dateUTC.oldMethods.getFullYear());
/***********************************************************************
    Time Scales conversion
***********************************************************************/
function setFromUTC() {
    dateTAI = dateUTC.copy();
    dateTAI.UTCtoTAI();
    dateTT = dateTAI.copy();
    dateTT.TAItoTT();
    dateTCG = dateTT.copy();
    dateTCG.TTtoTCG();
}
function setFromTAI() {
    dateUTC = dateTAI.copy();
    dateUTC.TAItoUTC();
    dateTT = dateTAI.copy();
    dateTT.TAItoTT();
    dateTCG = dateTT.copy();
    dateTCG.TTtoTCG();
}
function setFromTT() {
    dateTAI = dateTT.copy();
    dateTAI.TTtoTAI();
    dateUTC = dateTAI.copy();
    dateUTC.TAItoUTC();
    dateTCG = dateTT.copy();
    dateTCG.TTtoTCG();
}
function setFromTCG() {
    dateTT = dateTCG.copy();
    dateTT.TCGtoTT();
    dateTAI = dateTT.copy();
    dateTAI.TTtoTAI();
    dateUTC = dateTAI.copy();
    dateUTC.TAItoUTC();
}
var panelRefreshActions = [];
function addPanelRefreshAction(func) {
    panelRefreshActions.push(func);
}
function updateDateTimePanel() {
    DOM$.i("UTCString").innerHTML = dateUTC.toUTCString();
    DOM$.i("UTCYear").value =
        (dateUTC.getUTCFullYear() <= 0) ?
            (-dateUTC.getUTCFullYear() + 1).toString() :
            dateUTC.getUTCFullYear().toString();
    DOM$.i("UTCEra").selectedIndex = (dateUTC.getUTCFullYear() <= 0) ? 0 : 1;
    DOM$.i("UTCLeapYear").checked = dateUTC.isUTCLeapYear();
    DOM$.i("UTCMonth").selectedIndex = dateUTC.getUTCMonth();
    setSelectDate(DOM$.i("UTCDate"), dateUTC.getUTCMonthDays());
    DOM$.i("UTCDate").value = dateUTC.getUTCDate();
    DOM$.i("UTCDay").selectedIndex = dateUTC.getUTCDay();
    DOM$.i("UTCHours").value = dateUTC.getUTCHours();
    DOM$.i("UTCMinutes").value = dateUTC.getUTCMinutes();
    DOM$.i("UTCSeconds").value = dateUTC.getUTCSeconds();
    DOM$.i("UTCMilliseconds").value = dateUTC.getUTCMilliseconds().toString().padStart(3, '0');
    DOM$.i("JulianDate").value = Number(dateUTC.getJulianDate()).toFixed(10);
    DOM$.i("LocalString").innerHTML = dateUTC.toString();
    DOM$.i("LocalYear").value =
        (dateUTC.getFullYear() <= 0) ?
            (-dateUTC.getFullYear() + 1).toString() :
            dateUTC.getFullYear().toString();
    DOM$.i("LocalEra").selectedIndex = (dateUTC.getFullYear() <= 0) ? 0 : 1;
    DOM$.i("LocalLeapYear").checked = dateUTC.isLocalLeapYear();
    DOM$.i("LocalMonth").selectedIndex = dateUTC.getMonth();
    setSelectDate(DOM$.i("LocalDate"), dateUTC.getLocalMonthDays());
    DOM$.i("LocalDate").value = dateUTC.getDate();
    DOM$.i("LocalDay").selectedIndex = dateUTC.getLocalDay();
    DOM$.i("LocalHours").value = dateUTC.getHours();
    DOM$.i("LocalMinutes").value = dateUTC.getMinutes();
    DOM$.i("LocalSeconds").value = dateUTC.getSeconds();
    DOM$.i("LocalMilliseconds").value = dateUTC.getMilliseconds().toString().padStart(3, '0');
    DOM$.i("DaylightSavingTime").checked = dateUTC.isDST();
    DOM$.i("DaylightSavingTime").disabled = dateUTC.getIsLocal();
    DOM$.i("TimezoneAdjust").value = dateUTC.getTimezoneOffset();
    for (var i = 0; i < panelRefreshActions.length; i++) {
        panelRefreshActions[i]();
    }
}
function getStepPanelValue() {
    if (DOM$.i("sYear").checked) {
        return 6;
    }
    else if (DOM$.i("sMonth").checked) {
        return 5;
    }
    else if (DOM$.i("sDay").checked) {
        return 4;
    }
    else if (DOM$.i("sHours").checked) {
        return 3;
    }
    else if (DOM$.i("sMinutes").checked) {
        return 2;
    }
    else if (DOM$.i("sSeconds").checked) {
        return 1;
    }
    else {
        return 0;
    }
}
function changeStepPanelValue() {
    dateUTC.setStepDateTime(getStepPanelValue());
}
function panelUpdate(date) {
    setFromUTC();
    updateDateTimePanel();
    //	updateEphemerisPanel();
    //	UpdateScreen();
}
//dateUTC.runAction = panelUpdate;
dateUTC.setRunAction(panelUpdate);
/***********************************************************************
    DateTime Panel element events (click, change, ...)
***********************************************************************/
function clickNow() {
    dateUTC.stop();
    dateUTC.setNow();
    panelUpdate(dateUTC);
}
var clickRunStop = dateUTC.runStop;
function clickSetRunModeNow(isNow) {
    dateUTC.setRunModeNow(isNow, isNow ? 250 : 1000, 1, getStepPanelValue());
}
/***********************************************************************
    Change UTC DateTime Panel
***********************************************************************/
function changeUTCYear() {
    dateUTC.stop();
    dateUTC.setUTCFullYear(DOM$.i("UTCYear").value);
    panelUpdate(dateUTC);
}
function changeUTCEra() {
    dateUTC.stop();
    var d = Math.abs(dateUTC.getUTCFullYear());
    dateUTC.setUTCFullYear((DOM$.i("UTCEra").selectedIndex ? 1 : -1) * d);
    panelUpdate(dateUTC);
}
function changeUTCMonth() {
    dateUTC.stop();
    dateUTC.setUTCMonth(DOM$.i("UTCMonth").selectedIndex);
    panelUpdate(dateUTC);
}
function changeUTCDate() {
    dateUTC.stop();
    dateUTC.setUTCDate(DOM$.i("UTCDate").selectedIndex + 1);
    panelUpdate(dateUTC);
}
function changeUTCHours() {
    dateUTC.stop();
    dateUTC.setUTCHours(DOM$.i("UTCHours").selectedIndex);
    panelUpdate(dateUTC);
}
function changeUTCMinutes() {
    dateUTC.stop();
    dateUTC.setUTCMinutes(DOM$.i("UTCMinutes").selectedIndex);
    panelUpdate(dateUTC);
}
function changeUTCSeconds() {
    dateUTC.stop();
    dateUTC.setUTCSeconds(DOM$.i("UTCSeconds").selectedIndex);
    panelUpdate(dateUTC);
}
function changeUTCMilliseconds() {
    dateUTC.stop();
    dateUTC.setUTCMilliseconds(DOM$.i("UTCMilliseconds").value);
    panelUpdate(dateUTC);
}
/***********************************************************************
    Change Local DateTime Panel
***********************************************************************/
function changeLocalYear() {
    dateUTC.stop();
    dateUTC.setFullYear(DOM$.i("LocalYear").value);
    panelUpdate(dateUTC);
}
function changeLocalEra() {
    dateUTC.stop();
    var d = Math.abs(dateUTC.getLocalFullYear());
    dateUTC.setFullYear((DOM$.i("LocalEra").selectedIndex ? 1 : -1) * d);
    panelUpdate(dateUTC);
}
function changeLocalMonth() {
    dateUTC.stop();
    dateUTC.setMonth(DOM$.i("LocalMonth").selectedIndex);
    panelUpdate(dateUTC);
}
function changeLocalDate() {
    dateUTC.stop();
    dateUTC.setDate(DOM$.i("LocalDate").selectedIndex + 1);
    panelUpdate(dateUTC);
}
function changeLocalHours() {
    dateUTC.stop();
    dateUTC.setHours(DOM$.i("LocalHours").selectedIndex);
    panelUpdate(dateUTC);
}
function changeLocalMinutes() {
    dateUTC.stop();
    dateUTC.setMinutes(DOM$.i("LocalMinutes").selectedIndex);
    panelUpdate(dateUTC);
}
function changeLocalSeconds() {
    dateUTC.stop();
    dateUTC.setSeconds(DOM$.i("LocalSeconds").selectedIndex);
    panelUpdate(dateUTC);
}
function changeLocalMilliseconds() {
    dateUTC.stop();
    dateUTC.setMilliseconds(DOM$.i("LocalMilliseconds").value);
    panelUpdate(dateUTC);
}
function changeTZAdjust() {
    dateUTC.setLocalTZOffset(parseInt(DOM$.i("TimezoneAdjust").value));
    panelUpdate(dateUTC);
}
function focusTZAdjust() {
    dateUTC.stop();
}
function changeDaylightSavingTime() {
    dateUTC.stop();
    dateUTC.setDSTOffset(DOM$.i("DaylightSavingTime").checked ? 60 : 0);
    panelUpdate(dateUTC);
}
/***********************************************************************
    Change UTC Panel
***********************************************************************/
function changeJulianDate() {
    dateUTC.stop();
    let value = DOM$.i("JulianDate").value.trim();
    let n = value.indexOf(".");
    if (n > -1) {
        dateUTC.setJulianDate(Number(value));
    }
    else {
        let temp = dateUTC.getJulianDate().toString();
        let n = temp.indexOf(".");
        if (n > -1) {
            dateUTC.setJulianDate(Number(value + temp.substring(n)));
        }
        else {
            dateUTC.setJulianDate(Number(value));
        }
    }
    panelUpdate(dateUTC);
}
function changeModifiedJulianDate() {
    dateUTC.stop();
    dateUTC.setModifiedJulianDate(DOM$.i("ModifiedJulianDate").value);
    panelUpdate(dateUTC);
}
function changeJulianDay() {
    dateUTC.stop();
    dateUTC.setJulianDay(DOM$.i("JulianDay").value);
    panelUpdate(dateUTC);
}
function changeUT() {
    dateUTC.stop();
    dateUTC.setUT(DOM$.i("UT").value);
    panelUpdate(dateUTC);
}
function changeEpoch() {
    dateUTC.stop();
    dateUTC.setEpoch(DOM$.i("Epoch").value);
    panelUpdate(dateUTC);
}
function changeJulianCentury() {
    dateUTC.stop();
    dateUTC.setJulianCentury(DOM$.i("JulianCentury").value);
    panelUpdate(dateUTC);
}
/***********************************************************************
    Change TAI Panel
***********************************************************************/
function changeTAIJulianDate() {
    dateUTC.stop();
    dateTAI.setJulianDate(DOM$.i("TAIJulianDate").value);
    setFromTAI();
    updateDateTimePanel();
}
function changeTAIModifiedJulianDate() {
    dateUTC.stop();
    dateTAI.setModifiedJulianDate(DOM$.i("TAIModifiedJulianDate").value);
    setFromTAI();
    updateDateTimePanel();
}
function changeTAIJulianDay() {
    dateUTC.stop();
    dateTAI.setJulianDay(DOM$.i("TAIJulianDay").value);
    setFromTAI();
    updateDateTimePanel();
}
function changeTAIUT() {
    dateUTC.stop();
    dateTAI.setUT(DOM$.i("TAIUT").value);
    setFromTAI();
    updateDateTimePanel();
}
function changeTAIEpoch() {
    dateUTC.stop();
    dateTAI.setEpoch(DOM$.i("TAIEpoch").value);
    setFromTAI();
    updateDateTimePanel();
}
function changeTAIJulianCentury() {
    dateUTC.stop();
    dateTAI.setJulianCentury(DOM$.i("TAIJulianCentury").value);
    setFromTAI();
    updateDateTimePanel();
}
/***********************************************************************
    Change TT Panel
***********************************************************************/
function changeTTJulianDate() {
    dateUTC.stop();
    dateTT.setJulianDate(DOM$.i("TTJulianDate").value);
    setFromTT();
    updateDateTimePanel();
}
function changeTTModifiedJulianDate() {
    dateUTC.stop();
    dateTT.setModifiedJulianDate(DOM$.i("TTModifiedJulianDate").value);
    setFromTT();
    updateDateTimePanel();
}
function changeTTJulianDay() {
    dateUTC.stop();
    dateTT.setJulianDay(DOM$.i("TTJulianDay").value);
    setFromTT();
    updateDateTimePanel();
}
function changeTTUT() {
    dateUTC.stop();
    dateTT.setUT(DOM$.i("TTUT").value);
    setFromTT();
    updateDateTimePanel();
}
function changeTTEpoch() {
    dateUTC.stop();
    dateTT.setEpoch(DOM$.i("TTEpoch").value);
    setFromTT();
    updateDateTimePanel();
}
function changeTTJulianCentury() {
    dateUTC.stop();
    dateTT.setJulianCentury(DOM$.i("TTJulianCentury").value);
    setFromTT();
    updateDateTimePanel();
}
/***********************************************************************
    Change TCG Panel
***********************************************************************/
function changeTCGJulianDate() {
    dateUTC.stop();
    dateTCG.setJulianDate(DOM$.i("TCGJulianDate").value);
    setFromTCG();
    updateDateTimePanel();
}
function changeTCGModifiedJulianDate() {
    dateUTC.stop();
    dateTCG.setModifiedJulianDate(DOM$.i("TCGModifiedJulianDate").value);
    setFromTCG();
    updateDateTimePanel();
}
function changeTCGJulianDay() {
    dateUTC.stop();
    dateTCG.setJulianDay(DOM$.i("TCGJulianDay").value);
    setFromTCG();
    updateDateTimePanel();
}
function changeTCGUT() {
    dateUTC.stop();
    dateTCG.setUT(DOM$.i("TCGUT").value);
    setFromTCG();
    updateDateTimePanel();
}
function changeTCGEpoch() {
    dateUTC.stop();
    dateTCG.setEpoch(DOM$.i("TCGEpoch").value);
    setFromTCG();
    updateDateTimePanel();
}
function changeTCGJulianCentury() {
    dateUTC.stop();
    dateTCG.setJulianCentury(DOM$.i("TCGJulianCentury").value);
    setFromTCG();
    updateDateTimePanel();
}
