"use strict";
//https://nodejs.dev/learn/reading-files-with-nodejs
//requiring path and fs modules
const path = require('path');
const fs = require('fs');
try {
    const data = fs.readFileSync('Angle.js', 'utf8');
    console.log(data);
}
catch (err) {
    console.error(err);
}
//joining path of directory 
const directoryPath = path.join(__dirname, './');
//passsing directoryPath and callback function
fs.readdir(directoryPath, function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }
    //listing all files using forEach
    files.forEach(function (file) {
        // Do whatever you want to do with the file
        console.log(file);
    });
});
console.log("Funciona!");
