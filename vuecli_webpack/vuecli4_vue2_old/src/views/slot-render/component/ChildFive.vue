<template>
  <blog-post>
    <template #header>
      <h1>About Me</h1>
    </template>

    <p>Here's some page content, which will be included in vm.$slots.default, because it's not inside a named slot.
    </p>

    <template #footer>
      <p>Copyright 2016 Evan You</p>
    </template>

    <p>If I have some content down here, it will also be included in vm.$slots.default.</p><br>
  </blog-post>
</template>

<script>
import BlogPost from './common/BlogPost.vue'

export default {
  name: 'ChildFive',
  components: {
    BlogPost
  },
};
</script>
