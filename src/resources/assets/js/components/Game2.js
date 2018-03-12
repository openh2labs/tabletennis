import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Game2 extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-8 col-md-offset-2">
                        <div className="panel panel-default">
                            <div className="panel-heading">Game score</div>

                                <div className="panel-body">
                                    Team 1: {this.props.team1Display}
                                </div>
                            <div className="panel-body">
                                Team 2: {this.props.team2Display}
                            </div>

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