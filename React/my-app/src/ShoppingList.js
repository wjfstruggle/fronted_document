import React from 'react';
import './assest/css/shopping-list.css'
class ShoppingList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numbers:[1, 2, 3, 4, 5],
      inputValue:'',
      selectValue:'coconut'
    };
  }
  clickHandel = (event) => {
    this.setState({inputValue:event.target.value})
    console.log(event.target.value)
  }
  handelSubmit = (event) => {
    console.log(this.state.inputValue)
    event.preventDefault();
  }
  handleChange =(event) =>{
    this.setState({selectValue:event.target.value})
  }
  handleSelectSubmit =(event) =>{
    alert(this.state.selectValue);
    event.preventDefault();
  }
  render() {
    return (
      <div className="shopping-list">
        <form onSubmit={this.handelSubmit}>
          <label>
            名字:
            <input type="text" name="name" onChange={this.clickHandel}/>
          </label>
          <input type="submit" value="提交" />
        </form>
        <form onSubmit={this.handleSelectSubmit}>
        <label>
          选择你喜欢的风味:
          <select value={this.state.selectValue} onChange={this.handleChange}>
            <option value="grapefruit">葡萄柚</option>
            <option value="lime">酸橙</option>
            <option value="coconut">椰子</option>
            <option value="mango">芒果</option>
          </select>
        </label>
        <input type="submit" value="提交" />
      </form>
      </div>
    );
  }
}
export default ShoppingList