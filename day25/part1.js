var R = require('ramda');

var regex = (text) => (/To continue, please consult the code grid in the manual.  Enter the code at row (\d*), column (\d*)./g).exec(text);
var parseInput = R.compose(R.map(parseInt), R.tail, regex, R.trim);

var solution = (input) => {   
    var coords = parseInput(input);
    var i = 1;
    var last = 20151125;
    while(true) {
        for(var j = 0; j <= i; j++) {
            var x = j;
            var y = i - j;
            
            last = last * 252533 % 33554393;
            
            if (y + 1 === coords[0] && x + 1 === coords[1]) return last;
        }
        
        i++;
    }
    
};

module.exports = solution;