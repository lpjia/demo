<script>
export default {
  name: 'TextDocument',
  props: ['title', 'id'],
  methods: {
    updatTitle() {
      // 主动触发 'update:xxx' 来修改父
      this.$emit('update:title', '新标题')
    },
  },
  render(h) {
    return (
      <div>
        <h4 class="inlineB" style="margin-right: 10px;">{this.title}</h4>
        <span onclick={this.updatTitle} style="cursor: pointer;">编号: {this.id}</span>
        <p>{this.$scopedSlots.default()}</p>
      </div>
    )
  }
};
</script>
