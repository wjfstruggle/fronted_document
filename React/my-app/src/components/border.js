// 兄弟组件通信
import React from 'react';
import PropTypes from 'prop-types'
class BorderSend extends React.Component {
  constructor() {
    super();
    this.state = {
      count:0,
      list:[
        { name:'战三', id:1 },
        { name:'李四', id:2 },
        { name:'王五', id:3 },
        { name:'刘六', id:4 },
      ]
    }
  }
  addCount = () => {
    this.setState({
      count: this.state.count + 1
    })
  }
  render() {
    return (
      <div className="box">
        <Child1 list={this.state.list} count= {this.state.count}/>
        <Child2 addCount={this.addCount}  />
      </div>
    )
  }
}
const Child1 = (props) => {
  return (
    <div>计数器：{props.count}
      <div>props校验</div>
      <ul>
        {props.list.map(item => <li key={item.id}>{item.name}</li>)}
      </ul>
    </div>
  )
}
Child1.prototype = {
  list:PropTypes.array,
}
const Child2 = (props) => {
  return (
    <button onClick={() => props.addCount()}>点击</button>
  )
}
export default BorderSend