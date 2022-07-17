@echo off
call tsc -p tsconfig.json

powershell -command "(gc Angle.js) -replace 'import', '//import' | Out-File -encoding default Angle.js"
powershell -command "(gc Angle.js) -replace 'export', '//export' | Out-File -encoding default Angle.js"

powershell -command "(gc Geolocation.js) -replace 'import', '//import' | Out-File -encoding default Geolocation.js"
powershell -command "(gc Geolocation.js) -replace 'export', '//export' | Out-File -encoding default Geolocation.js"

powershell -command "(gc StringData.js) -replace 'import', '//import' | Out-File -encoding default StringData.js"
powershell -command "(gc StringData.js) -replace 'export', '//export' | Out-File -encoding default StringData.js"

powershell -command "(gc Language.js) -replace 'import', '//import' | Out-File -encoding default Language.js"
powershell -command "(gc Language.js) -replace 'export', '//export' | Out-File -encoding default Language.js"

echo Build ^*.ts =^> ^*.js complete.
pause