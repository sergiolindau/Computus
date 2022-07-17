"use strict";
function makeFileMenu(menu, label) {
    document.writeln("<details><summary><strong>" + label + "</strong></summary>");
    document.writeln("<ol>");
    for (var i = 0; i < menu.length; i++) {
        document.writeln("<li><a href=\"./" + menu[i] + "\" target=\"_blank\">" + menu[i] + "</a><br /><details><summary>View File</summary>");
        document.writeln("<div id=\"" + menu[i] + "_container\"><center><iframe width=\"800\" height=\"600\" src=\"./" +
            menu[i] + "\"></iframe></center></div>");
        document.writeln("</details></li>");
    }
    document.writeln("</ol>");
    document.writeln("</details>");
}
// not implemented until now
const extLanguage = {
    'htm': 'html',
    'html': 'html',
    'css': 'css',
    'js': 'javascript',
    'ts': 'typescript',
    'md': 'markdown',
};
function MenuShowFile(element, menu, label) {
    let result = `<details><summary><strong>${label}</strong></summary>`;
    result += "<ol>";
    for (var i = 0; i < menu.length; i++) {
        let lang = menu[i].substring(menu[i].lastIndexOf(".") + 1);
        result += `<li>${menu[i]}<br /><details><summary>View File</summary>`;
        result += `<pre><code id="${menu[i]}" class="language-${lang}"></code></pre>`;
        result += "</details></li>";
    }
    result += "</ol>";
    result += "</details>";
    return result;
}
