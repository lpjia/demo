<script>
import debounce from "lodash/debounce";
import capitalize from "lodash/capitalize";

export default {
  name: 'Watcher',
  components: {
  },
  props: {
  },
  data() {
    return {
      question: '',
      answer: 'I cannot give you an answer until you ask a question!',
      imgUrl: ''
    };
  },
  computed: {
  },
  watch: {
    // 如果 `question` 发生改变，这个函数就会运行
    question: function (newQuestion, oldQuestion) {
      this.answer = 'Waiting for you to stop typing...'
      this.debouncedGetAnswer()
    }
  },
  created() {
    this.debouncedGetAnswer = debounce(this.getAnswer, 500)
  },
  mounted() {
  },
  methods: {
    async getAnswer() {
      if (this.question.indexOf('?') === -1) {
        this.answer = 'Questions usually contain a question mark. ;-)'
        return;
      }
      this.answer = 'Thinking...'

      try {
        const url = "https://yesno.wtf/api"
        const response = await fetch(url);
        if (!response.ok) throw new Error('response failed')
        const res = await response.json();

        this.answer = capitalize(res.answer)
        this.imgUrl = res.image
      } catch (error) {
        this.answer = 'Error! Could not reach the API. ' + error
      }
    }
  },
  render(h) {
    return (
      <div>
        <p>
          Ask a yes/no question:
          <input vModel={this.question} />
        </p>
        <p>{this.answer}</p>
        <img src={this.imgUrl} />
      </div>
    )
  }
};
</script>

<style scoped lang="scss">
</style>
