var R = require('ramda');
var debug = (a,b,c,d) => { debugger; return a; }
var trace = R.tap(console.log);

// Parse game info
// -------------------------------------------------------------------------------------
var bossInfoRegex = (text) => (/\D*(\d*)\D*(\d*)\D*(\d)/g).exec(text);
var bossInfoEvolve = {
    hitPoints: parseInt,
    damage: parseInt,
    armor: parseInt,
};
var parseBoss = R.compose(R.evolve(bossInfoEvolve), R.zipObj(['hitPoints', 'damage', 'armor']), R.tail, bossInfoRegex);

var shopItemRegex = (text) => (/(\w*(?:\s\+\d)?)\s*(\d*)\s*(\d*)\s*(\d*)/g).exec(text);
var shopItemEvolve = {
    cost: parseInt,
    damage: parseInt,
    armor: parseInt,
};
var toShopItem = R.compose(
    R.evolve(shopItemEvolve), 
    R.zipObj(['name', 'cost', 'damage', 'armor']),
    R.tail, 
    shopItemRegex
);
var byItemCost = (a, b) => a.cost - b.cost;
var parseShopItem = R.compose(R.sort(byItemCost), R.map(toShopItem), R.tail, R.split('\n'));

var parseSections = R.useWith(
    R.unapply(R.zipObj(['boss', 'weapons', 'armor', 'rings'])), 
    [parseBoss, parseShopItem, parseShopItem, parseShopItem]
);
var parseInput = R.compose(R.apply(parseSections), R.split('\n\n'), R.trim);

// Game simulation
// -------------------------------------------------------------------------------------

var player = {
    hitPoints: 100,
    items: []
};

var sumItemStats = R.compose(R.sum, R.useWith(R.map, [R.prop, R.prop('items')]));

var fight = (player, boss) => {
    var hitPoints = [player.hitPoints, boss.hitPoints];
    var damage = [sumItemStats('damage', player), boss.damage];
    var armor = [sumItemStats('armor', player), boss.armor];
    
    var active = 0;
    while(hitPoints[0] > 0 && hitPoints[1] > 0) {
        var other = (active + 1) % 2;
        hitPoints[other] -= R.max(1, damage[active] - armor[other]);
        active = other;
    }
    
    return hitPoints[0] > 0;
};

var solution = (input) => {
    var gameInfo = parseInput(input);
    var lostCosts = [];
    
    for (var w = 0; w < gameInfo.weapons.length; w++) {
        for (var a = 0; a < gameInfo.armor.length; a++) {
            for (var r1 = 0; r1 < gameInfo.rings.length; r1++) {
                for (var r2 = r1 + 1; r2 < gameInfo.rings.length; r2++) {
                    player.items = [
                        gameInfo.weapons[w],
                        gameInfo.armor[a],
                        gameInfo.rings[r1],
                        gameInfo.rings[r2]
                    ];
                    
                    if (!fight(player, gameInfo.boss))
                        lostCosts.push(sumItemStats('cost', player));
                }
            }
        }
    }
    
    
    return R.reduce(R.max, -Infinity, lostCosts);
};

module.exports = solution;