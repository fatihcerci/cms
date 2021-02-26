var GLOBALS = {
    "PROTOCOL" : "http://",
    "HOST" : "10.81.98.52:8080",
    "PORT_NUMBER" : ":8080",
    "PERMISSION_URL" : '/organizasyon/dispatch?cmd=advancedAuthorizationService_getAllPermissions&jp={"userId":null,"dutyId":"'
};

var ACTION_NAMES = {

    "CATEGORY" : {
        "ADD": "root.rule_engine.addCategory",
        "UPDATE": "root.rule_engine.updateCategory",
        "DELETE" : "root.rule_engine.deleteCategory"
    },

    "FOLDER" : {
        "ADD" : "root.rule_engine.addFolder",
        "UPDATE": "root.rule_engine.updateFolder",
        "DELETE" : "root.rule_engine.deleteFolder"
    },

    "BOX" : {
        "ADD" : "root.rule_engine.addBox",
        "UPDATE" : "root.rule_engine.updateBox",
        "DELETE" : "root.rule_engine.deleteBox",
        "SAVE_RESULT" : "root.rule_engine.saveResultBox",
        "ADD_TO_RESULT" : "root.rule_engine.addToResultBox"
    },

    "FORMULA" : {
        "ADD" : "root.rule_engine.addFormula",
        "UPDATE" : "root.rule_engine.updateFormula",
        "DELETE" : "root.rule_engine.deleteFormula",
        "COPY" : "root.rule_engine.copyFormula",
        "ADD_VERSION": "root.rule_engine.addFormulaVersion",
        "DELETE_VERSION": "root.rule_engine.deleteFormulaVersion",
        "UPDATE_VERSION": "root.rule_engine.updateFormulaVersion"
    },

    "VARIABLE" : {
        "ADD_TO_BOX" : "root.rule_engine.addVariableToBox",
        "DELETE_FROM_BOX" : "root.rule_engine.deleteVariableFromBox",
        "ADD_LOGICAL_OUTPUT" : "root.rule_engine.addLogicalOutputVariable",
        "ADD_TO_FORMULA" : "root.rule_engine.addVariableToFormula",
        "DELETE_FROM_FORMULA" : "root.rule_engine.deleteVariableFromFormula",
        "UPDATE" : "root.rule_engine.updateVariable"
    },

    "POOL_VARIABLE" : {
        "ADD" : "root.rule_engine.addPoolVariable",
        "UPDATE" : "root.rule_engine.updatePoolVariable",
        "DELETE" : "root.rule_engine.deletePoolVariable"
    },

    "SELECTIVE_VALUE" : {
        "ADD" : "root.rule_engine.addSelectiveValue",
        "DELETE" : "root.rule_engine.deleteSelectiveValue"
    },

    "SELECTIVE_ITEM_VALUE" : {
        "ADD" : "root.rule_engine.addSelectiveItemValue",
        "UPDATE" : "root.rule_engine.updateSelectiveItemValue",
        "DELETE" : "root.rule_engine.deleteSelectiveItemValue"
    },

    "LAYER" : {
        "ADD" : "root.rule_engine.addLayer",
        "DELETE" : "root.rule_engine.deleteLayer"
    },

    "TEST" : {
        "RUN" : "root.rule_engine.runTest",
        "SAVE" : "root.rule_engine.saveTestValues",
        "ADD" : "root.rule_engine.addTest",
        "DELETE" : "root.rule_engine.deleteTest",
        "UPDATE" : "root.rule_engine.updateTest"
    },

    "CATALOG" : {
        "ADD" : "root.rule_engine.addCatalog",
        "UPDATE" : "root.rule_engine.updateCatalog",
        "DELETE" : "root.rule_engine.deleteCatalog"
    },

    "TABLE" : {
        "LOAD" : "root.rule_engine.loadTable",
        "DOWNLOAD": "root.rule_engine.downloadTemplate",
        "CREATE": "root.rule_engine.createTemplate"
    }

};