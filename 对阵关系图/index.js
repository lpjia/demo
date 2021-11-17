const res = await fetch('lpl_2021_summer.json')
const dataArr = await res.json()
const data = dataArr[0]
const container = document.getElementById('container');
const graph = new G6.TreeGraph({
  container: 'container',
  width: 700,
  height: 500,
  modes: {
    default: [
      {
        type: 'collapse-expand',
        onChange: function onChange(item, collapsed) {
          const data = item.get('model');
          data.collapsed = collapsed;
          return true;
        },
      },
      'drag-canvas',
      'zoom-canvas',
    ],
  },
  defaultNode: {
    size: [40, 20],
    // anchorPoints: [
    //   [0, 0.5],
    //   [1, 0.5],
    // ],
    type: 'rect',
  },
  defaultEdge: {
    type: 'polyline',
    style: {
      startArrow: true
    }
  },
  layout: {
    type: 'mindmap',
    direction: 'H',
    getHeight: () => {
      return 20;
    },
    getWidth: () => {
      return 60;
    },
    getVGap: () => {
      return 10;
    },
    getHGap: () => {
      return 10;
    },
    getSide: () => {
      return 'left';
    },
  },
});

// let centerX = 0;
graph.node(function (node) {
  // if (node.id === 'Modeling Methods') {
  //   centerX = node.x;
  // }

  return {
    label: node.name,
    labelCfg: {
      // position: =
      //   node.children && node.children.length > 0
      //     ? 'right'
      //     : node.x > centerX
      //       ? 'right'
      //       : 'left',
      // offset: 100,
    }
  };
});
graph.data(data);
graph.render();
graph.fitView();

if (typeof window !== 'undefined')
  window.onresize = () => {
    if (!graph || graph.get('destroyed')) return;
    if (!container || !container.scrollWidth || !container.scrollHeight) return;
    graph.changeSize(container.scrollWidth, container.scrollHeight);
  };
