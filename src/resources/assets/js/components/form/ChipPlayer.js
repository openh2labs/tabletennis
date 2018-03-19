import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PubSub from 'pubsub-js';
import {fullWhite} from 'material-ui/styles/colors';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import FontIcon from 'material-ui/FontIcon';
import Chip from 'material-ui/Chip';


const styles = {
    chip: {
        margin: 4,
    },
    wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
    },
};


export default class ChipPlayer extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
        // bind component methods
        this.handleRequestDelete = this.handleRequestDelete.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleRequestDelete() {
        console.log(" ****** state player delete **********");
        PubSub.publish('playerRemovedFromTeam', this.props.player);
    }

    handleClick() {
        //document.getElementById('InputScore2').value="";

      // alert('You clicked the Chip.');
    }


    componentWillMount() {

    }

    componentWillUnmount() {
        console.log('ChipPlayer componentWillUnmount');
        // React removed me from the DOM, I have to unsubscribe from the system using my token
        //PubSub.unsubscribe(this.token);
    }

    /*componentDidMount() is a lifecycle method
  * that gets called after the component is rendered
  */
    componentDidMount() {
        // PubSub.publish('TeamFull', this.token);
        console.log('ChipPlayer componentDidMount');
    }

    subscriber(EventName, data){
        var key = EventName
        var val = data
        var obj  = {}
        obj[key] = val
        this.setState(obj);
    }

    render() {
        console.log(this.props);
        return(
            <Chip
                onRequestDelete={this.handleRequestDelete}
                onClick={this.thishandleClick}
                style={styles.chip}
                className="small"
                value={this.props.player.id}
                >
                {this.props.player.name}
            </Chip>
        )
    }
}

if (document.getElementById('ChipPlayer')) {
    ReactDOM.render(<ChipPlayer />, document.getElementById('ChipPlayer'));
}
