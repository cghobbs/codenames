var React = require('react');
var ReactDOM = require('react-dom');

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {revealed: this.props.revealed};
    this.revealCard = this.revealCard.bind(this);
  }
  revealCard() {
  	this.setState({revealed: !this.state.revealed });
  }
  render() {
    let classes = 'card '+this.props.color;
    classes += this.state.revealed ? ' revealed' : '';
    classes += this.props.spymaster ? ' spymaster' : '';
    return (
      <div className={classes} onClick={this.revealCard}>
      	{this.props.word} <span>✔</span>
      </div>
    );
  }
}

module.exports = Card;
