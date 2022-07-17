declare class DateTimeTick {
	setStartAction: Function;
	setStopAction: Function;
	copy: Function;
	UTCtoTAI: Function;
	TAItoTT: Function;
	TTtoTCG: Function;
	TAItoUTC: Function;
	TTtoTAI: Function;
	TCGtoTT: Function;
	
	toUTCString: Function;
	getUTCFullYear: Function;
	isUTCLeapYear: Function;
	getUTCMonth: Function;
	getUTCMonthDays: Function;
	getUTCDate: Function;
	getUTCDay: Function;
	getUTCHours: Function;
	getUTCMinutes: Function;
	getUTCSeconds: Function;
	getUTCMilliseconds: Function;

	setUTCFullYear: Function;
	setUTCMonth: Function;
	setUTCDate: Function;
	setUTCHours: Function;
	setUTCMinutes: Function;
	setUTCSeconds: Function;
	setUTCMilliseconds: Function;

	toString: Function;
	getFullYear: Function;
	getLocalFullYear: Function;
	isLocalLeapYear: Function;
	getMonth: Function;
	getLocalMonthDays: Function;
	getDate: Function;
	getLocalDay: Function;
	getHours: Function;
	getMinutes: Function;
	getSeconds: Function;
	getMilliseconds: Function;

	setFullYear: Function;
	setMonth: Function;
	setDate: Function;
	setHours: Function;
	setMinutes: Function;
	setSeconds: Function;
	setMilliseconds: Function;
	setLocalTZOffset: Function;
	setDSTOffset: Function;

	isDST: Function;
	getIsLocal: Function;
	getTimezoneOffset: Function;

	getJulianDate: Function;
	setJulianDate: Function;
	setModifiedJulianDate: Function;
	setJulianDay: Function;
	setUT: Function;
	setEpoch: Function;
	setJulianCentury: Function;
	
	setStepDateTime: Function;
	setRunAction: Function;
	stop: Function;
	setNow: Function;
	runStop: Function;
	setRunModeNow: Function;

}