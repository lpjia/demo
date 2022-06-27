<script>
import AnchoredHeading from './AnchoredHeading.vue'

export default {
  name: 'ChildNine',
  render(h) {
    return (
      <div>
        <AnchoredHeading level={1}>Hello world!</AnchoredHeading>
        <AnchoredHeading level={2}>Hello world 2!</AnchoredHeading>
        <AnchoredHeading level={3}>Hello world 3!</AnchoredHeading>
        <el-divider></el-divider>
      </div>
    )
  },
};
</script>
