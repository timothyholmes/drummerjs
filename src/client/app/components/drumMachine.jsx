import _ from 'lodash';
import React from 'react';
import {render} from 'react-dom';
import Sampler from './sampler.jsx';
import ControlPanel from './controlPanel.jsx';
import '../../public/main.css';

class DrumMachine extends React.Component {
    constructor() {
        super();
        this.state = {
            tempo: 120,
            flowControl: 0,
            name: 'DrummerJS'
        }

        // Bind methods to the component
        this.adjustFlowControl = this.adjustFlowControl.bind(this);
        this.adjustTempo = this.adjustTempo.bind(this);
        this.incrementTempo = this.incrementTempo.bind(this);
        this.decrementTempo = this.decrementTempo.bind(this);
    }

    adjustFlowControl(i) {
        const newState = _.clone(this.state);

        if (newState.flowControl === i) {
            return;
        }

        newState.flowControl = i;

        this.setState(newState);
    }

    adjustTempo(i) {
        const newState = _.clone(this.state);

        if (newState.tempo === i) {
            return;
        }

        newState.tempo = i;

        this.setState(newState);
    }

    decrementTempo() {
        this.adjustTempo(this.state.tempo - 1);
    }

    incrementTempo() {
        this.adjustTempo(this.state.tempo + 1);
    }

    render () {
        return (
            <div>
                <h1 className="header">{ this.state.name }</h1>
                    <ControlPanel
                        flowControl={ this.adjustFlowControl }
                        tempo={ this.state.tempo }
                        incTempo={ this.incrementTempo }
                        decTempo={ this.decrementTempo }/>
                <div className="sampler-container">
                    <Sampler />
                </div>
            </div>
        );
    }
}

export default DrumMachine;
