// 全局引入
/* import echarts from 'echarts'
Vue.prototype.$echarts = echarts */

// 文件路径 @/lib/echarts.js 自行配置
// 按需引入
// 加载echarts，注意引入文件的路径
import echarts from 'echarts/lib/echarts'

// 再引入你需要使用的图表类型，标题，提示信息等
import 'echarts/lib/chart/bar'
// 引入饼图
import 'echarts/lib/chart/pie'

import 'echarts/lib/component/legend'
import 'echarts/lib/component/title'
import 'echarts/lib/component/tooltip'

// 在需要的文件里引入使用
export default echarts