import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ButtonTest from './ButtonTest';
import InputTeamScore from './form/InputTeamScore';
import ButtonTeamSelect2 from "./form/ButtonTeamSelect2";
import PubSub from "pubsub-js";

const styles = {
    chip: {
        margin: 4,
    },
    wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
    },
}

const paperStyle = {
    height: 100,
    width: 100,
    margin: 20,
    textAlign: 'center',
    display: 'inline-block'
};


export default class Game2 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            "team1Full": false,
            "team2Full": false,
            "currentPlayer": null,
        }
    }

    componentWillMount() {
        console.log('game 2componentWillMount');
        this.token = PubSub.subscribe('TeamFull', this.subscriber.bind(this));
        this.token = PubSub.subscribe('currentPlayer', this.subscriber.bind(this));
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

    // The function that is subscribed to the publisher
    subscriber(EventName, data){
        console.log("game2 subscriber fired " + EventName + ", data " +data);
        if(EventName === "TeamFull"){
            if(data===1){
                this.setState({"team1Full" : true});
            }else{
                this.setState({"team2Full" : true});
            }
        }
        if(EventName === "currentPlayer"){
            this.setState({"currentPlayer" : data});
        }
    }

    getCheap(player){
        return <ButtonTest player={player}/>;
    }

    /**
     * get the button for the team
     *
     * @param teamId
     * @returns {*}
     */
     getButton(teamId){
        if(teamId === 1 ){
            if(this.state.team1Full === false && this.state.currentPlayer !== null){
                return <ButtonTeamSelect2 teamId={teamId} />;
            }else{
                return <button type="button" className="btn btn-secondary btn-sm">Team 1</button>
            }
        }else{
            if(this.state.team2Full === false && this.state.currentPlayer !== null){
                return <ButtonTeamSelect2 teamId={teamId} />;
            }else{
                return <button type="button" className="btn btn-secondary btn-sm">Team 2</button>
            }
        }
    }

    getTeamHeading(teamId){

    }


    render() {


        let chipT1P1, chipT1P2, chipT2P1, chipT2P2, ButtonTeam1, ButtonTeam2, teamHeading =  null;
        let placeHolder1 = "select players to get started!";
        let placeHolder2 = "select players to get started!";

        ButtonTeam1 = this.getButton(1);
        ButtonTeam2 = this.getButton(2);
        
        if(this.props.team1P1 !== null){
            console.log('Game2.team1P1');
            chipT1P1 = this.getCheap(this.props.team1P1);
        }
        if(this.props.team1P2 !== null){
            console.log('Game2.team1P2');
            chipT1P2 = this.getCheap(this.props.team1P2); //<MuiThemeProvider><ButtonTest player={this.props.team1P2}/></MuiThemeProvider>;
        }
        if(this.props.team2P1 !== null){
            console.log('Game2.team2P1');
            chipT2P1 = this.getCheap(this.props.team2P1); //<MuiThemeProvider><ButtonTest player={this.props.team2P1}/></MuiThemeProvider>;
        }
        if(this.props.team2P2 !== null){
            console.log('Game2.team2P2');
            chipT2P2 = this.getCheap(this.props.team2P2); //<MuiThemeProvider><ButtonTest player={this.props.team2P2}/></MuiThemeProvider>;
        }
        if(this.props.team1Display !== ""){
            placeHolder1 = "score for " + this.props.team1Display;
        }
        if(this.props.team2Display !== ""){
            placeHolder2 = "score for " + this.props.team2Display;
        }

        return (
            <div className="container">
                <form>
                    <div className="form-group row">
                        <label htmlFor="colFormLabelSm" className="col-sm-2 col-form-label col-form-label-sm" style={styles.wrapper}>{ButtonTeam1} {chipT1P1} {chipT1P2}</label>
                        <div className="col-sm-10">
                            <input type="email" className="form-control form-control-sm input-sm" id="colFormLabelSm" placeholder={placeHolder1}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="colFormLabelSm" className="col-sm-2 col-form-label col-form-label-sm" style={styles.wrapper}> {ButtonTeam2} {chipT2P1} {chipT2P2}</label>
                        <div className="col-sm-10">
                            <input type="email" className="form-control form-control-sm input-sm" id="colFormLabelSm" placeholder={placeHolder2}/>
                        </div>
                    </div>
                </form>
            </div>
        );
    }

     oldContainer(){
        <div className="panel panel-default">
            <div className="panel-heading text-center"> <b>Game</b>  </div>
            <div className="panel-body">
                <div className="row">
                    <div className="row align-items-center justify-content-center">
                        <div className="col align-middle">{ButtonTeam1}</div>
                        <div className="col align-middle" style={styles.wrapper}>{chipT1P1} {chipT1P2}</div>
                        <div className="col align-middle"><InputTeamScore teamId={1} placeHolder={placeHolder1}/></div>
                        <div className="col align-middle">{ButtonTeam2}</div>
                        <div className="col align-middle" style={styles.wrapper}>{chipT2P1} {chipT2P2}</div>
                        <div className="col align-middle"><InputTeamScore teamId={2} placeHolder={placeHolder2}/></div>
                    </div>
                </div>
                <div className="row">
                    <div className="row align-items-center justify-content-center">
                        <div className="col">{ButtonTeam2}</div>
                        <div className="col" style={styles.wrapper}>{chipT2P1} {chipT2P2}</div>
                        <div className="col"><InputTeamScore teamId={2} placeHolder={placeHolder2}/></div>
                    </div>
                </div>

            </div>
            <div className="panel-body">
                <div style={styles.wrapper}>

                </div>
            </div>
        </div>
    }
}

if (document.getElementById('Game2')) {
    ReactDOM.render(<Game2 />, document.getElementById('Game2'));
}