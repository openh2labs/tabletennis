import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PubSub from 'pubsub-js';
import TextField from 'material-ui/TextField';
import Scorecard from '../Game/Scorecard.js';

const styles = {
    chip: {
        margin: 4,
    },
    wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
    },
};


    {}
export default class InputTeamScore2 extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);

        let placeholder = 'score for team ';
        placeholder = placeholder + props.teamId;
        this.state = {
            placeholder: placeholder,
            teamId: this.props.teamId,
            disabled: true,
            team1Count: 0,
            team2Count: 0,
        }


      //  this.handleSave = this.handleSave.bind(this);
    }

    /**
     * publish the score if not null
     * @param e
     */
    handleSubmit(e){
        if(e.target.value !== ""){
            PubSub.publish('team'+this.props.teamId+'Score', e.target.value);
        }else{
            PubSub.publish('team'+this.props.teamId+'Score', -1);
        }
    }



    render() {
        return (
            <div style={styles.wrapper}>
            <TextField
                type="number"
                id={"InputScore"+this.props.teamId}
                hintText={this.state.placeholder}
                floatingLabelText={this.state.placeholder}
                onChange={this.handleSubmit}
                pattern="[0-9]*"
                inputMode="numeric"
                underlineShow={true}
                disabled={this.getElementState()}
                style = {{width: 125}}
            />
                <Scorecard teamStats={this.props.teamStats} team2Count={this.props.team2Count} team1Count={this.props.team1Count}/>
            </div>
        )
    }

    componentWillMount() {
        this.token = PubSub.subscribe('ScoreSaveComplete', this.subscriber.bind(this));
        if(this.state.teamId===1){
         //   this.token = PubSub.subscribe('team1Count', this.subscriber.bind(this));
        }
        if(this.state.teamId===2) {
        //    this.token = PubSub.subscribe('team2Count', this.subscriber.bind(this));
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

    }

    getElementState(){
        let state = true;
        if(this.state.teamId === 1 && this.props.team1Count > 0){
            state = false;
        }
        if(this.state.teamId === 2 && this.props.team2Count > 0){
            state = false;
        }
        return state;
    }

    subscriber(EventName, data){


        let key = EventName;
        let val = data;
        let obj  = {};
        obj[key] = val;
        this.setState(obj);

        if(event === "ScoreSaveComplete"){
            this.setState({
                value: ""
            });
        }
        if(this.state.teamId === 1){
            if(EventName === "team1Count" && data > 0){
                this.setState({
                    disabled: false
                });
            }else{
                this.setState({
                    disabled: true
                });
            }
        }

        if(this.state.teamId === 2){
            if(EventName === "team2Count" && data > 0){
                this.setState({
                    disabled: false
                });
            }else{
                this.setState({
                    disabled: true
                });
            }
        }
    }
}

if (document.getElementById('ButtonScoreSave')) {
    ReactDOM.render(<InputTeamScore2 />, document.getElementById('InputTeamScore2'));
}
