var React = require('react');
var ReactDOM = require('react-dom');
var Random = require('random-gen');
var App = require('./App')

ReactDOM.render(
  <App seed={Random.alphaNum(4)} />,
  document.getElementById('app')
);
