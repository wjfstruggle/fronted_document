import React from 'react';
class Count extends React.Component {
  state = {
    count: 0
  }
  addClick =() => {
    this.setState({
      count: this.state.count + 1
    })
  }
  render() {
    return (
      <div className="count">
        <span>数字:{this.state.count}</span>
        <button onClick={this.addClick}>点击</button>
      </div>
    )
  }
}
export default Count