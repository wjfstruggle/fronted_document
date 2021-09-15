import './App.css';
// import ShoppingList from './ShoppingList';
// import Count from './count';
// import From from './from';
// import FromNone from './fromNone';
// import Send from './send';
import PropsSend from './components/propsSend';

function App() {
  return (
    <div className="App">
      {/* <ShoppingList Mark="Mark" />
      <Count />
      <From />
      <FromNone /> */}
      <PropsSend name="jack" age={19}/>
    </div>
  );
}

export default App;
