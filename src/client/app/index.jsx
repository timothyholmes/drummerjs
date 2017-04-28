import React from 'react';
import {render} from 'react-dom';
import ComponentName from './ComponentName.jsx';
import './style/main.css';

class App extends React.Component {
  render () {
    return (
      <div>
        <p className="test">Hello my guy!</p>
      </div>
    );
  }
}

render(<App/>, document.getElementById('app'));
