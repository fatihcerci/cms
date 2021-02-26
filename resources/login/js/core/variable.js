var pVariableFactory = {};
pVariableFactory.newVariable = function () {

    function guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }

        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }

    var pVariable = {};
    pVariable.variables = [];
    pVariable.variableMap = {};
    pVariable.variableMapName = {};

    /*================================================================
     * POOL VARIABLES
     =================================================================*/

    function PoolVariable(name, type, holderUUID, description) {
        this.name = name;
        this.uuid = guid();
        this.type = type;
        this.holderUUID = holderUUID;
        this.description = description;
    }

    pVariable.addPoolVariable = function (name, type, holderUUID, description) {
        var poolVariable = new PoolVariable(name, type, holderUUID, description);
        pVariable.variableMap[poolVariable.uuid] = poolVariable;
        pVariable.variableMapName[name.toLocaleLowerCase()] = poolVariable;
        pVariable.variables.push(poolVariable);
        return poolVariable;
    };

    pVariable.getPoolVariable = function (uuid) {
        return pVariable.variableMap[uuid];
    };

    pVariable.getPoolVariableWithName = function (name) {
        var poolVariable = pVariable.variableMap[name.toLocaleLowerCase()];
        if (!poolVariable) {
            for (var i=0; i<pVariable.variables.length; i++) {
                var pVar = pVariable.variables[i];
                if (pVar.name.toLocaleLowerCase() === name.toLocaleLowerCase()) {
                    poolVariable = pVar;
                    break;
                }
            }
        }
        return poolVariable;
    };

    pVariable.getPoolVariableIndex = function (uuid) {
        var poolVariables = pVariable.listPoolVariable();
        if (poolVariables) {
            for (var i = 0; i < poolVariables.length; i++) {
                if (poolVariables[i].uuid === uuid) {
                    return i;
                }
            }
        }
    };

    pVariable.listPoolVariable = function () {
        return pVariable.variables;
    };

    pVariable.updatePoolVariable = function (uuid, params) {
        if (params === null) return;

        var poolVariable = pVariable.variableMap[uuid];
        if (poolVariable === null) return;


        if (params.hasOwnProperty('name')) {
            poolVariable.name = params.name;
        }

        if (params.hasOwnProperty('type')) {
            poolVariable.type = params.type;
        }

        if (params.hasOwnProperty('holderUUID')) {
            poolVariable.holderUUID = params.holderUUID;
        }

        if (params.hasOwnProperty('description')) {
            poolVariable.description = params.description;
        }
    };

    pVariable.deletePoolVariable = function (uuid) {
        var poolVariableIndex = pVariable.getPoolVariableIndex(uuid);
        pVariable.variables.splice(poolVariableIndex, 1);
        delete pVariable.variableMap[uuid];
    };


    pVariable.toJSON = function (email) {
        var obj = {uuid: guid(), version: "0.0.4", username: email, variables: pVariable.variables};
        return JSON.stringify(obj);
    };

    pVariable.fromJSON = function (variableObj) {
        pVariable.variableMap = {};
        if (variableObj.variables && variableObj.variables.length > 0) {
            for (var i=0; i<variableObj.variables.length; i++) {
                var poolVariable = variableObj.variables[i];
                pVariable.variableMap[poolVariable.uuid] = poolVariable;
            }
        }
        pVariable.variables = variableObj.variables;
        pVariable.username = variableObj.username;
        pVariable.version = variableObj.version;
        pVariable.uuid = variableObj.uuid;

    };

    return pVariable;


};