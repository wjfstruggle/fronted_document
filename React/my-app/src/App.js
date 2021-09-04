import './App.css';
import ShoppingList from './ShoppingList';
import Count from './count';
import From from './from';
import FromNone from './fromNone';

function App() {
  return (
    <div className="App">
      <ShoppingList Mark="Mark" />
      <Count />
      <From />
      <FromNone />
    </div>
  );
}

export default App;
