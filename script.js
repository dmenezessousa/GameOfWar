//classes 
class Card {
  constructor(suit,rank,score) {
    this.suit = suit
    this.rank = rank;
    this.score = score;
  }
}

class Deck{
  constructor() {
    this.length = 52;
    this.cards = [];
    this.createDecks();
  }

    createDecks(){
      let suits = ['hearts', 'spades', 'clubs', 'diamonds'];
      let ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'King', 'Queen','Ace'];
      for (let i = 0; i < suits.length; i++){
        for (let j = 0; j < ranks.length; j++){
          let card = new Card(suits[i], ranks[j], j+2);
          this.cards.push(card);
        }
      }
      this.shuffle();
      this.draw();
    }

    shuffle(){
      const cards = this.cards
      for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
      }
    }

    draw() {
      let random = Math.floor(Math.random() * this.cards.length);
      return this.cards[random];
    }
}

class GameOfWar{
  constructot() {
    this.p1 = []
    this.p2 = []
    this.pile = []
    this.gameSetup()
  }

  gameSetup() {
    let deck = new Deck();
    for (let i = 0; i < 26; i++){
      this.p1.push(deck.draw());
      this.p2.push(deck.draw());
    }
  }

  playGame() {
    let round = 0;
    while (this.p1.length > 0 && this.p2.length > 0) {
      round++;
      let p1Card = this.p1.pop();
      let p2Card = this.p2.pop();
  
      if (p1Card.score === p2Card.score) {
        this.pile.push(p1Card, p2Card)
        this.war()
      }else if(p1Card.score > p2Card.score) {
        console.log('Player 1 wins the round!');
        console.log(`${p1Card.rank} of ${p1Card.suit} beats ${p2Card.rank} of ${p2Card.suit}`)
        this.p1.unshift(p2Card, p1Card, ...this.pile.splice(0));
      } else {
        console.log('Player 2 wins the round!');
        console.log(`${p2Card.rank} of ${p2Card.suit} beats ${p1Card.rank} of ${p1Card.suit}`)
        this.p2.unshift(p2Card, p1Card, ...this.pile.splice(0));
      }
    }
    if (this.p1.length > 0) {
      console.log(`Player 1 wins the game in ${round} rounds! with ${this.p1.length} cards left`);
    } else {
      console.log(`Player 2 wins the game in ${round} rounds! with ${this.p2.length} cards left`);
    }
  }

  war() {
    console.log(`WAR!`)
    if (this.p1.length < 4 || this.p2.length < 4) {
      if(this.p1.length < 4) {
        this.p2.push(...this.p1.splice(0), ...this.pile.splice(0));
      } else {
        this.p1.push(...this.p2.splice(0), ...this.pile.splice(0));
      }
    } else {
      let p1WarCards = this.p1.splice(-3, 3);
      let p2WarCards = this.p2.splice(-3, 3);
      this.pile.push(...p1WarCards, ...p2WarCards);
    }
  }
}