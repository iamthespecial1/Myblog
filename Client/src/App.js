import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Link } from 'react-router-dom'
class App extends React.Component {

  componentDidMount() {
    // console.log(this.props)
    if (!localStorage.getItem('UserId')) {
      this.props.history.push("/login")
    }
    else {
      this.props.history.push("/comments")
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <Link to="">Enter</Link>
        </header>
      </div>
    );
  }
}

export default App;



