import React from 'react';
class PropsSend1 extends React.Component {
  constructor(){
    super();
    this.state = {
      msg:'父组件的内容'
    }
  }
  getChildMsg =(data) => {
    console.log(data)
  }
  render() {
    return (
      <div className='parend'>
        父组件
        <Child  getMsg={this.getChildMsg}/>
      </div>
    )
  }
}
// 子组件
class Child extends React.Component {
  constructor(){
    super();
    this.state = {
      msg:'子组件的内容'
    }
  }
  sendMsg = ()=> {
    this.props.getMsg(this.state.msg);
  }
  render() {
    return (
      <div className='child'>
        子组件
        <button onClick={this.sendMsg}>点击</button>
      </div>
    )
  }
}
export default PropsSend1