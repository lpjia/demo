<template>
  <el-container>
    <el-aside width="200px">Aside</el-aside>
    <el-container>
      <el-main style="background-color: #EAEBEF;">
        <!-- 等接口, 然后处理成动态, 也要保留静态页 -->
        <div class="top">
          <section>
            <div class="bar">
              <img src="@/assets/imgs/home/alarm.png">
              <span>报警数:</span>
              <span>6</span>
            </div>
          </section>
          <section>
            <div class="bar">
              <img src="@/assets/imgs/home/offline.png">
              <span>离线数:</span>
              <span>1</span>
            </div>
          </section>
        </div>

      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'side',
  components: {
  },
  props: {
  },
  data() {
    return {
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
  },
};
</script>

<style scoped lang="scss">
</style>
