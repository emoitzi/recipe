import { Meteor } from 'meteor/meteor'
import React, {Component } from 'react';
import PropTypes from 'prop-types';
import {browserHistory} from 'react-router';
import { ValidationError } from 'meteor/mdg:validation-error';


import CategoryContainer from '../components/Category';
import TextRecipe from '../components/TextRecipe';
import PhotoRecipe from '../components/PhotoRecipe';

import { Recipes  } from '../../api/recipes.js';
import { Images, resolutions } from '../../api/images.js';

export default class RecipeForm extends Component {
  constructor(props) {
    super(props);
    const default_recipe = {
      isPhotoRecipe:  false,
      ingredients:  [{}],
      title: '',
      preparation: '',
      private: false,
    }

    this.state = {
      recipe : props.recipe || default_recipe,
      recipePreviewSrc: props.recipePreviewSrc || '',
      titlePreviewSrc: props.titlePreviewSrc || '',
      uploadingImage: 0,
      errors: {},
    };
  }

  componentWillReceiveProps( props) {
    let state = {
      recipe : props.recipe || this.state.recipe,
      recipePreviewSrc: props.recipePreviewSrc || this.state.recipePreviewSrc || '',
      titlePreviewSrc: props.titlePreviewSrc || this.state.titlePreviewSrc || '',

    };
    this.setState(state);
  }

  backHandler (event) {
    event.preventDefault();
    browserHistory.push('/')
  }

  removeError(prevState, key) {
    let errors = prevState.errors;
    if (key in errors) {
      delete errors[key];
    }
    return errors;
  }

  handleTextRecipeClick (event) {
    this.setState((prevState, props) => {
      let prevRecipe = prevState.recipe;
      prevRecipe.isPhotoRecipe = false;
      return { recipe: prevRecipe};
    });
  }
  handlePhotoRecipeClick (event) {
    this.setState((prevState, props) => {
      let prevRecipe = prevState.recipe;
      prevRecipe.isPhotoRecipe = true;
      return { recipe: prevRecipe};
    });
  }
  handleTextRecipeChange(key, value, errorKey) {
    let self = this;
    this.setState((prevState, props) => {
      let prevRecipe = prevState.recipe;
      prevRecipe[key] = value;
      return {
        recipe: prevRecipe,
        errors: value ? self.removeError(prevState, errorKey || key): prevState.errors,
       };
    });
  }

  handleChange (event) {
    let self = this;
    let target = $(event.target);
    let name = target.attr('name');
    this.setState((prevState, props) => {
      let prevRecipe = prevState.recipe;
      let value = target.val();
      prevRecipe[name] = value;
      return {
         recipe: prevRecipe,
         errors: value ? self.removeError(prevState, name) : prevState.errors,
       };
    });
  }
  handleStatusChange (event) {
    let value = event.target.checked;
    this.setState( (prevState, props) => {
      let prevRecipe = prevState.recipe;
      prevRecipe.private = value;
      return { recipe: prevRecipe };
    });
  }
  handleCategoryChange (value) {
    let self=this;
    this.setState((prevState, props) => {
      let prevRecipe = prevState.recipe;
      prevRecipe.category = value;
      return {
         recipe: prevRecipe,
         errors: value ? self.removeError(prevState, 'category') : prevState.errors,
       };
    });
  }

  handleSubmit (event) {
    event.preventDefault();
    let self = this;
    this.props.onSubmit(this.state.recipe, (err) => {
      if (err) {
        self.setState({"errors": err});
      }
    });

  }
  handleImageChange(file, resolution, idStateKey, srcStateKey) {
    let self = this;
    let saveButton = $(this.refs.saveButton);
    saveButton.button('loading');

    let img = new Image();
    img.file = file;
    var reader = new FileReader();
    reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img);
    reader.readAsDataURL(file);

    img.onload = () => {

      let canvas = document.createElement("canvas");
      canvas.width = resolution.width;
      canvas.height = resolution.height;
      let ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0,0, canvas.width, canvas.height);
      let src = canvas.toDataURL("image/jpeg");

      let new_state = {}
      new_state[srcStateKey] = src;
      self.setState(new_state);

      let uploadInstance = Images.insert({
        file: src,
        isBase64: true,
        fileName: file.name,
        streams: 'dynamic',
        chunkSize: 'dynamic',
        allowWebWorkers: true,
        // transport: 'http',
      }, false);

      uploadInstance.on('start', () => {
        self.setState((prevState) => {
            return {uploadingImage: prevState.uploadingImage + 1};
        });
      });
      uploadInstance.on('uploaded', (error, fileObj) => {
        if (!error) {
          self.setState((prevState, props) => {
            let prevRecipe = prevState.recipe;
            prevRecipe[idStateKey] = fileObj._id;

            let errors = self.removeError(prevState, idStateKey);
            return {
              recipe: prevRecipe,
              errors: errors,
            };
          });
        }
        else {
          console.log(error);
        }

        self.setState((prevState) => {
          return { uploadingImage: prevState.uploadingImage - 1};

        });
        if ( self.state.uploadingImage === 0 ) {
          let saveButton = $(self.refs.saveButton);
          saveButton.button('reset');
        }

      });
      uploadInstance.start();
    }

  }

  handleTitleImage(event) {
    let target = event.currentTarget;
    if (target.files && target.files[0]) {
      let file = target.files[0];
      this.handleImageChange(file, resolutions.title, "titleImage", "titlePreviewSrc");
    }
  }

  handleRecipeImage(event) {
    let target = event.currentTarget;

    if (target.files && target.files[0]) {
      let file = target.files[0];
      this.handleImageChange(file, resolutions.recipe, "recipeImage", "recipePreviewSrc");
    }
  }

  hasError(name) {
    return 'errors' in this.state && name in this.state.errors;
  }

  render ()  {
    if (!this.props.ready) {
      return (
        <p>loading</p>
      )
    }
    let center = null;
    let text_nav_class = "";
    let photo_nav_class = "";
    if (this.state.recipe.isPhotoRecipe) {
      center = <PhotoRecipe
        imgSrc={this.state.recipePreviewSrc}
        onImageChange={ this.handleRecipeImage.bind(this)}
        errorClass={ this.hasError('recipeImage') ? 'has-error': '' }
      />
      photo_nav_class = "active";
    }
    else {
      center = <TextRecipe
        onChange={ this.handleTextRecipeChange.bind(this)}
        recipe={ this.state.recipe}
        errors={ this.state.errors}
        />
      text_nav_class = "active";
    }


    return (
      <div className="container">
        <h1> { this.props.title }</h1>
        <form className="new-recipe"
          onSubmit={this.handleSubmit.bind(this)}>
          <div className="row">
            <div className="col-xs-12 col-md-6">
              <img id="titleImgPreview"
                src={this.state.titlePreviewSrc }
                className="img-responsive"/>
              <div className={ "form-group " + (this.hasError('titleImage') ? 'has-error' :'') }>
                <label className="control-label" htmlFor="titleImage">Titelbild:</label>
                <input
                  type="file"
                  accept="image/*"
                  name="titleImage"
                  ref="titleImage"
                  id="titleImage"
                  onChange={ this.handleTitleImage.bind(this)}
                  />
              </div>

            </div>
            <div className="col-xs-12 col-md-6">
              <div className="form-horizontal row">
                <div className={ "form-group " + (this.hasError('title') ? 'has-error' :'') }>
                  <label className="col-sm-2 control-label" htmlFor="title">Titel: </label>
                  <div className=" col-sm-10">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Titel"
                      name="title"
                      id="title"
                      value={ this.state.recipe.title }
                      onChange={this.handleChange.bind(this)}
                      />
                  </div>
                </div>
              </div>
              <CategoryContainer
                inputName="category"
                currentCategory={ this.state.recipe.category}
                onChange={this.handleCategoryChange.bind(this)}
                errorClass={ this.hasError('category') ? 'has-error': ''}
              />
            </div>
          </div>
          {
            Meteor.isDevelopment &&
              <pre>
                { JSON.stringify(this.state, null, 2)}
              </pre>
          }

          <ul className="nav nav-tabs">
            <li role="presentation" className={text_nav_class}>
               <a href="#"
                  onClick={this.handleTextRecipeClick.bind(this)}>
                  Zubereitung
                </a></li>
              <li role="presentation" className={ photo_nav_class }>
              <a href="#"
                onClick={this.handlePhotoRecipeClick.bind(this)} >
                Rezept fotografieren
              </a></li>
          </ul>
        { center }
        <div className="checkbox ">
          <label>
            <input type="checkbox"
              onChange={this.handleStatusChange.bind(this)}
              checked={ this.state.recipe.private} /> Privat
          </label>
        </div>
        <div className="clearfix" />
        <button className="btn btn-default pull-left" onClick={this.backHandler.bind(this)}>
          Zurück
        </button>
        <button
          data-loading-text="Hochladen..."
          autoComplete="off"
          ref="saveButton"
          className="btn btn-success pull-right">
          Speichern
        </button>
        </form>
      </div>
    )

  }
}

RecipeForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  recipe: PropTypes.object,
  recipePreviewSrc: PropTypes.string,
  titlePreviewSrc: PropTypes.string,
  ready: PropTypes.bool,
  title: PropTypes.string,
};

RecipeForm.defaultProps = {
  title: "Rezept hinzufügen",
};
