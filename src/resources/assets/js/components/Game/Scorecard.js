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


        this.state = {

        }

        //  this.handleSave = this.handleSave.bind(this);
    }




    render() {
        return (
            <div>
            <Badge
                badgeContent={4}
                primary={true}
                badgeStyle={{top: 24, right: 0}}
            >
                <SocialMood />
            </Badge>
                <Badge
                    badgeContent={4}
                    primary={true}
                    badgeStyle={{top: 24, right: 0}}
                >
                    <SocialMoodBad />
                </Badge>
            </div>
        )
    }

    componentWillMount() {
        //this.token = PubSub.subscribe('ScoreSaveComplete', this.subscriber.bind(this));
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
