import React from 'react';

class LifeCycle2 extends React.Component {
  constructor() {
    super();
    this.state = {
      count: 1
    }
  }
  add =() => {
    this.setState({
      count: this.state.count + 1
    })
  }
  render() {
    console.log('生命周期钩子函数， render')
    return (
      <div className="div">
        <Count count = {this.state.count} />
        <button onClick={this.add}>点击</button>
      </div>
    )
  }
}
const Count = (props) => {
  console.log('子组件生命周期钩子函数， render')
  return (
    <div>
      {props.count}
    </div>
  )
}
export default LifeCycle2