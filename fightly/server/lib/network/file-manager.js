/* ****************************************************************************
 *
 * Fightly - Web Game Engine
 * http://fightly.com
 *
 * License: see LICENSE.txt
 *
 *****************************************************************************/

var util = require('util')
    , http = require('http')
    ;

var url = require("url")
    , fs = require('fs')
    ;
/**
 * Create a file server
 *
 * @author Florent Lavy - flo.lavy@gmail.com
 * @constructor
 */
function FileManager(basePath) {
    this.server = http.createServer(function(req, res) {
        var pathname = url.parse(req.url).pathname;
        fs.readFile(basePath + pathname, "binary", function(error, file) {
            // Return ./modules/"pathname" file if this file exists
            // Example : "localhost:8080/core/actions.js" request return the "modules/core/actions.js" file
            var httpCode = 404,
                contentType = "text/plain",
                contentData = "This file doesn't exist !"
            ;

            if(!error) {
                httpCode = 200;
                contentType = "application/javascript";
                contentData = file;
            }

            res.writeHead(httpCode, {"Content-Type": contentType});
            res.write(contentData, "binary");
            res.end();
        });
    });
}

FileManager.prototype = {
    /**
     * Server listens on a port
     * @param port Port Number
     * @return this
     */
    listen : function(port) {
        this.server.listen(port);
        util.log('File server created. Listening on port ' + port);
        return this;
    },
}

exports.FileManager = FileManager;
