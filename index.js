var fs = require('fs');

function run(day, part) {
	var input = fs.readFileSync('day' + day + '/input.txt', 'utf8');
	var solution = require('./day' + day + '/part' + part);
	
	console.log('day ' + day + ', part ' + part + ': ' + solution(input));
}

run(1, 1);
run(1, 2);
run(2, 1);
run(2, 2);