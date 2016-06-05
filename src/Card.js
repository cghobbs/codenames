var React = require('react');
var ReactDOM = require('react-dom');

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {revealed: false};
    this.revealCard = this.revealCard.bind(this);
  }
  revealCard() {
  	this.setState({revealed: !this.state.revealed });
    console.log("clicked");
  }
  render() {
    let classes = 'card '+this.props.card.color;
    classes += this.state.revealed ? ' revealed' : '';
    classes += this.props.spymaster ? ' spymaster' : '';
    return (
      <div className={classes} onClick={this.revealCard}>
      	{this.props.card.text}
      </div>
    );
  }
}

Card.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  card: React.PropTypes.object.isRequired,
};

module.exports = Card;
