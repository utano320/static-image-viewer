<template>
  <div id="app">
    <h1>Static Image Viewer</h1>
    <span>powerd by utano320</span>

    <div id="imagebox">
      <ImageItem v-for="i in maxImageCount" :key="i" :index="i" :box-size="100" />
    </div>


  </div>
</template>

<script>
import milligram from 'milligram';
import _ from 'lodash';
import ImageItem from './components/ImageItem.vue';

export default {
  data() {
    return {
      maxImageCount: 50
    };
  },
  components: {
    ImageItem
  }
};
</script>

<style lang="scss" scoped>
#imagebox {
  display: flex;
  flex-flow: wrap;
}
</style>