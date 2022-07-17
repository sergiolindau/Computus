Em [[astronomia]], com aplicações na cronologia de acontecimentos históricos, o ***dia juliano*** ou ***data juliana*** é um método de contar os dias sequencialmente, sem a separação em semanas, meses ou anos, que foi proposto por Joseph Justus Scaliger no ano de 1583.

Os dias e frações são contados de forma contínua, a partir de uma data arbitrária no passado. Sua origem (que corresponde a 0.0) é o meio-dia do dia 1 de janeiro de 4713 a.C. pelo calendário juliano, ou 24 de novembro de 4714 a.C., pelo calendário gregoriano, que precede qualquer data nos registros históricos.

Cada dia se inicia ao meio-dia de [[Meridiano de Greenwich|Greenwich]], às 12h do [[Horário Universal|Horário Universal (UT)]] e vai até o meio-dia seguinte. Uma vantagem é que o Dia Juliano apresenta o turno da noite, que é justamente o período de observação astronômica, em um mesmo dia do calendário, facilitando a forma de indicação do período de observação. Outro ponto positivo é a facilidade em determinar o período entre dois eventos, bastando apenas subtrair os Dias Juliano dos eventos.

Recebeu o nome de Dia Juliano (abreviado por $$JD$$), por ter sido inicialmente baseado no calendário Juliano – que era o calendário oficial da Igreja Católica Romana até o final do século XVI – e sendo ainda, uma homenagem ao pai do idealizador deste calendário, cujo nome era justamente Júlio César.

Se o $$JD$$ corresponde a um instante medido na escala uniforme de Tempo Terrestre (TT), a expressão "Dia Juliano de Efemérides" ($$JDE$$) é frequentemente utilizada.

Por exemplo,

|                    |   |           |           |
|--------------------|---|-----------|-----------|
| 1977 abril 26.4 UT | = | $$JD$$  | 2443259.9 |
| 1977 abril 26.4 TT | = | $$JDE$$ | 2443259.9 |

## Cálculo

Para realizar a conversão de uma data do calendário gregoriano em $$JD$$ convém adotar uma convenção diferente da usada na astronomia, mas afim de ser processada por computador: o intervalo dos meses de janeiro a dezembro sendo representado pelos números no intervalo 0 a 11.

A astronomia faz a contagem de anos anteriores ao ano 1 de forma diferente do comumente representado na história. Na história o ano anterior ao ano 1 é o ano 1 a.C., na astronomia o ano anterior ao ano 1 é o ano 0, e o ano anterior a este último é o ano -1. O ano que os historiadores chamam de 473 a.C. é na verdade o ano -472. A contagem astronômica dos anos negativos não é simplesmente afim de ser processada no computador, mas é a única forma adequada para fins aritméticos.

Por conveniência define-se o Número do Dia Juliano ($$JDN$$) como o Dia Juliano referente à um dia do calendário dado por ano-mês-dia, de forma que

$$$JD = JDN + {\textrm{hora} - 12 \over 24} + {\textrm{minuto} \over 24 \times 60} + {\textrm{segundo} \over 24 \times 60 \times 60}$$$

representa um instante no tempo civil dado por ano-mês-dia-hora-minuto-segundo.

Seja $$\left[x\right]$$ o [truncamento](https://pt.wikipedia.org/wiki/Truncamento) de $$x$$, o $$JDN$$ pode ser calculado por

$$$\begin{eqnarray}
my &=& & \left[ {\textrm{mês} - 13 \over 12} \right] \nonumber \\\\
JDN &=& & \left[ {1461 \\; (\textrm{ano} + my + 4800) \over 4} \right] \nonumber \\\\
& &+& \left[ {367 \\; (\textrm{mês} - 1 - 12 \\; my) \over 12} \right] \nonumber \\\\
& &-& \left[ {3 \over 4} \\; \left[ {\textrm{ano} + my + 4900 \over 100} \right] \right] \nonumber \\\\
& &+& \textrm{dia} - 32075 \nonumber
\end{eqnarray}$$$

Também, por conveniência, o último termo da expressão acima que calcula o $$JDN$$ ($$32075$$) é substituído por $$32075.5$$, de forma que a data de um dia no calendário dado por ano-mês-dia corresponda à meia-noite desta data (como é no calendário civil), e a parte fracionária do $$JD$$ é calculada por

$$$UT = {\textrm{hora} \over 24} + {\textrm{minuto} \over 24 \times 60} + {\textrm{segundo} \over 24 \times 60 \times 60}$$$

com as horas do dia a contar da meia-noite, como no calendário civil.

Assim obtemos:

$$$JD = JDE + UT$$$

Caso o último termo seja mantido como está ($$32075$$) calculamos o $$JD$$ por

$$$JD = JDE - 0.5 + UT$$$

O Observatório Astrofísico Smithsonian introduziu o Dia Juliano Modificado ($$MJD$$) em 1957 para registrar a órbita do Sputnik através de um IBM 704 (máquina de 36 bits) e usando apenas 18 bits. A contagem ia até 7 de agosto de 2576. O $$MJD$$ tem o início da contagem à meia-noite de 17 de novembro de 1858, e é calculado por

$$$MJD = JD − 2400000.5$$$

Outra forma de representar o Dia Juliano afim de processar no computador é estabelecer a relação com o Unix time, que é a contagem em segundos desde a meia noite de 1 de janeiro de 1970:

$$$\textrm{Unix time} = (JD − 2440587.5) \times 86400$$$

Observe que, considerando que [[Século_Juliano|um século no calendário juliano]] corresponde a 36525 dias, temos que de 1 de janeiro de 1970 até 1 de janeiro de 2000 ([[J2000|J2000.0]]) corresponde exatamente a 3/10 de século no calendário juliano.

O Rata Die é um sistema usado também nos computadores onde o inicio da contagem ($$\textrm{Rata Die} = 1$$) é o dia 1 de janeiro, ou seja, o primeiro dia da Era Cristã (ou da Era Comum) no calendário gregoriano. A relação com o $$JD$$ é dada por:

$$$\textrm{Rata Die} = \left[ JD − 1721424.5 \right]$$$

O calendário gregoriano teve início em 15 de outubro de 1582. Para se referir a datas anteriores a essa no calendário gregoriano diz-se que é o calendário gregoriano proléptico. A reforma aconteceu de forma que o dia seguinte a 4 de outubro de 1582 (calendário juliano) foi 15 de outubro de 1582 (calendário gregoriano).

O número de [[Dia juliano|dias julianos]] desde a data de referência [[J2000]] é dado por:

$$$T = {JD −  2451545.0 \over 36525}$$$


## Referências

* Jean Meeus, Astronomical Algorithms ; Richmond (Virginia, États-Unis), Willmann-Bell, 1998, pp. 59-66.

## Wikipédia

[Português](https://pt.wikipedia.org/wiki/Data_juliana) - [Español](https://es.wikipedia.org/wiki/Fecha_juliana) - [Italiano](https://it.wikipedia.org/wiki/Giorno_giuliano) - [English](https://en.wikipedia.org/wiki/Julian_day) - [Deutsch](https://de.wikipedia.org/wiki/Julianisches_Datum)