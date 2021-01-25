<template>
  <div class="hello" ref="chart" style="width:600px;height:600px;"></div>
</template>

<script>
import * as d3 from "d3";
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
      data: [
        { date: new Date(2009, 1, 1), Apples: 130, Bananas: 40 },
        { date: new Date(2010, 1, 1), Apples: 137, Bananas: 58 },
        { date: new Date(2011, 1, 1), Apples: 166, Bananas: 97 },
        { date: new Date(2012, 1, 1), Apples: 154, Bananas: 117 },
        { date: new Date(2013, 1, 1), Apples: 179, Bananas: 98 },
        { date: new Date(2014, 1, 1), Apples: 187, Bananas: 120 },
        { date: new Date(2015, 1, 1), Apples: 189, Bananas: 84 },
      ],

      series: [],
    };
  },
  methods: {
    getConfig() {
      this.svg = d3
        .create("svg")
        .attr("viewBox", [0, 0, this.width, this.height]);
      this.svg.append("g").call(this.xAxis);
      this.svg.append("g").call(this.yAxis);
      this.serie = this.svg
        .append("g")
        .selectAll("g")
        .data(this.series)
        .join("g");

      // this.serie
      //   .append("path")
      //   .attr("fill", "none")
      //   .attr("stroke", (d) => this.z(d[0].key))
      //   .attr("stroke-width", 1.5)
      //   .attr(
      //     "d",
      //     d3
      //       .line()
      //       .x((d) => {
      //         this.x(d.date);
      //       })
      //       .y((d) => {
      //         this.y(d.value);
      //       })
      //   );
      this.serie
        .append("path")
        .attr("fill", "none")
        .attr("stroke", (d) => this.z(d[0].key))
        .attr("stroke-width", 1.5)
        .attr(
          "d",
          d3
            .line()
            .x((d) => this.x(d.date))
            .y((d) => this.y(d.value))
        );

      this.serie
        .append("g")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
        .attr("stroke-linecap", "round")
        .attr("stroke-linejoin", "round")
        .attr("text-anchor", "middle")
        .selectAll("text")
        .data((d) => d)
        .join("text")
        .text((d) => d.value)
        .attr("dy", "0.35em")
        .attr("x", (d) => this.x(d.date))
        .attr("y", (d) => this.y(d.value))
        .call((text) =>
          text
            .filter((d, i, data) => i === data.length - 1)
            .append("tspan")
            .attr("font-weight", "bold")
            .text((d) => ` ${d.key}`)
        )
        .clone(true)
        .lower()
        .attr("fill", "none")
        .attr("stroke", "white")
        .attr("stroke-width", this.labelPadding);
      this.$refs.chart.appendChild(this.svg.node());
    },
  },
  mounted() {
    this.data["columns"] = ["date", "Apples", "Bananas"];
    this.series = this.data.columns
      .slice(1)
      .map((key) =>
        this.data.map(({ [key]: value, date }) => ({ key, date, value }))
      );
    this.xAxis = (g) =>
      g
        .attr("transform", `translate(0,${this.height - this.margin.bottom})`)
        .call(
          d3
            .axisBottom(this.x)
            .ticks(this.width / 80)
            .tickSizeOuter(0)
        );
    this.yAxis = (g) =>
      g
        .attr("transform", `translate(${this.margin.left},0)`)
        .call(d3.axisLeft(this.y)) 
        .call((g) => g.clone().text(this.data.y));
    this.x = d3
      .scaleUtc()
      .domain([this.data[0].date, this.data[this.data.length - 1].date])
      .range([this.margin.left, this.width - this.margin.right]);
    this.y = d3
      .scaleLinear()
      .domain([0, d3.max(this.series, (s) => d3.max(s, (d) => d.value))])
      .range([this.height - this.margin.bottom, this.margin.top]);
    this.z = d3.scaleOrdinal(this.data.columns.slice(1), d3.schemeCategory10);
    this.getConfig();
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
