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
      let ranks = ['Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'King', 'Queen'];
      for (let i = 0; i < suits.length; i++){
        for (let j = 0; j < ranks.length; j++){
          let card = new Card(suits[i], ranks[j], j+1);
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