// 自动引入 src/icons/svg 下的所有 .svg 文件
const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
const result = requireAll(req)
console.log('svg 文件 result:', result)