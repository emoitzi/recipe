import React, {Component } from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router';

import { Images, defaultTitleImageUrl } from '../../api/images.js';


class RecipeListItem extends Component {


  render() {
    const link = "/recipe/" + this.props.recipe._id;
    return (
      <li className="col-xs-12 col-sm-4 col-md-3" >
        <Link to={ link } className="thumbnail">
          <img src={ this.props.imageUrl} alt={this.props.imageName || this.props.recipe.title} />
          <span> { this.props.recipe.title}</span>
        </Link>
      </li>
    )
  }
}


RecipeListItem.propTypes = {
  recipe: PropTypes.object.isRequired,
  imageName: PropTypes.string,
  imageUrl: PropTypes.string.isRequired
}

export default createContainer ( ({image_id}) => {
  const handle = Meteor.subscribe("images.one", image_id);
  const image = Images.findOne({_id: image_id});
  const imageUrl = image ? image.link() : defaultTitleImageUrl();
  const imageName = image ? image.name : null;
  return {
    image: image,
    imageUrl: imageUrl,
    imageName: imageName
  }

}, RecipeListItem);
