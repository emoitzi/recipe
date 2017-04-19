import React, {Component } from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router';

import { Images, defaultTitleImageUrl} from '../../api/images.js';


class RecipeListItem0 extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <li className="col-xs-12 col-md-4" >
        <Link to={ this.props.url } className="thumbnail">
           <img src={ this.props.url }  />
        </Link>
      </li>
    )
  }
}

export default createContainer ( ({id}) => {
  return {
    url: "https://unsplash.it/200/?image=" + id.toString()
  }

}, RecipeListItem0);
