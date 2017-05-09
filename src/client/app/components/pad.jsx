import React from 'react';
import '../../public/main.css';
import classNames from 'classnames';

function Pad (props) {
    let classes = classNames('box', { active: props.toggle });

    return (
        <button className={ classes }
            onClick={ () => props.onClick() }>
        </button>
    );
}

export default Pad;
