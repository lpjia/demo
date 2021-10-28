'use strict';

/**
 * 用template 这里还不知道怎么写
 */
// Vue.component('hehe', {
//   data() {
//     return {
//       // 用户输入的内容
//       text: '',
// 
//       // 最大字数
//       num: 100,
// 
//       // 敏感词
//       sensitiveWords: ['sex', '六合彩', '约炮', '吸毒', '卖淫', '一夜情']
//     }
//   },
//   watch: {
//     // 如果 `text` 发生改变，这个函数就会运行
//     text(value, oldValue) {
//       console.log(value)
//       this.sensitiveWords.forEach((word) => {
//         // console.log(word)
//         if (value.indexOf(word) !== -1) {
//           alert('含有非法信息！');
//           location.reload();
//         }
//       })
//     }
//   },
//   methods: {
//     count(e) {
//       // console.log(e)
//       if (e.data !== null) {
//         return (this.num === 0) ? false : this.num--;
//       }
//     },
//     count_(e) {
//       // console.log(e)
//       return (this.num === 100) ? false : this.num++;
//     }
//   }
// })
// var vm = new Vue({
//   el: '#app',
//   template: '#app_template'
// })

/**
 * 禁止输入敏感词 没有用template
 */
var app1 = new Vue({
  el: '.app1',
  data: {
    // 用户输入的内容
    text: '',

    // 最大字数
    num: 100,

    // 敏感词
    sensitiveWords: ['sex', '六合彩', '约炮', '吸毒', '卖淫', '一夜情']
  },
  watch: {
    // 如果 `text` 发生改变，这个函数就会运行
    text(value, oldValue) {
      console.log(value)
      this.sensitiveWords.forEach((word) => {
        // console.log(word)
        if (value.indexOf(word) !== -1) {
          alert('含有非法信息！');
          location.reload();
        }
      })
    }
  },
  methods: {
    count(e) {
      // console.log(e)
      if (e.data !== null) {
        return (this.num === 0) ? false : this.num--;
      }
    },
    count_(e) {
      // console.log(e)
      return (this.num === 100) ? false : this.num++;
    }
  }
})

/**
 * 小小购物车
 */
var app2 = new Vue({
  el: '.app2',
  data: {
    products: []
  },
  created() {
    axios.get('../../data/small-shopping-car.json')
      .then((response) => {
        // console.log(this);
        this.products = response.data.data;
        // console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  computed: {
    // 计算金额
    subtotal() {
      return (i) => {
        var price = this.products[i].price;
        var quantity = this.products[i].quantity;
        return price * quantity;
      }
    },

    // 计算商品数量
    count() {
      var n = 0;
      this.products.forEach(function(value) {
        n += value.quantity;
      })
      return n;
    },

    // 计算总价
    total() {
      var n = 0;
      this.products.forEach(function(value) {
        n += value.quantity * value.price;
      })
      return n;
    },

  }
})

/**
 * 原生js写留言板
 */
;
(function(undefined) {
  "use strict"
  var _global;

  var input = document.getElementsByClassName('app3')[0];
  var btn = document.getElementsByTagName('button')[0];
  var btn2 = document.getElementsByTagName('button')[1];
  var ul = document.getElementsByTagName('ul')[0];

  // btn.onclick = () => alert(200);
  btn.onclick = () => {
    var li = document.createElement("li");
    li.innerHTML = input.value;
    if (!ul.children.length) {
      ul.appendChild(li);
    } else {
      var firstEle = ul.firstElementChild;
      ul.insertBefore(li, firstEle)
    }
    input.value = '';
    input.focus();
  }
  btn2.onclick = () => {
    input.blur();
  }


  var plugin = {
    add: function(n1, n2) {
      return n1 + n2;
    }
  }
  // 最后将插件对象暴露给全局对象
  _global = (function() {
    return this || (0, eval)('this');
  }());
  if (typeof module !== "undefined" && module.exports) {
    module.exports = plugin;
  } else if (typeof define === "function" && define.amd) {
    define(function() {
      return plugin;
    });
  } else {
    !('plugin' in _global) && (_global.plugin = plugin);
  }
}());

/**
 * 用vue写留言板
 */
var app4 = new Vue({
  el: '.app4',
  data: {
    inputValue: '',
    list: [],
    styleCss: {
      color: 'deepskyblue',
      marginBottom: '4px',
      cursor: 'pointer'
    }
  },
  created() {
    if (localStorage.getItem('arrList')) {
      this.list = localStorage.getItem('arrList').split(',')
    }
  },
  watch: {
    list(value, oldValue) {
      localStorage.setItem('arrList', value);
    }
  },
  methods: {
    // 添加
    addlist() {
      if (this.inputValue) {
        this.list.unshift(this.inputValue);
        this.inputValue = '';
      }
    },

    // 删除
    del(idx) {
      if (confirm('真的删除吗?')) {
        this.list.splice(idx, 1);
      }
    },

    // prompt编辑
    edit(item, idx) {
      var edited = prompt('请编辑内容：', item);
      if (edited) {
        this.list.splice(idx, 1, edited);
      } else if (edited === '') {
        alert('输入不能为空！');
      } else {
        // click cancel
        // console.log(edited)
        return false;
      }
    },

    // layer编辑
    edit2(item, idx) {
      var that = this;
      layer.prompt({
        value: item,
        title: '编辑'
      }, function(val, index) {
        that.list.splice(idx, 1, val);
        layer.close(index);
      });
    },

  }
})

/**
 * 模拟ajax操作
 */
var app5 = new Vue({
  el: '.app5',
  data: {
    username: '',
    userflag: false,
    email: '',
    emailflag: false,
    userinfo: [],
    usernamelist: [],
    emaillist: [],
    errorColor: {
      color: 'red'
    },
    tips: ''
  },
  created() {
    axios.get('../../data/get-user-info.json')
      .then((response) => {
        this.userinfo = response.data.data;
        this.userinfo.forEach((item) => {
          this.usernamelist.push(item.username);
          this.emaillist.push(item.email);
        })
        // console.log(this.usernamelist);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  watch: {
    username(value, oldValue) {
      value !== '' ? this.tips = '' : false;
      this.usernamelist.indexOf(value) > -1 ? this.userflag = true : this.userflag = false;
    },
    email(value, oldValue) {
      value !== '' ? this.tips = '' : false;
      this.emaillist.indexOf(value) > -1 ? this.emailflag = true : this.emailflag = false;
    }
  },
  methods: {
    login() {
      // 非空判断
      if (this.username.length === 0 || this.email.length === 0) {
        this.tips = '用户/邮箱不能为空';
        var tag = document.getElementsByClassName('app51');
        this.username.length === 0 ? tag[0].focus() : tag[1].focus();
      } else {
        this.tips = '';
        alert('验证登陆，即将跳转')
      }
    }
  }
})

/**
 * 测试input事件输入
 */
var app6 = new Vue({
  el: '.app6',
  data: {
    test: ''
  },
  methods: {
    jtshuru() {
      console.log(this.test)
    }
  }
})

/**
 * 调用全局组件
 */
Vue.component('global-c', {
  template: '<div><p><slot></slot> <span :style="color">{{ site }}</span> ,在这里可以学习</p><ul><li v-for="(item,idx) in courses">{{ idx + 1 }} - {{ item }}</li></ul></div>',
  data() {
    return {
      site: 'html中文网',
      courses: ['html', 'css', 'javascript', 'Node.js', 'Vue.js'],
      color: {
        color: 'red'
      }
    }
  }
})

var app7 = new Vue({
  el: '.app7'
})

var app70 = new Vue({
  el: '.app70'
})

/**
 * 调用局部组件
 */
const LocalCo = {
  template: '<div><p><slot></slot> <span :style="color">{{ site }}</span> ,在这里可以学习</p><ul><li v-for="(item,idx) in courses">{{ idx + 1 }} - {{ item }}</li></ul></div>',
  data() {
    return {
      site: 'html中文网',
      courses: ['html', 'css', 'javascript', 'Node.js', 'Vue.js'],
      color: {
        color: 'red'
      }
    }
  }
}

var app8 = new Vue({
  el: '.app8',
  components: {
    LocalCo,
    'local-c': {
      template: '<div><p><slot></slot> <span :style="color">{{ site }}</span> ,在这里可以学习</p><ul><li v-for="(item,idx) in courses">{{ idx + 1 }} - {{ item }}</li></ul></div>',
      data() {
        return {
          site: 'html中文网',
          courses: ['html', 'css', 'javascript', 'Node.js', 'Vue.js'],
          color: {
            color: 'red'
          }
        }
      }
    }
  }
})

/**
 * 传递数据
 */
var app9 = new Vue({
  el: '.app9',
  data: {
    nav: ['首页', '视频', '工具', '直播'],
    course: 'Vue.js',

    // 接受子组件数据
    userInfo: []
  },

  components: {
    'local-ftc': {
      template: '<div>{{ site }}<ul><li v-for="(item, idx) in link">{{ item }}</li></ul><br>from {{ lesson }}</div>',
      // props: ['link', 'lesson'],
      props: {
        link: Array,
        lesson: String
      },
      data() {
        return {
          site: 'hello world !'
        }
      }
    },

    // 子组件：局部组件
    'local-ctf': {
      template: '<button @click="send">向父组件发送数据</button>',

      // 组件方法
      methods: {
        send() {
          this.$emit('getdata', [this.name, this.email]);
        }
      },

      // 创建要发送给父组件的数据
      data() {
        return {
          name: 'admin',
          email: 'admin@qq.com'
        }
      }
    },
  },

  // vue实例方法
  methods: {
    getData(data) {
      this.userInfo = data;
    }
  },
})

/**
 * 同级组件 数据传递
 */
// 创建空的中间vue实例
var middle = new Vue();

// 创建实例
var app10 = new Vue({
  el: '.app10',

  components: {
    'local-one': {
      template: '<button @click="changepage">换一张 当前页码：{{ currentPage }} 总页码：{{ arrPage.length }}</button>',
      data() {
        return { // 目的是把数组项传到另一同级组件，并且自身随之变化
          arrPage: ['1', '2', '3', '4'],
          currentPage: 0
        }
      },
      methods: {
        changepage() {
          // 触发中间vue实例的自定义事件
          middle.$emit('one-two', this.arrPage);
        }
      },
      mounted() {
        middle.$on('two-one', (param) => {
          this.currentPage = this.arrPage[param];
        })
      }
    },
    'local-two': {
      template: '<div><p :style="css">{{ code }}</p><p>{{ verify }}</p></div>',
      data() {
        return {
          verify: ['287v', '3wn1', 'gw9m', 's7b4', 'jyhf', 'yh38'],
          code: '9527', // 初值
          css: {
            backgroundColor: 'deepskyblue',
            color: '#fff',
            width: '60px',
            textAlign: 'center'
          }
        }
      },

      // 元素创建后触发 钩子函数
      mounted() {
        // 监听中间vue实例的自定义事件
        localStorage.setItem('beforeIdx', 0);
        middle.$on('one-two', (param) => {
          var idx = Math.floor(Math.random() * param.length);
          if (localStorage.getItem('beforeIdx') == idx) {
            idx == 3 ? idx = 0 : idx += 1;
          }
          localStorage.setItem('beforeIdx', idx);
          this.code = this.verify[idx];
          middle.$emit('two-one', idx);
        })
      }
    }
  }
})

/**
 * 插槽
 */
Vue.component('local-app11', {
  template: '<div><slot></slot><i>111</i></div>', // 全局组件 插槽
  // 插槽就是一个预留的占位符，最终会被组建中的指定内容所替换。
  // 插槽可以使代码复用
  // 没有包含一个 <slot> 元素，则该组件起始标签和结束标签之间的任何内容都会被抛弃。
})
var app11 = new Vue({
  el: '.app11',

  components: {
    'local-app11-1': {
      template: '<div><slot></slot><slot></slot><slot></slot></div>'
    }
  }
})

/**
 * 用户点赞
 */
var app12 = new Vue({
  el: '.app12',

  components: {
    'like-c': {
      template: '#app12-1',
      data() {
        return {
          text: '',
          likeCount: 200,

          // 设置当前的点赞状态，false表示初始状态（还没点）
          isLike: false
        }
      },
      methods: {
        setLike() {
          if (!this.isLike) {
            this.likeCount++;
            this.text = '已';
          } else {
            this.likeCount--;
            this.text = '';
          }
          this.isLike = !this.isLike;
        }
      }
    }
  }
})

/**
 * 商品信息表
 */
var app13 = new Vue({
  el: '.app13',

  data: {
    products: [{
        productName: 'Mac',
        unitPrice: 18888,
        quantity: 0
      },
      {
        productName: 'iPhone Xs',
        unitPrice: 12799,
        quantity: 0
      },
      {
        productName: 'HUAWEI P30',
        unitPrice: 4288,
        quantity: 0
      },
      {
        productName: 'HUAWEI P30 Pro',
        unitPrice: 5488,
        quantity: 0
      },
      {
        productName: 'Honor Magic2',
        unitPrice: 4299,
        quantity: 0
      }
    ]
  },

  components: {
    'product': {
      template: '#app13-1',
      props:['propSx'],
      computed: {
        calcTotal() {
          return (idx) => {
            var unitPrice = this.propSx[idx].unitPrice; // this指该组件实例
            var quantity = this.propSx[idx].quantity;
            return unitPrice * quantity;
          }
        },
        count() {
          var n = 0;
          this.propSx.forEach((val) => {
            n += val.quantity;
          })
          return n;
        },
        amount() {
          var n = 0;
          this.propSx.forEach((val) => {
            n += val.quantity * val.unitPrice;
          })
          return n;
        }
      }
    }
  }
})

/**
 * vue官方示例（插槽）
 */
var app14 = new Vue({
  el: '.app14',

  components: {
    'base-layout': {
      template: '#app14-1'
    }
  }
})

/**
 * 页面布局（插槽）
 */
var app15 = new Vue({
  el: '.app15',

  components: {
    'base-layout': {
      template: '#app15-1'
    }
  }
})
