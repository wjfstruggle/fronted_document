import React from 'react';
import './assest/css/shopping-list.scss'
class ShoppingList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numbers:[1, 2, 3, 4, 5],
      inputValue:'',
      selectValue:'coconut',
      isToggleOn:true,
      loadingFlag:true,
      item:{
        id: 123,
        name:'233'
      },
      list:[
        { name:'海阔天空',id:'1' },
        { name:'光辉岁月',id:'2' },
        { name:'情人',id:'3' },
      ]
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
  toggleClick =() => {
    this.setState({
      isToggleOn: !this.state.isToggleOn
    })
  }
  // 删除
  deleteInfo =(item) => {
    console.log(item)
  }
  render() {
    const loading = () => {
      // if(this.state.loadingFlag) {
      //   return <div>loading ...</div>
      // }
      // return <div>加载完毕</div>
      return this.state.loadingFlag?(<div>loading ...</div>):(<div>加载完毕</div>)
    }
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
        <button onClick={this.toggleClick}>
          {this.state.isToggleOn? 'ON': 'OFF' }
        </button>
        <button onClick={this.deleteInfo.bind(this, this.state.item)}>删除</button>
        <div>{loading()}</div>
        <ul>
          {this.state.list.map(item => <li className="listItem" key={item.id}>{item.name}</li>)}
        </ul>
      </div>
    );
  }
}
export default ShoppingList