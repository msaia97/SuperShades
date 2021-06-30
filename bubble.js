let margin = 20,
  diameter = 960,
  colors = [
    "White",
    "Brown",
    "Yellow",
    "Purple",
    "Silver",
    "Black",
    "Red",
    "Blue",
    "Green",
  ];

 function color(){} 
let pack = d3.layout
.pack()
.padding(2)
.size([diameter - margin, diameter - margin])
.value(function (data) {
  return data.size;
});

// this is setting the canvas
let svg = d3
.select("body")
.append("svg")
.attr("width", diameter)
.attr("height", diameter)
.append("g")
.attr("transform", "translate(" + diameter / 2 + "," + diameter / 2 + ")")

let pie = d3.layout.pie();
// assigning the data to a variable 
const root = getData();

// turning the data into nodes
let focus = root,
  nodes = pack.nodes(root),
  view;

// an array of all the super objects
  let circle = svg
    .selectAll("circle")
    .data(nodes)
    .enter()
    .append("circle")
    .attr("class", function (data) {
      return data.name;
    })
    .style("fill", function (data) {
      if (data.depth === 2) {
        return data.second_color;
      } else if (data.depth === 1) {
        return data.name;
      } else {
        return "orange";
      }
    })
    .style("opacity", function(data){
      if(data.depth !== 2){
        return .6
      }
    })
    .style("stroke", function(data){
      if(data.depth === 2){
        if(data.type === "hero"){
          return "blue"
        }else{
          return "red"
        }
      }else{
        return "black"
      }
    })
    .style("stroke-width", function(data){
      if(data.depth === 2){
        return 4
      }else{
        return 2
      }
    })
    .style("stroke-opacity", "0.65")
    .on("click", function (data) {
      if (focus !== data) zoom(data), d3.event.stopPropagation();
    })
   

let text = svg
  .selectAll("text")
  .data(nodes)
  .enter()
  .append("text")
  .attr("class", "label")
  .style("fill-opacity", function (data) {
    return data.parent === root ? 1 : 0;
  })
  .style("display", function (data) {
    return data.parent === root ? null : "none";
  })
  .text(function (data) {
    return data.name;
  })
  .style("font-family", "'Marvel', sans-serif")

let description = svg
  .selectAll("description")
  .data(nodes)
  .enter()
  .append("description")
  .attr("class", "description")
  .text(function (data) {
    if(data.depth === 2){
      return data.third_color;
    }
    // console.log(data);
  });
  
  // console.log(inner)
let node = svg.selectAll("circle,text");

let title = svg
  .selectAll("text.label")
  .style("fill", function(data){
    if(colors.includes(data.name)){
      return "white"
    }else if(data.depth === 2){
      if (
        data.second_color === "black" ||
        data.second_color === "" ||
        data.second_color === "purple"
      ) {
        return "white";
      }
    }
  })

// let mainCirc = svg
//   .selectAll("circle.Super.Shades")
//   .style("background-image", "marvelBg.png")

// zoom functionality
d3.select("body")
  .style("background", color(-1))
  .style("background", color(-1))
  .on("click", function () {
    zoom(root);
  });

zoomTo([root.x, root.y, root.r * 2 + margin]);

function zoom(data) {
  let focus0 = focus;
  focus = data;

  let transition = d3
    .transition()
    .duration(d3.event.altKey ? 7500 : 750)
    .tween("zoom", function (data) {
      let i = d3.interpolateZoom(view, [
        focus.x,
        focus.y,
        focus.r * 2 + margin,
      ]);
      return function (t) {
        zoomTo(i(t));
      };
    });

  transition
    .selectAll("text")
    .filter(function (data) {
      return data.parent === focus || this.style.display === "inline";
    })
    .style("fill-opacity", function (data) {
      return data.parent === focus ? 1 : 0;
    })
    .each("start", function (data) {
      if (data.parent === focus) this.style.display = "inline";
    })
    .each("end", function (data) {
      if (data.parent !== focus) this.style.display = "none";
    });
}
function zoomTo(v) {
  let k = diameter / v[2];
  // console.log(k)
  view = v;
  node.attr("transform", function (data) {
    return "translate(" + (data.x - v[0]) * k + "," + (data.y - v[1]) * k + ")";
  });
  circle.attr("r", function (data) {
    return data.r * k;
  });
}

function getData(){
  return {
    name: "Super Shades",
    children:
     [
      {
        name: "Red",
        children: [
          {
            name: "Ant Man",
            main_color: "red",
            second_color: "silver",
            third_color: "",
            type: "hero",
            size: 20,
            // children: [
            //   {primary: "red"},
            //   {secondary: "silver"}
            // ]
          },
          {
            name: "Daredevil",
            main_color: "red",
            second_color: "",
            third_color: "",
            type: "hero",
            size: 20,
          },
          {
            name: "Deadpool",
            main_color: "red",
            second_color: "black",
            third_color: "white",
            type: "hero",
            size: 20,
          },
          {
            name: "Human Torch",
            main_color: "red",
            second_color: "blue",
            third_color: "white",
            type: "hero",
            size: 20,
          },
          {
            name: "Iron Man",
            main_color: "red",
            second_color: "yellow",
            third_color: "silver",
            type: "hero",
            size: 20,
          },
          {
            name: "Juggernaut",
            main_color: "red",
            second_color: "",
            third_color: "",
            type: "villain",
            size: 20,
          },
          {
            name: "Magneto",
            main_color: "red",
            second_color: "purple",
            third_color: "",
            type: "villain",
            size: 20,
          },
          {
            name: "Nebula",
            main_color: "red",
            second_color: "",
            third_color: "blue",
            type: "villain",
            size: 20,
          },
          {
            name: "Nightcrawler",
            main_color: "red",
            second_color: "blue",
            third_color: "black",
            type: "hero",
            size: 20,
          },
          {
            name: "Red Hulk",
            main_color: "red",
            second_color: "",
            third_color: "blue",
            type: "villain",
            size: 20,
          },
          {
            name: "Scarlet Witch",
            main_color: "red",
            second_color: "",
            third_color: "",
            type: "hero",
            size: 20,
          },
          {
            name: "Spider-Man",
            main_color: "red",
            second_color: "blue",
            third_color: "black",
            type: "hero",
            size: 20,
          },
        ],
      },

      {
        name: "Yellow",
        children: [
          {
            name: "Ancient One",
            main_color: "yellow",
            second_color: "purple",
            third_color: "blue",
            type: "hero",
            size: 20,
          },
          {
            name: "Rogue",
            main_color: "yellow",
            second_color: "green",
            third_color: "",
            type: "hero",
            size: 20,
          },
          {
            name: "Wolverine",
            main_color: "yellow",
            second_color: "blue",
            third_color: "black",
            type: "hero",
            size: 20,
          },
        ],
      },

      {
        name: "Green",
        children: [
          {
            name: "Abomination",
            main_color: "green",
            second_color: "",
            third_color: "black",
            type: "villain",
            size: 20,
          },
          {
            name: "Doctor Doom",
            main_color: "green",
            second_color: "gray",
            third_color: "",
            type: "villain",
            size: 20,
          },
          {
            name: "Drax",
            main_color: "green",
            second_color: "red",
            third_color: "",
            type: "hero",
            size: 20,
          },
          {
            name: "Electro",
            main_color: "green",
            second_color: "yellow",
            third_color: "",
            type: "villain",
            size: 20,
          },
          {
            name: "Gamora",
            main_color: "green",
            second_color: "black",
            third_color: "purple",
            type: "hero",
            size: 20,
          },
          {
            name: "Green Goblin",
            main_color: "green",
            second_color: "purple",
            third_color: "",
            type: "villain",
            size: 20,
          },
          {
            name: "Hulk",
            main_color: "green",
            second_color: "purple",
            third_color: "",
            type: "hero",
            size: 20,
          },
          {
            name: "Iron Fist",
            main_color: "green",
            second_color: "yellow",
            third_color: "black",
            type: "hero",
            size: 20,
          },
          {
            name: "Lizard",
            main_color: "green",
            second_color: "white",
            third_color: "purple",
            type: "villain",
            size: 20,
          },
          {
            name: "Loki",
            main_color: "green",
            second_color: "yellow",
            third_color: "",
            type: "villain",
            size: 20,
          },
          {
            name: "Mysterio",
            main_color: "green",
            second_color: "purple",
            third_color: "yellow",
            type: "villain",
            size: 20,
          },
          {
            name: "Phoenix",
            main_color: "green",
            second_color: "yellow",
            third_color: "red",
            type: "hero",
            size: 20,
          },
          {
            name: "Proffessor X",
            main_color: "green",
            second_color: "",
            third_color: "silver",
            type: "hero",
            size: 20,
          },
          {
            name: "She Hulk",
            main_color: "green",
            second_color: "white",
            third_color: "purple",
            type: "hero",
            size: 20,
          },
          {
            name: "Vision",
            main_color: "green",
            second_color: "yellow",
            third_color: "purple",
            type: "hero",
            size: 20,
          },
        ],
      },

      {
        name: "Blue",
        children: [
          {
            name: "Apocalypse",
            main_color: "blue",
            second_color: "red",
            third_color: "dark blue",
            type: "villain",
            size: 20,
          },
          {
            name: "Captain America",
            main_color: "blue",
            second_color: "red",
            third_color: "white",
            type: "hero",
            size: 20,
          },
          {
            name: "Captain Marvel",
            main_color: "blue",
            second_color: "red",
            third_color: "yellow",
            type: "hero",
            size: 20,
          },
          {
            name: "Cyclops",
            main_color: "blue",
            second_color: "yellow",
            third_color: "red",
            type: "hero",
            size: 20,
          },
          {
            name: "Beast",
            main_color: "blue",
            second_color: "yellow",
            third_color: "",
            type: "hero",
            size: 20,
          },
          {
            name: "Doctor Strange",
            main_color: "blue",
            second_color: "red",
            third_color: "yellow",
            type: "hero",
            size: 20,
          },
          {
            name: "Iceman",
            main_color: "blue",
            second_color: "",
            third_color: "",
            type: "hero",
            size: 20,
          },
          {
            name: "Mister Fantastic",
            main_color: "blue",
            second_color: "white",
            third_color: "black",
            type: "hero",
            size: 20,
          },
          {
            name: "Mystique",
            main_color: "blue",
            second_color: "red",
            third_color: "yellow",
            type: "villain",
            size: 20,
          },
          {
            name: "Quicksilver",
            main_color: "blue",
            second_color: "silver",
            third_color: "",
            type: "hero",
            size: 20,
          },
          {
            name: "Thanos",
            main_color: "blue",
            second_color: "yellow",
            third_color: "purple",
            type: "villain",
            size: 20,
          },
          {
            name: "Thor",
            main_color: "blue",
            second_color: "red",
            third_color: "yellow",
            type: "hero",
            size: 20,
          },
        ],
      },

      {
        name: "Black",
        children: [
          {
            name: "Black Cat",
            main_color: "black",
            second_color: "white",
            third_color: "",
            type: "hero",
            size: 20,
          },
          {
            name: "Black Panther",
            main_color: "black",
            second_color: "",
            third_color: "yellow",
            type: "hero",
            size: 20,
          },
          {
            name: "Black Widow",
            main_color: "black",
            second_color: "",
            third_color: "",
            type: "hero",
            size: 20,
          },
          {
            name: "Deathstroke",
            main_color: "black",
            second_color: "orange",
            third_color: "",
            type: "villain",
            size: 20,
          },
          {
            name: "Nick Fury",
            main_color: "black",
            second_color: "",
            third_color: "",
            type: "hero",
            size: 20,
          },
          {
            name: "Ghost Rider",
            main_color: "black",
            second_color: "red",
            third_color: "white",
            type: "hero",
            size: 20,
          },
          {
            name: "Punisher",
            main_color: "black",
            second_color: "white",
            third_color: "",
            type: "hero",
            size: 20,
          },

          {
            name: "Red Skull",
            main_color: "black",
            second_color: "",
            third_color: "red",
            type: "villain",
            size: 20,
          },
          {
            name: "Storm",
            main_color: "black",
            second_color: "yellow",
            third_color: "white",
            type: "hero",
            size: 20,
          },
          {
            name: "Venom",
            main_color: "black",
            second_color: "white",
            third_color: "",
            type: "villain",
            size: 20,
          },
        ],
      },

      {
        name: "White",
        children: [
          {
            name: "Angel",
            main_color: "white",
            second_color: "blue",
            third_color: "yellow",
            type: "hero",
            size: 20,
          },
          {
            name: "Kingpin",
            main_color: "white",
            second_color: "purple",
            third_color: "",
            type: "villain",
            size: 20,
          },
        ],
      },

      {
        name: "Purple",
        children: [
          {
            name: "Baron Zemo",
            main_color: "purple",
            second_color: "black",
            third_color: "",
            type: "villain",
            size: 20,
          },
          {
            name: "Galactus",
            main_color: "purple",
            second_color: "blue",
            third_color: "",
            type: "villain",
            size: 20,
          },
          {
            name: "Hawkeye",
            main_color: "purple",
            second_color: "black",
            third_color: "",
            type: "hero",
            size: 20,
          },
        ],
      },

      {
        name: "Silver",
        children: [
          {
            name: "Colossus",
            main_color: "gray",
            second_color: "red",
            third_color: "yellow",
            type: "hero",
            size: 20,
          },
          {
            name: "Rhino",
            main_color: "gray",
            second_color: "",
            third_color: "",
            type: "villain",
            size: 20,
          },
          {
            name: "Silver Surfer",
            main_color: "silver",
            second_color: "",
            third_color: "",
            type: "hero",
            size: 20,
          },
          {
            name: "War Machine",
            main_color: "silver",
            second_color: "black",
            third_color: "",
            type: "hero",
            size: 20,
          },
        ],
      },

      {
        name: "Brown",
        children: [
          {
            name: "Groot",
            main_color: "brown",
            second_color: "",
            third_color: "green",
            type: "hero",
            size: 20,
          },
          {
            name: "Thing",
            main_color: "brown",
            second_color: "blue",
            third_color: "white",
            type: "hero",
            size: 20,
          },
        ],
      },
    ]
  // )
  }; // end of object
} //end of function

