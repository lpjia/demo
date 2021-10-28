/*
练习，canvas雨滴特效
1. 让canvas元素占满整个浏览器页面
  1.1 获取canvas元素  DOM
  1.2 获取浏览器页面的宽高  BOM
  1.3 给canvas设置一个宽高	属性
  1.4 当浏览器页面宽高变化时，需要重新设置canvas的宽高

2. 如何利用canvas绘制一个图形 圆 正方形
  2.1 找到卷轴上的宣纸部分（找到canvas元素上可绘制的区域）
  2.2 找到可用来绘制图形的笔并且蘸上有颜色的墨水
  2.3 构思绘制什么图形以及待绘制图形的基本参数
  2.4 下笔作画
3. 如何利用canvas绘制动画
  3.1 单位时间内连续播放多张静态的图形（帧）
    1s 60帧
    1/60s 一帧
    定时器
  3.2 每一张静态图形，里面的内容都必须要发生一个变化（位置 大小 形状 颜色 角度等）
4. 如何绘制一个雨滴
5. 绘制100个雨滴
*/

;
(function(undefined) {
  "use strict";
  var _global;
  var $$ = {
    /**
     * 实心圆
     */
    solidCircle: function() {
      return () => {
        let oCanvas = document.querySelector('.rain');
        let w = window.innerWidth;
        let h = window.innerHeight;
        oCanvas.width = w;
        oCanvas.height = h;
        let canCtx = oCanvas.getContext('2d');

        canCtx.fillStyle = 'red';
        canCtx.arc(233, 233, 66, 0, Math.PI * 2);
        canCtx.fill();
      }
    },
    /**
     * 空心圆
     */
    hollowCircle: function() {
      return () => {
        let oCanvas = document.querySelector('.rain');
        let w = window.innerWidth;
        let h = window.innerHeight;
        oCanvas.width = w;
        oCanvas.height = h;
        let canCtx = oCanvas.getContext('2d');

        canCtx.strokeStyle = 'red';
        canCtx.arc(233, 233, 66, 0, Math.PI * 2);
        canCtx.lineWidth = 5;
        canCtx.stroke();
      }
    },
    /**
     * 空心矩形
     */
    hollowRectangle: function() {
      return () => {
        let oCanvas = document.querySelector('.rain');
        let w = window.innerWidth;
        let h = window.innerHeight;
        oCanvas.width = w;
        oCanvas.height = h;
        let canCtx = oCanvas.getContext('2d');

        canCtx.strokeStyle = 'red';
        canCtx.lineWidth = 5;
        canCtx.strokeRect(233, 233, 66, 66); // 三步并作两步
      }
    },
    /**
     * 实心矩形
     */
    solidRectangle: function() {
      return () => {
        let oCanvas = document.querySelector('.rain');
        let w = window.innerWidth;
        let h = window.innerHeight;
        oCanvas.width = w;
        oCanvas.height = h;
        let canCtx = oCanvas.getContext('2d');

        canCtx.strokeStyle = 'red';
        // canCtx.strokeRect(233, 233, 66, 66); // 三步并作两步
        canCtx.rect(233, 233, 66, 66); // 三步
        canCtx.stroke(); // 三步
      }
    },
    /**
     * 雨滴
     */
    oneRain: function() {
      return () => {
        let oCanvas = document.querySelector('.rain');
        let w = window.innerWidth;
        let h = window.innerHeight;
        oCanvas.width = w;
        oCanvas.height = h;
        let canCtx = oCanvas.getContext('2d');

        let y = 100;
        setInterval(function() {
          // canCtx.beginPath(); // 把笔抬起来
          canCtx.fillStyle = 'rgba(0, 0, 0, 0.05)'; // 借助透明度来实现
          canCtx.fillRect(0, 0, w, h); // 用蒙层来多次覆盖小方块，实现渐变效果
          // canCtx.clearRect(0, 0, w, h); // 为了理解渐变原理
          canCtx.fillStyle = '#3ff';
          canCtx.fillRect(100, y++, 2, 20);
          if (y > 600) {
            y = 100;
          }
        }, 1000 / 60)
      }
    },
    /**
     * 动图效果
     */
    gif: function() {
      return () => {
        let oCanvas = document.querySelector('.rain');
        let w = window.innerWidth;
        let h = window.innerHeight;
        oCanvas.width = w;
        oCanvas.height = h;
        let canCtx = oCanvas.getContext('2d');

        let x = 50;
        let downFlag = true;
        setInterval(function() {
          // canCtx.beginPath(); // 把笔抬起来
          canCtx.clearRect(0, 0, w, h);
          canCtx.fillStyle = 'red';
          if (downFlag) {
            // canCtx.arc(x++, x++, 66, 0, Math.PI * 2, true); // 画实心圆
            canCtx.fillRect(x++, x++, 60, 60);
            if (x > 500) {
              downFlag = false;
            }
          } else {
            // canCtx.arc(x--, x--, 66, 0, Math.PI * 2, true); // 画实心圆
            canCtx.fillRect(x--, x--, 60, 60);
            if (x < 50) {
              downFlag = true;
            }
          }
          // canCtx.fill(); // 画实心圆
        }, 1000 / 60)
      }
    },
    /**
     * 随机数
     * 范围 min <= x < max
     */
    random: function(min, max) {
      return Math.random() * (max - min) + min;
    },
    /**
     * 雨滴配置
     */
    rainParam: {
      num: 40, // 雨滴个数
      delayTime: 1000 //延时
    },
    /**
     * 生成多个雨滴
     */
    createRain: function() {
      for (let i = 0; i < this.rainParam.num; i++) {
        setTimeout(() => {
          var littleRain = new Rain(); // 根据雨滴的DNA创造一个新的小雨滴
          littleRain.init();
          littleRain.draw();
          this.aRain.push(littleRain);
        }, this.rainParam.delayTime * i);
      }
    },
    /**
     * 存放所有新生成的小雨滴
     */
    aRain: [],

  }

  let oCanvas = document.querySelector('.rain');
  let w = window.innerWidth;
  let h = window.innerHeight;
  oCanvas.width = w;
  oCanvas.height = h;
  let canCtx = oCanvas.getContext('2d');

  var Rain = function() {}; // 构造函数
  // function Rain(){}; // 雨滴的DNA 构造函数

  Rain.prototype = {
    init: function() { // DNA的基本基因
      this.x = $$.random(0, w); // 新生成的雨滴的X位置，从浏览器最左边到最右边
      this.y = 0; // y位置
      this.w = 2; // 雨滴宽度
      this.h = 10; // 雨滴高度
      this.color = '#3ff'; // 雨滴颜色
      this.vy = $$.random(2, 3); // 雨滴下落速度
      this.height = $$.random(0.8 * h, 0.9 * h); // 雨滴跌落地面的高度
      this.r = 2; // 水珠的初始宽度
      this.maxR = 100; // 水珠的最大宽度
    },
    draw: function() {
      if (this.y < this.height) {
        canCtx.fillStyle = this.color;
        canCtx.fillRect(this.x, this.y, this.w, this.h);
      } else {
        canCtx.beginPath(); // 把笔抬起来，对于有 fill() 的
        canCtx.strokeStyle = this.color;
        canCtx.arc(this.x, this.y, this.r, 0, Math.PI * 2, true)
        canCtx.stroke();
      }
    },
    move: function() {
      if (this.y < this.height) { // 使雨滴停下来
        this.y += this.vy;
      } else {
        if (this.r < this.maxR) {
          this.r++;
        } else {
          this.init();
        }
      }
      this.draw();
    }
  }
  // var littleRain = new Rain(); // 根据雨滴的DNA创造一个新的小雨滴
  // littleRain.init()
  // littleRain.draw()

  $$.createRain(); // 多个静止雨滴

  setInterval(function() {
    canCtx.fillStyle = 'rgba(0, 0, 0, 0.05)'; // 借助透明度来实现
    canCtx.fillRect(0, 0, w, h); // 用蒙层来多次覆盖小方块，实现渐变效果

    // // 用 forEach 循环
    //  $$.aRain.forEach( function(currentValue, index, arr) {
    //    currentValue.move()
    //  })

    // 用 for of 循环
    for (let i of $$.aRain) {
      i.move();
    }

  }, 1000 / 60)

  // $$.oneRain()();
  // window.onresize = function() {
  //   $$.rain()();
  // }

  // 最后将对象暴露给全局对象
  _global = (function() {
    return this || (0, eval)('this');
  }());
  if (typeof module !== "undefined" && module.exports) {
    module.exports = $$;
  } else if (typeof define === "function" && define.amd) {
    define(function() {
      return $$;
    });
  } else {
    !('$$' in _global) && (_global.$$ = $$);
  }
}());
