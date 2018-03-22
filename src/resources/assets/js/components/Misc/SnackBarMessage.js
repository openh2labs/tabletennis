import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PubSub from 'pubsub-js';
import Snackbar from 'material-ui/Snackbar';

export default class SnackBarMessage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            SnackBarOpen: false,
            snackBarText: "",
        }

        // bind component methods
      //  this.handleRequestDelete = this.handleRequestDelete.bind(this);
        this.handleRequestClose = this.handleRequestClose.bind(this);
    }

    handleRequestDelete() {
        //console.log(" ****** state player delete **********");
        //PubSub.publish('playerRemovedFromTeam', this.props.player);
    }

    handleClick(player) {
    //    this.setState({currentPlayer:player});
     //   PubSub.publish('currentPlayer', player);
        //  PubSub.publish('players', this.state.players);
    }

    handleRequestClose (){
        this.setState({
            SnackBarOpen: false,
        });
    };

    /**
     *
     * subscriber for state events
     *
     * @param EventName
     * @param data
     */
    subscriberState(EventName, data){
        this.setState({
            SnackBarOpen: true
        });

        let key = EventName;
        let val = data;
        let obj  = {};
        obj[key] = val;
        this.setState(obj);
    }

    /**
     * Subscriptions biding
     */
    componentWillMount() {
        this.token = PubSub.subscribe('snackBarText', this.subscriberState.bind(this));
     //   this.token = PubSub.subscribe('playerRemove', this.subscriberPlayerRemove.bind(this));
     //   this.token = PubSub.subscribe('playerRemovedFromTeam', this.subscriberPlayerAdd.bind(this));
    }

    componentWillUnmount() {
        //console.log('ListPlayers componentWillUnmount');
        // React removed me from the DOM, I have to unsubscribe from the system using my token
        //PubSub.unsubscribe(this.token);
    }

    /*componentDidMount() is a lifecycle method
  * that gets called after the component is rendered
  */
    componentDidMount() {
        // PubSub.publish('TeamFull', this.token);
        // console.log('ChipPlayer componentDidMount');
        /* fetch API in action */

    }


    render() {
        return(
            <Snackbar
                open={this.state.SnackBarOpen}
                message={this.state.snackBarText}
                autoHideDuration={4000}
                onRequestClose={this.handleRequestClose}
            />
        )
    }
}

if (document.getElementById('SnackBarMessage')) {
    ReactDOM.render(<SnackBarMessage />, document.getElementById('SnackBarMessage'));
}