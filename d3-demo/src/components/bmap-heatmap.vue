<template>
  <div id="bmap-heatmap" style="width:700px;height:auto;"></div>
</template>
<script>
import bmapHeadMap from "./data/hotmapData.json";
export default {
  name: "bmap-heatmap",
  data() {
    return {
      rawData: bmapHeadMap,
    };
  },
  mounted() {
    this.getPoint();
    // 添加百度地图插件

    this.myChart = this.$echarts.init(document.getElementById("bmap-heatmap"));
    var bmap = this.myChart
      .getModel()
      .getComponent("bmap")
      .getBMap();
    bmap.addControl(new BMap.MapTypeControl());
    let that = this;
    that.myChart.setOption(
      (that.option = {
        animation: false,
        bmap: {
          center: [120.13066322374, 30.240018034923],
          zoom: 14,
          roam: true,
        },
        visualMap: {
          show: false,
          top: "top",
          min: 0,
          max: 5,
          seriesIndex: 0,
          calculable: true,
          inRange: {
            color: ["blue", "blue", "green", "yellow", "red"],
          },
        },
        series: [
          {
            type: "heatmap",
            coordinateSystem: "bmap",
            data: that.points,
            pointSize: 5,
            blurSize: 6,
          },
        ],
      })
    );
  },
  methods: {
    getPoint() {
      this.points = [].concat.apply(
        [],
        this.rawData.map(function(track) {
          return track.map(function(seg) {
            return seg.coord.concat([1]);
          });
        })
      );
    },
  },
};
</script>
