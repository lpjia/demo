<script>
import HxComp from './HxComp.vue'

export default {
  name: 'ChildFour',
  components: {
    HxComp
  },
  data() {
    return {
      list: [
        { lv: 2 },
        { lv: 4 },
      ],
      level: 1
    };
  },
  render(h) {
    // 想要实现的 dom 节点
    `<div>
      <hx-comp :level="2" #default="data">
        <span>{{ data.text }}</span>
      </hx-comp>
    </div>`;

    return h('div',
      [
        // 加遍历
        this.list.map(item => {
          return h('hx-comp',
            {
              props: {
                level: item.lv
              },
              /*
              // 作用域插槽的格式为
              // { name: props => VNode | Array<VNode> }
              scopedSlots: {
                default: props => h('span', props.text)
              }, */
              scopedSlots: {
                // 这是加了渲染 dom 节点功能, 解决 &nbsp; 问题, 下面是对照
                default: data => h('span',
                  {
                    domProps: {
                      innerHTML: `h${item.lv} &nbsp;&nbsp;${data.text}`
                    }
                  }
                )
              }
            }
          )
        }),

        h('hx-comp',
          {
            props: {
              level: this.level
            },
            scopedSlots: {
              // &nbsp; 不会按照 dom 去渲染, 被当做文本渲染
              default: data => h('span', [`h${this.level} &nbsp; `, data.text])
            },
          }
        ),

        h('el-divider')
      ]
    )
  }
};
</script>
