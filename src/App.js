import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  Link,
} from 'react-router-dom';
import Welcome from './components/welcome/welcome';
import CoreDashboard from './components/core/CoreDashboard';
import Personal from './components/personal/personal';
import Download from './components/download/download';
import SendMessagePopup from './components/letterpopup/SendMessagePopup';
import ReadMessagePopup from './components/letterpopup/ReadMessagePopup';
import './App.css';
import AdminDashboard from './components/admin/AdminDashboard';
import Statistics from './components/admin/Statistics';
//import Credits from './components/credits/credits';
import Team from '.././src/components/credits/creds1';
import instructions from '.././src/components/instructions/instructions';
import instructionsland from '../src/components/instructions/instructionslanding';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Welcome} />
        <Route exact path="/home" component={Personal} />
        <Route exact path="/download" component={Download} />
        <Route exact path="/core" component={CoreDashboard} />
        <Route exact path="/admin" component={AdminDashboard} />
        <Route exact path="/send" component={ReadMessagePopup} />
        <Route exact path="/stats" component={Statistics} />
        <Route exact path="/credits" component={Team} />
        <Route exact path="/instructions" component={instructions} />
        <Route exact path="/instructionslanding" component={instructionsland} />
      </Switch>
    </Router>
  );
}

export default App;
