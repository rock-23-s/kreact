import hasOwnProperty from './hasOwnProperty'

function render(vnode, container) {

  // vnode -> node
  const node = createNode(vnode);
  // 把 node 更新到 container
  console.log(node, '--- render')
  container.appendChild(node);
}

// 根据vnode，创建一个node
function createNode(vnode) {
  const { type, props } = vnode;
  if(!type && !props) return;
  let node;
  if(typeof type === 'function') {
    // node = type.isReactComponent
    node = type.prototype?.isReactComponent
      ?
      updateClassComponent(vnode)
      :
      updateFunctionComponent(vnode)
  } else if(type === 'TEXT') {
    node = document.createTextNode("")
  } else if(type) {
    node = document.createElement(type);
    /**
     * hasOwnProperty() 实例的方法
     * 返回Object一个布尔值，指示该对象是否将指定的属性作为其自己的属性（而不是继承它）
     */
    if(hasOwnProperty.call(props, 'key')) {
      const key = '' + props.key
      node.setAttribute('key', key)
    }
  } else {
    /**
     * createDocumentFragment()
     * 创建一个新的空对象DocumentFragment，可以将 DOM 节点添加到其中以构建屏幕外的 DOM 树。
     * 是DOMNode对象，它们永远不是主 DOM 树的一部分。
     * 由于文档片段位于内存中而不是主 DOM 树的一部分，因此向其追加子级不会导致页面回流 （元素位置和几何形状的计算）。
     * 从历史上看，使用文档片段可以带来更好的性能。
     */
    node = document.createDocumentFragment()
  }
  // 更新结点
  updateNode(node, props)
  // 调用渲染器: 传递vnode和父节点（node）
  reconfiler(props.children, node)
  return node;
}

// 渲染器
function reconfiler(children, node) {
  if(Array.isArray(children)) {
    const arr = [];
    const filterMap = (child) => {
      child.filter(item => {
        if(Array.isArray(item)) {
          filterMap(item)
        } else {
          arr.push(item)
        }
      })
    }
    filterMap(children)
    children = arr
  }
  for(let i = 0; i<children.length; i++) {
    // 遍历，创建元素
    render(children[i], node)
  }
}

// 处理更新节点
function updateNode(node, nextValue) {
  Object.keys(nextValue)
  .filter(k => k !== "children")
  .forEach(k => {
    if(k.slice(0,2) === 'on') {
      // 以on开头，就认为是一个事件，这里是简易版处理，源码的处理复杂些
      let eventName = k.slice(2).toLocaleLowerCase();
      node.addEventListener(eventName, nextValue[k])
    } else {
      node[k] = nextValue[k];
    }
  })
}

// function组件，返回node节点
function updateFunctionComponent(vnode) {
  const { type, props } = vnode;
  const vvnode = type(props);
  const node = createNode(vvnode)
  return node;
}

// class 继承式组件，返回node节点
function updateClassComponent(vnode) {
  const { type, props } = vnode;
  const component = new type(props);
  const vvnode = component.render();
  const node = createNode(vvnode);
  return node
}


export default {
  render
}