var R = require('ramda');

var parseInput = R.split('\n');
var trace = R.tap(console.log);

var letters = R.split('', 'abcdefghijklmnopqrstuvwxyz');
var doubleLetters = R.map(R.compose(R.apply(R.concat), R.flip(R.repeat)(2)), letters);
var vowels = ['a', 'e', 'i', 'o', 'u'];
var disallowed = ['ab', 'cd', 'pq', 'xy'];

var boolToInt = function(bool) {
	return +bool;
};
var occurrences = R.curry(function(subStr, str) {
	return R.match(new RegExp('(' + subStr + ')', 'g'), str).length;
});

var numberOf = R.compose(R.converge(R.unapply(R.sum)), R.map(occurrences));

var containsThreeVowels = R.compose(R.gte(R.__, 3), numberOf(vowels));
var notContainsDisallowed = R.compose(R.equals(0), numberOf(disallowed));
var containsAnyDoubleLetters = R.compose(R.gt(R.__, 0), numberOf(doubleLetters));

var isNiceWord = R.allPass([containsThreeVowels, notContainsDisallowed, containsAnyDoubleLetters]);
var solution = R.compose(R.sum, R.map(R.compose(boolToInt, isNiceWord)), parseInput);

module.exports = solution;