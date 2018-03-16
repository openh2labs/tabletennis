import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PubSub from 'pubsub-js';


export default class InputTeamScore2 extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);

        let placeholder = 'score for team ';
        placeholder = placeholder + props.teamId;
        //this.props = props;
        this.state = {
            placeholder: placeholder,
        }
    }

    handleSubmit(e){
        //console.log('score save changes for team ' + this.props.teamId + ' is ' + e.target.value);
        PubSub.publish('team'+this.props.teamId+'Score', e.target.value);
    }

    render() {
       // let placeholder = ;
       // console.log("here " + e);
        //<input type="email" className="" id="colFormLabelSm" placeholder={placeHolder1}/>
        return (
            <input
                type="text"
                id={this.props.teamId}
                name={this.props.teamId}
                placeholder={this.state.placeholder}
                className="form-control form-control-sm input-sm"
                onChange={this.handleSubmit} //{(e) =>  this.handleSubmit(e, '', '', '', '')}
            />
        )
    }
}

if (document.getElementById('ButtonScoreSave')) {
    ReactDOM.render(<InputTeamScore2 />, document.getElementById('InputTeamScore2'));
}
