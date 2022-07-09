<script>
export default {
  name: 'TransitionComp',
  components: {
  },
  props: {
  },
  data() {
    return {
      show: true
    };
  },
  computed: {
  },
  watch: {
  },
  created() {
  },
  mounted() {
  },
  methods: {
    hide() {
      this.show = !this.show
    }
  },
};
</script>

<template>
  <div>
    <button @click="hide">动画</button>
    <transition enter-active-class="come" leave-active-class="go">
      <p v-show="show">Animate.css</p>
    </transition>
  </div>
</template>

<style scoped lang="scss">
@keyframes comein {
  0% {
    transform: translateX(-120px);
  }
  100% {
    transform: translateX(0px);
  }
}
@keyframes comeout {
  0% {
    transform: translateX(0px);
  }
  100% {
    transform: translateX(-120px);
  }
}
.come {
  animation: comein 1s;
}
.go {
  animation: comeout 1s;
}
</style>
