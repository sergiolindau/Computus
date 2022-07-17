@echo off

call tsc -p tsconfig.json

echo Build ^*.ts =^> ^*.js complete.

echo Starting server server-app.js...

call node server-app.js

echo Server server-app.js stopped.

pause