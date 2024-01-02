function render(vnode, container) {
  console.log('vnode', vnode);
  // vnode -> node
  const node = createNode(vnode);
  // 把 node 更新到 container
  container.appendChild(node);
}

// 根据vnode，创建一个node
function createNode(vnode) {
  const { type, props } = vnode;
  let node;
  if(type === 'TEXT') {
    node = document.createTextNode("")
  } else {
    node = document.createElement(type);
  }
  updateNode(node, props)
  // 调用渲染器: 传递vnode和父节点（node）
  reconfiler(props.children, node)
  console.log(props,'-----1111')
  return node;
}

// 渲染器
function reconfiler(children, node) {
  for(let i = 0; i<children.length; i++) {
    // 遍历，创建元素
    render(children[i], node)
  }
}

function updateNode(node, nextValue) {
  Object.keys(nextValue)
  .filter(k => k !== "children")
  .forEach(k => {
    node[k] = nextValue[k];
  })
}

export default {
  render
}