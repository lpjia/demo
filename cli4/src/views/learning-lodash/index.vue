<script>
import Obj from './components/Obj.vue';
import YuYan from './components/YuYan.vue';
import Num from './components/Num.vue';
import Str from './components/Str.vue';
import Arr from './components/Arr.vue';
import JsonView from '../../components/JsonView.vue';
// import { cloneDeep } from 'lodash'
// import cloneDeep from "lodash/cloneDeep";
// import _get from "lodash/get";

export default {
  name: 'LearningLodash',
  components: {
    Obj,
    YuYan,
    Num,
    Str,
    Arr,
    JsonView
  },
  data() {
    return {
      arr: [
        { name: 'xm', id: 1 },
        { name: 'xc', id: 11 },
        { name: 'xz', id: 111 },
      ],
      arr_2: ['red', 'green', 'blue'],
      obj: {
        'a': [
          {
            'b': {
              'c': 3
            }
          }
        ]
      },


    };
  },
  render(h) {
    return (
      <div>
        <Obj obj={this.obj} />

        <YuYan arr={this.arr} />

        <Num />
        <el-divider></el-divider>
        <Str />
        {/**<Arr :arr="this.arr" /> */}
        <Arr arr={this.arr_2} />
        {/**<json-view :val="arr" /> */}
      </div>
    )
  }
};
</script>