import React from 'react';
const Like = props => {
    const { liked, click } = props;
    let flag = 'hit';
    if (liked) flag += ' liked';
    return (
        <i className={flag} onClick={click}></i>
    );
}
export default Like;