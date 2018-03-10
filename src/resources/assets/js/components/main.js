import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Player from './Player';
import Player2 from './Player2';
import AddPlayer from './AddPlayer';
import MainNav from './MainNav';
import Game from './Game';

/* Main Component */
class Main extends Component {

    constructor() {

        super();
        //Initialize the state in the constructor
        this.state = {
            players: [],
            currentPlayer: null,
            team1: null,
            team2: null
        }
        console.log('constructor (main).');
        this.handleAddPlayer = this.handleAddPlayer.bind(this);
        this.handleTeamClick = this.handleTeamClick.bind(this); //team 1 selection
        this.handleTeamClick2 = this.handleTeamClick2.bind(this); //team 2 selection
    }
    /*componentDidMount() is a lifecycle method
     * that gets called after the component is rendered
     */
    componentDidMount() {
        /* fetch API in action */
        fetch('/api/player')
            .then(response => {
            return response.json();
        })
        .then(players => {
                //Fetched player is stored in the state
                this.setState({ players });
        });
    }

    renderPlayers() {
        const listStyle = {
            listStyle: 'none',
            fontSize: '18px',
            lineHeight: '1.8em',
        }
        return this.state.players.map(player => {
                return (
            /* When using list you need to specify a key
             * attribute that is unique for each list item
            */
            <li style={listStyle} onClick={
        () =>this.handleClick(player)} key={player.id} >
        { player.name }
    </li>
    );
    })
    }

    handleClick(player) {
        //handleClick is used to set the state
        this.setState({currentPlayer:player});
      //  this.setState({Player2});
    }

    // team selectors
    handleTeamClick(player) {
        console.log({player});
        this.setState({team1:player});
    }
    handleTeamClick2(player) {
        console.log({player});
        this.setState({team2:player});
    }

    handleAddPlayer(player) {

        //player.price = Number(player.price);
        /*Fetch API for post request */
        fetch( 'api/player/', {
            method:'post',
            /* headers are important*/
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(player)
        })
            .then(response => {
            return response.json();
    })
    .then( data => {

            this.setState((prevState)=> ({
            players: prevState.players.concat(data),
            currentPlayer : data
        }))
    })
        //update the state of players and currentPlayer
    }

    render() {


        const mainDivStyle =  {

            display: "flex",
            flexDirection: "row"
        }

        const divStyle = {

            justifyContent: "flex-start",
            padding: '10px',
            width: '35%',
            background: '#f0f0f0',
            padding: '20px 20px 20px 20px',
            margin: '30px 10px 10px 30px'

        }

        return (

            <div>
            <MainNav></MainNav>
                <Game player={this.state.currentPlayer} />
                <div style= {mainDivStyle}>
                    <div style={divStyle}>

                        <h3> players </h3>
                        <ul>
                            { this.renderPlayers() }
                        </ul>
                     </div>
                    <Player2 currentPlayer={this.state.currentPlayer} onTeam1Select={this.handleTeamClick} onTeam2Select={this.handleTeamClick2} />

                    <AddPlayer onAdd={this.handleAddPlayer} />
                </div>
            </div>
        );
    }
}

export default Main;

/* The if statement is required so as to Render the component
 * on pages that have a div with an ID of "root";
 */

if (document.getElementById('root')) {
    ReactDOM.render(<Main />, document.getElementById('root'));
}