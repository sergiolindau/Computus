/***********************************************************************
 * Computus: Calendar and astronomical calculations.
 *     Computus is a javascript calendar class thath make calculations
 *     for perpetual calendar with easter an others moveable feast.
 ***********************************************************************/


/**
 * Interface for Math polyfill and extensions
 */
declare interface Math {
	frac: (x: number) => number;
	dsin: (x: number) => number;
	dcos: (x: number) => number;
	dtan: (x: number) => number;
	dasin: (x: number) => number;
	dacos: (x: number) => number;
	datan: (x: number) => number;
	datan2: (x: number,y: number) => number;
	dmod: (x: number) => number;
	deg2rad: (x: number) => number;
	rad2deg: (x: number) => number;
	isNumber: (x: number) => number;
	isPosInteger: (x: number) => number;
}

const abs = Math.abs;
const sign = Math.sign;

// sin in degrees (polyfill and alias)
Math.dsin = Math.dsin || function(d: number): number {
	return Math.sin(d*Math.PI/180)
}
const dsin = Math.dsin;

// cos in degrees (polyfill and alias)
Math.dcos = Math.dcos || function(d: number): number {
	return Math.cos(d*Math.PI/180)
}
const dcos = Math.dcos;

// tan in degrees (polyfill and alias)
Math.dtan = Math.dtan || function(d: number): number {
	return Math.tan(d*Math.PI/180)
}
const dtan = Math.dtan;

// asin in degrees (polyfill and alias)
Math.dasin = Math.dasin || function(x: number): number {
	return Math.asin(x)*180/Math.PI
}
const dasin = Math.dasin;

// acos in degrees (polyfill and alias)
Math.dacos = Math.dacos || function(x: number): number {
	return Math.acos(x)*180/Math.PI
}
const dacos = Math.dacos;

// atan in degrees (polyfill and alias)
Math.datan = Math.datan || function(x: number): number {
	return Math.atan(x)*180/Math.PI
}
const datan = Math.datan;

// atan2 in degrees (polyfill and alias)
Math.datan2 = Math.datan2 || function(y: number,x: number): number {
	return Math.atan2(y,x)*180/Math.PI
}
const datan2 = Math.datan2;

// normalize degrees in range 0-360
Math.dmod = Math.dmod || function(d: number): number {
	while(d > 360) d -= 360;
	while(d < 0) d += 360;
	return d;	// in degrees
}
const dmod = Math.dmod;

Math.deg2rad = Math.deg2rad || function(d: number): number {
	return (Math.PI * d / 180);
}
const deg2rad = Math.deg2rad;

Math.rad2deg = Math.rad2deg || function(r: number): number {
	return (180 * r / Math.PI);
}
const rad2deg = Math.rad2deg;

const trunc = Math.trunc;
const round = Math.round;
const floor = Math.floor;
const ceil = Math.ceil;

// Return fractional part of number (as positive number)

/**
 * Name: Math.frac
 * 
 * Alias: frac
 * 
 * Purpose: Get fractional part of number. The function Math.frac is defined
 * in a way that
 * 
 *     x = Math.trunc(x) + Math.frac(x)
 * 
 * for any x. If x < 0 then Math.frac(x) < 0.
 */
Math.frac = Math.frac || function(x: number): number {
	if (Number.isInteger(x)) {
		return 0;
	}
	else if (x>-1 && x<1) {
		return x;
	}
	else {
		return Number(x.toString().replace(/([\+\-]?)([0-9]*)(\.[0-9]*([Ee][\+\-]?[0-9]*)?)/,'$1$3'));
	}
}
const frac = Math.frac;

Math.isNumber = Math.isNumber || function isNumber(n: number): boolean {
	return typeof n === 'number' && isFinite(n);
}
const isNumber = Math.isNumber;

Math.isPosInteger = Math.isPosInteger || function(n: number): boolean {
	n = Number(n);
	return (Number.isInteger(n) && (n>=0))
}
const isPosInteger = Math.isPosInteger;

/**
 * Computus Class: Calendar and astronomical calculations.
 * It make calculations for perpetual calendar with easter an others moveable
 * feast.
 */

type timeYMD = [number,number,number];
type moonMonth = [number,number,number,number];

class Computus {
	/**
	 * Name: Computus.isleap
	 * @param {*} y year
	 * @returns true if is leap year in gregorian calendar, false otherwise.
	 */
	static isleap(y: number): number | boolean {
		return ((y % 4 == 0) && (y % 100 != 0 || y % 400 == 0));
	}

	static yeardays(y: number): number {
		return Computus.isleap(y)?366:365;
	}

	/**
	 * Name: Computus.ylshift
	 * Purpose: calculate amount of day shift in week cycle in [0...y] by leap years.
	 * @param {*} y 
	 * @returns 
	 */
	static ylshift(y: number): number {
		return y + trunc(y/4) - trunc(y/100) + trunc(y/400);
	}

	/**
	 * Name: Computus.weekday
	 * @param {*} y year
	 * @param {*} m month
	 * @param {*} d date
	 * @returns weekday in gregorian calendar
	 */
	static weekday(y: number, m: number, d: number): number {
		const t = [0,3,2,5,0,3,5,1,4,6,2,4];
		return (Computus.ylshift((m < 2)?y-1:y) + t[m] + d) % 7;
	}

	/**
	 * Name: Computus.domlet
	 * @param d 
	 * @returns 
	 */
	static domlet(d: number): string {
		while (d<0) d+= 7;
		d = 7 - (d % 7);
		return String.fromCharCode(65+(d<7?d:0));
	}

	/**
	 * Name: Computus.dominical
	 * @param {*} y 
	 * @returns dominical letter from year in gregorian calendar.
	 */
	static dominical(y: number): string {
		let l = Computus.isleap(y);
		let i = ( Computus.ylshift(y) - 1 ) % 7 + (l?0:1);
		return Computus.domlet(i) + (l?Computus.domlet(i+1):"") ;
	}

	/**
	 * Name: Computus.monthlength
	 * 
	 * Meaning: Number of days in [i][0] each month, [i][1] cumulative at
	 * start of each month (non-leap year), [i][2] cumulative at start of
	 * each month (leap year).
	 */
	static monthlength: Array<[number,number,number]> = [
		[31,  0,  0],
		[28, 31, 31],
		[31, 59, 60],
		[30, 90, 91],
		[31,120,121],
		[30,151,152],
		[31,181,182],
		[31,212,213],
		[30,243,244],
		[31,273,274],
		[30,304,305],
		[31,334,335],
	];

	/**
	 * Name: Computus.monthdays
	 * @param {*} y year
	 * @param {*} m month
	 * @returns days in month
	 */
	static monthdays(y: number, m: number): number {
		return (((m==1)&&Computus.isleap(y))?Computus.monthlength[m][0]+1:Computus.monthlength[m][0])
	}
	
	/**
	 * Name: Computus.cal2doy
	 * @param {*} y year
	 * @param {*} m month
	 * @param {*} d date
	 * @returns days past from start of year
	 */
	static cal2doy(y: number, m: number, d: number): number {
		return trunc((275 * (m+1))/9) - (Computus.isleap(y)?1:2) * trunc((m+10)/12) + d - 30;
		//return Computus.monthlength[m][Computus.isleap(y)?2:1]+d;
	}

	/**
	 * Name: Computus.doy2cal
	 * @param y year
	 * @param d days past from start of year
	 * @returns date in calendar
	 */
	static doy2cal(y: number, d: number): timeYMD {
		let leap = Computus.isleap(y) as number;
		let i: number;
		for (i=0; i<Computus.monthlength.length; i++) {
			if (d<=Computus.monthlength[i][leap+1]) break;
		}
		return [y,i-1,d-Computus.monthlength[i-1][leap+1]];
	}

	/**
	 * Name: Computus.calweek2doy
	 * @param y year
	 * @param m month
	 * @param w weekday
	 * @param n nth weekday of month (0 - 1st, 1 - 2nd, 2 - 3rd, ...)
	 * @returns days past from start of year
	 */
	static calweek2doy(y: number, m: number, w: number, n: number): number {
		const msw = Computus.weekday(y,m,1); // weekday of month first day
		return Computus.cal2doy(y,m,1) + 7 * (n+((msw>w)?1:0)) + w - msw;
	}

	/**
	 * Name: Computus.cal2foy
	 * @param {*} y year
	 * @param {*} m month
	 * @param {*} d date
	 * @returns fraction past start of year
	 */
	static cal2foy(y: number, m: number, d: number): number {
		return Computus.cal2doy(y,m,d)/(Computus.yeardays(y));
	}

	/**
	 * Name: weekTable
	 * 
	 * Purpose: Array containing name of week days in some languages.
	 * Source:
	 * - https://en.wikipedia.org/wiki/Week
	 * - https://en.wikipedia.org/wiki/Names_of_the_days_of_the_week
	 */
	static weekTable: {[k: string]: Array<any>} = {
		EN :
			[["Sunday",			"Monday",			"Tuesday",		"Wednesday",		"Thursday",		"Friday",		"Saturday"],
			["Sun",				"Mon",				"Tue",			"Wed",				"Thu",			"Fri",			"Sat"],
			["S",				"M",				"T",			"W",				"T",			"F",			"S"]],
		PT :
			[["Domingo",		"Segunda-feira",	"Terça-feira",	"Quarta-feira",		"Quinta-feira",	"Sexta-feira",	"Sábado"],
			["Dom",				"2ª",				"3ª",			"4ª",				"5ª",			"6ª",			"Sáb"],
			["D",				"S",				"T",			"Q",				"Q",			"S",			"S"]],
		ES :
			[["domingo",		"lunes",			"martes",		"miércoles",		"jueves",		"viernes",		"sábado"]],
		IT :
			[["domenica",		"lunedì",			"martedì",		"mercoledì",		"giovedì",		"venerdì",		"sabato"]],
		FR :
			[["dimanche",		"lundi",			"mardi",		"mercredi",			"jeudi",		"vendredi",		"samedi"]],
		DE :
			[["Sonntag",		"Montag",			"Dienstag",		"Mittwoch",			"Donnerstag",	"Freitag",		"Samstag"]],
		LA :
			[["dies Sōlis",		"dies Lūnae",		"dies Martis",	"dies Mercuriī",	"dies Iovis",	"dies Veneris",	"dies Saturnī"]],
		HE :
			[["ראשון",			"שני",				"שלישי",		"רביעי",			"חמישי",		"שישי",			"שבת"]],
		EL :
			[["ἡμέρα Ἡλίου",	"ἡμέρα Σελήνης",	"ἡμέρα Ἄρεως",	"ἡμέρα Ἑρμοῦ",		"ἡμέρα Διός",	"ἡμέρα Ἀφροδίτης",	"ἡμέρα Κρόνου"]],
		Greek :
			[["hēmérā Hēlíou",	"hēmérā Selḗnēs",	"hēmérā Áreōs",	"hēmérā Hermoû",	"hēmérā Diós",	"hēmérā Aphrodī́tēs","hēmérā Krónou"]],
		Hebrew :
			[["rishon",		"sheyni",			"shlishi",		"revi'i",			"khamishi",		"shishi",			"Shabbat"]],
		Eclesiastical :
			[["Dominica",		"feria secunda",	"feria tertia",	"feria quarta",		"feria quinta",	"feria sexta",	"sabbatum"],
			["A",				"G",				"F",			"E",				"D",			"C",			"B"]],
		Planet :
			[["Sun",			"Moon",				"Mars",			"Mercury",			"Jupiter",		"Venus",		"Saturn"],
			["☉",				"☽",				"♂",			"☿",				"♃",			"♀",			"♄"]],
		GrecoRoman :
			[["Helios",			"Selene",			"Ares",			"Hermes",			"Zeus",			"Aphrodite",	"Cronus"],
			["Sol",				"Luna",				"Mars",			"Mercury",			"Jupiter",		"Venus",		"Saturn"]],
		Germanica :
			[["Sun",			"Moon",				"Tiwaz",		"Wodanaz",			"Þunraz",		"Frige",		"—"]],
		English :
			[["sunnandæg",		"mōnandæg",			"tiwesdæg",		"wōdnesdæg",		"þunresdæg",	"frīgedæg",		"sæterndæg"]],
	};

	/**
	 * Name: monthTable
	 * 
	 * Purpose: Array containing name of months in some languages.
	 */
	static monthTable: {[k: string]: Array<any>} = {
		EN:
			[["January","February","March","April","May","June","July","August","September","October","November","December"],
			["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]],
		PT:
			[["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"],
			["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"]],
		ES:
			[["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"]],
		IT:
			[["Gennaio","Febbraio","Marzo","Aprile","Maggio","Giugno","Luglio","Agosto","Settembre","Ottobre","Novembre","December"]],
		FR:
			[["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"]],
		DE:
			[["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"]],
		LA:
			[["Ianuarii", "Februarii","Martius","Aprilis","Maii","June","Iulii","August","Septembris","Octobris","November","Decembris"]],
		HE:
			[["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]],
		EL:
			[["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]],
	};

	/**
	 * Name: moonphasename
	 * 
	 * Purpose: Array containing name of Moon's true phase in some languages.
	 */
	static moonphasename: {[k: string]: Array<string>} = {
		EN:
			["New Moon", "First Quarter", "Full Moon", "Last Quarter"],
		PT:
			["Lua Nova", "Quarto Crescente", "Lua Cheia", "Quarto Minguante"],
		ES:
			["Luna Nueva", "Cuarto Creciente", "Luna Llena", "Cuarto Menguante"],
		IT:
			["Luna Nuova", "Primo Quarto", "Luna Piena", "Ultimo Quarto"],
		FR:
			["Nouvelle lune", "Premier Quart", "Pleine Lune", "Dernier Quart"],
		DE:
			["Neumond", "Erstes Viertel", "Vollmond", "Letztes Viertel"],
		LA:
			["Neomenia", "Primum Quartum", "Plena luna", "Novissime Quartum"],
		HE:
			["ירח חדש", "רבע ראשון", "ירח מלא", "רבע אחרון"],
		EL:
			["νέα Σελήνη", "Πρώτο τέταρτο", "Πανσέληνος", "τελευταίο τέταρτο"],
	};

	/**
	 * Name: Computus.saturnaliaFinis
	 * 
	 * Meaning: Carnival finnish (-47)
	 */
	static saturnaliaFinis = -(6*7+5);

	/**
	 * Name: Computus.mercuriiCinereo
	 * 
	 * Meaning: Ash Wednesday (-46)
	 */
	static mercuriiCinereo = -(6*7+4);

	/**
	 * Name: Computus.solisPalmarum
	 * 
	 * Meaning: Palm Sunday (-7)
	 */
	static solisPalmarum = -(0*7+7);

	/**
	 * Name: Computus.pentaecoste
	 * 
	 * Meaning: Pentecostes (+49)
	 */
	static pentaecoste = +(7*7+0);

	/**
	 * Name: Computus.corpusDomini
	 * 
	 * Meaning: Chorpus Christi (+60)
	 */
	static corpusDomini = +(8*7+4);

	/**
	 * Name: Computus.easterSunday
	 * 
	 * Purpose: Calculate Easter Sunday for a given year.
	 * 
	 * Source: Jean Meeus, Astronomical Algorithms ; Richmond (Virginia,
	 * États-Unis), Willmann-Bell, 1998, pp. 67–68.
	 * @param {*} year 
	 * @returns Easter Sunday date.
	 */
	static easterSunday(year: number): timeYMD {
		let n, c, u, s, t, p, q, e, b, d, m, j, L, h;
		n = year % 19;                             // Metonic cycle
		c = trunc(year / 100);                     // number of centuries completed
		u = year % 100;                            // past years beyond complete centuries
		s = trunc(c / 4);                          // number of completed leap centuries Gregorian cycles (400 year cycles, 97 leap years)
		t = c % 4;                                 // centuries beyond complete leap cycles
		p = trunc((c + 8) / 25);                   // proemptosis cycles completed
		q = trunc((c - p + 1) / 3);                // proemptosis passed beyond full cycles
		e = (19 * n + c - s - q + 15) % 30;        // epacta
		b = trunc(u / 4);                          // number of leap years Julian cycles completed
		d = u % 4;                                 // years beyond the Julian cycles of complete leap years
		L = (32 + 2 * t + 2 * b - e - d) % 7;      // dominical letter
		h = trunc((n + 11 * e + 22 * L) / 451);    // correction
		m = trunc((e + L - 7 * h + 114) / 31) - 1; //
		j = 1 + (e + L - 7 * h + 114) % 31;        // 
		return [year,m,j];
	}

	/**
	 * Name: Computus.cal2jd
	 * @param {*} year 
	 * @param {*} month 
	 * @param {*} date 
	 * @param {*} hours a number representing fraction of day
	 * @returns Julian day from gregorian calendar date
	 */
	static cal2jd(year: number,month: number,date: number,hours?: number): number {
		let my = trunc((month-13)/12);
		return	  trunc((1461 * (year + my + 4800))/4)
				+ trunc((367 * (month - 1 - 12 * my))/12)
				- trunc(3/4 * trunc(((year + my + 4900)/100)))
				+ date - 32075.5 + ((hours!==undefined)?hours:0);
	}

	/**
	 * Name: Computus.jd2cal
	 * 
	 * Purpose: Convert Julian day to date in gregorian calendar 
	 * @param {*} jd Julian day
	 * @returns 
	 */
	 static jd2cal(jd: number) {
		let l,n,i,k,d,m,y;
		l = trunc(jd+0.5) + 68569;
		n = trunc((4 * l) / 146097);
		l -= trunc((146097 * n + 3) / 4);
		i = trunc((4000 * (l + 1)) / 1461001);
		l -= trunc((1461 * i) / 4) - 31;
		k = trunc((80 * l) / 2447);
		d = trunc(l - (2447 * k) / 80);
		l = trunc(k / 11);
		m = k + 2 - 12 * l;
		y = 100 * (n - 49) + i + l;
		return [y, m-1, d+1, frac(jd-0.5)]
//		return {'year':y, 'month':m-1, 'date':d+1, 'hours':frac(jd-0.5)};//verificar frac
	}

	/**
	 * Name: Computus.jd2weekday
	 * @param {*} jd Julian day
	 * @returns weekday from Julian day
	 */
	 static jd2weekday(jd: number): number {
		return ((jd + 1.5) % 7);
	}

	/**
	 * Name: Computus.jCentury
	 * 
	 * Meaning: Number of days in a Julian century. (36525)
	 */
	static jCentury = 100 * (365+1/4);

	/**
	 * Name: Computus.gCentury
	 * 
	 * Meaning: Number of days in a gregorian century. (36524.25)
	 */
	static gCentury = 100 * (365+97/400);

	 /**
	 * Name: Computus.j2000Era
	 * 
	 * Meaning: Julian day of J2000 epoch.
	 * 
	 * Note that if we make Computus.j2000Era / Computus.jCentury the rusult is 67.11964407939767
	 * It means that JD=0 is at 67.11964407939767 Julian centuries before J2000
	 */
	 static j2000Era = 2451545.0;

	/**
	 * Name: Computus.mjdEra
	 * 
	 * Meaning: Modified Julian Date epoch. (2400000.5)
	 */
	static mjdEra = 2400000.5;

	/**
	 * Name: Computus.unixEra
	 * 
	 * Meaning: Julian Day of 00:00:00 UTC on 1 January 1970.
	 * UNIX Era is exactly 3/10 of a Julian century before J2000
	 */
	static unixEra = Computus.j2000Era - 3/10 * Computus.jCentury;

	/**
	 * Name: Computus.jd2jc
	 * 
	 * Purpose: convert Julian Day to centuries since J2000.0
	 * @param {*} jd Julian day to convert
	 * @returns T value in Julian centuries corresponding to the given Julian Day
	 */
	 static jd2jc(jd: number): number {
		return ((jd - Computus.j2000Era) / Computus.jCentury);
	}

	/**
	 * Name: Computus.jc2jd
	 * 
	 * Purpose: convert centuries since J2000.0 to Julian jay.
	 * @param {*} T number of Julian centuries since J2000.0
	 * @returns the Julian Day corresponding to the T value
	 */
	static jc2jd(T: number): number {
		return (T * Computus.jCentury + Computus.j2000Era);
	}

	/**
	 * Name: Computus.daymin
	 * 
	 * Meaning: Number of minutes in a day
	 */
	static daymin = 24 * 60;

	/**
	 * Name: Computus.dayms
	 * 
	 * Meaning: Number of milliseconds in a day (millisecond is ANSI C time_t resolution)
	 */
	static dayms = 24 * 60 * 60 * 1e3;

	/**
	 * Name: Computus.unix2jd
	 * 
	 * Purpose: Convert UNIX timestamp to Julian jay
	 * @param time UNIX timestamp
	 * @returns Julian day
	 */
	static unix2jd(time: number): number {
		return time / Computus.dayms + Computus.unixEra;
	}

	/**
	 * Name: Computus.unix2jd
	 * 
	 * Purpose: Convert Julian day to UNIX timestamp
	 * @param jd Julian day
	 * @returns UNIX timestamp
	 */
	static jd2unix(jd: number): number {
		return (jd - Computus.unixEra) * Computus.dayms;
	}

	/**
	 * Name: Computus.cardinal
	 * 
	 * Meaning: Array containing cardinal directions symmbols.
	 * 
	 * Source: https://en.wikipedia.org/wiki/Points_of_the_compass
	 */
	static cardinal = [
		[
			"N", "NNE", "NE", "ENE",
			"E", "ESE", "SE", "SSE",
			"S", "SSO", "SO", "OSO",
			"O", "ONO", "NO", "NNO",
			"N"
		],
		[
			"N", "NNE", "NE", "ENE",
			"E", "ESE", "SE", "SSE",
			"S", "SSW", "SW", "WSW",
			"W", "WNW", "NW", "NNW",
			"N"
		]
	];

	/**
	 * ========== Sun's functions ==========
	 */

	static polyT(d: Array<number>, T: number): number {
		let r = 0;
		for (let i=0, t=1; i<d.length; i++, t *= T) {
			r += d[i] * t;
		}
		return r;
	}

	/**
	 * Name: Computus.azcenter
	 * 
	 * Purpose: centralize azimutal coordinate around south or north direction
	 * (northern or south hemisphere perspective of Sun's sky motion,
	 * respectively), depending of latitude.
	 * @param az azimuth
	 * @param lat latitude
	 * @returns azimuth centered around 180º (lat>0) or centered around 0º (lat<0)
	 */
	 static azcenter(az: number, lat: number): number {
		return (lat<0 && az>180)?(az-360):az;
	}

	/**
	 * Name: Computus.tropicalYear
	 * 
	 * Purpose: calculate duration of tropical year valid for a period
	 * centered 8000 year around J2000 (denoted as \tau).
	 * 
	 * Source: Borkowski, K. M., The Tropical Year and Solar Calendar,
	 * Journal of the Royal Astronomical Society of Canada, Vol. 85,
	 * NO. 3/JUN, P.121, 1991.
	 * 
	 *   URL: https://articles.adsabs.harvard.edu//full/1991JRASC..85..121B/0000121.000.html
	 * @param T number of Julian centuries since J2000.0
	 * @returns duration of tropical year in days of 86400 SI seconds
	 */
	static tropicalYear(T: number): number {
		let tau = 365.242189669781 + T * (- 6.161870e-6 - 6.44e-10 * T);
		return tau;
	}

	/**
	 * Name: Computus.meanLongSun
	 * 
	 * Purpose: calculate the geometric mean longitude of the Sun (denoted
	 * as L_0) referred to the dynamic equinox.
	 * 
	 * Source: Borkowski, K. M., The Tropical Year and Solar Calendar,
	 * Journal of the Royal Astronomical Society of Canada, Vol. 85,
	 * NO. 3/JUN, P.121, 1991.
	 * 
	 *   URL: https://articles.adsabs.harvard.edu//full/1991JRASC..85..121B/0000121.000.html
	 * @param {*} T number of Julian centuries since J2000.0
	 * @returns the geometric mean longitude of the Sun in degrees
	 */
	static geomMeanLongSun_borkowski(T: number): number {
		let L_0 = dmod(280.4664485 + T * (0.7698231361137005 + T * (1.093241/3600 + 0.0000762/3600 * T) )); // in degrees
		return L_0;
	}

	/**
	 * Name: Computus.calGeomMeanLongSun
	 * 
	 * Purpose: calculate the geometric mean longitude of the Sun (denoted
	 * as L_0) referred to the mean equinox of the date.
	 * 
     * Source: Jean Meeus, Astronomical Algorithms ; Richmond (Virginia,
     * États-Unis), Willmann-Bell, 1998, pp. 163.
	 * @param {*} T number of Julian centuries since J2000.0
	 * @returns the geometric mean longitude of the Sun in degrees
	 */
	static geomMeanLongSun(T: number): number {
		let L_0 = dmod(280.46646 + T * (36000.76983 + 0.0003032 * T)); // in degrees
		return L_0;
	}

	/**
	 * Name: Computus.calGeomAnomalySun
	 * 
	 * Purpose: calculate the Geometric Mean Anomaly of the Sun (denoted as M).
	 * 
     * Source: Jean Meeus, Astronomical Algorithms ; Richmond (Virginia,
     * États-Unis), Willmann-Bell, 1998, pp. 163.
	 * @param {*} T number of Julian centuries since J2000.0
	 * @returns the Geometric Mean Anomaly of the Sun in degrees
	 */
	static geomMeanAnomalySun(T: number): number {
		let M = (357.52911 + T * (35999.05029 - 0.0001537 * T));		// in degrees
		return M;
	}

	/**
	 * Name: Computus.eccentricityEarthOrbit
	 * 
	 * Purpose: calculate the eccentricity of earth's orbit (denoted as e).
	 * 
     * Source: Jean Meeus, Astronomical Algorithms ; Richmond (Virginia,
     * États-Unis), Willmann-Bell, 1998, pp. 163.
	 * @param {*} T number of Julian centuries since J2000.0
	 * @returns the unitless eccentricity
	 */
	static eccentricityEarthOrbit(T: number): number {
		let e = 0.016708634 - T * (0.000042037 + 0.0000001267 * T);
		return e;		// unitless
	}

	/**
	 * Name: Computus.sunEqOfCenter
	 * 
	 * Purpose: calculate the equation of center for the Sun (denoted as C).
	 * 
     * Source: Jean Meeus, Astronomical Algorithms ; Richmond (Virginia,
     * États-Unis), Willmann-Bell, 1998, pp. 164.
	 * @param {*} T number of Julian centuries since J2000.0
	 * @returns in degrees
	 */
	static sunEqOfCenter(T: number): number {
		let M = Computus.geomMeanAnomalySun(T);
		let C = dsin(M) * (1.914602 - T * (0.004817 + 0.000014 * T)) + dsin(2*M) * (0.019993 - 0.000101 * T) + dsin(3*M) * 0.000289; // in degrees
		return C;
	}

	/**
	 * Name: Computus.sunTrueLong
	 * 
	 * Purpose: calculate the true longitude of the Sun (denoted as \odot).
	 * 
     * Source: Jean Meeus, Astronomical Algorithms ; Richmond (Virginia,
     * États-Unis), Willmann-Bell, 1998, pp. 164.
	 * @param {*} T number of Julian centuries since J2000.0
	 * @returns Sun's true longitude in degrees
	 */
	static sunTrueLong(T: number): number {
		let L_0 = Computus.geomMeanLongSun(T);
		let C = Computus.sunEqOfCenter(T);
		let O = L_0 + C;
		return O; // in degrees
	}

	/**
	 * Name: Computus.sunTrueAnomaly
	 * 
	 * Purpose: calculate the true anamoly of the Sun (denoted as \nu).
	 * 
     * Source: Jean Meeus, Astronomical Algorithms ; Richmond (Virginia,
     * États-Unis), Willmann-Bell, 1998, pp. 164.
	 * @param {*} T number of Julian centuries since J2000.0
	 * @returns Sun's true anamoly in degrees
	 */
	static sunTrueAnomaly(T: number): number {
		let M = Computus.geomMeanAnomalySun(T);
		let C = Computus.sunEqOfCenter(T);
		let nu = M + C;
		return nu;		// in degrees
	}

	/**
	 * Name: Computus.sunRadVector
	 * 
	 * Purpose: calculate the distance to the Sun in AU (denoted as R).
	 * 
     * Source: Jean Meeus, Astronomical Algorithms ; Richmond (Virginia,
     * États-Unis), Willmann-Bell, 1998, pp. 164.
	 * @param {*} T number of Julian centuries since J2000.0
	 * @returns Sun radius vector in AUs
	 */
	static sunRadVector(T: number): number {
		let nu = Computus.sunTrueAnomaly(T);
		let e = Computus.eccentricityEarthOrbit(T);
		let R = (1.000001018 * (1 - e * e)) / (1 + e * dcos(nu));
		return R;		// in AUs
	}

	/**
	 * Name: Computus.AU
	 * 
	 * Meaning: Astronomic Unit in kilometers
	 */
	static AU = 149597870.7;

	/**
	 * Name: Computus.sunRadius
	 * Meaning: Sun radius in kilometers
	 */
	static sunRadius = 695700;

	/**
	 * Name: Computus.sunAperture
	 * 
	 * Purpose: Calculate solar disk aperture angle
	 * @param {*} T number of Julian centuries since J2000.0
	 * @returns solar disk angle in degrees
	 */
	static sunAperture(T: number): number {
		let alpha = datan2(Computus.sunRadius,Computus.sunRadVector(T)*Computus.AU)
		return alpha;
	}

	/**
	 * Name: Computus.sunApparentLong
	 * 
	 * Purpose: calculate the apparent longitude of the Sun referred to the
	 * true equinox of date.
	 * 
     * Source: Jean Meeus, Astronomical Algorithms ; Richmond (Virginia,
     * États-Unis), Willmann-Bell, 1998, pp. 164.
	 * @param {*} T number of Julian centuries since J2000.0
	 * @returns Sun's apparent longitude in degrees
	 */
	static sunApparentLong(T: number): number {
		let Omega = 125.04 - 1934.136 * T;
		let lambda = Computus.sunTrueLong(T) - 0.00569 - 0.00478 * dsin(Omega);
		return lambda;		// in degrees
	}

	/**
	 * Name: Computus.meanObliquityOfEcliptic
	 * 
	 * Purpose: calculate the mean obliquity of the ecliptic.
	 * 
     * Source: Jean Meeus, Astronomical Algorithms ; Richmond (Virginia,
     * États-Unis), Willmann-Bell, 1998, pp. 147.
	 * @param {*} T number of Julian centuries since J2000.0
	 * @returns mean obliquity in degrees
	 */
	static meanObliquityOfEcliptic(T: number): number {
		let seconds = 21.448 - T*(46.8150 + T*(0.00059 - T*(0.001813)));
		let epsilon_0 = 23 + (26 + (seconds/60))/60;
		return epsilon_0;		// in degrees
	}

	/**
	 * Name: Computus.obliquityCorrection
	 * 
	 * Purpose: calculate the corrected obliquity of the ecliptic.
	 * 
     * Source: NOAA Sun Calculator.
	 * @param {*} T number of Julian centuries since J2000.0
	 * @returns corrected obliquity in degrees
	 */
	static obliquityCorrection(T: number): number {
		let epsilon_0 = Computus.meanObliquityOfEcliptic(T);
		let Omega = 125.04 - 1934.136 * T;
		let epsilon = epsilon_0 + 0.00256 * dcos(Omega);
		return epsilon;		// in degrees
	}

	/**
	 * Name: Computus.sunRtAscension
	 * 
	 * Purpose: calculate the right ascension of the Sun.
	 * 
     * Source: Jean Meeus, Astronomical Algorithms ; Richmond (Virginia,
     * États-Unis), Willmann-Bell, 1998, pp. 165.
	 * @param {*} T number of Julian centuries since J2000.0
	 * @returns Sun's right ascension in degrees
	 */
	static sunRtAscension(T: number): number {
		let e = Computus.obliquityCorrection(T);
		let lambda = Computus.sunApparentLong(T);
		let alpha = datan2(dcos(e) * dsin(lambda), dcos(lambda));
		return alpha;		// in degrees
	}

	/**
	 * Name: Computus.sunDeclination
	 * 
	 * Purpose: Calculate the declination of the Sun (denoted as \delta).
	 * 
     * Source: Jean Meeus, Astronomical Algorithms ; Richmond (Virginia,
     * États-Unis), Willmann-Bell, 1998, pp. 165.
	 * @param {*} T number of Julian centuries since J2000.0
	 * @returns Sun's declination in degrees
	 */
	static sunDeclination(T: number): number {
		let epsilon = Computus.obliquityCorrection(T);
		let lambda = Computus.sunApparentLong(T);
		let delta = dasin(dsin(epsilon) * dsin(lambda));
		return delta;		// in degrees
	}

	/**
	 * Name: Computus.equationOfTime
	 * 
	 * Purpose: Calculate the difference between true solar time and mean
	 * solar time.
	 * 
     * Source: Jean Meeus, Astronomical Algorithms ; Richmond (Virginia,
     * États-Unis), Willmann-Bell, 1998, pp. 185.
	 * @param {*} T number of Julian centuries since J2000.0
	 * @returns equation of time in minutes of time
	 */
	static equationOfTime(T: number): number {
		let epsilon = Computus.obliquityCorrection(T);
		let L_0 = Computus.geomMeanLongSun(T);
		let e = Computus.eccentricityEarthOrbit(T);
		let M = Computus.geomMeanAnomalySun(T);
		let y = dtan(epsilon/2)**2;
		let E = y * dsin(2*L_0) - 2 * e * dsin(M) + 4 * e * y * dsin(M) * dcos(2*L_0) - 0.5 * y ** 2 * dsin(4*L_0) - 1.25 * e ** 2 * dsin(2*M);
		return rad2deg(E) * Computus.daymin/360;	// in minutes of time
	}

	/**
	 * Name: Computus.hourAngle
	 * 
	 * Purpose: Calculate the hour angle for the given location, decl, and
	 * time of day.
	 * @param {*} time 
	 * @param {*} lng 
	 * @param {*} eqtime 
	 * @returns 
	 */
	static hourAngle(time: number, lng: number, eqtime: number): number {
		return (15*(time + (lng/15) - (eqtime/60)));
		// in degrees
	}

	/**
	 * Name: Computus.hourAngleSunrise
	 * 
	 * Purpose: Calculate the hour angle of the Sun at sunrise for the
	 * latitude.
	 * @param {*} lat latitude of observer in degrees
	 * @param {*} solarDec declination angle of Sun in degrees
	 * @returns hour angle of sunrise in degrees
	 */
	static hourAngleSunrise(lat: number, solarDec: number): number {
		return dacos(dcos(90.833)/(dcos(lat)*dcos(solarDec))-dtan(lat)*dtan(solarDec)); // in degrees
	}

	/**
	 * Name: Computus.solarTimeUTC
	 * 
	 * Purpose: Calculate the Universal Coordinated Time (UTC) of solar time
	 * for the given day at the given location on earth. Solar time is
	 * specified as fraction of day (0 = solar noon)
	 * @param {*} JD Julian day
	 * @param {*} lng longitude of observer in degrees (West=- East=+)
	 * @param {*} time Solar time as fraction of day (-0.5 < time < 0.5; 0 = solar noon).
	 * @returns 
	 */
	static solarTimeUTC(JD: number, lng: number, time: number): number {
		const eps = 1e-9;
		JD = round(JD);
		// First pass uses approximate solar time to calculate equation of time
		let Ttime = Computus.jd2jc(JD + time - lng/360);
		let eqtime = Computus.equationOfTime(Ttime);
		let soltime = Computus.daymin * (time+0.5) - Computus.daymin/360 * lng - eqtime; // min
		let lasttime;
		do {
			lasttime = soltime;
			Ttime = Computus.jd2jc(JD - 0.5 + soltime/Computus.daymin);
			eqtime = Computus.equationOfTime(Ttime);
			soltime = Computus.daymin * (time+0.5) - Computus.daymin/360 * lng - eqtime; // min
		} while (abs(abs(lasttime)-abs(soltime)) > eps)
		return soltime;
	}

	/**
	 * Name: Computus.sunRiseNoonSetUTC
	 * 
	 * Purpose: Calculate the Universal Coordinated Time (UTC) of sunrise for
	 * the given day at the given location on earth.
	 * @param {*} JD Julian day
	 * @param {*} lat latitude of observer in degrees
	 * @param {*} lng longitude of observer in degrees
	 * @param {*} risenoonset -1 for rise 1 for set, 0 for noon
	 * @returns time in minutes from zero Z
	 */
	static sunRiseNoonSetUTC(JD: number, lat: number, lng: number, risenoonset: number): number {
		const eps = 1e-9;
		JD = round(JD);
		// Find the time of solar noon at the location, and use
        // that declination. This is better than start of the 
        // Julian day
		// First pass to approximate sunrise (using solar noon)
		// Second pass includes fractional jday in iterative gamma calc.
		let timeUTC = Computus.solarTimeUTC(JD, lng, 0);
		if (risenoonset!==0) {
			let lasttimeUTC;
			do {
				lasttimeUTC = timeUTC;
				let newt = Computus.jd2jc(JD + timeUTC/Computus.daymin); 
				let eqTime = Computus.equationOfTime(newt);
				let solarDec = Computus.sunDeclination(newt);
				timeUTC = Computus.daymin/2 - Computus.daymin/360 * (lng - sign(risenoonset) * Computus.hourAngleSunrise(lat, solarDec)) - eqTime; // in minutes
			} while (abs(abs(lasttimeUTC)-abs(timeUTC)) > eps);
		}
		return timeUTC;
	}

	/**
	 * Name: Computus.findSunRiseSet
	 * 
	 * Purpose: Calculate the Julian day of the most recent sunrise starting
	 * from the given day at the given location on earth.
	 * @param {*} jd Julian day
	 * @param {*} lat latitude of observer in degrees
	 * @param {*} lng longitude of observer in degrees
	 * @param {*} riseset -1 for rise 1 for set
	 * @param {*} prevnext -1 for recent, 1 for next
	 * @returns Julian day of the most recent sunrise
	 */
	static findSunRiseSet(JD: number, lat: number, lng: number, riseset: number, prevnext: number): number {
		let time = Computus.sunRiseNoonSetUTC(JD, lat, lng, riseset);
		while(!isNumber(time)) {
			JD += sign(prevnext);
			time = Computus.sunRiseNoonSetUTC(JD, lat, lng, riseset);
		}
		return JD;
	}

/*
	var timepos = {
		latitude:0,
		longitude:0,
		zone:0,
		year:0,
		month:0,
		date:0,
		hours:0,
		minutes:0,
		seconds:0,
		daysave:0,// in minutes
	};
*/	




	/**
	 * Name: Computus.polarLightNorthDarkSouth
	 * 
	 * Purpose: Test if polar northern hemisphere and spring or summer, or if
	 * polar southern hemisphere and fall or winter (previous sunrise and
	 * next sunset).
	 * @param {*} lat Latitude
	 * @param {*} doy Day of year
	 * @returns 
	 */
	static polarLightNorthDarkSouth(lat: number,doy: number): number | boolean {
		return ( ((lat > (66+24/60)) && (doy > 79) && (doy < 267)) || ((lat < -(66+24/60)) && ((doy < 83) || (doy > 263))) );
        // ( (Polar Arctic)  and  (doy>20Mar) and (doy<24Set) ) or ( (Polar Antartic) and ((doy<24Mar) or (doy>20Set)) )

	}

	/**
	 * Name: Computus.polarDarkNorthLightSouth
	 * 
	 * Purpose: Test if polar northern hemisphere and fall or winter, or if
	 * polar Southern hemisphere and spring or summer (next sunrise and
	 * previous sunset).
	 * @param {*} lat Latitude
	 * @param {*} doy Day of year
	 * @returns 
	 */
	static polarDarkNorthLightSouth(lat: number,doy: number): number | boolean {
		return ( ((lat > (66+24/60)) && ((doy < 83) || (doy > 263))) || ((lat < -(66+24/60)) && (doy > 79) && (doy < 267)) );
        // ( (Polar Arctic)  and  ((doy<24Mar) or (doy>20Set)) ) or ( (Polar Antartic) and (doy>20Mar) and (doy<24Set) )
	}

	/**
	 * Name: Computus.sunRiseNoonSet
	 * 
	 * Purpose: Calculate sunrise, sunset an solar noon times.
	 * @param {*} lat Latitude
	 * @param {*} lng Longitude
	 * @param {*} tz Timezone
	 * @param {*} jd Julian day
	 * @param {*} doy Day of year
	 * @param {*} daysave 
	 * @returns Object with fields:
	 * {
	 *     
	 * }
	 */
	static sunRiseNoonSet(lat: number, lng: number, tz: number, jd: number, doy: number, daysave: number) {
		let result: any = {};
		// Calculate sunrise for this date. If no sunrise is found, set flag
		// nosunrise.
		result.nosunrise = false;
		result.riseTimeGMT = Computus.sunRiseNoonSetUTC(jd, lat, lng, -1);
		if (!isNumber(result.riseTimeGMT)) {
			result.nosunrise = true;
		}

		// Calculate sunset for this date. If no sunset is found, set flag
		// nosunset.
		result.nosunset = false;
		result.setTimeGMT = Computus.sunRiseNoonSetUTC(jd, lat, lng, 1);
		if (!isNumber(result.setTimeGMT)) {
			result.nosunset = true;
		}

		if (!result.nosunrise) { // Sunrise was found
			result.riseTimeLST = result.riseTimeGMT + (60 * tz) + daysave; //	in minutes
		}
		if (!result.nosunset) { // Sunset was found
			result.setTimeLST = result.setTimeGMT + (60 * tz) + daysave;
		}

		// Calculate solar noon for this date
		result.solNoonGMT = Computus.solarTimeUTC(round(jd), lng, 0);
		result.solNoonLST = result.solNoonGMT + (60 * tz) + daysave;
		result.tsnoon = Computus.jd2jc(jd - 0.5 + result.solNoonGMT/Computus.daymin); 
		result.eqTime = Computus.equationOfTime(result.tsnoon);
		result.solarDec = Computus.sunDeclination(result.tsnoon);

		if (result.nosunrise || result.nosunset) {
			result.polarLightNorthDarkSouth = Computus.polarLightNorthDarkSouth(lat,doy);
			result.polarDarkNorthLightSouth = Computus.polarDarkNorthLightSouth(lat,doy);
			let newjd, newtime;
			// report special cases of no sunrise
			if(result.nosunrise) { 
				result.riseTimeGMT = NaN;
				if (result.polarLightNorthDarkSouth) { // Previous sunrise and next sunset.
					newjd = Computus.findSunRiseSet(jd, lat, lng, -1, -1);
					newtime = Computus.sunRiseNoonSetUTC(newjd, lat, lng, -1) + (60 * tz) + daysave;
					if (newtime > Computus.daymin) {
						newtime -= Computus.daymin;
						newjd += 1;
					}
					if (newtime < 0) {
						newtime += Computus.daymin;
						newjd -= 1;
					}
					result.riseTimeLST = newtime;
					result.riseTimeJD = newjd;
					result.riseTimeGMT = NaN;
					result.polarLightNorthDarkSouth = true;
					result.polarDarkNorthLightSouth = false;
				}
				else if (result.polarDarkNorthLightSouth) { // Next sunrise and previous sunset.
					newjd = Computus.findSunRiseSet(jd, lat, lng, -1, 1);
					newtime = Computus.sunRiseNoonSetUTC(newjd, lat, lng, -1) + (60 * tz) + daysave;
					if (newtime > Computus.daymin) {
						newtime -= Computus.daymin;
						newjd += 1;
					}
					if (newtime < 0) {
						newtime += Computus.daymin;
						newjd -= 1;
					}
					result.riseTimeLST = newtime;
					result.riseTimeJD = newjd;
					result.riseTimeGMT = NaN;
					result.polarLightNorthDarkSouth = false;
					result.polarDarkNorthLightSouth = true;
				}
			}

			// report special cases of no sunset
			if(result.nosunset) { 
				result.setTimeGMT = NaN;
				if (result.polarLightNorthDarkSouth) { // Previous sunrise and next sunset
					newjd = Computus.findSunRiseSet(jd, lat, lng, 1, 1);
					newtime = Computus.sunRiseNoonSetUTC(newjd, lat, lng, 1) + (60 * tz) + daysave;
					if (newtime > Computus.daymin) {
						newtime -= Computus.daymin;
						newjd += 1;
					}
					if (newtime < 0) {
						newtime += Computus.daymin;
						newjd -= 1;
					}
					result.setTimeLST = newtime;
					result.setTimeJD = newjd;
					result.setTimeGMT = NaN; // next sunset
					result.solNoonGMT = NaN;
					result.polarLightNorthDarkSouth = true;
					result.polarDarkNorthLightSouth = false;
				}

				else if (result.polarDarkNorthLightSouth) { // Next sunrise and last sunset.
					newjd = Computus.findSunRiseSet(jd, lat, lng, 1, -1);
					newtime = Computus.sunRiseNoonSetUTC(newjd, lat, lng, 1) + (60 * tz) + daysave;
					if (newtime > Computus.daymin) {
						newtime -= Computus.daymin;
						newjd += 1;
					}
					if (newtime < 0) {
						newtime += Computus.daymin;
						newjd -= 1;
					}
					result.setTimeLST = newtime;
					result.setTimeJD = newjd;
					result.setTimeGMT = NaN; // prior sunset
					result.solNoonGMT = NaN;
					result.polarLightNorthDarkSouth = false;
					result.polarDarkNorthLightSouth = true;
				}
			}
		}
		return result;
	}

	/**
	 * Name: Computus.refractionCorrection
	 * 
	 * Purpose: Calculate approximate atmospheric refraction effects correction.
	 * @param {*} exoatmElevation elevation at exoatmosphere in degrees (90 - zenith)
	 * @returns approximate atmospheric refraction correction in degrees
	 */
	static refractionCorrection(exoatmElevation: number): number {
		let result;
		if (exoatmElevation > 85) {
			result = 0;
		}
		else {
			let te = dtan(exoatmElevation);
			result;
			if (exoatmElevation > 5) {
				result = 58.1 / te - 0.07 / (te*te*te) + 0.000086 / (te*te*te*te*te);
			}
			else if (exoatmElevation > -0.575) {
				result =
					1735.0 + exoatmElevation * (-518.2 + exoatmElevation * (103.4 + exoatmElevation * (-12.79 + exoatmElevation * 0.711) ) );
			}
			else {
				result = -20.774 / te;
			}
			result = result / 3600;
		}
		return result;
	}

	/**
	 * Name: Computus.sunPosition
	 * 
	 * Purpose: Calculate Sun position at given time.
	 * @param {*} lat Latitude
	 * @param {*} lng Longitude
	 * @param {*} tz Timezone
	 * @param {*} time Local time of day in minutes
	 * @param {*} eqtime Equation of time
	 * @param {*} dec Solar declination
	 * @returns Object with fields:
	 * {
	 *     eqTime: Equation of time, 
	 *     solarDec: Sun Declination in degrees, 
	 *     astrotwilight: Astronomical twilight, 
	 *     azimuth: Solar azimuth, 
	 *     elevation: Solar elevation, 
	 *     coszen: Cosine of solar zenith angle
	 * }
	 */
	static sunPosition(lat: number, lng: number, tz: number, time: number, eqtime: number, dec: number) {
		let result: any = {};
		result.eqTime = eqtime;
		result.solarDec = dec;

		let solarTimeFix = result.eqTime + Computus.daymin/360 * lng - 60 * tz;
		let trueSolarTime = time + solarTimeFix;
		// in minutes
		while (trueSolarTime > Computus.daymin) {
			trueSolarTime -= Computus.daymin;
		}

		let hourAngle = trueSolarTime / (Computus.daymin/360) - 180;
		if (hourAngle < -180) {
			hourAngle += 360;
		}

		let csz =
			dsin(lat) * dsin(result.solarDec) + 
			dcos(lat) * dcos(result.solarDec) * dcos(hourAngle);
		if (csz > 1) {
			csz = 1;
		}
		else if (csz < -1) { 
			csz = -1; 
		}
		let zenith = dacos(csz);

		let azDenom = ( dcos(lat) * dsin(zenith) );
		if (Math.abs(azDenom) > 0.001) {
			let azRad = (( dsin(lat) * dcos(zenith) ) - dsin(result.solarDec)) / azDenom;
			if (Math.abs(azRad) > 1) {
				if (azRad < 0) {
					azRad = -1;
				} else {
					azRad = 1;
				}
			}

			result.azimuth = 180 - dacos(azRad);

			if (hourAngle > 0) {
				result.azimuth = -result.azimuth;
			}
		}
		else {
			if (lat > 0) {
				result.azimuth = 180;
			}
			else { 
				result.azimuth = 0;
			}
		}
		if (result.azimuth < 0) {
			result.azimuth += 360;
		}

		let solarZen = zenith - Computus.refractionCorrection(90 - zenith);

		if(solarZen < 108) { // astronomical twilight
			result.astrotwilight = true;
			result.elevation = 90 - solarZen;
			if (solarZen < 90) {
				result.coszen = dcos(solarZen);
			}
			else {
				result.coszen = 0;
			}
		}
		else {  // do not report az & el after astro twilight
			result.astrotwilight = false;
			result.azimuth = NaN;
			result.elevation = NaN;
			result.coszen = 0;
		}
		return result;
	}

	static sunpos(lat: number, lng: number, tz: number, time: number, eqtime: number, decl: number) {
		let result: any = {};
		result.eqtime = eqtime;
		result.decl = decl;

		result.truetime = time + result.eqtime + Computus.daymin/360 * lng - 60 * tz;
		// in minutes
		while (result.truetime > Computus.daymin) {
			result.truetime -= Computus.daymin;
		}

		result.hourangle = result.truetime / (Computus.daymin/360) - 180;
		if (result.hourangle < -180) {
			result.hourangle += 360;
		}

		result.csz =
			dsin(lat) * dsin(result.decl) + 
			dcos(lat) * dcos(result.decl) * dcos(result.hourangle);
		if (result.csz > 1) {
			result.csz = 1;
		}
		else if (result.csz < -1) { 
			result.csz = -1; 
		}
		result.zenith = dacos(result.csz);

		let azDenom = ( dcos(lat) * dsin(result.zenith) );
		if (Math.abs(azDenom) > 0.001) {
			let azRad = (( dsin(lat) * dcos(result.zenith) ) - dsin(result.decl)) / azDenom;
			if (Math.abs(azRad) > 1) {
				if (azRad < 0) {
					azRad = -1;
				} else {
					azRad = 1;
				}
			}

			result.az = 180 - dacos(azRad);

			if (result.hourangle > 0) {
				result.az = -result.az;
			}
		}
		else {
			if (lat > 0) {
				result.az = 180;
			}
			else { 
				result.az = 0;
			}
		}
		if (result.az < 0) {
			result.az += 360;
		}

		result.solarzen = result.zenith - Computus.refractionCorrection(90 - result.zenith);		

		result.el = 90 - result.solarzen;
		if (result.solarzen < 90) {
			result.coszen = dcos(result.solarzen);
		}
		else {
			result.coszen = 0;
		}

		return result;
	}

	static sunAnalemma(
			year: number,
			hour: number,
			lat: number,
			lng: number,
			tz: number
		) {
		let result = new Array(Computus.yeardays(year));
		let jdyear = Computus.cal2jd(year,0,1);
		for (let d=0; d<result.length; d++) {
			result[d] = { };
			result[d].T = Computus.jd2jc(jdyear + d + (hour + tz)/24);
			result[d].eqtime = Computus.equationOfTime(result[d].T);
			result[d].decl = Computus.sunDeclination(result[d].T);
			let solarpos = Computus.sunpos(lat, lng, tz, hour * 60, result[d].eqtime, result[d].decl)
			result[d].az = solarpos.az;
			result[d].el = solarpos.el;
		}
		return result;
	}

	static sunChart(
		year: number,
		lat: number,
		lng: number,
		tz: number
	) {
		let result = new Array(Computus.yeardays(year));
		let jdyear = Computus.cal2jd(year,0,1);
		for (let d=0; d<result.length; d++) {
			result[d] = new Array(23);
			for (let h = 0; h<=23; h++) {
				result[d][h] = {};
				result[d][h].T = Computus.jd2jc(jdyear + d + (h + tz)/24);
				result[d][h].eqtime = Computus.equationOfTime(result[d][h].T);
				result[d][h].decl = Computus.sunDeclination(result[d][h].T);
				let solarpos = Computus.sunpos(lat, lng, tz, h * 60, result[d][h].eqtime, result[d][h].decl)
				result[d][h].az = solarpos.az;
				result[d][h].el = solarpos.el;
			}
		}
		return result;
	}

	/**
	 * Name: Computus.sunData
	 * 
	 * Purpose: Calculate time of sunrise and sunset for the entered date and
	 * location. In the special cases near earth's poles, the date of nearest
	 * sunrise and sunset are reported.
	 * Calculate solar position for the desired date, time and
	 * location (at noon too). Results are reported in azimuth and elevation
	 * (in degrees) and cosine of solar zenith angle.
	 * @param {*} timepos 
	 * @returns 
	 */
	static sunData(timepos: any) {
		let result: any = {};
		if((timepos.latitude >= -90) && (timepos.latitude < -89.8)) {
			timepos.latitude = -89.8;
		}
		if ((timepos.latitude <= 90) && (timepos.latitude > 89.8)) {
			timepos.latitude = 89.8;
		}
		result.JD = Computus.cal2jd(timepos.year, timepos.month, timepos.date);
		let doy = Computus.cal2doy(timepos.year, timepos.month, timepos.date);

		let T = Computus.jd2jc(result.JD - timepos.zone/24);
		result.solarDec = Computus.sunDeclination(T);
		result.eqTime = Computus.equationOfTime(T);
		result.timings = Computus.sunRiseNoonSet(timepos.latitude, timepos.longitude, timepos.zone, result.JD, doy, timepos.daysave)

		// timenow is GMT time for calculation
		result.timenow = timepos.hours - timepos.daysave/60 + timepos.minutes/60 + timepos.seconds/3600 - timepos.zone;	// in hours since 0Z

		T = Computus.jd2jc(result.JD + result.timenow/24);
		result.sunpos = Computus.sunPosition(
			timepos.latitude,
			timepos.longitude,
			timepos.zone,
			(timepos.hours - timepos.daysave/60) * 60 + timepos.minutes + timepos.seconds/60,
			Computus.equationOfTime(T),
			Computus.sunDeclination(T)
		);

		T = Computus.jd2jc(result.JD + 0.5 - timepos.zone/24);
		result.sunposNoon = Computus.sunPosition(
			timepos.latitude,
			timepos.longitude,
			timepos.zone,
			result.timings.solNoonLST,
			Computus.equationOfTime(T),
			Computus.sunDeclination(T)
		);

		T = Computus.jd2jc(result.JD - timepos.zone/24);
		result.sunposMidnight = Computus.sunPosition(
			timepos.latitude,
			timepos.longitude,
			timepos.zone,
			0,
			Computus.equationOfTime(T),
			Computus.sunDeclination(T)
		);

		return result;
	}

	/**
	 * ========== Moon's functions ==========
	 */

	/**
	 * Name: Computus.truePhaseIndex
	 * 
	 * For example, use:
	 * 
	 *     years = year - 2000
	 * 
	 * to specify index from New Moon of January 2000
	 * @param {*} years years (decimal) from era
	 * @returns 
	 */
	static truePhaseIndex(years: number): number {
		return trunc(round((12.3685 * years)*40)/10)/4;
	}

	/**
	 * Name: Computus.synodicMonth
	 * @returns Synodic month (new Moon to new Moon), in days
	 */
	static synodicMonth = 29.53058868;

	/**
	 * Name: Computus.truePhaseMoon1900
	 * 
	 * Purpose: Given a k value used to determine the mean phase of the new
	 * moon, and a phase selector (0, 1, 2, 3), obtain the true, corrected
	 * phase time. The value k = 0 corresponds to the New Moon of 1900
	 * January 30. Negative values of k give lunar phases before the year 1900.
	 * The resulting times will be expressed in Julian Ephemeris Days (JDE),
	 * hence in Dynamical Time.
	 * 
	 * @param {*} k phase index (0 = New Moon of 2000 January 6)
	 * @param {*} phase 0=New Moon, 1=First Quarter, 2=Full Moon, 3=Last Quarter
	 * @returns time of the true (apparent) phase expressed in Julian Days
	 * of a Dynamical Time Scale.
	 */
	static truePhaseMoon1900(k: number, phase?: number): number {
		if (phase !== undefined) {
			// restrict phase to 0-3
			phase = phase & 3;
		}
		else {
			// get phase from fractional part of k
			phase = trunc(frac(k)*4) & 3;
		}
		// add phase to new moon time
		k = trunc(k) + phase/4;
		// Time in Julian centuries since 1900 January 0.5
		const T = k / 1236.85
		// Mean time of phase
		let JDE = 2415020.75933 +
			Computus.synodicMonth * k +
			(0.0001178 - 0.000000155 * T) * T * T +
			0.00033 * dsin(166.56 + (132.87 - 0.009173 * T) * T)
		// Sun's mean anomaly
		const M = 359.2242 + 29.10535608 * k - (0.0000333 - 0.00000347 * T) * T * T
		// Moon's mean anomaly
		const M_ = 306.0253 + 385.81691806 * k + (0.0107306 + 0.00001236 * T) * T * T
		// Moon's argument of latitude
		const F = 21.2964 + 390.67050646 * k - (0.0016528 - 0.00000239 * T) * T * T
		// use different correction equations depending on the phase being sought
		switch (phase) {
			// new and full moon use one correction
			case 0: // new moon
			case 2: // full moon
				JDE += (0.1734 - 0.000393 * T) * dsin(M) +
					0.0021 * dsin(2 * M) -
					0.4068 * dsin(M_) +
					0.0161 * dsin(2 * M_) -
					0.0004 * dsin(3 * M_) +
					0.0104 * dsin(2 * F) -
					0.0051 * dsin(M + M_) -
					0.0074 * dsin(M - M_) +
					0.0004 * dsin(2 * F + M) -
					0.0004 * dsin(2 * F - M) -
					0.0006 * dsin(2 * F + M_) +
					0.0010 * dsin(2 * F - M_) +
					0.0005 * dsin(M + 2 * M_)
			break;
			// first and last quarter moon use a different correction
			case 1: // first quarter
			case 3: // last quarter
				JDE += (0.1721 - 0.0004 * T) * dsin(M) +
					0.0021 * dsin(2 * M) -
					0.6280 * dsin(M_) +
					0.0089 * dsin(2 * M_) -
					0.0004 * dsin(3 * M_) +
					0.0079 * dsin(2 * F) -
					0.0119 * dsin(M + M_) -
					0.0047 * dsin(M - M_) +
					0.0003 * dsin(2 * F + M) -
					0.0004 * dsin(2 * F - M) -
					0.0006 * dsin(2 * F + M_) +
					0.0021 * dsin(2 * F - M_) +
					0.0003 * dsin(M + 2 * M_) +
					0.0004 * dsin(M - 2 * M_) -
					0.0003 * dsin(2 * M + M_)
					// the sign of the last term depends on whether we're looking for a first (+)
					// or last (-) quarter Moon.
					JDE += ((phase < 2) ? +1 : -1) * (0.0028 - 0.0004 * dcos(M) + 0.0003 * dcos(M_))
			break;
		}
		return JDE;
	}

	/**
	 * Name: Computus.truePhaseMoon
	 * 
	 * Purpose: Given a k value used to determine the mean phase of the new
	 * moon, and a phase selector (0, 1, 2, 3), obtain the true, corrected
	 * phase time. The value k = 0 corresponds to the New Moon of 2000
	 * January 6. Negative values of k give lunar phases before the year 2000.
	 * The resulting times will be expressed in Julian Ephemeris Days (JDE),
	 * hence in Dynamical Time.
	 * 
     * Source: Jean Meeus, Astronomical Algorithms ; Richmond (Virginia,
     * États-Unis), Willmann-Bell, 1998, pp. 349-352.
	 * @param {*} k phase index (0 = New Moon of 2000 January 6)
	 * @param {*} phase 0=New Moon, 1=First Quarter, 2=Full Moon, 3=Last Quarter
	 * @returns time of the true (apparent) phase expressed in Julian Days
	 * of a Dynamical Time Scale.
	 */
	static truePhaseMoon(k: number, phase?: number): number {
		if (phase !== undefined) {
			// restrict phase to 0-3
			phase = phase & 3;
		}
		else {
			// get phase from fractional part of k
			phase = trunc(frac(k)*4) & 3;
		}
		// add phase to new moon time
		k = trunc(k) + phase/4;
		// Time in Julian centuries since the epoch 2000.0
		const T = k / 1236.85
		// Mean time of phase (affected by the Sun's aberration and by the Moon's light-time)
		let JDE = 2451550.09766 + 29.530588861   * k +
								+  0.00015437    * T**2
								-  0.000000150   * T**3
								+  0.00000000073 * T**4;
		// Correction of eccentricity of the Earth's orbit
		const E = 1 - 0.002516 * T - 0.0000074 * T**2;
		// Sun's mean anomaly
		const M = dmod(2.5534 + 29.10535670 * k
							  -  0.00000140 * T**2
							  -  0.00000011 * T**3);
		// Moon's mean anomaly
		const M_ =  dmod(201.5643 + 385.81693528  * k
								  +   0.0107582   * T**2
								  +   0.00001238  * T**3
								  -   0.000000058 * T**4);
		// Moon's argument of latitude
		const F = dmod(160.7108 + 390.67050284  * k
								-   0.0016118   * T**2
								-   0.00000227  * T**3
								+   0.000000011 * T**4);
		// Longitude of the ascending node of the lunar orbit
		const Omega = dmod(124.7746 - 1.56375588 * k
									+ 0.0020672  * T**2
									+ 0.00000215 * T**3);

		// Use different corrections depending on the phase being sought
		switch (phase) {
			case 0: // new moon
			case 2: // full moon
				if (phase==0) { // new moon
					JDE +=
						- 0.40720        * dsin(M_)
						+ 0.17241 * E    * dsin(M)
						+ 0.01608        * dsin(2*M_)
						+ 0.01039        * dsin(2*F)
						+ 0.00739 * E    * dsin(M_-M)
						- 0.00514 * E    * dsin(M_+M)
						+ 0.00208 * E**2 * dsin(2*M);
				}
				else { // full moon
					JDE +=
						- 0.40614        * dsin(M_)
						+ 0.17302 * E    * dsin(M)
						+ 0.01614        * dsin(2*M_)
						+ 0.01043        * dsin(2*F)
						+ 0.00734 * E    * dsin(M_-M)
						- 0.00515 * E    * dsin(M_+M)
						+ 0.00209 * E**2 * dsin(2*M);
				}
				JDE +=
					- 0.00111        * dsin(M_-2*F)
					- 0.00057        * dsin(M_+2*F)
					+ 0.00056 * E    * dsin(2*M_+M)
					- 0.00042        * dsin(3*M_)
					+ 0.00042 * E    * dsin(M+2*F)
					+ 0.00038 * E    * dsin(M-2*F)
					- 0.00024 * E    * dsin(2*M_-M)
					- 0.00017        * dsin(Omega)
					- 0.00007        * dsin(M_+2*M)
					+ 0.00004        * dsin(2*M_-2*F)
					+ 0.00004        * dsin(3*M)
					+ 0.00003        * dsin(M_+M-2*F)
					+ 0.00003        * dsin(2*M_+2*F)
					- 0.00003        * dsin(M_+M+2*F)
					+ 0.00003        * dsin(M_-M+2*F)
					- 0.00002        * dsin(M_-M-2*F)
					- 0.00002        * dsin(3*M_+M)
					+ 0.00002        * dsin(4*M_);
			break;
			case 1: // first quarter
			case 3: // last quarter
				JDE +=
					- 0.62801        * dsin(M_)
					+ 0.17172 * E    * dsin(M)
					- 0.01183 * E    * dsin(M_+M)
					+ 0.00862        * dsin(2*M_)
					+ 0.00804        * dsin(2*F)
					+ 0.00454 * E    * dsin(M_-M)
					+ 0.00204 * E**2 * dsin(2*M)
					- 0.00180        * dsin(M_-2*F)
					- 0.00070        * dsin(M_+2*F)
					- 0.00040        * dsin(3*M_)
					- 0.00034 * E    * dsin(2*M_-M)
					+ 0.00032 * E    * dsin(M+2*F)
					+ 0.00032 * E    * dsin(M-2*F)
					- 0.00028 * E**2 * dsin(M_+2*M)
					+ 0.00027 * E    * dsin(2*M_+M)
					- 0.00017        * dsin(Omega)
					- 0.00005        * dsin(M_-M-2*F)
					+ 0.00004        * dsin(2*M_+2*F)
					- 0.00004        * dsin(M_+M+2*F)
					+ 0.00004        * dsin(M_-2*M)
					+ 0.00003        * dsin(M_+M-2*F)
					+ 0.00003        * dsin(3*M)
					+ 0.00002        * dsin(2*M_-2*F)
					+ 0.00002        * dsin(M_-M+2*F)
					- 0.00002        * dsin(3*M_+M);
				// the sign of the last term depends on whether we're looking for a first (+)
				// or last (-) quarter Moon.
				JDE += ((phase < 2) ? +1 : -1) * 0.00306 - 0.00038 * E * dcos(M) + 0.00026 * dcos(M_)
					- 0.00002 * dcos(M_-M) + 0.00002 * dcos(M_+M) + 0.00002 * dcos(2*F);
			break;
		}
		// Additional corrections for all phases (planetary arguments)
		JDE +=
			+ 0.000325 * dsin(299.77 +  0.107408 * k - 0.009173 * T**2)
			+ 0.000165 * dsin(251.88 +  0.016321 * k)
			+ 0.000164 * dsin(251.83 + 26.651886 * k)
			+ 0.000126 * dsin(349.42 + 36.412478 * k)
			+ 0.000110 * dsin( 84.66 + 18.206239 * k)
			+ 0.000062 * dsin(141.74 + 53.303771 * k)
			+ 0.000060 * dsin(207.14 +  2.453732 * k)
			+ 0.000056 * dsin(154.84 +  7.306860 * k)
			+ 0.000047 * dsin( 34.52 + 27.261239 * k)
			+ 0.000042 * dsin(207.19 +  0.121824 * k)
			+ 0.000040 * dsin(291.34 +  1.844379 * k)
			+ 0.000037 * dsin(161.72 + 24.198154 * k)
			+ 0.000035 * dsin(239.56 + 25.513099 * k)
			+ 0.000023 * dsin(331.55 +  3.592518 * k);
		return JDE;
	}

	/**
	 * Name: Computus.truePhaseYear
	 * 
	 * Purpose: Calculates a 14x4 matrix with Julian dates of the true phases
	 * of the Moon for a given year.
	 * @param year year
	 * @returns 14x4 matrix containing true phases of the Moon (JDE value) for a given year
	 */
	static truePhaseYear(year: number): Array<moonMonth> {
		let m = new Array(14);
		let k = Computus.truePhaseIndex(year - 2000);
		let cal = Computus.jd2cal(Computus.truePhaseMoon(k,0));
		if ( (cal[0]==year) && ((cal[2]>7) || (cal[1]>0)) ) k--;
		cal = Computus.jd2cal(Computus.truePhaseMoon(k,3));
		if ( cal[0]!=year ) k++;
		for (let l=0;l<14;l++,k++) {
			m[l] = new Array(4);
			for (let p=0;p<4;p+=1) {
				m[l][p] = Computus.truePhaseMoon(k,p);
			}
		}
		return m;
	}


	static eccentricAnomaly(M: number, e: number, tol:number = 1e-9): number {
		let E_0 = (e<0.8)?M:Math.PI;
		let E_1, dE;
		do {
			dE = (M - E_0 + (180/Math.PI) * e * dsin(E_0)) / (1 - e * dcos(E_0));
			E_0 = E_1 = E_0 + dE;
		} while (abs(dE)>tol);
		return E_1;
	}

}