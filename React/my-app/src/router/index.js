import React from 'react';
import { Redirect } from 'react-router-dom'
const Discover = React.lazy(() => import("@/pages/discover"));
const Recommend = React.lazy(() => import("@/pages/discover/c-pages/recommend"));
const Mine = React.lazy(() => import("@/pages/mine"));
const Firend = React.lazy(() => import("@/pages/friend"));
const routes = [
  {
    path: "/",
    exact: true,
    render: () => (
      <Redirect to="/discover"/>
    )
  },
  {
    path:'/discover',
    component:Discover,
    // 子路由
    routes:[
      {
        path: "/discover",
        exact: true,
        render: () => (
          <Redirect to="/discover/recommend"/>
        )
      },
      {
        path: "/discover/recommend",
        component: Recommend
      },
    ]
  },
  {
    path:'/mine',
    component:Mine,
  },
  {
    path:'/friend',
    component:Firend,
  }
]
export default routes;