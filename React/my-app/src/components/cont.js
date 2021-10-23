import React from 'react';
// 多层级组件传值
const {Provider, Consumer} = React.createContext()
class Cont extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <Provider value="pink">
        <div>
          <Node  />
        </div>
      </Provider>
    )
  }
}
const Node = () => {
  return (
    <div>
      <SubNode />
    </div>
  )
}
const SubNode = () => {
  return (
    <div>
      <Child />
    </div>
  )
}
const Child = () => {
  return (
    <Consumer>
      {data => <span>{data}</span>}
    </Consumer>
    
  )
}
export default Cont