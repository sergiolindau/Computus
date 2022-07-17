@echo off
call uglifyjs DOMHelper.js MITLicense.js  -o computus.min.js
powershell -command "(gc computus.min.js) -replace '\"use strict\"', '' | Out-File -encoding default computus.tmp.js"
echo "use strict;" > computus.min.js
type computus.tmp.js >> computus.min.js
del computus.tmp.js
echo Build computus.min.js complete.

rem call uglifycss style.css > computus.min.css
rem echo Build computus.min.css complete.
