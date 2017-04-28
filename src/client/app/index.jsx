import React from 'react';
import {render} from 'react-dom';
import ComponentName from './components/ComponentName.jsx';
import '../style/main.css';

class DrumMachine extends React.Component {
    constructor() {
        super();
        this.state = {
            controls: {
                tempo: 120
            },
            name: 'DrummerJS'
        }
    }
    render () {
        return (
            <div>
                <h1>{ this.state.name }</h1>
            </div>
        );
    }
}

render(
    <DrumMachine />,
    document.getElementById('app')
);
