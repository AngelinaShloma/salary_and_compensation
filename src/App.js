import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Workers from './Pages/Workers/Workers';
import Debts from './Pages/Debts/Debts';
import LoginButton from './components/LoginButton';
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return(
    <Router>
    <div className="App">
      <LoginButton />
      <Switch>
        <ProtectedRoute path="/accountant/:id/worker/:id" component={Debts} />
        <ProtectedRoute path="/accountant/:id" component={Workers} />
      </Switch>
    </div>
    </Router>
  );
}

export default App;