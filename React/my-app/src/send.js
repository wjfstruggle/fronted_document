// 留言板
import React from 'react';
import './assest/css/send.scss'
class Send extends React.Component {
  constructor() {
    super()
  }
  render() {
    return (
      <div className="send">
        留言板
        <div>
          <input className="username" type="text" placeholder="请输入用户名"/>
        </div>
        <div>
          <textarea className="content" type="text"  placeholder="请输入评论内容"/>
        </div>
      </div>
    )
  }
}
export default Send