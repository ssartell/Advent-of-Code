var R = require('ramda');

var parseInput = R.compose(R.map(parseInt), R.split('\n'), R.trim);

var without = R.useWith(R.reject, [R.equals, R.identity]);

var containerCombos = R.curry((eggnog, containers) => {
    var container;
    var perms = [];
    while (containers.length > 0) {
        container = R.head(containers);
        containers = R.tail(containers);
        
        if (eggnog === container) {
            perms.push([container]);
        } else if (eggnog > container) {
            var recurse = containerCombos(eggnog - container, containers);
            var asdf = R.map(R.unnest, R.xprod([container], recurse));
            
            perms = R.concat(perms, asdf);
        }
    }
    
    return perms;
});

var countMin = (list) => {
  var min = R.reduce(R.min, Infinity, list);
  return R.length(R.filter(R.equals(min), list));  
};

var solution = R.compose(countMin, R.map(R.length), containerCombos(150), parseInput);

module.exports = solution;