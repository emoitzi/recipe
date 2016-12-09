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
      <div>

        <div className="form-group">
          <label className="control-label">
            <input
              type="text"
              className="form-control"
              />
          </label>
        </div>
        <div className="form-group">
          <label className="control-label">
            <input
              type="text"
              className="form-control"
              />
          </label>
        </div>
        <div className="form-group">
          <label className="control-label">
            <input
              type="text"
              className="form-control"
              />
          </label>
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
      <div className="form-inline" key={index.toString()}>
        { this.renderLine()}
      </div>
    ))
  }
  render () {
    return (
      <div>
        <label>Zutaten: </label>
        { this.renderIngredients()}
        <button className="btn" onClick={this.addButton.bind(this)}>+</button>
      </div>
    )
  }
}

export default class AddRecipe extends Component {
  backHandler (event) {
    event.preventDefault();
    browserHistory.push('/')
  }
  render() {
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
          <Ingredients />
          <div className="form-group">
            <label htmlFor="preparation">Zubereitung:</label>
            <textarea
              className="form-control"
              placeholder="Zubereitung"
              name="preparation"
              ref="preparation" />
          </div>
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
