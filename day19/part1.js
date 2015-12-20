var R = require('ramda');

var replacementRegex = (line) => (/(\w*) => (\w*)/g).exec(line);
var parseInput = R.compose(R.split('\n'), R.trim);

var getReplacements = R.compose(R.map(R.compose(R.zipObj(['i', 'o']), R.tail, replacementRegex)), R.dropLast(2), parseInput);
var getMolecule = R.compose(R.head, R.takeLast(1), parseInput);

var newMolecule = (molecule, i, o, index) => {
    return molecule.substr(0, index) + o + molecule.substr(index + i.length);
};

var solution = (input) => {
    var replacements = getReplacements(input);
    var molecule = getMolecule(input);
    
    var moleculeSets = R.map((replacement) => {
        var regexp = new RegExp(replacement.i, 'g');
        var match;
        var molecules = [];
        while ((match = regexp.exec(molecule)) != null) {
            molecules.push(newMolecule(molecule, replacement.i, replacement.o, match.index));
        }
        
        return molecules
    }, replacements);
    
    return R.compose(R.length, R.uniq, R.unnest)(moleculeSets);
};

module.exports = solution;