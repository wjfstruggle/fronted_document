import './App.css';
import ShoppingList from './ShoppingList';
import Count from './count';
import From from './from';

function App() {
  return (
    <div className="App">
      <ShoppingList Mark="Mark" />
      <Count />
      <From />
    </div>
  );
}

export default App;
