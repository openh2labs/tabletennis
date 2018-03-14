import React from 'react';
import PropTypes from 'prop-types';

function handleSubmit(e, teamId, currentPlayer){
    //preventDefault prevents page reload
    e.preventDefault();
    console.log('The button was clicked for team ' + teamId);
    console.log(currentPlayer);
    /*A call back to the onAdd props. The control is handed over
     *to the parent component. The current state is passed
     *as a param
     */
    //this.props.sendback(currentPlayer);
    this.props.myFunc(currentPlayer);
}

const ButtonTeamSelect = (props) => {
    ButtonTeamSelect.propTypes = {
        myFunc: React.PropTypes.func
    };

    return(
        <button
            className="btn btn-default"
            onClick={(e) =>  handleSubmit(e, 1, props.currentPlayer)}
            >{"assing to team " + props.teamId}
        </button>
            )
}


export default ButtonTeamSelect;