import React from 'react';
class PropsSend extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props);
  }
  getChildMsg =(data) => {
    console.log('接收子组件传过来的值',data)
  }
  render() {
    // 通过props接收父组件传过来的值
    return (
      <div className="box">
        <Child getMsg={this.getChildMsg} />
      </div>
    )
  }
}
class Child extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      msg:'写代码'
    }
  }
  getSendMsg =() => {
    this.props.getMsg(this.state.msg)
    // this.$emit('getMsg',{a:'参数'}) vue 写法
  }
  render() {
    return (
      <div className="box">
        子组件
        <button onClick={this.getSendMsg}>点击发送数据</button>
      </div>
    )
  }
}
export default PropsSend