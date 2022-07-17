A ***equação do centro***, ou ***equação do ponto médio***, é uma forma abordar o problema da mecânica orbital kepleriana dos dois corpos. É definida como a diferença angular entre a posição real de um corpo em sua órbita elíptica e a posição que ocuparia se seu movimento fosse uniforme, em uma órbita circular do mesmo período. Em suma, é a diferença entre a anomalia verdadeira $$\nu$$ e a anomalia média $$M$$.

$$$C = \nu - M$$$

A equação do centro é tipicamente expressa em termos da anomalia media ($$M$$) e da excentricidade ($$e$$).

Desde a astronomia antiga, o desvio irregular da Lua e dos planetas de um movimento regular ao longo de um caminho circular tem sido referido como a equação do centro. Johannes Kepler mostrou em 1609 que no problema dos dois corpos ela é periódica, com um período igual ao período de revolução do corpo orbitando em torno do corpo primário e que ela depende da excentricidade ($$e$$) e da respectiva elipse orbital. Seu máximo é chamado de grande desigualdade.

calculado usando uma expansão em série

No movimento Kepleriano, as coordenadas do corpo refazem os mesmos valores com cada órbita, que é a definição de uma função periódica. Tais funções podem ser expressas como séries periódicas de qualquer variável angular continuamente crescente, e a variável de maior interesse é a anomalia média, M. Como ela aumenta uniformemente com o tempo, expressar qualquer outra variável como uma série de anomalia média é essencialmente o mesmo que expressá-lo em termos de tempo. Como a excentricidade, e, da órbita é pequena em valor, os coeficientes da série podem ser desenvolvidos em termos de potências de e. Observe que, embora essas séries possam ser apresentadas de forma truncada, elas representam a soma de um número infinito de termos.



A série para a anomalia verdadeira ($$\nu$$) pode ser expressa mais convenientemente em termos de $$M$$, $$e$$ e funções de Bessel de primeira ordem, da forma

$$$\nu = M + 2 \sum _{s=1}^{\infty}{{1 \over s}} \left( J_s\left( s e \right) +\sum _{p=1}^{\infty}\beta ^p \left[ J _{s-p} \left( s e \right) + J _{s+p} \left( s e \right) \right]  \right) \sin sM$$$

onde $$J_n\left(se\right)$$ são funções de Bessel e 

$$$\beta = {1 \over e} \left( 1 - {\sqrt{ 1 - e^2}} \right)$$$

O resultado é em radianos.

Para $$e$$ pequeno, a série converge rapidamente. Se $$e$$ excede $$0.6627 \ldots$$ diverge para alguns valores de M. Isto foi descoberto pela primeira vez por Pierre-Simon Laplace.

As funções de Bessel podem ser expandidas em potências de $$x$$ por

$$$J _n \left( x \right) = {1 \over n!} \left( {x \over 2} \right) ^n \sum _{m=0}^{\infty} \left(-1 \right) ^m { \left( {x \over 2} \right) ^{2m} \over {m! \prod _{k=1}^{m}(n+k)} }$$$

e $$\beta ^m$$ por

$$$\beta ^{m}=\left({\frac {e}{2}}\right)^{m}\left[1+m\sum _{n=1}^{\infty }{\frac {(2n+m-1)!}{n!(n+m)!}}\left({\frac {e}{2}}\right)^{2n}\right]$$$

A equação para $$\nu$$ fica (truncada na ordem $$e^7$$):

$$$\begin{eqnarray}
\nu = & M & + \left( 2 e - {1 \over 4} e^3 + {5 \over 96} e^5 + {107 \over 4608} e^7 \right) \sin M \nonumber \\\\
      &   & + \left( {5 \over 4} e^2 - {11 \over 24} e^4 + {17 \over 192} e^6 \right) \sin⁡ 2M \nonumber \\\\
      &   & + \left( {13 \over 12} e^3 - {43 \over 64} e^5 + {95 \over 512} e^7 \right) \sin⁡ 3M \nonumber \\\\
      &   & + \left( {103 \over 94} e^4 - {451 \over 480} e^6 \right) \sin⁡ 4M \nonumber  \\\\
      &   & + \left( {1097 \over 960} e^5 - {5957 \over 4608} e^7 \right) \sin⁡ 5M \nonumber  \\\\
      &   & + {1223 \over 960} e^6 \sin⁡ 6M \nonumber  \\\\
      &   & + {47273 \over 32256} e^7 \sin⁡ 7M + \cdots \nonumber
\end{eqnarray}$$$

e pela definição, movendo $$M$$ para o lado esquerdo da expressão acima resulta

A equação do centro também pode ser derivada de forma alternativa e apresentada em termos de potências da excentricidade ($$e$$) e com coeficientes em funções de $$\sin M$$.

$$$\begin{eqnarray}
\nu = & M & + 2 e \sin M \nonumber \\\\
      &   & + {5 \over 4} e^2 \sin 2M \nonumber \\\\
      &   & + {e^3 \over 12} \left( 13 \sin 3 M - 3 \sin M \right) \nonumber \\\\
      &   & + {e^4 \over 96} \left( 103 \sin 4 M - 44 \sin 2 M \right) \nonumber \\\\
      &   & + {e^5 \over 960} \left( 1097 \sin 5 M - 645 \sin 3 M + 50 \sin M \right) \nonumber \\\\
      &   & + {e^6 \over 960} \left( 1223 \sin 6 M - 902 \sin 4 M + 85 \sin 2 M \right) + \cdots \nonumber
\end{eqnarray}$$$

## Referências

* Marth, A. (1890). [On the computation of the equation of the centre in elliptical orbits of moderate eccentricities](http://adsabs.harvard.edu/abs/1890MNRAS..50..502M). *Monthly Notices of the Royal Astronomical Society*, Vol. 50, p. 502. Dá a equação do centro para a ordem $$e^{10}$$.
* Morrison, J. (1883). [On the computation of the eccentric anomaly, equation of the centre and radius vector of a planet, in terms of the mean anomaly and eccentricity](http://adsabs.harvard.edu/abs/1883MNRAS..43..345M). *Monthly Notices of the Royal Astronomical Society*, Vol. 43, p. 345. Dá a equação do centro para a ordem $$e^{12}$$.
* Morrison, J. (1883). [Errata](http://adsabs.harvard.edu/abs/1883MNRAS..43..494M). *Monthly Notices of the Royal Astronomical Society*, Vol. 43, p. 494, 1883.
* Elenevskaya, N. B. (1963). [The Region of Convergence of Series Expansions of the Coordinates of Unperturbed Motion](https://adsabs.harvard.edu/abs/1963SvA.....6..726E). *Soviet Astronomy*, Vol. 6, p.726.
* da Silva Fernandes, S. (1994). [Extension of the solution of Kepler's equation to high eccentricities](https://adsabs.harvard.edu/abs/1994CeMDA..58..297D). *Celestial Mechanics & Dynamical Astronomy*, vol. 58, no. 3, p. 297-308.
* Ahmad, K, H. (1978). [Investigation of the Region of Convergence of Special Series of Keplerian Motion Expanded in Powers of the Increment of Eccentricity](http://masder.kfnl.gov.sa/bitstream/123456789/12309/2/U01M01V09I02A15.pdf). *Journal of the Faculty of Science, Riyad University*, Vol. 9, pp. 173-179.
* Meeus, Jean (1998). *Astronomical Algorithms*, 2ª ed, pp. 237, Willmann-Bell: Richmond, Virginia, ISBN 0-943396-61-1.

## Wikipédia

[Español](https://es.wikipedia.org/wiki/Ecuaci%C3%B3n_del_centro) - [English](https://en.wikipedia.org/wiki/Equation_of_the_center) - [Français](https://fr.wikipedia.org/wiki/%C3%89quation_du_centre) - [Deutsch](https://de.wikipedia.org/wiki/Mittelpunktsgleichung)