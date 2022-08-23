<script>
export default {
  name: 'Computed',
  data() {
    return {
      message: 'Hello World',

      firstName: 'Foo',
      lastName: 'Bar',
    };
  },
  computed: {
    reversedMessage() {
      return this.message.split('').reverse().join('')
    },

    fullName_2: function () {
      return this.firstName + ' ' + this.lastName
    },

    /*
    fullName: {
      // getter
      get: function () {
        return this.firstName + ' ' + this.lastName
      },
      // setter
      set: function (newValue) {
        var names = newValue.split(' ')
        this.firstName = names[0]
        this.lastName = names[names.length - 1]
      }
    },
    */
    // 下边换成属性简写, 推荐
    fullName: {
      get() {
        return this.firstName + ' ' + this.lastName
      },
      set(newVal) {
        const names = newVal.split(' ')
        this.firstName = names[0]
        this.lastName = names[names.length - 1]
      }
    },

    computedA() {
      return 'AAA'
    },
    // 计算属性带实参, 利用了 vue 语法上的优势
    // 语法不带(), 返回 getter
    // 语法带(), 返回函数调用, 闭包
    computedB() {
      return zifu => `BBB${zifu}BBB`
    },
    computedC() {
      return zifu => {
        const str = '密集恐惧症犯了'
        return `刚刚 ${zifu} ${str}`
      }
    },
    computedD() {
      return (zifu, fuhao) => {
        return `鼓起勇气 ${zifu} 直面困难 ${fuhao}`
      }
    },
  },
  methods: {
    setFullName(name) {
      this.fullName = name
    },
  },
  render() {
    // 不带实参的语法
    // <p>{this.fullName} <button onclick={this.setFullName}>改变</button></p>

    return (
      <div>
        <p>Original message: "{this.message}"</p>
        <p>Computed reversed message: "{this.reversedMessage}"</p>
        <p>直接在模板中写过重的语法: {this.message.split('').reverse().join('')}</p>

        <p>----分割线----</p>
        <p>{this.computedA}</p>
        <p>{this.computedB('-')}</p>
        <p>{this.computedC('!!!')}</p>
        <p>{this.computedD('-', '!!!')}</p>

        <p>----分割线----</p>
        <p>{this.fullName_2}</p>
        <p>{this.fullName} <button onclick={() => this.setFullName('John Doe')}>带实参的改变</button></p>

      </div>
    )
  }
};
</script>