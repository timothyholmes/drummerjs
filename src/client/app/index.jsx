import React from 'react';
import {render} from 'react-dom';
import AwesomeComponent from './AwesomeComponent.jsx';
import './style/main.scss';

class App extends React.Component {
  render () {
    return (
      <div className="test-class">
        <p>Hello my guy!</p>
        <AwesomeComponent />
      </div>
    );
  }
}

render(<App/>, document.getElementById('app'));
