import React, { Component } from 'react';
import EditIngredients  from './EditIngredients';

export default class TextRecipe extends Component {
  constructor(props) {
    super(props)
    this.props.errorClass = props.errorClass || '';
  }

  ingredientsChange(value) {
    this.props.onChange('ingredients', value);
  }
  handleChange(event) {
    this.props.onChange('preparation' ,event.target.value);
  }

  render() {
    return (
      <div>
        <EditIngredients ingredients={this.props.recipe.ingredients}
          onChange={this.ingredientsChange.bind(this)}/>
        <div className={ "form-group "  + this.props.errorClass }>
          <label className="control-label" htmlFor="preparation">Zubereitung:</label>
          <textarea
            className="form-control"
            id="preparation"
            placeholder="Zubereitung"
            name="preparation"
            value={ this.props.preparation }
            onChange={ this.handleChange.bind(this)}
            />
        </div>
      </div>
    )
  }
}
