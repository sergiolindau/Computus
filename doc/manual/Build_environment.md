## Visual Studio Code

As an [IDE](https://en.wikipedia.org/wiki/Integrated_development_environment), [Visual Studio Code](https://code.visualstudio.com/) was used in this project.

## Node.js

This project is mostly written in [TypeScript](https://www.typescriptlang.org/) and uses [Node.js](https://nodejs.org/) to provide [npm](https://www.npmjs.com/) packages needed at build time.

The minimal packages needed to build this project is instaled with the following commands:

    npm install uglify-js -g
    npm install uglifycss -g
    npm install typescript -g

## Local debugging

For local debugging is used `http-server` from `npx`, which allows us to use global NPM modules without installation.

To use `http-server` from `npx`, in the directory where you want to be the root directory of http server, run the command:

    npx http-server -c-1

This command will serve the index.html at the address [http://localhost:8080](http://localhost:8080) ([http://127.0.0.1:8080/](http://127.0.0.1:8080/)). Access this address through the browser.

The `-c-1` parameter at the end of the command is for the http server not to use cache, which can cause problems during debugging.

## APIs used in this project

The APIs used in this project are either built-in (like [Modernizr](https://modernizr.com/)) or referenced via [CDN](https://en.wikipedia.org/wiki/Content_delivery_network) (like [Marked](https://github.com/markedjs/marked), [MathJax](https://github.com/mathjax/MathJax) and [highlight.js](https://highlightjs.org/)).

The preferred [CDN](https://en.wikipedia.org/wiki/Content_delivery_network) used is [jsDelivr](https://www.jsdelivr.com/)

The APIs project repositories are listed below:

* [Modernizr](https://modernizr.com/)
* [Marked](https://github.com/markedjs/marked)
* [MathJax](https://github.com/mathjax/MathJax)
* [highlight.js](https://highlightjs.org/)