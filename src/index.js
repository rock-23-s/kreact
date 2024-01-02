import React from './react'
import ReactDom from './react/react-dom';
import ReactComponents from './react/react-component';
import './index.css';
// mock数据
import { mockList } from '../mock';
console.log(mockList)


// function component
const App = ({name}) => {
  return <div className="border borderComponent">
    Hello {name}
    <button onClick={() => console.log('This is button click function')}>click me</button>
  </div>
};

// class component
class AppComponent extends ReactComponents {
  render() {
    const { name } = this.props;
    return <div className="borderClass">This is {name}</div>
  }
}


const jsx = <div className="border">
  <h1>论蚍蜉</h1>
  <p>蚍蜉撼大树，可笑不自量</p>
  <App name="App Component" />
  <AppComponent name="Class App Component" />
  <h1>222</h1>
  <>
    <h5>文本1</h5>
    <h5>文本2</h5>
  </>
  <ul>
    {
      mockList.map((item) => {
        return <li key={item.id}>
          <span>名字：</span>{item.name}
        </li>
      })
    }
  </ul>
</div>
/**
 * 在页面中没有调用createElement的地方，
 * 那么这是如何调用react/index.js文件内的createElement方法那？
 * 这是因为babel：babel-loader
 * 注：只有在编译时jsx会调用一次createElement
 */
ReactDom.render(jsx, document.getElementById('root'))
// ReactDom.render(<App/>, document.getElementById('root'))
