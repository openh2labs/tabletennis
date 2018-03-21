import React, { Component } from 'react';

import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MyAwesomeReactComponent from './MyAwesomeReactComponent';
import Player2 from './Player2';
import AddPlayer from './AddPlayer';
//import MainNav from './MainNav'; 
import Game2 from './Game2';
import PubSub from 'pubsub-js'; // example https://anthonymineo.com/communication-between-independent-components-in-react-using-pubsubjs/


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
            team1Count: 0,
            team2Count: 0,
            team1Display: "",
            team2Display: "",

        }
       // this.client = new BaseClient();
        this.handleAddPlayer = this.handleAddPlayer.bind(this);
        this.handleTeamClick = this.handleTeamClick.bind(this); //team 1 selection
        this.handleTeamClick2 = this.handleTeamClick2.bind(this); //team 2 selection

    }

    // The function that is subscribed to the publisher
    subscriber(EventName, data){
        console.log(EventName);
        if(EventName === "playerRemovedFromTeam"){
            this.subscriberPlayerRemovedFromTeam(EventName, data);
        }
        if(EventName === "TeamSelected"){
            if(data===1){
                this.handleTeamClick(this.state.currentPlayer);
            }else{
                this.handleTeamClick2(this.state.currentPlayer);
            }
        }
    }

    subscriberPlayerRemovedFromTeam(EventName, data){
        console.log('subscriberPlayerRemovedFromTeam');
        // add back to array
        this.addPlayerToArray(data);
        // remove from player settings @todo we need to reissue web service request and remove current player selection
        this.removePlayerFromTeam(data);
    }

    // remove a player from any team
    removePlayerFromTeam(player){
        if(this.state.team1P1 === player){
            this.setState({team1P1:null})
        }
        if(this.state.team1P2 === player){
            this.setState({team1P2:null})
        }
        if(this.state.team2P1 === player){
            this.setState({team2P1:null})
        }
        if(this.state.team2P2 === player){
            this.setState({team2P2:null})
        }
        this.updateTeamName();
    }

    removePlayerFromTeamState(player){

    }



    // if a player is removed from a team they need to be added here
    addPlayerToArray(player){
        let array = this.state.players;
        array.push(player);
        this.setState({players: array });
    }

    // once a player is assigned to a team needs to be removed
    removePlayer(player) {
        let array = this.state.players;
        let index = array.indexOf(player)
        array.splice(index, 1);
        this.setState({players: array });
        this.setState({currentPlayer: null});
        PubSub.publish('currentPlayer', null);
    }

    componentWillMount() {
       // console.log('main componentWillMount');
        this.token = PubSub.subscribe('TeamSelected', this.subscriber.bind(this));
        this.token = PubSub.subscribe('playerRemovedFromTeam', this.subscriber.bind(this));
    }

    componentWillUnmount() {
        console.log('main componentWillUnmount');
        // React removed me from the DOM, I have to unsubscribe from the system using my token
        //PubSub.unsubscribe(this.token);
    }

    /*componentDidMount() is a lifecycle method
     * that gets called after the component is rendered
     */
    componentDidMount() {
       // PubSub.publish('TeamSelected', this.token);
        console.log(this.token);

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
            <li className="list-group-item" onClick={
        () =>this.handleClick(player)} key={player.id} >
        { player.name }
    </li>
    );
    })
    }

    // player selected
    handleClick(player) {
        //handleClick is used to set the state
        this.setState({currentPlayer:player});
        PubSub.publish('currentPlayer', player);
    }

    // get team counts to decide what to display @todo move to array for teams
    setTeamCount(){
        //team 1
        let count = 0;
        let teamFull = {team1:false, team2:false};

            if(this.state.team1P1 !== null){
                count = count + 1;
            }
            if(this.state.team1P2 !== null){
                count = count + 1;
            }
            this.setState({team1Count: count});
            if(count === 2){
                teamFull.team1 = true;
            }

            //team 2
            count = 0;
            if(this.state.team2P1 !== null){
                count = count + 1;
            }
            if(this.state.team2P2 !== null){
                count = count + 1;
            }
            this.setState({team2Count: count});
            if(count === 2){
                teamFull.team2 = true;
            }
        // notify subsccribers
        PubSub.publish('TeamFull', teamFull);
    }

    // team 1 selectors
    handleTeamClick(player) {
    this.checkIfPlayerInAnotherTeam(player,1);
        if(this.state.team1P1 === null){
            this.setState({
                team1P1: player
            }, () => {
                this.updateTeamName();
                this.removePlayer(player);
                PubSub.publish('team1P1', player);
            });
        }else{
            if(this.state.team1P2 === null){
                this.setState({
                    team1P2: player
                }, () => {
                    this.updateTeamName();
                    this.removePlayer(player);
                    PubSub.publish('team1P2', player);
                });
            }
        }
        this.setTeamCount();
    }

    // team 2 selectors
    handleTeamClick2(player) {
        this.checkIfPlayerInAnotherTeam(player,2);
        //this.setState({team2P1:player});
        if(this.state.team2P1 === null){
            this.setState({
                team2P1: player
            }, () => {
                this.updateTeamName();
                this.removePlayer(player);
                PubSub.publish('team2P1', player);
            });
        }else{
            if(this.state.team2P2 === null){
                this.setState({
                    team2P2: player
                }, () => {
                    this.updateTeamName();
                    this.removePlayer(player);
                    PubSub.publish('team2P2', player);
                });
            }
        }
        this.setTeamCount();
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
     * provide team name to display and update team counts
     * @param team
     */
    updateTeamName() {
        let team1Display = [];
        let team2Display = [];

        if (this.state.team1P1 !== null) {
            team1Display.push(this.state.team1P1.name);
        }
        if (this.state.team1P2 !== null) {
            team1Display.push(this.state.team1P2.name);
        }
        if (this.state.team2P1 !== null) {
            team2Display.push(this.state.team2P1.name);
        }
        if (this.state.team2P2 !== null) {
            team2Display.push(this.state.team2P2.name);
        }
        this.setState({team1Display: team1Display.join("-")});
        this.setState({team2Display: team2Display.join("-")});
        this.setState({team1Count: team1Display.length});
        this.setState({team2Count: team2Display.length});
        this.setTeamCount();
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

        // <Player2 currentPlayer={this.state.currentPlayer} onTeam1Select={this.handleTeamClick} onTeam2Select={this.handleTeamClick2} />
        return (
            <MuiThemeProvider>
            <div className="container">
                <Game2 team1Display={this.state.team1Display} team2Display={this.state.team2Display} team1P1={this.state.team1P1} team1P2={this.state.team1P2} team2P1={this.state.team2P1} team2P2={this.state.team2P2}/>
                <div className="row">
                    <div className="col"><AddPlayer onAdd={this.handleAddPlayer} /></div>
                </div>
                <div className="container">
                    <div>
                        <hr />
                        <p><strong>Available players</strong></p>
                        <ul className="list-group">
                            { this.renderPlayers() }
                        </ul>
                     </div>
                </div>
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