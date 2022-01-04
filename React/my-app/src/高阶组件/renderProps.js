import React from 'react';
class RenderProps extends React.Component {
  constructor() {
    super();
    this.state = {
      x: 0,
      y: 0
    }
  }
  handelMouse = (e) => { 
    this.setState({
      x: e.clientX,
      y: e.clientY
    })
  }
  componentDidMount() {
    window.addEventListener('mousemove', this.handelMouse)
  }
  render() {
    return this.props.render(this.state)
  }
}
export default RenderProps