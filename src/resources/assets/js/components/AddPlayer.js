import React, {Component} from 'react';

import PubSub from 'pubsub-js';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import SnackBarMessage from "./Misc/SnackBarMessage";

class AddPlayer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            newPlayer: {
                name: ''
            },
            players: [],
            cardPlayerAddVisible: false,
            SnackBarOpen: false,
            snackBarText: "game saved"
        }

        //Boilerplate code for binding methods with `this`
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    componentWillMount() {
        this.token = PubSub.subscribe('players', this.subscriberState.bind(this));
        this.token = PubSub.subscribe('cardPlayerAddVisible', this.subscriberState.bind(this));
    }

    componentWillUnmount() {
        // React removed me from the DOM, I have to unsubscribe from the system using my token
        //PubSub.unsubscribe(this.token);
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
        this.setState(obj);
    }


    /* This method dynamically accepts inputs and stores it in the state */
    handleInput(key, e) {

        /*Duplicating and updating the state */
        var state = Object.assign({}, this.state.newPlayer);
        state[key] = e.target.value;
        this.setState({newPlayer: state});
       // this.handleAddPlayer(this.state.newPlayer);
    }

    /* This method is invoked when submit button is pressed */
    handleSubmit(e) {
        //preventDefault prevents page reload
        e.preventDefault();
        this.handleAddPlayer(this.state.newPlayer);
        document.getElementById('TextFieldNewPlayer').value="";
    }

    /**
     * close the add player card
     */
    handleSubmitCancel(e){
        this.setState({
            cardPlayerAddVisible: false
        })
    }

    // post to the ms to save the player
    handleAddPlayer(player) {
        /*Fetch API for post request */
        fetch( 'api/player/', {
            method:'post',
            /* headers are important*/
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(player)
        })
            .then(response => {
                return response.json();
            })
            .then( data => {

                this.setState((prevState)=> ({
                    players: prevState.players.concat(data),
                    currentPlayer : data
                }))
                // update subscribers
                PubSub.publish('players', this.state.players);
                PubSub.publish('newPlayer', data);
                PubSub.publish('snackBarText', "Player " + data.name + " (" + data.id + ") saved");
                PubSub.publish('cardPlayerAddVisible', false);
            })
    }

    /**
     * return the card if its visible
     */
    getCard(){
        if(this.state.cardPlayerAddVisible === true){
            return (
                    <Card>
                        <CardHeader
                            title="Add player"
                            subtitle="Player name must be unique"
                            actAsExpander={false}
                            showExpandableButton={false}
                        />
                        <CardText expandable={false}>
                            <TextField
                                id="TextFieldNewPlayer"
                                type="name"
                                hintText="new player name"
                                floatingLabelText="new player name"
                                onChange={(e) => this.handleInput('name', e)}
                            />
                        </CardText>
                        <CardActions>
                            <FlatButton
                                label="save player"
                                onClick={(e) =>  this.handleSubmit(e)}
                            />
                            <FlatButton
                                label="cancel"
                                onClick={(e) =>  this.handleSubmitCancel(e)}
                            />
                        </CardActions>
                    </Card>
            )
        }else{

        }

    }

    render() {
        let card = this.getCard();
        const divStyle = {
            position: 'absolute',
            left: '35%',
            top: '60%',
            flexDirection: 'space-between',

            marginLeft: '30px'
        }

        const inputStyle = {
            margin: '0px 10px 0px 10px'
        }
        return(
            <div>
                {card}
                <SnackBarMessage />
                <p></p>
            </div>
        )

    }

}

export default AddPlayer;