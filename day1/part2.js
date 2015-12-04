var R = require('ramda');

var parseInput = R.split('');
var upOrDown = function(char) {
	if (char === '(') {
		return 1;
	} else if (char === ')') {
		return -1;
	} else {
		return 0;
	}
};
var updateFloor = function(accu, char) {
	var floor = R.last(accu) + upOrDown(char);
	return R.pair(R.append(floor, accu), floor);
}
var completeHistory = R.compose(R.last, R.mapAccum(updateFloor, [0]));
var firstBasementIndex = R.compose(R.add(1), R.prop("length"), R.takeWhile(R.lte(0)), completeHistory);

var solution = R.compose(firstBasementIndex, parseInput);

module.exports = solution;