const React = require('react');
const ReactDOM = require('react-dom');
const SeedRandom = require('seedrandom');

const Board = require('./Board');
const teams = ['blue', 'red'];

class App extends React.Component {

  constructor(props) {
    super(props);

    let rng = SeedRandom(this.props.seed);

    this.state = { 
      spymaster: false,
      seed: this.props.seed,
      starts: teams[Math.floor(2 * rng())] 
    };

    this.toggleSpymaster = this.toggleSpymaster.bind(this);
    this.startNewGame = this.startNewGame.bind(this);
  }

  toggleSpymaster(event) {
    this.setState({ spymaster: !this.state.spymaster });
  }

  startNewGame(event) {
    event.preventDefault();
    let rng = SeedRandom(this.refs.textInput.value);
    this.setState({ 
      seed: this.refs.textInput.value,
      starts: teams[Math.floor(2 * rng())]  
    });
  }

  render() {
    const { spymaster, seed, starts } = this.state;

    return (
      <div>
        <div className="header">
          <form className="new-game" onSubmit={this.startNewGame}>
            <input type="text" ref="textInput" defaultValue={seed} />
            <input type="submit" value="Start Game"/>
          </form>
          <input type="button" className="toggle-spymaster" value="Toggle Spymaster" onClick={this.toggleSpymaster}/>
          <span className={starts}>The {starts} team goes first.</span>
        </div>
        <Board spymaster={spymaster} seed={seed} starts={starts} />
      </div>
    );
  }

}

module.exports = App;
