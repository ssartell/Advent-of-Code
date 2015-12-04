var R = require('ramda');
var md5 = require('md5');

var startsWithSixZeros = function(str) {
	return str.substr(0, 6) === '000000';
}

var solution = function(key) {
	var digit = 0;
	
	while (!startsWithSixZeros(md5(key + digit))) {
		digit++;
	}
	
	return digit;
};

module.exports = solution;