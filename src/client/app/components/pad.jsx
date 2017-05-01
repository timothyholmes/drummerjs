import React from 'react';
import '../../public/main.css';
import classNames from 'classnames'

function Pad(props) {
    const classes = classNames('box', {
        active: props.value.trigger,
        inactive: !props.value.trigger
    });

    return (
        <button className={classes}
            onClick={ () => props.onClick() }>
        </button>
    );
}

export default Pad;
