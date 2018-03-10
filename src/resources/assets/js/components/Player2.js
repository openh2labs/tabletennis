import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import AddPlayer from "./AddPlayer";

export default class Player2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
                currentPlayer: this.props.currentPlayer
            };
       // this.handleSubmit = this.handleSubmit.bind(this);
        //this.handleInput = this.handleInput.bind(this);
        //    handleClick = this.handleClick.bind(this);
           // handleSubmit = this.handleSubmit.bind(this);
        }


        //    this.state.currentPlayer = this.props.state.currentPlayer.bind(this);
       // this.handleTeamClick = this.props.handleTeamClick.bind(this);
     ///   this.coolMethod = this.props.coolMethod.bind(this);
      //  this.state.currentPlayer = this.props.state.currentPlayer.bind(this);
  //  }

    handleSubmit(e){
        //preventDefault prevents page reload
        e.preventDefault();
        console.log('The button was clicked for player 2.');
        /*A call back to the onAdd props. The control is handed over
         *to the parent component. The current state is passed
         *as a param
         */
      //  this.props.onTeam1Select(currentPlayer);
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
                                <button type="button" className="btn btn-primary" onClick={(e) => this.handleSubmit(e)}>Team 1</button>
                                <button type="button" className="btn btn-secondary">Team 2</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

//if (document.getElementById('example')) {
//    ReactDOM.render(<Example />, document.getElementById('example'));
//}
//export default Player2;