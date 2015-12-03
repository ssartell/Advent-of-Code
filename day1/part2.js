var R = require('ramda');

var splitChars = R.split('');
var upOrDown = function(char) {
	if (char === '(') {
		return 1;
	} else if (char === ')') {
		return -1;
	} else {
		return 0;
	}
};

var i = 0;
function getIndex() {
	return i;
};

var floor = 1;
function notBasement(char) {
	floor += upOrDown(char);
	i++;
	return floor > 0;
};

var solution = R.compose(getIndex, R.takeWhile(notBasement), splitChars);

module.exports = solution;