import React, { Component } from 'react';

/* Stateless component or pure component
 * { player } syntax is the object destructing
 */
const Game = (props) => {

    const divStyle = {
        display: 'flex',
        flexDirection: 'column',
        width: '65%',
        margin: '30px 10px 10px 30px'
    }

    //if the props for player is null, return player doesn't exist
    if(!this.props.team1P1) {
        return(<div style={divStyle}><h2>  Select a player to setup your game </h2> </div>);
    }

    //Else, display the product data
    return(
        <div style={divStyle}>
            <h2> GAME: {this.props.team1P1} </h2>
        </div>
    )
}

export default Game ;