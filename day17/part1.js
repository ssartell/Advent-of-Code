var R = require('ramda');

var parseInput = R.compose(R.map(parseInt), R.split('\n'), R.trim);

var without = R.useWith(R.reject, [R.equals, R.identity]);

var containerCombos = R.curry((eggnog, containers) => {
    if (eggnog === 0) 
        return 1;
    
    var sum = 0;
    var container;
    while (containers.length > 0) {
        container = R.head(containers);
        containers = R.tail(containers);
        
        if (eggnog >= container) {
            sum += containerCombos(eggnog - container, containers)
        }
    }
    
    return sum;
});

var solution = R.compose(containerCombos(150), parseInput);

module.exports = solution;