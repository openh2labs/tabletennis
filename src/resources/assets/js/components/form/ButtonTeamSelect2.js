import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import RaisedButton from 'material-ui/RaisedButton';

import PubSub from 'pubsub-js';


export default class ButtonTeamSelect2 extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    handleSubmit(e, teamId){
        //preventDefault prevents page reload
        e.preventDefault();
        PubSub.publish('TeamSelected', teamId);
    }

    render() {
        let label = "Team " + this.props.teamId;
        return (
            <RaisedButton
                label={label}
                primary={true}
                onClick={(e) =>  this.handleSubmit(e, this.props.teamId)}
                />
        )
    }
}

if (document.getElementById('ButtonTeamSelect2')) {
    ReactDOM.render(<ButtonTeamSelect2 />, document.getElementById('ButtonTeamSelect2'));
}
