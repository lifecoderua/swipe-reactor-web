<template>
  <swiper
    class="swiper"
    :slides-per-view="1"
    :space-between="50"
    direction="vertical"
    :keyboard="{
      enabled: true,
    }"
    @keyPress="onKeyPress"
    :mousewheel="{
      enabled: true,
      sensitivity: 1,
      thresholdDelta: 0,
      thresholdTime: null,
    }"
    :navigation="true"
    :modules="swiperModules"
    @swiper="onSwiper"
    @slideChange="onSlideChange"
  >
    <swiper-slide
      v-for="post in posts"
      :key="post.id"
    >
      <single-post :post="post" />
    </swiper-slide>
  </swiper>
</template>
<script setup lang="ts">
import SinglePost from '@/components/SinglePost.vue'

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Keyboard, Mousewheel, Pagination, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';

defineProps(
  {
    posts: {
      type: Array<any>,
      required: true,
    },
  }
);

const swiperModules = [Keyboard, Mousewheel, Pagination, Navigation];

const onSwiper = (swiper: any) => {
  console.log(swiper);
};

const onSlideChange = () => {
  console.log('slide change');
};

const onKeyPress = (swiper: any, event: any) => {
  // support w/s for slide change
  if (event === 87) {
    swiper.slidePrev();
  } else if (event === 83) {
    swiper.slideNext();
  }
};
</script>

<style lang="less" scoped>
.swiper {
  margin: 0 auto;
  width: 80vw;
  height: 80vh;
}
</style>
