import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PubSub from 'pubsub-js';

//toolbar stuff
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

export default class ToolbarNav extends Component {

    constructor(props) {
        super(props);

        this.state = {
            value: 3,
        };

        // bind component methods
       // this.handleRequestDelete = this.handleRequestDelete.bind(this);
       // this.handleClick = this.handleClick.bind(this);
    }

    handleChange(event, index, value){
        this.setState(
            {value}
            );
    }


    /**
     *
     * subscriber for state events
     *
     * @param EventName
     * @param data
     */
    subscriberState(EventName, data){
        let key = EventName
        let val = data
        let obj  = {}
        obj[key] = val
        //console.log('players in ListPlayers class');
        //console.log(this.state.players);
        this.setState(obj);
    }



    /**
     * Subscriptions biding
     */
    componentWillMount() {
       // this.token = PubSub.subscribe('newPlayer', this.subscriberNewPlayer.bind(this));
      //  this.token = PubSub.subscribe('playerRemove', this.subscriberPlayerRemove.bind(this));
      //  this.token = PubSub.subscribe('playerRemovedFromTeam', this.subscriberPlayerAdd.bind(this));
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
        return (
            <Toolbar>
                <ToolbarGroup>
                    <ToolbarTitle text="TT scores" />
                    <IconMenu
                        iconButtonElement={
                            <IconButton touch={true}>
                                more <NavigationExpandMoreIcon />
                            </IconButton>
                        }
                    >
                        <MenuItem primaryText="Add player" />
                        <MenuItem primaryText="View stats" />
                    </IconMenu>
                </ToolbarGroup>
            </Toolbar>
        );
    }


}

if (document.getElementById('ToolbarNav')) {
    ReactDOM.render(<Toolbar />, document.getElementById('ToolbarNav'));
}