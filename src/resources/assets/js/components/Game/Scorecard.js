import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PubSub from 'pubsub-js';
import Badge from 'material-ui/Badge';
import SocialMood from 'material-ui/svg-icons/social/mood';
import SocialMoodBad from 'material-ui/svg-icons/social/mood-bad';


export default class Scorecard extends Component {

    constructor(props) {
        super(props);

      //  this.handleSubmit = this.handleSubmit.bind(this);
        //  this.handleSave = this.handleSave.bind(this);
    }


    getContent(){

    }

    render() {
        if(this.props.team1Count > 0 && this.props.team2Count > 0){
        return (
            <div>
            <Badge
                badgeContent={this.props.teamStats.win}
                primary={true}
                badgeStyle={{top: 24, right: 0}}
            >
                <SocialMood />
            </Badge>
                <Badge
                    badgeContent={this.props.teamStats.lost}
                    primary={true}
                    badgeStyle={{top: 24, right: 0}}
                >
                    <SocialMoodBad />
                </Badge>
            </div>
        )
        }else{
           return(<div />)
        }
    }

    componentWillMount() {
        //this.token = PubSub.subscribe('teamStats', this.subscriber.bind(this));
    }

    componentWillUnmount() {
        // React removed me from the DOM, I have to unsubscribe from the system using my token
        //PubSub.unsubscribe(this.token);
    }

    /*componentDidMount() is a lifecycle method
  * that gets called after the component is rendered
  */
    componentDidMount() {

    }

    subscriber(EventName, data){
        let key = EventName;
        let val = data;
        let obj  = {};
        obj[key] = val;
        this.setState(obj);
    }
}

if (document.getElementById('Scorecard')) {
    ReactDOM.render(<Scorecard />, document.getElementById('Scorecard'));
}
