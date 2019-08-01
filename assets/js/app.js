var width = 960;
var height = 500;
var radius = 10;
var margin = 20;

var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .attr("class", "chart");

d3.csv("assets/data/data.csv").then(function(data) {
  visualize(data);
});

function visualize(theData) {

  var curX = "poverty";
  var curY = "obesity";
  var xMin;
  var xMax;
  var yMin;
  var yMax;


  function xMinMax() {
    xMin = d3.min(theData, function(d) {
      return parseFloat(d[curX]) * 0.90;
    });

    xMax = d3.max(theData, function(d) {
      return parseFloat(d[curX]) * 1.10;
    });
  }

  function yMinMax() {
    yMin = d3.min(theData, function(d) {
      return parseFloat(d[curY]) * 0.90;
    });

    yMax = d3.max(theData, function(d) {
      return parseFloat(d[curY]) * 1.10;
    });
  }

  xMinMax();
  yMinMax();
 var xScale = d3
    .scaleLinear()
    .domain([xMin, xMax])
    .range([margin, width - margin]);
  var yScale = d3
    .scaleLinear()
    .domain([yMin, yMax])
    .range([height - margin, margin]);

  var xAxis = d3.axisBottom(xScale);
  var yAxis = d3.axisLeft(yScale);

  svg
    .append("g")
    .call(xAxis)
    .attr("class", "xAxis")
    .attr("transform", "translate(0," + (height - margin) + ")");
  svg
    .append("g")
    .call(yAxis)
    .attr("class", "yAxis")
    .attr("transform", "translate(" + (margin) + ", 0)");

  var theCircles = svg.selectAll("g theCircles").data(theData).enter();

  theCircles
    .append("circle")
    .attr("cx", function(d) {
      return xScale(d[curX]);
    })
    .attr("cy", function(d) {
      return yScale(d[curY]);
    })
    .attr("r", radius)
    .attr("class", function(d) {
      return "stateCircle " + d.abbr;
    });
}
