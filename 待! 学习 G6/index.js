const data = {
  // 点集
  nodes: [
    {
      id: 'node1', // String，该节点存在则必须，节点的唯一标识
      x: 100, // Number，可选，节点位置的 x 值
      y: 200, // Number，可选，节点位置的 y 值
      // type: 'rect',
    },
    {
      id: 'node2', // String，该节点存在则必须，节点的唯一标识
      x: 300, // Number，可选，节点位置的 x 值
      y: 100, // Number，可选，节点位置的 y 值
    },
    {
      id: 'node3', // String，该节点存在则必须，节点的唯一标识
      x: 300, // Number，可选，节点位置的 x 值
      y: 400, // Number，可选，节点位置的 y 值
    },
  ],
  // 边集
  edges: [
    {
      source: 'node1', // String，必须，起始点 id
      target: 'node3', // String，必须，目标点 id
      label: '我是连线', // 边的文本
    },
  ],
};


const graph = new G6.Graph({
  container: 'mountNode', // String | HTMLElement，必须，在 Step 1 中创建的容器 id 或容器本身
  width: 800, // Number，必须，图的宽度
  height: 500, // Number，必须，图的高度
  defaultNode: {
    type: 'rect',
    // 其他配置
  },
  defaultEdge: {
    type: 'polyline',
    // 其他配置
  },
});


graph.data(data); // 读取 Step 2 中的数据源到图上
graph.render(); // 渲染图