// Calendar instance variable
var TheCalendar: Calendar;

// Calendar date denotation format classes
const CalendarFrmt_pt_BR: CalendarDateFormatSet = { // day format and events/other associated
    thismonth: { // css class name same as property
        cssclass: '$parent',
        actions: {
            click: function (this: Calendar, pointer: PointerEvent) {
                console.log("thismonth:this.getPointerAttribute(pointer,'doy')=", this.getPointerAttribute(pointer, 'doy'))
            }
        },
    },
    othermonth: 'othermonth', // css class name specification
    dayoff: { // general format specification
        cssclass: '$parent', // css class name same as property
        label: "Feriado", // if label defined then include in legend
        tooltip: function (value: CalendarData, index: number, format: CalendarDateFormat, key: string): string {
            return `xxxx`;
        }
    },
    celebration: { // general format specification
        cssclass: '$parent',
        label: "Data Comemorativa",
    },
    today: { // general format specification
        cssclass: '$parent',
        label: "Hoje",
        actions: {
            click: function (this: Calendar, pointer: PointerEvent) {
                console.log("today:this.getPointerAttribute(pointer,'doy')=", this.getPointerAttribute(pointer, 'doy'))
            }
        },
    },
};

// Dates denotation
const CalendarData_pt_BR: CalendarDataArray = [
    { month: 0, date: 1, label: "Ano Novo", format: 'dayoff' },
//    { month: 0, date:31, label: "test", format: 'today' }, //it fails if some date is the last day of month
    { easter: Computus.saturnaliaFinis, label: "Carnaval", format: 'dayoff' },
    { easter: Computus.mercuriiCinereo, label: "Quarta-feira de Cinzas", format: 'dayoff' },
    { date: [2, 8], label: "Dia Internacional da Mulher", format: 'celebration' },
    { easter: Computus.solisPalmarum, label: "Domingo de Ramos", format: 'dayoff' },
    { easter: - 2, label: "Sexta-feira da Paixão", format: 'dayoff' },
    { date: function(year: number) { return Computus.cal2doy(year,2,21); }, label: "Equinócio", format: 'celebration' },
    { easter: 0, label: "Páscoa", format: 'dayoff' },
    { date: { month: 3, date: 19 }, label: "Dia do Índio", format: 'celebration' },
    { date: [3, 21], label: "Tiradentes", format: 'dayoff' },
    { date: [3, 22], label: "Descobrimento do Brasil", format: 'celebration' },
    { date: [4, 1], label: "Dia do trabalho", format: 'dayoff' },
    { month: 4, weekday: [0, 1], label: "Dia das Mães", format: 'celebration' },
    { easter: Computus.pentaecoste, label: "Pentecostes", format: 'celebration' },
    { easter: Computus.corpusDomini, label: "Corpus Christi", format: 'dayoff' },
    { month: 7, weekday: [0, 1], label: "Dia dos Pais", format: 'celebration' },
    { date: [8, 7], label: "Independência do Brasil", format: 'dayoff' },
    { date: [9, 12], label: "Nossa Senhora Aparecida", format: 'dayoff' },
    { date: [9, 12], label: "Dia das Crianças", format: 'dayoff' },
    { date: [10, 2], label: "Finados", format: 'dayoff' },
    { date: [10, 15], label: "Proclamação da República", format: 'dayoff' },
    { date: [10, 19], label: "Dia da Bandeira", format: 'celebration' },
    { date: [10, 20], label: "Dia da Consciência Negra", format: 'celebration' },
    { date: [11, 25], label: "Natal", format: 'dayoff' },
];
    
// Calendar options
const CalendarOpt: CalendarOptions = {
    language: 'PT',
    yearpanel: {
        display: true,
        control: true,
        position: 'header',
    },
    sheetlabel: {
        display: true,
        position: 'header',
        layout: 'horizontal'
    },
    format: CalendarFrmt_pt_BR,
    moonpanel: {
        display: true,
        layout: 'horizontal',
        tooltip: function(datetime:DateType, phase:number): string {
            return `xxxx`;
        },
    },
    datespanel: {
        display: true,
    },
};

// Calendar configuration
const CalendarConfig_pt_BR: CalendarConfiguration = {
    id: 'calendar_01',
    layout: [3, 4],
    year: (new Date()).getFullYear(),
    data: CalendarData_pt_BR,
    options: CalendarOpt
};