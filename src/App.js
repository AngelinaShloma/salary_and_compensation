import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Workers from './Pages/Workers/Workers';
import Debts from './Pages/Debts/Debts';

function App() {
  return(
    <Router>
    <div className="App">
      <Workers />
      <Switch>
        <Route exact path="/worker/:id" component={Debts} />
      </Switch>
    </div>
    </Router>
  );
}

export default App;