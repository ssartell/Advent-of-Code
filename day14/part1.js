var R = require('ramda');
var trace = R.tap(console.log);
var time = 2503;

var fixLine = function(line) {
	line.speed = parseInt(line.speed);
	line.fly = parseInt(line.fly);
	line.rest = parseInt(line.rest);
	return line;
};

var regexLine = (line) => (/(.*) can fly (.*) km\/s for (.*) seconds, but then must rest for (.*) seconds./g).exec(line);
var readLine = R.compose(fixLine, R.zipObj(['name', 'speed', 'fly', 'rest']), R.tail, regexLine);
var parseInput = R.compose(R.map(readLine), R.split('\n'), R.trim);
var max = R.reduce(R.max, -Infinity);

var calcDistance = (reindeer) => {	
	var times = Math.floor(time / (reindeer.fly + reindeer.rest));
	var last = R.min(time - times * (reindeer.fly + reindeer.rest), reindeer.fly);
	var dist = (times * reindeer.fly + last) * reindeer.speed;
	
	return dist;
}

var solution = (input) => {
	var reindeers = parseInput(input);
	return max(R.map(calcDistance, reindeers));
};

module.exports = solution;