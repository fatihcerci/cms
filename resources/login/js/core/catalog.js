var pDbCatalogFactory = {};
pDbCatalogFactory.newDbCatalog = function () {

    function guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }

        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }

    var pDbCatalog = {};
    pDbCatalog.catalogs = [];
    pDbCatalog.lastMessage = "";

    /*================================================================
     * DB SETTINGS
     =================================================================*/

    function DbCatalog(name, server, database, username, password) {
        this.uuid = guid();
        this.name = name;
        this.server = server;
        this.database = database;
        this.username = username;
        this.password = password;
    }

    pDbCatalog.addDbCatalog = function (params) {
        if (params) {
            if (params.hasOwnProperty("name") &&
                params.hasOwnProperty("server") &&
                params.hasOwnProperty("database") &&
                params.hasOwnProperty("username") &&
                params.hasOwnProperty("password")) {
                var dbCatalog = new DbCatalog(params.name, params.server,
                    params.database, params.username, params.password);
                pDbCatalog.catalogs.push(dbCatalog);
                return dbCatalog;
            }
        }
    };

    pDbCatalog.getDbCatalog = function (uuid) {
        var catalogs = pDbCatalog.catalogs;
        for (var i = 0; i < catalogs.length; i++) {
            if (catalogs[i].uuid === uuid) {
                return catalogs[i];
            }
        }
    };

    pDbCatalog.getDbCatalogIndex = function (uuid) {
        var catalogs = pDbCatalog.catalogs;
        for (var i = 0; i < catalogs.length; i++) {
            if (catalogs[i].uuid === uuid) {
                return i;
            }
        }
    };

    pDbCatalog.listDbCatalog = function () {
        return pDbCatalog.catalogs;
    };

    pDbCatalog.deleteCatalog = function (uuid) {
        var catalogIndex = pDbCatalog.getDbCatalogIndex(uuid);
        pDbCatalog.catalogs.splice(catalogIndex, 1);
    };

    pDbCatalog.updateCatalog = function (params) {
        if (params) {
            if (params.hasOwnProperty("uuid")) {
                var catalog = pDbCatalog.getDbCatalog(params.uuid);
                if (catalog) {
                    if (params.hasOwnProperty('name')) {
                        catalog.name = params.name;
                    }

                    if (params.hasOwnProperty('server')) {
                        catalog.server = params.server;
                    }

                    if (params.hasOwnProperty('database')) {
                        catalog.database = params.database;
                    }

                    if (params.hasOwnProperty('username')) {
                        catalog.username = params.username;
                    }

                    if (params.hasOwnProperty('password')) {
                        catalog.password = params.password;
                    }
                }
            }
        }
    };

    pDbCatalog.toJSON = function (email) {
        var obj = {uuid: guid(), version: "0.0.4", username: email, catalogs: pDbCatalog.catalogs, lastMessage: pDbCatalog.lastMessage};
        return JSON.stringify(obj);
    };

    pDbCatalog.fromJSON = function (catalogObj) {
        pDbCatalog.catalogs = catalogObj.catalogs;
        pDbCatalog.username = catalogObj.username;
        pDbCatalog.version = catalogObj.version;
        pDbCatalog.uuid = catalogObj.uuid;

    };

    return pDbCatalog;

};