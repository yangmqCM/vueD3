<template>
  <div id="myChart1" style="width:1200px;height:600px;"></div>
</template>
<script>
import dataJson from "./data/drow.json";
export default {
  name: "juxingtree",
  data() {
    return {
      rawData: dataJson,
      option: {},
      myChart: "",
    };
  },
  mounted() {
    this.myChart = this.$echarts.init(document.getElementById("myChart1"));
    var data = [];
    this.convert(this.rawData, data, "");

    this.myChart.setOption(
      (this.option = {
        title: {
          text: "ECharts 配置项查询分布",
          subtext: "2016/04",
          left: "leafDepth",
        },
        tooltip: {},
        series: [
          {
            name: "option",
            type: "treemap",
            visibleMin: 300,
            data: data.children,
            upperLabel: {
              show: true, //upperLabel 用于显示矩形的父节点的标签
              height: 30,
            },
            leafDepth: 2,
            levels: [
              {
                itemStyle: {
                  borderColor: "#555",
                  borderWidth: 4,
                  gapWidth: 4,
                },
              },
              {
                colorSaturation: [0.3, 0.6],
                itemStyle: {
                  borderColorSaturation: 0.7,
                  gapWidth: 2,
                  borderWidth: 2,
                },
              },
              {
                colorSaturation: [0.3, 0.6],
                itemStyle: {
                  borderColorSaturation: 0.7,
                  gapWidth: 2,
                  borderWidth: 2,
                },
              },
              {
                colorSaturation: [0.3, 0.6],
                itemStyle: {
                  borderColorSaturation: 0.7,
                  gapWidth: 2,
                  borderWidth: 2,
                },
              },
              {
                colorSaturation: [0.3, 0.6],
                itemStyle: {
                  borderColorSaturation: 0.7,
                  gapWidth: 2,
                  borderWidth: 2,
                },
              },

              {
                colorSaturation: [0.3, 0.6],
                itemStyle: {
                  borderColorSaturation: 0.7,
                  gapWidth: 2,
                  borderWidth: 2,
                },
              },
              {
                colorSaturation: [0.3, 0.5],
                itemStyle: {
                  borderColorSaturation: 0.6,
                  gapWidth: 1,
                },
              },
               {
                colorSaturation: [0.3, 0.5],
                itemStyle: {
                  borderColorSaturation: 0.6,
                  gapWidth: 1,
                },
              },
              {
                colorSaturation: [0.3, 0.5],
              },
            ],
          },
        ],
      })
    );
  },
  methods: {
    convert(source, target, basePath) {
      for (var key in source) {
        var path = basePath ? basePath + "." + key : key;
        if (!key.match(/^\$/)) {
          target.children = target.children || [];
          var child = {
            name: path,
          };
          target.children.push(child);
          this.convert(source[key], child, path);
        }
      }

      if (!target.children) {
        target.value = source.$count || 1;
      } else {
        target.children.push({
          name: basePath,
          value: source.$count,
        });
      }
    },
  },
};
</script>
