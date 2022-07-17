A ***refração atmosférica*** é o desvio da luz ou outra onda eletromagnética de uma linha reta, ao passar pela atmosfera, devido à variação na densidade do ar (que varia como uma função da altitude).

![Refração atmosférica](https://upload.wikimedia.org/wikipedia/commons/f/f7/Atmospheric_refraction.svg)

Devido à refração atmosférica, o Sol pode ser visto mesmo estando abaixo do horizonte. A luz do sol é desviada (refratada) quando entra na atmosfera da Terra.

## Cálculo da refração atmosférica

A refração atmosférica, nos cálculos astronômicos, é modelada de diversas formas. Em primeiro lugar  distinguem-se dois casos:
* A elevação aparente ($$h_0$$) de um corpo celeste foi medida, e deve-se encontrar a refração R a ser **subtraída** de $$h_0$$ para obter a elevação verdadeira $$h$$.

* A elevação verdadeira ($$h$$), sem levar em conta a massa de ar, já foi calculada a partir de coordenadas celestes e fórmulas de trigonometria esférica, e queremos calcular a refração R a ser **adicionada** a $$h$$ para prever a elevação aparente $$h_0$$.

Os efeitos da atmosfera variam com a pressão atmosférica, umidade e outras variáveis. Pequenas variações na atmosfera podem ter um efeito maior.

No período diurno a refração atmosférica afeta o tempo do [[Nascer do Sol|nascer]] e [[Pôr do Sol|pôr]] do Sol, bem como sua [[Elevação|elevação]] no céu. Um modelo utilizado pelo National Oceanic and Atmospheric Administration (NOAA) para predizer a elevação aparente $$h_0$$ é o seguinte:

Para cálculos do [[Nascer do Sol|nascer]] e [[Pôr do Sol|pôr]] do sol, assumimos 0.833° de refração atmosférica. Para calcular a correção na [[Elevação|elevação]] solar usamos as seguintes correções conforme a [[Elevação|elevação]]:

| Elevação solar | Correção da refração atmosférica (°) |
|----------------|--------------------------------------|
| 85° to 90°     | $$R = 0$$   |
| 5° to 85°      | $$R = {1° \over 3600''} \left ( {58.1'' \over \tan(h)} - {0.07'' \over \tan^3(h)} + {0.000086'' \over \tan^5(h)} \right )$$ |
| -0.575° to 5°  | $$R = {1° \over 3600''} \left ( 1735'' - 518.2'' h + 103.4 h^2 - 12.79'' h^3 + 0.711'' h^4 \right )$$ |
| < -0.575°      | $$R = {1° \over 3600''} \left ( {-20.774'' \over \tan(h)} \right )$$ |

Utilizando este modelo espera-se que os erros nos horários do nascer e do pôr do sol aumentem quanto mais longe você estiver do equador, porque o Sol nasce e se põe em um ângulo mais raso.

Este modelo é mostrado no gráfico abaixo.

<div id="graph01"></div>[[javascript:
var options = {
    xlabelcallback: (h) => {
        return h.toFixed(0);
    },
    title: "Refração atmosférica (NOAA)",
    xlabel: "Elevação (°)",
    ylabel: "Correção (°)"
}

Charts.functionXY(
    'graph01',
    'Computus.refractionCorrection(h)',
    'h',
    '0',
    '1',
    '90',
    options
)

]]

## Referências

* [NOAA - Solar Calculation Details](https://gml.noaa.gov/grad/solcalc/calcdetails.html)

## Wikipédia

[Português](https://pt.wikipedia.org/wiki/Refra%C3%A7%C3%A3o_atmosf%C3%A9rica) - [Español](https://es.wikipedia.org/wiki/Refracci%C3%B3n_atmosf%C3%A9rica) - [Italiano](https://it.wikipedia.org/wiki/Rifrazione_atmosferica) - [English](https://en.wikipedia.org/wiki/Atmospheric_refraction) - [Deutsch](https://de.wikipedia.org/wiki/Astronomische_Refraktion)