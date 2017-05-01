import React from 'react';
import {render} from 'react-dom';
import Sampler from './components/sampler.jsx';
import '../public/main.css';

class DrumMachine extends React.Component {
    constructor() {
        super();
        this.state = {
            controls: {
                tempo: 120
            },
            name: 'drummer'
        }
    }
    render () {
        return (
            <div>
                <h1 className="header">{ this.state.name }</h1>
                <div className="sampler-container">
                    <Sampler />
                </div>
            </div>
        );
    }
}

render(
    <DrumMachine />,
    document.getElementById('app')
);
