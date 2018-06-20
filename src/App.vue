<template>
  <div id="app">
    <h1>Static Image Viewer</h1>
    <span>powerd by utano320</span>

    <div id="imagebox">
      <ImageItem
        v-for="i in maxImageCount"
        :key="i"
        :index="i"
        :box-size="300"
        :hover-index="hoverIndex"
        :select-index="selectIndex"
        :update-image-count="updateImageCount"
        :on-mouse-over="onMouseOverImageItem"
        :on-mouse-out="onMouseOutImageItem"
        :on-click="onClickImageItem"
      />
    </div>

    <ImageViewer
      :select-index="selectIndex"
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
  name: 'App',
  data() {
    return {
      maxImageCount: 50,
      loadedImageCount: 0,
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
    window.addEventListener('keydown', this.onKeyDown, false);
  },
  beforeDestroy: function() {
    window.removeEventListener('resize', this.onResize, false);
    window.removeEventListener('keydown', this.onKeyDown, false);
  },
  methods: {
    updateImageCount(index) {
      this.loadedImageCount = Math.max(index, this.loadedImageCount);
      console.log(['updateImageCount', index]);
    },
    onMouseOverImageItem(i, e) {
      this.hoverIndex = i;
    },
    onMouseOutImageItem() {
      this.hoverIndex = 0;
    },
    onClickImageItem(i, e) {
      this.selectIndex = i;
    },
    onKeyDown(e) {
      let k = e.keyCode;

      if (k === 27) {
        // ESC
        this.selectIndex = 0;
      } else if (k === 39) {
        // 右
        if (this.selectIndex === this.loadedImageCount) {
          // 最後の画像 ⇒ 最初の画像
          this.selectIndex = 1;
        } else if (this.selectIndex < this.loadedImageCount) {
          // 次の画像
          this.selectIndex++;
        }
      } else if (k === 37) {
        // 左
        if (this.selectIndex <= 1) {
          // 最初の画像 ⇒ 最後の画像
          this.selectIndex = this.loadedImageCount;
        } else if (this.selectIndex > 1) {
          this.selectIndex--;
        }
      }

      console.log(k);
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