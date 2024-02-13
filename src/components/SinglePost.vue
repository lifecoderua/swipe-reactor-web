<template>
  <h3>{{ post.user.username }}</h3>
  <div class="tags">
    <span
      v-for="tag in getTags(post)"
      :key="tag.id"
      class="tag"
    >
      {{ tag.name }}
    </span>
  </div>

  <swiper
    effect="coverflow"
    slidesPerView="auto"
    :centeredSlides="true"
    :grabCursor="true"
    :spaceBetween="30"
    :modules="swiperModules"
    class="single-post-swiper"
    direction="horizontal"
    :keyboard="{
      enabled: true,
    }"
    @keyPress="onKeyPress"
    @swiper="onSwiper"
    @slideChange="onSlideChange"
  >
    <swiper-slide
      v-for="image in getImages(post)"
      :key="image.id"
      class="swiper-slide"
    >
      <img
        :src="image.src"
        alt="post"
      />
    </swiper-slide>
  </swiper>
</template>

<script setup lang="ts">
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';
import { EffectCoverflow, Keyboard, Pagination, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import type { PropType } from 'vue'

defineProps(
  {
    post: {
      type: Object as PropType<any>,
      required: true,
    },
  }
);

const swiperModules = [EffectCoverflow, Keyboard, Pagination, Navigation];

const onSwiper = (swiper: any) => {
  console.log(swiper);
};

const onSlideChange = () => {
  console.log('slide change');
};

const onKeyPress = (swiper: any, event: any) => {
  //support a/d for navigation
  if (event === 65) {
    swiper.slidePrev();
  } else if (event === 68) {
    swiper.slideNext();
  }
};

const getImages = (post: any): any[] => {
  return post.attributes.map((attr: any) => {
    if (attr.image) {
      return {
        id: attr.id,
        src: getImageSrc(attr)
      }
    }
  });
}

const getImageSrc = (attr: any) => {
  const image = attr.image;
  // const tags = post.tags.map((tag: any) => tag.name);
  const imagePostId = atob(attr.id).split(':')[1];
  return `https://img10.joyreactor.cc/pics/post/image-${imagePostId}.${image.type}`;
}

const getTags = (post: any): any[] => {
  return post.tags.map((tag: any) => ({
    id: tag.id,
    name: tag.name
  }));
}
</script>

<style scoped lang="less">
.single-post-swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 18px;
  font-size: 22px;
  font-weight: bold;
  color: #fff;

  img {
    max-width: 90%;
    max-height: 90%;
  }
}

.tag {
  color: darkolivegreen;
  font-weight: bold;
  display: inline-block;
  margin: 5px;
}
</style>
