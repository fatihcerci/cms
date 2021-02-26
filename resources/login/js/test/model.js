 QUnit.module("pModel");


 /*================================================================
 * VERSIONS
 =================================================================*/


 QUnit.test("addVersion", function(assert) {
     var pModel = pModelFactory.newModel();
     var version = pModel.addVersion("0001");
     assert.ok(pModel.versions.length == 1, "One Version Added");
     assert.ok(version.formulaUUID == "0001", "Version formulaUUID Sets");
     assert.ok(version.uuid != undefined, "Version UUID Sets");
     version = pModel.addVersion("0002");
     assert.ok(pModel.versions.length == 2, "Second Folder Added");
     version = pModel.addVersion();
     assert.ok(version.formulaUUID == null, "Version FormulaUUID Null If Params Not Gives");
 });


 QUnit.test("getVersion", function(assert) {
     var pModel = pModelFactory.newModel();
     assert.ok(pModel.versions.length == 0, "No Versions Added Yet");
     var version = pModel.getVersion();
     assert.ok(version == null, "uuid params not passed then version null");
     var version = pModel.getVersion("a1234")
     assert.ok(version == null, "undefined uuid params passed then version null");
     version = pModel.addVersion("0001");
     assert.ok(version.uuid == pModel.getVersion(version.uuid).uuid, "uuid check okay");
     assert.ok(version.formulaUUID == pModel.getVersion(version.uuid).formulaUUID, "formulaUUID check okay");
 });



 QUnit.test("getVersionWithFormulaUUID", function(assert) {
     var pModel = pModelFactory.newModel();
     assert.ok(pModel.versions.length == 0, "No Versions Added Yet");
     var version = pModel.getVersion();
     assert.ok(version == null, "uuid params not passed then version null");
     var version = pModel.getVersion("a1234")
     assert.ok(version == null, "undefined uuid params passed then version null");
     version = pModel.addVersion("0001");
     assert.ok(version.uuid == pModel.getVersionWithFormulaUUID(version.formulaUUID).uuid, "uuid check okay");
     assert.ok(version.formulaUUID == pModel.getVersionWithFormulaUUID(version.formulaUUID).formulaUUID, "formulaUUID check okay");
 });


 QUnit.test("getVersionIndex", function(assert) {
     var pModel = pModelFactory.newModel();
     assert.ok(pModel.getVersionIndex() == null, "No params passing result is Null");
     assert.ok(pModel.getVersionIndex("av1") == null, "Invalid params passing result is Null");
     pModel.addVersion("0001");
     pModel.addVersion("0002");
     var fDeprem = pModel.addVersion("0003");
     assert.ok(pModel.getVersionIndex(fDeprem.uuid) == 2, "Deprem is 2 Index");
 });




 QUnit.test("listVersion", function(assert) {
     var pModel = pModelFactory.newModel();
     assert.ok(pModel.listVersion() != null, "Initial Versions not null");
     assert.ok(Array.isArray(pModel.listVersion()), "Initial Versions type is array");
     assert.ok(pModel.listVersion().length == 0, "Initial Versions is empty");
     pModel.addVersion("0001");
     pModel.addVersion("0002");
     pModel.addVersion("0003");
     assert.ok(pModel.listVersion().length == 3, "List Versions has 3 version");
 });



 QUnit.test("deleteVersion", function(assert) {

     var pModel = pModelFactory.newModel();
     var version0001 = pModel.addVersion("0001");
     var version0002 = pModel.addVersion("0002");
     var version0003 = pModel.addVersion("0003");
     assert.ok(pModel.listVersion().length == 3, "Added 3 version");
     pModel.deleteVersion(version0002.uuid);
     assert.ok(pModel.listVersion().length == 2, "Removed 1 and 2 version Back");
     assert.ok(pModel.getVersion(version0002.uuid) == null, "Version2 Removed Succeded");

 });



 /*================================================================
 * FORMULA HEAD
 =================================================================*/


 QUnit.test("addFormulaHead", function(assert) {
     var pModel = pModelFactory.newModel();
     var formulaHead = pModel.addFormulaHead("0001", "0001a", "01012017")
     var version = pModel.getVersionWithFormulaUUID("0001");
     assert.ok(version.formulaHeads.length == 1, "Added 1 Formula Head");
     var formulaHead = pModel.addFormulaHead("0001", "0001a", "01022017")
     assert.ok(version.formulaHeads.length == 2, "Added 2 Formula Head");


 });


 QUnit.test("getFormulaHead", function(assert) {
     var pModel = pModelFactory.newModel();
     var formulaHead = pModel.addFormulaHead("0001", "0001a", "01012017")
     assert.ok(formulaHead.uuid == pModel.getFormulaHead(formulaHead.uuid).uuid, "uuid check okay");
     assert.ok(formulaHead.formulaUUID == pModel.getFormulaHead(formulaHead.uuid).formulaUUID, "formulaUUID check okay");
     assert.ok(formulaHead.baseFormulaUUID == pModel.getFormulaHead(formulaHead.uuid).baseFormulaUUID, "baseFormulaUUID check okay");
 });



 QUnit.test("getFormulaHeadIndex", function(assert) {
     var pModel = pModelFactory.newModel();
     assert.ok(pModel.getFormulaHeadIndex() == null, "No params passing result is Null");
     assert.ok(pModel.getFormulaHeadIndex("av1") == null, "Invalid params passing result is Null");
     pModel.addFormulaHead("0001", "0001a", "01012017")
     pModel.addFormulaHead("0001", "0001b", "01022017")
     var fHead = pModel.addFormulaHead("0001", "0001c", "01032017")
     assert.ok(pModel.getFormulaHeadIndex(fHead.uuid) == 2, "fHead is 2 Index");
 });

 QUnit.test("listFormulaHead", function(assert) {
     var pModel = pModelFactory.newModel();
     var version = pModel.addVersion("0001");
     assert.ok(pModel.listFormulaHead(version.uuid) != null, "Initial FormulaHead not null");
     assert.ok(Array.isArray(pModel.listFormulaHead(version.uuid)), "Initial FormulaHead type is array");
     assert.ok(pModel.listFormulaHead(version.uuid).length == 0, "Initial FormulaHead is empty");
     pModel.addFormulaHead("0001", "0001a", "01012017")
     pModel.addFormulaHead("0001", "0001b", "01022017")
     pModel.addFormulaHead("0001", "0001c", "01032017")
     assert.ok(pModel.listFormulaHead(version.uuid).length == 3, "List FormulaHead has 3 version");
 });


 QUnit.test("deleteFormulaHead", function(assert) {

     var pModel = pModelFactory.newModel();
     var version = pModel.addVersion("0001");
     pModel.addFormulaHead("0001", "0001a", "01012017")
     pModel.addFormulaHead("0001", "0001b", "01022017")
     var fHead = pModel.addFormulaHead("0001", "0001c", "01032017")
     assert.ok(pModel.listFormulaHead(version.uuid).length == 3, "List FormulaHead has 3 version");

     pModel.deleteFormulaHead(fHead.uuid);
     assert.ok(pModel.listFormulaHead(version.uuid).length == 2, "Removed 1 and 2 formulas Back");
     assert.ok(pModel.getFormulaHead(fHead.uuid) == null, "Formula Removed Succeded");

 });




 /*================================================================
 * FOLDER
 =================================================================*/

 QUnit.test("addFolder", function(assert) {
     var pModel = pModelFactory.newModel();
     var folder = pModel.addFolder("Kaza");
     assert.ok(pModel.folders.length == 1, "One Folder Added");
     assert.ok(folder.name == "Kaza", "Folder Name Sets");
     assert.ok(folder.uuid != undefined, "Folder UUID Sets");
     folder = pModel.addFolder("Yangin");
     assert.ok(pModel.folders.length == 2, "Second Folder Added");
     folder = pModel.addFolder();
     assert.ok(folder.name == null, "Folder Name Null If Params Not Gives");
 });

 QUnit.test("getFolder", function(assert) {
     var pModel = pModelFactory.newModel();
     assert.ok(pModel.folders.length == 0, "No Folder Added Yet");
     var folder = pModel.getFolder();
     assert.ok(folder == null, "uuid params not passed then folder null");
     var folder = pModel.getFolder("a1234")
     assert.ok(folder == null, "undefined uuid params passed then folder null");
     folder = pModel.addFolder("Kaza");
     assert.ok(folder.uuid == pModel.getFolder(folder.uuid).uuid, "uuid check okay");
     assert.ok(folder.name == pModel.getFolder(folder.uuid).name, "name check okay");
 });



 QUnit.test("getFolderIndex", function(assert) {
     var pModel = pModelFactory.newModel();
     assert.ok(pModel.getFolderIndex() == null, "No params passing result is Null");
     assert.ok(pModel.getFolderIndex("av1") == null, "Invalid params passing result is Null");
     pModel.addFolder("Kaza");
     pModel.addFolder("Yangın");
     var fDeprem = pModel.addFolder("Deprem");
     assert.ok(pModel.getFolderIndex(fDeprem.uuid) == 2, "Deprem is 2 Index");
 });



 QUnit.test("listFolder", function(assert) {
     var pModel = pModelFactory.newModel();
     assert.ok(pModel.listFolder() != null, "Initial Folders not null");
     assert.ok(Array.isArray(pModel.listFolder()), "Initial Folders type is array");
     assert.ok(pModel.listFolder().length == 0, "Initial Folders is empty");
     pModel.addFolder("Kaza");
     pModel.addFolder("Yangın");
     pModel.addFolder("Deprem");
     assert.ok(pModel.listFolder().length == 3, "List Folders has 3 folder");
 });



 QUnit.test("updateFolder", function(assert) {
     var pModel = pModelFactory.newModel();
     var folder = pModel.addFolder("Kaza");
     pModel.updateFolder(folder.uuid);
     assert.ok(folder.name == "Kaza", "Params Null Then Nothing Changed");

     var params = { xyz: "abc" };
     pModel.updateFolder(folder.uuid, params);
     assert.ok(folder.name == "Kaza", "Params Not Has Prop Name");

     params = { name: "abc" };
     pModel.updateFolder(folder.uuid, params);
     assert.ok(folder.name == "abc", "Params Set Name Property abc");

 });


 QUnit.test("deleteFolder", function(assert) {

     var pModel = pModelFactory.newModel();
     var folder1 = pModel.addFolder("Kaza");
     var folder2 = pModel.addFolder("Yangin");
     var folder3 = pModel.addFolder("Deprem");
     assert.ok(pModel.listFolder().length == 3, "Added 3 folder");
     pModel.deleteFolder(folder2.uuid);
     assert.ok(pModel.listFolder().length == 2, "Removed 1 and 2 folder Back");
     assert.ok(pModel.getFolder(folder2.uuid) == null, "Folder2 Removed Succeded");

 });


 /*================================================================
 * FORMULA
 =================================================================*/


 QUnit.test("addFormula", function(assert) {
     var pModel = pModelFactory.newModel();
     var folder = pModel.addFolder("Kaza");
     pModel.addFormula(folder.uuid, "FerdiKaza2015");
     pModel.addFormula(folder.uuid, "FerdiKaza2016");
     pModel.addFormula(folder.uuid, "FerdiKaza2017");
     assert.ok(pModel.listFormula(folder.uuid).length == 3, "Add 3 Formula to Kaza OK");

     folder = pModel.addFolder("Yangin");
     pModel.addFormula(folder.uuid, "Yangin2015");
     pModel.addFormula(folder.uuid, "Yangin2016");
     assert.ok(pModel.listFormula(folder.uuid).length == 2, "Add 2 Formula Yangin OK");
 });



 QUnit.test("getFormulaIndex", function(assert) {
     var pModel = pModelFactory.newModel();
     var folder = pModel.addFolder("Kaza");
     var folder2 = pModel.addFolder("Yangin");
     pModel.addFormula(folder.uuid, "FerdiKaza2015");
     var formula2 = pModel.addFormula(folder.uuid, "FerdiKaza2016");
     pModel.addFormula(folder.uuid, "FerdiKaza2017");
     assert.ok(pModel.listFormula(folder.uuid).length == 3, "Add 3 Formula to Ferdi Kaza OK");
     formulaIndex = pModel.getFormulaIndex(folder.uuid, formula2.uuid);
     assert.ok(formulaIndex === 1, "Get FormulaIndex OK");
 });


 QUnit.test("listFormula", function(assert) {
     var pModel = pModelFactory.newModel();
     var folder = pModel.addFolder("Kaza");
     pModel.addFormula(folder.uuid, "FerdiKaza2015");
     pModel.addFormula(folder.uuid, "FerdiKaza2016");
     pModel.addFormula(folder.uuid, "FerdiKaza2017");
     assert.ok(pModel.listFormula(folder.uuid).length == 3, "Add 3 Formula to Kaza OK And List Formula Tested");

     folder = pModel.addFolder("Yangin");
     pModel.addFormula(folder.uuid, "Yangin2015");
     pModel.addFormula(folder.uuid, "Yangin2016");
     assert.ok(pModel.listFormula(folder.uuid).length == 2, "Add 2 Formula Yangin OK List Formula Tested");
 });

 QUnit.test("updateFormula", function(assert) {
     var pModel = pModelFactory.newModel();
     var folder = pModel.addFolder("Kaza");
     pModel.addFormula(folder.uuid, "FerdiKaza2015");
     formula = pModel.addFormula(folder.uuid, "FerdiKaza2016");

     pModel.updateFormula(formula.uuid)
     var xFormula = pModel.getFormula(formula.uuid);
     assert.ok(xFormula.name == "FerdiKaza2016", "Params Null Then Nothing Changed");

     var params = { xyz: "abc" };
     pModel.updateFormula(formula.uuid, params);
     xFormula = pModel.getFormula(formula.uuid);
     assert.ok(xFormula.name == "FerdiKaza2016", "Params Not Has Prop Name");

     params = { name: "abc" };
     pModel.updateFormula(formula.uuid, params);
     xFormula = pModel.getFormula(formula.uuid);
     assert.ok(xFormula.name == "abc", "Params Set Name Property abc");

 });



 QUnit.test("deleteFormula", function(assert) {

     var pModel = pModelFactory.newModel();
     var folder = pModel.addFolder("Kaza");
     pModel.addFormula(folder.uuid, "FerdiKaza2015");
     pModel.addFormula(folder.uuid, "FerdiKaza2016");
     var formula2 = pModel.addFormula(folder.uuid, "FerdiKaza2017");
     assert.ok(pModel.listFormula(folder.uuid).length == 3, "Add 3 Formula to Kaza OK And List Formula Tested");

     pModel.deleteFormula(formula2.uuid);
     assert.ok(pModel.listFormula(folder.uuid).length == 2, "Removed 1 and 2 formulas Back");
     assert.ok(pModel.getFormula(formula2.uuid) == null, "Formula Removed Succeded");

 });



 /*================================================================
 *   VARIABLE
 =================================================================*/

 QUnit.test("addVariable", function(assert) {
     var pModel = pModelFactory.newModel();
     var folder = pModel.addFolder("Kaza");
     pModel.addFormula(folder.uuid, "FerdiKaza2015");
     var formula = pModel.addFormula(folder.uuid, "FerdiKaza2016");
     var formula2 = pModel.addFormula(folder.uuid, "FerdiKaza2017");



     pModel.addVariable(formula.uuid, "Sex");
     pModel.addVariable(formula.uuid, "Age");
     pModel.addVariable(formula.uuid, "Job");

     assert.ok(pModel.listVariable(formula.uuid).length == 3, "Add 3 Variable to FerdiKaza2016 OK");


     pModel.addVariable(formula2.uuid, "Sex");
     pModel.addVariable(formula2.uuid, "Age");

     assert.ok(pModel.listVariable(formula2.uuid).length == 2, "Add 2 Variable to FerdiKaza2017 OK");



 });


 QUnit.test("getVariable", function(assert) {
     var pModel = pModelFactory.newModel();
     var folder = pModel.addFolder("Kaza");
     pModel.addFormula(folder.uuid, "FerdiKaza2015");
     var formula = pModel.addFormula(folder.uuid, "FerdiKaza2016");
     pModel.addVariable(formula.uuid, "Sex");
     pModel.addVariable(formula.uuid, "Age");
     var variable = pModel.addVariable(formula.uuid, "Job");
     assert.ok(pModel.listVariable(formula.uuid).length == 3, "Add 3 Variable to FerdiKaza2016 OK");
     assert.ok(pModel.getVariable(variable.uuid).name === variable.name, "Get Variable OK");
 });


 QUnit.test("getVariableIndex", function(assert) {
     var pModel = pModelFactory.newModel();
     var folder = pModel.addFolder("Kaza");
     pModel.addFormula(folder.uuid, "FerdiKaza2015");
     var formula = pModel.addFormula(folder.uuid, "FerdiKaza2016");
     pModel.addVariable(formula.uuid, "Sex");
     pModel.addVariable(formula.uuid, "Age");
     var variable = pModel.addVariable(formula.uuid, "Job");
     assert.ok(pModel.listVariable(formula.uuid).length == 3, "Add 3 Variable to FerdiKaza2016 OK");
     assert.ok(pModel.getVariableIndex(formula.uuid, variable.uuid) === 2, "Get VariableIndex OK");
 });




 QUnit.test("listVariable", function(assert) {
     var pModel = pModelFactory.newModel();
     var folder = pModel.addFolder("Kaza");
     pModel.addFormula(folder.uuid, "FerdiKaza2015");
     var formula = pModel.addFormula(folder.uuid, "FerdiKaza2016");
     var formula2 = pModel.addFormula(folder.uuid, "FerdiKaza2017");

     pModel.addVariable(formula.uuid, "Sex");
     pModel.addVariable(formula.uuid, "Age");
     pModel.addVariable(formula.uuid, "Job");

     assert.ok(pModel.listVariable(formula.uuid).length == 3, "Add 3 Variable to FerdiKaza2016 and ListVariables OK");
     pModel.addVariable(formula2.uuid, "Sex");
     pModel.addVariable(formula2.uuid, "Age");

     assert.ok(pModel.listVariable(formula2.uuid).length == 2, "Add 2 Variable to FerdiKaza2017 and and ListVariables OK");

 });



 QUnit.test("updateVariable", function(assert) {
     var pModel = pModelFactory.newModel();
     var folder = pModel.addFolder("Kaza");
     pModel.addFormula(folder.uuid, "FerdiKaza2015");
     var formula = pModel.addFormula(folder.uuid, "FerdiKaza2016");
     var formula2 = pModel.addFormula(folder.uuid, "FerdiKaza2017");

     pModel.addVariable(formula.uuid, "Sex");
     var variable = pModel.addVariable(formula.uuid, "Age");
     pModel.addVariable(formula.uuid, "Job");

     pModel.updateVariable(variable.uuid)
     var xVariable = pModel.getVariable(variable.uuid);
     assert.ok(xVariable.name == "Age", "Params Null Then Nothing Changed");

     var params = { xyz: "abc" };
     pModel.updateVariable(variable.uuid, params)
     var xVariable = pModel.getVariable(variable.uuid);
     assert.ok(xVariable.name == "Age", "Params Not Has Prop Name");

     var params = { name: "abc" };
     pModel.updateVariable(variable.uuid, params)
     var xVariable = pModel.getVariable(variable.uuid);
     assert.ok(xVariable.name == "abc", "Params Set Name Property abc");

 });


 QUnit.test("deleteVariable", function(assert) {

     var pModel = pModelFactory.newModel();
     var folder = pModel.addFolder("Kaza");
     pModel.addFormula(folder.uuid, "FerdiKaza2015");
     var formula = pModel.addFormula(folder.uuid, "FerdiKaza2016");
     var formula2 = pModel.addFormula(folder.uuid, "FerdiKaza2017");

     pModel.addVariable(formula.uuid, "Sex");
     pModel.addVariable(formula.uuid, "Age");
     var variable = pModel.addVariable(formula.uuid, "Job");

     assert.ok(pModel.listVariable(formula.uuid).length == 3, "Add 3 Variable to FerdiKaza2016 and ListVariables OK");

     pModel.deleteVariable(variable.uuid);
     assert.ok(pModel.listVariable(formula.uuid).length == 2, "Removed 1 and 2 variables Back");
     assert.ok(pModel.getVariable(variable.uuid) == null, "Formula Removed Succeded");

 });




 /*================================================================
 *   LAYERS
 =================================================================*/

 QUnit.test("addLayer", function(assert) {
     var pModel = pModelFactory.newModel();
     var folder = pModel.addFolder("Kaza");
     pModel.addFormula(folder.uuid, "FerdiKaza2015");
     var formula = pModel.addFormula(folder.uuid, "FerdiKaza2016");
     var formula2 = pModel.addFormula(folder.uuid, "FerdiKaza2017");



     pModel.addLayer(formula.uuid, "Layer1");
     pModel.addLayer(formula.uuid, "Layer2");
     pModel.addLayer(formula.uuid, "Layer3");

     assert.ok(pModel.listLayer(formula.uuid).length == 4, "Add 3 Layer and Default (Result Layer) FerdiKaza2016 OK");


     pModel.addLayer(formula2.uuid, "Layer1");
     pModel.addLayer(formula2.uuid, "Layer2");

     assert.ok(pModel.listLayer(formula2.uuid).length == 3, "Add 2 Layer and and Default (Result Layer) FerdiKaza2017 OK");



 });



 QUnit.test("getLayer", function(assert) {
     var pModel = pModelFactory.newModel();
     var folder = pModel.addFolder("Kaza");
     pModel.addFormula(folder.uuid, "FerdiKaza2015");
     var formula = pModel.addFormula(folder.uuid, "FerdiKaza2016");
     var formula2 = pModel.addFormula(folder.uuid, "FerdiKaza2017");



     pModel.addLayer(formula.uuid, "Layer1");
     pModel.addLayer(formula.uuid, "Layer2");
     var layer = pModel.addLayer(formula.uuid, "Layer3");

     assert.ok(pModel.listLayer(formula.uuid).length == 4, "Add 3 Layer and Default (Result Layer) to FerdiKaza2016 OK");
     assert.ok(pModel.getLayer(layer.uuid).name === layer.name, "Get Layer OK");
 });





 QUnit.test("getLayerIndex", function(assert) {
     var pModel = pModelFactory.newModel();
     var folder = pModel.addFolder("Kaza");
     pModel.addFormula(folder.uuid, "FerdiKaza2015");
     var formula = pModel.addFormula(folder.uuid, "FerdiKaza2016");
     var formula2 = pModel.addFormula(folder.uuid, "FerdiKaza2017");



     pModel.addLayer(formula.uuid, "Layer1");
     pModel.addLayer(formula.uuid, "Layer2");
     var layer = pModel.addLayer(formula.uuid, "Layer3");

     assert.ok(pModel.listLayer(formula.uuid).length == 4, "Add 3 Layer  and Default (Result Layer)to FerdiKaza2016 OK");
     assert.ok(pModel.getLayerIndex(formula.uuid, layer.uuid) === 3, "Get LayerIndex OK");
 });



 QUnit.test("listLayer", function(assert) {
     var pModel = pModelFactory.newModel();
     var folder = pModel.addFolder("Kaza");
     pModel.addFormula(folder.uuid, "FerdiKaza2015");
     var formula = pModel.addFormula(folder.uuid, "FerdiKaza2016");
     var formula2 = pModel.addFormula(folder.uuid, "FerdiKaza2017");



     pModel.addLayer(formula.uuid, "Layer1");
     pModel.addLayer(formula.uuid, "Layer2");
     pModel.addLayer(formula.uuid, "Layer3");

     assert.ok(pModel.listLayer(formula.uuid).length == 4, "Add 3 Layer and Default (Result Layer) to FerdiKaza2016 OK");


     pModel.addLayer(formula2.uuid, "Layer1");
     pModel.addLayer(formula2.uuid, "Layer2");

     assert.ok(pModel.listLayer(formula2.uuid).length == 3, "Add 2 Layer and Default (Result Layer) to FerdiKaza2017 OK");

 });


 QUnit.test("updateLayer", function(assert) {
     var pModel = pModelFactory.newModel();
     var folder = pModel.addFolder("Kaza");
     pModel.addFormula(folder.uuid, "FerdiKaza2015");
     var formula = pModel.addFormula(folder.uuid, "FerdiKaza2016");
     var formula2 = pModel.addFormula(folder.uuid, "FerdiKaza2017");

     pModel.addLayer(formula.uuid, "Layer1");
     var layer = pModel.addLayer(formula.uuid, "Layer2");
     pModel.addLayer(formula.uuid, "Layer3");

     pModel.updateLayer(layer.uuid)
     var xLayer = pModel.getLayer(layer.uuid);
     assert.ok(xLayer.name == "Layer2", "Params Null Then Nothing Changed");

     var params = { xyz: "abc" };
     pModel.updateLayer(layer.uuid, params)
     var xLayer = pModel.getLayer(layer.uuid);
     assert.ok(xLayer.name == "Layer2", "Params Not Has Prop Name");

     var params = { name: "abc" };
     pModel.updateLayer(layer.uuid, params)
     var xLayer = pModel.getLayer(layer.uuid);
     assert.ok(xLayer.name == "abc", "Params Set Name Property abc");

 });



 /*================================================================
 *   BOXES
 =================================================================*/

 QUnit.test("addBoxes", function(assert) {
     var pModel = pModelFactory.newModel();
     var folder = pModel.addFolder("Kaza");
     pModel.addFormula(folder.uuid, "FerdiKaza2015");
     var formula = pModel.addFormula(folder.uuid, "FerdiKaza2016");
     var layer = pModel.addLayer(formula.uuid, "Layer1");
     var layer2 = pModel.addLayer(formula.uuid, "Layer2");
     pModel.addBox(layer.uuid, "Box1");
     pModel.addBox(layer.uuid, "Box2");
     pModel.addBox(layer.uuid, "Box3");

     assert.ok(pModel.listBox(layer.uuid).length === 3, "Add 3 Box to Layer1 OK");

     pModel.addBox(layer2.uuid, "Box4");
     pModel.addBox(layer2.uuid, "Box5");

     assert.ok(pModel.listBox(layer2.uuid).length === 2, "Add 2 Box to Layer2 OK");

 });



 QUnit.test("listBox", function(assert) {
     var pModel = pModelFactory.newModel();
     var folder = pModel.addFolder("Kaza");
     pModel.addFormula(folder.uuid, "FerdiKaza2015");
     var formula = pModel.addFormula(folder.uuid, "FerdiKaza2016");
     var layer = pModel.addLayer(formula.uuid, "Layer1");
     var layer2 = pModel.addLayer(formula.uuid, "Layer2");
     pModel.addBox(layer.uuid, "Box1")
     pModel.addBox(layer.uuid, "Box2")
     pModel.addBox(layer.uuid, "Box3")

     assert.ok(pModel.listBox(layer.uuid).length == 3, "Add 3 Box to Layer1 OK");

     pModel.addBox(layer2.uuid, "Box4");
     pModel.addBox(layer2.uuid, "Box5");

     assert.ok(pModel.listBox(layer2.uuid).length == 2, "Add 2 Box to Layer2 OK");

 });

 QUnit.test("getBox", function(assert) {
     var pModel = pModelFactory.newModel();
     var folder = pModel.addFolder("Kaza");
     pModel.addFormula(folder.uuid, "FerdiKaza2015");
     var formula = pModel.addFormula(folder.uuid, "FerdiKaza2016");
     var layer = pModel.addLayer(formula.uuid, "Layer1");
     var layer2 = pModel.addLayer(formula.uuid, "Layer2");
     pModel.addBox(layer.uuid, "Box1")
     var box = pModel.addBox(layer.uuid, "Box2")
     pModel.addBox(layer.uuid, "Box3")

     assert.ok(pModel.listBox(layer.uuid).length == 3, "Add 3 Box to Layer1 OK");
     assert.ok(pModel.getBox(box.uuid).name === box.name, "Get Box OK");
 });



 QUnit.test("getBoxIndex", function(assert) {
     var pModel = pModelFactory.newModel();
     var folder = pModel.addFolder("Kaza");
     pModel.addFormula(folder.uuid, "FerdiKaza2015");
     var formula = pModel.addFormula(folder.uuid, "FerdiKaza2016");
     var layer = pModel.addLayer(formula.uuid, "Layer1");
     pModel.addBox(layer.uuid, "Box1")
     var box = pModel.addBox(layer.uuid, "Box2")
     pModel.addBox(layer.uuid, "Box3")

     assert.ok(pModel.listBox(layer.uuid).length == 3, "Add 3 Box to Layer1 OK");
     assert.ok(pModel.getBoxIndex(layer.uuid, box.uuid) === 1, "Get Box Index OK");
 });



 QUnit.test("updateBox", function(assert) {
     var pModel = pModelFactory.newModel();
     var folder = pModel.addFolder("Kaza");
     pModel.addFormula(folder.uuid, "FerdiKaza2015");
     var formula = pModel.addFormula(folder.uuid, "FerdiKaza2016");
     var formula2 = pModel.addFormula(folder.uuid, "FerdiKaza2017");

     pModel.addLayer(formula.uuid, "Layer1");
     var layer = pModel.addLayer(formula.uuid, "Layer2");
     pModel.addLayer(formula.uuid, "Layer3");

     pModel.addBox(layer.uuid, "Box1")
     var box = pModel.addBox(layer.uuid, "Box2")
     pModel.addBox(layer.uuid, "Box3")

     pModel.updateBox(box.uuid)
     var xBox = pModel.getBox(box.uuid);
     assert.ok(xBox.name == "Box2", "Params Null Then Nothing Changed");

     var params = { xyz: "abc" };
     pModel.updateBox(box.uuid, params)
     xBox = pModel.getBox(box.uuid);
     assert.ok(xBox.name == "Box2", "Params Not Has Prop Name");

     var params = { name: "abc" };
     pModel.updateBox(box.uuid, params)
     xBox = pModel.getBox(box.uuid);
     assert.ok(xBox.name == "abc", "Params Set Name Property abc");
 });



 QUnit.test("deleteBox", function(assert) {

     var pModel = pModelFactory.newModel();
     var folder = pModel.addFolder("Kaza");
     pModel.addFormula(folder.uuid, "FerdiKaza2015");
     var formula = pModel.addFormula(folder.uuid, "FerdiKaza2016");
     var layer = pModel.addLayer(formula.uuid, "Layer1");
     pModel.addBox(layer.uuid, "Box1")
     var box = pModel.addBox(layer.uuid, "Box2")
     pModel.addBox(layer.uuid, "Box3")

     assert.ok(pModel.listBox(layer.uuid).length == 3, "Add 3 Box to Layer1 OK");

     pModel.deleteBox(box.uuid);
     assert.ok(pModel.listBox(layer.uuid).length == 2, "Removed 1 and 2 variables Back");
     assert.ok(pModel.getBox(box.uuid) == null, "Formula Removed Succeded");

 });



 /*================================================================
 *   BOXES IO
 =================================================================*/

 QUnit.test("addBoxesIO", function(assert) {
     var pModel = pModelFactory.newModel();
     var folder = pModel.addFolder("Kaza");
     var formula = pModel.addFormula(folder.uuid, "FerdiKaza2016");
     var layer = pModel.addLayer(formula.uuid, "Layer1");
     var box = pModel.addBox(layer.uuid, "Box1")
     var var1 = pModel.addVariable(formula.uuid, "Sex");
     var var2 = pModel.addVariable(formula.uuid, "Age");
     var var3 = pModel.addVariable(formula.uuid, "Result1");

     pModel.addBoxIO(box.uuid, "input", var1.uuid);
     pModel.addBoxIO(box.uuid, "input", var2.uuid);
     pModel.addBoxIO(box.uuid, "output", var3.uuid);

     assert.ok(pModel.listBoxIO(box.uuid, "input").length == 2, "Add 2 Input BoxIO to Box1 OK");
     assert.ok(pModel.listBoxIO(box.uuid, "output").length == 1, "Add 1 Output BoxIO to Box1 OK");

 });




 QUnit.test("listBoxIO", function(assert) {
     var pModel = pModelFactory.newModel();
     var folder = pModel.addFolder("Kaza");
     var formula = pModel.addFormula(folder.uuid, "FerdiKaza2016");
     var layer = pModel.addLayer(formula.uuid, "Layer1");
     var box = pModel.addBox(layer.uuid, "Box1")
     var var1 = pModel.addVariable(formula.uuid, "Sex");
     var var2 = pModel.addVariable(formula.uuid, "Age");
     var var3 = pModel.addVariable(formula.uuid, "Result1");

     pModel.addBoxIO(box.uuid, "input", var1.uuid);
     pModel.addBoxIO(box.uuid, "input", var2.uuid);
     pModel.addBoxIO(box.uuid, "output", var3.uuid);

     assert.ok(pModel.listBoxIO(box.uuid, "input").length == 2, "Add 2 Input BoxIO to Box1 OK");
     assert.ok(pModel.listBoxIO(box.uuid, "output").length == 1, "Add 1 Output BoxIO to Box1 OK");

 });


 QUnit.test("getBoxIO", function(assert) {
     var pModel = pModelFactory.newModel();
     var folder = pModel.addFolder("Kaza");
     var formula = pModel.addFormula(folder.uuid, "FerdiKaza2016");
     var layer = pModel.addLayer(formula.uuid, "Layer1");
     var box = pModel.addBox(layer.uuid, "Box1")
     var var1 = pModel.addVariable(formula.uuid, "Sex");
     var var2 = pModel.addVariable(formula.uuid, "Age");
     var var3 = pModel.addVariable(formula.uuid, "Result1");

     var boxIO1 = pModel.addBoxIO(box.uuid, "input", var1.uuid);
     var boxIO2 = pModel.addBoxIO(box.uuid, "input", var2.uuid);
     var boxIO3 = pModel.addBoxIO(box.uuid, "output", var3.uuid);

     assert.ok(pModel.listBoxIO(box.uuid, "input").length == 2, "Add 2 Input BoxIO to Box1 OK");
     assert.ok(pModel.listBoxIO(box.uuid, "output").length == 1, "Add 1 Output BoxIO to Box1 OK");
     var xBoxIO = pModel.getBoxIO(boxIO1.uuid);
     assert.ok(xBoxIO.name == boxIO1.name, "Get Box IO1 true");

 });


 QUnit.test("getBoxIOIndex", function(assert) {
     var pModel = pModelFactory.newModel();
     var folder = pModel.addFolder("Kaza");
     var formula = pModel.addFormula(folder.uuid, "FerdiKaza2016");
     var layer = pModel.addLayer(formula.uuid, "Layer1");
     var box = pModel.addBox(layer.uuid, "Box1")
     var var1 = pModel.addVariable(formula.uuid, "Sex");
     var var2 = pModel.addVariable(formula.uuid, "Age");
     var var3 = pModel.addVariable(formula.uuid, "Result1");

     var boxIO1 = pModel.addBoxIO(box.uuid, "input", var1.uuid);
     var boxIO2 = pModel.addBoxIO(box.uuid, "input", var2.uuid);
     var boxIO3 = pModel.addBoxIO(box.uuid, "output", var3.uuid);

     assert.ok(pModel.listBoxIO(box.uuid, "input").length == 2, "Add 2 Input BoxIO to Box1 OK");
     assert.ok(pModel.listBoxIO(box.uuid, "output").length == 1, "Add 1 Output BoxIO to Box1 OK");
     var xBoxIOIndex = pModel.getBoxIOIndex(box.uuid, boxIO2.uuid);
     assert.ok(xBoxIOIndex == 1, "Get BoxIO Index Input  true");
     xBoxIOIndex = pModel.getBoxIOIndex(box.uuid, boxIO3.uuid);
     assert.ok(xBoxIOIndex == 0, "Get BoxIO Index Output true");


 });


 QUnit.test("deleteBoxIO", function(assert) {

     var pModel = pModelFactory.newModel();
     var folder = pModel.addFolder("Kaza");
     var formula = pModel.addFormula(folder.uuid, "FerdiKaza2016");
     var layer = pModel.addLayer(formula.uuid, "Layer1");
     var box = pModel.addBox(layer.uuid, "Box1")
     var var1 = pModel.addVariable(formula.uuid, "Sex");
     var var2 = pModel.addVariable(formula.uuid, "Age");
     var var3 = pModel.addVariable(formula.uuid, "Result1");

     var boxIO1 = pModel.addBoxIO(box.uuid, "input", var1.uuid);
     var boxIO2 = pModel.addBoxIO(box.uuid, "input", var2.uuid);
     var boxIO3 = pModel.addBoxIO(box.uuid, "output", var3.uuid);

     assert.ok(pModel.listBoxIO(box.uuid, "input").length == 2, "Add 2 Input BoxIO to Box1 OK");
     assert.ok(pModel.listBoxIO(box.uuid, "output").length == 1, "Add 1 Output BoxIO to Box1 OK");

     pModel.deleteBoxIO(boxIO2.uuid);
     pModel.deleteBoxIO(boxIO3.uuid);
     assert.ok(pModel.listBoxIO(box.uuid, "input").length == 1, "Removed 1 and 1 variables Back");
     assert.ok(pModel.listBoxIO(box.uuid, "output").length == 0, "Removed 1 and 0 variables Back");

 });




 QUnit.test("toJSON_fromJSON", function(assert) {
     var jsonStr = '{"version":"0.0.4","folders":[{"name":"Yeni","uuid":"000034e1-d0ff-68d2-6014-93bfa492ad91","formulas":[{"name":"formul1","uuid":"f21a936d-0dae-52e9-6d35-48f034292849","folderUUID":"000034e1-d0ff-68d2-6014-93bfa492ad91","variables":[{"name":"age","uuid":"10ebdcec-d182-930c-623a-e650f5b14af5","type":"Integer","holderUUID":"","formulaUUID":"f21a936d-0dae-52e9-6d35-48f034292849"}],"layers":[{"name":"ResultLayer","uuid":"f7050a87-8313-eecc-b810-a994ef5ab50a","layerIndex":9007199254740991,"formulaUUID":"f21a936d-0dae-52e9-6d35-48f034292849","boxes":[{"name":"ResultBox","uuid":"17bda17f-fc4e-13cc-d286-ce48dcd33569","layerUUID":"f7050a87-8313-eecc-b810-a994ef5ab50a","inputs":[],"outputs":[{"name":"","uuid":"68951729-4d7f-1ab9-57ac-e4a83646d195","boxUUID":"17bda17f-fc4e-13cc-d286-ce48dcd33569","variableUUID":"d30b826f-784f-46a8-b6f8-e4644eb1740b","type":"output"}],"type":"CodeBlock","decisiontable_url":"","codeblock_text":"@result = @Katman_1_KT_1_Result  * 2"}]},{"name":"Katman_1","uuid":"31a49e7c-e5ba-8c6f-9d23-ee8ec435909b","layerIndex":1,"formulaUUID":"f21a936d-0dae-52e9-6d35-48f034292849","boxes":[{"name":"Katman_1_KT_1","uuid":"d30b826f-784f-46a8-b6f8-e4644eb1740b","layerUUID":"31a49e7c-e5ba-8c6f-9d23-ee8ec435909b","inputs":[{"name":"","uuid":"adf4c0a0-0a8f-fa96-09cd-299e65803118","boxUUID":"d30b826f-784f-46a8-b6f8-e4644eb1740b","variableUUID":"10ebdcec-d182-930c-623a-e650f5b14af5","type":"input"}],"outputs":[],"type":"CodeBlock","decisiontable_url":"","codeblock_text":"if ( @answer.age >18 ) @result = 1500; else @result =1000;"}]}],"layerLastIndex":2}]}],"versions":[{"formulaUUID":"fddcd637-7332-8e1d-3861-ee349af96514","uuid":"46db3f68-b726-db09-d89b-9e3b9414b731","formulaHeads":[{"uuid":"f6e54033-502d-6aaf-29b4-847fa7c6ee85","versionUUID":"46db3f68-b726-db09-d89b-9e3b9414b731","formulaUUID":"70d77689-4151-9127-77d7-217c5b5fec36","baseFormulaUUID":"fddcd637-7332-8e1d-3861-ee349af96514","startDate":"01/01/2016"}]}]}';
     var pModel = pModelFactory.newModel();
     pModel.fromJSON(JSON.parse(jsonStr));
     //console.log(pModel.toJSON());
     //console.log(jsonStr);
     assert.ok(jsonStr == pModel.toJSON(), "toJSON fromJSON is OK");


 });