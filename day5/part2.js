var R = require('ramda');

var parseInput = R.split('\n');
var trace = R.tap(console.log);
var boolToInt = (bool) => +bool;

var containsSpacedLetterPair = R.test(/(.).\1/g);
var containsAnyPairTwice = R.test(/(..).*\1/g);

var isNiceWord = R.allPass([containsSpacedLetterPair, containsAnyPairTwice]);
var solution = R.compose(R.sum, R.map(R.compose(boolToInt, isNiceWord)), parseInput);

var solution = solution;

module.exports = solution;