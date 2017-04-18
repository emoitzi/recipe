import React, {Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import  Blaze from 'meteor/gadicc:blaze-react-component';

export default class ChangePwd extends Component {
  render() {
    return (
      <div>
        <div className="container">
          <h1>Passwort ändern</h1>
          <div>
            <Blaze template="atForm" state='changePwd'/>
          </div>
        </div>
      </div>
    )
  }


}
