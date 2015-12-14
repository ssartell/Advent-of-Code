var R = require('ramda');

var trace = R.tap(console.log);
var parseInput = (input) => R.split('\n', R.trim(input));
var specialChars = /\"|\\/gi;
var unencodedCharCount = (input) => R.sum(R.map((str) => str.length, input));
var encodedCharCount = (input) => R.sum(R.map((str) => str.replace(specialChars, '**').length + 2, input));
var difference = (input) => encodedCharCount(input) - unencodedCharCount(input);
var solution = (input) => difference(parseInput(input));

module.exports = solution;