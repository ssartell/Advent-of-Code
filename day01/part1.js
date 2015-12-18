var R = require('ramda');

var parseInput = R.compose(R.split(''), R.trim);
var charCount = R.curry(R.compose(R.length, R.useWith(R.filter, [R.equals, R.identity])));
var charDifference = R.converge(R.subtract, [charCount('('), charCount(')')]);

var solution = R.compose(charDifference, parseInput);

module.exports = solution;