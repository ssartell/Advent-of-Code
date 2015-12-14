var R = require('ramda');

var sumEverything = (something) => {
	var type = typeof something;
	if (type === 'number') {
		return something;
	} else if (type === 'string') {
		var value = parseFloat(something);
		return isNaN(value) ? 0 : value;
	} else if (Array.isArray(something)) {
		return R.sum(R.map(sumEverything, something));
	} else if (type === 'object') {
		return R.sum(R.map(sumEverything, R.values(something)));
	}
};

var solution = R.compose(sumEverything, JSON.parse);

module.exports = solution;