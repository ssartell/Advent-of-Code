var R = require('ramda');

var parseInput = R.compose(parseInt, R.trim);

var solution = (input) => {
    var presents = parseInput(input);
    
    var cap = 999999;
    var houses = R.times(R.always(0), cap);
    
    for(var i = 1; i < cap; i++) {
        var stop = 0;
        for(var j = i; j < cap; j += i) {
            houses[j] += i * 11;
            stop++;
            if (stop === 50) break;
        }
    }
    
    for(var i = 1; i < cap; i++) {        
        if (houses[i] > presents) return i;
    }
    
    return null;
};

module.exports = solution;