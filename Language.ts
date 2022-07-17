/***********************************************************************
 Language menu and translation engine
***********************************************************************/
var languageCodeArray: Array<string> = [];
var languageDescriptionArray: Array<string> = [];
for (let i in languageTable) {
	languageCodeArray[languageCodeArray.length] = i;
	languageDescriptionArray[languageDescriptionArray.length] =  languageTable[i];
}
var language_code_index = 0;
var language_code = languageCodeArray[language_code_index];
var language_code_change_handle: Array<Function> = [translationHandle];
var select_prefix: any = [];
var table_postfix = "Table";

function setLanguageIndex(index: number) {
	language_code_index = index;
	language_code = languageCodeArray[language_code_index];
	for(let i=0;i<language_code_change_handle.length;i++) language_code_change_handle[i](language_code);
	return language_code;
}

function getLanguage() {
	return language_code;
}

function setLanguage(code: string) {
	language_code = code
	return language_code;
}

function addLanguageChangeHandle(handle: Function){
	if ((typeof handle) == "function")
		language_code_change_handle[language_code_change_handle.length] = handle;
}

function languageMenuChange(){
	language_code_index = (DOM$.i('select_language_menu') as HTMLSelectElement).selectedIndex;
	language_code = languageCodeArray[language_code_index];
	for(let i=0;i<language_code_change_handle.length;i++) language_code_change_handle[i](language_code);
}

/***********************************************************************
 Function to write elements with translation
***********************************************************************/
function makeTranslation(container_id: string, attr: string, code: string) {
	var args = container_id.split("_");//
	let container: HTMLElement = DOM$.i(container_id) as HTMLElement;
	var ttype = args[0].toLowerCase();
	var element,temp, cclass;
	if (ttype=="translation") {
		cclass = document.createAttribute('class');
		cclass.value = args[1];
		container.setAttributeNode(cclass);
		container.innerHTML = translationTable[args[1]][language_code];
	}
	else if (ttype=="glossary") {
			element = DOM$.create('a');
			element.setAttribute('class',args[1]);
			element.setAttribute('href',glossaryTable[args[1]][language_code][1]);
			element.setAttribute('target',"_blank");
			element.setAttribute('title',glossaryTable[args[1]][language_code][2]);
			element.innerHTML = glossaryTable[args[1]][language_code][0];
			container.innerHTML = "";
			container.appendChild(element);
	}
	else if (ttype=="select") {
		var prefix = args[1].toLowerCase();
		if (prefix=="language") {
			var language_select = DOM$.create('select');
			language_select.setAttribute('id',"select_language_menu");
			container.innerHTML = "";
			container.appendChild(language_select);
			var option;
			for(var i=0;i<languageDescriptionArray.length;i++){
				option = DOM$.create('option');
				option.innerHTML = languageDescriptionArray[i];
				language_select.add(option);
			}
			language_select.addEventListener('change',languageMenuChange);
		}
		else if (prefix=="timezone") {
		}
		else {
			if (!select_prefix.includes(prefix)) select_prefix.push(prefix);
			var test_id = args.length>2;
			var id = test_id?args[2]:"";
			var test_attr = arguments.length>1;
			var attr = test_attr?(" "+arguments[1]+" "):"";
			var test_code = arguments.length>2;
			code = test_code?arguments[2]:language_code;
			var test_description_set = arguments.length>3;
			var description_set = test_code?arguments[3]:0;
			container.innerHTML = "<select class=\""+prefix+"Menu"+(test_code?("_"+code):"")+"\" "+
				(test_id?("id=\""+id+"\" "):"")+
				attr+
				"></select>";
			var select: HTMLSelectElement = document.getElementById(id) as HTMLSelectElement;
			var option;
			var langTable = eval(prefix+table_postfix+"[code][description_set]");
			for(var i=0;i<langTable.length;i++){
				option = document.createElement('option');
				option.innerHTML = langTable[i];
				select.add(option);
			}
		}
	}
}

/***********************************************************************
 Translation Handle
***********************************************************************/
function translationHandle() {
	var elements,tab,i,j,k;
	for(i in translationTable) {
		try {
			let elements = DOM$.c(i) as HTMLCollectionOf<HTMLElement>;
			for(j=0; j<elements.length; j++) {
				elements[j].innerHTML = translationTable[i][language_code];
			}
		}
		catch(err) {}
	}
	for(i in glossaryTable) {
		try {
			elements = DOM$.c(i) as HTMLCollectionOf<HTMLAnchorElement>;
			for(j=0; j<elements.length; j++) {
				elements[j].innerHTML = glossaryTable[i][language_code][0];
				elements[j].href = glossaryTable[i][language_code][1];
				elements[j].title = glossaryTable[i][language_code][2];
			}
		}
		catch(err) {}
	}
	for(k=0;k<select_prefix.length;k++){
		try {
			elements = DOM$.c(select_prefix[k]+"Menu") as HTMLCollectionOf<HTMLSelectElement>;
			tab = eval(select_prefix[k]+"Table[language_code][0]");
			for(let i=0; i<elements.length; i++) {
				for(let j=0; j<tab.length; j++) {
					elements[i].options[j].text = tab[j];
				}
			}
		}
		catch(err) {}
	}
}