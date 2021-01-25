<template>
  <div id="myChart2" style="width:600px;height:600px;"></div>
</template>

<script>
import data from "./data/Sankey.json";
export default {
  name: "sankey",
  props: {
    msg: String,
  },
  data() {
    return {
      option: {},
      myChart: "",
      data:data,
    };
  },
  methods: {},
  mounted() {
    this.myChart = this.$echarts.init(document.getElementById("myChart2"));
    this.myChart.setOption(this.option = {
        title: {
          text: "Node Align Right",
        },
        tooltip: {
          trigger: "item",
          triggerOn: "mousemove",
        },
        animation: false,
        series: [
          {
            type: "sankey",
            focusNodeAdjacency: "allEdges",
            nodeAlign: "left",
            data: this.data.nodes,
            links: this.data.links,
            lineStyle: {
              color: "source",
              curveness: 0.5,
            },
          },
        ],
      }
    );
  
  },
};
</script>
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
