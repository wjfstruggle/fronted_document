// 留言板
import React from 'react';
import './assest/css/send.scss'
class Send extends React.Component {
  constructor() {
    super();
    this.state = {
      comments:[],
      username:'',
      content:''
    }
  }
  renderList() {
    const { comments } = this.state
    return (
      comments.map(item => <li key={item.id} className="list-item">
        <h3 className="name">作者：{item.username}</h3>
        <p className="comment">评论内容：{item.content}</p>
      </li>
      )
    )
  }
  // 发表评论
  addComment =() => {
    const { comments,username,content } = this.state;
    if(username === ''&&content === "") {
      return;
    }
    const commentsNew = [{
      id:Math.random(),
      username:username,
      content:content
    },...comments];
    this.setState({
      comments:commentsNew,
      username: '',
      content:''
    });
  }
  sendFrom = (e) => {
    const { name , value } = e.target;
    this.setState({
      [name]:value
    })
  }
  render() {
    return (
      <div className="send">
        留言板
        <div className="username-box">
          <input name="username" onChange={this.sendFrom} className="username" type="text" placeholder="请输入用户名"/>
        </div>
        <div>
          <textarea name="content" onChange={this.sendFrom} className="content" type="text" cols="10" rows="10"  placeholder="请输入评论内容"/>
        </div>
        {/* 发表评论 */}
        <button className="btn" onClick={this.addComment}>发表评论</button>
        {/* 评论区域 */}
        <ul>
          {this.renderList()}
        </ul>
      </div>
    )
  }
}
export default Send