<template>
  <swiper
    class="swiper"
    :slides-per-view="1"
    :space-between="50"
    direction="vertical"
    :keyboard="{
      enabled: true,
    }"
    :mousewheel="{
      enabled: true,
      sensitivity: 1,
      thresholdDelta: 15,
      thresholdTime: null,
    }"
    :navigation="true"
    :modules="swiperModules"
    @swiper="onSwiper"
    @slideChange="onSlideChange"
  >
    <swiper-slide
      v-for="post in posts"
    >
      <h3>{{ post.user.username }}</h3>
      <img
        :src="getImageSrc(post)"
        alt="post"
      />
    </swiper-slide>
  </swiper>
</template>
<script setup lang="ts">
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

const getImageSrc = (post: any) => {
  if (!post.attributes?.[0]?.image) {
    return undefined;
  }

  const image = post.attributes[0].image;
  const tags = post.tags.map((tag: any) => tag.name);
  const imagePostId = atob(post.attributes[0].id).split(':')[1];
  return `https://img10.joyreactor.cc/pics/post/image-${imagePostId}.${image.type}`;
}
</script>

<style lang="less">
.swiper {
  margin: 0 auto;
  width: 600px;
  height: 300px;

  img {
    max-width: 100%;
    max-height: 100%;
  }
}
</style>
