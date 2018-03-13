import React from 'react';
import {fullWhite} from 'material-ui/styles/colors';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import FontIcon from 'material-ui/FontIcon';
import Chip from 'material-ui/Chip';

const styles = {
    chip: {
        margin: 4,
    },
    wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
    },
};


function handleRequestDelete() {
    alert('You clicked the delete button.');
}

function handleClick() {
    alert('You clicked the Chip.');
}

const ButtonTest = (props) => {
    console.log('now in last component');
    console.log(props);

    return(
        <Chip
            onRequestDelete={handleRequestDelete}
            onClick={handleClick}
            style={styles.chip}
        >
            {props.player.name}
        </Chip>
    )
};

export default ButtonTest;