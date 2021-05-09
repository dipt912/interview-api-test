import logo from '../logo.svg';
import './index.css';
import { Component } from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import CreateUser from './Component/CreateUser';
import API from '../api-service';
import ConfirmationComp from './Component/ConfirmationComp';

class App extends Component {
  constructor(props) {
    super(props);
    API.init()
  }
  render() {
    return (
        <div className="App">
          <header className="App-header">
            <h4> Create User </h4>
          </header>
          <BrowserRouter>
            <Switch>
            <Route  path="/confirmed-user">
                <ConfirmationComp/>
              </Route>
              <Route  path="/interview-api-test">
                <CreateUser />
              </Route>
              <Route path="/">
                <CreateUser />
              </Route>
            </Switch>
      </BrowserRouter>

        </div>
    );
  }
}



export default App;
