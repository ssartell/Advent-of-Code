var R = require('ramda');

var createMagicMissile = function createMagicMissile(player, boss) {
    return {
        mana: 53,
        canCast: function() {
            return player.mana >= this.mana;  
        },
        cast: function() {
            player.mana -= this.mana;
            boss.hitPoints -= 4;
        }
    };
};

var createDrain = function createDrain(player, boss) {
    return {
        mana: 73,
        canCast: function() {
            return player.mana >= this.mana;  
        },
        cast: function() {
            player.mana -= this.mana;
            boss.hitPoints -= 2;
            player.hitPoints += 2;
        }
    };
};

var shieldTimer = 0;
var createShield = function createShield(player, boss) {
    return {
        mana: 113,
        canCast: function() {
            return shieldTimer === 0 && player.mana >= this.mana;  
        },
        cast: function() {
            shieldTimer = 6;
            player.mana -= this.mana;
            player.activeSpells.push(this);
        },
        apply: function() {
            if (shieldTimer === 6) player.armor += 7;
            shieldTimer--;
            if (shieldTimer === 0) {
                player.armor -= 7
                player.activeSpells = R.reject(R.equals(this), player.activeSpells);
            }
        }
    };
};

var poisonTimer = 0;
var createPoison = function createPoison(player, boss) {
    return {
        mana: 173,
        canCast: function() {
            return poisonTimer === 0 && player.mana >= this.mana;  
        },
        cast: function() {
            poisonTimer = 6;
            player.mana -= this.mana;
            player.activeSpells.push(this); 
        },
        apply: function() {
            boss.hitPoints -= 3;
            poisonTimer--;
            if (poisonTimer === 0) 
                player.activeSpells = R.reject(R.equals(this), player.activeSpells);
        }
    };
};

var rechargeTimer = 0;
var createRecharge = function createRecharge(player, boss) {
    return {
        mana: 229,
        canCast: function() {
            return rechargeTimer === 0 && player.mana >= this.mana;  
        },
        cast: function() {
            rechargeTimer = 5;
            player.mana -= this.mana;
            player.activeSpells.push(this);
        },
        apply: function() {
            player.mana += 101;
            rechargeTimer--;
            if (rechargeTimer === 0) 
                player.activeSpells = R.reject(R.equals(this), player.activeSpells);
        }
    };
};

var resetTimers = () => {
    shieldTimer = 0;
    poisonTimer = 0;
    rechargeTimer = 0;
};

var fight = (spellCombo) => {
    resetTimers();
    var player = {
        hitPoints: 50,
        armor: 0,
        mana: 500,
        activeSpells: []  
    };
    var boss = {
        hitPoints: 58,
        damage: 9
    };
    
    var spentMana = 0;
    var spellIndex = 0;
    var isPlayersTurn = true;
    while(true) {
        R.forEach((spell) => spell.apply(), player.activeSpells);
        if (isPlayersTurn) {
            if (spellCombo[spellIndex]) {
                var spellFactory = spellCombo[spellIndex];
                var spell = spellFactory(player, boss);
                
                if (!spell.canCast())
                    return Infinity;
                    
                spell.cast();
                spentMana += spell.mana;
                spellIndex++;
            }
        } else {
            player.hitPoints -= R.max(1, boss.damage - player.armor);
        }
        
        if (player.hitPoints <= 0) 
            return Infinity;
        if (boss.hitPoints <= 0) {
            console.log(R.map(R.prop('name'), spellCombo));
            return spentMana;   
        }
        
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
            winCosts.push(fight(spellCombos[j]));
        }
    }
    
    return R.reduce(R.min, Infinity, winCosts);
};

module.exports = solution;