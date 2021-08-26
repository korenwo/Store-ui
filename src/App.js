import './App.css';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Home from './Components/Home';
import Stats from './Components/Stats';
import Admin from './Components/Admin';
import AddToCart from './Components/AddToCart';

function App() {

  return (
     <div className="App">
        <BrowserRouter>
          <Switch>
            <Route path="/admin">
              <Admin/>
            </Route>
            <Route path="/stats">
              <Stats/>
            </Route>
            <Route path="/addToCart">
              <AddToCart/>
            </Route>
            <Route path="/" exact>
              <Home />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
  );
}

export default App;