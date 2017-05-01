import React from 'react';
import Pad from './pad.jsx';
import _ from 'lodash';

class Sampler extends React.Component {
    constructor() {
        super();

        // TO-DO: Either pull these into a constants object, or make them configurable.
        const width = 8,
            length = 4,
            soundTypes = ['kick', 'snare', 'hatClosed', 'hatOpened'];

        let samplePads = Array();

        soundTypes.forEach((e) => {
            samplePads = samplePads.concat(
                Array(width).fill({
                    type: e,
                    trigger: false
                })
            );
        });

        this.state = {
            pads: samplePads,
            dimensions: {
                width: width,
                length: length
            }
        };
    }
    handleTrigger(i) {
        this.state.pads[i].trigger = !this.state.pads[i].trigger;
        console.log('play sound', this.state.pads[i]);
    }
    renderPad(i) {
        return <Pad value={ this.state.pads[i] } onClick={ () => this.handleTrigger(i) } />;
    }
    render() {
        const padState = _.clone(this.state.pads);

        let pads = padState.map((sound, key) => {
            return (
                <span key={key}>
                    { this.renderPad(key) }
                </span>
            )
        });

        return (
            <div>
                { pads }
            </div>
        );
    }
}

export default Sampler;
