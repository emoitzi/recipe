import React, {Component } from 'react';

export default class Ingredients extends Component {
  constructor(props) {
    props.value = props.value || {};
    super(props);

  }

  addButton(e) {
    e.preventDefault();
    let value = this.props.value;
    value.push({});
    this.props.onChange(value);
  }

  handleAmountChange(index, e){
    let value = this.props.value;
    value[index]['amount'] = e.target.value;
    this.props.onChange(value)
  }
  handleUnitChange(index,  e) {
    let value = this.props.value;
    value[index]['unit'] = e.target.value;
    this.props.onChange(value)
  }
  handleIngredientChange(index, e){
    let value = this.props.value;
    value[index]['ingredient'] = e.target.value;
    this.props.onChange(value)
  }
  handleRemove (index, e) {
    e.preventDefault();
    let value = this.props.value;
    value.splice(index, 1);
    this.props.onChange(value);
  }
  renderLine(index) {
    return (
      <div className="ingredients row">
        <div className="form-group col-xs-3 padding-left">
            <input
              type="text"
              className="form-control"
              onChange={this.handleAmountChange.bind(this, index)}
              />
        </div>
        <div className="form-group col-xs-3">
            <input
              type="text"
              className="form-control"
              onChange={this.handleUnitChange.bind(this, index)}
              />
        </div>
        <div className="form-group col-xs-5">
            <input
              type="text"
              className="form-control"
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
    const value = this.props.value
    return value.map((value, index) => (
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
