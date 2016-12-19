import { Meteor } from 'meteor/meteor'
import React, {Component } from 'react';
import {browserHistory} from 'react-router';
import { ValidationError } from 'meteor/mdg:validation-error';


import { Ingredients } from '../components/Ingredients';
import { Recipes } from '../../api/recipes.js';

class Category extends Component {
  getCategories () {
    return [
      'Suppe', 'Fleisch', 'Nudeln', 'Mehlspeisen'
    ]
  }
  renderCategories() {
    return this.getCategories().map((category) => (
      <button type="button" className="btn btn-default" key={category}>
         {category}
       </button>
    ))
  }
  render() {
    return (
      <div className="form-horizontal">
        <label className="col-sm-2 control-label"> Kategorie </label>
        <div className="col-sm-10 form-group btn-group" role="group">
          { this.renderCategories()}
        </div>
      </div>
    )
  }

}


class PhotoRecipe extends Component {
  constructor(props) {
    super(props);
  }
  render()  {
    return (
      <div>
        <div className="form-group">
          <label htmlFor="picture">Foto:</label>
          <input
            type="file"
            accept="image/*"
            name="photo-recipe"
            ref="photo-recipe" />
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
          <label htmlFor="preparation">Zubereitung:</label>
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

  hasError(name) {
    return 'errors' in this.state && name in this.state.errors;
  }

  render ()  {
    let center = null;
    let text_nav_class = "";
    let photo_nav_class = "";
    if (this.state.isPhotoRecipe) {
      center = <PhotoRecipe />
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
          <pre>
            { JSON.stringify(this.state, null, 2)}
          </pre>
          <Category />

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
        <div className="form-group pull-left">
          <label htmlFor="picture">Titelbild:</label>
          <input
            type="file"
            accept="image/*"
            name="picture"
            ref="picture" />
        </div>
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
          <button className="btn btn-success pull-right">Speichern</button>

        </form>

      </div>
    )

  }
}
