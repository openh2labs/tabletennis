import React, { Component } from 'react';

import ReactDOM from 'react-dom';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
//import MyAwesomeReactComponent from './MyAwesomeReactComponent';


import AddPlayer from './AddPlayer';
import Game2 from './Game2';
import PubSub from 'pubsub-js'; // example https://anthonymineo.com/communication-between-independent-components-in-react-using-pubsubjs/
import ListPlayers from "./form/ListPlayers";
import ToolbarNav from './Navigation/Toolbar';


/* Main Component */
class Main extends Component {

    constructor() {
        super();
        //Initialize the state in the constructor
        this.state = {
            players: [],
            currentPlayer: null, // can be removed ?
            team1P1: null,
            team1P2: null,
            team2P1: null,
            team2P2: null,
            team1Count: 0,
            team2Count: 0,
            team1Display: "",
            team2Display: "",
            gameType: "single",
            teamStats: null,
            payloadTeamStats: {}

        }
       // this.client = new BaseClient();
       // this.handleAddPlayer = this.handleAddPlayer.bind(this);
        this.handleTeamClick = this.handleTeamClick.bind(this); //team 1 selection
        this.handleTeamClick2 = this.handleTeamClick2.bind(this); //team 2 selection

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


    /**
     * subscription bindings
     */
    componentWillMount() {
        this.token = PubSub.subscribe('TeamSelected', this.subscriber.bind(this));
        this.token = PubSub.subscribe('playerRemovedFromTeam', this.subscriber.bind(this));
        // generic subscriber publishes to the state
        this.token = PubSub.subscribe('players', this.subscriberGeneric.bind(this));
        this.token = PubSub.subscribe('currentPlayer', this.subscriberGeneric.bind(this));
        this.token = PubSub.subscribe('team1P1', this.subscriberGeneric.bind(this));
        this.token = PubSub.subscribe('team1P2', this.subscriberGeneric.bind(this));
        this.token = PubSub.subscribe('team2P1', this.subscriberGeneric.bind(this));
        this.token = PubSub.subscribe('team2P2', this.subscriberGeneric.bind(this));
    }

    /**
     *
     * used for setting state objects shared across components
     *
     * @param EventName
     * @param data
     */
    subscriberGeneric(EventName, data){
        let key = EventName
        let val = data
        let obj  = {}
        obj[key] = val
        this.setState(obj);
        this.updateTeamName();
        this.setTeamCount();
    }

    /**
     *
     * The function that is subscribed to the publisher
     *
     * @param EventName
     * @param data
     */
    subscriber(EventName, data){
        if(EventName === "TeamSelected"){
            if(data===1){
                this.handleTeamClick(this.state.currentPlayer);
            }else{
                this.handleTeamClick2(this.state.currentPlayer);
            }
        }
        if(EventName === 'players'){
            this.setState({players: data});
        }
        if(EventName === 'playerRemovedFromTeam'){
            this.removePlayerFromTeam(data);
        }
    }

    componentWillUnmount() {
        // React removed me from the DOM, I have to unsubscribe from the system using my token
        //PubSub.unsubscribe(this.token);
    }

    /*componentDidMount() is a lifecycle method
     * that gets called after the component is rendered
     */
    componentDidMount() {
       // PubSub.publish('TeamSelected', this.token);
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
        PubSub.publish('team1Count', this.state.team1Count);
        PubSub.publish('team2Count', this.state.team2Count);
        this.setGameType();
        this.updateTeamStats();
    }

    /**
     *
     * set the game type
     *
     */
    setGameType(){
        if(this.state.team1Count > 1 || this.state.team12ount > 1){
            this.setState({
                gameType: "doubles"
            });
        }else{
            this.setState({
                gameType: "single"
            });
        }
        PubSub.publish('gameType', this.state.gameType);
    }

    /**
     * get the latest team stats
     */
    updateTeamStats(){
        if(this.state.team1Count > 0 && this.state.team2Count >0){
            fetch( 'api/gamestats/', {
                method:'post',
                /* headers are important*/
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify(this.state.payloadTeamStats)
            })
                .then(response => {
                    return response.json();
                })
                .then( data => {
                    this.setState({
                       teamStats: data
                    });
                    PubSub.publish('teamStats', this.state.teamStats);
                    /*
                    this.setState((prevState)=> ({
                        players: prevState.players.concat(data),
                        currentPlayer : data
                    }))
                    */
                    // update subscribers
                  //

                })
        }
    }

    // team 1 selectors
    handleTeamClick(player) {
    this.checkIfPlayerInAnotherTeam(player,1);
        if(this.state.team1P1 === null){
            this.setState({
                team1P1: player
            }, () => {
                this.updateTeamName();
                //this.removePlayer(player);
                PubSub.publish('playerRemove', {teamId: 1, player:player});
                PubSub.publish('team1P1', player);
            });
        }else{
            if(this.state.team1P2 === null){
                this.setState({
                    team1P2: player
                }, () => {
                    this.updateTeamName();
                    //this.removePlayer(player);
                    PubSub.publish('playerRemove', {teamId: 1, player:player});
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
                //this.removePlayer(player);
                PubSub.publish('playerRemove', {teamId: 2, player:player});
                PubSub.publish('team2P1', player);
            });
        }else{
            if(this.state.team2P2 === null){
                this.setState({
                    team2P2: player
                }, () => {
                    this.updateTeamName();
                    //this.removePlayer(player);
                    PubSub.publish('playerRemove', {teamId: 2, player:player});
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
        let payload = {};

        if (this.state.team1P1 !== null) {
            team1Display.push(this.state.team1P1.name);
            payload.team1P1 = this.state.team1P1.id;
        }
        if (this.state.team1P2 !== null) {
            team1Display.push(this.state.team1P2.name);
            payload.team1P2 = this.state.team1P2.id;
        }
        if (this.state.team2P1 !== null) {
            team2Display.push(this.state.team2P1.name);
            payload.team2P1 = this.state.team2P1.id;
        }
        if (this.state.team2P2 !== null) {
            team2Display.push(this.state.team2P2.name);
            payload.team2P2 = this.state.team2P2.id;
        }
        payload.gameType = this.state.gameType;
        this.setState({team1Display: team1Display.join("-")});
        this.setState({team2Display: team2Display.join("-")});
        this.setState({team1Count: team1Display.length});
        this.setState({team2Count: team2Display.length});
        this.setState({payloadTeamStats: payload});
        this.setTeamCount();
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
                <ToolbarNav/>
                <Game2 team1Display={this.state.team1Display} team2Display={this.state.team2Display} team1P1={this.state.team1P1} team1P2={this.state.team1P2} team2P1={this.state.team2P1} team2P2={this.state.team2P2}/>
                <p></p>
                <div className="row">
                    <div className="col"><AddPlayer /></div>
                </div>
                <ListPlayers />
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