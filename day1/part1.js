var R = require('ramda');

var splitChars = R.split('');
var charCount = R.curry(function(char, list) {
	return R.compose(R.prop('length'), R.filter(R.equals(char)), splitChars)(list);
});
var solution = R.converge(R.subtract, [charCount('('), charCount(')')]);

module.exports = solution;