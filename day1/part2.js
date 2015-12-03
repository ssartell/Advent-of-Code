var R = require('ramda');

var parseInput = R.split('');
var i = 0;
var floor = 1;

function getIndex() {
	return i;
};
var upOrDown = function(char) {
	if (char === '(') {
		return 1;
	} else if (char === ')') {
		return -1;
	} else {
		return 0;
	}
};
function notBasement(char) {
	floor += upOrDown(char);
	i++;
	return floor > 0;
};
var firstBasementIndex = R.compose(getIndex, R.takeWhile(notBasement));

var solution = R.compose(firstBasementIndex, parseInput);

module.exports = solution;