import React from 'react';
import { Redirect } from 'react-router-dom'
// const HYDiscover = React.lazy(() => import("@/pages/discover"));
const routes = [
  {
    path: "/",
    exact: true,
    render: () => (
      <Redirect to="/discover"/>
    )
  },
]
export default routes;