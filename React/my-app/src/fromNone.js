import React from 'react';
// 非受控组价获取value值
class FromNone extends React.Component {
  constructor() {
    super();
    this.state = {
      txt:''
    }
    this.txtRef = React.createRef();
  }

  getTxt = () => {
    console.log(this.txtRef.current.value)
  }

  render() {
    return (
      <div>
        <input type="text" ref={this.txtRef}></input>
        <button onClick={this.getTxt}>获取文本框的值</button>
      </div>
    )
  }
}
export default FromNone