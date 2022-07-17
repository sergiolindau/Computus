O primeiro passo do cálculo da posição de um corpo celeste resolvendo a equação de Kepler é, a partir de valores determinados da anomalia média $$M$$ e da excentricidade da orbita $$e$$, determinar a anomalia excêntrica $$E$$, então usar o valor obtido para calcular a anomalia verdadeira $$\nu$$. Para isso é necessário encontrar a solução da equação de Kepler, que é da forma

$$$M = E - e \sin E$$$

onde $$M$$ é a anomalia média (em radianos), $$e$$ é a excentricidade da órbita e $$E$$ é a anomalia excêntrica (em radianos). Expressando os parâmetros da equação de Kepler em graus (º) fica

$$$M = E - e^* \sin E$$$

onde $$e^* = 180/\pi \\, e = 57.2957795 \\, e$$; e agora a anomalia média $$M$$ e a anomalia excêntrica $$E$$ estão sendo expressas em graus (º).

Encontrar a solução algébrica desta equação é impossível e uma solução numérica desta equação é de computação relativamente complexa, pois a incógnita aparece duas vezes, uma das vezes no argumento de uma função transcendente.

Uma vez determinada a anomalia excêntrica $$E$$ pela solução numérica da equação de Kepler usamos a equação

$$$\tan {\nu \over 2} = \sqrt{1 + e \over 1 - e} \tan {E \over 2}$$$

para obter a anomalia verdadeira $$\nu$$.

A distância ao corpo primário $$r$$ pode ser calculada através de uma das expressões a seguir.

$$$r = a \left( 1 - e \cos E \right)$$$

$$$r = {a \left( 1 - e^2 \right) \over 1 + e \cos \nu}$$$

$$$r = {q \left( 1 + e \right) \over 1 + e \cos \nu}$$$

onde $$q = a \left( 1 - e \right)$$ é a distância ao pericentro, com $$a$$ sendo o semieixo maior.

A solução numérica da equação de Kepler consiste em encontrar a raiz da função

$$$f \left( E \right) = E - e^* \sin \left( E \right) - M \left( t \right)$$$

Isto pode ser feito por uma aproximação iterativa simples ou pelo método de Newton-Raphson.

Em uma aproximação iterativa, fazemos uma estimativa inicial da raiz da função, usamos uma fórmula de iteração para obter uma estimativa melhorada e, em seguida, alimentamos o novo valor na fórmula de iteração novamente para obter uma estimativa melhor. Paramos quando a diferença entre duas estimativas sucessivas da raiz são igual ou menor à precisão desejada.

## Método iterativo simples

No método iterativo simples começamos com $$E_0 = M$$ e fazemos em cada iteração

$$$E_{n+1} = M + e^* \sin \left( E_n \right)$$$

Este método sempre converge e não irá requerer muitas iterações quando $$e$$ é pequeno. No entanto, o número de iterações necessárias geralmente aumenta com $$e$$ e é mais elevado para $$e \approx 1$$ e $$M \approx 0$$ ou $$M \approx 180º$$.

Em geral, para valores da excentricidade maiores que 0.4 ou 0.5 este método apresenta convergência lenta.

## Método de Newton-Raphson

O método de Newton-Raphson para encontrar a raiz de uma função $$f \left( x \right)$$ consiste em estimar um valor inicial $$x_0$$ e fazer o processo de iteração calculando

$$$x_{n+1} = x_n - {f \left( x_n \right) \over f' \left( x_n \right)}$$$

até que a diferença entre duas aproximações sucessivas seja menor que a precisão desejada.

Para a solução da equação de Kepler começamos fazendo $$E_0 = M$$, como no processo de iteração simples, e iteramos as duas equações a seguir, com $$n=0,1,2,...$$, até até $$\lvert \Delta E \rvert \le tol$$:

$$$\begin{eqnarray}
\Delta E&=&{M - \left( E_n - e^* \sin E_n \right) \over 1 - e \cos E_n} \nonumber \\\\
E_{n+1}&=& E_n + \Delta E \nonumber
\end{eqnarray}$$$

onde $$tol$$ é a precisão desejada, usualmente da ordem de $$10^{-6}$$ ou menor.

Assim como no método iterativo simples, no método de Newton-Raphson o número de iterações necessárias geralmente aumenta com $$e$$, mas no segundo método o número de iterações é menor. Para valores menores da excentricidade ($$e < 0.3$$) o primeiro método usa menos iterações (ou é de computação menos complexa). Somente para valores maiores da excentricidade $$e$$ o método de Newton-Raphson é mais vantajoso.

Outra comparação que podemos fazer entre estes dois métodos é a convergência inicial (começando com $$E_0 = M$$). A convergência inicial do método de Newton-Raphson pode ser menor nos primeiros passos. Outro ponto é que para valores de $$e \approx 1$$ e $$M \approx 0$$ o denominador na fórmula iterativa torna-se praticamente 0, podendo provocar overflow durante o cálculo. Em resumo: o método de Newton-Raphson garante somente convergência local.

Este problema pode ser contornado usando um valor inicial mais aproximado do que fazer $$E_0 = M$$.

## Estimativa inicial para os métodos iterativos

Para ambos métodos iterativos convém começar as iterações com uma estimativa inicial mais aproximada. Pode ser calculada por

$$$E_0 = M - e^* \sin M$$$

Outra alternativa mais simples é fazer $$E_0 = \pi$$ se $$e \gt 0.8$$.

No caso de órbitas de excentricidade acima de 0.9, pode ser melhor usar um método de busca por bissecção, ou mesmo usar uma aproximação de órbita parabólica.

## Aproximação para valores pequenos da excentricidade $$e$$

Para o caso de valores pequenos da excentricidade $$e$$ a fórmula abaixo pode ser usada com boa aproximação para calcular a anomalia excêntrica $$E$$.

$$$\tan E = { \sin M \over \cos M - e}$$$

## Referências

* [Wikipedia - Laws of planetary motion](https://en.wikipedia.org/wiki/Kepler%27s_laws_of_planetary_motion#Position_as_a_function_of_time)
* [Wikipedia - Kepler's equation - Numerical_approximation_of_inverse_problem](https://en.wikipedia.org/wiki/Kepler%27s_equation#Numerical_approximation_of_inverse_problem)
* [Elliptical Orbits](http://spiff.rit.edu/classes/phys440/lectures/ellipse/ellipse.html)
* [Kepler's equation and the Equation of Centre](https://web.archive.org/web/20050308023646/http://www.xylem.f2s.com/kepler/kepler.html)
* [Solving Kepler's Equation of Elliptical Motion](http://www.jgiesen.de/kepler/kepler.html)
* [Résolution de l'équation de Kepler](https://www.techno-science.net/glossaire-definition/Resolution-de-l-equation-de-Kepler.html)
