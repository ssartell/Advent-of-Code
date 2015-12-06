var R = require('ramda');

var parseInput = R.split('\n');
var trace = R.tap(console.log);

var letters = R.split('', 'abcdefghijklmnopqrstuvwxyz');
var letterPairs = R.map(R.apply(R.concat), R.xprod(letters, letters));
var spacedLetterPairs = R.map(R.converge(R.concat, [R.identity, R.head]), letterPairs);

var boolToInt = (bool) => +bool;
var toRegExp = R.compose(R.curry(RegExp)(R.__, 'g'), R.concat(R.__, ')'), R.concat('('));
var matches = R.curry(R.binary(R.converge(R.match, [toRegExp, R.nthArg(1)])));
var occurrences = R.curry(R.compose(R.prop('length'), matches));

var numberOf = R.compose(R.converge(R.unapply(R.sum)), R.map(occurrences));
var anyTwice = R.compose(R.converge(R.unapply(R.any(R.gte(R.__, 2)))), R.map(occurrences));

var containsSpacedLetterPair = R.compose(R.gt(R.__, 0), numberOf(spacedLetterPairs));
var containsAnyPairTwice = anyTwice(letterPairs);

var isNiceWord = R.allPass([containsSpacedLetterPair, containsAnyPairTwice]);
var solution = R.compose(R.sum, R.map(R.compose(boolToInt, isNiceWord)), parseInput);

var solution = solution;

module.exports = solution;