import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PubSub from 'pubsub-js';
import FlatButton from 'material-ui/FlatButton';
import SnackBarMessage from "../Misc/SnackBarMessage";
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';

export default class ButtonScoreSave extends Component {

    constructor(props) {
        super(props);
        this.state = {
            team1P1: null,
            team1P2: null,
            team2P1: null,
            team2P2: null,
            team1Score: 0,
            team2Score: 0,
            open: false,
            saveDisabled: true,
        }
        this.handleSave = this.handleSave.bind(this);
        this.handleRequestClose = this.handleRequestClose.bind(this);
    }

    /**
     * teams clear @todo get other components to listen into
     */
    handleSubmitCancel(){
       //@todo clear teams !
        PubSub.publish('team1P1', null);
        PubSub.publish('team1P2', null);
        PubSub.publish('team2P1', null);
        PubSub.publish('team2P2', null);
    }

    handleSubmit(e){
        //preventDefault prevents page reload
        e.preventDefault();
        PubSub.publish('ScoreSave'); // needed?
        this.handleSave();

        // clear values
        document.getElementById('InputScore2').value="";
        document.getElementById('InputScore1').value="";
    }

    componentWillMount() {
        this.token = PubSub.subscribe('team1P1', this.subscriber.bind(this));
        this.token = PubSub.subscribe('team1P2', this.subscriber.bind(this));
        this.token = PubSub.subscribe('team2P1', this.subscriber.bind(this));
        this.token = PubSub.subscribe('team2P2', this.subscriber.bind(this));
        this.token = PubSub.subscribe('team1Score', this.subscriber.bind(this));
        this.token = PubSub.subscribe('team2Score', this.subscriber.bind(this));

    }

    componentWillUnmount() {
        // React removed me from the DOM, I have to unsubscribe from the system using my token
        //PubSub.unsubscribe(this.token);
    }

    /*componentDidMount() is a lifecycle method
  * that gets called after the component is rendered
  */
    componentDidMount() {
        // PubSub.publish('TeamFull', this.token);
    }

    subscriber(EventName, data){
        var key = EventName
        var val = data
        var obj  = {}
        obj[key] = val
        this.setState(obj);
        // enable score if we got a team
        let saveDisabled=true;
        if(this.state.team1Score > -1 && this.state.team2Score > -1){
            saveDisabled=false;

        }
        this.setState(
            {
                saveDisabled:saveDisabled,
            }
        )
    }


    /**
     * save the score to the micro service
     */
    handleSave() {
        //prep payload
        var obj = new Object();
        obj.game_type = "single"
        obj.team_1_player_1 = this.state.team1P1.id;
        if(this.state.team1P2 !== null){
            obj.team_1_player_2 = this.state.team1P2.id;
            obj.game_type = 'doubles';
        }
        obj.team_2_player_1 = this.state.team2P1.id;
        if(this.state.team2P2 !== null){
            obj.team_2_player_2 = this.state.team2P2.id;
            obj.game_type = 'doubles';
        }
        obj.team_1_score = this.state.team1Score;
        obj.team_2_score = this.state.team2Score;

        //post
        /*Fetch API for post request */
        fetch( 'api/game/', {
            method:'post',
            /* headers are important*/
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        }).then(response => {
            this.setState({
                open: true,
            });
            return response.json();
        }).then( data => {
            let st = "game saved (id " + data.id + ")";
            PubSub.publish('snackBarText', st);
        })
    }

    handleRequestClose (){
        this.setState({
            open: false,
        });
    };

    render() {
        return (
            <CardActions>
            <FlatButton
                label="save scores"
                primary={true}
                onClick={(e) =>  this.handleSubmit(e)}
                disabled={this.state.saveDisabled}
                />
            <FlatButton
        label="clear teams"
        onClick={(e) =>  this.handleSubmitCancel()}
        />
                <SnackBarMessage />
            </CardActions>
        )
    }
}

if (document.getElementById('ButtonScoreSave')) {
    ReactDOM.render(<ButtonScoreSave />, document.getElementById('ButtonScoreSave'));
}
