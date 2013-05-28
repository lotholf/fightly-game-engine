/***********************************************************************
 *
 * Fightly - Web Game Engine
 * http://fightly.com
 *
 * License: see LICENSE.txt
 *
 **********************************************************************/

define(['src/network', 'vendor/component-entity/component-entity-manager', 'vendor/action-manager/action-manager'], function (
        network, cem, am
) {
    "use strict";

    function is_null(variable) {
        return variable === null || typeof variable === 'undefined';
    }

    var F = function (config) {
        this.config = config;
    };

    // This method is called in ComManager context
    var onMessage = function (message) {
        message = JSON.parse(message);
        if (message.hasOwnProperty('modules')) {
            // Load each file
            // Then call loadActions and loadComponents for each module
            for (var moduleName in message.modules) {
                for (var i in message.modules[moduleName]) {
                    if (message.modules[moduleName][i] === "actions.js") {
                        this.engine.loadActions(message.modules[moduleName][i], moduleName);
                    } else {
                        this.engine.loadComponents(message.modules[moduleName][i], moduleName);
                    }
                }
            }
        }
    };

    F.prototype.init = function () {
        var self = this;

        // create network connexion
        this.server = new network.ComManager(this.config.network, self);

        // create component entity manager
        this.cem = new cem.ComponentEntityManager();

        // create action manager
        this.am = new am.ActionManager();

        this.server.init(function () {
            self.loadModulesList();
        }, onMessage);
    };

    F.prototype.loadModulesList = function () {
        // Get modules and files list from server
        this.server.data('modules');
    };

    F.prototype.loadActions = function (module, moduleName) {
        // load the actions of a given module
        require(["http://" + this.config.fileServer.host + ":" + this.config.fileServer.port + "/" + moduleName + "/" + module], function (actions) {
            this.am.addActions(moduleName, actions.actions)
        }.bind(this));
    };

    F.prototype.loadComponents = function (module, moduleName) {
        // load the components of a given module
        require(["http://" + this.config.fileServer.host + ":" + this.config.fileServer.port + "/" + moduleName + "/" + module], function (components) {
            for (var c in components) {
                this.cem.addComponent(c, components[c]);
            }
        }.bind(this));
    };

    return F;
});
