<template>
  <div
    v-show="!isFixed || isExists"
    class="image-wrapper"
    :style="imageWrapperStyle()"
    @mouseover="onMouseOver(index, $event)"
    @mouseout="onMouseOut()"
    @click="onClick(index, $event)"
  >
    <transition>
      <img
        v-show="isFixed"
        :id="id()"
        :src="'images/' + imageFileName()"
        :alt="imageFileName()"
        @load="onLoad" @error="onError"
      />
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    index: {
      type: Number,
      default: 0
    },
    boxSize: {
      type: Number,
      default: 100
    },
    hoverIndex: {
      type: Number,
      default: 0
    },
    selectIndex: {
      type: Number,
      default: 0
    },
    onMouseOver: {
      type: Function,
      default: null
    },
    onMouseOut: {
      type: Function,
      default: null
    },
    onClick: {
      type: Function,
      default: null
    }
  },
  data() {
    return {
      isExists: false,
      isLoaded: false,
      isFixed: false,
      opacity: 0
    };
  },
  methods: {
    imageWrapperStyle() {
      return {
        width: this.boxSize + 'px',
        height: this.boxSize + 'px',
        opacity: this.isExists ? (this.hoverIndex === 0 || this.isHover() ? 1 : 0.5) : 0
      };
    },
    isHover() {
      return this.hoverIndex === this.index;
    },
    isSelect() {
      return this.selectIndex === this.index;
    },
    id() {
      return 'image-item_' + this.index;
    },
    imageFileName() {
      return _.padStart(this.index, 2, 0) + '.jpg';
    },
    onLoad(e) {
      let el = e.target;

      let w = el.width;
      let h = el.height;

      if (w > this.boxSize && w > h) {
        // width が boxSize を超えていて、横長の画像の場合
        //  ------------------------------
        //   w : h = this.boxSize : x
        //   w * x = h * this.boxSize
        //       x = h * this.boxSize / w
        //       x = h * ratio
        //  ------------------------------
        let ratio = this.boxSize / w;
        el.width = this.boxSize;
        el.height = h * ratio;
      } else if (h > this.boxSize && h > w) {
        // height が boxSize を超えていて、縦長の画像の場合
        //  ------------------------------
        //   w : h = x : this.boxSize
        //   h * x = w * this.boxSize
        //       x = w * this.boxSize / h
        //       x = h * ratio
        //  ------------------------------
        let ratio = this.boxSize / h;
        el.width = w * ratio;
        el.height = this.boxSize;
      }

      this.isExists = true;
      this.isFixed = true;
    },
    onError() {
      this.isFixed = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.image-wrapper {
  // border-radius: 0.2em;
  background-color: #efefef;
  margin: 10px;
  position: relative;
  cursor: pointer;
  &:hover {
    background-color: #ccc;
  }
  img {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;

    &.v-enter-active,
    &.v-leave-active {
      transition: opacity 3s;
    }
    &.v-enter,
    &.v-leave-to {
      opacity: 0;
    }
  }
}
</style>
