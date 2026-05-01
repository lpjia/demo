<script>
import TextDocument from '../child-san/TextDocument.vue';

export default {
  name: 'ChildSan',
  components: {
    TextDocument
  },
  data() {
    return {
      docDoc: {
        title: '一段英文',
        id: 110,
      },
      doc: {
        title: '一段英文',
        id: 110,
      },
    };
  },
};
</script>

<template>
  <div>
    <TextDocument :title="docDoc.title" @update:title="docDoc.title = $event" :id="docDoc.id">Lorem ipsum dolor sit amet
      consectetur adipisicing elit. Praesentium quos hic odio dolor beatae cum perspiciatis delectus libero mollitia!
      Quos optio consequuntur laborum, assumenda ducimus culpa vero est facilis sit.</TextDocument>

    <p>( @update:title="doc.title = $event" 被替换→ :title.sync="doc.title" )</p>

    <!-- 一个组件可以加多个 .sync -->
    <TextDocument :title.sync="doc.title" :id="doc.id">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Numquam
      consequatur nisi sed, unde mollitia tenetur odit perspiciatis ipsa quaerat ipsum ad hic similique veritatis velit
      cumque necessitatibus nesciunt labore natus?</TextDocument>

    <!-- 用一个对象同时设置多个 prop -->
    <!-- 这样会把 doc 对象中的每一个 property (如 title) 都作为一个独立的 prop 传进去 -->
    <!-- 简化写法, 不用一个一个写 -->
    <TextDocument v-bind.sync="doc">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ratione, facilis.
    </TextDocument>
  </div>
</template>
