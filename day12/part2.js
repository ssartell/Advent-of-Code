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
		var values = R.values(something);
		if (R.any(R.equals('red'), values)) return 0;
		return R.sum(R.map(sumEverything, values));
	}
};

var solution = R.compose(sumEverything, JSON.parse);

module.exports = solution;