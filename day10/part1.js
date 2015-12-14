var R = require('ramda');
var trace = R.tap(console.log);
var toString = R.invoker(0, 'toString');

var repeatInts = /(\d)\1*/g;
var findRepeats = (input) => repeatInts.exec(input);
var getRepeats = (input) => {
	var repeats;
	var result = [];
	while(repeats = findRepeats(input)) {
		result.push(repeats[0]);
	}
	
	return result;
};

var lookAndSay = R.compose(R.join(''), R.map(R.converge(R.concat, [R.compose(toString, R.length), R.compose(toString, R.head)])), getRepeats)

var solution = (input) => {
	for(var i = 0; i < 40; i++) {
		input = lookAndSay(input);
	}
	
	return input.length;
};

module.exports = solution;