var R = require('ramda');

var createMagicMissile = function(player, boss) {
    return {
        cast: () => boss.hitPoints -= 4
    };
};
createMagicMissile.mana = 53;

var createDrain = function(player, boss) {
    return {
        cast: () => {
            boss.hitPoints -= 2;
            player.hitPoints += 2;
        }
    };
};
createDrain.mana = 73;

var createShield = function(player, boss) {
    var timer = 6;
    return {
        cast: function() {
            player.activeSpells.push(this);
        },
        apply: function() {
            if (timer === 6) player.armor += 7;
            timer--;
            if (timer === 0) {
                player.armor -= 7
                R.reject(R.equals(this), player.activeSpells);
            }
        }
    };
};
createShield.mana = 113;

var createPoison = function(player, boss) {
    var timer = 6;
    return {
        cast: function() { player.activeSpells.push(this); },
        apply: function() {
            if (timer === 6) boss.hitPoints -= 3;
            timer--;
            if (timer === 0) R.reject(R.equals(this), player.activeSpells);
        }
    };
};
createPoison.mana = 173;

var createRecharge = function(player, boss) {
    var timer = 5;
    return {
        cast: function() { player.activeSpells.push(this); },
        apply: function() {
            if (timer === 6) player.mana += 101;
            timer--;
            if (timer === 0) R.reject(R.equals(this), player.activeSpells);
        }
    };
};
createRecharge.mana = 229;

var playerWinsFight = (spellCombo) => {
    var player = {
        hitPoints: 50,
        mana: 500,
        activeSpells: []  
    };
    var boss = {
        hitPoints: 58,
        damage: 9
    };
    
    var spellIndex = 0;
    var isPlayersTurn = true;
    while(true) {
        R.forEach((spell) => {
            spell.apply();
        }, player.activeSpells);
        if (isPlayersTurn) {
            if (spellCombo[spellIndex]) {
                var spellFactory = spellCombo[spellIndex];
                spellFactory(player, boss).cast();
                spellIndex++;
            }
        } else {
            player.hitPoints -= boss.damage;
        }
        
        if (player.hitPoints <= 0) 
            return false;
        if (boss.hitPoints <= 0) 
            return true;
        
        isPlayersTurn = !isPlayersTurn;
    }
};

var nChooseK = (set, k) => {
    if (k === 0) return [[]];
    return R.chain(x => R.map(R.unnest, R.xprod([x], nChooseK(set, k - 1))), set);
}

var sumMana = R.compose(R.sum, R.prop('mana'));

var solution = (input) => {
    var spells = [createMagicMissile, createDrain, createShield, createPoison, createRecharge];
    var winCosts = [];
    
    for(var i = 1; i < 7; i++) {
        console.log(i);
        var spellCombos = nChooseK(spells, i);
        
        for(var j = 0; j < spellCombos.length; j++) {
            if (playerWinsFight(spellCombos[j])) winCosts.push(sumMana(spellCombos[j]));
        }
    }
    
    console.log(winCosts.length);
    return R.reduce(R.min, Infinity, winCosts);
};

module.exports = solution;