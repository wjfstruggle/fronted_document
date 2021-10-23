import React from 'react';

class LifeCycle1 extends React.Component {
  constructor() {
    super();
    console.log('生命周期钩子函数， constructor')
  }
  // DOM操作，ajax请求
  componentDidMount() {
    console.log('生命周期钩子函数， componentDidMount')
    let div = document.querySelector('.div')
    console.log(div)
  }
  render() {
    console.log('生命周期钩子函数， render')
    return (
      <div className="div">

      </div>
    )
  }
}
export default LifeCycle1