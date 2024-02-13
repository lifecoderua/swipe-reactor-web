import { defineStore } from 'pinia'

export const usePostsStore = defineStore('posts', {
  state: () => ({
    offset: 0,
    activeIndex: 0,
    posts: [],
  }),
  actions: {
    navigate(activeIndex: number) {
      this.activeIndex = activeIndex;
    },
  },
})
