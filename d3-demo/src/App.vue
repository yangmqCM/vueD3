<template>
  <div id="app">
    <!-- <div class="line-one">
      <line1 msg="line1" />
      <juxingtreeDrow></juxingtreeDrow>
    </div>
    <div class="line-one">
      <sankey></sankey>
      <heatmap></heatmap>
    </div> -->
    <div class="line-one">
      <parentDraw></parentDraw>
      <div>
        <heatmap></heatmap>
        <bmap-heatmap></bmap-heatmap>
      </div>
    </div>
    <!-- <line2 msg="line1"/> -->

    <!-- <juxingtree></juxingtree> -->
  </div>
</template>

<script>
// import line1 from "./components/line1.vue";
// import juxingtree from "./components/juxingtree.vue";
// import juxingtreeDrow from "./components/juxingtreeDrow.vue";
// import sankey from "./components/sankey.vue";
// import heatmap from "./components/heatmap.vue";
import parentDraw from "./components/parentDraw.vue";
import heatmap from "./components/heatmap.vue";
import bmapHeatmap from "./components/bmap-heatmap.vue";
// import line2 from './components/line2.vue'    juxingtree,
//  line1,
// juxingtreeDrow,
// sankey,
// heatmap,
export default {
  name: "App",
  components: {
    parentDraw,
    heatmap,
    bmapHeatmap
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  margin: 60px auto 60px auto;
}
.line-one {
  display: flex;
}
</style>
