const monthNameTable = [
"Janeiro",
"Fevereiro",
"Março",
"Abril",
"Maio",
"Junho",
"Julho",
"Agosto",
"Setembro",
"Outubro",
"Novembro",
"Dezembro"
];

const weekLetterTable = ["D","S","T","Q","Q","S","S"];

/**
 * Interface for Date polyfill
 */
 declare interface Date {
	getJulianDate() : number;
	setJulianDate(j: number) : Date;
}

// return Julian Day from Date object
Date.prototype.getJulianDate = function(): number {
    return ((this as unknown as number) / 864e5 + Computus.unixEra);
};

// set Julian Day in Date object
Date.prototype.setJulianDate = function(j: number): Date {
	this.setTime((j-Computus.unixEra)*864e5);
	return this;
};

const toJulianDate = function toJulianDate(year: number, month?: number | undefined, date?: number | undefined, hours?: number | undefined, minutes?: number | undefined, seconds?: number | undefined, ms?: number | undefined): number {
	return Date.UTC(
		year,
		(month !== undefined)?month:1,
		(date !== undefined)?date:1,
		(hours !== undefined)?hours:0,
		(minutes !== undefined)?minutes:0,
		(seconds !== undefined)?seconds:0,
		(ms !== undefined)?ms:0
	) / 864e5 + Computus.unixEra;
}

function createCalendarSheet(container: HTMLElement,y: number,m: number) {
	var firstday = Computus.weekday(y,m,1);
	var lastMonthLength, lastMonthSunday;
	if (m>0) {
		lastMonthLength = Computus.monthdays(y,m-1);
		lastMonthSunday = lastMonthLength-firstday+1;
	}
	else {
		lastMonthLength = Computus.monthdays(y-1,11);
		lastMonthSunday = lastMonthLength-firstday+1;
	}

	var table = DOM$.create("table", container, "tabmonth_"+m);
	table.setAttribute('border',"1");
	table.setAttribute('class',"oldcal");

    // month name
	var tr = DOM$.create("tr",table);
	var td = DOM$.create("td",tr);
	td.setAttribute('colspan',"7");
	td.setAttribute('class',"monthname");
	td.innerHTML = monthNameTable[m];

    // week letter
	var tr = DOM$.create("tr",table);
	for (var i=0;i<7;i++) {
		td = DOM$.create("td",tr);
		if (i==0) {
			td.setAttribute('class',"sunday");
		}
		else {
			td.setAttribute('class',"weekheader");
		}
		td.innerHTML = weekLetterTable[i];
	}
	
	var i = 0;  // row
	var j = 0;  // column

	// last month
	var tr = DOM$.create("tr",table);
	for (var p=lastMonthSunday; p<=lastMonthLength; p++) {
		td = DOM$.create("td",tr);
		td.innerHTML = p.toString();
		td.setAttribute("class","othermonth");
		i++;
	}
	
	// this month
	var d = 1;
	while (d<=Computus.monthdays(y,m)) {
		if (i==0) {
			tr = DOM$.create("tr",table);
			j++;
		}
		td = DOM$.create("td",tr);
		td.setAttribute("id",m+"_"+d)
		if (i==0) {
			td.setAttribute("class","sunday");
		} else {
			td.setAttribute("class","thismonth");
		}
		td.innerHTML = d.toString();
		i = (i < 6)?(i+1):0;
		d++;
	}
	
	// next month
	if (i!=0) {
		var d = 1;
		while ((j<=5) && (i<6)) {
			if (i==0) {
				j++;
				tr = DOM$.create("tr",table);
			}
			td = DOM$.create("td",tr);
			td.className = 'othermonth';
//			td.setAttribute("class","othermonth");
			td.innerHTML = d.toString();
			i = (i < 6)?(i+1):0;
			d++;
		}
		td = DOM$.create("td",tr);
		td.setAttribute("class","othermonth");
		td.innerHTML = d.toString();
	}
	
	// moon panel
	tr = DOM$.create("tr",table);
	td = DOM$.create("td",tr,"moon_"+m);
	td.setAttribute('colspan',"7");
	td.setAttribute('class',"moonpanel");
	
}

function dateByDay(year: number,month: number,day: number,n: number) {
	var date = new Date(year,month,1);
	var j = 0;
	for (var i=0;i<Computus.monthdays(year,month);i++) {
		if (date.getDay()==day) {
			j++
		}
		if (j==n) break;
		date.setDate(date.getDate()+1);
	}
	return date;
}