// Dados de entrada
var anos = [1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000,
  2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008]

const masculino = [10.74, 13.75, 16.49, 18.04, 19.2, 20.83, 22.66, 23.38, 24.95,
  22.01, 22.75, 22.66, 26.19, 25.54, 24.33, 23.22, 21.93, 22.03, 22.27]

const feminino = [1.96, 2.87, 4.07, 5.1, 5.86, 7.45, 9.32, 11.12, 12.69,
  11.96, 13.05, 13.81, 16.85, 16.55, 15.89, 15.5, 14.48, 13.93, 14.24]

// Formatando dados
// cria um Date apenas recebendo o ano
var parseAno = d3.timeParse('%Y')

// arrays onde colocaremos nossos objetos que juntam a incidencia com os anos
var dadosMasculino = []
var dadosFeminino = []

for (let i = 0; i < anos.length; i++) {
  anos[i] = parseAno(anos[i]) // transforma o valor numérico em um Date

  // agrupando incidencia com anos
  dadosMasculino.push({incidencia: masculino[i], ano: anos[i]})
  dadosFeminino.push({incidencia: feminino[i], ano: anos[i]})
}

// definindo dimensões
const margem = {topo: 20, direita: 20, base: 20, esquerda: 20}
const largura = 500 - margem.esquerda - margem.direita
const altura = 300 - margem.topo - margem.base

// criando SVG
var meuSVG = d3.select('body')
                .append('svg')
                  .attr('height', altura + margem.esquerda + margem.direita)
                  .attr('width', largura + margem.topo + margem.base)

// criando grupo onde colocaremos as visualizações respeitando margens
var grupo = meuSVG.append('g')
                    .attr('transform', 'translate(' + margem.esquerda +
                          ',' + margem.topo + ')')

// definindo escalas
var incidenciaEscala = d3.scaleLinear()
                          .domain([30, 0]) // domínio fixo do exemplo
                          .range([0, altura])

var tempoEscala = d3.scaleTime()
                      .domain(d3.extent(anos)) // menor e maior ano [1990, 2008]
                      .range([0, largura])

// definindo gerador de linhas
// https://www.dashingd3js.com/svg-paths-and-d3js
var geradorLinha = d3.line()
                .x(function (d) { return tempoEscala(d.ano) }) // posição x
                .y(function (d) { return incidenciaEscala(d.incidencia) }) // posição y

// desenhando as linhas na tela (path)
grupo.append('path')
      .attr('class', 'masculino')
      .attr('d', geradorLinha(dadosMasculino)) // gerador de linha com os dados
      .attr('fill', 'none') // sem preenchimento
      .attr('stroke', 'blue')

grupo.append('path')
      .attr('class', 'feminino')
      .attr('d', geradorLinha(dadosFeminino)) // gerador de linha com os dados
      .attr('fill', 'none') // sem preenchimento
      .attr('stroke', 'red')

// criando grupos para os eixos
var grupoEixoBase = grupo.append('g')
                        .attr('class', 'eixoBase')
                        .attr('transform', 'translate(0,' + (altura) + ')')

var grupoEixoEsquerda = grupo.append('g')
                        .attr('class', 'eixoEsquerda')

var grupoEixoTopo = grupo.append('g')
                        .attr('class', 'eixoTopo')

var grupoEixoDireita = grupo.append('g')
                        .attr('class', 'eixoDireita')
                        .attr('transform', 'translate(' + largura + ', 0)')

// definindo os eixos
var eixoBase = d3.axisBottom(tempoEscala)  // escala correspondente
                .tickFormat(d3.timeFormat('%Y')) // formatando para mostrar só o ano
                .tickSize(-5) // colocando o tick para dentro do gráfico
                .tickPadding(8) // padding para o texto

var eixoEsquerda = d3.axisLeft(incidenciaEscala)
                .ticks(7) // definindo número de ticks
                .tickSize(-5)
                .tickPadding(5)

var eixoTopo = d3.axisTop(tempoEscala)
                .tickFormat('') // colocando ticks sem texto
                .tickSize(-5)

var eixoDireita = d3.axisRight(incidenciaEscala)
                .tickFormat('')
                .ticks(7)
                .tickSize(-5)

// colocando eixos nos grupos
grupoEixoBase.call(eixoBase)
grupoEixoEsquerda.call(eixoEsquerda)
grupoEixoTopo.call(eixoTopo)
grupoEixoDireita.call(eixoDireita)
