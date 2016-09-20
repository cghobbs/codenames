const React = require('react');
const ReactDOM = require('react-dom');
const SeededShuffle = require('seededshuffle');

const Words = require('./data/words');
const Card = require('./Card');

class Board extends React.Component {
  
  constructor(props) {
    super(props);
  }

  renderCards(spymaster, seed, starts) {

    // Create and shuffle a deck of colors
    let colors = ['black'].concat(
      Array.apply(null, Array(8)).map(String.prototype.valueOf,'red'),
      Array.apply(null, Array(8)).map(String.prototype.valueOf,'blue'),
      Array.apply(null, Array(7)).map(String.prototype.valueOf,'neutral')
    );
    colors.push(starts);
    SeededShuffle.shuffle(colors, seed);

    // Create and shuffle a deck of words
    var shuffled = SeededShuffle.shuffle(Words, seed, true).splice(0,25);
    shuffled = SeededShuffle.shuffle(shuffled, seed+'1', true);

    // Deal the first 25 cards
    return shuffled.map(function(word, index){
      return <Card key={seed+'-'+word} word={word} color={colors[index]} spymaster={spymaster} revealed={false} />
    });
  }
  
  render() {
    const { spymaster, seed, starts } = this.props;
    return (<div className="board">{this.renderCards(spymaster, seed, starts)}</div>);
  }

}

module.exports = Board;
