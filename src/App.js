import React, { Component } from 'react'
import CreateTodo from './containers/CreateTodo'
import Reminder from './containers/Reminder'
import Home from './containers/Home'
import Table from './containers/Table'
import {routes} from './routing';
import { IndexRedirect } from 'react-router';
import { BrowserRouter as Router, Route, Redirect} from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="container" style={{ marginTop: "80px"}} >
          <Router>
    		    <div>
    		       <Route path="/home" component={Home}/>
               <Route path="/todo" exact component={CreateTodo}/>
               <Route path="/reminder" exact component={Reminder}/>
               <Route exact path="/" render={() => (<Redirect to="/home" />)} />
    		    </div>
  		    </Router>
        </div>
      </div>
    );
  }
}

export default App;
