<template>
  <div id="myChartHeatmap" style="width:600px;height:600px;"></div>
</template>

<script>
export default {
  name: "myChartHeatmap",
  data() {
    return {
      option: {},
    };
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
          Math.floor(Math.random() * 1000),
        ]);
      }
      return data;
    },
  },
  mounted() {
    let that = this;
    that.option = {
      tooltip: {
        position: "top",
        formatter: function(p) {
          var format = that.$echarts.format.formatTime("yyyy-MM-dd", p.data[0]);
          return format + ": " + p.data[1];
        },
      },
      visualMap: {
        min: 0,
        max: 1000,
        calculable: true,
        orient: "vertical",
        left: "670",
        top: "center",
      },

      calendar: [
        {
          orient: "vertical",
          range: "2015",
        },
        {
          left: 300,
          orient: "vertical",
          range: "2016",
        },
        {
          left: 520,
          cellSize: [20, "auto"],
          bottom: 10,
          orient: "vertical",
          range: "2017",
          dayLabel: {
            margin: 5,
          },
        },
      ],

      series: [
        {
          type: "heatmap",
          coordinateSystem: "calendar",
          calendarIndex: 0,
          data: that.getVirtulData(2015),
        },
        {
          type: "heatmap",
          coordinateSystem: "calendar",
          calendarIndex: 1,
          data: that.getVirtulData(2016),
        },
        {
          type: "heatmap",
          coordinateSystem: "calendar",
          calendarIndex: 2,
          data: that.getVirtulData(2017),
        },
      ],
    };
    console.log(that.getVirtulData(2015));
    this.myChart = that.$echarts.init(
      document.getElementById("myChartHeatmap")
    );
    this.myChart.setOption(that.option);
  },
};
</script>
