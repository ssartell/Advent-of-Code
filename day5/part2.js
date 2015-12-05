var R = require('ramda');

var parseInput = R.split('\n');
var trace = R.tap(console.log);

var letters = R.split('', 'abcdefghijklmnopqrstuvwxyz');
var letterPairs = R.map(R.apply(R.concat), R.xprod(letters, letters));
var spacedLetterPairs = R.map(R.converge(R.concat, [R.identity, R.head]), letterPairs);

var boolToInt = function(bool) {
	return +bool;
};
var occurrences = R.curry(function(subStr, str) {
	return R.match(new RegExp('(' + subStr + ')', 'g'), str).length;
});

var numberOf = R.compose(R.converge(R.unapply(R.sum)), R.map(occurrences));
var anyTwice = R.compose(R.converge(R.unapply(R.any(R.gte(R.__, 2)))), R.map(occurrences));

var containsSpacedLetterPair = R.compose(R.gt(R.__, 0), numberOf(spacedLetterPairs));
var containsAnyPairTwice = anyTwice(letterPairs);

var isNiceWord = R.allPass([containsSpacedLetterPair, containsAnyPairTwice]);
var solution = R.compose(R.sum, R.map(R.compose(boolToInt, isNiceWord)), parseInput);

var solution = solution;

module.exports = solution;