import React from 'react';
class From extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title:'RNG',
      textarea:'',
      selectValue:'coconut',
      checked:true
    }
  }
  handelChange = e => {
    const target = e.target;
    const value = target.type === 'checkbox'
    ? target.checked
    : target.value
    // 获取name属性
    const name = target.name;
    this.setState({
      [name]:value
    })
  }
  render() {
    return (
      <div className="from">
        <input name="title" type="text" onChange={this.handelChange} value={this.state.title} />
        <textarea name="textarea" type="textarea" value={this.state.textarea}  onChange={this.handelChange}></textarea>
        <input name="checked" type="checkbox" onChange={this.handelChange} checked={this.state.checked} />
        <label>
          选择你喜欢的风味:
          <select name="selectValue" value={this.state.selectValue} onChange={this.handelChange}>
            <option value="grapefruit">葡萄柚</option>
            <option value="lime">酸橙</option>
            <option value="coconut">椰子</option>
            <option value="mango">芒果</option>
          </select>
        </label>
      </div>
    )
  }
}
export default From