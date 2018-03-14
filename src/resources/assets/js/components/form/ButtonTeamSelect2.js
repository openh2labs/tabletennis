import React, { Component } from 'react';
import ReactDOM from 'react-dom';
//import BaseClient from '../BaseClient';

//let client = new BaseClient();

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
        console.log('emit sending !!! ');
        PubSub.publish('TeamSelected', teamId);
    }

    render() {
        console.log(this.props);
        return (
            <button
                className="btn btn-default"
                onClick={(e) =>  this.handleSubmit(e, 1)}
            >{"assing to team " + this.props.teamId}
            </button>
        )
    }
}

if (document.getElementById('ButtonTeamSelect2')) {
    ReactDOM.render(<ButtonTeamSelect2 />, document.getElementById('ButtonTeamSelect2'));
}
