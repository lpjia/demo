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

function getDropNode(node) {
  while (node) {
    if (node.dataset.drop) {
      return node;
    }
    node = node.parentNode;
  }
}

function clearDropStyle() {
  const dropNodes = document.querySelectorAll('.drop-over');
  dropNodes.forEach((node) => {
    node.classList.remove('drop-over');
  });
}

container.ondragenter = (e) => {
  clearDropStyle();
  const dropNode = getDropNode(e.target);
  if (!dropNode) {
    return;
  }
  if (e.dataTransfer.effectAllowed === dropNode.dataset.drop) {
    dropNode.classList.add('drop-over');
  }

  // console.log('enter', e.target);
};

container.ondrop = (e) => {
  clearDropStyle();
  const dropNode = getDropNode(e.target);
  if (!dropNode) {
    return;
  }
  if (e.dataTransfer.effectAllowed !== dropNode.dataset.drop) {
    return;
  }
  if (dropNode.dataset.drop === 'copy') {
    dropNode.innerHTML = '';
    const cloned = source.cloneNode(true);
    cloned.dataset.effect = 'move';
    dropNode.appendChild(cloned);
  } else {
    // move
    source.remove();
  }
};
