import React from 'react';
import '../../public/main.css';
import classNames from 'classnames';

function Pad (props) {
    console.log('props', props.i);
    return (
        <button className={ props.sample.className }
            onClick={ () => props.onClick() }>
        </button>
    );
}

export default Pad;
