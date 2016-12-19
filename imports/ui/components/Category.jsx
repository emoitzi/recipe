import { Meteor } from 'meteor/meteor'
import React, {Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import  { Categories } from '../../api/categories.js'

export class Category extends Component {
  constructor(props) {
    super(props);

    this.state = {value: ''}

    this.getCategories = this.getCategories.bind(this);
    this.renderCategories = this.renderCategories.bind(this);
  }
  getCategories () {
    return this.props.categories || [ { _id: "1", name: "Category"} ];
  }
  handleClick (event) {
    let target = $(event.target);
    let value = target.data('value');
    this.setState({value: value});
    this.props.onChange(value);
  }
  renderCategories() {
    return this.getCategories().map((category) => (
      <button type="button"
        data-value={category._id}
        className={ "btn btn-default " + (this.state.value == category._id ? 'active': '') }
        onClick={ this.handleClick.bind(this)}
        key={category._id}>
         {category.name}
       </button>
    ))
  }
  render() {
    return (
      <div className={ "form-horizontal category "  + (this.props.errorClass)}>
        <label className="col-sm-2 control-label"> Kategorie </label>
        <div className="col-sm-10 form-group btn-group" role="group">
          { this.renderCategories()}
        </div>
        <input
          type="hidden"
          value={this.state.value }
          name= { this.props.name}
          />
      </div>
    )
  }
}

Category.propTypes = {
  categories: PropTypes.array,
  inputName: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  errorClass: PropTypes.string,
}

export default CategoryContainer = createContainer( () => {
  Meteor.subscribe("categories");
  return {
    categories: Categories.find({}).fetch(),
  };
}, Category);
