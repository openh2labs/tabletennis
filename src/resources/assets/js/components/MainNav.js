import React, { Component } from 'react';

/* Stateless component or pure component
 * { player } syntax is the object destructing
 */
class MainNav extends Component {

    constructor() {
        super()
        this.handleClick = this.handleClick.bind(this);
    }

        render() {
            return(
                <ul className="nav nav-tabs">
                <li className="nav-item">
                <a className="nav-link active" href="#" onClick={(e) => this.handleClick(e)}>Team 1</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="#">Team 2</a>
            </li>
            <li className="nav-item">
                <a className="nav-link disabled" href="#">Score</a>
                </li>
                <li className="nav-item">
                <a className="nav-link disabled" href="#">Stats</a>
                </li>
                <li className="nav-item">
                <a className="nav-link" href="#">Add player</a>
            </li>
            </ul>
            )
        }

         handleClick(e) {
            e.preventDefault();
            console.log('The link was clicked.');
        }

}

export default MainNav ;