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
    console.log(e);
}

function handleClick() {
    //document.getElementById('InputScore2').value="";

    alert('You clicked the Chip.');
}

// @deprecated
const ButtonTest = (props) => {
    console.log('now in last component');
    console.log(props);
    var chipId = "chipDelete" + props.player.id;
    return(
        <Chip
            onRequestDelete={handleRequestDelete}
            onClick={handleClick}>{props.player.id}
            style={styles.chip}
            className="small"
            value={props.player.id}
        >
            {props.player.name}
        </Chip>
    )
};

export default ButtonTest;