import React from './react'
import ReactDom from './react/react-dom';
import './index.css';

const App = () => {
  return <div className="border">app</div>
};
const jsx = <div className="border">
  <h1>论蚍蜉</h1>
  <p>蚍蜉撼大树，可笑不自量</p>
</div>
/**
 * 在页面中没有调用createElement的地方，
 * 那么这是如何调用react/index.js文件内的createElement方法那？
 * 这是因为babel：babel-loader
 */
ReactDom.render(jsx, document.getElementById('root'))
// ReactDom.render(<App/>, document.getElementById('root'))
