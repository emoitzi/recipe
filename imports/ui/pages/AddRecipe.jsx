import { Meteor } from 'meteor/meteor'
import React, {Component } from 'react';
import {browserHistory} from 'react-router';
import { ValidationError } from 'meteor/mdg:validation-error';


import  Ingredients  from '../components/Ingredients';
import  CategoryContainer from '../components/Category';

import { Recipes } from '../../api/recipes.js';
import { Images } from '../../api/images.js';


class PhotoRecipe extends Component {
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
      </div>
    )
  }
}

class TextRecipe extends Component {
  constructor(props) {
    super(props)
    this.props.errorClass = props.errorClass || '';
  }

  ingredientsChange(value) {
    this.props.onChange({ingredients: value});
  }
  handleChange(event) {
    this.props.onChange({preparation: event.target.value});
  }

  render() {
    return (
      <div>
        <Ingredients value={this.props.value}
          onChange={this.ingredientsChange.bind(this)}/>
        <div className={ "form-group "  + this.props.errorClass }>
          <label className="control-label" htmlFor="preparation">Zubereitung:</label>
          <textarea
            className="form-control"
            id="preparation"
            placeholder="Zubereitung"
            name="preparation"
            ref="preparation"
            onChange={ this.handleChange.bind(this)}
            />
        </div>
      </div>
    )
  }
}

export default class AddRecipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPhotoRecipe: false,
      ingredients: [{}],
    };
  }
  backHandler (event) {
    event.preventDefault();
    browserHistory.push('/')
  }
  handleTextRecipeClick (event) {
    this.setState({
      isPhotoRecipe: false,
    });
  }
  handlePhotoRecipeClick (event) {
    this.setState({
      isPhotoRecipe: true,
    })
  }
  ingredientsChange(value) {
    this.setState(value);
  }

  handleChange (event) {
    let target = $(event.target);
    let name = target.attr('name');
    let new_state = {};
    new_state[name] = target.val();
    this.setState(new_state);
  }
  handleStatusChange (event) {
    let value = event.target.checked;
    this.setState({private: value});
  }
  handleCategoryChange (value) {
    this.setState({category: value});
  }

  handleSubmit (event) {
    event.preventDefault();
    this.setState({errors: {}})
    Meteor.call('recipes.insert', this.state, (err) => {
      if (err) {
        err.details.forEach((fieldError) => {
          let error_state = this.state.errors;
          error_state[fieldError.name] = true;
          this.setState({errors: error_state});
        });
      }
      else {
        //success
        window.location.reload(false);
      }
    });
  }
  handleImageChange(event, onStart, onUploaded) {
    let saveButton = $(this.refs.saveButton);
    saveButton.button('loading');
    event.preventDefault();
    let target = event.currentTarget;

    let self = this;

    if ( target && target.files[0]) {
      let file = target.files[0];
      let uploadInstance = Images.insert({
        file: file,
        streams: 'dynamic',
        chunkSize: 'dynamic',
        allowWebWorkers: true,
        transport: 'http',
      }, false);

      uploadInstance.on('start', onStart);
      uploadInstance.on('uploaded', onUploaded);

      uploadInstance.start();
    }
  }

  handleTitleImage(event) {
    const self = this;
    function onStart() {
      self.setState({uploadingTitleImage: true});
    }

    function onUploaded(error, fileObj) {
      if (error) {
        console.log(error);
      }
      else {
        self.setState({
          titleImage: fileObj._id,
        });
        self.refs.titleImage.file = '';
      }
      self.setState({
        uploadingTitleImage: false
      })
      if (! (self.state.uploadingRecipeImage && self.state.uploadingTitleImage)) {
        let saveButton = $(self.refs.saveButton);
        saveButton.button('reset');
      }
    }

    this.handleImageChange(event, onStart, onUploaded);
  }

  handleRecipeImage(event) {
    const self = this;

    function onStart() {
      self.setState({uploadingRecipeImage: true});
    }

    function onUploaded(error, fileObj) {
      if (error) {
        console.log(error);
      }
      else {
        self.setState({
          recipeImage: fileObj._id,
        });
      }
      self.setState({
        uploadingRecipeImage: false
      })
      if (! self.state.uploadingRecipeImage && self.state.uploadingTitleImage) {
        let saveButton = $(self.refs.saveButton);
        saveButton.button('reset');
      }

    }
    this.handleImageChange(event, onStart, onUploaded);
  }

  hasError(name) {
    return 'errors' in this.state && name in this.state.errors;
  }

  render ()  {
    let center = null;
    let text_nav_class = "";
    let photo_nav_class = "";
    if (this.state.isPhotoRecipe) {
      center = <PhotoRecipe
      onImageChange={ this.handleRecipeImage.bind(this)}/>
      photo_nav_class = "active";
    }
    else {
      center = <TextRecipe
        onChange={ this.ingredientsChange.bind(this)}
        value={ this.state.ingredients}
        errorClass={ this.hasError('preparation') ? 'has-error': ''}
        />
      text_nav_class = "active";
    }


    return (
      <div className="container">
        <h1>Rezept hinzufügen</h1>
        <form className="new-recipe"
          onSubmit={this.handleSubmit.bind(this)}>
          <div className="form-horizontal">
            <div className={ "form-group " + (this.hasError('title') ? 'has-error' :'') }>
              <label className="col-sm-2 control-label" htmlFor="title">Titel: </label>
              <div className=" col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Titel"
                  name="title"
                  ref="title"
                  id="title"
                  onChange={this.handleChange.bind(this)}
                  />
              </div>
            </div>
          </div>
          {
            Meteor.isDevelopment &&
              <pre>
                { JSON.stringify(this.state, null, 2)}
              </pre>
          }
          <CategoryContainer
            inputName="category"
            onChange={this.handleCategoryChange.bind(this)}
            errorClass={ this.hasError('category') ? 'has-error': ''}
            />

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
        <div className={ "form-group pull-left " + (this.hasError('titleImage') ? 'has-error' :'') }>
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
        <img ref="title_image_img"/>
        <div className="checkbox pull-right">
          <label>
            <input type="checkbox"
              onChange={this.handleStatusChange.bind(this)} /> Privat
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
