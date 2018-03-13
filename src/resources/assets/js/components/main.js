import React, { Component } from 'react';

import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MyAwesomeReactComponent from './MyAwesomeReactComponent';
import ButtonTest from './ButtonTest.js';

import Player2 from './Player2';
import AddPlayer from './AddPlayer';
import MainNav from './MainNav';
import Game2 from './Game2';



/* Main Component */
class Main extends Component {

    constructor() {

        super();
        //Initialize the state in the constructor
        this.state = {
            players: [],
            currentPlayer: null,
            team1P1: null,
            team1P2: null,
            team2P1: null,
            team2P2: null,
            team1Display: "",
            team2Display: ""
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

    // team 1 selectors
    handleTeamClick(player) {
    this.checkIfPlayerInAnotherTeam(player,1);
        console.log({player});
        if(this.state.team1P1 === null){
           // this.setState({team1P1:player});
            this.setState({
                team1P1: player
            }, () => {
                this.updateTeamName(1);
            });
        }else{
            if(this.state.team1P2 === null){
             //   this.setState({team1P2:player});
                this.setState({
                    team1P2: player
                }, () => {
                    this.updateTeamName(1);
                });
            }
        }
    }

    // team 2 selectors
    handleTeamClick2(player) {
        this.checkIfPlayerInAnotherTeam(player,2);
        console.log({player});
        //this.setState({team2P1:player});
        if(this.state.team2P1 === null){
            // this.setState({team1P1:player});
            this.setState({
                team2P1: player
            }, () => {
                this.updateTeamName(2);
            });
        }else{
            if(this.state.team2P2 === null){
                //   this.setState({team1P2:player});
                this.setState({
                    team2P2: player
                }, () => {
                    this.updateTeamName(2);
                });
            }
        }
    }

    // check if a player is already in another team and remove them
    checkIfPlayerInAnotherTeam(player, newTeam){
        if(newTeam === 2){
            if(player === this.state.team1P1){
                this.setState({team1P1:null});
            }
            if(player === this.state.team1P2){
                this.setState({team1P2:null});
            }
        }else{
            if(player === this.state.team2P1){
                this.setState({team1P1:null});
            }
            if(player === this.state.team2P2){
                this.setState({team1P2:null});
            }
        }
    }

    /**
     * provide team name to display
     * @param team
     */
    updateTeamName(team){
        console.log('update team 1' + this.state.team1P1);
        if(team === 1){
            //this.setState({team1Display: ""})
            if(this.state.team1P1 !== null){
                this.setState({team1Display: this.state.team1P1.name});
            }
            if(this.state.team1P2 !== null){
                this.setState({team1Display: this.state.team1P1.name + " - " + this.state.team1P2.name});
            }
        }else{
            if(this.state.team2P1 !== null){
                this.setState({team2Display: this.state.team2P1.name});
            }
            if(this.state.team2P2 !== null){
                this.setState({team2Display: this.state.team2P1.name + " - " + this.state.team2P2.name});
            }
        }
    }

    // post to the ms to save the player
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

    // render the output
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
            <MuiThemeProvider>
            <div>
            <MainNav></MainNav>
                <Game2 team1Display={this.state.team1Display} team2Display={this.state.team2Display} team1P1={this.state.team1P1} team1P2={this.state.team1P2} team2P1={this.state.team2P1} team2P2={this.state.team2P2}/>
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
                <MuiThemeProvider>
                    <MyAwesomeReactComponent />
                </MuiThemeProvider>
            </div>
            </MuiThemeProvider>
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