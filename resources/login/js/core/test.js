var pTestFactory = {};
pTestFactory.newTestSuite = function(config) {

    function guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }


    var pTestHolder = {};
    pTestHolder.suites = [];
    pTestHolder.testMap = {};
    pTestHolder.variableStateMap = {};
    pTestHolder.lastMessage = "";



    /*================================================================
    * TEST SUITE
    =================================================================*/

    function Suite(formulaUUID) {
        this.uuid = guid();
        this.formulaUUID = formulaUUID;
        this.tests = new Array();
    }


    pTestHolder.addSuite = function(formulaUUID) {
        var suite = new Suite(formulaUUID);
        pTestHolder.suites.push(suite);
        return suite;
    };


    pTestHolder.getSuite = function(uuid) {
        var suites = pTestHolder.suites
        for (var i = 0; i < suites.length; i++) {
            if (suites[i].uuid == uuid) {
                return suites[i];
            }
        }
    }

    pTestHolder.getSuiteWithFormulaUUID = function(formulaUUID) {
        var suites = pTestHolder.suites
        for (var i = 0; i < suites.length; i++) {
            if (suites[i].formulaUUID == formulaUUID) {
                return suites[i];
            }
        }
    }



    pTestHolder.getSuiteIndex = function(uuid) {
        var suites = pTestHolder.suites
        for (var i = 0; i < suites.length; i++) {
            if (suites[i].uuid == uuid) {
                return i;
            }
        }
    }


    pTestHolder.listSuite = function() {
        return pTestHolder.suites;
    }



    pTestHolder.deleteSuite = function(uuid) {
        var suiteIndex = pTestHolder.getSuiteIndex(uuid);
        pTestHolder.suites.splice(suiteIndex, 1);
    };

    pTestHolder.deleteSuiteWithFormulaUUID = function(formulaUUID) {
        var suite = pTestHolder.getSuiteWithFormulaUUID(formulaUUID);
        if (suite) {
            var suiteIndex = pTestHolder.getSuiteIndex(suite.uuid);
            pTestHolder.suites.splice(suiteIndex, 1);
        }
    };


    /*================================================================
    * TEST
    =================================================================*/

    function Test(suiteUUID, name) {
        this.name = name;
        this.uuid = guid();
        this.suiteUUID = suiteUUID;
        this.variableStates = new Array();
    }


    pTestHolder.addTest = function(suiteUUID, name) {
        var test = new Test(suiteUUID, name);
        var suite = this.getSuite(suiteUUID);
        suite.tests.push(test);
        pTestHolder.testMap[test.uuid] = test;
        return test;
    };



    pTestHolder.getTest = function(uuid) {
        return pTestHolder.testMap[uuid];
    }


    pTestHolder.getTestIndex = function(suiteUUID, uuid) {
        var suite = this.getSuite(suiteUUID);
        var tests = suite.tests;
        for (var i = 0; i < tests.length; i++) {
            if (tests[i].uuid == uuid) {
                return i;
            }
        }
    }

    pTestHolder.listTest = function(suiteUUID) {
        var suite = this.getSuite(suiteUUID);
        return suite.tests;
    }



    pTestHolder.updateTest = function(uuid, params) {
        if (params == null) return;

        var test = pTestHolder.testMap[uuid]
        if (test == null) return;


        if (params.hasOwnProperty('name')) {
            test.name = params.name;
        }

    }

    pTestHolder.deleteTest = function(uuid) {
        var test = pTestHolder.testMap[uuid];
        var suite = this.getSuite(test.suiteUUID);
        //var suiteIndex = pTestHolder.getSuiteIndex(test.suiteUUID);
        var testIndex = this.getTestIndex(test.suiteUUID, uuid);
        suite.tests.splice(testIndex, 1);
        delete pTestHolder.testMap[uuid];
    }


    /*================================================================
    * VARIABLE STATE
    =================================================================*/

    function VariableState(testUUID, variableUUID, value) {
        this.uuid = guid();
        this.testUUID = testUUID;
        this.variableUUID = variableUUID;
        this.value = value
    }


    pTestHolder.addVariableState = function(testUUID, variableUUID, value) {
        var variableState = new VariableState(testUUID, variableUUID, value);
        var test = this.getTest(testUUID);
        test.variableStates.push(variableState);
        pTestHolder.variableStateMap[variableState.uuid] = variableState;
        return variableState;
    };

    pTestHolder.getVariableState = function(uuid) {
        return pTestHolder.variableStateMap[uuid];
    }




    /*================================================================
    *PERSIST
    =================================================================*/
    pTestHolder.toJSON = function(email) {
        var obj = { version: "0.0.4", username:email, suites: pTestHolder.suites, lastMessage:pTestHolder.lastMessage};
        return JSON.stringify(obj);

    }

    pTestHolder.fromJSON = function(tModel) {

        var suiteObj = tModel.suites;
        pTestHolder.suites = suiteObj;
        pTestHolder.version = tModel.version;
        for (var i = 0; i < suiteObj.length; i++) {
            var suite = suiteObj[i];
            for (var j = 0; j < suite.tests.length; j++) {
                var test = suite.tests[j];
                pTestHolder.testMap[test.uuid] = test;

                for (var k = 0; k < test.variableStates.length; k++) {
                    var variableState = test.variableStates[k];
                    pTestHolder.variableStateMap[variableState.uuid] = variableState;
                }


            }
        }
    }



    return pTestHolder;

}