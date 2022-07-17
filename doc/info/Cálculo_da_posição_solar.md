> Detalhes do cálculo da posição e da hora do nascer e por do Sol.

Essas equações podem ser usadas para calcular as coordenadas aparentes do Sol, equinócio médio e inclinação da eclíptica na data.

Comece calculando $$n$$, o número de dias (positivo ou negativo, incluindo dias fracionários) desde o meio-dia de Greenwich, Horário Terrestre (TT), em 1 de janeiro de 2000 (J2000.0.0). Se você souber a data juliana do horário desejado,

$$$n = JD - 2451545.0$$$

Todo o cálculo é realizado em séculos julianos desde a data de referência J2000.0.0. Para calcular os séculos julianos use

$$$T_{J2000.0.0} = {JD-2451545.0 \over 36525} = {n \over 36525}$$$

A longitude média do Sol é dada por:

$$$L_0 = 280.46646° + 36000.76983° \\; T + 0.0003032° \\; T^2$$$

A anomalia média do Sol (na verdade, a Terra está em órbita ao redor do Sol, mas é conveniente simular que o Sol orbita a Terra), é:

$$$M = 357.52911° + 35999.05029° \\; T + 0.0001537° \\; T^2$$$

$$L_0$$ e $$M$$ devem ser postos no intervalo de 0° a 360° adicionando ou subtraindo múltiplos de 360°.

A excentricidade da órbita terrestre é calculada

$$$e = 0.016708634 - 0.000042037 \\; T + 0.0000001267 \\; T^2$$$

e a equação do centro para o Sol:

$$$\begin{eqnarray}
C = &+& (1.914602° - 0.004817° \\; T + 0.000014° \\; T^2 )  \sin(M) \nonumber \\\\
&+& (0.019993° - 0.000101° \\; T)  \sin⁡(2M) \nonumber \\\\
&+& \sin⁡(2M) + 0.000289°  \sin⁡(3M) \nonumber
\end{eqnarray}$$$

A longitude verdadeira do Sol é dada por $$\odot = L_0 + C$$ e a anomalia verdadeira do Sol, dada por $$\nu = M + C$$

A distância do Sol à Terra, em unidades astronômicas (AU), é:

$$$R = 1.000001018 {1 - e^2} \over {1 + e \cos(\nu)}$$$

A longitude aparente do Sol ($$\lambda$$) é dada por:

$$$\begin{eqnarray}
\Omega &=& 125.04 - 1934.136 \\; T \nonumber \\\\
\lambda &=& \odot - 0.00569 - 0.00478 \sin⁡(\Omega) \nonumber
\end{eqnarray}$$$

e a obliquidade média da eclíptica é:

$$${\epsilon}_0 = 23°26'21.448'' - 46.8150'' \\; T - 0.00059'' \\; T^2 + 0.001813'' \\; T^3$$$

Expressando a obliquidade média da eclíptica em decimais fica:

$$${\epsilon}_0 = 23.0 + {26.0 \over 60} + {{21.448 - 46.8150 \\; T - 0.00059 \\; T^2 + 0.001813 \\; T^3} \over 3600} $$$

A obliquidade da eclíptica corrigida é dada por:

$$$\epsilon = {\epsilon}_0 - 0.00256 - 0.00478 \sin⁡(\Omega)$$$

Ascensão reta

$$$\tan⁡(\alpha) = {{\cos ⁡\epsilon \sin \lambda} \over \cos \lambda}$$$

Declinação

$$$\sin⁡(\theta) = \sin⁡(\epsilon) \sin⁡(\lambda)$$$

Equação do tempo

Seja $$y=⁡tan^2⁡({\epsilon \over 2})$$

$$$E = y \sin⁡(2 \\; L_0) - 2 \\; \epsilon \sin⁡(M) + 4 \\; \epsilon \\; y \sin⁡(M) \cos⁡(2 \\; L_0 ) - {1 \over 2} y \sin⁡(4 \\; L_0 ) - {5 \over 4} \\; {\epsilon}^2 \sin⁡(2M)$$$

O valor de $$E$$ é expresso em radianos. Deve-se converter em graus, então em horas, dividindo por 15.

## Referências
* [Wikipedia - Newcomb's Tables of the Sun](https://en.wikipedia.org/wiki/Newcomb%27s_Tables_of_the_Sun)
* Jean Meeus, Astronomical Algorithms, Richmond (Virginia, États-Unis), Willmann-Bell, 1991.
* [How to compute planetary positions](http://www.stjarnhimlen.se/comp/ppcomp.html)
* [Astronomy Answers - Position of the Sun](https://www.aa.quae.nl/en/reken/zonpositie.html)
* [Jan Skowron - Position Of The Sun](https://www.astrouw.edu.pl/~jskowron/pracownia/praca/sunspot_answerbook_expl/expl-5.html)

## Wikipédia

[Español](https://es.wikipedia.org/wiki/Declinaci%C3%B3n_solar) - [English](https://en.wikipedia.org/wiki/Position_of_the_Sun) - [Français](https://fr.wikipedia.org/wiki/Position_du_Soleil)