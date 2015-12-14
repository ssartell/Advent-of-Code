var R = require('ramda');

var parseInput = R.split('');
var charCount = R.curry(function(char, list) {
	return R.compose(R.prop('length'), R.filter(R.equals(char)))(list);
});
var charDifference = R.converge(R.subtract, [charCount('('), charCount(')')]);

var solution = R.compose(charDifference, parseInput)

module.exports = solution;