import React, {Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import { Images } from '../../api/images.js';


class RecipeListItem extends Component {


  render() {
    const link = "/recipe/" + this.props.recipe._id;
    return (
      <li className="col-xs-12 col-md-4" >
        <a href={ link } className="thumbnail">
        {
          this.props.image && <img src={ this.props.image.link()} alt={this.props.image.name} />
        }
          <span> { this.props.recipe.title}</span>
        </a>
      </li>
    )
  }
}


RecipeListItem.propTypes = {
  recipe: PropTypes.object.isRequired,
  image: PropTypes.object,
}

export default createContainer ( ({image_id}) => {
  const handle = Meteor.subscribe("images.one", image_id);
  const image = Images.findOne({_id: image_id});
  return {
    image: image,
  }

}, RecipeListItem);
