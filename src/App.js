import firebase from "firebase/app";
import "firebase/database";
import React, { Component } from "react";
import "./App.css";
import Card from "./Card/Card";
import { DB_CONFIG } from "./Config/Firebase/db_config";
import DrawButton from "./DrawButton/DrawButton";

class App extends Component {
  constructor(props) {
    super(props);

    this.app = firebase.initializeApp(DB_CONFIG);
    this.database = this.app
      .database()
      .ref()
      .child("cards");
    this.updateCard = this.updateCard.bind(this);

    this.state = {
      cards: [],
      currentCard: {}
    };
  }

  // called after constructor() and before render()
  componentWillMount() {
    const currentCards = this.state.cards;

    this.database.on("child_added", snap => {
      currentCards.push({
        id: snap.key,
        key_term: snap.val().key_term,
        definition: snap.val().definition
      });
      this.setState({
        cards: currentCards,
        currentCard: this.getRandomCard(currentCards)
      });
    });
  }

  getRandomCard(currentCards) {
    var card = currentCards[Math.floor(Math.random() * currentCards.length)];
    return card;
  }

  updateCard() {
    const currentCards = this.state.cards;
    this.setState({
      currentCard: this.getRandomCard(currentCards)
    });
  }

  render() {
    return (
      <div className="App">
        <div className="cardRow">
          <Card
            key_term={this.state.currentCard.key_term}
            definition={this.state.currentCard.definition}
          />
        </div>
        <div className="buttonRow">
          <DrawButton drawCard={this.updateCard} />
        </div>
      </div>
    );
  }
}

export default App;
