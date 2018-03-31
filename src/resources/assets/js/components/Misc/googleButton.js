import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/*
*  based on https://www.npmjs.com/package/react-google-login
*  google auth reference https://developers.google.com/identity/sign-in/web/reference#users
*/
import GoogleLogin from 'react-google-login';


/*
const responseGoogle = (response) => {
    console.log(response);
}
*/

export default class googleButton extends Component {
    constructor(props) {
        super(props);
    }

    responseGoogle (googleUser) {
      // let id_token = googleUser.getAuthResponse().id_token;
        console.log('success login');
        console.log(googleUser);
        console.log('user signed in: ');
        console.log(googleUser.isSignedIn());
        //console.log({accessToken: id_token});
        //anything else you want to do(save to localStorage)...
    }

    responseGoogleFail (googleUser) {
        // let id_token = googleUser.getAuthResponse().id_token;
        console.log('failed login');
        console.log(googleUser);
        //console.log({accessToken: id_token});
        //anything else you want to do(save to localStorage)...
    }

    render() {
        return (<GoogleLogin
                clientId="@todo pull value from settings"
                buttonText="Login-google"
                onSuccess={this.responseGoogle}
                onFailure={this.responseGoogleFail}
             />)
    }
}

if (document.getElementById('GoogleLogin')) {
    ReactDOM.render(<GoogleLogin />, document.getElementById('GoogleLogin'));
}