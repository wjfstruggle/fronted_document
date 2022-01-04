import React from 'react';

class LifeCycle3 extends React.Component {
  constructor(props) {
    super(props);
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
    return (
      <div className="div">
        <Count count = {this.state.count} />
        <button onClick={this.add}>点击</button>
      </div>
    )
  }
  // 更新DOM操作
  componentDidUpdate(prevPropps) {
    console.log('子组件生命周期钩子函数， componentDidUpdate')
    // 如果调用setState更新状态，需要加if条件，如果直接调用，会导致setState递归更新
    console.log('上一次的内容：'+ prevPropps.count,'更新的内容：'+ this.props.count)
    // this.setState({})
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
export default LifeCycle3