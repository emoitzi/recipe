import React, {Component } from 'react';
import {browserHistory} from 'react-router';

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

class Ingredients extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 1
    }
  }
  addButton(e) {
    e.preventDefault();
    let count = this.state.count + 1;
    this.setState({
      count: count
    });
  }
  renderLine() {
    return (
      <div className="ingredients row">
        <div className="form-group col-xs-3 padding-left">
            <input
              type="text"
              className="form-control"
              />
        </div>
        <div className="form-group col-xs-3">
            <input
              type="text"
              className="form-control"
              />
        </div>
        <div className="form-group col-xs-6 padding-right">
            <input
              type="text"
              className="form-control"
              />
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
          <div className="form-group col-xs-6 padding-right">
            <span>
              Zutat
            </span>
          </div>
        </div>
      </div>
    )

  }
  renderIngredients () {
    const list = new Array(this.state.count);
    for (let i=0; i < this.state.count; ++i) {
      list[i] = i;
    }
    return list.map((index) => (
      <div key={index.toString()}>
        { this.renderLine()}
      </div>
    ))
  }
  render () {
    return (
      <div>
        <label>Zutaten: </label>
          {this.renderHeading()}
          { this.renderIngredients()}
        <button className="btn" onClick={this.addButton.bind(this)}>+</button>
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
  render() {
    return (
      <div>
        <Ingredients />
        <div className="form-group">
          <label htmlFor="preparation">Zubereitung:</label>
          <textarea
            className="form-control"
            placeholder="Zubereitung"
            name="preparation"
            ref="preparation" />
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

  render ()  {
    let center = null;
    let text_nav_class = "";
    let photo_nav_class = "";
    if (this.state.isPhotoRecipe) {
      center = <PhotoRecipe />
      photo_nav_class = "active";
    }
    else {
      center = <TextRecipe />
      text_nav_class = "active";
    }

    return (
      <div className="container">
        <h1>Rezept hinzufügen</h1>
        <form className="new-recipe">
          <div className="form-horizontal">
            <div className="form-group">
              <label className="col-sm-2 control-label" htmlFor="recipe-title">Titel: </label>
              <div className=" col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Titel"
                  name="recipe-title"
                  ref="title" />
              </div>
            </div>
          </div>
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
            <input type="checkbox" /> Privat
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
