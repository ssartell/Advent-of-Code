var R = require('ramda');

var replacementRegex = (line) => (/(\w*) => (\w*)/g).exec(line);
var parseInput = R.compose(R.split('\n'), R.trim);

var getReplacements = R.compose(R.map(R.compose(R.zipObj(['i', 'o']), R.tail, replacementRegex)), R.dropLast(2), parseInput);
var getMolecule = R.compose(R.head, R.takeLast(1), parseInput);

var newMolecule = (molecule, i, o, index) => {
    return molecule.substr(0, index) + i + molecule.substr(index + o.length);
};

var addRegex = (replacement) => {
    replacement.regex = new RegExp(replacement.o, 'g');
    return replacement;
};

var min = R.reduce(R.min, Infinity);

var solution = (input) => {
    var moleculeDiff = (a, b) => a.o.length - b.o.length; 
    var replacements = R.compose(R.map(addRegex), R.reverse, R.sort(moleculeDiff), getReplacements)(input);
    var molecule = getMolecule(input);
    
    var minSteps = (molecule) => {
        if (molecule === 'e') return 0;

        for(var i = 0; i < replacements.length; i++) {
            var replacement = replacements[i];
            var match;
            
            while ((match = replacement.regex.exec(molecule)) != null) {
                var asdf = newMolecule(molecule, replacement.i, replacement.o, match.index);
                var steps = minSteps(asdf);
                if (steps < Infinity) 
                    return steps + 1; 
            }
        }
        
        return Infinity;
    };
    
    return minSteps(molecule);
};

module.exports = solution;