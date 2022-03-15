import React, {memo} from 'react';
import { renderRoutes } from 'react-router-config';
import {dicoverMenu} from '@/common/local-data.js'
import { NavLink } from 'react-router-dom';
import {DiscoverWrapper} from './style'

export default memo(function Discover() {
  const { route } = props;
  return (
    <DiscoverWrapper>
      <div className="top">
        {
          dicoverMenu.map((item, index) => {
            return (
              <div className="item" key={item.title}>
                <NavLink to={item.link}>{item.title}</NavLink>
              </div>
            )
          })
        }
        {renderRoutes(route.routes)}
      </div>
    </DiscoverWrapper>
  )
})
