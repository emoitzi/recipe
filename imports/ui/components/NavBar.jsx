import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import  Blaze from 'meteor/gadicc:blaze-react-component';


export default class NavBar extends Component {

  render() {
    return (
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container">
          <ul className="nav navbar-nav">
            <li><Link to='/' className="navbar-brand">Home</Link></li>
          </ul>
          <ul className="nav navbar-nav navbar-right">
            <li><Link to="/changepwd">Passwort ändern</Link></li>
            <li><Blaze template="atNavButton"/></li>
          </ul>
        </div>
      </nav>
    )
  }
}
