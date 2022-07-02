<template>
  <div class="page">
    <!-- 浮动元素, 允许文本和内联元素环绕它, 
    但是对于块元素来说, 不能变成无规则形状来环绕, 只能是按矩形的形状, 
    但是块元素的内容要给浮动元素留出空间, 然后内容要环绕浮动元素 -->
    <div class="cls2">test<br>abcde</div>
    <div class="cls3">
      <span>---</span>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam perspiciatis consequatur dolorem modi, molestiae
      excepturi asperiores natus sed, suscipit dignissimos ipsa aliquam aperiam quasi mollitia veniam commodi! Rem, ea
      in placeat consequuntur doloribus odit ipsam est aspernatur. Tempore fuga doloribus nisi cumque, culpa quaerat
      quibusdam officia enim repellendus unde aperiam?
    </div>

    <h3>对照一</h3>
    <!-- 当给外层元素  marginLeft 10px, .cls 向右偏移了10px, 
    内容就不需要让出原来那么大的空间, $0.offsetLeft 就少了10px -->
    <div class="cls2">test<br>abcde</div>
    <div class="cls">
      <span>---</span>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam perspiciatis consequatur dolorem modi, molestiae
      excepturi asperiores natus sed, suscipit dignissimos ipsa aliquam aperiam quasi mollitia veniam commodi! Rem, ea
      in placeat consequuntur doloribus odit ipsam est aspernatur. Tempore fuga doloribus nisi cumque, culpa quaerat
      quibusdam officia enim repellendus unde aperiam?
    </div>

    <h3>对照二</h3>
    <!-- 当 marginLeft 值刚刚好时, 这时候 $0.offsetLeft 又===0 -->
    <div class="cls2">test<br>abcde</div>
    <div class="cls4">
      <span>---</span>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam perspiciatis consequatur dolorem modi, molestiae
      excepturi asperiores natus sed, suscipit dignissimos ipsa aliquam aperiam quasi mollitia veniam commodi! Rem, ea
      in placeat consequuntur doloribus odit ipsam est aspernatur. Tempore fuga doloribus nisi cumque, culpa quaerat
      quibusdam officia enim repellendus unde aperiam?
    </div>

    <h3>对照三</h3>
    <!-- 浮动元素宽度扩大, 超过 marginLeft, 此时 $0.offsetLeft 又!==0, 内容又让出来空间了 -->
    <div class="cls5">test<br>abcde</div>
    <div class="cls4">
      <span>---</span>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam perspiciatis consequatur dolorem modi, molestiae
      excepturi asperiores natus sed, suscipit dignissimos ipsa aliquam aperiam quasi mollitia veniam commodi! Rem, ea
      in placeat consequuntur doloribus odit ipsam est aspernatur. Tempore fuga doloribus nisi cumque, culpa quaerat
      quibusdam officia enim repellendus unde aperiam?
    </div>

    <h3>对照四, 作为有问题的例子</h3>
    <!-- 外层元素内只有一个文本或元素, 加不加 marginLeft 其实展现形式都是一个效果
    (加了 marginLeft ) -->
    <div class="cls5">test<br>abcde</div>
    <div class="cls4">
      <span>---</span>
    </div>

    <h3>对照五, 正常例子</h3>
    <!-- 不看外层元素的边框, 只看内容会发现效果一样, 但是 $0.offsetLeft 是不一样的
    (没加 marginLeft )
    参照物是相对定位的外层元素, $0.offsetParent 验证 -->
    <div class="cls5">test<br>abcde</div>
    <div class="cls3">
      <span>---</span>
    </div>

    <h3>对照六, 正常例子</h3>
    <!-- 和对照五的计算出的 $0.offsetLeft 不一样, 
    因为六不是相对定位, 所以参照物是 body -->
    <div class="cls5">test<br>abcde</div>
    <div class="cls6">
      <span>---</span>
    </div>

    <h3>
      检查元素 .el-select 相当于上边的 span 元素<br>
      当外层元素 .el-form-item__content 为相对定位且 marginLeft<br>
      .el-select 获取不到 offsetLeft(为0), 正常是能获取到的
    </h3>

    <h3 style="margin-top:60px;">el-select 下拉菜单错位</h3>
    <h4>不在 el-form</h4>
    <el-select v-model="form.normal" placeholder="请选择活动区域" :popper-append-to-body="false">
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
    </el-select>
    <h4>在 el-form</h4>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="正常">
        <el-select v-model="form.normal" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="错位">
        <el-select v-model="form.cuowei" placeholder="请选择活动区域" :popper-append-to-body="false">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div style="height:500px;"></div>
  </div>
</template>

<script>
export default {
  name: 'LearningFloat',
  components: {

  },
  props: {

  },
  data() {
    return {
      form: {
        normal: '',
        cuowei: '',
      }
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
.page {
  padding: 10px;
}
.cls {
  position: relative;
  outline: 1px solid deepskyblue;
  margin-left: 10px;
}

.cls2 {
  float: left;
  background-color: deeppink;
}

.cls3 {
  position: relative;
  outline: 1px solid deepskyblue;
}

.cls4 {
  position: relative;
  outline: 1px solid deepskyblue;
  // margin-left: 47px;
  margin-left: 60px;
}

.cls5 {
  float: left;
  background-color: deeppink;
  width: 60px;
}

.cls6 {
  position: initial;
  outline: 1px solid deepskyblue;
}

// ::v-deep {
//   .el-form-item__content {
//     // margin-left: 0 !important;
//     position: initial;
//   }
// }
</style>