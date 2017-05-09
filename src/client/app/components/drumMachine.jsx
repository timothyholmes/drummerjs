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
        this.adjustSingleStateProperty = this.adjustSingleStateProperty.bind(this);
        this.play = this.play.bind(this);
        this.pause = this.pause.bind(this);
        this.stop = this.stop.bind(this);
        this.incrementTempo = this.incrementTempo.bind(this);
        this.decrementTempo = this.decrementTempo.bind(this);
    }

    adjustSingleStateProperty(newVal, prop) {
        const newState = _.clone(this.state);

        if (newState[prop] === newVal) {
            return;
        }

        newState[prop] = newVal;

        this.setState(newState);
    }

    play() {
        this.adjustSingleStateProperty(1, 'flowControl');
    }

    pause() {
        this.adjustSingleStateProperty(-1, 'flowControl');
    }

    stop() {
        this.adjustSingleStateProperty(0, 'flowControl');
    }

    decrementTempo() {
        this.adjustSingleStateProperty(this.state.tempo - 1, 'tempo');
    }

    incrementTempo() {
        this.adjustSingleStateProperty(this.state.tempo + 1, 'tempo');
    }

    render () {
        return (
            <div className="app-wrap">
                <h1 className="header">{ this.state.name }</h1>
                    <ControlPanel
                        play={ this.play }
                        pause={ this.pause }
                        stop={ this.stop }
                        tempo={ this.state.tempo }
                        incTempo={ this.incrementTempo }
                        decTempo={ this.decrementTempo }/>
                <div className="sampler-container">
                    <Sampler
                        tempo={ this.state.tempo }
                        flowControl={ this.state.flowControl }/>
                </div>
            </div>
        );
    }
}

export default DrumMachine;
