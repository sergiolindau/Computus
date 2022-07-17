/**
 * Languages Set (for language menu and others)
 */


/**
 * Name: languageTable
 * Source:
 * http://xml.coverpages.org/iso639a.html
 * https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes
 * https://www.science.co.il/language/Codes.php
 * http://www.lingoes.net/en/translator/langcode.htm
 * https://www.loc.gov/standards/iso639-2/php/code_list.php
 * https://www.w3schools.com/tags/ref_language_codes.asp
 * https://www.andiamo.co.uk/resources/iso-language-codes/
 * http://www.mathguide.de/info/tools/languagecode.html
 * https://www.iso.org/iso-639-language-codes.html
 */

const languageTable: {[k: string]: string} = {
	EN : "English",
	PT : "Português",
	ES : "Español",
	IT : "Italiano",
	FR : "Français",
	DE : "Deutsch",
	LA : "Latine",
	HE : "עברית",
	EL : "ελληνικά"
}

const weekTable = Computus.weekTable;
const monthTable = Computus.monthTable;

/***********************************************************************
 Translation (simple substitutions)
***********************************************************************/
type TSimpleTranslation = {[k: string]: string};

const translationTable: {[k: string]: TSimpleTranslation} = {

languageLabel: {
	EN : "Language",
	PT : "Idioma",
	ES : "Idioma",
	IT : "Lingua",
	FR : "Langue",
	DE : "Sprache",
	LA : "Sermone",
	HE : "שפה",
	EL : "Γλώσσα"
},

shortLanguageDescription: {
	EN : "Select the language",
	PT : "Selecione o idioma",
	ES : "Seleccione el idioma",
	IT : "Seleziona la lingua",
	FR : "Sélectionnez la langue",
	DE : "Sprache auswählen",
	LA : "Eligere lingua",
	HE : "בחר את השפה שלך",
	EL : "Επιλέξτε τη γλώσσα σας"
},

shortTimezoneDescription: {
	EN : "Select the time zone",
	PT : "Selecione o fuso horário",
	ES : "Seleccione la zona horaria",
	IT : "Seleziona il fuso orario",
	FR : "Sélectionnez le fuseau horaire",
	DE : "Wählen sie die zeitzone aus",
	LA : "Eligere tempus zona",
	HE : "בחר את אזור הזמן",
	EL : "Επιλέξτε τη ζώνη ώρας"
},

timezoneAdjustLabel: {
	EN : "Time zone adjust",
	PT : "Ajuste de fuso horário",
	ES : "Ajuste de zona horaria",
	IT : "Regolazione del fuso orario",
	FR : "Ajuster le fuseau horaire",
	DE : "Zeitzone anpassen",
	LA : "Adjust tempus zona",
	HE : "אזור זמן כוונון",
	EL : "Ρύθμιση ζώνης ώρας"
},

locationLabel: {
	EN : "Location",
	PT : "Localização",
	ES : "Ubicación",
	IT : "Posizione",
	FR : "Emplacement",
	DE : "Standort",
	LA : "Locus",
	HE : "מיקום",
	EL : "Τοποθεσία"
},

datetimeLabel: {
	EN : "Civil date and time",
	PT : "Data e hora civil",
	ES : "Fecha y hora civiles",
	IT : "Data e ora civile",
	FR : "Date et heure civiles",
	DE : "Bürgerliches datum und uhrzeit",
	LA : "Civile die et tempore",
	HE : "תאריך ושעה אזרחיים",
	EL : "Aστική ημερομηνία και ώρα"
},

currentLocationLabel: {
	EN : "Current location",
	PT : "Local atual",
	ES : "local actual",
	IT : "posizione corrente",
	FR : "emplacement actuel",
	DE : "aktueller standort",
	LA : "currens locus",
	HE : "מיקום נוכחי",
	EL : "τωρινή τοποθεσία"
},

locationResponseWaitingLabel: {
	EN : "Waiting location response",
	PT : "Aguardando resposta da localização",
	ES : "Esperando respuesta de ubicación",
	IT : "In attesa di risposta alla posizione",
	FR : "En attente de la réponse de localisation",
	DE : "Warten auf antwort des standorts",
	LA : "Adtendite locum nostrum responsum",
	HE : "ממתין לתגובת מיקום",
	EL : "Αναμονή για απόκριση θέσης"
},

shortUTCDescription: {
	EN : "the basis of civil time.",
	PT : "a base do tempo civil.",
	ES : "la base del tiempo civil",
	IT : "la base del tempo civile.",
	FR : "la base du temps civil.",
	DE : "die Basis der zivilen Zeit",
	LA : "et ex civili tempus.",
	HE : "בסיס הזמן האזרחי.",
	EL : "Η βάση του πολιτικού χρόνου."
},

shortTAIDescription: {
	EN : "the official timekeeping standard.",
	PT : "o padrão de cronometragem oficial.",
	ES : "la norma oficial de cronometraje.",
	IT : "lo standard ufficiale di cronometraggio.",
	FR : "la norme officielle de chronométrage.",
	DE : "der offizielle Zeitnehmungsstandard",
	LA : "publica vexillum per tempore.",
	HE : "את תקן הזמן הרשמי.",
	EL : "το επίσημο χρονικό πρότυπο."
},

shortTTDescription: {
	EN : "used for solar system ephemeris look-up.",
	PT : "usado para pesquisa de efemérides do sistema solar.",
	ES : "utilizado para la búsqueda de efemérides del sistema solar.",
	IT : "utilizzato per la ricerca di effemeridi del sistema solare.",
	FR : "utilisé pour la recherche des éphémérides du système solaire.",
	DE : "der offizielle Zeitnehmungsstandard.",
	LA : "ephemeris in usum systematis solaris vultus sursum.",
	HE : "משמש עבור מערכת השמש ephemeris להסתכל למעלה.",
	EL : "που χρησιμοποιούνται για την εμφάνιση του ηφαιστειακού ηλιακού συστήματος."
},

shortTCGDescription: {
	EN : "used for calculations centered on the Earth in space.",
	PT : "usado para cálculos centrados na Terra no espaço.",
	ES : "usado para cálculos centrados en la Tierra en el espacio.",
	IT : "usato per i calcoli centrati sulla Terra nello spazio.",
	FR : "utilisé pour les calculs centrés sur la Terre dans l'espace.",
	DE : "wird für Berechnungen verwendet, die sich auf die Erde im Weltraum konzentrieren.",
	LA : "propter calculations sitas in spatio et in terra.",
	HE : "המשמש לחישובים מרוכזים על כדור הארץ בחלל.",
	EL : "που χρησιμοποιείται για υπολογισμούς που επικεντρώνονται στη Γη στο διάστημα."
},

minutesLabel: {
	EN : "minutes",
	PT : "minutos",
	ES : "minutos",
	IT : "minuti",
	FR : "minutes",
	DE : "minuten",
	LA : "minutis",
	HE : "דקות",
	EL : "λεπτά"
},

nowLabel: {
	EN : "Now",
	PT : "Agora",
	ES : "Ahora",
	IT : "Adesso",
	FR : "À présent",
	DE : "Jetzt",
	LA : "Nunc",
	HE : "עַכשָׁיו",
	EL : "Τώρα"
},

bystepLabel: {
	EN : "By step",
	PT : "Por passo",
	ES : "Por paso	",
	IT : "A passo",
	FR : "Par étape",
	DE : "Schritt für Schritt",
	LA : "Per gradus",
	HE : "לפי שלב",
	EL : "Βήμα"
},

yearLabel: {
	EN : "Year",
	PT : "Ano",
	ES : "Año",
	IT : "Anno",
	FR : "An",
	DE : "Jahr",
	LA : "Annus",
	HE : "שָׁנָה",
	EL : "ελληνικά"
},

monthLabel: {
	EN : "Month",
	PT : "Mês",
	ES : "Mes",
	IT : "Mese",
	FR : "Mois",
	DE : "Monat",
	LA : "Mensis",
	HE : "חוֹדֶשׁ",
	EL : "ελληνικά"
},

dayLabel: {
	EN : "Day",
	PT : "Dia",
	ES : "Día",
	IT : "Giorno",
	FR : "Jour",
	DE : "Tag",
	LA : "Dies",
	HE : "יְוֹם",
	EL : "ελληνικά"
},

hourLabel: {
	EN : "Hour",
	PT : "Hora",
	ES : "Hora",
	IT : "Ora",
	FR : "Heure",
	DE : "Stunde",
	LA : "Hora",
	HE : "שָׁעָה",
	EL : "ελληνικά"
},

minuteLabel: {
	EN : "Minute",
	PT : "Minuto",
	ES : "Minuto",
	IT : "Minuto",
	FR : "Minute",
	DE : "Minute",
	LA : "Minutum",
	HE : "דַקָה",
	EL : "ελληνικά"
},

secondLabel: {
	EN : "Second",
	PT : "Segundo",
	ES : "Segundo",
	IT : "Secondo",
	FR : "Seconde",
	DE : "Sekunde",
	LA : "Secundus",
	HE : "שְׁנִיָה",
	EL : "ελληνικά"
},

expression5: {
	EN : "English",
	PT : "Português",
	ES : "Español",
	IT : "Italiano",
	FR : "Français",
	DE : "Deutsch",
	LA : "Latine",
	HE : "עברית",
	EL : "ελληνικά"
},

};

/**
 * Glossary (hiperlinks with descriptions)
 */

type TGlossaryTranslation = {[k: string]: [string,string,string]};
const glossaryTable: {[k: string]: TGlossaryTranslation} = {
//https://en.wikipedia.org/wiki/ISO_3166-1
ISO639: {
	EN : ["ISO 639","https://en.wikipedia.org/wiki/ISO_639",""],
	PT : ["ISO 639","https://pt.wikipedia.org/wiki/ISO_639",""],
	ES : ["ISO 639","https://pt.wikipedia.org/wiki/ISO_639",""],
	IT : ["ISO 639","https://pt.wikipedia.org/wiki/ISO_639",""],
	FR : ["ISO 639","https://fr.wikipedia.org/wiki/ISO_639",""],
	DE : ["ISO 639","https://en.wikipedia.org/wiki/ISO_639",""],
	LA : ["ISO 639","https://pt.wikipedia.org/wiki/ISO_639",""],
	HE : ["ISO 639","https://en.wikipedia.org/wiki/ISO_639",""],
	EL : ["ISO 639","https://en.wikipedia.org/wiki/ISO_639",""],
},

GPL: {
	EN : ["Geographical point","https://en.wikipedia.org/wiki/ISO_6709",""],
	PT : ["Ponto geográfico","https://pt.wikipedia.org/wiki/ISO_6709",""],
	ES : ["Punto geográfico","https://pt.wikipedia.org/wiki/ISO_6709",""],
	IT : ["Punto geografico","https://pt.wikipedia.org/wiki/ISO_6709",""],
	FR : ["Point géographique","https://fr.wikipedia.org/wiki/ISO_6709",""],
	DE : ["Geografischer punkt","https://en.wikipedia.org/wiki/ISO_6709",""],
	LA : ["Locorum","https://pt.wikipedia.org/wiki/ISO_6709",""],
	HE : ["נקודה גיאוגרפית","https://en.wikipedia.org/wiki/ISO_6709",""],
	EL : ["Γεωγραφικό σημείο","https://en.wikipedia.org/wiki/ISO_6709",""],
},

ISO6709: {
	EN : ["ISO 6709","https://en.wikipedia.org/wiki/ISO_6709",""],
	PT : ["ISO 6709","https://pt.wikipedia.org/wiki/ISO_6709",""],
	ES : ["ISO 6709","https://pt.wikipedia.org/wiki/ISO_6709",""],
	IT : ["ISO 6709","https://pt.wikipedia.org/wiki/ISO_6709",""],
	FR : ["ISO 6709","https://fr.wikipedia.org/wiki/ISO_6709",""],
	DE : ["ISO 6709","https://en.wikipedia.org/wiki/ISO_6709",""],
	LA : ["ISO 6709","https://pt.wikipedia.org/wiki/ISO_6709",""],
	HE : ["ISO 6709","https://en.wikipedia.org/wiki/ISO_6709",""],
	EL : ["ISO 6709","https://en.wikipedia.org/wiki/ISO_6709",""],
},

Latitude: {
	EN : ["Latitude","https://en.wikipedia.org/wiki/Latitude",""],
	PT : ["Latitude","https://pt.wikipedia.org/wiki/Latitude",""],
	ES : ["Latitud","https://es.wikipedia.org/wiki/Latitud",""],
	IT : ["Latitudine","https://it.wikipedia.org/wiki/Latitudine",""],
	FR : ["Latitude","https://en.wikipedia.org/wiki/Latitude",""],
	DE : ["Geographische Breite","https://de.wikipedia.org/wiki/Geographische_Breite",""],
	LA : ["Latitudo","https://en.wikipedia.org/wiki/Latitude",""],
	HE : ["קו רוחב","https://en.wikipedia.org/wiki/Latitude",""],
	EL : ["Γεωγραφικό πλάτος","https://en.wikipedia.org/wiki/Latitude","Geografikó plátos"],
},

Longitude: {
	EN : ["Longitude","https://en.wikipedia.org/wiki/Longitude",""],
	PT : ["Longitude","https://pt.wikipedia.org/wiki/Longitude",""],
	ES : ["Longitud","https://es.wikipedia.org/wiki/Longitud_(cartograf%C3%ADa)",""],
	IT : ["Longitudine","https://it.wikipedia.org/wiki/Longitudine",""],
	FR : ["Français","https://fr.wikipedia.org/wiki/Longitude",""],
	DE : ["Geographische Länge","https://de.wikipedia.org/wiki/Geographische_L%C3%A4nge",""],
	LA : ["Longitudo","https://en.wikipedia.org/wiki/Longitude",""],
	HE : ["קו האורך","https://en.wikipedia.org/wiki/Longitude",""],
	EL : ["Γεωγραφικό μήκος","https://en.wikipedia.org/wiki/Longitude","Geografikó míkos"],
},

//https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
//http://statoids.com/tconcept.html
//https://www.w3.org/TR/timezone/
Timezone: {
	EN : ["Time zone","https://en.wikipedia.org/wiki/Time_zone",""],
	PT : ["Fuso horário","https://pt.wikipedia.org/wiki/Fuso_hor%C3%A1rio",""],
	ES : ["Huso horario","https://es.wikipedia.org/wiki/Huso_horario",""],
	IT : ["Fuso orario","https://it.wikipedia.org/wiki/Fuso_orario",""],
	FR : ["Fuseau horaire","https://en.wikipedia.org/wiki/Fuseau_horaire",""],
	DE : ["Zeitzone","https://de.wikipedia.org/wiki/Zeitzone",""],
	LA : ["Time zone","https://en.wikipedia.org/wiki/Time_zone",""],
	HE : ["Time zone","https://en.wikipedia.org/wiki/Time_zone",""],
	EL : ["Time zone","https://en.wikipedia.org/wiki/Time_zone",""],
},

//https://en.wikipedia.org/wiki/ISO_8601
//https://en.wikipedia.org/wiki/Unix_time
UTC: {
	EN : [
			"Coordinated Universal Time",
			"https://en.wikipedia.org/wiki/Coordinated_Universal_Time",
			"The primary time standard by which the world regulates clocks and time, it is the civil time. It is the standard time at reference time zone from which all other time zones in the world are calculated. It is within about 1 second of mean solar time at 0° longitude"
		],
	PT : [
			"Tempo Universal Coordenado",
			"https://pt.wikipedia.org/wiki/Tempo_Universal_Coordenado",
			"É o padrão de tempo primário pela qual o mundo regula os relógios e tempo de maneira geral, é o tempo civil. É a hora padrão no fuso horário de referência, a partir da qual todos os outros fusos horários do mundo são calculados. Está a menos de 1 segundo do tempo solar médio a 0° de longitude."
		],
	ES : [
			"Tiempo Universal Coordinado",
			"https://es.wikipedia.org/wiki/Tiempo_universal_coordinado",
			""
		],
	IT : [
			"Tempo Coordinato Universale",
			"https://it.wikipedia.org/wiki/Tempo_coordinato_universale",
			""
		],
	FR : [
			"Temps Universel Coordonné",
			"https://fr.wikipedia.org/wiki/Temps_universel_coordonn%C3%A9",
			""
		],
	DE : [
			"Koordinierte Weltzeit",
			"https://de.wikipedia.org/wiki/Koordinierte_Weltzeit",
			""
		],
	LA : [
			"Coordinated Universal Time",
			"https://en.wikipedia.org/wiki/Coordinated_Universal_Time",
			""
		],
	HE : [
			"Coordinated Universal Time",
			"https://en.wikipedia.org/wiki/Coordinated_Universal_Time",
			""],
	EL : [
			"Coordinated Universal Time",
			"https://en.wikipedia.org/wiki/Coordinated_Universal_Time",
			""
		],
},

TAI: {
	EN : [
			"International Atomic Time",
			"https://en.wikipedia.org/wiki/International_Atomic_Time",
			""
		],
	PT : [
			"Tempo Atômico Internacional",
			"https://pt.wikipedia.org/wiki/Tempo_At%C3%B4mico_Internacional",
			""
		],
	ES : [
			"Tiempo Atómico Internacional",
			"https://es.wikipedia.org/wiki/Tiempo_At%C3%B3mico_Internacional",
			""
		],
	IT : [
			"Tempo atomico internazionale",
			"https://it.wikipedia.org/wiki/Tempo_atomico_internazionale",
			""
		],
	FR : [
			"Temps atomique international",
			"https://fr.wikipedia.org/wiki/Temps_atomique_international",
			""
		],
	DE : [
			"Internationale Atomzeit",
			"https://de.wikipedia.org/wiki/Internationale_Atomzeit",
			""
		],
	LA : [
			"Internationalis Atomicus Tempus",
			"https://en.wikipedia.org/wiki/Coordinated_Universal_Time",
			""
		],
	HE : [
			"זמן אטומי בינלאומי",
			"https://en.wikipedia.org/wiki/Coordinated_Universal_Time",
			""],
	EL : [
			"Διεθνής Ατομική Ώρα",
			"https://en.wikipedia.org/wiki/Coordinated_Universal_Time",
			""
		],
},

TT: {
	EN : [
			"Terrestrial Time",
			"https://en.wikipedia.org/wiki/Terrestrial_Time",
			""
		],
	PT : [
			"Tempo Terrestre",
			"https://en.wikipedia.org/wiki/Terrestrial_Time",
			""
		],
	ES : [
			"Tiempo Terrestre",
			"https://en.wikipedia.org/wiki/Terrestrial_Time",
			""
		],
	IT : [
			"Tempo Terrestre",
			"https://it.wikipedia.org/wiki/Tempo_terrestre",
			""
		],
	FR : [
			"Temps Terrestre",
			"https://fr.wikipedia.org/wiki/Temps_terrestre",
			""
		],
	DE : [
			"Terrestrische Zeit",
			"https://en.wikipedia.org/wiki/Terrestrial_Time",
			""
		],
	LA : [
			"Terrestres Tempus",
			"https://en.wikipedia.org/wiki/Terrestrial_Time",
			""
		],
	HE : [
			"הזמן הארצי",
			"https://en.wikipedia.org/wiki/Terrestrial_Time",
			""],
	EL : [
			"Επίγεια ώρα",
			"https://en.wikipedia.org/wiki/Terrestrial_Time",
			"Epígeia óra"
		],
},

TCG: {
	EN : [
			"Geocentric Coordinate Time",
			"https://en.wikipedia.org/wiki/Geocentric_Coordinate_Time",
			""
		],
	PT : [
			"Tempo Geocêntrico Coordenado",
			"https://en.wikipedia.org/wiki/Geocentric_Coordinate_Time",
			""
		],
	ES : [
			"Tiempo Geocéntrico Coordinado",
			"https://en.wikipedia.org/wiki/Geocentric_Coordinate_Time",
			""
		],
	IT : [
			"Tempo Coordinato Geocentrico",
			"https://en.wikipedia.org/wiki/Geocentric_Coordinate_Time",
			""
		],
	FR : [
			"Temps de Coordonnées Géocentrique",
			"https://en.wikipedia.org/wiki/Geocentric_Coordinate_Time",
			""
		],
	DE : [
			"Geozentrische Koordinatenzeit",
			"https://de.wikipedia.org/wiki/Geozentrische_Koordinatenzeit",
			""
		],
	LA : [
			"Geocentricis Coordinated Tempus",
			"https://en.wikipedia.org/wiki/Geocentric_Coordinate_Time",
			""
		],
	HE : [
			"זמן גיאוקצנטרי מתואם",
			"https://en.wikipedia.org/wiki/Geocentric_Coordinate_Time",
			""],
	EL : [
			"Συντονισμένος γεωκεντρικός χρόνος",
			"https://en.wikipedia.org/wiki/Geocentric_Coordinate_Time",
			"Syntonisménos geokentrikós chrónos"
		],
},

LeapYear: {
	EN : ["Leap year","https://en.wikipedia.org/wiki/Leap_year",""],
	PT : ["Ano bissexto","https://pt.wikipedia.org/wiki/Ano_bissexto",""],
	ES : ["Año bisiesto","https://es.wikipedia.org/wiki/A%C3%B1o_bisiesto",""],
	IT : ["Anno bisestile","https://it.wikipedia.org/wiki/Anno_bisestile",""],
	FR : ["Année bissextile","https://en.wikipedia.org/wiki/Leap_year",""],
	DE : ["Schaltjahr","https://de.wikipedia.org/wiki/Schaltjahr",""],
	LA : ["Bissextili","https://en.wikipedia.org/wiki/Leap_year",""],
	HE : ["שנה מעוברת","https://en.wikipedia.org/wiki/Leap_year",""],
	EL : ["Δίσεκτος χρόνος","https://en.wikipedia.org/wiki/Leap_year","Dísektos chrónos"],
},

DaylightSavingTime: {
	EN : ["Daylight saving time","https://en.wikipedia.org/wiki/Daylight_saving_time",""],
	PT : ["Horário de verão","https://pt.wikipedia.org/wiki/Hor%C3%A1rio_de_ver%C3%A3o",""],
	ES : ["Horario de verano","https://es.wikipedia.org/wiki/Horario_de_verano",""],
	IT : ["Ora legale","https://it.wikipedia.org/wiki/Ora_legale",""],
	FR : ["Heure d'été","https://en.wikipedia.org/wiki/Daylight_saving_time",""],
	DE : ["Sommerzeit","https://de.wikipedia.org/wiki/Sommerzeit",""],
	LA : ["Diei tempus lucrari","https://en.wikipedia.org/wiki/Daylight_saving_time",""],
	HE : ["שעון קיץ","https://en.wikipedia.org/wiki/Daylight_saving_time",""],
	EL : ["Θερινή ώρα","https://en.wikipedia.org/wiki/Daylight_saving_time",""],
},

JulianDayNumber: {
	EN : ["Julian Day Number (JDN)","https://en.wikipedia.org/wiki/Julian_day",""],
	PT : ["Dia Juliano (JDN)","https://pt.wikipedia.org/wiki/Data_juliana",""],
	ES : ["Día Juliano (JDN)","https://es.wikipedia.org/wiki/Fecha_juliana",""],
	IT : ["Giorno Giuliano (JDN)","https://it.wikipedia.org/wiki/Giorno_giuliano",""],
	FR : ["Julienne Jour (JDN)","https://en.wikipedia.org/wiki/Julian_day",""],
	DE : ["Julianischer Tag (JDN)","https://de.wikipedia.org/wiki/Julianisches_Datum",""],
	LA : ["Julianus Diem (JDN)","https://en.wikipedia.org/wiki/Julian_day",""],
	HE : ["חוליאן דיי (JDN)","https://en.wikipedia.org/wiki/Julian_day",""],
	EL : ["Julian Day Number (JDN)","https://en.wikipedia.org/wiki/Julian_day",""],
},

JulianDate: {
	EN : ["Julian Date (JD)","https://en.wikipedia.org/wiki/Julian_day",""],
	PT : ["Data Juliana (JD)","https://pt.wikipedia.org/wiki/Data_juliana",""],
	ES : ["Fecha Juliana (JD)","https://es.wikipedia.org/wiki/Fecha_juliana",""],
	IT : ["Giorno Giuliano (JD)","https://it.wikipedia.org/wiki/Giorno_giuliano",""],
	FR : ["Julienne Date (JD)","https://en.wikipedia.org/wiki/Julian_day",""],
	DE : ["Julianisches Datum (JD)","https://de.wikipedia.org/wiki/Julianisches_Datum",""],
	LA : ["Julianus Diem (JD)","https://en.wikipedia.org/wiki/Julian_day",""],
	HE : ["ג'וליאן תאריך (JD)","https://en.wikipedia.org/wiki/Julian_day",""],
	EL : ["Julian Date (JD)","https://en.wikipedia.org/wiki/Julian_day",""],
},

ModifiedJulianDate: {
	EN : ["Modified Julian Date (MJD)","https://en.wikipedia.org/wiki/Julian_day",""],
	PT : ["Data Juliana Modificada (MJD)","https://pt.wikipedia.org/wiki/Data_juliana",""],
	ES : ["Fecha Juliana Modificada (MJD)","https://es.wikipedia.org/wiki/Fecha_juliana",""],
	IT : ["Giorno Giuliano Modificata (MJD)","https://it.wikipedia.org/wiki/Giorno_giuliano",""],
	FR : ["Date Julienne Modifiée (MJD)","https://en.wikipedia.org/wiki/Julian_day",""],
	DE : ["Modifizierte Julianische Datum (MJD)","https://de.wikipedia.org/wiki/Julianisches_Datum",""],
	LA : ["Julianus Mutatio Diem (MJD)","https://en.wikipedia.org/wiki/Julian_day",""],
	HE : ["תאריך ג'וליאן שונה (MJD)","https://en.wikipedia.org/wiki/Julian_day",""],
	EL : ["Modified Julian Date (MJD)","https://en.wikipedia.org/wiki/Julian_day",""],
},

UT: {
	EN : ["Universal Time (UT)","https://en.wikipedia.org/wiki/Universal_Time",""],
	PT : ["Hora Universal (UT)","https://en.wikipedia.org/wiki/Universal_Time",""],
	ES : ["Horario Universal (UT)","https://es.wikipedia.org/wiki/Horario_universal",""],
	IT : ["Tempo Universale (UT)","https://it.wikipedia.org/wiki/Tempo_universale",""],
	FR : ["Temps Universel (UT)","https://fr.wikipedia.org/wiki/Temps_universel",""],
	DE : ["Universalzeit (UT)","https://de.wikipedia.org/wiki/Universal_Time",""],
	LA : ["Universal Time (UT)","https://en.wikipedia.org/wiki/Universal_Time",""],
	HE : ["Universal Time (UT)","https://en.wikipedia.org/wiki/Universal_Time",""],
	EL : ["Universal Time (UT)","https://en.wikipedia.org/wiki/Universal_Time",""],
},

Epoch: {
	EN : ["Epoch","https://en.wikipedia.org/wiki/Epoch_(astronomy)",""],
	PT : ["Época","https://pt.wikipedia.org/wiki/%C3%89poca_(astronomia)",""],
	ES : ["Época","https://es.wikipedia.org/wiki/%C3%89poca_(astronom%C3%ADa)",""],
	IT : ["Epoca","https://it.wikipedia.org/wiki/Epoca_(astronomia)",""],
	FR : ["Époque","https://fr.wikipedia.org/wiki/%C3%89poque_(astronomie)",""],
	DE : ["Epoche","https://de.wikipedia.org/wiki/Epoche_(Astronomie)",""],
	LA : ["Aetas","https://en.wikipedia.org/wiki/Epoch_(astronomy)",""],
	HE : ["אפוק","https://en.wikipedia.org/wiki/Epoch_(astronomy)",""],
	EL : ["Εποχή","https://en.wikipedia.org/wiki/Epoch_(astronomy)","Epochí"],
},

J2000: {
	EN : ["J2000.0","https://en.wikipedia.org/wiki/Epoch_(astronomy)#Julian_years_and_J2000",""],
	PT : ["J2000.0","https://en.wikipedia.org/wiki/Epoch_(astronomy)#Julian_years_and_J2000",""],
	ES : ["J2000.0","https://en.wikipedia.org/wiki/Epoch_(astronomy)#Julian_years_and_J2000",""],
	IT : ["J2000.0","https://it.wikipedia.org/wiki/J2000.0",""],
	FR : ["J2000.0","https://fr.wikipedia.org/wiki/J2000.0",""],
	DE : ["J2000.0","https://de.wikipedia.org/wiki/Epoche_(Astronomie)#Standardepochen",""],
	LA : ["J2000.0","https://en.wikipedia.org/wiki/Epoch_(astronomy)#Julian_years_and_J2000",""],
	HE : ["J2000.0","https://en.wikipedia.org/wiki/Epoch_(astronomy)#Julian_years_and_J2000",""],
	EL : ["J2000.0","https://en.wikipedia.org/wiki/Epoch_(astronomy)#Julian_years_and_J2000",""],
},

Century: {//OK
	EN : ["Century","https://en.wikipedia.org/wiki/Century",""],
	PT : ["Século","https://pt.wikipedia.org/wiki/S%C3%A9culo",""],
	ES : ["Siglo","https://es.wikipedia.org/wiki/Siglo",""],
	IT : ["Secolo","https://it.wikipedia.org/wiki/Secolo",""],
	FR : ["Siècle","https://fr.wikipedia.org/wiki/Si%C3%A8cle",""],
	DE : ["Jahrhundert","https://de.wikipedia.org/wiki/Jahrhundert",""],
	LA : ["Saeculum","https://la.wikipedia.org/wiki/Saeculum",""],
	HE : ["המאה","https://en.wikipedia.org/wiki/Century",""],
	EL : ["Αιώνας","https://en.wikipedia.org/wiki/Century",""],
},

EquationOfTime: {
	EN : ["Equation of Time","https://en.wikipedia.org/wiki/Equation_of_time",""],
	PT : ["Equação do tempo","https://pt.wikipedia.org/wiki/Equa%C3%A7%C3%A3o_do_tempo",""],
	ES : ["Ecuación del tiempo","https://es.wikipedia.org/wiki/Ecuaci%C3%B3n_del_tiempo",""],
	IT : ["Equazione del tempo","https://it.wikipedia.org/wiki/Equazione_del_tempo",""],
	FR : ["Équation du temps","https://fr.wikipedia.org/wiki/%C3%89quation_du_temps",""],
	DE : ["Zeitgleichung","https://de.wikipedia.org/wiki/Zeitgleichung",""],
	LA : ["Aequatio temporis","https://en.wikipedia.org/wiki/Equation_of_time",""],
	HE : ["משוואת זמן","https://en.wikipedia.org/wiki/Equation_of_time",""],
	EL : ["Εξίσωση χρόνου","https://en.wikipedia.org/wiki/Equation_of_time","Exísosi chrónou"],
},


entry3: {
	EN : ["English","wiki URL",""],
	PT : ["Português","wiki URL",""],
	ES : ["Español","wiki URL",""],
	IT : ["Italiano","wiki URL",""],
	FR : ["Français","wiki URL",""],
	DE : ["Deutsch","wiki URL",""],
	LA : ["Latine","wiki URL",""],
	HE : ["עברית","wiki URL",""],
	EL : ["ελληνικά","wiki URL",""],
},
//https://fr.wikipedia.org/wiki/Syst%C3%A8me_de_coordonn%C3%A9es_%C3%A9quatoriales
//https://fr.wikipedia.org/wiki/Syst%C3%A8me_de_coordonn%C3%A9es_c%C3%A9lestes
//https://aa.usno.navy.mil/faq/docs/TT.php
//http://asa.usno.navy.mil/SecM/Glossary.html
//http://www.if.ufrgs.br/~fatima/fis2005/arquivos/eqtempo.htm
};

//export {languageTable, translationTable, glossaryTable};