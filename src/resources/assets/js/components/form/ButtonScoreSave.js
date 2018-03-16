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
        }
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
