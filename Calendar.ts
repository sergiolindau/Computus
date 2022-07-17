/**
 * TODO:
 * Implement tooltip and improve events. Needs to improve Calendar_pt_BR.ts.
 * Implement ranges in date specification.
 * most important: implement page navigation.
 */

type CalendarType = Calendar;

type DateType =
    Date |
    DateTime |
    DateTimeTick;

type LayoutArray  = Array<number>;

type CalendarEventHandler =
    ((value: UIEvent) => void) |
    ((value: PointerEvent) => void);

type CalendarDataActions = {
    click?: CalendarEventHandler;
};

type CalendarDateFormat =  {
    cssclass: string;
    label?: string;
    tooltip?: CalendarTooltip;
    actions?: CalendarDataActions;
} | string;

type CalendarDateFormatSet = {[k: string]: CalendarDateFormat};

type yearChangePreSet = (year:number, lastyear?:number) => void;

type yearControlActions = {
    changeYear?: yearChangePreSet;
    prevYear?: yearChangePreSet;
    nextYear?: yearChangePreSet;
};

type elementPosition = 'header' | 'footer' | string; // (can be '#some-element-id')

type yearPanel = {
    display?: boolean;
    control?: boolean;
    position?: elementPosition;
    actions?: yearControlActions;
};

type contentLayout = 'horizontal' | 'vertical';

type sheetLabel = {
    display?: boolean;
    position?: elementPosition
    layout?: contentLayout;
};

type moonCallback = (datetime:DateType, phase:number) => string;

type moonPhaseDate = {
    phase: number,
    date: DateType
};

type moonPanel = {
    display?: boolean;
    position?: elementPosition
    layout?: contentLayout;
    label?: moonCallback;
    tooltip?: moonCallback;
};

type dateDenoteCallback = (datetime:DateType, label:string) => HTMLElement;

type datesPanel = {
    display?: boolean;
    position?: elementPosition;
    label?: dateDenoteCallback;
    tooltip?: CalendarTooltip;
};

type DefinedCalendarOptions = {
    language?: string;
    cssclasses?: CSSClassSet;
    format?: CalendarDateFormatSet;
    yearpanel?: yearPanel;
    sheetlabel?: sheetLabel;
    moonpanel?: moonPanel;
    datespanel?: datesPanel;
}

type CalendarOptions = DefinedCalendarOptions | undefined;

type CalendarDoyCallback = (year: number) => number;

type CalendarData = {
    month?: number;
    date?: number | [number,number] | {month: number, date: number} | {month: number, weekday: [number,number]} | DateType | CalendarDoyCallback;
    label?: string;
    format?: string;
    weekday?: [number,number];
    easter?: number;
};

type CalendarDataArray = Array<CalendarData>;

type CalendarTooltip = (value: CalendarData, index: number, format: CalendarDateFormat, key: string) => string;

type CalendarConfiguration = {
    id?: string,
    layout?: LayoutArray,
    year?: number,
    data?: CalendarDataArray,
    options?: CalendarOptions,
}

type CSSClassSet = {[k: string]: string | Array<string>};

const DefaultCSSClasses: CSSClassSet = {
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
    protected container: any;
    protected id: string | undefined;
    protected options: CalendarOptions;
    protected layout: LayoutArray;
    protected usingDateTime: boolean;
    protected usingDateTimeTick: boolean;
    protected year: number;
    protected now: DateType;
    protected today: number;
    protected easterdoy: number = 0;
    protected moonJDE: Array<[number,number,number,number]> = [];
    protected moonDate: Array<[DateType,DateType,DateType,DateType]> = [];
    protected moonMonth: Array<Array<moonPhaseDate>> = [];
    public data: Array<CalendarData>;
    protected dates = null as unknown as Array<Array<CalendarData>>;

    constructor(container: string| HTMLElement, configuration: CalendarConfiguration) {
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
            this.layout = [3,4,1];
        }
        while (this.layout.length<3) {
            this.layout.push(1);
        }
        this.checkLayout();
        // Check if DateTime and DateTimeTick is defined. Set flags.
        this.usingDateTime = typeof DateTime==='function';
        this.usingDateTimeTick = typeof DateTimeTick==='function';
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

    private parseOptions() {
        if (!this.options) {
            this.options = {};
        }
        // ************ this.options default settings
        // Get language from options else set English as default.
        if (this.options.language===undefined) {
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
            this.options.moonpanel.label = function(datetime:DateType, phase:number): string {
                return `${datetime.getDate()}`;
            }
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
            this.options.datespanel.label = function(datetime:DateType, label:string): HTMLElement {
                let result = document.createElement('span');
                result.innerHTML = `${datetime.getDate()} - ${label}`;
                return result;
            }
        }
    }
    
    private createCalendarContainer() {
        // Prepare internal this.container Object.
        this.container = {
//            parent: null as unknown as HTMLElement,
            main: document.createElement('div') as HTMLDivElement,
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
            this.container.main.setAttribute("id",this.id);
        }
        this.container.main.classList.add( ((this.options as DefinedCalendarOptions).cssclasses as CSSClassSet).prefix );
    }

    private setParentContainer(container: string| HTMLElement) {
        this.container.parent = 
            (typeof container == 'string') ?
            document.getElementById(container) as HTMLElement :
            container;
        if (this.container.parent) {
            this.container.parent.append(this.container.main);
        }
    }

    private newDate(...args: any[]): DateType {
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
    
    public static newDate(...args: any[]): DateType {
        let dateconstructor;
        if (typeof DateTimeTick==='function') {
            dateconstructor = DateTimeTick;
        }
        else if (typeof DateTime==='function') {
            dateconstructor = DateTime;
        }
        else {
            dateconstructor = Date;
        }
        return new dateconstructor(...args);
    }

    static isDate(value: any): boolean {
        return ( (typeof value === 'object') && ('getFullYear' in value) );
    }

    protected checkLayout() {
        if (this.layout.length > 3 || this.layout.length < 1) {
            throw new Error("Calendar: invalid layout.");
        }
        else {
            let ijklayout = 1;
            this.layout.forEach((value: number) => {ijklayout *= value;});
            if (ijklayout !== 12) {
                throw new Error("Calendar: invalid layout.");
            }
        }
    }

    protected setdoydata(doy: number, dataindex: number){
        if (this.dates[doy] === undefined) {
            this.dates[doy] = [];
        }
        this.dates[doy][this.dates[doy].length] = this.data[dataindex];
    }

    protected parseData() {
        this.easterdoy = Computus.cal2doy(...Computus.easterSunday(this.year));
        this.dates = new Array(Computus.yeardays(this.year));
        for (let i=0; i<this.data.length; i++) {
            if ('month' in this.data[i] && (this.data[i].month as number) < 12) {
                if ('date' in this.data[i] && this.data[i].date as number <= Computus.monthdays(this.year,(this.data[i].month as number))) {
                    this.setdoydata(Computus.cal2doy(this.year,(this.data[i].month as number),this.data[i].date as number), i);
                }
                else if ('weekday' in this.data[i] &&
                        Array.isArray(this.data[i].weekday) && ((this.data[i].weekday as [number,number]).length === 2) &&
                        (typeof (this.data[i].weekday as [number,number])[0] === 'number') && (typeof (this.data[i].weekday as [number,number])[1] === 'number')
                    ) {
                    this.setdoydata(Computus.calweek2doy(this.year,(this.data[i].month as number),(this.data[i].weekday as [number,number])[0],(this.data[i].weekday as [number,number])[1]), i);
                }
                else {
                    throw new Error(`Calendar: invalid configuration data[${i}]=${JSON.stringify(this.data[i])}.`);
                }
            } else if ('date' in this.data[i]) {
                if (typeof this.data[i].date === 'number') {
                    this.setdoydata(this.data[i].date as number,i);
                }
                else if (Array.isArray(this.data[i].date) && ((this.data[i].date as [number,number]).length === 2)) {
                    this.setdoydata(Computus.cal2doy(this.year,(this.data[i].date as [number,number])[0],(this.data[i].date as [number,number])[1]), i);
                }
                else if (Calendar.isDate(this.data[i].date)) {
                    this.setdoydata(Computus.cal2doy(this.year,(this.data[i].date as DateType).getMonth(),(this.data[i].date as DateType).getDate()),i)
                }
                else if ((typeof this.data[i].date === 'object') && ('month' in (this.data[i].date as Object))) {
                    if ('date' in (this.data[i].date as Object)) {
                        this.setdoydata(Computus.cal2doy(this.year,(this.data[i].date as {month:number}).month as number,(this.data[i].date as {date:number}).date), i)
                    }
                    else if (('weekday' in (this.data[i].date as Object)) &&
                        Array.isArray((this.data[i].date as {weekday:[number,number]}).weekday) && ((this.data[i].date as {weekday:[number,number]}).weekday.length === 2) &&
                        (typeof (this.data[i].date as {weekday:[number,number]}).weekday[0] === 'number') && (typeof (this.data[i].date as {weekday:[number,number]}).weekday[1] === 'number')
                    ) {
                        this.setdoydata(Computus.calweek2doy(this.year,(this.data[i].date as {month:number}).month,(this.data[i].date as {weekday:[number,number]}).weekday[0],(this.data[i].date as {weekday:[number,number]}).weekday[1]), i);
                    }
                    else {
                        throw new Error(`Calendar: invalid configuration data[${i}]=${JSON.stringify(this.data[i])}.`);
                    }
                }
                else if (typeof this.data[i].date === 'function') {
                    this.setdoydata((this.data[i].date as CalendarDoyCallback)(this.year), i)
                }
                else {
                    throw new Error(`Calendar: invalid configuration data[${i}]=${JSON.stringify(this.data[i])}.`);
                }
            }
            else if ('easter' in this.data[i]) {
                this.setdoydata(this.easterdoy + (this.data[i].easter as number), i);
            }
            else {
                throw new Error(`Calendar: invalid configuration data[${i}]=${JSON.stringify(this.data[i])}.`);
            }
        }
        // Get date and time now.
        this.now = this.newDate();
        this.today = Computus.cal2doy(this.now.getFullYear(), this.now.getMonth(), this.now.getDate());
        if ( (this.year == this.now.getFullYear()) &&
            ((this.options as DefinedCalendarOptions).format !== undefined) &&
            (((this.options as DefinedCalendarOptions).format as CalendarDateFormatSet).today !== undefined)
        ) {
            if (this.dates[this.today] === undefined) {
                this.dates[this.today] = [];
            }
            this.dates[this.today].push({
                date: this.now,
                label: (((this.options as DefinedCalendarOptions).format as CalendarDateFormatSet).today as any).label,
                format: 'today'
            })
        }

    }

    protected addActions(container: HTMLTableCellElement, formatname: string) {
        if ((this.options as DefinedCalendarOptions).format != undefined) {
            let format = ((this.options as DefinedCalendarOptions).format as any)[formatname];
            if (format.actions !== undefined) {
                let actions = format.actions;
                for (let action in actions) {
                    container.addEventListener(action,actions[action].bind(this), false);
                }
            }
        }
    }

    public getPointerAttribute(pointer: PointerEvent, name: string) {
        return (pointer.target as any).attributes.getNamedItem(name).value;
    }

    protected writeData(container: HTMLTableCellElement, datesindex: number) {
        for (let n=0; n<this.dates[datesindex].length; n++) {
            let formatname = this.dates[datesindex][n].format;
            let format = ((this.options as DefinedCalendarOptions).format as any)[formatname as string]
            let cssclass = format.cssclass;
            if (cssclass === "$parent") {
                cssclass = formatname;
            }
            container.classList.add(cssclass);
            this.addActions(container,formatname as string);
        }
    }

    protected update() {
        if (((this.options as DefinedCalendarOptions).yearpanel as yearPanel).display) {
            if (((this.options as DefinedCalendarOptions).yearpanel as yearPanel).control) {
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

    protected changeCalendarYear(year: number) {
        if (((((this.options as DefinedCalendarOptions).yearpanel as yearPanel).actions as yearControlActions).nextYear !== undefined) && (year == (this.year+1))) {
            ((((this.options as DefinedCalendarOptions).yearpanel as yearPanel).actions as yearControlActions).nextYear as yearChangePreSet)(year, this.year);
        } else if (((((this.options as DefinedCalendarOptions).yearpanel as yearPanel).actions as yearControlActions).prevYear !== undefined) && (year == (this.year-1))) {
            ((((this.options as DefinedCalendarOptions).yearpanel as yearPanel).actions as yearControlActions).prevYear as yearChangePreSet)(year, this.year);
        } else if ((((this.options as DefinedCalendarOptions).yearpanel as yearPanel).actions as yearControlActions).changeYear !== undefined) {
            ((((this.options as DefinedCalendarOptions).yearpanel as yearPanel).actions as yearControlActions).changeYear as yearChangePreSet)(year, this.year);
        }
        this.year = year;
        this.update();
    }

    protected nextYear(){
        if ((((this.options as DefinedCalendarOptions).yearpanel as yearPanel).actions as yearControlActions).nextYear !== undefined) {
            ((((this.options as DefinedCalendarOptions).yearpanel as yearPanel).actions as yearControlActions).nextYear as yearChangePreSet)(this.year+1, this.year);
        } else if ((((this.options as DefinedCalendarOptions).yearpanel as yearPanel).actions as yearControlActions).changeYear !== undefined) {
            ((((this.options as DefinedCalendarOptions).yearpanel as yearPanel).actions as yearControlActions).changeYear as yearChangePreSet)(this.year+1, this.year);
        }
        this.year++;
        this.update();
    }

    protected prevYear(){
        if ((((this.options as DefinedCalendarOptions).yearpanel as yearPanel).actions as yearControlActions).prevYear !== undefined) {
            ((((this.options as DefinedCalendarOptions).yearpanel as yearPanel).actions as yearControlActions).prevYear as yearChangePreSet)(this.year-1, this.year);
        } else if ((((this.options as DefinedCalendarOptions).yearpanel as yearPanel).actions as yearControlActions).changeYear !== undefined) {
            ((((this.options as DefinedCalendarOptions).yearpanel as yearPanel).actions as yearControlActions).changeYear as yearChangePreSet)(this.year-1, this.year);
        }
        this.year--;
        this.update();
    }

    protected changeYear(){
        let year = Number(this.container.year.value);
        this.container.year.value = year.toString();
        this.changeCalendarYear(year);
    }

    protected createYearPanel() {
        this.container.yearpanel = document.createElement('div') as HTMLDivElement;
        this.container.yearpanel.classList.add(
            ((this.options as DefinedCalendarOptions).cssclasses as CSSClassSet).prefix + '-' +
            ((this.options as DefinedCalendarOptions).cssclasses as CSSClassSet).yearDiv
        );
        if (((this.options as DefinedCalendarOptions).yearpanel as yearPanel).control) {
            this.container.prevyear = document.createElement('div');
            this.container.prevyear.classList.add( ((this.options as DefinedCalendarOptions).cssclasses as CSSClassSet).yearprevElement );
            this.container.prevyear.addEventListener('click', this.prevYear.bind(this), false);
            this.container.yearpanel.append(this.container.prevyear);
            this.container.year = document.createElement('input');
            this.container.year.setAttribute('type',"text");
            this.container.year.setAttribute('value',this.year.toString());
            this.container.year.classList.add( ((this.options as DefinedCalendarOptions).cssclasses as CSSClassSet).yearElement );
            this.container.year.addEventListener('change', this.changeYear.bind(this), false);
            this.container.yearpanel.append(this.container.year);
            this.container.nextyear = document.createElement('div');
            this.container.nextyear.classList.add( ((this.options as DefinedCalendarOptions).cssclasses as CSSClassSet).yearnextElement );
            this.container.nextyear.addEventListener('click', this.nextYear.bind(this), false);
            this.container.yearpanel.append(this.container.nextyear);
        }
        else {
            this.container.year = document.createElement('span');
            this.container.year.innerHTML = this.year.toString();
            this.container.year.classList.add( ((this.options as DefinedCalendarOptions).cssclasses as CSSClassSet).yearElement );
            this.container.yearpanel.append(this.container.year);
        }
    }

    protected createSheetLabel() {
        let sheetlabel = document.createElement('div');
        sheetlabel.classList.add(
            ((this.options as DefinedCalendarOptions).cssclasses as CSSClassSet).prefix + '-' +
            ((this.options as DefinedCalendarOptions).cssclasses as CSSClassSet).labelDiv
        );
        let horizontal = ((this.options as DefinedCalendarOptions).sheetlabel as sheetLabel).layout === 'horizontal';
        // Create dates label
        if ( ((this.options as DefinedCalendarOptions).datespanel as datesPanel).display ) {
            let dateslabel = document.createElement('div');
            dateslabel.classList.add(
                ((this.options as DefinedCalendarOptions).cssclasses as CSSClassSet).prefix + '-' +
                ((this.options as DefinedCalendarOptions).cssclasses as CSSClassSet).dateslabelDiv
            );
            let labelparent = horizontal?dateslabel:document.createElement('ul');
            for (let i in (this.options as DefinedCalendarOptions).format) {
                if (
                    (i !== ((this.options as DefinedCalendarOptions).cssclasses as CSSClassSet).thismonthdayCell) &&
                    (i !== ((this.options as DefinedCalendarOptions).cssclasses as CSSClassSet).previousmonthdayCell) &&
                    (i !== ((this.options as DefinedCalendarOptions).cssclasses as CSSClassSet).nextmonthdayCell) &&
                    (i !== ((this.options as DefinedCalendarOptions).cssclasses as CSSClassSet).othermonthdayCell)
                ) {
                    let item = ((this.options as DefinedCalendarOptions).format as CalendarDateFormatSet)[i];
                    let itemclass = (typeof item === 'string')?item:item.cssclass;
                    itemclass = (itemclass == '$parent')?i:itemclass;
                    let itemelem = document.createElement('span');
                    itemelem.innerHTML = "&nbsp;&nbsp;";
                    itemelem.classList.add('thismonth', itemclass);
                    if (horizontal) {
                        labelparent.append(itemelem);
                        let itemtext = document.createElement('span');
                        itemtext.innerHTML = "&nbsp;" + (item as any).label + "&nbsp;&nbsp;&nbsp;";
                        labelparent.append(itemtext);                    
                    }
                    else {
                        let litem = document.createElement('li');
                        litem.append(itemelem);
                        let itemtext = document.createTextNode(" " + (item as any).label);
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
        if ( ((this.options as DefinedCalendarOptions).moonpanel as moonPanel).display ) {
            let moonlabel = document.createElement('div');
            moonlabel.classList.add(
                ((this.options as DefinedCalendarOptions).cssclasses as CSSClassSet).prefix + '-' +
                ((this.options as DefinedCalendarOptions).cssclasses as CSSClassSet).moonlabelDiv
            );
            if (horizontal) {
                for (let i=0; i<4; i++) {
                    let itemelem = document.createElement('span');
                    itemelem.classList.add(((this.options as DefinedCalendarOptions).cssclasses as CSSClassSet).moonIcon[i]);
                    moonlabel.append(itemelem);
                    itemelem = document.createElement('span');
                    itemelem.innerHTML = "&nbsp;" + Computus.moonphasename[(this.options as DefinedCalendarOptions).language as string][i] + "&nbsp;&nbsp;&nbsp;";
                    moonlabel.append(itemelem);
                }
            }
            else {
                let moonul = document.createElement('ul');
                for (let i=0; i<4; i++) {
                    let moonli = document.createElement('li');
                    let itemelem = document.createElement('span');
                    itemelem.classList.add(((this.options as DefinedCalendarOptions).cssclasses as CSSClassSet).moonIcon[i]);
                    moonli.append(itemelem);
                    itemelem = document.createElement('span');
                    itemelem.innerHTML = "&nbsp;" + Computus.moonphasename[(this.options as DefinedCalendarOptions).language as string][i];
                    moonli.append(itemelem);
                    moonul.append(moonli);
                }
                moonlabel.append(moonul);
            }
            sheetlabel.append(moonlabel);
        }
        return sheetlabel;
    }

    protected createCalendarHeader() {
        let yearpanelonheader = ((this.options as DefinedCalendarOptions).yearpanel as yearPanel).display && (((this.options as DefinedCalendarOptions).yearpanel as yearPanel).position === 'header');
        let sheetlabelonheader = ((this.options as DefinedCalendarOptions).sheetlabel as sheetLabel).display && (((this.options as DefinedCalendarOptions).sheetlabel as sheetLabel).position === 'header');
        if (yearpanelonheader || sheetlabelonheader) {
            this.container.header = document.createElement('div') as HTMLDivElement;
            this.container.header.classList.add( ((this.options as DefinedCalendarOptions).cssclasses as CSSClassSet).prefix + '-' +
                ((this.options as DefinedCalendarOptions).cssclasses as CSSClassSet).headerDiv );
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

    protected calcMoonPhases() {
        if ( ((this.options as DefinedCalendarOptions).moonpanel as moonPanel).display ) {
            this.moonJDE = Computus.truePhaseYear(this.year);
            this.moonDate = new Array(14);
            this.moonMonth = new Array(12);
            for (let i=0; i<12; i++) {
                this.moonMonth[i] = [];
            }
            for (let l=0;l<14;l++) {
                let temp = new Array(4) as [DateType,DateType,DateType,DateType];
                for (let p=0;p<4;p+=1) {
                    temp[p] = (this.newDate()).setJulianDate(this.moonJDE[l][p]);
                    if (temp[p].getFullYear()==this.year) {
                        this.moonMonth[temp[p].getMonth()].push({phase: p, date: temp[p]});
                    }
                }
                this.moonDate[l] = temp;
            }
        }
    }

    protected createCalendarSheet() {
        let pages = new Array(this.layout[2]);
        let months: Array<HTMLTableCellElement> = new Array(12);
        let m = 0;
        for (let k=0; k<this.layout[2]; k++) {
            pages[k] = {
                div: document.createElement('div') as HTMLDivElement,
                table: document.createElement('table') as HTMLTableElement,
                tbody: document.createElement('tbody') as HTMLTableSectionElement,
                tr: new Array(this.layout[0]) as Array<HTMLTableRowElement>,
                td: new Array(this.layout[0]*this.layout[1]) as Array<HTMLTableCellElement>,
            };
            if (this.id !== undefined) {
                pages[k].div.setAttribute('id', `${this.id}-page-${k}`)
            }
            pages[k].table.classList.add( ((this.options as DefinedCalendarOptions).cssclasses as CSSClassSet).prefix + '-' +
                ((this.options as DefinedCalendarOptions).cssclasses as CSSClassSet).pageTable );
            pages[k].div.classList.add( ((this.options as DefinedCalendarOptions).cssclasses as CSSClassSet).prefix + '-' +
                ((this.options as DefinedCalendarOptions).cssclasses as CSSClassSet).pageDiv );
            for (let i=0; i<this.layout[0]; i++) {
                pages[k].tr[i] = document.createElement('tr');
                for (let j=0; j<this.layout[1]; j++, m++) {
                    months[m] = pages[k].td[i+j] = document.createElement('td');
                    pages[k].tr[i].append(pages[k].td[i+j]);
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
        this.container.thismonthday = new Array(Computus.yeardays(this.year)) as Array<HTMLTableCellElement>;  // We need this?
        this.container.othermonthday = new Array(Computus.yeardays(this.year)) as Array<HTMLTableCellElement>; // We need this?
        for (let m=0; m<12; m++) {
            this.createMonthSheet(m);
        }
    }

    protected createMonthSheet(m: number) {
        // month sheet container
        let month = {
            divheader: document.createElement('div') as HTMLTableElement,
            spantitle: document.createElement('span') as HTMLSpanElement,
            table: document.createElement('table') as HTMLTableElement,
            thead: document.createElement('thead') as HTMLTableSectionElement,
            th: new Array(7) as Array<HTMLTableCellElement>,
            tbody: document.createElement('tbody') as HTMLTableSectionElement,
            tr: [] as Array<HTMLTableRowElement>,
            td: [] as Array<HTMLTableCellElement>,
            divfooter: undefined as unknown as HTMLTableElement,
            divmoon: undefined as unknown as HTMLDivElement,
            divmoonparent: undefined as unknown as HTMLElement,
            divdates: undefined as unknown as HTMLDivElement,
            divdatesparent: undefined as unknown as HTMLElement
        }
        // Name of month
        month.spantitle.innerHTML = // last abreviation if exists
            Computus.monthTable[(this.options as DefinedCalendarOptions).language as string][
                0//Computus.monthTable[(this.options as DefinedCalendarOptions).language as string].length-1
            ][m];
        month.spantitle.classList.add( ((this.options as DefinedCalendarOptions).cssclasses as CSSClassSet).monthnameSpan as string );
        month.divheader.append(month.spantitle);
        month.divheader.classList.add( ((this.options as DefinedCalendarOptions).cssclasses as CSSClassSet).monthheaderDiv as string );
        month.table.classList.add( ((this.options as DefinedCalendarOptions).cssclasses as CSSClassSet).monthsheetTable as string );
        // weekdays
        month.tr.push(document.createElement('tr'));
        for (let n=0; n<7; n++) {
            month.th[n] = document.createElement('th');
            month.th[n].innerHTML = // last abreviation if exists
                Computus.weekTable[(this.options as DefinedCalendarOptions).language as string][
                    Computus.weekTable[(this.options as DefinedCalendarOptions).language as string].length-1
                ][n];
            month.th[n].classList.add( ((this.options as DefinedCalendarOptions).cssclasses as CSSClassSet).weekheaderCell as string );
            if (n==0) {
                month.th[n].classList.add( ((this.options as DefinedCalendarOptions).cssclasses as CSSClassSet).weekendCell as string );
                month.th[n].classList.add( ((this.options as DefinedCalendarOptions).cssclasses as CSSClassSet).sundayCell as string );
            }
            else if (n==6) {
                month.th[n].classList.add( ((this.options as DefinedCalendarOptions).cssclasses as CSSClassSet).weekendCell as string );
            }
            else {
                month.th[n].classList.add( ((this.options as DefinedCalendarOptions).cssclasses as CSSClassSet).weekdayCell as string );
            }
            month.tr[0].append(month.th[n]);
        }
        month.thead.append(month.tr[0]);
        month.table.append(month.thead);

        let i = 0;  // row
        let j = 0;  // column
        let ntd = 0;

        let lastMonthLength = 
            (m>0) ?
                Computus.monthdays(this.year,m-1) :
                Computus.monthdays(this.year-1,11);
        let d: number;
        // Days of previous month.
        month.tr.push(document.createElement('tr'));
        for (d=lastMonthLength-Computus.weekday(this.year,m,1)+1; d<=lastMonthLength; d++) {
            month.td.push(document.createElement('td') as HTMLTableCellElement);
            month.td[ntd].innerHTML = d.toString();
            month.td[ntd].classList.add( ((this.options as DefinedCalendarOptions).cssclasses as CSSClassSet).previousmonthdayCell as string );
            month.tr[1].append(month.td[ntd]);
             // We need this?
            if (m==0) {
                this.container.othermonthday[Computus.cal2doy(this.year,11,d)-1] = month.td[ntd];
            }
            else {
                this.container.othermonthday[Computus.cal2doy(this.year,m-1,d)-1] = month.td[ntd];
            }
            ntd++;
            j++;
        }
        month.tbody.append(month.tr[1]);

        // Days of this month.
        d = 1;
        while (d<=Computus.monthdays(this.year,m)) {
            let doy = Computus.cal2doy(this.year,m,d);
            if (j==0) {
                month.tr.push(document.createElement('tr'));
                month.tbody.append(month.tr[i+1]);
                i++;
            }

            month.td.push(document.createElement('td'));
            month.td[ntd].innerHTML = d.toString();
            month.td[ntd].setAttribute('month', m.toString());
            month.td[ntd].setAttribute('date', d.toString());
            month.td[ntd].setAttribute('doy', doy.toString());
            month.td[ntd].setAttribute('dow', Computus.weekday(this.year,m,d).toString());
            let formatname = ((this.options as DefinedCalendarOptions).cssclasses as CSSClassSet).thismonthdayCell as string;
            month.td[ntd].classList.add( formatname );
            this.addActions(month.td[ntd], formatname);
            if (j==0) {
                month.td[ntd].classList.add( ((this.options as DefinedCalendarOptions).cssclasses as CSSClassSet).weekendCell as string );
                month.td[ntd].classList.add( ((this.options as DefinedCalendarOptions).cssclasses as CSSClassSet).sundayCell as string );
            }
            else if (j==6) {
                month.td[ntd].classList.add( ((this.options as DefinedCalendarOptions).cssclasses as CSSClassSet).weekendCell as string );
            }
            else {
                month.td[ntd].classList.add( ((this.options as DefinedCalendarOptions).cssclasses as CSSClassSet).weekdayCell as string );
            }
            month.tr[i+1].append(month.td[ntd]);
            if (this.dates[doy-1] !== undefined) {
                this.writeData(month.td[ntd-1], doy-1);
            }
            this.container.thismonthday[doy-1] = month.td[ntd]; // We need this?
            ntd++;

            j = (j < 6)?(j+1):0;
            d++;
        }

        // Days of next month.
        if (j!=0) {
            d = 1;
            while ((i<=5) && (j<6)) {

                if (j==0) {
                    month.tr.push(document.createElement('tr'));
                    month.tbody.append(month.tr[i+1])
                    i++;
                }

                month.td.push(document.createElement('td'));
                month.td[ntd].innerHTML = d.toString();
                month.td[ntd].classList.add( ((this.options as DefinedCalendarOptions).cssclasses as CSSClassSet).nextmonthdayCell as string );
                month.tr[i+1].append(month.td[ntd]);
                this.container.othermonthday[Computus.cal2doy(this.year,m+1,d)-1] = month.td[ntd]; // We need this?
                ntd++;

                j = (j < 6)?(j+1):0;
                d++;
            }

            month.td.push(document.createElement('td'));
            month.td[ntd].innerHTML = d.toString();
            month.td[ntd].classList.add( ((this.options as DefinedCalendarOptions).cssclasses as CSSClassSet).nextmonthdayCell as string );
            month.tr[i+1].append(month.td[ntd]);
             // We need this?
            if (m==11) {
                this.container.othermonthday[Computus.cal2doy(this.year,0,d)-1] = month.td[ntd];
            }
            else {
                this.container.othermonthday[Computus.cal2doy(this.year,m+1,d)-1] = month.td[ntd];
            }
            ntd++;
        }
        month.tbody.append(month.tr[i+1]);
        month.table.append(month.tbody);
        this.container.months.cell[m].append(month.divheader);
        this.container.months.cell[m].append(month.table);
        // Moon and dates panel
        let moonpaneldisplay = ((this.options as DefinedCalendarOptions).moonpanel as moonPanel).display;
        let moonpanelposition = ((this.options as DefinedCalendarOptions).moonpanel as moonPanel).position;
        let datespaneldisplay = ((this.options as DefinedCalendarOptions).datespanel as datesPanel).display;
        let datespanelposition = ((this.options as DefinedCalendarOptions).datespanel as datesPanel).position;
        // Create monthsheet footer container if moonpanel or datespanel is set to footer position
        if ((moonpaneldisplay && (moonpanelposition ==='footer')) ||
            (datespaneldisplay && (datespanelposition ==='footer')) ) {
            month.divfooter = document.createElement('div') as HTMLTableElement;
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
            else if (((moonpanelposition as string).charAt(0)==="#")) {
                let id = (moonpanelposition as string).substring(1);
                month.divmoonparent = document.getElementById(id) as HTMLElement;
                if (month.divmoonparent === null) {
                    throw new Error (`invalid option (options.moonpanel.position = "${moonpanelposition}"). Element with atribute id="${id}" not found.`);
                }
            }
            else {
                throw new Error(`invalid option (options.moonpanel.position = "${moonpanelposition}"). Must be "header", "footer", or "#<id>"; where id must be a valid element id.`);
            }
            month.divmoon = document.createElement('div');
            // Create moon panel
            if (((this.options as DefinedCalendarOptions).moonpanel as moonPanel).layout == 'horizontal') {
                for (let i=0; i<this.moonMonth[m].length; i++) {
                    let spanphase = document.createElement('span');                    
                    spanphase.classList.add(((this.options as DefinedCalendarOptions).cssclasses as CSSClassSet).moonIcon[this.moonMonth[m][i].phase]);
                    month.divmoon.append(spanphase);
                    spanphase = document.createElement('span');
                    spanphase.innerHTML = (((this.options as DefinedCalendarOptions).moonpanel as moonPanel).label as moonCallback)(this.moonMonth[m][i].date, this.moonMonth[m][i].phase) + "&nbsp;";
                    month.divmoon.append(spanphase);
                }
            }
            else if (((this.options as DefinedCalendarOptions).moonpanel as moonPanel).layout == 'vertical') {
                let ulphases = document.createElement('ul');
                for (let i=0; i<this.moonMonth[m].length; i++) {
                    let liphase = document.createElement('li');
                    let spanphase = document.createElement('span');
                    spanphase.classList.add(((this.options as DefinedCalendarOptions).cssclasses as CSSClassSet).moonIcon[this.moonMonth[m][i].phase]);
                    liphase.append(spanphase);
                    spanphase = document.createElement('span');
                    spanphase.innerHTML = (((this.options as DefinedCalendarOptions).moonpanel as moonPanel).label as moonCallback)(this.moonMonth[m][i].date,this.moonMonth[m][i].phase);
                    liphase.append(spanphase);
                    ulphases.append(liphase);
                }
                month.divmoon.append(ulphases);
            }
            else {
                throw new Error(`invalid option (options.moonpanel.layout = "${((this.options as DefinedCalendarOptions).moonpanel as moonPanel).layout}"). Must be "horizontal" or "vertical".`);
            }
            month.divmoon.classList.add(((this.options as DefinedCalendarOptions).cssclasses as CSSClassSet).moonDiv as string);
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
            else if (((datespanelposition as string).charAt(0)==="#")) {
                let id = (datespanelposition as string).substring(1);
                month.divdatesparent = document.getElementById(id) as HTMLElement;
                if (month.divdatesparent === null) {
                    throw new Error (`invalid option (options.datespanel.position = "${datespanelposition}"). Element with atribute id="${id}" not found.`);
                }
            }
            else {
                throw new Error(`invalid option (options.datespanel.position = "${datespanelposition}"). Must be "header", "footer", or "#<id>"; where id must be a valid element id.`);
            }
            month.divdates = document.createElement('div');
            // Create dates panel
            let uldates = document.createElement('ul');
            for (let d=1; d<=Computus.monthlength[m][0]; d++) {
                let datesdoy = this.dates[Computus.monthlength[m][Computus.isleap(this.year)?2:1]+d];
                if (datesdoy !== undefined) {
                    for (let i=0; i<datesdoy.length; i++) {
                        let lidate = document.createElement('li');
                        let date: DateType;
                        if ((datesdoy[i].date !== undefined) && Calendar.isDate(datesdoy[i].date)) {
                            date = datesdoy[i].date as DateType;
                        }
                        else {
                            date = this.newDate(...Computus.doy2cal(this.year,d));
                        }
                        lidate.append((((this.options as DefinedCalendarOptions).datespanel as datesPanel).label as dateDenoteCallback)(
                            date as DateType,
                            datesdoy[i].label as string
                        ));
                        uldates.append(lidate);
                    }
                }
            }
            month.divdates.append(uldates);
            month.divdates.classList.add(((this.options as DefinedCalendarOptions).cssclasses as CSSClassSet).datesDiv as string);
            month.divdatesparent.append(month.divdates);
        }
        this.container.months.sheet[m] = month;
    }

    protected removeCalendarSheet() {
        this.container.months = {
            cell: null as unknown as Array<HTMLTableCellElement>,
        };
        this.container.pages = null;
        this.container.main.removeChild(this.container.main.lastElementChild);
    }
}