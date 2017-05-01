import React from 'react';
import '../../style/main.css';

function Pad(props) {
    console.log('props', props);
    return (
        <button className="box"
            onClick={ () => props.onClick() }>
        </button>
    );
}

export default Pad;
