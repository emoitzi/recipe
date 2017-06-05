import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import { IndexLink } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Categories } from '../../api/categories.js'
import RecipeListGroup from '../components/RecipeListGroup';

 class Home extends Component {
   constructor(props) {
     super(props);
     this.positionAddButton = this.positionAddButton.bind(this);
   }

   renderCategories() {
     return this.props.categories.map((category) => {
       return (
        <RecipeListGroup key={ category._id }
                          category_id={category._id}
                          category_name={ category.name} />
       )
     });
   }

  render() {
    return (
      <div>
        <h1>Rezepte</h1>
        <IndexLink id="add-button" className="btn btn-success" to="/recipe/add">Rezept hinzufügen</IndexLink>
          <div id="grid">
            { this.renderCategories() }
          </div>
      </div>

    )
  }
  componentDidMount() {
    window.addEventListener('resize', this.positionAddButton);
    this.positionAddButton();
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.positionAddButton);
  }

  positionAddButton() {
    var $this = $(ReactDOM.findDOMNode(this));
    $btn = $this.find('#add-button');
    $grid = $this.find('#grid');
    let position = $grid.offset();
    let grid_width = $grid.width();

    let left = position.left + grid_width - $btn.outerWidth(true) - 4;
    $btn.css({left: left});

  }
}

export default createContainer ( () => {
  Meteor.subscribe("categories");
  return {
    categories: Categories.find({}).fetch()
  }
}, Home);
