import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PubSub from 'pubsub-js';


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
            payload: {
                team_1_player_1: null,
                team_1_player_2: null,
                team_2_player_1: null,
                team_2_player_2: null,
                team_1_score: 0,
                team_2_score: 0,
                game_type: "not set",
            },
        }
        /*
           team_1_player_1` bigint(20) NOT NULL,
         `team_1_player_2` bigint(20) DEFAULT NULL,
         `team_2_player_1` bigint(20) NOT NULL,
         `team_2_player_2` bigint(20) DEFAULT NULL,
         `team_1_score` int(11) NOT NULL DEFAULT '0',
         `team_2_score` int(11) NOT NULL DEFAULT '0',
         `game_type` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'single',
        */
    }

    handleSubmit(e){
        //preventDefault prevents page reload
        e.preventDefault();
        console.log('score save clicked');
        console.log(this.state.team1P1);
        console.log(this.state.team1P2);
        console.log(this.state.team2P1);
        console.log(this.state.team2P2);
        console.log(this.state.team1Score);
        console.log(this.state.team2Score);
        PubSub.publish('ScoreSave');
        console.log(this.handleSave());
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
        console.log('game2 componentWillUnmount');
        // React removed me from the DOM, I have to unsubscribe from the system using my token
        //PubSub.unsubscribe(this.token);
    }

    /*componentDidMount() is a lifecycle method
  * that gets called after the component is rendered
  */
    componentDidMount() {
        // PubSub.publish('TeamFull', this.token);
        console.log('game2 componentDidMount');
    }

    subscriber(EventName, data){
        var key = EventName
        var val = data
        var obj  = {}
        obj[key] = val
        this.setState(obj);
    }

    getPayload(){
        var gameType = 'single';
        /*
            team_1_player_1` bigint(20) NOT NULL,
          `team_1_player_2` bigint(20) DEFAULT NULL,
          `team_2_player_1` bigint(20) NOT NULL,
          `team_2_player_2` bigint(20) DEFAULT NULL,
          `team_1_score` int(11) NOT NULL DEFAULT '0',
          `team_2_score` int(11) NOT NULL DEFAULT '0',
          `game_type` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'single',
         */
        //var payload = [];
        var obj = new Object();
        obj.team_1_player_1 = this.state.team1P1.id;
        //this.setState({payload: {team_1_player_1: this.state.team1P1.id}});
        //payload['team_1_player_1'] = this.state.team1P1.id;
        if(this.state.team1P2 !== null){
            obj.team_1_player_2 = this.state.team1P2.id;
          //  this.setState({team_1_player_2: this.state.team1P2.id});
          //  payload['team_1_player_2'] = this.state.team1P2.id;
            gameType = 'doubles';

        }
        obj.team_2_player_1 = this.state.team2P1.id;
       // this.setState({team_2_player_1: this.state.team2P1.id});
        //payload['team_2_player_1'] = this.state.team2P1.id;
        if(this.state.team2P2 !== null){
            obj.team_2_player_2 = this.state.team2P2.id;
            //this.setState({team_2_player_2: this.state.team2P2.id});
           // payload['team_2_player_2'] = this.state.team2P2.id;
            gameType = 'doubles';
        }
        obj.team_1_score = this.state.team1Score;
      //  this.setState({team_1_score: this.state.team1Score});
      //  payload['team_1_score'] = this.state.team1Score;
        obj.team_2_score = this.state.team2Score;
     //   this.setState({team_2_score: this.state.team2Score});
      //  payload['team_2_score'] = this.state.team2Score;
        obj.game_type = gameType;
        this.setState({payload: obj});
        console.log('getPayload');
        console.log(obj);
        console.log(this.state.payload);
     //   payload['game_type'] = gameType;
        //return payload;
    }


    handleSave() {

        //prep payload
        var obj = new Object();
        obj.game_type = "unnknown"
        obj.team_1_player_1 = this.state.team1P1.id;
        if(this.state.team1P2 !== null){
            obj.team_1_player_2 = this.state.team1P2.id;
            obj.game_type = 'doubles';
        }
        obj.team_2_player_1 = this.state.team2P1.id;
        if(this.state.team2P2 !== null){
            obj.team_2_player_2 = this.state.team2P2.id;
            bj.game_type = 'doubles';
        }
        obj.team_1_score = this.state.team1Score;
        obj.team_2_score = this.state.team2Score;

        console.log('handleSave')
        console.log(obj);
        console.log(JSON.stringify(obj));

        //post
        //player.price = Number(player.price);
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
            return response.json();
        })
    }

    render() {
        console.log(this.props);
        return (
            <button
                type="submit"
                className="btn btn-primary btn-sm"
                onClick={(e) =>  this.handleSubmit(e, '', '', '', '')}
            >{"save scores"}
            </button>
        )
    }
}

if (document.getElementById('ButtonScoreSave')) {
    ReactDOM.render(<ButtonScoreSave />, document.getElementById('ButtonScoreSave'));
}
