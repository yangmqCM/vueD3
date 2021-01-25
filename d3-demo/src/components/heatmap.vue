<template>
  <div id="heatmap" style="width:700px;height:auto;"></div>
</template>
<script>
import dataJson from "./data/hotmapData.json";
export default {
  name: "heatmap",
  data() {
    return {
      rawData: dataJson,
    };
  },
  mounted() {
    this.myChart = this.$echarts.init(document.getElementById("heatmap"));
    let that = this;
    that.myChart.setOption(
      (that.option = {
        title: {
          text: "2020年代码提交量",
          left: "center",
          show: true,
          shadowColor: "#5e2ca7",
          shadowBlur: 10,
          shadowOffsetX: 5,
          shadowOffsetY: 5,
          padding: [5, 15, 5, 15],
          borderRadius: [1],
          borderColor: "#eb2630",
          backgroundColor: "#fff85f",
          textStyle: {
            color: "#182cbf",
          },
        },
        tooltip: {},
        visualMap: {
          min: 0,
          max: 10000,
          type: "piecewise",
          orient: "horizontal", //日历坐标的布局朝向。//'horizontal' 'vertical'
          left: "center",
          top: 5,
          seriesIndex: 0,
          show: false,
          calculable: true,
          inRange: {
            color: ["#fff45e", "#15a2fa", "#315cf6", "#5b5afd", "#fc293a"],
          },
          textStyle: {
            color: "#000",
          },
        },
        calendar: {
          top: 70,
          left: 30,
          right: 30,
          cellSize: ["auto", 20], //第一个元素是宽 第二个元素是高。 支持设置自适应：auto, 默认为高宽均为20  ["auto",20]
          range: "2020", // 某一年 // 某个月 range: '2017-02'  // 某个区间range: ['2017-01-02', '2017-02-23'] // 注意 此写法会识别为['2017-01-01', '2017-02-01'] 
          splitLine: {
            show: true,
          }, 
          itemStyle: {
            color: "#fff",
            borderWidth: 0.5,
            borderColor: "#e82430", 
            shadowColor: "rgba(0, 0, 0, 0.5)",
            shadowBlur: 10,
          },
          dayLabel: { show: true, color: "#fff", fontWeight: 500, textBorderColor:"#5b5afd", nameMap:"cn",},//星期
          monthLabel: {//月份
            show: true,
            color: "#fff",
            fontWeight: 500,
            nameMap:"cn",//中英文显示
            textBorderColor:"#5b5afd"
          }, 
          yearLabel: { show: false },
        },
        series: {
          type: "heatmap",
          coordinateSystem: "calendar",//日历
          data: that.getVirtulData(2020), //that.rawData
        },
      })
    );
  },
  methods: {
    getVirtulData(year) {
      year = year || "2017";
      var date = +this.$echarts.number.parseDate(year + "-01-01");
      var end = +this.$echarts.number.parseDate(+year + 1 + "-01-01");
      var dayTime = 3600 * 24 * 1000;
      var data = [];
      for (var time = date; time < end; time += dayTime) {
        data.push([
          this.$echarts.format.formatTime("yyyy-MM-dd", time),
          Math.floor(Math.random() * 10000),
        ]);
      }
      console.log(data);
      return data;
    },
  },
};
</script>
