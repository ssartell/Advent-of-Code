var R = require('ramda');

var parseInput = (input) => R.split('\n', R.trim(input));
var encodedChars = /(\\\\)|(\\")|(\\x[0-9|a-f][0-9|a-f])|\\"/gi;
var fixString = (str) => R.tail(R.init(str)).replace(encodedChars, '*').length;
var difference = (input) => R.sum(R.map((str) => str.length, input)) - R.sum(R.map(fixString, input));
var solution = (input) => difference(parseInput(input));

module.exports = solution;