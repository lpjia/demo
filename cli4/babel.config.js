// module.exports = {
//   presets: [
//     '@vue/cli-plugin-babel/preset',
//     '@vue/babel-preset-jsx'
//   ],
//   "plugins": [
//     [
//       "component",
//       {
//         "libraryName": "element-ui",
//         "styleLibraryName": "theme-chalk"
//       }
//     ]
//   ]
// }


// 按需引入 element-ui 会导致调试某些源码不生效
// 这时候就得取消上边的"按需引入", main.js 不变
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
    // 需要兼容IE该怎么写
    // ['@vue/app', { useBuiltIns: "entry" }]
    // ['@vue/app', {
    //   polyfills: [
    //     'es.promise',
    //     'es.symbol'
    //   ]
    // }]
  ],
}
