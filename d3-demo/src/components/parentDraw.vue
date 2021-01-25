<template>
  <div id="parentDraw" style="width:1200px;height:600px;"></div>
</template>
<script>
import dataJson from "./data/selfDrow.json";
export default {
  name: "parentDraw",
  data() {
    return {
      rawData: dataJson,
      option: {},
      myChart: "",
      formatUtil: "",
    };
  },
  mounted() {
    this.myChart = this.$echarts.init(document.getElementById("parentDraw"));
    this.formatUtil = this.$echarts.format;
    let that = this;
    that.myChart.setOption(
      (that.option = {
        title: {
          text: "2020年GMV",
          left: "center",
          show: true,
          shadowColor: "#c23531",
          shadowBlur: 10,
          shadowOffsetX: 5,
          shadowOffsetY: 5,
          padding:[5,15,5,15],
          borderRadius: [50, 5, 50, 5],
          borderColor: "orange",
          backgroundColor: "orange",
          textStyle: {
            color: "#c23531",
          },
        },
        tooltip: {
          backgroundColor: "#152124",
          trigger: "item",
          textStyle: {
            color: "#FAC61B",
          }, 
          formatter: function(info) {
            var value = info.value;
            var treePathInfo = info.treePathInfo;
            var treePath = [];
            for (var i = 1; i < treePathInfo.length; i++) {
              treePath.push(treePathInfo[i].name);
            }
            return [
              '<div class="tooltip-title">' +
                that.formatUtil.encodeHTML(treePath.join("/")) +
                "</div>",
              "GMV: " + that.formatUtil.addCommas(value) + "美元",
            ].join("");
          },
        },
        series: [
          {
            name: "2020年GMV",
            type: "treemap",
            nodeClick: "zoomToNode", //false：节点点击无反应。  'zoomToNode'：点击节点后缩放到节点(默认值)。 'link'：如果节点数据中有 link 点击节点后会进行超链接跳转。
            breadcrumb: {
              show: true,
              left: "center",
              right: "center",
              emptyItemWidth: 25,
              itemStyle: {
                color: "#152124",
                borderColor: "#a22c29",
                textStyle: {
                  color: "orange",
                },
              },
            },
            visibleMin: 300, //节点面积小于这个平方，节点不显示
            childrenVisibleMin: 300, //如果某个节点的矩形面积，小于这个数值（单位：px平方），则不显示这个节点的子节点。
            // leafDepth:2,//默认展示2级
            label: {
              show: true,
              formatter: "{b}",
              color: "orange",
            },
            upperLabel: {
              show: true, //upperLabel 用于显示矩形的父节点的标签
              height: 30,
              color: "orange",
              fontWeight: "bold",
            },
            emphasis: {
              upperLabel: { color: "orange" },

              textStyle: {
                color: "orange",
              },
            },
            // colorAlpha: [0.3, 1], //本系列默认的 颜色透明度 选取范围。数值范围 0 ~ 1。
            itemStyle: {
              // color:"blue",
              shadowColor: "rgba(0, 0, 0, 0.5)",
              shadowBlur: 20, //图形阴影的模糊大小
              borderColorSaturation: 0.4, //如果设置此属性，则 borderColor 的设置无效，而是：取当前节点计算出的颜色（比如从父节点遗传而来），在此颜色值上设置 borderColorSaturation 得到最终颜色。这种方式，能够做出『不同区块有不同色调的矩形间隔线』的效果，能够便于区分层级。
            },
            // colorSaturation: [0.5, 1], //矩形颜色的饱和度。取值范围是 0 ~ 1 之间的浮点数。
            visualDimension: 2, //visualDimension number treemap 中支持对数据其他维度进行视觉映射
            levels: that.getLevelOption(),
            data: that.rawData, //name显示在矩形中的描述文字
          },
        ],
      })
    );
  },
  methods: {
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
    getLevelOption() {
      //最常用的是『每个层级进行配置』，levels 配置项就是每个层级的配置
      //于 sereis-treemap 根下，表示本系列全局的统一设置。
      // 于 series-treemap.levels 的每个数组元素中，表示树每个层级的统一设置。
      // 于 series-treemap.data 的每个节点中，表示每个节点的特定设置。
      return [
        {
          itemStyle: {
            borderColor: "#fa6873", //最外层1

            borderWidth: 11,
          },
          upperLabel: {
            show: false,
          },
        },
        {
          itemStyle: {
            borderWidth: 5,
            gapWidth: 1,
          },
        },
        {
          itemStyle: {
            borderWidth: 5,
            gapWidth: 1,
          },
        },
        {
          itemStyle: {
            borderWidth: 5,
            gapWidth: 1,
          },
        },
        {
          itemStyle: {
            borderWidth: 5,
            gapWidth: 1,
            borderColorSaturation: 0.38,
          },
        },
      ];
    },
  },
};
</script>
