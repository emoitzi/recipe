import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import  Blaze from 'meteor/gadicc:blaze-react-component';


export default class NavBar extends Component {

  render() {
    return (
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container-fluid">

          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link to='/' className="navbar-brand">Home</Link>
          </div>

          <div className="collapse navbar-collapse" id="navbar-collapse-1">
            <ul className="nav navbar-nav">
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li><Link to="/changepwd">Passwort ändern</Link></li>
              <li><Blaze template="atNavButton"/></li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}
