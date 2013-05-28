/* ****************************************************************************
 *
 * Fightly - Web Game Engine
 * http://fightly.com
 *
 * License: see LICENSE.txt
 *
 * ***************************************************************************/

// for compatibility with node.js and require.js
if (typeof define !== 'function') {
    var define = require('amdefine')(module)
}

define(function () {
    var Position = {

        "x": 0,
        "y": 0,
        "z": 0,

        "isAtOrigin": function() {
            return this.x === 0 && this.y === 0 && this.z === 0;
        }
    };

    return {
        'Position': Position
    };
});
