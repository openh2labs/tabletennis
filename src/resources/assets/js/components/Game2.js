import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ButtonTest from './ButtonTest';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const styles = {
    chip: {
        margin: 4,
    },
    wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
    },
}

export default class Game2 extends Component {

    constructor(props) {
        super(props);
    }




    getCheap(player){
        return <ButtonTest player={player}/>;
    }

    render() {

        let chipT1P1, chipT1P2, chipT2P1, chipT2P2 = null;
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

        return (
            <div className="container">

                <div className="row">
                    <div className="col">
                        <div style={styles.wrapper}>
                        Team 1 : {chipT1P1} {chipT1P2}
                        </div>
                    </div>
                    <div className="col">
                        <div style={styles.wrapper}>
                        Team 2: {chipT2P1} {chipT2P2}
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