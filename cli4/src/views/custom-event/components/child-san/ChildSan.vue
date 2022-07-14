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
    <TextDocument :title="docDoc.title" :id="docDoc.id" @update:title="docDoc.title = $event">Lorem ipsum dolor sit amet
      consectetur adipisicing elit. Praesentium quos hic odio dolor beatae cum perspiciatis delectus libero mollitia!
      Quos optio consequuntur laborum, assumenda ducimus culpa vero est facilis sit.</TextDocument>

    <p>( @update:title="doc.title = $event" 被替换 :title.sync="doc.title" )</p>

    <!-- 一个组件可以加多个 .sync -->
    <TextDocument :title.sync="doc.title" :id="doc.id">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Numquam
      consequatur nisi sed, unde mollitia tenetur odit perspiciatis ipsa quaerat ipsum ad hic similique veritatis velit
      cumque necessitatibus nesciunt labore natus?</TextDocument>
  </div>
</template>
