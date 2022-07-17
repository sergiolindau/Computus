"use strict";
function writePerpetualCycle(c) {
    function writePerpetual(c) {
        document.writeln("<table width=\"0%\" border=\"1\">");
        c = c * 100;
        document.writeln("<tr>");
        document.writeln("<td colspan='11' align='center'>" + (c) + "-" + (c + 400) + "-" + (c + 800) + "</td>");
        document.writeln("</tr>");
        document.writeln("<tr>");
        document.write("<td>&nbsp;</td>");
        for (var i = 0; i < 10; i++) {
            document.write("<td align='center'>" + i + "</td>");
        }
        document.writeln("</tr>");
        for (var j = 0; j < 10; j++) {
            document.writeln("<tr>");
            document.write("<td align ='center'>" + j + "</td>");
            let y;
            for (var i = 0; i < 10; i++) {
                y = c + j * 10 + i;
                document.write("<td align ='center'>" + (Computus.dominical(y)) + "</td>");
            }
            document.writeln("</tr>");
        }
        document.writeln("</table>");
    }
    document.writeln("<table>");
    document.writeln("<tr><td>");
    writePerpetual(c);
    document.writeln("</td><td>");
    writePerpetual(c + 1);
    document.writeln("</td></tr>");
    document.writeln("<tr><td>");
    writePerpetual(c + 2);
    document.writeln("</td><td>");
    writePerpetual(c + 3);
    document.writeln("</td></tr>");
    document.writeln("</table>");
}
