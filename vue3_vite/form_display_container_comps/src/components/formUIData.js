export const services = ['保修', '包邮', '安装', '退换货'];

export const rules = {
  name: [
    { required: true, message: '请输入商品名称', trigger: 'blur' },
    { min: 2, max: 20, message: '商品名称长度应在 2 到 20 个字符之间', trigger: 'blur' }
  ],
  price: [
    { required: true, message: '请输入商品价格', trigger: 'change' },
    {
      type: 'number',
      min: 0,
      max: 999999,
      message: '商品价格必须在 0 到 999999 之间',
      trigger: 'change'
    }
  ]
};

export const formProps = {
  formData: {
    type: Object,
    required: true
  },
  submitText: {
    type: String,
    default: '提交'
  },
  loading: {
    type: Boolean,
    default: false
  },
  fieldStates: {
    type: Object,
    default: () => {}
  }
};
