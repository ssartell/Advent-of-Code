var R = require('ramda');
var trace = R.tap(console.log);

var fixReindeer = function(reindeer) {
	reindeer.speed = parseInt(reindeer.speed);
	reindeer.fly = parseInt(reindeer.fly);
	reindeer.rest = parseInt(reindeer.rest);
	reindeer.score = 0;
	return reindeer;
};

var regexLine = (line) => (/(.*) can fly (.*) km\/s for (.*) seconds, but then must rest for (.*) seconds./g).exec(line);
var readLine = R.compose(fixReindeer, R.zipObj(['name', 'speed', 'fly', 'rest']), R.tail, regexLine);
var parseInput = R.compose(R.map(readLine), R.split('\n'), R.trim);
var max = R.reduce(R.max, -Infinity);

var calcDistance = R.curry((time, reindeer) => {	
	var times = Math.floor(time / (reindeer.fly + reindeer.rest));
	var last = R.min(time - times * (reindeer.fly + reindeer.rest), reindeer.fly);
	var dist = (times * reindeer.fly + last) * reindeer.speed;
	
	return dist;
});

var solution = (input) => {
	var reindeer = parseInput(input);
	
	for(var i = 1; i <= 2503; i++) {
		var distances = R.map(calcDistance(i), reindeer);
		var farthest = max(distances);
		
		for(var j = 0; j < reindeer.length; j++) {
			if (distances[j] === farthest) {
				reindeer[j].score++;
			}
		}
	}
	
	return max(R.map(R.prop('score'), reindeer));
};

module.exports = solution;