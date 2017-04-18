import React, { Component } from 'react';


export default class PhotoRecipe extends Component {
  constructor(props) {
    super(props);
  }
  handleImageChange (event) {
    this.props.onImageChange(event);
  }
  render()  {
    return (
      <div>
        <div className="form-group">
          <label htmlFor="recipeImage">Foto:</label>
          <input
            type="file"
            accept="image/*"
            name="recipeImage"
            id="recipeImage"
            onChange={ this.handleImageChange.bind(this)}
            ref="recipeImage" />
        </div>
        <img id="recipeImgPreview"
          ref="recipeImgPreview"
          src={this.props.imgSrc}
          className="img-responsive"/>

      </div>
    )
  }
}
