@echo off

call tsc -p tsconfig.json

echo Build ^*.ts =^> ^*.js complete.

pause

rem call browserify ./dist/main.js -o ./dist/bundle.js

rem pause