<template>
  <component :is="type" v-bind="linkProps(to)">
    <slot />
  </component>
</template>

<script>
import { isExternal } from '@/utils/validate'

export default {
  props: {
    to: {
      type: String,
      required: true
    }
  },
  computed: {
    isExternal() {
      return isExternal(this.to)
    },
    type() {
      return this.isExternal ? 'a' : 'router-link'
    }
  },
  methods: {
    linkProps(to) {
      return !this.isExternal ? { to } :
        {
          href: to,
          target: '_blank',
          rel: 'noopener'
        }
      // if (this.isExternal) {
      //   return {
      //     href: to,
      //     target: '_blank',
      //     rel: 'noopener'
      //   }
      // }
      // return {
      //   to: to
      // }
    }
  }
}
</script>
