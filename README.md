# Computus
> Computus: Calendar and astronomical calculations.

Computus is a set of [JavaScript](https://www.ecma-international.org/publications-and-standards/standards/ecma-262/) modules (most of which have been written in [TypeScript](https://www.typescriptlang.org/)) that make calculations for the perpetual calendar with Easter and other moveable feast as well as astronomical calculations such as rise/noon/set times and positions for Sun, Moon and planets (ephemeris).

The code published in [sergiolindau/Computus GitHub repository](https://github.com/sergiolindau/Computus) is hosted in [computus.netlify.app](https://computus.netlify.app) for tests using [Netlify](https://www.netlify.com/) hosting service.

[![Netlify Status](https://api.netlify.com/api/v1/badges/523f391c-c901-4f4c-823b-92ca6592d91c/deploy-status)](https://app.netlify.com/sites/computus/deploys)

Get a minified version from a [CDN](https://en.wikipedia.org/wiki/Content_delivery_network). To embed in a webpage using [jsDelivr CDN](https://www.jsdelivr.com/) copy the following HTML code:
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/sergiolindau/Computus/computus.min.css" type="text/css" media="screen" charset="utf-8">
<script src='https://cdn.jsdelivr.net/gh/sergiolindau/Computus/computus.min.js'></script>
```

This project is a [free software](https://en.wikipedia.org/wiki/Free_software) under the terms of [MIT License](#license).

# Tests

* [Perpetual Calendar (PerpetualCycle.html)](https://computus.netlify.app/perpetualcycle)
* [Easter Sunday (EasterSunday.html)](https://computus.netlify.app/eastersunday)
* [Computus static class source code (ComputusSource.html)](https://computus.netlify.app/computussource)
* [Calendar (Calendar.html)](https://computus.netlify.app/calendar)
* [Calendar Class Test](https://computus.netlify.app/calendar)
* [Sun Calculator (Sun.html)](https://computus.netlify.app/sun)
* [LanguagePanel Test (LanguagePanel.html)](https://computus.netlify.app/languagepanel)
* [GeoLocation Test (GeoLocation.html)](https://computus.netlify.app/geolocation)
* [GeoLocationPanel Test (GeoLocationPanel.html)](https://computus.netlify.app/geolocationpanel)
* [Tick Test (Tick.html)](https://computus.netlify.app/tick)
* [DateTime Test (DateTime.html)](https://computus.netlify.app/datetime)
* [DateTimePanel Test (DateTimePanel.html)](https://computus.netlify.app/datetimepanel)
* [Moon phases of the year (MoonYear.html))](https://computus.netlify.app/moonyear)
* [MarkedMathJaxWiki Test (MarkedMathJaxWiki.html)](https://computus.netlify.app/markedmathjaxwiki?url=doc%2FREADME.md)

# Documentation

All documentation and additional information written for this project was made in [Mardown](https://en.wikipedia.org/wiki/Markdown) files with embedded wiki like references, inline JavaScripts, inline and displayed Latex, source code highlights and graphics. To render them in HTML, an engine was developed combining the [Marked](https://marked.js.org/), [MathJax](https://www.mathjax.org/), [highlight.js](https://highlightjs.org/) and [Chart.js](https://www.chartjs.org/docs/latest/) [APIs](https://en.wikipedia.org/wiki/API). See the [Repositories of APIs used](#repositories).

The project documentation and some important information to carry out this project can be found [here](https://computus.netlify.app/markedmathjaxwiki?url=doc%2FREADME.md).

# References

## Calendar and Astronomy information
* [SOFA - Standards of Fundamental Astronomy](http://www.iausofa.org/)
* [Paul Schlyter](http://www.stjarnhimlen.se/) - [How to compute planetary positions](http://www.stjarnhimlen.se/comp/ppcomp.html)
* [Paul Schlyter](http://www.stjarnhimlen.se/) - [Computing planetary positions - a tutorial with worked examples](http://www.stjarnhimlen.se/comp/tutorial.html)
* [Paul Schlyter](http://www.stjarnhimlen.se/) - [How to compute rise/set times and altitude above horizon](http://www.stjarnhimlen.se/comp/riset.html
)
* [Paul Schlyter](http://www.stjarnhimlen.se/) - [Time Scales](http://stjarnhimlen.se/comp/time.html)
* [Approximate astronomical positions](http://www.stargazing.net/kepler/)
* [Eric Weisstein's World of Astronomy](https://scienceworld.wolfram.com/astronomy/)
* [Homepage Dr A.R.Peters](http://www.arpeters.net/)
* [Don Cross](http://cosinekitty.com/) - [Solar System Calculator](http://cosinekitty.com/solar_system.html)
* [Don Cross](http://cosinekitty.com/) - [Dynamic Astronomy Calendar](http://cosinekitty.com/astro_calendar.html)
* [Don Cross](http://cosinekitty.com/) - [Astronomy Sky View](http://cosinekitty.com/sky_view.html)
* [The JPL Planetary and Lunar Ephemerides DE440 and DE441](https://iopscience.iop.org/article/10.3847/1538-3881/abd414)
* [Jet Propulsion Laboratory - Solar System Dynamics](https://ssd.jpl.nasa.gov/)
* [NASA Eclipse website - Five Millennium Canon of Lunar Eclipses - Espenak and Meeus](https://eclipse.gsfc.nasa.gov/LEcat5/ephemeris.html)
* [Astronomical Information Center on USA Navy](https://aa.usno.navy.mil/faq/)
* Standish, E. M., Jr., [Two Differing Definitions of the Dynamical Equinox and the Mean Obliquity](https://ui.adsabs.harvard.edu/abs/1981A%26A...101L..17S/abstract), *Astronomy and Astrophysics*, Vol.101, P. L17, 1981.
* [Wenceslao Segura González](https://es.wikipedia.org/wiki/Wenceslao_Segura_Gonz%C3%A1lez) - [Nuestro calendario. Una explicación científica, simple y completa](https://www.academia.edu/10028708/Nuestro_calendario_Una_explicaci%C3%B3n_cient%C3%ADfica_simple_y_completa)
* [Calendars through the Ages](http://www.webexhibits.org/calendars/index.html)
* [astro.vaporia.com - Astrophysics](http://astro.vaporia.com/)
* [Påsktavla ur Liljegrens Runlära (ur Sverige Runinskrifter)](http://runeberg.org/runor/0099.html)
* [Påsktavla ur Liljegrens Runlära (ur Sverige Runinskrifter)](https://commons.wikimedia.org/wiki/File:P%C3%A5sktavla_ur_Liljegrens_Runl%C3%A4ra_(ur_Sverige_Runinskrifter).png) on Wikimedia
* [ryanseys/lune](https://github.com/ryanseys/lune) and [ironwallaby/lune](https://github.com/ironwallaby/lune) on GitHub
* [py-moon-phase on Launchpad](https://launchpad.net/py-moon-phase)
* [Abbreviations of Months of the Year, Days of the Week, and Other Abbreviations of Time](https://www.aresearchguide.com/monthdayabb.html)
* [Standard Month and Days of the Week Abbreviations](https://abbreviations.yourdictionary.com/articles/standard-month-and-days-of-the-week-abbreviations.html)
* [Astronomy & Astrophysics](https://www.aanda.org/)
* [Samuel Vince, A Complete System of Astronomy, Volume 1, 1814](https://books.google.com.br/books?id=Y5QAAAAAMAAJ)
* [Encyclopaedia Britannica - Astronomy](https://www.britannica.com/browse/Astronomy)
* [Wikipedia - Astronomical system of units](https://en.wikipedia.org/wiki/Astronomical_system_of_units)
* [The IAU and astronomical units](https://www.iau.org/public/themes/measuring/)
* [Hall, A., **Elliptic Motion**, *Popular Astronomy*, vol. 13, pp.287-296, 1905](https://articles.adsabs.harvard.edu/full/1905PA.....13..287H/0000287.000.html)
* [Astronomy Answers - Position of the Sun](https://www.aa.quae.nl/en/reken/zonpositie.html)
* [Science Direct - True Anomaly](https://www.sciencedirect.com/topics/physics-and-astronomy/true-anomaly)
* [NASA Technical Translation, Edição 391](https://books.google.com.br/books?id=i9kVAQAAIAAJ)

### At NOAA ESRL
* [NOAA ESRL: National Oceanic and Atmospheric Administration - Earth System Research Laboratories](https://gml.noaa.gov/)
* [Sunrise/Sunset Calculator](https://gml.noaa.gov/grad/solcalc/sunrise.html)
* [Solar Position Calculator](https://gml.noaa.gov/grad/solcalc/azel.html)

### At Wikipedia
* [Ciclo solar nos calendários](https://pt.wikipedia.org/wiki/Ciclo_solar_nos_calend%C3%A1rios)
* [Ciclo de Hiparco](https://en.wikipedia.org/wiki/Hipparchic_cycle)

## Ephemeris
* [Swiss Ephemeris - Astro.com](https://www.astro.com/swisseph/swephinfo_e.htm)
* [mivion/swisseph](https://github.com/mivion/swisseph)
* [mivion/ephemeris](https://github.com/mivion/ephemeris)
* [Astronomy and numerical software source codes - moshier.net](http://www.moshier.net/)
* [xErik/ephemeris-moshier](https://github.com/xErik/ephemeris-moshier)
* [0xStarcat/Moshier-Ephemeris-JS](https://github.com/0xStarcat/Moshier-Ephemeris-JS)
* [hemantgoswami/ephemeris](https://github.com/hemantgoswami/ephemeris)
* [clicktrend/ephemeris](https://github.com/clicktrend/ephemeris)
* [jgladch/npm-blastro](https://github.com/jgladch/npm-blastro)
* [Bill-Gray/jpl_eph](https://github.com/Bill-Gray/jpl_eph)
* [chandantiwari/node-swisseph-api](https://github.com/chandantiwari/node-swisseph-api)
* [DoctorHowser/Ephemeris](https://github.com/DoctorHowser/Ephemeris)
* [gmiller123456/jpl-development-ephemeris](https://github.com/gmiller123456/jpl-development-ephemeris)
* [gmarty/vsop87](https://github.com/gmarty/vsop87)
* [rubyfmzk/Sirius](https://github.com/rubyfmzk/Sirius)
* [david-rc-dayton/geohack](https://github.com/david-rc-dayton/geohack)
* [stephaneworkspace/ephemeris_npm](https://github.com/stephaneworkspace/ephemeris_npm)

## Books
* Duffett-Smith, Peter, Practical Astronomy with your calculator, Cambridge University Press, 3rd edition 1988, ISBN 0-521-35699-7.
* Meeus, Jean, Astronomical Algorithms, Willmann-Bell, 1st English edition, 1991, ISBN 0-943396-35-2

## Repositories of APIs used

In this section are the repositories of APIs used in this project

* [MathJax](https://github.com/mathjax/MathJax)
* [Marked](https://github.com/markedjs/marked)
* [highlight.js](https://github.com/highlightjs/highlight.js)
* [Chart.js](https://github.com/chartjs/Chart.js)
* [GoJS](https://github.com/NorthwoodsSoftware/GoJS)

## Repositories of interest

* [Modernizr](https://modernizr.com/)
* [DEVMEDIA: Apresentando a biblioteca JavaScript Modernizr](https://www.devmedia.com.br/apresentando-a-biblioteca-javascript-modernizr/27376)
* [x-marked](https://www.npmjs.com/package/x-marked)
* [ATNU/ng-computus](https://github.com/ATNU/ng-computus)
* [rhnorskov/computus](https://github.com/rhnorskov/computus)
* [tohka/computus](https://github.com/tohka/computus)
* [materiagris/computus](https://github.com/materiagris/computus)
* [algorithm-archive/contents/computus/computus.md](https://github.com/algorithm-archivists/algorithm-archive/blob/main/contents/computus/computus.md)
* [Circiter/computus-in-sed](https://github.com/Circiter/computus-in-sed)

## Javascript and API references

* [ECMA-262: ECMAScript&copy; language specification](https://www.ecma-international.org/publications-and-standards/standards/ecma-262/)
* At [developer.mozilla.org](https://developer.mozilla.org)
    * [Destructuring assignment](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
    * [Strict mode](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Strict_mode)
* [Geolocation API @ W3C](https://w3c.github.io/geolocation-api/) on GitHub
* [Writing Mathematic Fomulars in Markdown](https://csrgxtu.github.io/2015/03/20/Writing-Mathematic-Fomulars-in-Markdown/)
* [Writing Mathematics for MathJax](https://docs.mathjax.org/en/latest/basic/mathematics.html)
* [Top 5 : Best code syntax highlighter javascript plugins](https://ourcodeworld.com/articles/read/140/top-5-best-code-syntax-highlighter-javascript-plugins)


## Latex and Markdown references
* [Markdown Guide](https://www.markdownguide.org/)
* [Markdown Guide - Basic Syntax](https://www.markdownguide.org/basic-syntax/)
* [LaTeX2e unofficial reference manual](https://latexref.xyz/)
* [ShareLatex Documentation](https://sharelatex.psi.ch/learn/Main_Page)
* [Overleaf Documentation](https://pt.overleaf.com/learn)
* [Latex quick reference](https://www.icl.utk.edu/~mgates3/docs/latex.pdf)
* [Tables Generator](https://www.tablesgenerator.com/)

## Locale and timezone data
* [Wikipedia - Common Locale Data Repository](https://en.wikipedia.org/wiki/Common_Locale_Data_Repository)
* [Unicode CLDR Project](https://cldr.unicode.org/)
* [unicode-org/cldr-json](https://github.com/unicode-org/cldr-json)

# License
>MIT License
>
>Copyright &copy; 2017-2022 Sergio Lindau
>
>Permission is hereby granted, free of charge, to any person obtaining a copy
>of this software and associated documentation files (the "Software"), to deal
>in the Software without restriction, including without limitation the rights
>to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
>copies of the Software, and to permit persons to whom the Software is
>furnished to do so, subject to the following conditions:
>
>The above copyright notice and this permission notice shall be included in all
>copies or substantial portions of the Software.
>
>THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
>IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
>FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
>AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
>LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
>OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
>SOFTWARE.
