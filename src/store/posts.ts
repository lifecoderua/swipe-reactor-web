import { defineStore } from 'pinia'

export const usePostsStore = defineStore('posts', {

  state: () => ({
    offset: 0,
    activeIndex: 0,
  }),
  actions: {
    navigate(activeIndex: number) {
      this.activeIndex = activeIndex;
    },
    setOffset(offset: number) {
      this.offset = offset;
    },
    nextPage() {
      this.offset += 10;
    },
    init() {
      // this.posts = loadPosts();
    }
  },
})
