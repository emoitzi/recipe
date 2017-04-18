import React, {Component } from 'react';

export default class EditIngredients extends Component {
  constructor(props) {
    props.ingredients = props.ingredients || {};
    super(props);

  }

  addButton(e) {
    e.preventDefault();
    let ingredient = this.props.ingredients;
    ingredient.push({});
    this.props.onChange(ingredient);
  }

  handleAmountChange(index, e){
    let ingredient = this.props.ingredients;
    ingredient[index]['amount'] = e.target.value;
    this.props.onChange(ingredient)
  }
  handleUnitChange(index,  e) {
    let ingredient = this.props.ingredients;
    ingredient[index]['unit'] = e.target.value;
    this.props.onChange(ingredient)
  }
  handleIngredientChange(index, e){
    let ingredient = this.props.ingredients;
    ingredient[index]['ingredient'] = e.target.value;
    this.props.onChange(ingredient)
  }
  handleRemove (index, e) {
    e.preventDefault();
    let ingredient = this.props.ingredients;
    ingredient.splice(index, 1);
    this.props.onChange(ingredient);
  }
  renderLine(index) {
    return (
      <div className="ingredients row">
        <div className="form-group col-xs-3 padding-left">
            <input
              type="text"
              className="form-control"
              value={this.props.ingredients[index].amount }
              onChange={this.handleAmountChange.bind(this, index)}
              />
        </div>
        <div className="form-group col-xs-3">
            <input
              type="text"
              className="form-control"
              value={this.props.ingredients[index].unit }
              onChange={this.handleUnitChange.bind(this, index)}
              />
        </div>
        <div className="form-group col-xs-5">
            <input
              type="text"
              className="form-control"
              value={this.props.ingredients[index].ingredient }
              onChange={this.handleIngredientChange.bind(this, index)}
              />
        </div>
        <div className="col-xs-1">
          <button
            className="btn btn-danger"
            onClick={this.handleRemove.bind(this, index)}>
            Entfernen</button>
        </div>
      </div>
    )

  }
  renderHeading() {
    return (
      <div>

        <div className="ingredients row">
          <div className="form-group col-xs-3 padding-left">
            <span>
              Menge
            </span>
          </div>
          <div className="form-group col-xs-3">
            <span>
              Einheit
            </span>
          </div>
          <div className="form-group col-xs-6 ">
            <span>
              Zutat
            </span>
          </div>
        </div>
      </div>
    )

  }
  renderIngredients () {

    const ingredients = this.props.ingredients;
    return ingredients.map((ingredient, index) => (
      <div key={index}>
        { this.renderLine(index)}
      </div>
    ))
  }
  render () {
    return (
      <div>
        <label>Zutaten: </label>
          {this.renderHeading()}
          { this.renderIngredients()}
        <button className="btn btn-default" onClick={this.addButton.bind(this)}>+</button>
      </div>
    )
  }
}
