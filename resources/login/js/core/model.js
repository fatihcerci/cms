/*
 * Copyright Cybersoft A.Ş.
 *
 *  Onur DAYIBASI
 */

var LAYER_INDEX_MAX = Math.pow(2, 31) - 1;

var pModelFactory = {};
pModelFactory.newModel = function (config) {

    function guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }

        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }


    var pModel = {};
    pModel.categories = [];
    pModel.folders = [];
    pModel.versions = [];
    pModel.versionMap = {};
    pModel.formulaHeadMap = {}; //Key is FormulaHead uuid
    pModel.formulaHeadMap2 = {}; //Key is Formula uuid
    pModel.folderMap = {};
    pModel.formulaMap = {};
    pModel.variableMap = {};
    pModel.layerMap = {};
    pModel.boxMap = {};
    pModel.boxIOMap = {};
    pModel.lastMessage = "";

    var tempValueMapForCloning = {};

/*================================================================
 * CATEGORY
=================================================================*/

    function Category(name) {
        this.name = name;
        this.uuid = guid();
        this.folders = [];
        this.versions = [];
        this.active = true;
    }

    pModel.addCategory = function (name) {
        var category = new Category(name);
        pModel.categories.push(category);
        return category;
    };

    pModel.getCategory = function (uuid) {
        var categories = pModel.categories;
        for (var i = 0; i < categories.length; i++) {
            if (categories[i].uuid === uuid) {
                return categories[i];
            }
        }
    };

    pModel.getCategoryIndex = function (uuid) {
        var categories = pModel.categories;
        for (var i = 0; i < categories.length; i++) {
            if (categories[i].uuid === uuid) {
                return i;
            }
        }
    };

    pModel.listCategory = function () {
        return pModel.categories;
    };

    pModel.changeCategory = function (category) {
        if (pModel.categories) {
            for (var i = 0; i < pModel.categories.length; i++) {
                var c = pModel.categories[i];
                if (c.uuid === category.uuid) {
                    c = category;
                    break;
                }
            }
        }
    };

    pModel.updateCategory = function (uuid, params) {
        if (params === null) return;

        var category = pModel.getCategory(uuid);

        if (category === null) return;

        if (params.hasOwnProperty('name')) {
            category.name = params.name;
        }

        if (params.hasOwnProperty('folders')) {
            category.folders = params.folders;
        }

        if (params.hasOwnProperty('versions')) {
            category.versions = params.versions;
        }

        if (params.hasOwnProperty('active')) {
            category.active = params.active;
            var notAll = params.notAll;
            if (notAll === false) {
                if (category && category.folders && category.folders.length > 0) {
                    for (var i = 0; i < category.folders.length; i++) {
                        var folder = category.folders[i];
                        folder.active = params.active;
                        if (folder && folder.formulas && folder.formulas.length > 0) {
                            for (var j = 0; j < folder.formulas.length; j++) {
                                var formula = folder.formulas[j];
                                formula.active = params.active;
                            }
                        }
                    }
                }
            }

            //this.changeCategory(category);

        }
    };

    pModel.deleteCategory = function (uuid) {
        var categoryIndex = pModel.getCategoryIndex(uuid);
        pModel.categories.splice(categoryIndex, 1);
    };


    /*================================================================
     * VERSIONS
     =================================================================*/

    function Version(formulaUUID) {
        this.formulaUUID = formulaUUID;
        this.uuid = guid();
        this.formulaHeads = [];
    }

    pModel.addVersion = function (formulaUUID) {
        var version = new Version(formulaUUID);
        pModel.versions.push(version);
        pModel.versionMap[formulaUUID] = version;
        return version;
    };

    pModel.getVersion = function (uuid) {
        var versions = pModel.versions;
        for (var i = 0; i < versions.length; i++) {
            if (versions[i].uuid === uuid) {
                return versions[i];
            }
        }
    };

    pModel.getVersionWithFormulaUUID = function (formulaUUID) {
        return pModel.versionMap[formulaUUID];
    };

    pModel.getVersionIndex = function (uuid) {
        var versions = pModel.versions;
        for (var i = 0; i < versions.length; i++) {
            if (versions[i].uuid === uuid) {
                return i;
            }
        }
    };

    pModel.listVersion = function () {
        return pModel.versions;
    };

    pModel.deleteVersion = function (uuid) {
        var versionIndex = pModel.getVersionIndex(uuid);
        var version = this.getVersion(uuid);
        delete pModel.versionMap[version.formulaUUID];
        pModel.versions.splice(versionIndex, 1);
    };

    /*================================================================
     * FORMULA_HEADS
     =================================================================*/

    function FormulaHead(versionUUID, baseFormulaUUID, formulaUUID, linkedFormulaUUID, startDate, active) {
        this.uuid = guid();
        this.versionUUID = versionUUID;
        this.formulaUUID = formulaUUID;
        this.baseFormulaUUID = baseFormulaUUID;
        this.linkedFormulaUUID = linkedFormulaUUID;
        this.startDate = startDate;
        this.updatedDate = startDate;
        this.active = active;

    }


    pModel.addFormulaHead = function (baseFormulaUUID, formulaUUID, linkedFormulaUUID, startDate, active) {
        var version = this.getVersionWithFormulaUUID(baseFormulaUUID);
        if (!version) {
            version = this.addVersion(baseFormulaUUID);
        }
        var formulaHead = new FormulaHead(version.uuid, baseFormulaUUID, formulaUUID, linkedFormulaUUID, startDate, active);
        version.formulaHeads.push(formulaHead);
        pModel.formulaHeadMap[formulaHead.uuid] = formulaHead;
        pModel.formulaHeadMap2[formulaHead.formulaUUID] = formulaHead;
        return formulaHead;
    };


    pModel.getFormulaHead = function (uuid) {
        return pModel.formulaHeadMap[uuid];
    };


    pModel.getFormulaHeadWithFormulaUUID = function (formulaUUID) {
        return pModel.formulaHeadMap2[formulaUUID];
    };

    pModel.getFormulaHeadIndex = function (uuid) {
        if (uuid === null) return null;

        var formulaHead = this.getFormulaHead(uuid);
        if (formulaHead === null) return null;

        var version = this.getVersion(formulaHead.versionUUID);
        if (version === null) return null;

        var formulaHeads = version.formulaHeads;
        for (var i = 0; i < formulaHeads.length; i++) {
            if (formulaHeads[i].uuid === uuid) {
                return i;
            }
        }
    };

    pModel.listFormulaHead = function (versionUUID) {
        var version = this.getVersion(versionUUID);
        if (version === null) return null;
        return version.formulaHeads;
    };

    pModel.setListFormulaHead = function (versionUUID, formulaHeads) {
        var version = this.getVersion(versionUUID);
        if (version === null) return null;
        version.formulaHeads = formulaHeads;
        return version.formulaHeads;
    };

    pModel.updateFormulaHead = function (uuid, params) {
        if (params === null) return;

        var formulaHead = pModel.getFormulaHead(uuid);
        if (formulaHead === null) return;

        if (params.hasOwnProperty('active')) {
            formulaHead.active = params.active;
        }

        if (params.hasOwnProperty('updatedDate')) {
            formulaHead.updatedDate = params.updatedDate;
        }
    };

    pModel.deleteFormulaHead = function (uuid) {
        var formulaHeadIndex = pModel.getFormulaHeadIndex(uuid);
        var formulaHead = this.getFormulaHead(uuid);
        var version = this.getVersion(formulaHead.versionUUID);
        delete pModel.formulaHeadMap[formulaHead.uuid];
        delete pModel.formulaHeadMap2[formulaHead.formulaUUID];
        version.formulaHeads.splice(formulaHeadIndex, 1);
    };


    /*================================================================
    * FOLDER
    =================================================================*/

    function Folder(categoryUUID, name) {
        this.name = name;
        this.uuid = guid();
        this.categoryUUID = categoryUUID;
        this.formulas = [];
        this.active = true;
    }

    pModel.addFolder = function (categoryUUID, name) {
        var folder = new Folder(categoryUUID, name);
        pModel.folders.push(folder);
        return folder;
    };


    pModel.getFolder = function (uuid) {
        var folders = pModel.folders;
        for (var i = 0; i < folders.length; i++) {
            if (folders[i].uuid === uuid) {
                return folders[i];
            }
        }
    };

    pModel.getFolderIndex = function (uuid) {
        var folders = pModel.folders;
        for (var i = 0; i < folders.length; i++) {
            if (folders[i].uuid === uuid) {
                return i;
            }
        }
    };


    pModel.listFolder = function () {
        return pModel.folders;
    };

    pModel.updateFolder = function (uuid, params) {
        if (params === null) return;

        var folder = pModel.getFolder(uuid);
        if (folder === null) return;


        if (params.hasOwnProperty('name')) {
            folder.name = params.name;
        }

        if (params.hasOwnProperty('active') && params.hasOwnProperty('notAll')) {
            folder.active = params.active;
            var notAll = params.notAll;
            if (notAll === false) {
                if (folder && folder.formulas && folder.formulas.length > 0) {
                    for (var i = 0; i < folder.formulas.length; i++) {
                        var formula = folder.formulas[i];
                        formula.active = params.active;
                    }
                }
            }
        }

    };

    pModel.deleteFolder = function (uuid) {

        var folderIndex = pModel.getFolderIndex(uuid);
        pModel.folders.splice(folderIndex, 1);
    };


    /*================================================================
    * FORMULA
    =================================================================*/

    function Formula(folderUUID, name) {
        this.name = name;
        this.uuid = guid();
        this.folderUUID = folderUUID;
        this.variables = [];
        this.layers = [];
        this.layerLastIndex = 0;
        this.order = 0;
        this.returnType = "Object";
        this.active = true;
    }

    function getMaxOrder(formulas) {
        var maxOrder = 0;
        if (formulas && formulas.length > 0) {
            var formula = getMax(formulas, "order");
            maxOrder = formula.order + 1;
        }

        return maxOrder;
    }

    pModel.addFormula = function (folderUUID, name) {
        var formula = new Formula(folderUUID, name);
        var folder = this.getFolder(folderUUID);

        folder.formulas.push(formula);
        pModel.formulaMap[formula.uuid] = formula;
        formula.order = getMaxOrder(folder.formulas);

        //Add Default Result Layer And Box
        var layer = pModel.addLayer(formula.uuid, "ResultLayer");
        //layer.layerIndex = Number.MAX_SAFE_INTEGER;
        // MongoDb icin yukarıdaki satir asagidaki ile degistirildi 20171130 necipakif
        layer.layerIndex = LAYER_INDEX_MAX;
        var box = pModel.addBox(layer.uuid, "ResultBox");
        box.type = "CodeBlock";
        return formula;
    };


    pModel.insertFormula = function (formula, index) {
        var folder = this.getFolder(formula.folderUUID);
        folder.formulas.splice(index, 0, formula);
        pModel.formulaMap[formula.uuid] = formula;
        return formula;
    };


    pModel.deepClone = function (o) {

        var out, v, key;
        out = Array.isArray(o) ? [] : {};
        for (key in o) {
            v = o[key];
            out[key] = (typeof v === "object") ? this.deepClone(v) : v;
        }
        return out;

    };


    pModel.cloneFormula = function (formulaUUID, tag) {
        var formula = pModel.formulaMap[formulaUUID];
        var formulaHead = this.getFormulaHeadWithFormulaUUID(formulaUUID);
        var baseFormula;
        if (formulaHead) {
            baseFormula = this.getFormula(formulaHead.baseFormulaUUID);
        }
        //console.log(formula);
        if (formula === null) return;
        //var newFormula = jQuery.extend(true, {}, formula);
        //var newFormula = Object.assign({}, formula);
        var newFormula = this.deepClone(formula);
        var folder = this.getFolder(formula.folderUUID);
        if (folder) {
            newFormula.order = getMaxOrder(folder.formulas);
        }
        //console.log(newFormula);
        if (tag == null) {
            newFormula.name = baseFormula ? baseFormula.name + "_Copied" : formula.name + "_Copied";
        } else {
            if (baseFormula) {
                newFormula.name = baseFormula.name + "_" + tag;
            } else {
                var searchIndex = formula.name.indexOf("_");
                var newFormulaName = formula.name;
                if (searchIndex > -1) {
                    var tempName = formula.name.substring(0, searchIndex);
                    var minusCharCount = formula.name.length - tempName.length;
                    newFormulaName = minusCharCount > 2 ? formula.name : formula.name.substring(0, searchIndex);
                }
                newFormula.name = newFormulaName + "_" + tag;
            }
        }
        //newFormula.name = formula.name;

        tempValueMapForCloning = {};
        this.changeFormulaUUIDs(newFormula);
        this.setFormulaDataInToQuickAccessMap(newFormula);
        //console.log(formula);
        //console.log(newFormula);
        return newFormula;
    };

    pModel.changeFormulaUUIDs = function (jsonObj, realObj) {

        if (jsonObj instanceof Object) {
            for (key in jsonObj) {
                this.changeFormulaUUIDs(jsonObj[key], jsonObj);
            }
        } else {
            if (key.toUpperCase().includes("UUID") && key !== "holderUUID" &&
                key !== "folderUUID") {
                if (tempValueMapForCloning[jsonObj] !== undefined) {
                    value = tempValueMapForCloning[jsonObj];
                } else {
                    tempValueMapForCloning[jsonObj] = guid();
                    value = tempValueMapForCloning[jsonObj];
                }
                var oldValue = realObj[key];
                realObj[key] = value;
                //console.log(key + " oldval:" + oldValue + " newval:" + value);
            } else {
                //console.log(key + ":" + realObj[key]);
            }
        }
    };

    pModel.setFormulaDataInToQuickAccessMap = function (formula) {
        pModel.formulaMap[formula.uuid] = formula;
        var k = 0;
        var z = 0;
        for (k = 0; k < formula.variables.length; k++) {
            var variable = formula.variables[k];
            pModel.variableMap[variable.uuid] = variable;
        }


        for (k = 0; k < formula.layers.length; k++) {
            var layer = formula.layers[k];
            pModel.layerMap[layer.uuid] = layer;
            for (var t = 0; t < layer.boxes.length; t++) {
                var box = layer.boxes[t];
                pModel.boxMap[box.uuid] = box;
                for (z = 0; z < box.inputs.length; z++) {
                    var io = box.inputs[z];
                    pModel.boxIOMap[io.uuid] = io;
                }

                for (z = 0; z < box.outputs.length; z++) {
                    var io = box.outputs[z];
                    pModel.boxIOMap[io.uuid] = io;
                }

            }

        }
    };


    pModel.getFormula = function (uuid) {
        return pModel.formulaMap[uuid];
    };

    pModel.getFormulaIndex = function (folderUUID, uuid) {
        var folder = this.getFolder(folderUUID);
        var formulas = folder.formulas;
        for (var i = 0; i < formulas.length; i++) {
            if (formulas[i].uuid === uuid) {
                return i;
            }
        }
    };

    pModel.listFormula = function (folderUUID) {
        var folder = this.getFolder(folderUUID);
        return folder.formulas;
    };

    pModel.listFormulaByCategory = function(categoryUUID) {
        var allFormula = [];
        var category = pModel.getCategory(categoryUUID);
        if (category && category.folders) {
            for (var i = 0; i < category.folders.length; i++) {
                var formulas = category.folders[i].formulas;
                if (formulas && formulas.length > 0)
                    allFormula = formulas;
            }
        }

        return allFormula;
    };

    pModel.listFormulaUUID = function(allFormula) {
        var allFormulaUUID = [];
        if (allFormula && allFormula.length > 0) {
            for (var i=0; i<allFormula.length; i++) {
                allFormulaUUID.push('"' + allFormula[i].uuid + '"');
            }
        }

        return allFormulaUUID;
    };


    pModel.updateFormula = function (uuid, params) {
        if (params === null) return;

        var formula = pModel.formulaMap[uuid];
        if (formula === null) return;

        if (params.hasOwnProperty('name')) {
            formula.name = params.name;
        }

        if (params.hasOwnProperty('order')) {
            formula.order = params.order;
        }

        if (params.hasOwnProperty('returnType')) {
            formula.returnType = params.returnType;
        }

        if (params.hasOwnProperty('active')) {
            formula.active = params.active;
        }
    };

    pModel.deleteFormula = function (uuid) {
        var formula = pModel.formulaMap[uuid];
        var folder = this.getFolder(formula.folderUUID);
        var formulaIndex = this.getFormulaIndex(formula.folderUUID, uuid);
        folder.formulas.splice(formulaIndex, 1);
        delete pModel.formulaMap[uuid];
    };


    /*================================================================
    * VARIABLES
    =================================================================*/

    function Variable(formulaUUID, name, type, holderUUID) {
        this.name = name;
        this.uuid = guid();
        this.type = type ? type : "Integer";
        this.holderUUID = holderUUID ? holderUUID : "";
        this.formulaUUID = formulaUUID;

    }

    pModel.addVariable = function (formulaUUID, name, type, holderUUID) {
        var variable = new Variable(formulaUUID, name, type, holderUUID);
        var formula = pModel.formulaMap[formulaUUID];
        formula.variables.push(variable);
        pModel.variableMap[variable.uuid] = variable;
        return variable;
    };

    pModel.getVariable = function (uuid) {
        return pModel.variableMap[uuid];
    };

    pModel.getVariableIndex = function (formulaUUID, uuid) {
        var formula = pModel.formulaMap[formulaUUID];
        var variables = formula.variables;
        for (var i = 0; i < variables.length; i++) {
            if (variables[i].uuid === uuid) {
                return i;
            }
        }
    };

    pModel.listVariable = function (formulaUUID) {
        var formula = this.getFormula(formulaUUID);
        return formula.variables;
    };

    pModel.updateVariable = function (uuid, params) {
        if (params === null) return;

        var variable = pModel.variableMap[uuid];
        if (variable === null) return;


        if (params.hasOwnProperty('name')) {
            variable.name = params.name;
        }

        if (params.hasOwnProperty('type')) {
            variable.type = params.type;
        }

        if (params.hasOwnProperty('holderUUID')) {
            variable.holderUUID = params.holderUUID;
        }
    };

    pModel.deleteVariable = function (uuid) {
        var variable = pModel.variableMap[uuid];
        var formula = this.getFormula(variable.formulaUUID);
        var variableIndex = this.getVariableIndex(formula.uuid, uuid);
        formula.variables.splice(variableIndex, 1);
        delete pModel.variableMap[uuid];

        if (formula.layers && formula.layers.length > 0) {
            for (var i=0; i<formula.layers.length; i++) {
                var layer = formula.layers[i];
                if (layer && layer.name !== 'ResultLayer') {
                    var boxes = layer.boxes;
                    if (boxes && boxes.length > 0) {
                        for (var j=0; j<boxes.length; j++) {
                            var box = boxes[j];
                            if (box && box.inputs.length > 0) {
                                for (var k=0; k<box.inputs.length; k++) {
                                    var input = box.inputs[k];
                                    if (input && (variable.uuid === input.variableUUID ||
                                            variable.name === input.name)) {
                                        this.deleteBoxIO(input.uuid);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }


    };

    /*================================================================
    * LAYER
    =================================================================*/

    function Layer(formulaUUID, name) {
        this.name = name;
        this.uuid = guid();
        this.layerIndex = -1;
        this.formulaUUID = formulaUUID;
        this.boxes = [];
    }

    pModel.addLayer = function (formulaUUID, name) {
        var layer = new Layer(formulaUUID, name);
        var formula = pModel.formulaMap[formulaUUID];
        layer.layerIndex = formula.layerLastIndex;
        formula.layerLastIndex++;
        formula.layers.push(layer);
        pModel.layerMap[layer.uuid] = layer;
        return layer;
    };

    pModel.getLayer = function (uuid) {
        return pModel.layerMap[uuid];
    };

    pModel.getLayerIndex = function (formulaUUID, uuid) {
        var formula = pModel.formulaMap[formulaUUID];
        var layers = formula.layers;
        for (var i = 0; i < layers.length; i++) {
            if (layers[i].uuid === uuid) {
                return i;
            }
        }
    };

    pModel.listLayer = function (formulaUUID) {
        var formula = pModel.formulaMap[formulaUUID];
        return formula.layers;
    };

    pModel.updateLayer = function (uuid, params) {
        if (params === null) return;

        var layer = pModel.layerMap[uuid];
        if (layer === null) return;


        if (params.hasOwnProperty('name')) {
            layer.name = params.name;
        }
    };

    pModel.deleteLayer = function (uuid) {
        var layer = pModel.layerMap[uuid];

        if (layer && layer.boxes && layer.boxes.length > 0) {
            for (var i = 0; i < layer.boxes.length; i++) {
                var item = layer.boxes[i];
                if (item) {
                    var resultBox = pModel.getResultBox(layer.formulaUUID);
                    if (resultBox && resultBox.outputs && resultBox.outputs.length > 0) {
                        for (var j = 0; j < resultBox.outputs.length; j++) {
                            var outputBox = resultBox.outputs[j];
                            if (outputBox.variableUUID === item.uuid) {
                                $("[data-box-uuid='" + item.uuid + "']").remove();
                                pModel.deleteBoxIO(outputBox.uuid);
                            }
                        }

                    }
                }
            }
        }

        var layerIndex = this.getLayerIndex(layer.formulaUUID, uuid);
        var formula = pModel.getFormula(layer.formulaUUID);
        formula.layers.splice(layerIndex, 1);
        delete pModel.layerMap[uuid];
    };

    /*================================================================
    * BOX
    =================================================================*/

    function Box(layerUUID, name, type) {
        this.name = name;
        this.uuid = guid();
        this.layerUUID = layerUUID;
        this.inputs = [];
        this.outputs = [];
        this.type = type;
        this.decisiontable_url = "";
        this.decisiontable_uploaded_valid = false;
        this.codeblock_text = "";
        this.sql_condition = "";
        this.boxHeader = "";
        this.boxDetail = "";
        this.multiResult = false;
    }

    pModel.addBox = function (layerUUID, name, type) {
        var box = new Box(layerUUID, name, type);
        var layer = pModel.layerMap[layerUUID];
        layer.boxes.push(box);
        pModel.boxMap[box.uuid] = box;
        return box;
    };

    pModel.getBox = function (uuid) {
        return pModel.boxMap[uuid];
    };

    pModel.getResultBox = function (formulaUUID) {
        var formula = pModel.getFormula(formulaUUID);
        var resultBox = null;
        if (formula) {
            var layers = formula.layers;
            if (layers && layers.length > 0) {
                for (var i = 0; i < layers.length; i++) {
                    var layer = layers[i];
                    if (layer.name === 'ResultLayer') {
                        if (layer.boxes && layer.boxes.length > 0) {
                            for (var j = 0; j < layer.boxes.length > 0; j++) {
                                var box = layer.boxes[j];
                                if (box.name === 'ResultBox') {
                                    resultBox = box;
                                    break;
                                }
                            }
                        }
                    }
                }
            }
        }

        return resultBox;
    };

    pModel.getBoxIndex = function (layerUUID, uuid) {
        var layer = pModel.layerMap[layerUUID];
        var boxes = layer.boxes;
        for (var i = 0; i < boxes.length; i++) {
            if (boxes[i].uuid === uuid) {
                return i;
            }
        }
    };

    pModel.listBox = function (layerUUID) {
        var layer = this.getLayer(layerUUID);
        return layer.boxes;
    };

    pModel.updateBox = function (uuid, params) {
        if (params === null) return;

        var box = pModel.boxMap[uuid];
        if (box === null) return;


        if (params.hasOwnProperty('name')) {
            box.name = params.name;
        }

        if (params.hasOwnProperty('type')) {
            box.type = params.type;
            if (box.type === 'DecisionTable') {
                box.outputs = [];
            }
        }

        if (params.hasOwnProperty('decisiontable_url')) {
            box.decisiontable_url = params.decisiontable_url;
        }

        if (params.hasOwnProperty('codeblock_text')) {
            box.codeblock_text = params.codeblock_text;
        }

        if (params.hasOwnProperty('sql_condition')) {
            box.sql_condition = params.sql_condition;
        }

        if (params.hasOwnProperty('boxHeader')) {
            box.boxHeader = params.boxHeader;
        }

        if (params.hasOwnProperty('boxDetail')) {
            box.boxDetail = params.boxDetail;
        }

        if (params.hasOwnProperty('multiResult')) {
            box.multiResult = params.multiResult;
        }

        if (params.hasOwnProperty('outputs')) {
            box.outputs = params.outputs;
        }

    };

    pModel.deleteBox = function (uuid) {
        var box = pModel.boxMap[uuid];
        var layer = this.getLayer(box.layerUUID);
        var boxIndex = this.getBoxIndex(layer.uuid, uuid);
        layer.boxes.splice(boxIndex, 1);
        delete pModel.boxMap[uuid];
    };

    pModel.deleteBoxFromResultBox = function (resultUUID, boxUUID) {
        var box = pModel.boxMap[resultUUID];
        if (box) {
            if (box.outputs.length > 0) {
                for (var i = 0; i < box.outputs.length; i++) {
                    if (box.outputs[i].variableUUID === boxUUID) {
                        box.outputs.splice(i, 1);
                    }
                }
            }
        }
    };

    /*================================================================
    * INPUTS / OUTPUTS
    =================================================================*/

    function BoxIO(name, boxUUID, type, variable_box_UUID, variableType) { //type -> input0, output1
        this.name = name;
        this.uuid = guid();
        this.boxUUID = boxUUID;
        this.variableUUID = variable_box_UUID;
        this.type = type;
        this.variableType = variableType;
        this.selected = false;

    }

    pModel.addBoxIO = function (name, boxUUID, type, variable_box_UUID, variableType) {
        var box = pModel.boxMap[boxUUID];
        if (box) {
            var boxIO = new BoxIO(name, boxUUID, type, variable_box_UUID, variableType);
            pModel.boxIOMap[boxIO.uuid] = boxIO;
            if (type === "input") {
                box.inputs.push(boxIO);
            } else if (type === "output") {
                box.outputs.push(boxIO);
            }
            return boxIO;
        }
    };

    pModel.listBoxIO = function (boxUUID, type) {
        var box = this.getBox(boxUUID);
        if (box) {
            if (type === "input") return box.inputs;
            else if (type === "output") return box.outputs;
        }
    };

    pModel.getBoxIO = function (uuid) {
        return pModel.boxIOMap[uuid];
    };

    pModel.getBoxIOWithType = function (boxUUID, variable_box_UUID, type) {
        var box = this.getBox(boxUUID);
        var i = 0;
        if (type === "input") {
            if (box.inputs) {
                for (i = 0; i < box.inputs.length; i++) {
                    if (box.inputs[i].variableUUID === variable_box_UUID) {
                        return pModel.getBoxIO(box.inputs[i].uuid);
                    }
                }
            }
        } else if (type === "output") {
            if (box.outputs) {
                for (i = 0; i < box.outputs.length; i++) {
                    if (box.outputs[i].variableUUID === variable_box_UUID) {
                        return pModel.getBoxIO(box.outputs[i].uuid);
                    }
                }
            }
        }
    };

    pModel.getBoxIOIndex = function (boxUUID, uuid) {
        var box = pModel.boxMap[boxUUID];
        var boxIO = pModel.boxIOMap[uuid];

        var IOs = null;
        if (boxIO.type === "input") IOs = box.inputs;
        else if (boxIO.type === "output") IOs = box.outputs;
        if (IOs) {
            for (var i = 0; i < IOs.length; i++) {
                if (IOs[i].uuid === uuid) {
                    return i;
                }
            }
        }
    };

    pModel.updateBoxIO = function (boxUUID, variable_box_UUID, type, params) {
        if (params === null) return;
        var boxIO = null;

        if (boxUUID && variable_box_UUID && type) {
            boxIO = pModel.getBoxIOWithType(boxUUID, variable_box_UUID, type);
        } else if (variable_box_UUID) {
            //console.log("Buraya");
            boxIO = pModel.getBoxIO(variable_box_UUID);
        }

        if (boxIO === null) return;

        if (params.hasOwnProperty('name')) {
            boxIO.name = params.name;
        }

        if (params.hasOwnProperty('type')) {
            boxIO.type = params.type;
        }

        if (params.hasOwnProperty('variableType')) {
            boxIO.variableType = params.variableType;
        }

        if (params.hasOwnProperty('selected')) {
            boxIO.selected = params.selected;
        }

    };

    pModel.deleteBoxIO = function (uuid) {
        var deleted = false;
        var boxIO = pModel.boxIOMap[uuid];
        var box = this.getBox(boxIO.boxUUID);


        var IOs = null;
        if (boxIO.type === "input") IOs = box.inputs;
        else if (boxIO.type === "output") IOs = box.outputs;

        var boxIOIndex = this.getBoxIOIndex(box.uuid, uuid);
        if (IOs) {
            IOs.splice(boxIOIndex, 1);
            delete pModel.boxIOMap[uuid];
            deleted = true;
        }

        return deleted;
    };

    /*================================================================
    *PERSIST
    =================================================================*/

    pModel.toJSON = function (email) {

        //folders: pModel.folders,
        //versions: pModel.versions
        var obj = {
            uuid: guid(),
            version: "0.0.4",
            username: email,
            categories: pModel.categories,
            lastMessage: pModel.lastMessage

        };
        return JSON.stringify(obj);

    };

    pModel.fromJSON = function (modelObj) {
        pModel.categories = modelObj.categories;
        pModel.version = modelObj.version;


        //Categories
        for (var m = 0; m < pModel.categories.length; m++) {
            var folders = pModel.categories[m].folders;
            var versions = pModel.categories[m].versions;

            //Folders
            for (var i = 0; i < folders.length; i++) {
                var folder = folders[i];
                for (var j = 0; j < folder.formulas.length; j++) {
                    var formula = folder.formulas[j];
                    pModel.formulaMap[formula.uuid] = formula;
                    for (var k = 0; k < formula.variables.length; k++) {
                        var variable = formula.variables[k];
                        pModel.variableMap[variable.uuid] = variable;
                    }


                    for (var k = 0; k < formula.layers.length; k++) {
                        var layer = formula.layers[k];
                        pModel.layerMap[layer.uuid] = layer;
                        for (var t = 0; t < layer.boxes.length; t++) {
                            var box = layer.boxes[t];
                            pModel.boxMap[box.uuid] = box;
                            for (var zx = 0; zx < box.inputs.length; zx++) {
                                var io = box.inputs[zx];
                                pModel.boxIOMap[io.uuid] = io;
                            }

                            for (var z = 0; z < box.outputs.length; z++) {
                                var io = box.outputs[z];
                                pModel.boxIOMap[io.uuid] = io;
                            }

                        }

                    }

                }
            } //end of folders

            //Versions
            for (var i = 0; i < versions.length; i++) {
                var version = versions[i];
                pModel.versionMap[version.formulaUUID] = version;

                var formulaHeads = version.formulaHeads;
                for (k = 0; k < formulaHeads.length; k++) {
                    var formulaHead = formulaHeads[k];
                    pModel.formulaHeadMap[formulaHead.uuid] = formulaHead;
                    pModel.formulaHeadMap2[formulaHead.formulaUUID] = formulaHead;
                }
            }
        }

    };

    return pModel;
};