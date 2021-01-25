<template>
  <div ref="chart" style="width:600px;height:600px;"></div>
</template>

<script>
import * as d3 from "d3";
import data from "./line2.data.js"
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      chart: {},
      svg: "",
      serie: "",
      xAxis: "",
      yAxis: "",
      margin: { top: 30, right: 50, bottom: 30, left: 30 },
      width: 500,
      labelPadding: 6,
      height: 500,
      x: "",
      y: "",
      z: "",
      data:data,
bisect:{},
      series: [],
    };
  },
  methods: {
    formatDate(date) {
  return date.toLocaleString("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC"
  });
},
//     getConfig() {
//       this.svg = d3
//         .create("svg")
//         .attr("viewBox", [0, 0, this.width, this.height]);
//       const svg = d3
//         .select(DOM.svg(width, height))
//         .style("-webkit-tap-highlight-color", "transparent")
//         .style("overflow", "visible");
//       svg.append("g").call(xAxis);
//       svg.append("g").call(yAxis);
//       svg
//         .append("path")
//         .datum(data)
//         .attr("fill", "none")
//         .attr("stroke", "steelblue")
//         .attr("stroke-width", 1.5)
//         .attr("stroke-linejoin", "round")
//         .attr("stroke-linecap", "round")
//         .attr("d", line);
//       const tooltip = svg.append("g");
//       svg.on("touchmove mousemove", function(event) {
//         const { date, value } = bisect(d3.pointer(event, this)[0]);
//         tooltip.attr("transform", `translate(${x(date)},${y(value)})`).call(
//           callout,
//           `${formatValue(value)}
//           ${formatDate(date)}`
//         );
//       });
//       svg.on("touchend mouseleave", () => tooltip.call(callout, null));
//       this.$refs.chart.appendChild(this.svg.node());
//     },
//     callout = (g, value) => {
//   if (!value) return g.style("display", "none");

//   g
//       .style("display", null)
//       .style("pointer-events", "none")
//       .style("font", "10px sans-serif");

//   const path = g.selectAll("path")
//     .data([null])
//     .join("path")
//       .attr("fill", "white")
//       .attr("stroke", "black");

//   const text = g.selectAll("text")
//     .data([null])
//     .join("text")
//     .call(text => text
//       .selectAll("tspan")
//       .data((value + "").split(/\n/))
//       .join("tspan")
//         .attr("x", 0)
//         .attr("y", (d, i) => `${i * 1.1}em`)
//         .style("font-weight", (_, i) => i ? null : "bold")
//         .text(d => d));

//   const {x, y, width: w, height: h} = text.node().getBBox();

//   text.attr("transform", `translate(${-w / 2},${15 - y})`);
//   path.attr("d", `M${-w / 2 - 10},5H-5l5,-5l5,5H${w / 2 + 10}v${h + 20}h-${w + 20}z`);
// }
  },
  mounted() {
    this.x = d3.scaleUtc()
    .domain(d3.extent(data, d => d.date))
    .range([margin.left, width - margin.right]);

    this.y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.value)]).nice()
    .range([height - margin.bottom, margin.top]);

this.xAxis = g => g
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0))


    this.yAxis = g => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y))
    .call(g => g.select(".domain").remove())
    .call(g => g.select(".tick:last-of-type text").clone()
        .attr("x", 3)
        .attr("text-anchor", "start")
        .attr("font-weight", "bold")
        .text(data.y));

        this.line = d3.line()
    .curve(d3.curveStep)
    .defined(d => !isNaN(d.value))
    .x(d => x(d.date))
    .y(d => y(d.value));

 this.bisectObj = {
  const bisect = d3.bisector(d => d.date).left;
  return mx => {
    const date = x.invert(mx);
    const index = bisect(data, date, 1);
    const a = data[index - 1];
    const b = data[index];
    return b && (date - a.date > b.date - date) ? b : a;
  };
}
    // this.data["columns"] = ["date", "Apples", "Bananas"];
    // this.series = this.data.columns
    //   .slice(1)
    //   .map((key) =>
    //     this.data.map(({ [key]: value, date }) => ({ key, date, value }))
    //   );
    // this.xAxis = (g) =>
    //   g
    //     .attr("transform", `translate(0,${this.height - this.margin.bottom})`)
    //     .call(
    //       d3
    //         .axisBottom(this.x)
    //         .ticks(this.width / 80)
    //         .tickSizeOuter(0)
    //     );
    // this.yAxis = (g) =>
    //   g
    //     .attr("transform", `translate(${this.margin.left},0)`)
    //     .call(d3.axisLeft(this.y))
    //     .call((g) => g.clone().text(this.data.y));
    // this.x = d3
    //   .scaleUtc()
    //   .domain([this.data[0].date, this.data[this.data.length - 1].date])
    //   .range([this.margin.left, this.width - this.margin.right]);
    // this.y = d3
    //   .scaleLinear()
    //   .domain([0, d3.max(this.series, (s) => d3.max(s, (d) => d.value))])
    //   .range([this.height - this.margin.bottom, this.margin.top]);
    // this.z = d3.scaleOrdinal(this.data.columns.slice(1), d3.schemeCategory10);
    // this.getConfig();
    console.log(data)
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
