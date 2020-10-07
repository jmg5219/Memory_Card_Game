import { render } from '@testing-library/react';
// import React from 'react';
import React, { Component } from "react";
import './App.css';
import './components/MemoryCard.jsx'
import MemoryCard from './components/MemoryCard.jsx';


function generateDeck() {
  const symbols = [`∆`, ` ß`, `£`, `§`, `•`, `$`, `+`, `ø`];
  let deck = [];

  for (let i = 0; i < 16; i++) {
    let card = { isFlipped: false, symbol: symbols[i % 8] }
    deck.push(card)
  }
  deck = shuffle(deck)
  return deck
}


function shuffle(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}



class App extends React.Component {


  constructor() {
    super();
    this.state = {
      deck: generateDeck(),
      pickedCards: Array().fill(null)
    };
  }
  
  
  pickCard (cardIndex) {
    if(this.state.deck[cardIndex].isFlipped==true){
      return;
    }
      let cardToFlip = {...this.state.deck[cardIndex]};
      cardToFlip.isFlipped = true;
      let newPickedCards = this.state.pickedCards.concat(cardIndex);
      let newDeck = this.state.deck.map((card, index) => {
        if (cardIndex == index){
          return cardToFlip;
        }
        return card;
      });
      
      if(newPickedCards.length == 2){
        
        const card1Index = newPickedCards[0];
        const card2Index = newPickedCards[1];
        
        if(newDeck[card1Index].symbol !== newDeck[card2Index].symbol){
         
          setTimeout(this.unflipCards.bind(this,card1Index, card2Index),1000)
         
      

        }
        newPickedCards = [];
      }
      
      this.setState({deck:newDeck, pickedCards:newPickedCards});
      
      
      
    
  }

  unflipCards(card1Index,card2Index){
    
    const card1 = {...this.state.deck[card1Index]};
    const card2 = {...this.state.deck[card2Index]};
    card1.isFlipped = false;
    card2.isFlipped = false;

    console.log(card1.isFlipped,card2.isFlipped)
    let newDeck = this.state.deck.map((card, index) => {
      
      if (card1Index == index){
        
        return card1;
        
      }else if(card2Index == index){
        return card2;
      }else{
        return card;
      }
    });
    
    this.setState({deck:newDeck});
  }

render(){
  let cardsJSX = this.state.deck.map((card, index) => {
    return < MemoryCard symbol={card.symbol} isFlipped={card.isFlipped} key={index} pickCard={this.pickCard.bind(this, index)} />
  });
  return (
    <div className="App">
      <header className="App-header">
        <h1>
          Memory Game
        </h1>
        <h6 className="App-subtitle">Match Cards To Win</h6>

      </header>
      <div>{cardsJSX.slice(0, 4)}</div>
      <div>{cardsJSX.slice(4, 8)}</div>
      <div>{cardsJSX.slice(8, 12)}</div>
      <div>{cardsJSX.slice(12, 16)}</div>


    </div>
  );
}
 
}

export default App;