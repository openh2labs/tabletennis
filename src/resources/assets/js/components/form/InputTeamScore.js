import React from 'react';



const InputTeamScore = (props) => {
    console.log('now in last component');
    console.log(props);

    return(
        <input
            type="text"
            name={"team" + props.teamId + "Score"}
            placeholder={props.placeHolder}
            className="form-control"
        />
    )
};

export default InputTeamScore;