var fs = require('fs');

function run(day, part) {
	var input = fs.readFileSync('day' + day + '/input.txt', 'utf8');
	var solution = require('./day' + day + '/part' + part);
	
	console.log('day ' + day + ', part ' + part + ': ' + solution(input));
}

// run(1, 1);
// run(1, 2);
// run(2, 1);
// run(2, 2);
// run(3, 1);
// run(3, 2);
// run(4, 1);
// run(4, 2);
// run(5, 1);
// run(5, 2);
// run(6, 1);
// run(6, 2);
run(7, 1);
// run(7, 2);
// run(8, 1);
// run(8, 2);
// run(9, 1);
// run(9, 2);

process.exit();