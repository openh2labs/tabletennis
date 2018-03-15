import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ButtonTest from './ButtonTest';
import InputTeamScore from './form/InputTeamScore';
import ButtonTeamSelect2 from "./form/ButtonTeamSelect2";

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
    display: 'inline-block',
};


export default class Game2 extends Component {

    constructor(props) {
        super(props);
    }


    getCheap(player){
        return <ButtonTest player={player}/>;
    }

     getButton(teamId){
        return <ButtonTeamSelect2 teamId={teamId} />;
    }

    render() {


        let chipT1P1, chipT1P2, chipT2P1, chipT2P2, ButtonTeam1, ButtonTeam2 =  null;
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
                <div className="panel panel-default">
                    <div className="panel-heading text-center"> <h1> Game </h1> </div>
                    <div className="panel-body">
                        <div className="row">
                            <div className="row align-items-center justify-content-center">
                                <div className="col align-middle">{ButtonTeam1}</div>
                                <div className="col align-middle" style={styles.wrapper}>{chipT1P1} {chipT1P2}</div>
                                <div className="col align-middle"><InputTeamScore teamId={1} placeHolder={placeHolder1}/></div>
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
            </div>
        );
    }
}

if (document.getElementById('Game2')) {
    ReactDOM.render(<Game2 />, document.getElementById('Game2'));
}