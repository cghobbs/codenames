const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');

const Board = require('../src/Board');

const colors = ['black', 'blue', 'red', 'neutral'];
const props = {
  spymaster: false,
	seed: "test",
  starts: "red"
}

describe("Board Component", function() {
  beforeEach(function() {
    const {spymaster, seed, starts} = props;
    this.component = TestUtils.renderIntoDocument(<Board spymaster={spymaster} seed={seed} starts={starts} />);
    this.renderedDOM = () => ReactDOM.findDOMNode(this.component);
  });

  it('can create a board with a seed', function() {
    expect(this.component.props).toEqual(props);
  });

  it('renders a board with cards', function() {
    let element = this.renderedDOM();
    expect(element.querySelectorAll(".card").length).toBe(25);
    expect(element.querySelectorAll(".black").length).toBe(1);
    expect(element.querySelectorAll(".neutral").length).toBe(7);
    expect(element.querySelectorAll(".blue").length).toBeGreaterThanOrEqual(8);
    expect(element.querySelectorAll(".red").length).toBeGreaterThanOrEqual(8);
  });

});