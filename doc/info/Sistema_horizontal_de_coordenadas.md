O sistema horizontal de coordenadas é um [sistema de coordenadas celestes](https://github.com/sergiolindau/JavaScript-Astronomy-Algorithms/wiki/Sistema-de-coordenadas-celestes) que utiliza o horizonte local do observador como o plano fundamental (o plano que divide uma esfera em dois hemisférios). Ele é expresso em termos de dois ângulos: a altura (ou elevação) e o azimute. A observação de estrelas e planetas pode ser programada para apontar numa direção determinada de azimute e elevação conhecidos através de fórmulas astronômicas para qualquer dia, local e horário. Objetos mais dinâmicos como satélites exigem algum grau de rastreamento programado de telescópios terrestres e antenas parabólicas.

Os satélites artificiais geoestacionários possuem a conveniência de se poder ajustar a direção de uma antena parabólica para uma coordenada horizontal (azimute e elevação) fixa.


![sistema horizontal de coordenadas](https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Azimuth-Altitude_schematic.svg/436px-Azimuth-Altitude_schematic.svg.png)

![Sistema horizontal de coordenadas](https://upload.wikimedia.org/wikipedia/commons/6/65/HorizAltAz.png)

Este sistema de coordenadas divide o céu no hemisfério superior, onde os objetos são visíveis, e o hemisfério inferior, onde os objetos não podem ser vistos porque a Terra o impede. O círculo máximo que separa os hemisférios é chamado horizonte celeste ou horizonte racional. O polo do hemisfério superior é chamado zênite, enquanto o do hemisfério inferior é chamado nadir.

Existem duas coordenadas angulares independentes:
* Altura, também denominada elevação, é o ângulo entre o objeto e o horizonte local do observador. Para objetos visíveis é um ângulo entre 0 e 90 graus. Para objetos abaixo do horizonte esse ângulo está compreendido entre -90 e 0 graus. Alternativamente, a distância zenital, distância do ponto diretamente acima (isto é, o zênite), pode ser usada no lugar da altura. A distância zenital é o ângulo complementar da altura (isto é, 90° - altura).
* Azimute, que é o ângulo do objeto ao longo do horizonte, normalmente medido a partir do norte, crescendo em direção ao leste. São exceções, por exemplo, a convenção FITS (Flexible Image Transport System) do Observatório Europeu do Sul, em que ele é medido a partir do sul, crescendo para o oeste, ou a convenção FITS do Sloan Digital Sky Survey (SDSS), em que ele é medido a partir do sul, crescendo para o leste.

![sistema horizontal de coordenadas](https://upload.wikimedia.org/wikipedia/commons/6/65/HorizAltAz.png)

O Sistema horizontal de coordenadas é fixo para um observador na Terra. Portanto, a altura e o azimute de um objeto no céu se modificam com o tempo, pois o objeto parece se mover no céu. Além disso, como o sistema horizontal é definido pelo horizonte local do observador, o mesmo objeto visto de diferentes locais na Terra no mesmo momento terá diferentes valores de altura e azimute.

As coordenadas horizontais são muito úteis para determinar a hora em que um objeto nasce e se põe. Quando a altura de um objeto é 0°, ele está no horizonte. Se naquele momento sua altura estiver crescendo, ele está nascendo, mas se a estiver decrescendo, ele está se pondo. Entretanto, todos os objetos na esfera celeste estão sujeitos ao movimento diurno, que é sempre de leste para oeste. Pode-se determinar se a altura está crescendo ou decrescendo considerando-se o azimute do objeto:

se o azimute está entre 0° e 180° (norte-leste-sul), ele está nascendo.
se o azimute está entre 180° e 360° (sul-oeste-norte), ele está se pondo.
Existem os seguintes casos especiais:

Para um observador no polo norte, todas as direções são sul, e no polo sul todas as direções são norte, portanto o azimute é indefinido em ambos os locais. Uma estrela (ou qualquer objeto com coordenadas equatoriais fixas) tem altura constante quando observada de um dos polos e, portanto, portanto nunca nasce ou se põe. O Sol, a Lua e os planetas podem nascer ou se pôr ao longo de um ano quando vistos dos polos porque sua ascensão reta e declinação alteram-se constantemente.
Para um observador no equador terrestre, objetos nos polos celestes permanecem em pontos fixos no horizonte.
Deve-se notar que as considerações acima são estritamente verdadeiras apenas para o “horizonte geométrico”: o horizonte que aparece para o observador quando ele se encontra no nível do mar, em uma Terra perfeitamente lisa, sem atmosfera. Na prática, o “horizonte aparente” tem uma altura negativa, cujo valor absoluto aumenta quando o observador está mais alto em relação ao nível do mar, devido à curvatura da Terra. Além disso, a refração atmosférica faz com que objetos celestes muito próximos do horizonte pareçam estar cerca de meio grau mais alto do que apareceriam se não houvesse atmosfera.

## Wikipédia

[Português](https://pt.wikipedia.org/wiki/Sistema_horizontal_de_coordenadas) - [Español](https://es.wikipedia.org/wiki/Coordenadas_horizontales) - [Italiano](https://it.wikipedia.org/wiki/Sistema_di_coordinate_orizzontali) - [English](https://en.wikipedia.org/wiki/Horizontal_coordinate_system) - [Français](https://fr.wikipedia.org/wiki/Syst%C3%A8me_de_coordonn%C3%A9es_horizontales)