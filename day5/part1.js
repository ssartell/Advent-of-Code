var R = require('ramda');

var parseInput = R.split('\n');
var trace = R.tap(console.log);
var boolToInt = (bool) => +bool;

var containsThreeVowels = R.test(/[aeiou].*[aeiou].*[aeiou]/g);
var notContainsDisallowed = R.compose(R.not, R.test(/ab|cd|pq|xy/g));
var containsAnyDoubleLetters = R.test(/(.)\1+/g);

var isNiceWord = R.allPass([containsThreeVowels, notContainsDisallowed, containsAnyDoubleLetters]);
var solution = R.compose(R.sum, R.map(R.compose(boolToInt, isNiceWord)), parseInput);

module.exports = solution;