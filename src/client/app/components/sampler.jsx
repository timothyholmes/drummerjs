import React from 'react';
import Pad from './pad.jsx';
import _ from 'lodash';
import classNames from 'classnames';

class Sampler extends React.Component {
    constructor(props) {
        super(props);

        // TO-DO: Either pull these into a constants object, or make them configurable.
        const width = 8,
            length = 4;

        this.state = {
            pads: Array(width * length).fill(false)
        };

    }
    handleTrigger(i) {
        let newState = _.clone(this.state);

        newState.pads[i] = !newState.pads[i];

        this.setState(newState);
    }
    renderPad(i) {
        return <Pad toggle={ this.state.pads[i] } onClick={ () => this.handleTrigger(i) } />;
    }
    render() {
        const padState = _.clone(this.state.pads);

        let pads = padState.map((pad, key) => {
            return (
                <span key={ key }>
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
