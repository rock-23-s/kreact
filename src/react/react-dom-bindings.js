/**
 * dom 处理style属性的方法
 */
export function setValueForStyles (node, style) {
  for(let value in style) {
    node.style[value] = style[value]
  }

}