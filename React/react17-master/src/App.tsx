// https://www.notion.so/React-491ad0643476437cafde50bee4dde6ed
// https://github.com/HouXingYi/JiraReactHookTS4Learn/blob/master/src/utils/index.ts
import React from 'react';
// import logo from "./logo.svg";
import { ProjectListScreen } from 'screens/project-list'
import { LoginScreen } from 'screens/login'
import './App.css';

function App () {
  return (
    <div className="App">
      <LoginScreen />
      {/* <ProjectListScreen/> */}
    </div>
  );
}

export default App;
