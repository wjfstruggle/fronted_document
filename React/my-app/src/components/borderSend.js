import React from 'react';
class BorderSend extends React.Component {
  constructor(props) {
    super(props);
    // 共享状态的数据
    this.state ={
      count: 1
    }
  }
  // 共享状态的事件
  add =() => {
    this.setState({
      count:this.state.count + 1
    })
  }
  render() {
    let {count} = this.state
    return (
      <div>
        <Child1 count={count}/>
        <Child2 add={this.add} />
      </div>
    )
  }
}
const Child1 = (props) => {
  return (
    <div>计数器：{props.count}</div>
  )
}
const Child2 = (props) => {
  
  return (
    <button onClick={props.add}>点击++</button>
  )
}
export default BorderSend;