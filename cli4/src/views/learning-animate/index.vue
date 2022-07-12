<script>
import AnimateCss from './components/AnimateCss.vue';
import Airplane from './components/native-a/Airplane.vue';
import Keyframes from './components/native-a/Keyframes.vue';
import NativeAnimation from './components/native-a/NativeAnimation.vue';
import NumPingyi from './components/native-a/NumPingyi.vue';
import NumPingyiDelay from './components/native-a/NumPingyiDelay.vue';
import NumTiaodong from './components/native-a/NumTiaodong.vue';
import TrainYunsu from './components/native-a/TrainYunsu.vue';
import TransitionComp from './components/TransitionComp.vue';
export default {
  name: 'LearningAnimate',
  components: {
    AnimateCss,
    TransitionComp,
    NativeAnimation,
    NumPingyi,
    NumPingyiDelay,
    TrainYunsu,
    NumTiaodong,
    Keyframes,
    Airplane,
  },
  render(h) {
    return (
      <div>
        <h3>原生动画</h3>
        <NativeAnimation class="inlineB" />
        <h6 class="inlineB marginLB">无动画效果作为对比</h6>
        <p>----分割线----</p>

        <NumPingyi class="inlineB marginLB" />
        <NumPingyiDelay class="inlineB marginLB" />
        {/**start 表示在动画开始时，我们需要立即开始第一段的动画。 */}
        <NumTiaodong class="inlineB marginLB" cls="start" />
        {/**另一个值 end 表示：改变不应该在最开始的时候发生，而是发生在每一段的最后时刻。 */}
        <NumTiaodong class="inlineB marginLB" cls="end" />
        <p>----分割线----</p>

        <TrainYunsu cls="yunsu" />
        <p>----分割线----</p>
        {/**用名词替换一种贝塞尔曲线, 方便写 */}
        <TrainYunsu cls="jiansu" />
        <p>----分割线----</p>
        <TrainYunsu cls="ease-out" />
        <p>----分割线----</p>

        <TrainYunsu cls="fanxiang" />
        <p>----分割线----</p>

        <Keyframes />
        <p>----分割线----</p>

        <Airplane />
        <p>----分割线----</p>

        <iframe src="/html/circle.html" class="iframeStyle" />
        <p>----分割线----</p>

        <iframe src="/html/circle-callback.html" class="iframeStyle" />
        <el-divider></el-divider>

      </div>
    )
  }
};
</script>

<style scoped lang="scss">
::v-deep {
  h6 {
    font-size: 32px;
  }
  h6:hover {
    color: red;
  }
}

.iframeStyle {
  width: 60%;
  height: 300px;
  border: 1px solid #000;
  overflow: auto;
}
</style>
