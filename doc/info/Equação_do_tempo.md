A ***equação do tempo*** é um parâmetro usado em astronomia para explicar o movimento relativo do [[Tempo solar verdadeiro|Sol verdadeiro]] em relação ao [[Tempo solar médio|Sol médio]], que pode diferir um do outro em aproximadamente um quarto de hora. É expressa matematicamente como a diferença entre o [[Tempo solar verdadeiro]] e o [[Tempo solar médio]].

$$$E(t) = H_{\textrm{Sol}\\:\textrm{verdadeiro}} - H_{\textrm{Sol}\\:\textrm{médio}} = \alpha_{\textrm{Sol}\\:\textrm{verdadeiro}} - \alpha_{\textrm{Sol}\\:\textrm{médio}}$$$

Note que a equação do tempo é uma função de uma variável com domínio no tempo. A palavra *equação* para se referir a esta função é usada no sentido (antigo e pouco comum) de "reconciliar uma diferença".

A equação do tempo resulta da combinação do efeito da excentricidade da órbita terrestre com a inclinação do eixo de rotação da Terra em relação à eclíptica.

Quando se faz a determinação da longitude de um local pela medida da passagem meridiana do Sol é necessário fazer a correção da hora local do centro do meridiano pela equação do tempo. Se isso não for feito pode ocorrer um erro de até 4º na determinação da longitude.

<div id="graph01"></div>[[javascript:
var year = (new Date()).getFullYear()

var options = {
    xlabelcallback: (d) => {
        let date = Computus.doy2cal(year,d);
        return Computus.monthTable['PT'][1][date[1] ] + " " + date[2];
    },
    title: "Equação do tempo em " + year,
    subtitle: "Equação do tempo = Tempo solar verdadeiro - Tempo solar médio",
    xlabel: "dia do ano",
    ylabel: "minutos"
}

Charts.functionXY(
    'graph01',
    'Computus.equationOfTime(Computus.jd2jc(Computus.cal2jd('+year+',0,1)+d))',
    'd',
    '1',
    '1',
    'Computus.isleap('+year+')?366:365',
    options
)

]]

Seu maior valor positivo é cerca de 16 minutos e seu maior valor negativo é cerca de 14 minutos. Esta é a diferença entre o meio dia verdadeiro (passagem meridiana do Sol), e o meio dia do Sol médio.

A equação do tempo é a diferença, ao longo de um ano, entre o tempo lido a partir de um relógio de sol e o tempo civil, ou seja, a diferença entre o tempo solar aparente e o tempo solar médio. Representa a evolução anual da diferença entre a posição real em cada momento do Sol no firmamento e a posição que ele ocuparia nesse momento se o eixo da Terra fosse perpendicular à eclítica e a órbita terrestre circular.


Em termos práticos, a equação do tempo reflete a diferença entre a hora marcada por um relógio solar, isto é a hora estimada a partir da posição do Sol no firmamento, ou tempo solar aparente, e a hora sideral (ou a hora civil), determinada pelo tempo solar médio.

Durante o decurso do ano, a diferença entre aquelas horas pode variar entre um avanço da posição do Sol em relação ao tempo solar médio de 16 min 33 s (por volta de 31 de Outubro–1 de Novembro) e um atraso de 14 min 6 s (por volta de 11–12 de Fevereiro).

A equação do tempo é uma descrição das características horizontais do analema da Terra, uma curva em forma de 8 assimétrico que representa graficamente a posição do Sol no céu à mesma hora em cada dia do ano, quando vista da Terra.

A equação do tempo, representada pela curva a vermelho na figura acima à direita, é assim o somatório das diferenças entre a hora solar aparente e a hora civil resultantes da combinação de dois efeitos:

* O efeito da obliquidade do eixo da Terra (a verde na figura), uma sinusóide com período semestral e amplitude máxima aproximada de 9,7 minutos. Este efeito é dominante, impondo o andamento e forma geral da equação do tempo.

* O efeito da elipticidade da órbita terrestre (a azul na figura), uma sinusóide com período pouco mais longo do que o ano e uma amplitude máxima aproximada de 7,6 minutos.
A soma dos dois efeitos, como aliás acontece com quaisquer fenómenos com carácter periódico, leva a que em certas épocas do ano, quando estão em fase, se reforcem mutuamente, aumentando a amplitude da resultante, enquanto noutras épocas se atenuam, reduzindo a amplitude do fenômeno.

Note que a aparência do gráfico da equação do tempo pode ser deduzida diretamente da evolução temporal da projeção sobre o equador celeste da trajetória em forma de 8 assimétrico do analema da Terra.

A equação do tempo descreve a discrepância entre dois tipos de tempo solar. A palavra equação é usada no sentido medieval de "reconciliar uma diferença". Os dois tempos que diferem são o tempo solar aparente, que segue diretamente o movimento diurno do Sol, e o tempo solar médio, que segue um Sol médio teórico com movimento uniforme ao longo do equador celeste.

A hora solar aparente pode ser obtida pela medição da posição atual (ângulo horário) do Sol, conforme indicado (com precisão limitada) por um relógio de sol. O tempo solar médio, para o mesmo local, seria o tempo indicado por um relógio fixo ajustado de modo que ao longo do ano suas diferenças em relação ao tempo solar aparente tivessem média zero.

A equação do tempo é a diferença entre o tempo solar médio (geralmente medido por um relógio) e o tempo solar aparente (tempo medido por um relógio de sol). Essa diferença varia ao longo do ano e atinge uma diferença maior no início de novembro, quando o tempo solar médio está mais de 16 minutos atrás do tempo solar aparente (especificamente 16 minutos e 33 segundos em torno de 3 de novembro), e em meados de fevereiro, quando o tempo solar médio tempo está mais de 14 minutos à frente do tempo aparente.

O tempo solar médio e o tempo solar aparente são os mesmos em quatro épocas do ano: 15 de abril, 14 de junho, 1º de setembro e 25 de dezembro. A equação do tempo é representada graficamente com um diagrama chamado analema, que às vezes é indicado como uma legenda em globos ou esferas terrestres e tem a forma de um 8 um tanto assimétrico. O analema indica a mesma informação expressa através do gráfico anexo, portanto este gráfico também pode ser considerado como um analema aberto.

Ao longo do ano, a hora indicada por um relógio de sol oscila em relação ao seu fluxo regular indicado por um relógio de valor que varia de +16 minutos e 25 segundos (entre 31 de outubro e 1º de novembro) a -14 minutos. segundos (entre 11 e 12 de Fevereiro), passando de +3'41" (entre 13 e 15 de Maio) e -6'30" (25 e 26 de Julho).

A representação visual desta equação é o analema ou com outro nome lemniscata, quando a senóide se fecha formando um oito (o lemnisco dos latinos era uma fita que adornava, esvoaçante, as cabeças dos vencedores).

-----------------

A duração da rotação da Terra sobre si mesma em um quadro ligado a estrelas distantes (dia sideral) é praticamente constante, aproximadamente igual a 23 h 56 min; por outro lado, o dia solar, ou seja, o tempo que decorre entre o momento em que o Sol está oposto a um determinado ponto da Terra (verdadeiro meio-dia solar neste ponto) e o momento em que o Sol voltará a enfrentar esse ponto no dia seguinte, é cerca de 24 h; de fato, tendo a Terra avançado em sua órbita enquanto girava sobre si mesma, ainda terá que girar sobre si mesma cerca de 1° (o que leva cerca de 4 min) para o ponto considerado estar novamente voltado para o Sol. No entanto, esse tempo adicional varia durante o ano entre aproximadamente 3 min 30 s e 4 min 30 s, resultando em variações na duração do dia solar que, ao se acumularem, criam deslocamentos entre o tempo solar verdadeiro e o tempo solar médio.

![Dia sideral](https://upload.wikimedia.org/wikipedia/commons/6/67/Sidereal_day_%28prograde%29.png)

Dois fenômenos se combinam para explicar essas variações; nesta seção, eles são examinados sucessivamente:

Influência da elipticidade da órbita da Terra.

Influência da obliquidade da Terra.

-------------------

De um ano para o outro, a curva de evolução anual deste parâmetro repete-se quase de forma idêntica. O conhecimento da equação do tempo fornece os meios para corrigir a qualquer momento o tempo dado por um relógio de sol para encontrar o tempo legal, de fluxo uniforme.

No passado, permitia controlar o ritmo de um relógio, com fluxo teoricamente uniforme, em relação às indicações de um relógio de sol, em particular no momento do meio-dia verdadeiro, então socialmente importante, o momento marcado em um mostrador ou um meridiano. Essa discrepância tem duas origens:

o fato de a órbita da Terra ser uma elipse da qual o sol é um foco (primeira lei de Kepler) com a consequência de que a Terra percorre essa órbita com velocidade variável (segunda lei de Kepler)

e o fato de que o eixo de rotação da Terra está inclinado em sua órbita.

Resultante das características do movimento da Terra em torno do Sol, a equação do tempo pode ser calculada com muita precisão. Encontramos tabelas detalhadas nas efemérides astronômicas.

## Wikipédia

[Português](https://pt.wikipedia.org/wiki/Equa%C3%A7%C3%A3o_do_tempo) - [Español](https://es.wikipedia.org/wiki/Ecuaci%C3%B3n_del_tiempo) - [Italiano](https://it.wikipedia.org/wiki/Equazione_del_tempo) - [English](https://en.wikipedia.org/wiki/Equation_of_time) - [Français](https://fr.wikipedia.org/wiki/%C3%89quation_du_temps) - [Deutsch](https://de.wikipedia.org/wiki/Zeitgleichung)