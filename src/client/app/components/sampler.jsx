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
            pads: Array(width * length).fill({
                trigger: false
            })
        };

    }
    handleTrigger(i) {
        let newState = _.clone(this.state);

        newState.pads[i].toggle = !newState.pads[i].toggle;

        this.setState(newState);
    }
    renderPad(i, toggle) {
        return <Pad toggle={ toggle } onClick={ () => this.handleTrigger(i) } />;
    }
    render() {
        const padState = _.clone(this.state.pads);

        let pads = padState.map((pad, key) => {
            return (
                <span key={ key }>
                    { this.renderPad(key, pad.trigger) }
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
