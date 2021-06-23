
let width = 800,
  height = 600;

let canvas = d3
  .select("body")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .append("g")
  .attr("transform", "translate(50,50)");

let pack = d3.layout
  .pack()
  .size([width, height - 50])
  .padding(10);

d3.json("data.json");