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

    var onMessage = function (message) {
        console.log('onMessage: ' + message);

        message = JSON.parse(message);
        if (message.hasOwnProperty('modules')) {
            console.log(message.modules);
            // Load each file
            // Then call loadActions and loadComponents for each module
        }
    };

    F.prototype.init = function () {
        var self = this;

        // create network connexion
        this.server = new network.ComManager(this.config.network);
        this.server.init(function () {
            self.loadModulesList();
        }, onMessage);

        // create component entity manager
        this.cem = new cem.ComponentEntityManager();

        // create action manager
        this.am = new am.ActionManager();
    };

    F.prototype.loadModulesList = function () {
        // Get modules and files list from server
        this.server.data('modules');
    };

    F.prototype.loadActions = function (module, module_name) {
        // load the actions of a given module
    };

    F.prototype.loadComponents = function (module, module_name) {
        // load the components of a given module
    };

    return F;
});
