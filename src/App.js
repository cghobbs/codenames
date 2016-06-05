var React = require('react');
var ReactDOM = require('react-dom');
var Cards = require('./data/cards');
var Card = require('./Card');
var SeedRandom = require('seedrandom');

var dealtCards = [];
var whoStarts = "";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rng: SeedRandom(this.props.seed),
      spymaster: false
    };
    this.newGame = this.newGame.bind(this);
    this.toggleSpymaster = this.toggleSpymaster.bind(this);
  }

  getCards() {
    const teams = this.getTeams();
    let selected = []
    for (let i = 0; i < 25; i++) {
      selected.push({
        _id: i+1,
        text: Cards[Math.floor(Cards.length * this.state.rng())],
        color: teams[i]
      });
    }
    return selected;
  }

  getTeams() {
    const teams = ["black"];
    do { teams.push("neutral"); } while (teams.length < 8);
    do { teams.push("blue"); } while (teams.length < 16);
    do { teams.push("red"); } while (teams.length < 24);
    whoStarts = Math.floor(this.state.rng()*2) ? 'blue' : 'red';
    teams.push(whoStarts);

    let currentIndex = teams.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(this.state.rng() * currentIndex);
      currentIndex -= 1;
      // And swap it with the current element.
      temporaryValue = teams[currentIndex];
      teams[currentIndex] = teams[randomIndex];
      teams[randomIndex] = temporaryValue;
    }
    return teams;
  }

  newGame(e) {
    e.preventDefault();
    this.setState({rng: SeedRandom(this.refs.textInput.value.trim())});
  }

  renderCards(cards) {
    return cards.map((card) => (
      <Card key={card._id} card={card} spymaster={this.state.spymaster} />
    ));
  }

  toggleSpymaster(e) {
    this.setState({
      rng: SeedRandom(this.refs.textInput.value.trim()),
      spymaster: !this.state.spymaster
    });
    console.log(this.refs.textInput.value)
  }

  render() {
    let thedeal = this.getCards();
    return (
      <div>
        <div className="header">
          <form className="new-game" onSubmit={this.newGame.bind(this)} >
            <input type="text" ref="textInput" defaultValue={this.props.seed}/> &nbsp;
            <input type="submit" value="Start Game"/> &nbsp;
            <input type="button" value="Toggle Spymaster" onClick={this.toggleSpymaster.bind(this)}/> &nbsp;
            <span className={whoStarts}>The {whoStarts} team goes first.</span>
          </form>
        </div>
        <div className="board">
          {this.renderCards(thedeal)}
        </div>
      </div>
    );
  }
}

module.exports = App;
