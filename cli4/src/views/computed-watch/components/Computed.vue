<script>
export default {
  name: 'Computed',
  components: {
  },
  props: {
  },
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
    }
  },
  watch: {
  },
  created() {
  },
  mounted() {
  },
  methods: {
    setFullName(name) {
      this.fullName = name
    },
  },
  render(h) {
    return (
      <div>
        <p>{this.message.split('').reverse().join('')}</p>

        <p>Original message: "{this.message}"</p>
        <p>Computed reversed message: "{this.reversedMessage}"</p>

        <p>{this.fullName_2}</p>

        {/*<p>{this.fullName} <button onclick={this.setFullName}>改变</button></p>*/}
        <p>{this.fullName} <button onclick={() => this.setFullName('John Doe')}>带参数的改变</button></p>

      </div>
    )
  }
};
</script>

<style scoped lang="scss">
</style>
