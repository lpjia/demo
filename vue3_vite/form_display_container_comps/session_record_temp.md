<user>
src\components\EditProduct.vue

比如价格不能编辑,得禁用, 怎么高内聚低耦合的封装?

我先看一下这个组件和周边写法，确认它现在是怎么组织表单项的，再给你一个贴合现有代码的封装方式。

我看到 `EditProduct` 只是容器，真正的输入控件在 `ProductForm` 里。这个场景最好让“编辑页决定业务策略，表单组件只消费配置”，这样价格能否编辑不会散落在表单内部。

建议用“字段状态配置”封装：`EditProduct` 决定业务规则，`ProductForm` 只负责根据配置渲染控件。

也就是不要在 ProductForm.vue 里写死：

```vue
<!-- 不推荐：ProductForm 知道了编辑场景 -->
<el-input-number :disabled="isEdit" />
```

而是让页面传入：

```vue
<!-- 新增代码：编辑商品时价格由后端商品数据决定，前端只展示不能修改 -->
<ProductForm
  :formData="formData"
  submitText="提交修改"
  :loading="loading"
  :fieldStates="fieldStates"
  @finish="handleFinish"
/>
```

`EditProduct.vue`：

```js
// 新增代码：把编辑页的字段权限集中配置，避免 ProductForm 耦合具体业务场景
const fieldStates = {
  price: {
    disabled: true
  }
};
```

然后 `ProductForm.vue` 接收这个配置：

```js
// 新增代码：表单组件只关心字段状态，不关心这些状态来自新增、编辑还是权限系统
const getFieldState = (field) => {
  return props.fieldStates?.[field] || {};
};
```

价格控件改成：

```vue
<el-input-number
  v-model="props.formData.price"
  :min="0"
  :precision="2"
  :step="1"
  :disabled="getFieldState('price').disabled"
/>
```

`formUIData.js` 的 `formProps` 增加：

```js
// 新增代码：允许外部容器按字段传入禁用、只读等 UI 状态
fieldStates: {
  type: Object,
  default: () => ({})
}
```

这样内聚和解耦都比较好：

- `EditProduct`：负责“编辑商品时价格不能改”这个业务规则。
- `ProductForm`：负责“某字段 disabled 时怎么渲染”这个表单能力。
- `AddProduct`：不传 `fieldStates`，价格默认可编辑。
- 后面如果服务、名称、库存也要禁用，只扩展配置，不用继续给 `ProductForm` 加一堆 `disablePrice / disableName / isEdit`。

比如说我想要展示组件加几个字段, 新增时每个字段都要填, 编辑时其中2个字段不要显示, 怎么办

这种情况可以升级成“表单字段 schema 配置”，不要让 `ProductForm` 写死有哪些字段、哪些显示、哪些必填。

核心思路：

- `ProductForm`：只负责根据字段配置渲染表单。
- `AddProduct`：传“新增场景字段配置”，所有字段都显示、都必填。
- `EditProduct`：传“编辑场景字段配置”，其中 2 个字段 `hidden: true`。
- 校验规则也跟字段配置走，隐藏字段不参与必填校验。

大概结构可以这样：

```js
// formSchema.js
export const baseFields = [
  {
    prop: 'name',
    label: '商品名称',
    component: 'el-input',
    required: true
  },
  {
    prop: 'price',
    label: '商品价格',
    component: 'el-input-number',
    required: true
  },
  {
    prop: 'stock',
    label: '库存',
    component: 'el-input-number',
    required: true
  },
  {
    prop: 'category',
    label: '分类',
    component: 'el-input',
    required: true
  },
  {
    prop: 'services',
    label: '商品服务',
    component: 'checkbox-group',
    required: true
  }
];
```

新增页：

```js
// 新增代码：新增商品时所有字段都需要填写
const fields = baseFields;
```

编辑页：

```js
// 新增代码：编辑商品时部分字段由历史数据决定，不在表单中展示
const fields = baseFields.map((field) => {
  if (['stock', 'category'].includes(field.prop)) {
    return {
      ...field,
      hidden: true,
      required: false
    };
  }

  return field;
});
```

`ProductForm` 里面只渲染可见字段：

```vue
<template v-for="field in visibleFields" :key="field.prop">
  <el-form-item :label="field.label" :prop="field.prop">
    <!-- 根据 field.component 渲染不同控件 -->
  </el-form-item>
</template>
```

```js
// 新增代码：隐藏字段不渲染，也不参与当前表单交互
const visibleFields = computed(() => {
  return props.fields.filter((field) => !field.hidden);
});
```

校验规则也从字段生成：

```js
// 新增代码：根据当前展示字段生成校验规则，避免隐藏字段仍然要求必填
const rules = computed(() => {
  return props.fields.reduce((result, field) => {
    if (field.hidden || !field.required) {
      return result;
    }

    result[field.prop] = [
      {
        required: true,
        message: `请填写${field.label}`,
        trigger: field.component === 'el-input' ? 'blur' : 'change'
      }
    ];

    return result;
  }, {});
});
```

这个封装比单独传 `hidePrice`、`hideStock`、`disabledPrice` 更稳。因为后面你会继续遇到：

- 新增显示，编辑隐藏
- 新增必填，编辑非必填
- 某些字段只读
- 某些字段根据权限禁用
- 某些字段根据另一个字段动态显示

都可以落到同一个字段配置里：

```js
{
  prop: 'price',
  label: '商品价格',
  component: 'el-input-number',
  required: true,
  hidden: false,
  disabled: true
}
```

我的建议是：**字段少的时候用 `fieldStates`，字段开始变多、显示/必填/禁用规则都变化时，就改成 `fields schema`。** 你这个“展示组件加几个字段，新增全填，编辑隐藏 2 个”的场景，已经适合用 schema 了。
