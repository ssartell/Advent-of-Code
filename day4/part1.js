var R = require('ramda');
var md5 = require('md5');

var startsWithFiveZeros = function(str) {
	return str.substr(0, 5) === '00000';
}

var solution = function(key) {
	var digit = 0;
	
	while (!startsWithFiveZeros(md5(key + digit))) {
		digit++;
	}
	
	return digit;
};

module.exports = solution;