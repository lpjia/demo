'use strict';

// $(function() {
// 	document.documentElement.scrollTop = document.body.clientHeight;
// })

var hours = new Date().getHours();
var app = new Vue({
  el: '.app',
  data: {
    isMorning: hours < 12,
    isAfternoon: hours >= 12 && hours < 18,
    isEvening: hours >= 18
  }
})

var app2 = new Vue({
  el: '.app2',
  data: {
    hours: new Date().getHours()
  }
})

var app3 = new Vue({
  el: '.app3',
  data: {
    greetee: 'world'
  }
})

var app4 = new Vue({
  el: '.app4',
  data: {
    path: location.pathname
  }
})

var app5 = new Vue({
  el: '.app5',
  data: {
    dogs: ['dog1', 'dog2', 'dog3', 'dog4', 'dog5']
  }
})

var app6 = new Vue({
  el: '.app6'
})

var app7 = new Vue({
  el: '.app7'
})

var app8 = new Vue({
  el: '.app8',
  data: {
    user: {
      name: 'username'
    }
    //user:undefined
  }
})
var displayHtml = document.getElementById('app_8').outerHTML
document.getElementById('app8').innerHTML = ToHtmlString(displayHtml);

function ToHtmlString(htmlStr) {
  return toTXT(htmlStr).replace(/\&lt\;br[\&ensp\;|\&emsp\;]*[\/]?\&gt\;|\r\n|\n/g, "<br/>");
}
//Html结构转字符串形式显示
function toTXT(str) {
  var RexStr = /\<|\>|\"|\'|\&|　| /g
  str = str.replace(RexStr,
    function(MatchStr) {
      switch (MatchStr) {
        case "<":
          return "&lt;";
          break;
        case ">":
          return "&gt;";
          break;
        case "\"":
          return "&quot;";
          break;
        case "'":
          return "&#39;";
          break;
        case "&":
          return "&amp;";
          break;
        case " ":
          return "&ensp;";
          break;
        case "　":
          return "&emsp;";
          break;
        default:
          break;
      }
    }
  )
  return str;
}

var app9 = new Vue({
  el: '.app9',
  data: {
    //		state: 'loading'
    state: 'error'
    //		state: 'hehe'
    //user:undefined
  }
})

var app10 = new Vue({
  el: '.app10',
  data: {
    dogs: ['dog1', 'dog2', 'dog3', 'dog4', 'dog5']
  }
})

var app11 = new Vue({
  el: '.app11',
  data: {
    obj: {
      k1: 'v1',
      k2: 'v2',
      k3: 'v3'
    }
  }
})

var app12 = new Vue({
  el: '.app12'
})

var app13 = new Vue({
  el: '.app13',
  data: {
    title: true,
    disa: true,
  }
})

var app14 = new Vue({
  el: '.app14',
  data: {
    dogs: ['dog1', 'dog2', 'dog3', 'dog4', 'dog5']
  }
})

var app15 = new Vue({
  el: '.app15',
  data: {
    inputText: 'initial value'
  }
})

var app16 = new Vue({
  el: '.app16',
  data: {
    inputText: 'initial value'
  }
})

var app17 = new Vue({
  el: '.app17',
  data: {
    status: 2,
  },
  methods: {
    statusFromId(id) {
      const status = ({
        0: '睡觉',
        1: '吃饭',
        2: '打豆豆',
      })[id];
      return status || '未知状态: ' + id;
    }
  }
})

var app18 = new Vue({
  el: '.app18',
  data: {
    numbers: [-5, 0, 2, -1, 1, 3, -4]
  },
  methods: {
    filterPositive(numbers) {
      return numbers.filter((number) => number >= 0);
      //			return numbers.filter(function(number){
      //				return number < 0;
      //			})
    }
  }
})

var app19 = new Vue({
  el: '.app19',
  data: {
    numbers: [1, 2, 3, 4]
  },
  computed: {
    numberTotal() {
      return this.numbers.reduce((sum, val) => sum + val);
    }
  }
})

var app20 = new Vue({
  el: '.app20',
  data: {
    numbers: [1, 2, 3, 4, 5],
  },
  computed: {
    numberTotal: {
      get() {
        return this.numbers.reduce((sum, val) => sum + val);
      },
      set(newValue) {
        const oldValue = this.numberTotal;
        const difference = newValue - oldValue;
        this.numbers.push(difference);
      }
    }
  }
})

var app21 = new Vue({
  el: '.app21',
  data: {
    inputValue: '',
    oldInputValue: '',
    oldInputValue2: '',
  },
  watch: {
    inputValue(value) { //最多1个参，当前值
      const NEWVALUE = this.inputValue;
      setTimeout(() => {
        this.oldInputValue = NEWVALUE; //这个可以完美依次复现5秒前输入的内容
        this.oldInputValue2 = this.inputValue; //这个有可能出现已经被更新到最新值了
      }, 5000)
    }
  }
})

var app22 = new Vue({
  el: '.app22',
  data: {
    changeData: {
      value: 5,
      valuee: 1
    },
    newV: '',
    oldV: ''
  },
  watch: {
    'changeData.value'(value, oldValue) { //最多2个参，新值，旧值
      //只监听了changeData的value属性，变化
      console.log(this.changeData.value);
      this.newV = value;
      this.oldV = oldValue;
    },
    changeData: {
      handler() {
        console.log('监听到了changeData对象变化');
      },
      deep: true //深度监听，开启
      //深度监听可以监听到对象的属性，不是深度的话，只能监听到整个对象变化。
    }
  }
})

//全局过滤器
Vue.filter('formatCost3', function(value, symbol) {
  return symbol + '$' + (value / 100).toFixed(2);
})
var app23 = new Vue({
  el: '.app23',
  data: {
    productOneCost: 654
  },
  filters: {
    formatCost(value) {
      return '$' + (value / 100).toFixed(2) + ' 换算 ￥' + (value / 100 * 6.6980).toFixed(2);
    },
    round(value) {
      return value / 10;
    },
    formatCost2(value, symbol) {
      return symbol + '$' + (value / 100).toFixed(2);
    },
  }
})

//访问元素
var app24 = new Vue({
  el: '.app24',
  data: {
    productOneCost: 654,
    dis: document.getElementsByClassName('app24')[0],
    disJQ: $('.app24').length
  }
})
document.getElementById('app24h4').innerHTML = ToHtmlString(app24.$refs.myCanvas.outerHTML)


//$(function() {
//	document.documentElement.scrollTop = document.body.clientHeight;
//})

//document.onload = function() {
//	document.documentElement.scrollTop = document.body.clientHeight;
//	document.body.scrollTop = document.body.clientHeight;
//}

//document.body.scrollTop=document.body.clientHeight;
//document.body.scrollTop = document.body.scrollHeight


//输入和事件
var app25 = new Vue({
  el: '.app25',
  data: {
    counter: 0,
    counter2: 0
  },
  methods: {
    increase(e) {
      this.counter2++;
      console.log(e)
      console.log(this)
    }
  }
})

//事件修饰符
var app26 = new Vue({
  el: '.app26',
  data: {},
  methods: {
    jumpBaidu() {
      console.log('jumpBaidu')
    },
    keydownEnter() {
      console.log('keydownEnter')
    }
  }
})

//生命周期钩子
var app27 = new Vue({
  el: '.app27',
  //在实例初始化之前被触发
  beforeCreate() {
    console.log('beforeCreate');
  },
  //会在实例初始化之后，被添加到dom之前触发
  created() {
    console.log('created');
  },
  //会在元素已经准备好被添加到dom，但还没有添加的时候触发
  beforeMount() {
    console.log('beforeMount');
  },
  //会在元素创建后触发（但并不一定已经添加到了dom，可以用nextTick来保证这一点）
  mounted() {
    //		console.log('mounted');
    this.$nextTick(() => {
      console.log('$nextTick')
    })
    console.log('mounted');
  },
  //会在由于数据更新将要对dom做一些更改时触发
  beforeUpdate() {
    console.log('beforeUpdate');
  },
  //会在dom的更改已经完成后触发
  updated() {
    console.log('updated');
  },
  //会在组件即将被销毁并且从dom上移除时触发
  beforeDestroy() {
    console.log('beforeDestroy');
  },
  //会在组件被销毁后触发
  destroyed() {
    console.log('destroyed');
  },
})

//自定义指令
Vue.directive('blink', {
  bind(el) {
    let isVisible = true;
    setInterval(() => {
      isVisible = !isVisible;
      // debugger
      el.style.visibility = isVisible ? 'visible' : 'hidden';
    }, 1000)
  }
})
var app28 = new Vue({
  el: '.app28'
})

//局部组件
const CustomButton = {
  template: '<div><button>自定义按钮</button><a href="javascript:;">自定义链接</a></div>'
}
//全局组件
Vue.component('customm-button', {
  template: '<button>自定义按钮2</button>'
})
//全局组件，数据、方法、计算属性
Vue.component('positive-numbers', {
  template: '<div><p>{{ numbers }}</p>\
  <p>上面数组里有{{ positiveNumbers.length }}个正数,\
  有{{ negativeNumbers.length }}个负数</p></div>',
  data() {
    return {
      numbers: [-1, 1, 2, -3, 4, 5]
    };
  },
  computed: {
    positiveNumbers() {
      return this.numbers.filter((number) => number >= 0);
    },
    negativeNumbers() {
      return this.numbers.filter((number) => number < 0);
    }
  }
})
Vue.component('positive-button', {
  template: '<button @click="count++">你点击了{{ count }}次</button>',
  data() {
    return {
      count: 0
    }
  }
})
// 传递数据
Vue.component('color-preview', {
  // template: '<div class="color-preview" :style="style"></div>',
  template: '<div :style="style"></div>',
  props: ['color'],
  computed: {
    style() {
      return {
        backgroundColor: this.color,
        height: '20px'
      };
    }
  }
})
/**
 * Prop验证
 */
Vue.component('price-display', {
  template: '<p>当前是{{ unit }}</p>',
  props: {
    price: Number, //数据类型校验，单个
    unit: String,
    price2: ['Number', 'String'], //数据类型校验，多个
    price3: {
      type: Number,
      // required: true, //必须
      validator(value) { //该函数以prop的值为参数，在prop有效时返回true，无效时返回false
        return value >= 0;
      }
    },
    unit: {
      type: String,
      required: true, //必须
      default: '$' //默认值
    }
  },
})
/**
 * Prop的大小写
 */
Vue.component('blog-post', {
  // 在 JavaScript 中是 camelCase 的
  props: ['postTitle'],
  template: '<p>{{ postTitle }}</p>'
})
/**
 * 响应式
 */
Vue.component('displpay-number', {
  template: '<p>当前数字是{{ number }}</p>',
  props: {
    number: {
      type: Number,
      required: true
    }
  }
})
/**
 * 自定义输入组件与v-model
 */
Vue.component('input-username', {
  template: '<div><input type="text" :value="value" @input=handleInput />{{ value }}</div>',
  props: {
    value: {
      type: String,
      required: true
    }
  },
  methods: {
    handleInput(e) {
      // console.log(e)
      const value = e.target.value.toUpperCase();
      if (value !== e.target.value) {
        e.target.value = value;
      }
      this.$emit('input', value);
    }
  }
})

/**
 * 使用插槽(slot)将内容传递给组件
 */
Vue.component('custom-button2', {
  template: '<button @click="alertWindow" class="custom-button2"><slot></slot></button>',
  methods: {
    alertWindow(e) {
      console.log(e)
    }
  }
})

/**
 * 非prop属性 父组件class传递
 */
Vue.component('custom-button3', {
  template: '<div><button @click="alertWindow">btn</button><button @click="alertWindow">btn2</button></div>',
  methods: {
    alertWindow(e) {
      console.log(e)
    }
  }
})

/**
 * 非prop属性 父子组件class和style合并
 */
Vue.component('custom-button4', {
  template: '<button name="children-btn" class="children-class" style="background-color:deepskyblue;cursor:pointer;" @click="alertWindow">btn</button>',
  methods: {
    alertWindow(e) {
      console.log(e)
    }
  }
})

/**
 * 非prop属性 父子组件属性规则
 */
Vue.component('custom-button5', {
  template: '<button name="children-btn" @click="alertWindow">btn</button>',
  methods: {
    alertWindow(e) {
      console.log(e)
    }
  }
})

/**
 * 自定义事件
 */
const events29 = new Vue();
let count29 = 0;

function logCount() {
  count29++;
  console.log('调试函数执行了' + count29 + '次');
}
events29.$on('test-event', logCount);
setInterval(() => {
  events29.$emit('test-event');
}, 1000);
setTimeout(() => {
  events29.$off('test-event');
}, 5000)
var app29 = new Vue({
  el: '.app29',
  data: {
    number: 0,
    username: '',
    priceDisplay: '￥',
    clicks: 0
  },
  created() {
    setInterval(() => {
      this.number++
    }, 1000)
  },
  methods: {
    handleClick() {
      this.clicks++;
      this.$emit('count', this.clicks);
    },
    startEvent() {
      events29.$on('test-event', logCount);
      events29.$emit('test-event');
    },
    endEvent() {
      events29.$off('test-event');
    },
  },
  components: {
    CustomButton
  }
})

/**
 * 主动释放内存 内存泄漏
 */
function varSetNull() {
  window['app'] = null;
  for (var i = 2; i <= 29; i++) {
    window['app' + i] = null;
  }
  //app30，获取本地数据，置null会报错

}

/**
 * 获取本地json数据
 */
var app30 = new Vue({
  el: '.app30',
  data: {
    items: []
  },
  created() {
    axios.get('../../data/v-for.json')
      .then((response) => {
        this.items = response.data.data;
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }
})

/**
 * 原生js方式用script标签来实现引入模版效果
 */
function ysJsLoadScript() {
  document.getElementsByClassName('app31-1')[0].innerHTML = document.getElementById('app31-1').innerHTML
}

/**
 * 原生js方式用template标签引入的模版
 */
function ysJsLoadTemplate() {
  document.getElementsByClassName('app31-2')[0].innerHTML = document.getElementById('app31-2').innerHTML
}

/**
 * 用vue来引入模版
 */
var app31 = new Vue({
  el: '.app31',
  template: '#app31'
})

/**
 * v-for
 */
var app32 = new Vue({
  el: '.app32',
  template: '#app32',
  data: {
    items: [],
    styleCss: {
      color: 'red',
      backgroundColor: 'deepskyblue',
      marginBottom: '4px',
      cursor: 'pointer'
    }
  },
  created() {
    axios.get('../../data/v-for.json')
      .then((response) => {
        this.items = response.data.data;
        // console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    say(param) {
      alert(1)
    }
  }
})

/**
 * render函数
 */
var app33 = new Vue({
  el: '.app33',
  data: {
    tagName: 'i'
  },
  render(createElementT) {
    return createElementT(this.tagName, 'hello world !')
  }
})

/**
 * vue路由 vue-router
 */
const NotFound = {
  template: '<p>Page not found</p>'
}
const Learn = {
  template: '<p>learn page</p>'
}
const About = {
  template: '<p>about page</p>'
}

const routes = {
  // '/': Home,
  // '/about': About
  '/testVue/pages/learn_vue/learn_vue.html': Learn,
  '/testVue/pages/learn_vue/learn_vue': About
}

var app34 = new Vue({
  el: '.app34',
  data: {
    currentRoute: window.location.pathname
  },
  computed: {
    ViewComponent() {
      return routes[this.currentRoute] || NotFound
    }
  },
  render(h) {
    return h(this.ViewComponent);
  }
})

var app35 = new Vue({
  el: '.app35',
  data: {
    // count: 0
  },
  components: {
    'local-c': {
      template: '<button @click="count++">you click me {{ count }}</button>',
      data() {
        return {
          count: 0
        }
      }
    },
    'local-co': {
      template: '<div><button @click="count++">you click me {{ count }}</button> <button @click="count++">you click me {{ count }}</button> <button @click="count++">you click me {{ count }}</button></div>',
      data() {
        return {
          count: 0
        }
      }
    }
  }
})
