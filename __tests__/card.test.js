const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');
const Words = require('../src/data/words');
const Card = require('../src/Card');

const colors = ['black', 'blue', 'red', 'neutral'];
const props = {
	word: Words[Math.floor(Math.random()*Words.length)],
	color: colors[Math.floor(Math.random()*colors.length)],
  revealed: false
}

describe("Card Component", function() {
  beforeEach(function() {
    this.component = TestUtils.renderIntoDocument(<Card word={props.word} color={props.color} revealed={props.revealed} />);
    this.renderedDOM = () => ReactDOM.findDOMNode(this.component);
  });

  it('can create a card with correct properties and state', function() {
  	expect(this.component.props).toEqual(props);
  	expect(this.component.state).toEqual({ revealed: false });
  })

  it('renders an unrevealed card', function() {
    let element = this.renderedDOM();
    expect(element.tagName).toBe('DIV');
    let classes = Object.keys(element.classList).map(function(k){ return element.classList[k] });
    expect(classes).toContain('card');
    expect(classes).toContain(props.color);
    expect(classes).not.toContain('revealed');
    // expect(classes).not.toContain('spymaster');
  });

  it('reveals the card when clicked', function() {
  	let element = this.renderedDOM();
  	expect(this.component.state).toEqual({ revealed: false });
  	TestUtils.Simulate.click(element);
  	expect(this.component.state).toEqual({ revealed: true });
  });

});