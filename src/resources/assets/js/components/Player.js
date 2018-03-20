import React, { Component } from 'react';

/* Stateless component or pure component
 * { player } syntax is the object destructing
 */
const Player = ({player}) => {

    const divStyle = {
        display: 'flex',
        flexDirection: 'column',
        width: '65%',
        margin: '30px 10px 10px 30px'
    }

    //if the props for player is null, return player doesn't exist
    if(!player) {

        return(<div style={divStyle}><h2>  No Player was selected </h2> </div>);
    }

    //Else, display the product data
    return(
        <div style={divStyle}>
        <h2> {player.name} </h2>
        <p> {player.description} </p>
        <h3> Status {player.availability ? 'Available' : 'scorecard'} </h3>
        <h3> Wins : {player.price} </h3>
        <button type="button" className="btn btn-primary btn-lg" onClick={(e) => parent.handleTeamClick(e)}>Team 1</button>
        <button type="button" className="btn btn-primary btn-lg">Team 2</button>
        </div>
    )

    //this.setState({currentPlayer:player}); handleTeamClick


}

export default Player ;