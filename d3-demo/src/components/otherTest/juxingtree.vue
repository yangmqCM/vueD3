<template>
  <div id="myChart" style="width:1200px;height:600px;"></div>
</template>
<script>
import dataJson from "./data/juxingtree.json";
export default {
  name: "juxingtree",
  data() {
    return {
      formatUtil: "",
      diskData: dataJson,
      option:{},
      myChart:"",
    };
  },
  mounted() {
  console.log(this.$echarts)
   this.myChart = this.$echarts.init(document.getElementById("myChart"));
    // this.myChart.hideLoading();
    this.formatUtil = this.$echarts.format;

    this.myChart.setOption(
      (this.option = {
        title: {
          text: "Disk Usage",
          left: "center",
        },

        tooltip: {
          formatter: function(info) {
            var value = info.value;
            var treePathInfo = info.treePathInfo;
            var treePath = [];

            for (var i = 1; i < treePathInfo.length; i++) {
              treePath.push(treePathInfo[i].name);
            }

            return [
              '<div class="tooltip-title">' +
                this.formatUtil.encodeHTML(treePath.join("/")) +
                "</div>",
              "Disk Usage: " + this.formatUtil.addCommas(value) + " KB",
            ].join("");
          },
        },

        series: [
          {
            name: "Disk Usage",
            type: "treemap",
            visibleMin: 300,
            label: {
              show: true,
              formatter: "{b}",
            },
            itemStyle: {
              borderColor: "#fff",
            },
            levels: this.getLevelOption(),
            data: this.diskData,
          },
        ],
      })
    );
  },
  methods: {
    getLevelOption() {
      return [
        {
          itemStyle: {
            borderWidth: 0,
            gapWidth: 5,
          },
        },
        {
          itemStyle: {
            gapWidth: 1,
          },
        },
        {
          colorSaturation: [0.35, 0.5],
          itemStyle: {
            gapWidth: 1,
            borderColorSaturation: 0.6,
          },
        },
      ];
    },
    colorMappingChange(value) {
      var levelOption = this.getLevelOption(value);
      this.myChart.setOption({
        series: [
          {
            levels: levelOption,
          },
        ],
      });
    },
  },
};
</script>
