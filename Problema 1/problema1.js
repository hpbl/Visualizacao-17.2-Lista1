// Define dataset e dimensoes do svg
var dataset = [],
    margin  = 25,
    width   = 400 - margin - margin,
    height  = 300 - margin - margin;


// Cria os valores iniciais para o dataset (10 valores como default)
for(let i=0; i<10; i++) {
    dataset.push([getRandomInt(0,71), getRandomInt(0,71)])
}

// Inicia o svg
var canvas = d3.select('.main')
                .append('svg')
                    .attr('height', (height + margin + margin))
                    .attr('width', (width + margin + margin))
var svg = canvas.append('g').attr('transform', 'translate(' + margin + ',' + margin + ')');


// Cria as escalas
var x = d3.scaleLinear().domain([0,70]).range([0,width]);
var y = d3.scaleLinear().domain([0,70]).range([height,0]);

// Definindo os eixos
canvas.append('g')
            .attr('transform', 'translate(' + margin + ',' + parseInt(height+margin) + ')')
        .call(d3.axisBottom(x)
                .ticks(8));                 // Define o nr de ticks
canvas.append('g')
            .attr('class', 'yaxis')
            .attr('transform', 'translate(' + margin + ',' + margin + ')')
        .call(d3.axisLeft(y)
                .ticks(8)                   // Define o nr de ticks
                .tickSize(-width))          // Faz os ticks terem o tamanho do canvas

// Transforma os ticks em dashed e muda a cor
d3.select('.yaxis').selectAll('.tick:not(:first-of-type)').select('line')
                    .attr('stroke', '#8BC34A')
                    .attr('stroke-dasharray', 3);
// Deixa a linha "principal" transparente, comenta essa linha que da pra ver a diferenca
d3.select('.yaxis').select('path').attr('stroke', 'none');

// Cria os primeiros circulos
update();

// Funcao para fazer update com os novos circulos
function update(){

    // Pega o numero de circulos do formulario
    n = document.getElementById("form").elements[0].value
    n = (n == '') ? 10 : parseInt(n)

    // Gera novo dataset
    var newdataset = [];
    for(let i=0; i<n; i++){
        newdataset.push([getRandomInt(0,71), getRandomInt(0,71)]);
    }

    // Remove os circulos antigos
    svg.selectAll('circle').remove();

    // Adiciona os novos
    svg.selectAll('circle').data(newdataset).enter().append('circle')
            .attr('cx', d => x(d[0]))
            .attr('cy', d => y(d[1]))
            .attr('r', 3)
            .attr('fill', '#455A64')

}

// min incluso, max excluso
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}
