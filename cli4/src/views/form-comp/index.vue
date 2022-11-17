<script>
import pageData from './mock/pageData.js'


// 正则校验
const idcardReg =
  /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;

const genderValidate = (userCard) => {
  if (parseInt(userCard.substr(16, 1)) % 2 == 1) {
    return "男";
  } else {
    return "女";
  }
}

const validatePhoneNumber = (str) => {
  const reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
  return reg.test(str)
}

const deepClone = (source) => {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'deepClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}


export default {
  name: 'FormComp',
  components: {
  },
  props: {
  },
  data() {
    return {
      trainForm: {
        name: '',
        cardNo: '',
        genderId: '',
        mobilePhone: '',
        unitId: '',
        otherUnitName: '',
        cityId: '',
        educationId: '',
        userTrainTypeId: '',
        majorOneId: '',
        majorTwoId: '',
        photoUrl: '',
        companyFileUrl: '',
      },

      genderList: [],
      unitList: [],
      cityList: [],
      educationList: [],
      userTrainTypeList: [],
      majorList: [],

      uploadUrl: '/index/apply/saveUserApplyImg',




      // 处理图片路径, 几种形式
      avatarDefaultUrl: require('/public/imgs/form-comp/avatar.png'), // 第一种
      avatarDefaultUrl_2: require('../../../public/imgs/form-comp/avatar.png'), // 第二种



      isAvatarUpload: false,

      canClk: true,
      dialogVisible: false,

      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
        ],
        cardNo: [
          {
            validator: (rule, value, callback) => {
              if (!value) {
                callback(new Error('请输入身份证号'));
              } else if (!idcardReg.test(value)) {
                callback(new Error('身份证号格式不正确, 请重新输入'));
              } else {
                this.trainForm.genderId = genderValidate(value);
                callback();
              }
            },
            required: true,
            trigger: 'blur',
          },
        ],
        mobilePhone: [
          {
            validator: (rule, value, callback) => {
              if (!value) {
                callback(new Error('请输入手机号'));
              } else if (!validatePhoneNumber(value)) {
                callback(new Error('手机号格式不正确, 请重新输入'));
              } else {
                callback();
              }
            },
            required: true,
            trigger: 'blur',
          }
        ],
        unitId: [
          { required: true, message: '请选择单位', trigger: 'change' },
        ],
        otherUnitName: [
          {
            validator: (rule, value, callback) => {
              if (!value) {
                callback(new Error('请输入单位名称全称'));
              } else {
                callback();
              }
            },
            required: true,
            trigger: 'blur',
          }
        ],
        cityId: [
          { required: true, message: '请选择市区', trigger: 'change' },
        ],
        educationId: [
          { required: true, message: '请选择学历', trigger: 'change' },
        ],
        userTrainTypeId: [
          { required: true, message: '请选择人员类型', trigger: 'change' },
        ],
        majorOneId: [
          { required: true, message: '请选择专业1', trigger: 'change' },
        ],
        majorTwoId: [
          { required: true, message: '请选择专业2', trigger: 'change' },
        ],
      },
    };
  },
  computed: {
    majorListFilter() {
      return (k) => {
        let idx = null
        let newArr = deepClone(this.majorList)
        newArr.map((item, i) => {
          if (item.id === this.trainForm[k]) {
            idx = i
          }
        })
        if (idx !== null) {
          newArr.splice(idx, 1)
        }
        return newArr
      }
    },
  },
  watch: {
  },
  created() {
    console.log(pageData, '111');

    this.genderList = pageData.genderList || [];
    this.unitList = pageData.unitList || [];
    this.unitList.push({
      id: 'qita',
      name: '其他',
    })
    this.cityList = pageData.cityList || [];
    this.educationList = pageData.educationList || [];
    this.userTrainTypeList = pageData.userTrainTypeList || [];
    this.majorList = pageData.majorList || [];

    // this.resetForm()
    this.trainForm.photoUrl = this.avatarDefaultUrl

    this.setVal()
  },
  mounted() {

  },
  methods: {
    setVal() {
      this.trainForm = {
        name: '熊大',
        cardNo: '410724199311181512',
        genderId: '',
        mobilePhone: '15712341234',
        unitId: '',
        otherUnitName: '',
        cityId: '',
        educationId: '',
        userTrainTypeId: '',
        majorOneId: '',
        majorTwoId: '',
        photoUrl: this.avatarDefaultUrl,
        companyFileUrl: '',
      }
    },
    handleSubmitSignUp() {
      this.$refs['trainFormRef'].validate(valid => {
        if (valid) {
          this.submitSignUp()
        }
      })
    },
    // handleClose(done) {
    //   done()
    // },
    submitSignUp() {
      // 没上传文件接口, 注释
      // if (!this.isAvatarUpload) {
      //   this.$message.error('请上传个人照片')
      //   return false
      // }
      // if (!this.trainForm.companyFileUrl) {
      //   this.$message.error('请上传单位盖章文件')
      //   return false
      // }
      if (this.trainForm.unitId === 'qita') {
        this.trainForm.unitId = ''
      } else {
        delete this.trainForm['otherUnitName']
      }
      this.genderList.map((item) => {
        if (item.name === this.trainForm.genderId) {
          this.trainForm.genderId = item.id
        }
      })
      this.userTrainTypeList.map((item) => {
        if (item.name === this.trainForm.userTrainTypeId) {
          this.trainForm.userTrainTypeId = item.id
        }
      })
      let param = Object.assign({}, this.trainForm)

      this.canClk = false
      let that = this
      console.log('param:', param)


      // 模拟调接口
      setTimeout(() => {
        this.resetForm()
        this.canClk = true
        this.dialogVisible = true
      }, 1000);

      // $.ajax({
      //   url: "/index/apply/saveUserApplyMessage",
      //   type: "post",
      //   headers: { dataType: "json" },
      //   data: param,
      //   dataType: "json",
      //   success: function (result) {
      //     console.log('result:', result)
      //     // if (result.error) {
      //     //   alert(result.error);
      //     // } else {
      //     //   if (result.success) {
      //     //     var qrcodeEle = $("#qrcode");
      //     //     qrcodeEle.qrcode({
      //     //       width: qrcodeEle.width(),
      //     //       height: qrcodeEle.height(),
      //     //       text: result.paymentCode
      //     //     });
      //     //     $("#qrcode>.logo").show();
      //     //   } else {
      //     //     alert(result.message);
      //     //   }
      //     // }
      //     that.canClk = true
      //     that.resetForm()
      //   },
      //   error: function (err) {
      //     that.$message.error(err)
      //     that.canClk = true
      //     that.$refs['trainFormRef'].clearValidate()
      //   }
      // });
    },
    resetForm() {
      this.trainForm = {
        name: '',
        cardNo: '',
        genderId: '',
        mobilePhone: '',
        unitId: '',
        otherUnitName: '',
        cityId: '',
        educationId: '',
        userTrainTypeId: '',
        majorOneId: '',
        majorTwoId: '',
        photoUrl: this.avatarDefaultUrl,
        companyFileUrl: '',
      }
      this.isAvatarUpload = false


      // 清除校验, 重置
      this.$nextTick(() => {
        this.$refs['trainFormRef'].clearValidate()
      })
    },
    avatarUploadSucc(response, file, fileList) {
      if (response.responseCode === 'SUCCESS') {
        // this.$message.success(response['message'])
        this.trainForm.photoUrl = response.personImageUrl
        this.isAvatarUpload = true
      } else {
        this.$message.error(response['message'])
        this.trainForm.photoUrl = this.avatarDefaultUrl
        this.isAvatarUpload = false
      }
    },
    avatarUploadError(err, file, fileList) {
      this.$message.error(err)
    },
    avatarBeforeUpload(file) {
      let limitImageSize = 2097152 // 2*1024*1024
      if (file.size > limitImageSize) {
        this.$message.error('图片大小不能超2M, 请重新选择图片')
        return false
      }
    },
    companyFileUploadSucc(response, file, fileList) {
      if (response.responseCode === 'SUCCESS') {
        this.trainForm.companyFileUrl = response.personImageUrl
      } else {
        this.$message.error(response['message'])
        this.trainForm.companyFileUrl = ''
      }
    },
    companyFileUploadError(err, file, fileList) {
      this.$message.error(err)
    },
    companyFileBeforeUpload(file) {
      let limitImageSize = 2097152 // 2*1024*1024
      if (file.size > limitImageSize) {
        this.$message.error('文件大小不能超2M, 请重新选择文件')
        return false
      }
    },
  }
};
</script>

<template>
  <!-- 内容区域 -->
  <div id="content" class="train-container" v-cloak>
    <div class="topBg"></div>

    <div class="main">
      <div class="topTitle">西安市工程监理从业人员-初训培训报名</div>
      <div class="bigCard">
        <div class="title">
          <div class="titleIcon">
            <img src="../../../public/imgs/form-comp/user_icon.png" alt="">
          </div>
          <div class="titleName">初训培训报名</div>
        </div>

        <div class="content">
          <div class="wrap">
            <el-form ref="trainFormRef" :model="trainForm" :rules="rules" label-width="120px" label-position="left">
              <!-- <el-form ref="trainFormRef" :model="trainForm" label-width="120px" label-position="left"> -->
              <el-form-item label="姓名" prop="name">
                <el-input v-model="trainForm.name" placeholder="请输入姓名" style="width:80%"></el-input>
                <div style="display: inline-block;margin-left: 20px;"><span class="redPoint">*</span>注册后不可修改
                </div>
              </el-form-item>
              <el-form-item label="身份证号" prop="cardNo">
                <el-input v-model="trainForm.cardNo" placeholder="请输入身份证号" style="width:80%"></el-input>
                <div style="display: inline-block;margin-left: 20px;"><span class="redPoint">*</span>注册后不可修改
                </div>
              </el-form-item>
              <el-form-item label="性别" :required="true">
                <el-radio-group v-model="trainForm.genderId">
                  <el-radio v-for="item in genderList" :key="item.id" :label="item.name"></el-radio>
                </el-radio-group>
                <div
                  style="display:inline-block; height:40px; width:200px; background-color:transparent; position:absolute; left:0;">
                </div>
                <div style="display:inline-block; position:absolute; right:44px;"><span class="redPoint">*</span>注册后不可修改
                </div>
              </el-form-item>
              <el-form-item label="手机号" prop="mobilePhone">
                <el-input v-model="trainForm.mobilePhone" placeholder="请输入手机号" style="width:80%"></el-input>
              </el-form-item>
              <el-form-item label="单位名称" prop="unitId">
                <el-select v-model="trainForm.unitId" placeholder="请选择单位" style="width:80%">
                  <el-option v-for="item in unitList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item v-if="trainForm.unitId === 'qita'" label="单位名称全称" prop="otherUnitName">
                <el-input v-model="trainForm.otherUnitName" placeholder="请输入单位名称全称" style="width:80%"></el-input>
              </el-form-item>
              <el-form-item label="所在市区" prop="cityId">
                <el-select v-model="trainForm.cityId" placeholder="请选择市区" style="width:80%">
                  <el-option v-for="item in cityList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="学历" prop="educationId">
                <el-select v-model="trainForm.educationId" placeholder="请选择学历" style="width:80%">
                  <el-option v-for="item in educationList" :key="item.id" :label="item.name" :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="人员类型" prop="userTrainTypeId">
                <el-radio-group v-model="trainForm.userTrainTypeId">
                  <el-radio v-for="item in userTrainTypeList" :key="item.id" :label="item.name" :value="item.id">
                  </el-radio>
                </el-radio-group>
                <div style="display:inline-block; position:absolute; right:44px;"><span class="redPoint">*</span>注册后不可修改
                </div>
              </el-form-item>
              <el-form-item label="专业1" prop="majorOneId">
                <el-select v-model="trainForm.majorOneId" placeholder="请选择专业1" style="width:80%">
                  <el-option v-for="item in majorListFilter('majorTwoId')" :key="item.id" :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="专业2" prop="majorTwoId">
                <el-select v-model="trainForm.majorTwoId" placeholder="请选择专业2" style="width:80%">
                  <el-option v-for="item in majorListFilter('majorOneId')" :key="item.id" :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="个人照片" :required="true">
                <el-upload name="previewImage" :data="{uploadType: '1'}" :show-file-list="false"
                  :on-success="avatarUploadSucc" :on-error="avatarUploadError" :action="uploadUrl"
                  :before-upload="avatarBeforeUpload" accept=".png,.jpg">
                  <!-- 几种引入图片形式 -->
                  <img class="avatarClass" :src="trainForm.photoUrl" alt="">
                  <img class="avatarClass" :src="avatarDefaultUrl" alt="">
                  <img class="avatarClass" :src="avatarDefaultUrl_2" alt="">
                  <img class="avatarClass" src='../../../public/imgs/form-comp/avatar.png' alt="">
                  <img class="avatarClass" src='/imgs/form-comp/avatar.png' alt="">
                </el-upload>
                <div class="tip">上传说明：请上传个人电子版照片，支持上传jpg、png格式，且不超过2M。</div>
              </el-form-item>
              <el-form-item label="公司盖章文件" :required="true">
                <el-upload name="previewImage" :data="{uploadType: '2'}" :show-file-list="false"
                  :on-success="companyFileUploadSucc" :on-error="companyFileUploadError" :action="uploadUrl"
                  :before-upload="companyFileBeforeUpload" accept=".png,.jpg,.pdf" style="display: inline-block;">
                  <el-button v-show="!trainForm.companyFileUrl" type="primary"
                    style="background-color: #409EFF !important; border-color: #409EFF !important;">点击上传
                  </el-button>
                  <img v-show="trainForm.companyFileUrl" class="companyFileClass" :src="trainForm.companyFileUrl"
                    alt="">
                </el-upload>
                <el-button type="text" style="color:#409EFF !important;">下载模板</el-button>
                <div class="tip" style="margin-top:10px;">上传说明：请上传单位盖章文件，支持上传jpg、png、pdf格式，且不超过2M。</div>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" :disabled="!canClk" round @click="handleSubmitSignUp"
                  style="background-color: #409EFF !important; border-color: #409EFF !important; width:220px;margin-left:200px;margin-top:20px;">
                  提交报名
                </el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>

    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <div>
        <div class="imgSection">
          <img src="../../../public/imgs/form-comp/dui.png" alt="">
        </div>
        <div class="txt_1">报名成功，等待审核~</div>
        <div class="txt_2">审核后将会以短信通知审核结果，请留意手机短信。</div>
      </div>

      <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span> -->
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
// body {
//   background: #F7F7F7;
//   min-width: 1200px;
//   overflow: auto;
// }

.train-container {
  .topBg {
    background: url('../../../public/imgs/form-comp/bj.png') no-repeat center;
    background-size: cover;
    width: 1920px;
    height: 683px;
    position: absolute;
    top: 0;
    left: 0;
  }

  .main {
    width: 1200px;
    height: auto;
    margin: 0 auto;
    padding-top: 110px;
    position: relative;

    .topTitle {
      height: 45px;
      font-size: 32px;
      font-family: PingFang SC-Bold, PingFang SC;
      font-weight: bold;
      color: #fff;
      line-height: 1.5;
      margin-bottom: 96px;
    }

    .bigCard {
      background: #ffffff;
      border-radius: 20px 20px 20px 20px;
      padding: 32px 46px;

      .title {
        display: flex;
        align-items: center;
        height: 98px;
        border-bottom: 1px solid #dcdfe6;

        .titleName {
          margin-left: 12px;
          font-size: 20px;
          font-family: PingFang SC-Bold, PingFang SC;
          font-weight: bold;
          color: #303133;
          line-height: 1.5;
        }
      }

      .content {
        .wrap {
          padding: 30px 130px;
          padding-right: 0;

          // .form_section {}
          .redPoint {
            color: red;
          }

          .avatarClass {
            width: 50px;
            height: 70px;
          }

          .companyFileClass {
            width: 200px;
            height: 280px;
          }

          // /deep/.el-button.el-button--primary {
          //   background-color: #409EFF !important;
          //   border-color: #409EFF !important;
          // }

          .tip {
            font-size: 12px;
            font-family: PingFang SC-Regular, PingFang SC;
            font-weight: 400;
            color: #909399;
            line-height: 1.5;
          }
        }
      }
    }
  }
}

.imgSection {
  display: flex;
  justify-content: center;
  > img {
    width: 60px;
    height: 60px;
  }
}
.txt_1 {
  font-size: 18px;
  font-family: Source Han Sans CN-Medium, Source Han Sans CN;
  font-weight: 500;
  color: #303133;
  line-height: 1.5;
  margin-top: 20px;
  margin-bottom: 30px;
  text-align: center;
}

.txt_2 {
  font-size: 14px;
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;
  font-weight: 400;
  color: #3c59ca;
  line-height: 1.5;
  text-align: center;
}

::v-deep .el-dialog__body {
  padding-top: 20px;
}
</style>
