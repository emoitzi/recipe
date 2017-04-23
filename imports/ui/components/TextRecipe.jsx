import React, { Component } from 'react';
import EditIngredients  from './EditIngredients';

export default class TextRecipe extends Component {
  ingredientsChange(value, errorKey) {
    this.props.onChange('ingredients', value, errorKey);
  }
  handleChange(event) {
    this.props.onChange('preparation' ,event.target.value);
  }

  render() {
    return (
      <div>
        <EditIngredients ingredients={this.props.recipe.ingredients}
          onChange={this.ingredientsChange.bind(this)}
          errors={this.props.errors}/>

        <div className={ "form-group"  + ("preparation" in this.props.errors ? " has-error": "" )}>
          <label className="control-label" htmlFor="preparation">Zubereitung:</label>
          <textarea
            className="form-control"
            id="preparation"
            placeholder="Zubereitung"
            name="preparation"
            value={ this.props.recipe.preparation }
            onChange={ this.handleChange.bind(this)}
            />
        </div>
      </div>
    )
  }
}

TextRecipe.defaultProps = {
  "errors": {}
}
