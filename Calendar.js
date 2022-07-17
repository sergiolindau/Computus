"use strict";
/**
 * TODO:
 * Implement tooltip and improve events. Needs to improve Calendar_pt_BR.ts.
 * Implement ranges in date specification.
 * most important: implement page navigation.
 */
const DefaultCSSClasses = {
    prefix: 'calendar',
    mainDiv: 'sheet',
    headerDiv: 'header',
    yearDiv: 'year',
    yearElement: 'yearfield',
    labelDiv: 'label',
    dateslabelDiv: 'dateslabel',
    moonlabelDiv: 'moonlabel',
    pageDiv: 'page',
    pageTable: 'page',
    monthheaderDiv: 'monthheader',
    monthnameSpan: 'monthname',
    monthsheetTable: 'monthsheet',
    weekheaderCell: 'weekheader',
    thismonthdayCell: 'thismonth',
    previousmonthdayCell: 'othermonth',
    nextmonthdayCell: 'othermonth',
    othermonthdayCell: 'othermonth',
    sundayCell: 'sunday',
    weekdayCell: 'weekday',
    weekendCell: 'weekend',
    monthfooterDiv: 'monthfooter',
    yearprevElement: 'yearprev',
    yearnextElement: 'yearnext',
    moonDiv: 'moonpanel',
    moonIcon: ['newmoon-icon', 'firstquarter-icon', 'fullmoon-icon', 'lastquarter-icon'],
    datesDiv: 'datespanel'
};
class Calendar {
    constructor(container, configuration) {
        this.easterdoy = 0;
        this.moonJDE = [];
        this.moonDate = [];
        this.moonMonth = [];
        this.dates = null;
        if (configuration === undefined) {
            configuration = {};
        }
        // ************ configuration default settings
        // Get calendar id from configuration, else set undefined.
        if (configuration.id !== undefined) {
            this.id = configuration.id;
        }
        else {
            this.id = undefined;
        }
        // Get layout from configuration and test consistency.
        if (configuration.layout !== undefined) {
            this.layout = configuration.layout;
        }
        else {
            this.layout = [3, 4, 1];
        }
        while (this.layout.length < 3) {
            this.layout.push(1);
        }
        this.checkLayout();
        // Check if DateTime and DateTimeTick is defined. Set flags.
        this.usingDateTime = typeof DateTime === 'function';
        this.usingDateTimeTick = typeof DateTimeTick === 'function';
        // Get date and time now.
        this.now = this.newDate();
        this.today = Computus.cal2doy(this.now.getFullYear(), this.now.getMonth(), this.now.getDate());
        // Get year from configuration else use current year.
        if (configuration.year !== undefined) {
            this.year = configuration.year;
        }
        else {
            this.year = this.now.getFullYear();
        }
        // Get data from configuration.
        if (configuration.data !== undefined) {
            this.data = configuration.data;
        }
        else {
            this.data = [];
        }
        // Get options from configuration else set default values.
        if (configuration.options === undefined) {
            this.options = {};
        }
        else {
            this.options = configuration.options;
        }
        // Parse configuration options
        this.parseOptions();
        // Calculate true Moon phases in year
        this.calcMoonPhases();
        // Parse date denote data records.
        this.parseData();
        // Create this.container
        this.createCalendarContainer();
        // Create calendar header.
        this.createCalendarHeader();
        // Create calendar sheet.
        this.createCalendarSheet();
        // Append calendar sheet to parent container.
        this.setParentContainer(container);
    }
    parseOptions() {
        if (!this.options) {
            this.options = {};
        }
        // ************ this.options default settings
        // Get language from options else set English as default.
        if (this.options.language === undefined) {
            this.options.language = 'EN';
        }
        // Get cssclasses from options else set defaut values. If only some
        // values is passed as options set this values and use others (unset) as default.
        if (this.options.cssclasses === undefined) {
            this.options.cssclasses = DefaultCSSClasses;
        }
        else {
            for (let c in DefaultCSSClasses) {
                if (this.options.cssclasses[c] === undefined) {
                    this.options.cssclasses[c] = DefaultCSSClasses[c];
                }
            }
        }
        // *** missing format default settigs
        // Get yearpanel from options else set defaults.
        if (this.options.yearpanel === undefined) {
            this.options.yearpanel = {};
        }
        if (this.options.yearpanel.display === undefined) {
            this.options.yearpanel.display = true;
        }
        if (this.options.yearpanel.control === undefined) {
            this.options.yearpanel.control = true;
        }
        if (this.options.yearpanel.actions === undefined) {
            this.options.yearpanel.actions = {};
        }
        if (this.options.sheetlabel === undefined) {
            this.options.sheetlabel = {};
        }
        if (this.options.sheetlabel.display === undefined) {
            this.options.sheetlabel.display = true;
        }
        if (this.options.sheetlabel.position === undefined) {
            this.options.sheetlabel.position = 'header';
        }
        if (this.options.sheetlabel.layout === undefined) {
            this.options.sheetlabel.layout = 'horizontal';
        }
        // Get moonpanel from options else set defaults.
        if (this.options.moonpanel === undefined) {
            this.options.moonpanel = {};
        }
        if (this.options.moonpanel.display === undefined) {
            this.options.moonpanel.display = true;
        }
        if (this.options.moonpanel.position === undefined) {
            this.options.moonpanel.position = 'footer';
        }
        if (this.options.moonpanel.layout === undefined) {
            this.options.moonpanel.layout = 'horizontal';
        }
        if (this.options.moonpanel.label === undefined) {
            this.options.moonpanel.label = function (datetime, phase) {
                return `${datetime.getDate()}`;
            };
        }
        if (this.options.datespanel === undefined) {
            this.options.datespanel = {};
        }
        if (this.options.datespanel.display === undefined) {
            this.options.datespanel.display = true;
        }
        if (this.options.datespanel.position === undefined) {
            this.options.datespanel.position = 'footer';
        }
        if (this.options.datespanel.label === undefined) {
            this.options.datespanel.label = function (datetime, label) {
                let result = document.createElement('span');
                result.innerHTML = `${datetime.getDate()} - ${label}`;
                return result;
            };
        }
    }
    createCalendarContainer() {
        // Prepare internal this.container Object.
        this.container = {
            //            parent: null as unknown as HTMLElement,
            main: document.createElement('div'),
            //            header: null as unknown as HTMLDivElement,
            //            yearpanel: null as unknown as HTMLDivElement,
            //            year: null as unknown as HTMLInputElement,
            //            pages: null as unknown as any,
            months: {
            //                cell: null as unknown as Array<HTMLTableCellElement>,
            },
            //            footer: null as unknown as HTMLDivElement
        };
        if (this.id !== undefined) {
            this.container.main.setAttribute("id", this.id);
        }
        this.container.main.classList.add(this.options.cssclasses.prefix);
    }
    setParentContainer(container) {
        this.container.parent =
            (typeof container == 'string') ?
                document.getElementById(container) :
                container;
        if (this.container.parent) {
            this.container.parent.append(this.container.main);
        }
    }
    newDate(...args) {
        let dateconstructor;
        if (this.usingDateTimeTick) {
            dateconstructor = DateTimeTick;
        }
        else if (this.usingDateTime) {
            dateconstructor = DateTime;
        }
        else {
            dateconstructor = Date;
        }
        return new dateconstructor(...args);
    }
    static newDate(...args) {
        let dateconstructor;
        if (typeof DateTimeTick === 'function') {
            dateconstructor = DateTimeTick;
        }
        else if (typeof DateTime === 'function') {
            dateconstructor = DateTime;
        }
        else {
            dateconstructor = Date;
        }
        return new dateconstructor(...args);
    }
    static isDate(value) {
        return ((typeof value === 'object') && ('getFullYear' in value));
    }
    checkLayout() {
        if (this.layout.length > 3 || this.layout.length < 1) {
            throw new Error("Calendar: invalid layout.");
        }
        else {
            let ijklayout = 1;
            this.layout.forEach((value) => { ijklayout *= value; });
            if (ijklayout !== 12) {
                throw new Error("Calendar: invalid layout.");
            }
        }
    }
    setdoydata(doy, dataindex) {
        if (this.dates[doy] === undefined) {
            this.dates[doy] = [];
        }
        this.dates[doy][this.dates[doy].length] = this.data[dataindex];
    }
    parseData() {
        this.easterdoy = Computus.cal2doy(...Computus.easterSunday(this.year));
        this.dates = new Array(Computus.yeardays(this.year));
        for (let i = 0; i < this.data.length; i++) {
            if ('month' in this.data[i] && this.data[i].month < 12) {
                if ('date' in this.data[i] && this.data[i].date <= Computus.monthdays(this.year, this.data[i].month)) {
                    this.setdoydata(Computus.cal2doy(this.year, this.data[i].month, this.data[i].date), i);
                }
                else if ('weekday' in this.data[i] &&
                    Array.isArray(this.data[i].weekday) && (this.data[i].weekday.length === 2) &&
                    (typeof this.data[i].weekday[0] === 'number') && (typeof this.data[i].weekday[1] === 'number')) {
                    this.setdoydata(Computus.calweek2doy(this.year, this.data[i].month, this.data[i].weekday[0], this.data[i].weekday[1]), i);
                }
                else {
                    throw new Error(`Calendar: invalid configuration data[${i}]=${JSON.stringify(this.data[i])}.`);
                }
            }
            else if ('date' in this.data[i]) {
                if (typeof this.data[i].date === 'number') {
                    this.setdoydata(this.data[i].date, i);
                }
                else if (Array.isArray(this.data[i].date) && (this.data[i].date.length === 2)) {
                    this.setdoydata(Computus.cal2doy(this.year, this.data[i].date[0], this.data[i].date[1]), i);
                }
                else if (Calendar.isDate(this.data[i].date)) {
                    this.setdoydata(Computus.cal2doy(this.year, this.data[i].date.getMonth(), this.data[i].date.getDate()), i);
                }
                else if ((typeof this.data[i].date === 'object') && ('month' in this.data[i].date)) {
                    if ('date' in this.data[i].date) {
                        this.setdoydata(Computus.cal2doy(this.year, this.data[i].date.month, this.data[i].date.date), i);
                    }
                    else if (('weekday' in this.data[i].date) &&
                        Array.isArray(this.data[i].date.weekday) && (this.data[i].date.weekday.length === 2) &&
                        (typeof this.data[i].date.weekday[0] === 'number') && (typeof this.data[i].date.weekday[1] === 'number')) {
                        this.setdoydata(Computus.calweek2doy(this.year, this.data[i].date.month, this.data[i].date.weekday[0], this.data[i].date.weekday[1]), i);
                    }
                    else {
                        throw new Error(`Calendar: invalid configuration data[${i}]=${JSON.stringify(this.data[i])}.`);
                    }
                }
                else if (typeof this.data[i].date === 'function') {
                    this.setdoydata(this.data[i].date(this.year), i);
                }
                else {
                    throw new Error(`Calendar: invalid configuration data[${i}]=${JSON.stringify(this.data[i])}.`);
                }
            }
            else if ('easter' in this.data[i]) {
                this.setdoydata(this.easterdoy + this.data[i].easter, i);
            }
            else {
                throw new Error(`Calendar: invalid configuration data[${i}]=${JSON.stringify(this.data[i])}.`);
            }
        }
        // Get date and time now.
        this.now = this.newDate();
        this.today = Computus.cal2doy(this.now.getFullYear(), this.now.getMonth(), this.now.getDate());
        if ((this.year == this.now.getFullYear()) &&
            (this.options.format !== undefined) &&
            (this.options.format.today !== undefined)) {
            if (this.dates[this.today] === undefined) {
                this.dates[this.today] = [];
            }
            this.dates[this.today].push({
                date: this.now,
                label: this.options.format.today.label,
                format: 'today'
            });
        }
    }
    addActions(container, formatname) {
        if (this.options.format != undefined) {
            let format = this.options.format[formatname];
            if (format.actions !== undefined) {
                let actions = format.actions;
                for (let action in actions) {
                    container.addEventListener(action, actions[action].bind(this), false);
                }
            }
        }
    }
    getPointerAttribute(pointer, name) {
        return pointer.target.attributes.getNamedItem(name).value;
    }
    writeData(container, datesindex) {
        for (let n = 0; n < this.dates[datesindex].length; n++) {
            let formatname = this.dates[datesindex][n].format;
            let format = this.options.format[formatname];
            let cssclass = format.cssclass;
            if (cssclass === "$parent") {
                cssclass = formatname;
            }
            container.classList.add(cssclass);
            this.addActions(container, formatname);
        }
    }
    update() {
        if (this.options.yearpanel.display) {
            if (this.options.yearpanel.control) {
                this.container.year.value = this.year.toString();
            }
            else {
                this.container.year.innerHTML = this.year.toString();
            }
        }
        this.removeCalendarSheet();
        // Calculate true Moon Phases in year
        this.calcMoonPhases();
        // Parse date denote data records.
        this.parseData();
        // Create calendar sheet.
        this.createCalendarSheet();
    }
    changeCalendarYear(year) {
        if ((this.options.yearpanel.actions.nextYear !== undefined) && (year == (this.year + 1))) {
            this.options.yearpanel.actions.nextYear(year, this.year);
        }
        else if ((this.options.yearpanel.actions.prevYear !== undefined) && (year == (this.year - 1))) {
            this.options.yearpanel.actions.prevYear(year, this.year);
        }
        else if (this.options.yearpanel.actions.changeYear !== undefined) {
            this.options.yearpanel.actions.changeYear(year, this.year);
        }
        this.year = year;
        this.update();
    }
    nextYear() {
        if (this.options.yearpanel.actions.nextYear !== undefined) {
            this.options.yearpanel.actions.nextYear(this.year + 1, this.year);
        }
        else if (this.options.yearpanel.actions.changeYear !== undefined) {
            this.options.yearpanel.actions.changeYear(this.year + 1, this.year);
        }
        this.year++;
        this.update();
    }
    prevYear() {
        if (this.options.yearpanel.actions.prevYear !== undefined) {
            this.options.yearpanel.actions.prevYear(this.year - 1, this.year);
        }
        else if (this.options.yearpanel.actions.changeYear !== undefined) {
            this.options.yearpanel.actions.changeYear(this.year - 1, this.year);
        }
        this.year--;
        this.update();
    }
    changeYear() {
        let year = Number(this.container.year.value);
        this.container.year.value = year.toString();
        this.changeCalendarYear(year);
    }
    createYearPanel() {
        this.container.yearpanel = document.createElement('div');
        this.container.yearpanel.classList.add(this.options.cssclasses.prefix + '-' +
            this.options.cssclasses.yearDiv);
        if (this.options.yearpanel.control) {
            this.container.prevyear = document.createElement('div');
            this.container.prevyear.classList.add(this.options.cssclasses.yearprevElement);
            this.container.prevyear.addEventListener('click', this.prevYear.bind(this), false);
            this.container.yearpanel.append(this.container.prevyear);
            this.container.year = document.createElement('input');
            this.container.year.setAttribute('type', "text");
            this.container.year.setAttribute('value', this.year.toString());
            this.container.year.classList.add(this.options.cssclasses.yearElement);
            this.container.year.addEventListener('change', this.changeYear.bind(this), false);
            this.container.yearpanel.append(this.container.year);
            this.container.nextyear = document.createElement('div');
            this.container.nextyear.classList.add(this.options.cssclasses.yearnextElement);
            this.container.nextyear.addEventListener('click', this.nextYear.bind(this), false);
            this.container.yearpanel.append(this.container.nextyear);
        }
        else {
            this.container.year = document.createElement('span');
            this.container.year.innerHTML = this.year.toString();
            this.container.year.classList.add(this.options.cssclasses.yearElement);
            this.container.yearpanel.append(this.container.year);
        }
    }
    createSheetLabel() {
        let sheetlabel = document.createElement('div');
        sheetlabel.classList.add(this.options.cssclasses.prefix + '-' +
            this.options.cssclasses.labelDiv);
        let horizontal = this.options.sheetlabel.layout === 'horizontal';
        // Create dates label
        if (this.options.datespanel.display) {
            let dateslabel = document.createElement('div');
            dateslabel.classList.add(this.options.cssclasses.prefix + '-' +
                this.options.cssclasses.dateslabelDiv);
            let labelparent = horizontal ? dateslabel : document.createElement('ul');
            for (let i in this.options.format) {
                if ((i !== this.options.cssclasses.thismonthdayCell) &&
                    (i !== this.options.cssclasses.previousmonthdayCell) &&
                    (i !== this.options.cssclasses.nextmonthdayCell) &&
                    (i !== this.options.cssclasses.othermonthdayCell)) {
                    let item = this.options.format[i];
                    let itemclass = (typeof item === 'string') ? item : item.cssclass;
                    itemclass = (itemclass == '$parent') ? i : itemclass;
                    let itemelem = document.createElement('span');
                    itemelem.innerHTML = "&nbsp;&nbsp;";
                    itemelem.classList.add('thismonth', itemclass);
                    if (horizontal) {
                        labelparent.append(itemelem);
                        let itemtext = document.createElement('span');
                        itemtext.innerHTML = "&nbsp;" + item.label + "&nbsp;&nbsp;&nbsp;";
                        labelparent.append(itemtext);
                    }
                    else {
                        let litem = document.createElement('li');
                        litem.append(itemelem);
                        let itemtext = document.createTextNode(" " + item.label);
                        litem.append(itemtext);
                        labelparent.append(litem);
                    }
                }
            }
            if (!horizontal) {
                dateslabel.append(labelparent);
            }
            sheetlabel.append(dateslabel);
        }
        // Create moon label
        if (this.options.moonpanel.display) {
            let moonlabel = document.createElement('div');
            moonlabel.classList.add(this.options.cssclasses.prefix + '-' +
                this.options.cssclasses.moonlabelDiv);
            if (horizontal) {
                for (let i = 0; i < 4; i++) {
                    let itemelem = document.createElement('span');
                    itemelem.classList.add(this.options.cssclasses.moonIcon[i]);
                    moonlabel.append(itemelem);
                    itemelem = document.createElement('span');
                    itemelem.innerHTML = "&nbsp;" + Computus.moonphasename[this.options.language][i] + "&nbsp;&nbsp;&nbsp;";
                    moonlabel.append(itemelem);
                }
            }
            else {
                let moonul = document.createElement('ul');
                for (let i = 0; i < 4; i++) {
                    let moonli = document.createElement('li');
                    let itemelem = document.createElement('span');
                    itemelem.classList.add(this.options.cssclasses.moonIcon[i]);
                    moonli.append(itemelem);
                    itemelem = document.createElement('span');
                    itemelem.innerHTML = "&nbsp;" + Computus.moonphasename[this.options.language][i];
                    moonli.append(itemelem);
                    moonul.append(moonli);
                }
                moonlabel.append(moonul);
            }
            sheetlabel.append(moonlabel);
        }
        return sheetlabel;
    }
    createCalendarHeader() {
        let yearpanelonheader = this.options.yearpanel.display && (this.options.yearpanel.position === 'header');
        let sheetlabelonheader = this.options.sheetlabel.display && (this.options.sheetlabel.position === 'header');
        if (yearpanelonheader || sheetlabelonheader) {
            this.container.header = document.createElement('div');
            this.container.header.classList.add(this.options.cssclasses.prefix + '-' +
                this.options.cssclasses.headerDiv);
            this.container.main.append(this.container.header);
            if (yearpanelonheader) {
                this.createYearPanel();
                this.container.header.append(this.container.yearpanel);
            }
            if (sheetlabelonheader) {
                this.container.header.append(this.createSheetLabel());
            }
        }
    }
    calcMoonPhases() {
        if (this.options.moonpanel.display) {
            this.moonJDE = Computus.truePhaseYear(this.year);
            this.moonDate = new Array(14);
            this.moonMonth = new Array(12);
            for (let i = 0; i < 12; i++) {
                this.moonMonth[i] = [];
            }
            for (let l = 0; l < 14; l++) {
                let temp = new Array(4);
                for (let p = 0; p < 4; p += 1) {
                    temp[p] = (this.newDate()).setJulianDate(this.moonJDE[l][p]);
                    if (temp[p].getFullYear() == this.year) {
                        this.moonMonth[temp[p].getMonth()].push({ phase: p, date: temp[p] });
                    }
                }
                this.moonDate[l] = temp;
            }
        }
    }
    createCalendarSheet() {
        let pages = new Array(this.layout[2]);
        let months = new Array(12);
        let m = 0;
        for (let k = 0; k < this.layout[2]; k++) {
            pages[k] = {
                div: document.createElement('div'),
                table: document.createElement('table'),
                tbody: document.createElement('tbody'),
                tr: new Array(this.layout[0]),
                td: new Array(this.layout[0] * this.layout[1]),
            };
            if (this.id !== undefined) {
                pages[k].div.setAttribute('id', `${this.id}-page-${k}`);
            }
            pages[k].table.classList.add(this.options.cssclasses.prefix + '-' +
                this.options.cssclasses.pageTable);
            pages[k].div.classList.add(this.options.cssclasses.prefix + '-' +
                this.options.cssclasses.pageDiv);
            for (let i = 0; i < this.layout[0]; i++) {
                pages[k].tr[i] = document.createElement('tr');
                for (let j = 0; j < this.layout[1]; j++, m++) {
                    months[m] = pages[k].td[i + j] = document.createElement('td');
                    pages[k].tr[i].append(pages[k].td[i + j]);
                }
                pages[k].tbody.append(pages[k].tr[i]);
            }
            pages[k].table.append(pages[k].tbody);
            pages[k].div.append(pages[k].table);
            this.container.main.append(pages[k].div);
        }
        this.container.pages = pages;
        this.container.months = {
            cell: months,
            sheet: new Array(12),
        };
        this.container.thismonthday = new Array(Computus.yeardays(this.year)); // We need this?
        this.container.othermonthday = new Array(Computus.yeardays(this.year)); // We need this?
        for (let m = 0; m < 12; m++) {
            this.createMonthSheet(m);
        }
    }
    createMonthSheet(m) {
        // month sheet container
        let month = {
            divheader: document.createElement('div'),
            spantitle: document.createElement('span'),
            table: document.createElement('table'),
            thead: document.createElement('thead'),
            th: new Array(7),
            tbody: document.createElement('tbody'),
            tr: [],
            td: [],
            divfooter: undefined,
            divmoon: undefined,
            divmoonparent: undefined,
            divdates: undefined,
            divdatesparent: undefined
        };
        // Name of month
        month.spantitle.innerHTML = // last abreviation if exists
            Computus.monthTable[this.options.language][0 //Computus.monthTable[(this.options as DefinedCalendarOptions).language as string].length-1
            ][m];
        month.spantitle.classList.add(this.options.cssclasses.monthnameSpan);
        month.divheader.append(month.spantitle);
        month.divheader.classList.add(this.options.cssclasses.monthheaderDiv);
        month.table.classList.add(this.options.cssclasses.monthsheetTable);
        // weekdays
        month.tr.push(document.createElement('tr'));
        for (let n = 0; n < 7; n++) {
            month.th[n] = document.createElement('th');
            month.th[n].innerHTML = // last abreviation if exists
                Computus.weekTable[this.options.language][Computus.weekTable[this.options.language].length - 1][n];
            month.th[n].classList.add(this.options.cssclasses.weekheaderCell);
            if (n == 0) {
                month.th[n].classList.add(this.options.cssclasses.weekendCell);
                month.th[n].classList.add(this.options.cssclasses.sundayCell);
            }
            else if (n == 6) {
                month.th[n].classList.add(this.options.cssclasses.weekendCell);
            }
            else {
                month.th[n].classList.add(this.options.cssclasses.weekdayCell);
            }
            month.tr[0].append(month.th[n]);
        }
        month.thead.append(month.tr[0]);
        month.table.append(month.thead);
        let i = 0; // row
        let j = 0; // column
        let ntd = 0;
        let lastMonthLength = (m > 0) ?
            Computus.monthdays(this.year, m - 1) :
            Computus.monthdays(this.year - 1, 11);
        let d;
        // Days of previous month.
        month.tr.push(document.createElement('tr'));
        for (d = lastMonthLength - Computus.weekday(this.year, m, 1) + 1; d <= lastMonthLength; d++) {
            month.td.push(document.createElement('td'));
            month.td[ntd].innerHTML = d.toString();
            month.td[ntd].classList.add(this.options.cssclasses.previousmonthdayCell);
            month.tr[1].append(month.td[ntd]);
            // We need this?
            if (m == 0) {
                this.container.othermonthday[Computus.cal2doy(this.year, 11, d) - 1] = month.td[ntd];
            }
            else {
                this.container.othermonthday[Computus.cal2doy(this.year, m - 1, d) - 1] = month.td[ntd];
            }
            ntd++;
            j++;
        }
        month.tbody.append(month.tr[1]);
        // Days of this month.
        d = 1;
        while (d <= Computus.monthdays(this.year, m)) {
            let doy = Computus.cal2doy(this.year, m, d);
            if (j == 0) {
                month.tr.push(document.createElement('tr'));
                month.tbody.append(month.tr[i + 1]);
                i++;
            }
            month.td.push(document.createElement('td'));
            month.td[ntd].innerHTML = d.toString();
            month.td[ntd].setAttribute('month', m.toString());
            month.td[ntd].setAttribute('date', d.toString());
            month.td[ntd].setAttribute('doy', doy.toString());
            month.td[ntd].setAttribute('dow', Computus.weekday(this.year, m, d).toString());
            let formatname = this.options.cssclasses.thismonthdayCell;
            month.td[ntd].classList.add(formatname);
            this.addActions(month.td[ntd], formatname);
            if (j == 0) {
                month.td[ntd].classList.add(this.options.cssclasses.weekendCell);
                month.td[ntd].classList.add(this.options.cssclasses.sundayCell);
            }
            else if (j == 6) {
                month.td[ntd].classList.add(this.options.cssclasses.weekendCell);
            }
            else {
                month.td[ntd].classList.add(this.options.cssclasses.weekdayCell);
            }
            month.tr[i + 1].append(month.td[ntd]);
            if (this.dates[doy - 1] !== undefined) {
                this.writeData(month.td[ntd - 1], doy - 1);
            }
            this.container.thismonthday[doy - 1] = month.td[ntd]; // We need this?
            ntd++;
            j = (j < 6) ? (j + 1) : 0;
            d++;
        }
        // Days of next month.
        if (j != 0) {
            d = 1;
            while ((i <= 5) && (j < 6)) {
                if (j == 0) {
                    month.tr.push(document.createElement('tr'));
                    month.tbody.append(month.tr[i + 1]);
                    i++;
                }
                month.td.push(document.createElement('td'));
                month.td[ntd].innerHTML = d.toString();
                month.td[ntd].classList.add(this.options.cssclasses.nextmonthdayCell);
                month.tr[i + 1].append(month.td[ntd]);
                this.container.othermonthday[Computus.cal2doy(this.year, m + 1, d) - 1] = month.td[ntd]; // We need this?
                ntd++;
                j = (j < 6) ? (j + 1) : 0;
                d++;
            }
            month.td.push(document.createElement('td'));
            month.td[ntd].innerHTML = d.toString();
            month.td[ntd].classList.add(this.options.cssclasses.nextmonthdayCell);
            month.tr[i + 1].append(month.td[ntd]);
            // We need this?
            if (m == 11) {
                this.container.othermonthday[Computus.cal2doy(this.year, 0, d) - 1] = month.td[ntd];
            }
            else {
                this.container.othermonthday[Computus.cal2doy(this.year, m + 1, d) - 1] = month.td[ntd];
            }
            ntd++;
        }
        month.tbody.append(month.tr[i + 1]);
        month.table.append(month.tbody);
        this.container.months.cell[m].append(month.divheader);
        this.container.months.cell[m].append(month.table);
        // Moon and dates panel
        let moonpaneldisplay = this.options.moonpanel.display;
        let moonpanelposition = this.options.moonpanel.position;
        let datespaneldisplay = this.options.datespanel.display;
        let datespanelposition = this.options.datespanel.position;
        // Create monthsheet footer container if moonpanel or datespanel is set to footer position
        if ((moonpaneldisplay && (moonpanelposition === 'footer')) ||
            (datespaneldisplay && (datespanelposition === 'footer'))) {
            month.divfooter = document.createElement('div');
            this.container.months.cell[m].append(month.divfooter);
        }
        // Moon panel creation
        if (moonpaneldisplay) {
            // Set parent for moonpanel
            if (moonpanelposition === 'footer') {
                month.divmoonparent = month.divfooter;
            }
            else if (moonpanelposition == 'header') {
                month.divmoonparent = month.divheader;
            }
            else if ((moonpanelposition.charAt(0) === "#")) {
                let id = moonpanelposition.substring(1);
                month.divmoonparent = document.getElementById(id);
                if (month.divmoonparent === null) {
                    throw new Error(`invalid option (options.moonpanel.position = "${moonpanelposition}"). Element with atribute id="${id}" not found.`);
                }
            }
            else {
                throw new Error(`invalid option (options.moonpanel.position = "${moonpanelposition}"). Must be "header", "footer", or "#<id>"; where id must be a valid element id.`);
            }
            month.divmoon = document.createElement('div');
            // Create moon panel
            if (this.options.moonpanel.layout == 'horizontal') {
                for (let i = 0; i < this.moonMonth[m].length; i++) {
                    let spanphase = document.createElement('span');
                    spanphase.classList.add(this.options.cssclasses.moonIcon[this.moonMonth[m][i].phase]);
                    month.divmoon.append(spanphase);
                    spanphase = document.createElement('span');
                    spanphase.innerHTML = this.options.moonpanel.label(this.moonMonth[m][i].date, this.moonMonth[m][i].phase) + "&nbsp;";
                    month.divmoon.append(spanphase);
                }
            }
            else if (this.options.moonpanel.layout == 'vertical') {
                let ulphases = document.createElement('ul');
                for (let i = 0; i < this.moonMonth[m].length; i++) {
                    let liphase = document.createElement('li');
                    let spanphase = document.createElement('span');
                    spanphase.classList.add(this.options.cssclasses.moonIcon[this.moonMonth[m][i].phase]);
                    liphase.append(spanphase);
                    spanphase = document.createElement('span');
                    spanphase.innerHTML = this.options.moonpanel.label(this.moonMonth[m][i].date, this.moonMonth[m][i].phase);
                    liphase.append(spanphase);
                    ulphases.append(liphase);
                }
                month.divmoon.append(ulphases);
            }
            else {
                throw new Error(`invalid option (options.moonpanel.layout = "${this.options.moonpanel.layout}"). Must be "horizontal" or "vertical".`);
            }
            month.divmoon.classList.add(this.options.cssclasses.moonDiv);
            month.divmoonparent.append(month.divmoon);
        }
        // Set parent for datespanel
        if (datespaneldisplay) {
            if (datespanelposition === 'footer') {
                month.divdatesparent = month.divfooter;
            }
            else if (datespanelposition == 'header') {
                month.divdatesparent = month.divheader;
            }
            else if ((datespanelposition.charAt(0) === "#")) {
                let id = datespanelposition.substring(1);
                month.divdatesparent = document.getElementById(id);
                if (month.divdatesparent === null) {
                    throw new Error(`invalid option (options.datespanel.position = "${datespanelposition}"). Element with atribute id="${id}" not found.`);
                }
            }
            else {
                throw new Error(`invalid option (options.datespanel.position = "${datespanelposition}"). Must be "header", "footer", or "#<id>"; where id must be a valid element id.`);
            }
            month.divdates = document.createElement('div');
            // Create dates panel
            let uldates = document.createElement('ul');
            for (let d = 1; d <= Computus.monthlength[m][0]; d++) {
                let datesdoy = this.dates[Computus.monthlength[m][Computus.isleap(this.year) ? 2 : 1] + d];
                if (datesdoy !== undefined) {
                    for (let i = 0; i < datesdoy.length; i++) {
                        let lidate = document.createElement('li');
                        let date;
                        if ((datesdoy[i].date !== undefined) && Calendar.isDate(datesdoy[i].date)) {
                            date = datesdoy[i].date;
                        }
                        else {
                            date = this.newDate(...Computus.doy2cal(this.year, d));
                        }
                        lidate.append(this.options.datespanel.label(date, datesdoy[i].label));
                        uldates.append(lidate);
                    }
                }
            }
            month.divdates.append(uldates);
            month.divdates.classList.add(this.options.cssclasses.datesDiv);
            month.divdatesparent.append(month.divdates);
        }
        this.container.months.sheet[m] = month;
    }
    removeCalendarSheet() {
        this.container.months = {
            cell: null,
        };
        this.container.pages = null;
        this.container.main.removeChild(this.container.main.lastElementChild);
    }
}
