import React, {memo} from 'react';
import { NavLink } from 'react-router-dom'
import { headerLinks } from '@/common/local-data';
// import { SearchOutlined } from '@ant-design/icons'
// import { Input } from "antd";
import { HeaderWrapper,HeaderLeft } from './style'

export default memo(function AppHeader(){
  // 页面代码
  const showSelectItem = (item,index) => {
    return (
      <NavLink to={item.link}>
        {item.title},
        <i className='sprite_01 icon'></i>
      </NavLink>
    )
  }
  // 返回的jsx
  return (
    <HeaderWrapper>
      <div className='content wrap-v1'>
        <HeaderLeft>
          <a href="#/" className="logo sprite_01">网易云音乐</a>
          <div className='select-list'>
            {
              headerLinks.map((item,index) => {
                return (
                  <div key={item.title} className='select-item'>
                    {showSelectItem(item,index)}
                  </div>
                )
              })
            }
          </div>
        </HeaderLeft>
      
    </div>
    </HeaderWrapper>
  )
})