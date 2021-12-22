import './App.css';
// import ShoppingList from './ShoppingList';
// import Count from './count';
// import From from './from';
// import FromNone from './fromNone';
// import Send from './send';
// import PropsSend from './components/propsSend';
// import BorderSend from './components/border';
// import LifeCycle3 from './生命周期/LifeCycle3';
import RenderProps from './高阶组件/renderProps'

function App() {
  return (
    <div className="App">
      <RenderProps render={mouse => {
        return (
          <p>
            鼠标的位置：{mouse.x} {mouse.x}
          </p>
        )
      }} />
    </div>
  );
}

export default App;
