const React = require('react');
const ReactDOM = require('react-dom');
const Random = require('random-gen');
const TestUtils = require('react-addons-test-utils');

const App = require('../src/App');

const colors = ['black', 'blue', 'red', 'neutral'];
const seed = 'test1';

describe("Board Component", function() {

  beforeEach(function() {
    this.component = TestUtils.renderIntoDocument(<App seed={seed} />);
    this.renderedDOM = () => ReactDOM.findDOMNode(this.component);
  });

  it('has the correct properties', function() {
    expect(this.component.props.seed).toEqual(seed);
  });

  it('can toggle spymaster mode', function() {
    let element = this.renderedDOM();
    let button = element.querySelectorAll(".toggle-spymaster")[0];
    
    // Initially the spymaster mode is off
    expect(this.component.state.spymaster).toBe(false);
    expect(element.querySelectorAll(".card.spymaster").length).toBe(0);
    
    // Clicking the button turns it on
    TestUtils.Simulate.click(button);
    expect(this.component.state.spymaster).toBe(true);
    expect(element.querySelectorAll(".card.spymaster").length).toBe(25);
    
    // Clicking it again turns it off
    TestUtils.Simulate.click(button);
    expect(this.component.state.spymaster).toBe(false);
    expect(element.querySelectorAll(".card.spymaster").length).toBe(0);

  });

  it('can start new game with seed', function() {
    let element = this.renderedDOM();
    let form = element.querySelectorAll("form")[0];
    let before_words = [], after_words = [], before_colors = [], after_colors = [];
    let before_flipped = 0, after_flipped = 0;

    // Simulate flipping a few cards
    TestUtils.Simulate.click(element.querySelectorAll(".card")[3]);
    TestUtils.Simulate.click(element.querySelectorAll(".card")[13]);
    TestUtils.Simulate.click(element.querySelectorAll(".card")[23]);

    // Create arrays of words and colors before the new game
    Array.prototype.slice.call(element.querySelectorAll(".card")).map(function(card){
      before_words.push(card.textContent);
      before_colors.push(card.classList["1"]);
      before_flipped += card.classList["2"] ? 1 : 0;
    });

    // Simulate starting a new game with a different seed
    this.component.refs.textInput.value = 'test2';
    TestUtils.Simulate.submit(form);

    // Create arrays of words and colors after the new game
    Array.prototype.slice.call(element.querySelectorAll(".card")).map(function(card){
      after_words.push(card.textContent);
      after_colors.push(card.classList["1"]);
      after_flipped += card.classList["2"] ? 1 : 0;
    });

    // Test that they are not the same
    expect(before_words).not.toEqual(after_words);
    expect(before_colors).not.toEqual(after_colors);

    // Test that the cards have been flipped back over
    expect(before_flipped).toBe(3);
    expect(after_flipped).toBe(0);

  });

});