import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PubSub from 'pubsub-js';
import {fullWhite} from 'material-ui/styles/colors';

export default class ListPlayers extends Component {

    constructor(props) {
        super(props);

        this.state = {
            players: [],
            currentPlayer: null
        }

        // bind component methods
        this.handleRequestDelete = this.handleRequestDelete.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleRequestDelete() {
        //console.log(" ****** state player delete **********");
       //PubSub.publish('playerRemovedFromTeam', this.props.player);
    }

    handleClick(player) {
        this.setState({currentPlayer:player});
        PubSub.publish('currentPlayer', player);
      //  PubSub.publish('players', this.state.players);
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
     * add player back to the list
     *
     * @param EventName
     * @param data
     */
    subscriberNewPlayer(EventName, data){
        this.setState((prevState)=> ({
            players: prevState.players.concat(data),
            currentPlayer : data
        }))
    }

    /**
     *
     * remove a player from the list
     *
     * @param EventName
     * @param data
     */
    subscriberPlayerRemove(EventName, player){
        let array = this.state.players;
        let index = array.indexOf(player.player)
        array.splice(index, 1);
        this.setState({players: array });
        this.setState({currentPlayer: null});
        PubSub.publish('currentPlayer', null);
    }

    /**
     *  add a player to the list
     * @param EventName
     * @param data
     */
    subscriberPlayerAdd(EventName, player){
        let array = this.state.players;
        array.push(player);
        this.setState({players: array });
    }

    /**
     * Subscriptions biding
     */
    componentWillMount() {
        this.token = PubSub.subscribe('newPlayer', this.subscriberNewPlayer.bind(this));
        this.token = PubSub.subscribe('playerRemove', this.subscriberPlayerRemove.bind(this));
        this.token = PubSub.subscribe('playerRemovedFromTeam', this.subscriberPlayerAdd.bind(this));
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
        fetch('/api/player')
            .then(response => {
                return response.json();
            })
            .then(players => {
                //Fetched player is stored in the state
                this.setState({ players });
                PubSub.publish('players', players);
            });

    }

    renderPlayers() {
        const listStyle = {
            listStyle: 'none',
            fontSize: '18px',
            lineHeight: '1.8em',
        }

        return this.state.players.map(player => {
            return (
                /* When using list you need to specify a key
                 * attribute that is unique for each list item
                */
                <li className="list-group-item" onClick={
                    () =>this.handleClick(player)} key={player.id} >
                    { player.name }
                </li>
            );
        })
    }


    render() {
        return(
            <div>
                <p><strong>Available players</strong></p>
                <ul className="list-group">
                    { this.renderPlayers() }
                </ul>
            </div>
        )
    }
}

if (document.getElementById('ListPlayers')) {
    ReactDOM.render(<ListPlayers />, document.getElementById('ListPlayers'));
}