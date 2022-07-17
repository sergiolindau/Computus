A ***declinação*** de um astro (denotada pela letra grega $$\delta$$) é o arco do [[Meridiano|meridiano]] do astro compreendido entre o plano do [[Equador celeste|equador celeste]] e o astro. Varia de $$0º$$ a $$90º$$ para Norte ou para Sul ($$-90º \lt\delta \lt +90º$$, positivo representando o Norte e negativo o Sul). É um dos valores angulares utilizados para definir a posição de um astro em um [[Sistema equatorial de coordenadas|sistema equatorial de coordenadas]], o outro sendo o [[Ângulo horário|ângulo horário]] ou a [[Ascensão reta|ascensão reta]].

A declinação de um astro pode ser comparada à [[Latitude|latitude]] no sistema de coordenadas geográficas. Um astro posicionado no [[Zênite|zênite]] local tem uma declinação igual à [[Latitude|latitude]] do observador.

A figura abaixo mostra a declinação do Sol em função do dia do ano.

<div id="graph01"></div>[[javascript:
  var year = (new Date()).getFullYear()

  var options = {
    xlabelcallback: (d) => {
        let date = Computus.doy2cal(year,d);
        return Computus.monthTable['PT'][1][date[1] ] + " " + date[2];
    },
    title: "Declinação solar em " + year,
//    subtitle: "",
    xlabel: "dia do ano",
    ylabel: "Declinação (º)"
}

Charts.functionXY(
    'graph01',
    'Computus.sunDeclination(Computus.jd2jc(Computus.cal2jd('+year+',0,1)+d))',
    'd',
    '1',
    '1',
    'Computus.isleap('+year+')?366:365',
    options
)

]]

Devido à variação da duração do dia em cada latitude (exceto no equador), e como o Sol mantém a mesma variação angular horária ($${360º /  24\textrm{h}} = {15º/\textrm{h}}$$), o azimute onde o Sol aparenta nascer e pôr-se tem de variar. Essa variação faz com que o Sol aparente mover-se sobre o horizonte, a amplitude do movimento dependendo da latitude do lugar. Para a latitude de 56º N, a variação azimutal é a constante na figura abaixo.

![Declinação do Sol](https://upload.wikimedia.org/wikipedia/commons/e/e3/Sun-declination.jpg)

![Mapa solar](https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Sonnenstand.png/800px-Sonnenstand.png)




## Wikipédia

[Português](https://pt.wikipedia.org/wiki/Declina%C3%A7%C3%A3o) - [Español](https://es.wikipedia.org/wiki/Declinaci%C3%B3n_(astronom%C3%ADa)) - [Italiano](https://it.wikipedia.org/wiki/Declinazione_(astronomia)) - [English](https://en.wikipedia.org/wiki/Declination) - [Français]() - [Deutsch](https://de.wikipedia.org/wiki/Deklination_(Astronomie))