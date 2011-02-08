// unitFactory class:

var unit_ = require("./unit.js");
//var cell_ = require("./cell.js");

exports.UnitFactory = function() {

}

exports.UnitFactory.prototype = {

    create: function(id,name,owner,type,attack,defense,view,move,properties) {

        var myUnit = new unit_.Unit();
        myUnit.name = name;
        myUnit.owner = owner;
        myUnit.type = type;
        myUnit.attack = attack;
        myUnit.defense = defense;
        myUnit.view = view;
        myUnit.move = move;
        myUnit.properties = properties;
        return myUnit;
    },

}