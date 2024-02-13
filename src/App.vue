<template>
  <div id="app">
    <h1>Offset: {{ postsStore.offset }}</h1>
    <PostsList
      :posts="posts"
      @onSlideChange="onSlideChange"
    />
  </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import PostsList from '@/components/PostsList.vue'
import { usePostsStore } from '@/store/posts'
import { computed, reactive } from 'vue'

const GET_POSTS = gql`
    query GetPosts($tagName: String, $type: PostLineType!, $page: Int, $offset: Int) {
    tag(name: $tagName) {
      postPager(type: $type) {
        posts(page: $page, offset: $offset) {
          header,
          text,
          nsfw,
          attributes {
            __typename
            type
            id
            insertId
            image {
              id
              width
              height
              type
              hasVideo
              comment
            }
          },
          tags {
            name
          },
          user {
            username
          },
          id
        }
        count
      }
    },
  }`;

const postsStore = usePostsStore();

const tagName = null;

const { result, fetchMore } = useQuery(GET_POSTS, reactive({
  tagName,
  type: 'GOOD',
  page: 0,
  offset: postsStore.offset,
}));
/*
const query = useQuery(GET_POSTS, reactive({
  tagName,
  type: 'GOOD',
  page: 0,
  offset: postsStore.offset,
}));

query.onResult((result) => {
  console.log(result);
});
*/

const posts = computed(() => {
  const filteredPosts = result?.value?.tag?.postPager?.posts
    .filter((post: any) => !post.nsfw)
    .filter((post: any) => post.attributes.some((attr: any) => attr.image));

  return filteredPosts || [];
});

function onSlideChange(navigationEvent: any) {
  if (posts.value.length - navigationEvent.activeIndex > 3) {
    return;
  }

  postsStore.nextPage();

  fetchMore({
    variables: {
      tagName,
      type: 'GOOD',
      page: 0,
      offset: postsStore.offset,
    },

    // concatenate old and new entries
    updateQuery: (previousResult, { fetchMoreResult }) => {
      const newEntriesPager = fetchMoreResult.tag.postPager;

      return {
        ...previousResult,
        tag: {
          postPager: {
            posts: [...previousResult.tag.postPager.posts, ...newEntriesPager.posts],
            count: newEntriesPager.count,
          },
        },
      };
    },
  });
}
</script>

<style scoped>
#app {
  display: flex;
  justify-content: center;
  align-items: center;
}

header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
