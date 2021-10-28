; (function (global, undefined) {
  "use strict" //使用js严格模式检查，使语法更规范
  var _global;
  var plugin = {
    add: function (n1, n2) { return n1 + n2; }
  }
  // 最后将插件对象暴露给全局对象
  _global = (function () { return this || (0, eval)('this'); }());
  !('plugin' in _global) && (_global.plugin = plugin);
}());



/**
 * vue路由 vue-router
 */
const NotFound = { template: '<p>Page not found</p>' }
const Home = { template: '<p>home page</p>' }
const About = { template: '<p>about page</p>' }

const routes = {
  // '/': Home,
  // '/about': About
  '/testVue/pages/learn_vue/learn_vue.html': Home,
  '/testVue/index.html': About
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
  render(h) { return h(this.ViewComponent) }
})



// 产生随机数
// letter
var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
function generateMixed(n) {
  var a = "";
  for (var i = 0; i < n; i++) {
    a += chars[Math.ceil(Math.random() * 35)]; // 进行上舍入，这里不会出现0
  }
  return a;
}
generateMixed(4)


var chars = ['2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
function generateMixed(n) {
  var a = "";
  for (var i = 0; i < n; i++) {
    a += chars[Math.floor(Math.random() * chars.length)];
  }
  return a;
}
generateMixed(4)



function Counter() {
  this.num = 0;
  this.timer = setInterval(() => {
    this.num++;
    console.log(this.num);
  }, 1000);
}
var b = new Counter();


var obj = {
  id: 1,
  show: () => {
    console.log(this.id)
  },
  display: function () {
    diss: () => {
      console.log(this.id)
    }
  }
}
obj.display()