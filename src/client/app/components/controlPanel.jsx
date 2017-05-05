import React from 'react';
import {render} from 'react-dom';
import '../../public/main.css';

function ControlPanel (props) {
    return (
        <div>
            <button onClick={ () => props.onClick(0) }>
                Stop
            </button>
            <button onClick={ () => props.onClick(-1) }>
                Pause
            </button>
            <button onClick={ () => props.onClick(1) }>
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
