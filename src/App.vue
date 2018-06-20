<template>
  <div id="app" @resize="onResize">
    <h1>Static Image Viewer</h1>
    <span>powerd by utano320 {{ selectIndex }}</span>

    <div id="imagebox">
      <ImageItem
        v-for="i in maxImageCount"
        :key="i"
        :index="i"
        :box-size="300"
        :hover-index="hoverIndex"
        :select-index="selectIndex"
        :on-mouse-over="onMouseOverImageItem"
        :on-mouse-out="onMouseOutImageItem"
        :on-click="onClickImageItem"
      />
    </div>

    <ImageViewer
      :app-width="appWidth"
      :app-height="appHeight"
    />

  </div>
</template>

<script>
import milligram from 'milligram';
import _ from 'lodash';
import ImageItem from './components/ImageItem.vue';
import ImageViewer from './components/ImageViewer.vue';

export default {
  data() {
    return {
      maxImageCount: 50,
      hoverIndex: 0,
      selectIndex: 0,
      appWidth: window.innerWidth,
      appHeight: window.innerHeight
    };
  },
  components: {
    ImageItem,
    ImageViewer
  },
  created: function() {
    window.addEventListener('resize', this.onResize, false);
  },
  beforeDestroy: function() {
    window.removeEventListener('resize', this.onResize, false);
  },
  methods: {
    onMouseOverImageItem(i, e) {
      this.hoverIndex = i;
    },
    onMouseOutImageItem() {
      this.hoverIndex = 0;
    },
    onClickImageItem(i, e) {
      this.selectIndex = i;
    },
    onResize: _.debounce(function() {
      this.appWidth = window.innerWidth;
      this.appHeight = window.innerHeight;
      console.log(['resize -- App', this.appWidth, this.appHeight]);
    }, 100)
  }
};
</script>

<style lang="scss" scoped>
#app {
  position: relative;
}

#imagebox {
  display: flex;
  flex-flow: wrap;
}
</style>