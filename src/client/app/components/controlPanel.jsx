import React from 'react';
import {render} from 'react-dom';
import '../../public/main.css';

function ControlPanel (props) {
    return (
        <div className="control-panel">
            <button onClick={ () => props.stop() }>
                Stop
            </button>
            <button onClick={ () => props.pause() }>
                Pause
            </button>
            <button onClick={ () => props.play() }>
                Play
            </button>

            <button onClick={ () => props.decTempo() }>
                -
            </button>

            { props.tempo }

            <button onClick={ () => props.incTempo() }>
                +
            </button>
        </div>
    );
}

export default ControlPanel;
