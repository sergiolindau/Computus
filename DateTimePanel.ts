//http://www.htmldockfloat.com/demo/JavaScriptDockFloatSimpleDemo.html

//addLanguageChangeHandle(function(code){console.log("language change: "+code)});

function setSelectDate(select_element: HTMLSelectElement,days: number) {
	var noptdays = select_element.options.length;
	if (noptdays < days) {
		var doc = select_element.ownerDocument;
		while(select_element.options.length<days) {
			var opt = doc.createElement("option");
			opt.text = (select_element.options.length+1).toString();
			if (select_element.add.length === 2){
				select_element.add(opt, null); // standards compliant
			} else{
				select_element.add(opt); // IE only
			}
		}
		doc = null as unknown as Document;
	}
	else if (noptdays > days) {
		while(select_element.options.length>days) {
			select_element.options.remove(select_element.options.length-1);
		}
	}
}

function initDateTimePanel() {
	DOM$.select.fillRange("UTCDate",1,31);
	DOM$.select.fillRange("UTCHours",0,23);
	DOM$.select.fillRange("UTCMinutes",0,59);
	DOM$.select.fillRange("UTCSeconds",0,59);

	DOM$.select.fillRange("LocalDate",1,31);
	DOM$.select.fillRange("LocalHours",0,23);
	DOM$.select.fillRange("LocalMinutes",0,59);
	DOM$.select.fillRange("LocalSeconds",0,59);
}

var dateUTC = new DateTimeTick(), dateTAI: DateTimeTick, dateTT: DateTimeTick, dateTCG: DateTimeTick;

dateUTC.setStartAction(
	function(){
		((DOM$.c("RunStop") as HTMLCollection)[0] as HTMLButtonElement).value = "Stop";
//		DOM$.c("RunStop")[1].value = "Stop";
});

dateUTC.setStopAction(
	function(){
		((DOM$.c("RunStop") as HTMLCollection)[0] as HTMLButtonElement).value = "Run";
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

var panelRefreshActions: Array<Function> = [];
function addPanelRefreshAction(func: Function){
	panelRefreshActions.push(func);
}

function updateDateTimePanel() {
	(DOM$.i("UTCString") as HTMLElement).innerHTML = dateUTC.toUTCString();
	(DOM$.i("UTCYear") as HTMLInputElement).value =
		(dateUTC.getUTCFullYear()<=0) ?
		(-dateUTC.getUTCFullYear()+1).toString() :
		dateUTC.getUTCFullYear().toString();
	(DOM$.i("UTCEra") as HTMLSelectElement).selectedIndex = (dateUTC.getUTCFullYear()<=0)?0:1;
	(DOM$.i("UTCLeapYear") as HTMLInputElement).checked = dateUTC.isUTCLeapYear();
	(DOM$.i("UTCMonth") as HTMLSelectElement).selectedIndex = dateUTC.getUTCMonth();
	setSelectDate(DOM$.i("UTCDate") as HTMLSelectElement,dateUTC.getUTCMonthDays());
	(DOM$.i("UTCDate") as HTMLSelectElement).value = dateUTC.getUTCDate();
	(DOM$.i("UTCDay") as HTMLSelectElement).selectedIndex = dateUTC.getUTCDay();
	(DOM$.i("UTCHours") as HTMLSelectElement).value = dateUTC.getUTCHours();
	(DOM$.i("UTCMinutes") as HTMLSelectElement).value = dateUTC.getUTCMinutes();
	(DOM$.i("UTCSeconds") as HTMLSelectElement).value = dateUTC.getUTCSeconds();
	(DOM$.i("UTCMilliseconds") as HTMLSelectElement).value = dateUTC.getUTCMilliseconds().toString().padStart(3,'0');

	(DOM$.i("JulianDate") as HTMLSelectElement).value = Number(dateUTC.getJulianDate()).toFixed(10);

	(DOM$.i("LocalString") as HTMLElement).innerHTML = dateUTC.toString();
	(DOM$.i("LocalYear") as HTMLInputElement).value =
		(dateUTC.getFullYear()<=0) ?
		(-dateUTC.getFullYear()+1).toString() :
		dateUTC.getFullYear().toString();
	(DOM$.i("LocalEra") as HTMLSelectElement).selectedIndex = (dateUTC.getFullYear()<=0)?0:1;
	(DOM$.i("LocalLeapYear") as HTMLInputElement).checked = dateUTC.isLocalLeapYear();
	(DOM$.i("LocalMonth") as HTMLSelectElement).selectedIndex = dateUTC.getMonth();
	setSelectDate(DOM$.i("LocalDate") as HTMLSelectElement,dateUTC.getLocalMonthDays());
	(DOM$.i("LocalDate") as HTMLSelectElement).value = dateUTC.getDate();
	(DOM$.i("LocalDay") as HTMLSelectElement).selectedIndex = dateUTC.getLocalDay();
	(DOM$.i("LocalHours") as HTMLSelectElement).value = dateUTC.getHours();
	(DOM$.i("LocalMinutes") as HTMLSelectElement).value = dateUTC.getMinutes();
	(DOM$.i("LocalSeconds") as HTMLSelectElement).value = dateUTC.getSeconds();
	(DOM$.i("LocalMilliseconds") as HTMLSelectElement).value = dateUTC.getMilliseconds().toString().padStart(3,'0');
	(DOM$.i("DaylightSavingTime") as HTMLInputElement).checked = dateUTC.isDST();
	(DOM$.i("DaylightSavingTime") as HTMLInputElement).disabled = dateUTC.getIsLocal();
	(DOM$.i("TimezoneAdjust") as HTMLInputElement).value = dateUTC.getTimezoneOffset();
	
	for(var i=0;i<panelRefreshActions.length;i++){
		panelRefreshActions[i]();
	}
}

function getStepPanelValue() {
		if ((DOM$.i("sYear") as HTMLInputElement).checked) {
			return 6;
		}
		else if ((DOM$.i("sMonth") as HTMLInputElement).checked) {
			return 5;
		}
		else if ((DOM$.i("sDay") as HTMLInputElement).checked) {
			return 4;
		}
		else if ((DOM$.i("sHours") as HTMLInputElement).checked) {
			return 3;
		}
		else if ((DOM$.i("sMinutes") as HTMLInputElement).checked) {
			return 2;
		}
		else if ((DOM$.i("sSeconds") as HTMLInputElement).checked) {
			return 1;
		}
		else {
			return 0;
		}
}

function changeStepPanelValue() {
	dateUTC.setStepDateTime(getStepPanelValue());
}

function panelUpdate(date?: DateTimeTick){
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

function clickSetRunModeNow(isNow: number) {
	dateUTC.setRunModeNow(isNow,isNow?250:1000,1,getStepPanelValue());
}

/***********************************************************************
	Change UTC DateTime Panel
***********************************************************************/
function changeUTCYear() {
	dateUTC.stop();
	dateUTC.setUTCFullYear((DOM$.i("UTCYear") as HTMLInputElement).value);
	panelUpdate(dateUTC);
}
function changeUTCEra() {
	dateUTC.stop();
	var d = Math.abs(dateUTC.getUTCFullYear());
	dateUTC.setUTCFullYear(((DOM$.i("UTCEra") as HTMLSelectElement).selectedIndex?1:-1)*d);
	panelUpdate(dateUTC);
}
function changeUTCMonth() {
	dateUTC.stop();
	dateUTC.setUTCMonth((DOM$.i("UTCMonth") as HTMLSelectElement).selectedIndex);
	panelUpdate(dateUTC);
}
function changeUTCDate() {
	dateUTC.stop();
	dateUTC.setUTCDate((DOM$.i("UTCDate") as HTMLSelectElement).selectedIndex+1);
	panelUpdate(dateUTC);
}
function changeUTCHours() {
	dateUTC.stop();
	dateUTC.setUTCHours((DOM$.i("UTCHours") as HTMLSelectElement).selectedIndex);
	panelUpdate(dateUTC);
}
function changeUTCMinutes() {
	dateUTC.stop();
	dateUTC.setUTCMinutes((DOM$.i("UTCMinutes") as HTMLSelectElement).selectedIndex);
	panelUpdate(dateUTC);
}
function changeUTCSeconds() {
	dateUTC.stop();
	dateUTC.setUTCSeconds((DOM$.i("UTCSeconds") as HTMLSelectElement).selectedIndex);
	panelUpdate(dateUTC);
}
function changeUTCMilliseconds() {
	dateUTC.stop();
	dateUTC.setUTCMilliseconds((DOM$.i("UTCMilliseconds") as HTMLSelectElement).value);
	panelUpdate(dateUTC);
}

/***********************************************************************
	Change Local DateTime Panel
***********************************************************************/
function changeLocalYear() {
	dateUTC.stop();
	dateUTC.setFullYear((DOM$.i("LocalYear") as HTMLInputElement).value);
	panelUpdate(dateUTC);
}
function changeLocalEra() {
	dateUTC.stop();
	var d = Math.abs(dateUTC.getLocalFullYear());
	dateUTC.setFullYear(((DOM$.i("LocalEra") as HTMLSelectElement).selectedIndex?1:-1)*d);
	panelUpdate(dateUTC);
}
function changeLocalMonth() {
	dateUTC.stop();
	dateUTC.setMonth((DOM$.i("LocalMonth") as HTMLSelectElement).selectedIndex);
	panelUpdate(dateUTC);
}
function changeLocalDate() {
	dateUTC.stop();
	dateUTC.setDate((DOM$.i("LocalDate") as HTMLSelectElement).selectedIndex+1);
	panelUpdate(dateUTC);
}
function changeLocalHours() {
	dateUTC.stop();
	dateUTC.setHours((DOM$.i("LocalHours") as HTMLSelectElement).selectedIndex);
	panelUpdate(dateUTC);
}
function changeLocalMinutes() {
	dateUTC.stop();
	dateUTC.setMinutes((DOM$.i("LocalMinutes") as HTMLSelectElement).selectedIndex);
	panelUpdate(dateUTC);
}
function changeLocalSeconds() {
	dateUTC.stop();
	dateUTC.setSeconds((DOM$.i("LocalSeconds") as HTMLSelectElement).selectedIndex);
	panelUpdate(dateUTC);
}
function changeLocalMilliseconds() {
	dateUTC.stop();
	dateUTC.setMilliseconds((DOM$.i("LocalMilliseconds") as HTMLSelectElement).value);
	panelUpdate(dateUTC);
}
function changeTZAdjust() {
	dateUTC.setLocalTZOffset(parseInt((DOM$.i("TimezoneAdjust") as HTMLInputElement).value));
	panelUpdate(dateUTC);
}
function focusTZAdjust() {
	dateUTC.stop();
}
function changeDaylightSavingTime() {
	dateUTC.stop();
	dateUTC.setDSTOffset((DOM$.i("DaylightSavingTime") as HTMLInputElement).checked?60:0);
	panelUpdate(dateUTC);
}
/***********************************************************************
	Change UTC Panel
***********************************************************************/
function changeJulianDate() {
	dateUTC.stop();
	let value = (DOM$.i("JulianDate") as HTMLInputElement).value.trim();
	let n = value.indexOf(".");
	if (n>-1) {
		dateUTC.setJulianDate(Number(value));
	}
	else {
		let temp = dateUTC.getJulianDate().toString();
		let n = temp.indexOf(".");
		if (n>-1) {
			dateUTC.setJulianDate(Number(value+temp.substring(n)));
		}
		else {
			dateUTC.setJulianDate(Number(value));
		}
	}
	panelUpdate(dateUTC);
}
function changeModifiedJulianDate() {
	dateUTC.stop();
	dateUTC.setModifiedJulianDate((DOM$.i("ModifiedJulianDate") as HTMLInputElement).value);
	panelUpdate(dateUTC);
}
function changeJulianDay() {
	dateUTC.stop();
	dateUTC.setJulianDay((DOM$.i("JulianDay") as HTMLInputElement).value);
	panelUpdate(dateUTC);
}
function changeUT() {
	dateUTC.stop();
	dateUTC.setUT((DOM$.i("UT") as HTMLInputElement).value);
	panelUpdate(dateUTC);
}
function changeEpoch() {
	dateUTC.stop();
	dateUTC.setEpoch((DOM$.i("Epoch") as HTMLInputElement).value);
	panelUpdate(dateUTC);
}
function changeJulianCentury() {
	dateUTC.stop();
	dateUTC.setJulianCentury((DOM$.i("JulianCentury") as HTMLInputElement).value);
	panelUpdate(dateUTC);
}

/***********************************************************************
	Change TAI Panel
***********************************************************************/
function changeTAIJulianDate() {
	dateUTC.stop();
	dateTAI.setJulianDate((DOM$.i("TAIJulianDate") as HTMLInputElement).value);
	setFromTAI();
	updateDateTimePanel();
}
function changeTAIModifiedJulianDate() {
	dateUTC.stop();
	dateTAI.setModifiedJulianDate((DOM$.i("TAIModifiedJulianDate") as HTMLInputElement).value);
	setFromTAI();
	updateDateTimePanel();
}
function changeTAIJulianDay() {
	dateUTC.stop();
	dateTAI.setJulianDay((DOM$.i("TAIJulianDay") as HTMLInputElement).value);
	setFromTAI();
	updateDateTimePanel();
}
function changeTAIUT() {
	dateUTC.stop();
	dateTAI.setUT((DOM$.i("TAIUT") as HTMLInputElement).value);
	setFromTAI();
	updateDateTimePanel();
}
function changeTAIEpoch() {
	dateUTC.stop();
	dateTAI.setEpoch((DOM$.i("TAIEpoch") as HTMLInputElement).value);
	setFromTAI();
	updateDateTimePanel();
}
function changeTAIJulianCentury() {
	dateUTC.stop();
	dateTAI.setJulianCentury((DOM$.i("TAIJulianCentury") as HTMLInputElement).value);
	setFromTAI();
	updateDateTimePanel();
}

/***********************************************************************
	Change TT Panel
***********************************************************************/
function changeTTJulianDate() {
	dateUTC.stop();
	dateTT.setJulianDate((DOM$.i("TTJulianDate") as HTMLInputElement).value);
	setFromTT();
	updateDateTimePanel();
}
function changeTTModifiedJulianDate() {
	dateUTC.stop();
	dateTT.setModifiedJulianDate((DOM$.i("TTModifiedJulianDate") as HTMLInputElement).value);
	setFromTT();
	updateDateTimePanel();
}
function changeTTJulianDay() {
	dateUTC.stop();
	dateTT.setJulianDay((DOM$.i("TTJulianDay") as HTMLInputElement).value);
	setFromTT();
	updateDateTimePanel();
}
function changeTTUT() {
	dateUTC.stop();
	dateTT.setUT((DOM$.i("TTUT") as HTMLInputElement).value);
	setFromTT();
	updateDateTimePanel();
}
function changeTTEpoch() {
	dateUTC.stop();
	dateTT.setEpoch((DOM$.i("TTEpoch") as HTMLInputElement).value);
	setFromTT();
	updateDateTimePanel();
}
function changeTTJulianCentury() {
	dateUTC.stop();
	dateTT.setJulianCentury((DOM$.i("TTJulianCentury") as HTMLInputElement).value);
	setFromTT();
	updateDateTimePanel();
}

/***********************************************************************
	Change TCG Panel
***********************************************************************/
function changeTCGJulianDate() {
	dateUTC.stop();
	dateTCG.setJulianDate((DOM$.i("TCGJulianDate") as HTMLInputElement).value);
	setFromTCG();
	updateDateTimePanel();
}
function changeTCGModifiedJulianDate() {
	dateUTC.stop();
	dateTCG.setModifiedJulianDate((DOM$.i("TCGModifiedJulianDate") as HTMLInputElement).value);
	setFromTCG();
	updateDateTimePanel();
}
function changeTCGJulianDay() {
	dateUTC.stop();
	dateTCG.setJulianDay((DOM$.i("TCGJulianDay") as HTMLInputElement).value);
	setFromTCG();
	updateDateTimePanel();
}
function changeTCGUT() {
	dateUTC.stop();
	dateTCG.setUT((DOM$.i("TCGUT") as HTMLInputElement).value);
	setFromTCG();
	updateDateTimePanel();
}
function changeTCGEpoch() {
	dateUTC.stop();
	dateTCG.setEpoch((DOM$.i("TCGEpoch") as HTMLInputElement).value);
	setFromTCG();
	updateDateTimePanel();
}
function changeTCGJulianCentury() {
	dateUTC.stop();
	dateTCG.setJulianCentury((DOM$.i("TCGJulianCentury") as HTMLInputElement).value);
	setFromTCG();
	updateDateTimePanel();
}