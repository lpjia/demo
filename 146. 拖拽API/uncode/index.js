const container = document.querySelector('.container');

let source;
container.ondragstart = (e) => {
  e.dataTransfer.effectAllowed = e.target.dataset.effect;
  source = e.target;
};

container.ondragover = (e) => {
  e.preventDefault();
  // console.log('over', e.target);
};

function clearDropStyle() {
  document.querySelectorAll('.drop-over').forEach((node) => {
    node.classList.remove('drop-over');
  });
}

function getDropNode(node) {
  while (node) {
    if (node.dataset && node.dataset.drop) {
      return node;
    }
    node = node.parentNode;
  }
}

container.ondragenter = (e) => {
  // 清除之前的drop-over
  clearDropStyle();
  const dropNode = getDropNode(e.target);
  if (dropNode && dropNode.dataset.drop === e.dataTransfer.effectAllowed) {
    // 该节点能够接受目前拖拽的节点
    dropNode.classList.add('drop-over');
  }
};

container.ondrop = (e) => {
  clearDropStyle();
  const dropNode = getDropNode(e.target);
  if (dropNode && dropNode.dataset.drop === e.dataTransfer.effectAllowed) {
    if (dropNode.dataset.drop === 'copy') {
      dropNode.innerHTML = '';
      const cloned = source.cloneNode(true);
      cloned.dataset.effect = 'move';
      dropNode.appendChild(cloned);
    } else {
      // move
      source.remove();
    }
  }
};
