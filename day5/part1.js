var R = require('ramda');
var letters = R.split('', 'abcdefghijklmnopqrstuvwxyz');
var doubleLetters = R.map(R.compose(R.apply(R.concat), R.flip(R.repeat)(2)), letters);
var vowels = ['a', 'e', 'i', 'o', 'u'];
var disallowed = ['ab', 'cd', 'pq', 'xy'];

var parseInput = R.split('\n');
var trace = R.tap(console.log);

var boolToInt = function(bool) {
	return +bool;
};
var contains = R.curry(function(subStr, str) {
	return str.indexOf(subStr) > -1;
});

var numberOf = R.compose(R.converge(R.unapply(R.sum)), R.map(R.curry(R.compose(boolToInt, contains))));

var containsThreeVowels = R.compose(R.gte(R.__, 3), trace, numberOf(vowels));
var notContainsDisallowed = R.compose(R.equals(0), trace, numberOf(disallowed));
var containsAnyDoubleLetters = R.compose(R.gt(R.__, 0), trace, numberOf(doubleLetters));

var isNiceWord = R.allPass([containsThreeVowels, notContainsDisallowed, containsAnyDoubleLetters]);
var solution = R.compose(R.sum, R.map(boolToInt), R.map(isNiceWord), parseInput);
solution = R.always('okay');
// console.log(containsThreeVowels('asdfe0'));
// console.log(notContainsDisallowed('asdf'));
// console.log(containsAnyDoubleLetters('aasdf'));
console.log(isNiceWord('aaa'));

module.exports = solution;