import React, {Component} from 'react';
import Structure from './containers/Structure/Structure'
import Products from './containers/Products/Products'
import {Route, Switch} from 'react-router-dom'
import './App.css';

class App extends Component{
  render(){
    return (
      <Switch>
        <Route path="/products" component={Products}/>
        <Route path="/" exact component={Structure}/>
      </Switch>
    )
  }
}

export default App;
