// export default class ReactComponents {

//   static isReactComponent = {

//   }

//   constructor(props) {
//     this.props = props;
//   }
// }

/**
 * 源码是没用class写的，而是直接讲组件绑定到了prototype上
 */

function ReactComponents (props) {
  this.props = props;
}

ReactComponents.prototype.isReactComponent = {};
export default ReactComponents;