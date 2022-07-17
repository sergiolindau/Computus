Existem vários métodos para calcular a posição de um corpo celeste (planeta, planeta menor ou cometa periódico) em sua órbita elíptica ao redor do Sol em um determinado instante de tempo:

* por integração numérica;
* através das coordenadas heliocêntricas do corpo celeste (longitude, latitude e raio vetor), calculando a soma dos termos periódicos;
* através dos [[Elementos orbitais|elementos orbitais]] do corpo celeste.

Neste último caso, o procedimento consiste em determinar a anomalia verdadeira $$\nu$$ e a distância heliocêntrica $$r$$ em função do tempo. Em resumo, consiste de encontrar a coordenada polar $$\left( \nu, r \right)$$ em função do tempo.

Existem duas estratégias principais para fazer isso:

* [[Solução da equação de Kepler|resolver a equação de Kepler]];
* obter uma expansão em série para a anomalia verdadeira $$\nu$$ em termos da anomalia média $$M$$, expandindo em potências mais altas da excentricidade $$e$$, quando o valor da excentricidade não for muito grande.

Para resolver a equação de Kepler geralmente usamos métodos iterativos. O outro método, da expansão em série, tornou-se conhecido como [[Equação do centro|equação do centro]] e tem a vantagem da aplicação direta de valores tabulados sem nenhuma iteração.

Em ambos métodos o problema consiste em encontrar a anomalia verdadeira $$\nu$$ quando a anomalia média $$M$$ e a excentricidade orbital $$e$$ são conhecidas.

A completa determinação da posição de um corpo em sua órbita é feita através dos [[Elementos orbitais|elementos orbitais]], cujos parâmetros para os planetas maiores (com [[Variação secular|variações seculares]] menores) podem ser expressos por polinômios da forma

$$$X = X_0 + X_1 \\, T + X_2 \\, T^2 + X_3 \\, T^3 + \cdots$$$

onde $$X$$ e os $$X_n$$ são respectivamente o valor de um dos elementos orbitais listados abaixo a um dado tempo $$T$$ e os seus respectivos coeficientes polinomiais. A escala de tempo $$T$$ é dada em [[Século juliano|séculos julianos]] na escala de [[Tempo das efemérides|tempo das efemérides]]:

$$$T = { JDE - 2451545.0 \over 36525}$$$

Os elementos orbitais são denotados por:

* Semieixo maior da órbita $$a$$
* Excentricidade da órbita $$e$$
* Inclinação orbital $$i$$
* Longitude média da época $$L$$
* Argumento do periastro (periélio se a órbita for em torno do Sol) $$\omega$$
* Longitude do periastro (periélio) $$\overline{\omega}$$
* Longitude do nó ascendente $$\Omega$$

Assim podemos calcular a posição dos planetas a partir de valores tabelados dos coeficientes polinomiais e [[Solução da equação de Kepler|resolvendo a equação de Kepler]]. Tais coeficientes tabulados desta forma não pretendem representar algum significado, são simplesmente o resultado de uma aproximação para determinada época. Como tal, deve-se notar que os coeficientes não são válidos fora do intervalo de tempo em que foram ajustados.

As posições aproximadas dos planetas podem ser calculadas com boa precisão e num intervalo de tempo relativamente largo usando apenas os [[Elementos orbitais|elementos orbitais]] e taxas de variação associados, ou seja, calculando o polinômio somente até primeira ordem:

$$$X = X_0 + \dot{X} T$$$

Para estender ainda mais o intervalo de validade de coeficientes de primeira ordem, introduz-se parâmetros de correção no cálculo da anomalia média ($$M$$) para os planetas Júpiter a Netuno.

Na [tabela 1](#tabela-1---elementos-keplerianos-e-suas-taxas-de-variação-com-relação-à-eclíptica-média-e-o-equinócio-de-j2000-válidos-para-o-intervalo-de-tempo-de-1800-dc-a-2050-dc) estão os elementos orbitais e suas respectivas taxas de variação, válidos no intervalo de 1800 d.C. a 2050 d.C. Para este conjunto de parâmetros, neste intervalo de tempo, não e necessária a correção da anomalia média ($$M$$). Na [tabela 2a](#tabela-2a---elementos-keplerianos-e-suas-taxas-de-variação-com-relação-à-eclíptica-média-e-o-equinócio-de-j2000-válidos-para-o-intervalo-de-tempo-de-3000-ac-a-3000-dc) estão os elementos orbitais e suas respectivas taxas de variação, válidos no intervalo de 3000 a.C. a 3000 d.C. Os termos adicionais para a correção da anomalia média ($$M$$) estão na tabela [2b](#tabela-2b---termos-adicionais-que-devem-ser-incluídos-no-cálculo-de-m-de-júpiter-até-netuno-de-3000-ac-a-3000-dc).

Para um cálculo a partir de valores tabulados é necessário especificar somente dois dos três parâmetros: longitude do nó ascendente ($$\Omega$$), argumento do periastro ($$\omega$$) ou longitude do periastro ($$\overline{\omega}$$), pois entre eles há a relação

$$$\overline{\omega} = \Omega + \omega$$$

## Cálculo da posição aproximada dos planetas

1. Calcular os elementos orbitais dos planetas para o instante T.
2. Calcular a anomalia média

$$$M = L - \overline{\omega} + b T^2 + c \cos \left( f T \right) + s \sin \left( f T \right)$$$

3. Normalizar a anomalia média de forma que $$-180º \le M \le +180º$$ e então obter a anomalia excêntrica, $$E$$, da [[Solução da equação de Kepler|solução da equação de Kepler]]:

$$$M = E - e^* \sin E$$$

onde $$e^* = 180/\pi \\, e = 57.29578 \\, e$$.

Para utilizar os valores nas tabelas [1](#tabela-1---elementos-keplerianos-e-suas-taxas-de-variação-com-relação-à-eclíptica-média-e-o-equinócio-de-j2000-válidos-para-o-intervalo-de-tempo-de-1800-dc-a-2050-dc), [2a](#tabela-2a---elementos-keplerianos-e-suas-taxas-de-variação-com-relação-à-eclíptica-média-e-o-equinócio-de-j2000-válidos-para-o-intervalo-de-tempo-de-3000-ac-a-3000-dc) e [2b](#tabela-2b---termos-adicionais-que-devem-ser-incluídos-no-cálculo-de-m-de-júpiter-até-netuno-de-3000-ac-a-3000-dc), [[Solução da equação de Kepler|iterar a solução da equação de Kepler]] até que o incremento entre as iterações for tal que $$\lvert \Delta E \rvert \le 10^{-6}$$ graus é suficiente.

4. Calcular as coordenadas heliocêntricas do planeta em seu plano orbital, $$\mathbf{r'}$$, com o eixo $$x'$$ alinhado ao foco ao periélio:

$$$\begin{eqnarray}
x'&=&a \left( \cos E - e \right) \nonumber \\\\
y'&=&a \sqrt{1-e^2} \sin E \nonumber \\\\
z'&=&0 \nonumber
\end{eqnarray}$$$

5. Calcular as coordenadas, $$\mathbf{r}_{\textrm{ecl}}$$ , no plano da eclíptica J2000, com o eixo $$x$$ alinhado em direção ao equinócio

$$$\mathbf{r}_{\textrm{ecl}} = \mathcal{M} \mathbf{r'} \equiv \mathcal{R_z} \left( - \Omega \right) \mathcal{R_x} \left( - i \right) \mathcal{R_z} \left( - \omega \right) \mathbf{r'}$$$

então

$$$\begin{eqnarray}
x_{\textrm{ecl}}&=& \left( \cos \omega \cos \Omega - \sin \omega \sin \Omega \cos i \right)&x'&+& \left( - \sin \omega \cos \Omega - \cos \omega \sin \Omega \cos i \right) &y' \nonumber \\\\
y_{\textrm{ecl}}&=& \left( \cos \omega \sin \Omega + \sin \omega \cos \Omega \cos i \right)&x'&+& \left( - \sin \omega \sin \Omega + \cos \omega \cos \Omega \cos i \right) &y' \nonumber \\\\
z_{\textrm{ecl}}&=& \left( \sin \omega \sin i \right)&x'&+& \left( \cos \omega \sin i \right) &y' \nonumber
\end{eqnarray}$$$

Se desejar, obtenha as coordenadas equatoriais no "ICRF" ou "J2000 frame", $$r_{\textrm{eq}}$$:

$$$\begin{eqnarray}
x_{eq}&=&x_{\textrm{ecl}}& & & \nonumber \\\\
y_{eq}&=& &+& \cos \epsilon \\, y_{\textrm{ecl}}&- \sin \epsilon \\, z_{\textrm{ecl}} \nonumber \\\\
z_{eq}&=& &+& \sin \epsilon \\, y_{\textrm{ecl}}&+ \cos \epsilon \\, z_{\textrm{ecl}} \nonumber
\end{eqnarray}$$$

onde a obliquidade em J2000 é $$\epsilon = 23.43928º$$.

## Tabelas de elementos orbitais e suas respectivas taxas de variação

As tabelas e o método de cálculo da posição aproximada dos planetas aqui apresentados foram retirados de informações do Jet Propulsion Lab$$^{[1]}$$, que faz referência a um artigo escrito por E. M. Standish em 1992.

### Tabela 1 - Elementos keplerianos e suas taxas de variação, com relação à eclíptica média e o equinócio de J2000, válidos para o intervalo de tempo de 1800 d.C. a 2050 d.C.

|    |$$a_0$$ [UA]|$$e_0$$ [rad]|$$i_0$$ [º]|$$L_0$$ [º]|$$\overline{\omega_0}$$ [º]|$$\Omega_0$$ [º]|
|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
|    |$$\dot{a}$$ [UA/séc]|$$\dot{e}$$ [rad/séc]|$$\dot{i}$$ [º/séc]|$$\dot{L}$$ [º/séc]|$$\dot{\overline{\omega}}$$ [º/séc]|$$\dot{\Omega}$$ [º/séc]|
| Mercúrio   |  0.38709927 |  0.20563593 |  7.00497902 | 252.25032350    |  77.45779628 |  48.33076593 |
|            |  0.00000037 |  0.00001906 | -0.00594749 | 149472.67411175 |   0.16047689 |  -0.12534081 |
| Vênus      |  0.72333566 |  0.00677672 |  3.39467605 |    181.97909950 | 131.60246718 |  76.67984255 |
|            |  0.00000390 | -0.00004107 | -0.00078890 |  58517.81538729 |   0.00268329 |  -0.27769418 |
| Baricentro Terra/Lua |  1.00000261 |  0.01671123 | -0.00001531 |    100.46457166 | 102.93768193 |   0.0        |
|            |  0.00000562 | -0.00004392 | -0.01294668 |  35999.37244981 |   0.32327364 |   0.0        |
| Marte      |  1.52371034 |  0.09339410 |  1.84969142 |     -4.55343205 | -23.94362959 |  49.55953891 |
|            |  0.00001847 |  0.00007882 | -0.00813131 |  19140.30268499 |   0.44441088 |  -0.29257343 |
| Júpiter    |  5.20288700 |  0.04838624 |  1.30439695 |     34.39644051 |  14.72847983 | 100.47390909 |
|            | -0.00011607 | -0.00013253 | -0.00183714 |   3034.74612775 |   0.21252668 |   0.20469106 |
| Saturno    |  9.53667594 |  0.05386179 |  2.48599187 |     49.95424423 |  92.59887831 | 113.66242448 |
|            | -0.00125060 | -0.00050991 |  0.00193609 |   1222.49362201 |  -0.41897216 |  -0.28867794 |
| Urano      | 19.18916464 |  0.04725744 |  0.77263783 |    313.23810451 | 170.95427630 |  74.01692503 |
|            | -0.00196176 | -0.00004397 | -0.00242939 |    428.48202785 |   0.40805281 |   0.04240589 |
| Netuno     | 30.06992276 |  0.00859048 |  1.77004347 |    -55.12002969 |  44.96476227 | 131.78422574 |
|            |  0.00026291 |  0.00005105 |  0.00035372 |    218.45945325 |  -0.32241464 |  -0.00508664 |

### Tabela 2a - Elementos keplerianos e suas taxas de variação, com relação à eclíptica média e o equinócio de J2000, válidos para o intervalo de tempo de 3000 a.C. a 3000 d.C.

O calculo de $$M$$ de Júpiter a Netuno deve ser aumentado para incluir os termos adicionais dados na tabela 2b.

|    |$$a_0$$ [UA]|$$e_0$$ [rad]|$$i_0$$ [º]|$$L_0$$ [º]|$$\overline{\omega_0}$$ [º]|$$\Omega_0$$ [º]|
|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
|    |$$\dot{a}$$ [UA/séc]|$$\dot{e}$$ [rad/séc]|$$\dot{i}$$ [º/séc]|$$\dot{L}$$ [º/séc]|$$\dot{\overline{\omega}}$$ [º/séc]|$$\dot{\Omega}$$ [º/séc]|
| Mercúrio |  0.38709843 |  0.20563661 |  7.00559432 |    252.25166724 |  77.45771895 |  48.33961819 |
|          |  0.00000000 |  0.00002123 | -0.00590158 | 149472.67486623 |   0.15940013 |  -0.12214182 |
| Vênus    |  0.72332102 |  0.00676399 |  3.39777545 |    181.97970850 | 131.76755713 |  76.67261496 |
|          | -0.00000026 | -0.00005107 |  0.00043494 |  58517.81560260 |   0.05679648 |  -0.27274174 |
| Baricentro Terra/Lua|   1.00000018| 0.01673163 | -0.00054346 | 100.46691572 | 102.93005885 | -5.11260389 |
|          | -0.00000003 | -0.00003661 | -0.01337178 |  35999.37306329 |   0.31795260 |  -0.24123856 |
| Marte    |  1.52371243 |  0.09336511 |  1.85181869 |     -4.56813164 | -23.91744784 |  49.71320984 |
|          |  0.00000097 |  0.00009149 | -0.00724757 |  19140.29934243 |   0.45223625 |  -0.26852431 |
| Júpiter  |  5.20248019 |  0.04853590 |  1.29861416 |     34.33479152 |  14.27495244 | 100.29282654 |
|          | -0.00002864 |  0.00018026 | -0.00322699 |   3034.90371757 |   0.18199196 |   0.13024619 |
| Saturno  |  9.54149883 |  0.05550825 |  2.49424102 |     50.07571329 |  92.86136063 | 113.63998702 |
|          | -0.00003065 | -0.00032044 |  0.00451969 |   1222.11494724 |   0.54179478 |  -0.25015002 |
| Urano    | 19.18797948 |  0.04685740 |  0.77298127 |    314.20276625 | 172.43404441 |  73.96250215 |
|          | -0.00020455 | -0.00001550 | -0.00180155 |    428.49512595 |   0.09266985 |   0.05739699 |
| Netuno   | 30.06952752 |  0.00895439 |  1.77005520 |    304.22289287 |  46.68158724 | 131.78635853 |
|          |  0.00006447 |  0.00000818 |  0.00022400 |    218.46515314 |   0.01009938 |  -0.00606302 |

### Tabela 2b - Termos adicionais que devem ser incluídos no cálculo de $$M$$ de Júpiter até Netuno, de 3000 a.C. a 3000 d.C.

|         |    $$b$$    |    $$c$$    |    $$s$$    |   $$f$$     |
|:-------:|:-----------:|:-----------:|:-----------:|:-----------:|
| Júpiter | -0.00012452 |  0.06064060 | -0.35635438 | 38.35125000 |
| Saturno |  0.00025899 | -0.13434469 |  0.87320147 | 38.35125000 |
| Urano   |  0.00058331 | -0.97731848 |  0.17689245 |  7.67025000 |
| Netuno  | -0.00041348 |  0.68346318 | -0.10162547 |  7.67025000 |

## Referências

* [1] - [JPL - SSD - Approximate Positions of the Planets](https://ssd.jpl.nasa.gov/planets/approx_pos.html)
* [2] - [Paul Schlyter](http://www.stjarnhimlen.se/) - [How to compute planetary positions](http://www.stjarnhimlen.se/comp/ppcomp.html)
* [3] - [Paul Schlyter](http://www.stjarnhimlen.se/) - [Computing planetary positions - a tutorial with worked examples](http://www.stjarnhimlen.se/comp/tutorial.html)
* [4] - [Paul Schlyter](http://www.stjarnhimlen.se/) - [How to compute rise/set times and altitude above horizon](http://www.stjarnhimlen.se/comp/riset.html
)
* [6] - [Paul Schlyter](http://www.stjarnhimlen.se/) - [Time Scales](http://stjarnhimlen.se/comp/time.html)
* [7] - [Wikipedia - Kepler orbit](https://en.wikipedia.org/wiki/Kepler_orbit)
* [8] - [Wikipedia - Orbital mechanics](https://en.wikipedia.org/wiki/Orbital_mechanics)