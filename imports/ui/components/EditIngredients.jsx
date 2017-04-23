import React, {Component } from 'react';

export default class EditIngredients extends Component {
  constructor(props) {
    super(props);
    this.getErrorClass = this.getErrorClass.bind(this);
    let ingredients = this.props.ingredients;
    if (!ingredients[0] || Object.keys(ingredients[0]) !== 3) {
      ingredients[0] = {
        "amount": '',
        "unit": '',
        "ingredient": '',
      }
    }
    this.state = {
      "ingredients": this.props.ingredients,
    }
  }

  willReceiveProps(props) {
    this.setState({"ingredients": props.ingredients});
  }
  addButton(e) {
    e.preventDefault();
    let ingredient = this.props.ingredients;
    ingredient.push({});
    this.props.onChange(ingredient);
  }

  handleAmountChange(index, e){
    let ingredient = this.state.ingredients;
    let amount = e.target.value;
    ingredient[index]['amount'] = amount;
    let errorKey;
    if (!/[^0-9]/.test(amount)) {
      errorKey = "ingredients." + index + ".amount";
    }
    this.props.onChange(ingredient, errorKey);
  }
  handleUnitChange(index,  e) {
    let ingredient = this.props.ingredients;
    ingredient[index]['unit'] = e.target.value;
    let errorKey;
    if (e.target.value) {
      errorKey = "ingredients." + index + ".unit";
    }
    this.props.onChange(ingredient, errorKey);
  }
  handleIngredientChange(index, e){
    let ingredient = this.props.ingredients;
    ingredient[index]['ingredient'] = e.target.value;
    let errorKey;
    if (e.target.value) {
      errorKey = "ingredients." + index + ".ingredient";
    }
    this.props.onChange(ingredient, errorKey);
  }
  handleRemove (index, e) {
    e.preventDefault();
    let ingredient = this.props.ingredients;
    ingredient.splice(index, 1);
    this.props.onChange(ingredient);
  }
  getErrorClass(index, name) {
    const key = 'ingredients.' + index + '.' + name;
    return key in this.props.errors ? ' has-error': '';
  }
  renderLine(index) {
    return (
      <div className="ingredients row">
        <div className= { "form-group col-xs-3 padding-left" + this.getErrorClass(index, 'amount') }>
            <input
              type="text"
              pattern="[0-9]+"
              inputMode="numeric"
              className="form-control"
              title="nur Zahlen"
              value={this.state.ingredients[index].amount }
              onChange={this.handleAmountChange.bind(this, index)}
              />
        </div>
        <div className={ "form-group col-xs-3" + this.getErrorClass(index, 'unit') }>
            <input
              type="text"
              className="form-control"
              value={this.state.ingredients[index].unit }
              onChange={this.handleUnitChange.bind(this, index)}
              />
        </div>
        <div className={ "form-group col-xs-5"  + this.getErrorClass(index, 'ingredient') }>
            <input
              type="text"
              className="form-control"
              value={this.state.ingredients[index].ingredient }
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

EditIngredients.defaultProps = {
  "ingredients": [{}],
}
