<script>
export default {
  name: 'RenderComp',
  props: {
    arr: Array
  },
  render(h) {
    return h('div',
      {
        // class: {
        //   compRoot: true
        // }
        attrs: {
          class: 'compRoot'
        }
      },
      [
        this.arr.map(item => {
          return h('section',
            [
              h('img',
                {
                  attrs: {
                    src: require('@/assets/' + item.path)
                  }
                }
              )
            ]
          )
        })
      ]
    )
  }
};
</script>
