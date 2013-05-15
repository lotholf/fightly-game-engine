/***********************************************************************
 *
 * Fightly - Web Game Engine
 * http://fightly.com
 *
 **********************************************************************/

var config = require('config');

var network = require('./lib/network/com-manager'),
    fileServer = require('./lib/network/file-manager'),
    GameEngine = require('./lib/game-engine');

var engine = new GameEngine(config),
    server = new network.ComManager(engine),
    fileServer = new fileServer.FileManager(config.modules.directory);

engine.init();
server.listen(config.server.port);
fileServer.listen(config.server.filePort);
