import React, { Component } from 'react';
import './App.css';
import VList from './VList';

class App extends Component {
  render() {
    let randomIntArr = Array.from({ length: 40 }, () => Math.floor(Math.random() * 40));

    return (
      <div className="App">
        <VList list={[4, 5, 6, 22, 23, 25, 1, 2, 8, 9, 12, 38, 31, 30, 22, 5]} />
      </div>
    );
  }
}

export default App;
