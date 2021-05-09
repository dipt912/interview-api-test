import logo from '../logo.svg';
import './index.css';
import {Component} from 'react';
import CreateUser from './Component/CreateUser';
import API from '../api-service';

class App extends Component {
  constructor(props) {
    super(props);
    API.init()
}
  render () {
    return (
      <div className="App">
        <header className="App-header">
          <h4> Create User </h4>
        </header>
        <CreateUser />
      </div>
    );
  }
  }



export default App;
