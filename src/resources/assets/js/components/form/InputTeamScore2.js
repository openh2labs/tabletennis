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
        PubSub.publish('team'+this.props.teamId+'Score', e.target.value);
    }

    render() {
        return (
            <input
                type="text"
                id={"InputScore"+this.props.teamId}
                name={this.props.teamId}
                placeholder={this.state.placeholder}
                className="form-control form-control-sm input-sm"
                onChange={this.handleSubmit}
            />
        )
    }

    componentWillMount() {
        this.token = PubSub.subscribe('ScoreSaveComplete', this.subscriber.bind(this));
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
        console.log('game2 componentDidMount');
    }

    subscriber(EventName, data){
        var key = EventName
        var val = data
        var obj  = {}
        obj[key] = val
        this.setState(obj);
        if(event === "ScoreSaveComplete"){
            this.setState({value:""});
        }
    }
}

if (document.getElementById('ButtonScoreSave')) {
    ReactDOM.render(<InputTeamScore2 />, document.getElementById('InputTeamScore2'));
}
