***Analema*** é o termo usado em astronomia para designar um grafico da posição do Sol no céu num determinado lugar, marcada à mesma hora em dias sucessivos (isto é com intervalos aproximados de 24 horas ou seus múltiplos) ao longo de um ciclo anual. A figura gerada assemelha-se a um 8 assimétrico. O 8 estará quase vertical se a posição do sol à hora escolhida for próxima do meridiano do lugar (por volta do meio-dia solar verdadeiro), inclinando-se progressivamente para a esquerda ou direita com o seu afastamento (esquerda de manhã; direita à tarde).

![Gnômon](https://upload.wikimedia.org/wikipedia/commons/b/ba/Gnomon--21juin.gif)

onde H é o tempo solar expresso em graus

$$$H=15º \times (Z - T ) - longitude$$$

com $$Z$$ a diferença horária em horas e $$T$$ o Tempo Universal Coordenado em horas decimais. $$H$$ é zero ao meio-dia solar, negativo de manhã e positivo à tarde.

<div id="sunChart"></div>

[[javascript:
navigator.geolocation.getCurrentPosition(function(position) {
  var year = (new Date()).getFullYear()

  var tz = -(new Date()).getTimezoneOffset()/60;

  var lat = position.coords.latitude;
  var lng = position.coords.longitude;

  var localtime = 12;
  
  window.analemma = Computus.sunAnalemma(year,localtime,lat,lng,tz);

  var options = {
/*    xlabelcallback: (x) => {
        return x.toFixed(2);
    },
    ylabelcallback: (y) => {
        return y.toFixed(2);
    },*/
    title: "Analema solar",
    subtitle: `latitude: ${lat}, longitude: ${lng}, ano: ${year}, hora: ${localtime}`,
    xlabel: "Azimute",
    ylabel: "Elevação",
    proportion: "1:1",
    tooltip: {
        callbacks: {
            label: function(context) {
                let d = context.dataIndex+1;
                let date = Computus.doy2cal(year,d);
                return Computus.monthTable['PT'][1][date[1] ] + " " + date[2] + ", el: " + context.dataset.data[context.dataIndex].y;
            }
        }
    }
  }

  var env = `const year = ${year}; const analemma = ${JSON.stringify(analemma)};`;

/*  var chart = Charts.parametricXY(
    'graph01',
    'dcos(90-analemma[d].az)*dcos(analemma[d].el)/dsin(analemma[d].el)',
//    'dsin(90-analemma[d].az)*dcos(analemma[d].el)/dsin(analemma[d].el)',
    'analemma[d].el',
    'd',
    '0',
    '1',
    'Computus.yeardays(year)-1',
    options,
    env
  );
*/
  var sunchartopt = {
    title: "Relógio solar: sombra do gnômon unitário",
    subtitle: `latitude: ${lat}, longitude: ${lng}`,
    xlabel: "Azimute",
    ylabel: "Elevação",
  }

  var sunchart = Charts.sunChart(
    'sunChart',
    year,
    lat,
    lng,
    tz,
    sunchartopt,
  );

});

]]

![Mapa solar](https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Sonnenstand.png/800px-Sonnenstand.png)

sol na esfera celeste (acima, reduzida) representação do sol como um ponto de sombra (projeção gnomônica) ou como uma linha de sombra no relógio de sol (abaixo, ampliado) linhas horárias cinza e azul; Linhas diárias: verde, vermelho e ciano

![Projeção gnomônica](https://upload.wikimedia.org/wikipedia/commons/0/06/Gnomonische_Projektion.png)

## Referências

* [Gnomon](https://fr.wikipedia.org/wiki/Gnomon)
* [Plotting the Analemma (Shallow Thoughts)](https://shallowsky.com/blog/science/astro/plotting-the-analemma.html)
* [Macmillan Hunter Sundials - How the Analemma represens the Equation of Time](https://www.macmillanhunter.co.uk/time/measurement-of-time/what-is-the-equation-of-time/)
* [Peter Lynch - The Equation of Time and the Analema](https://maths.ucd.ie/~plynch/Publications/Analemma-BIMS.pdf)
* [RASC Calgary Centre - The Solar Analemma](https://calgary.rasc.ca/analemma.htm)
* [William Stafford - Analemma, Zenith, and Noon Sun Angle](https://www.youtube.com/watch?v=LLCgD3t5nWM)
* [Analemmatic sundials: How to build one and why they work](https://plus.maths.org/content/os/issue11/features/sundials/index)
* [Analemmatic Sundial PDF Generator](http://analemmatic.sourceforge.net/cgi-bin/sundial.pl)
* [The Sundial Primer - Analemmatic Sundial](https://www.mysundial.ca/tsp/analemmatic_sundial.html)
* [Making an Analemmatic Sundial](https://sundials.org/index.php/teachers-corner/sundial-construction/299-making-an-analemmatic-sundial.html)
* [Analemmatic and Horizontal Sundials of the Bronze Age (Northern Black Sea Coast)](https://arxiv.org/abs/1309.7238)
## Wikipédia

[Português](https://pt.wikipedia.org/wiki/Analema) - [Español](https://es.wikipedia.org/wiki/Analema) - [Italiano](https://it.wikipedia.org/wiki/Analemma) - [English](https://en.wikipedia.org/wiki/Analemma) - [Français](https://fr.wikipedia.org/wiki/Analemme) - [Deutsch](https://de.wikipedia.org/wiki/Analemma)