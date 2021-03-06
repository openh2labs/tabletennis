import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ButtonTeamSelect2 from "./form/ButtonTeamSelect2";


export default class Player2 extends Component {
    constructor(props) {
        super(props);
        }

    handleSubmit(e){
        //preventDefault prevents page reload
        e.preventDefault();
        //console.log('The button was clicked for team 1.');
        /*A call back to the onAdd props. The control is handed over
         *to the parent component. The current state is passed
         *as a param
         */
        this.props.onTeam1Select(this.props.currentPlayer);
    }

    handleSubmit2(e){
        //preventDefault prevents page reload
        e.preventDefault();
        console.log('The button was clicked for team 2.');
        /*A call back to the onAdd props. The control is handed over
         *to the parent component. The current state is passed
         *as a param
         */
        this.props.onTeam2Select(this.props.currentPlayer);
    }

    render() {
        if(!this.props.currentPlayer) {
            return(<div><h2>  No Player was selected </h2> </div>);
        }
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-8 col-md-offset-2">
                        <div className="panel panel-default">
                            <div className="panel-heading">  {this.props.currentPlayer.name} </div>
                            <div className="panel-body">
                                <div className="row">
                                    player info here to follow
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}