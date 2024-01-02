/**
 * createElement接收以下参数：
 * @param {*} type 
 * @param {*} props 
 * @param {*} children 
 * 
 * 返回一个虚拟dom（vnode）
 */
function createElement(type, props, ...children) {
  console.log(children, '---- children')
  return {
    type,
    props: {
      ...props,
      children: children.map(child => typeof child === 'object' ? child :createTextNode(child))
    }
  }
}

function createTextNode(text) {
  return {
    type: 'TEXT',
    props: {
      children: [],
      nodeValue: text
    }
  }
}

export default {
  createElement
}
