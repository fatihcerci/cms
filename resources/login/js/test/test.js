 QUnit.module("pTestSuite");

 QUnit.test("addSuite", function(assert) {
     var tSuite = pTestFactory.newTestSuite();
     var suite = tSuite.addSuite("Formula0001");
     assert.ok(tSuite.suites.length == 1, "One Suite Added");
     assert.ok(suite.formulaUUID == "Formula0001", "Suite FormulaUUID Sets");
     assert.ok(suite.uuid != undefined, "Suite UUID Sets");
     suite = tSuite.addSuite("Formula0002");
     assert.ok(tSuite.suites.length == 2, "Second Suites Added");
     suite = tSuite.addSuite();
     assert.ok(suite.formulaUUID == null, "Suite FormulaUUID Null If Params Not Gives");
 });



 QUnit.test("getSuite", function(assert) {
     var tSuite = pTestFactory.newTestSuite();    
     assert.ok(tSuite.suites.length == 0, "No Suite Added Yet");
     var suite = tSuite.getSuite();
     assert.ok(suite == null, "uuid params not passed then suite null");
     var suite = tSuite.getSuite("a1234")
     assert.ok(suite == null, "undefined uuid params passed then suite null");
     suite = tSuite.addSuite("Formula001");
     assert.ok(suite.uuid == tSuite.getSuite(suite.uuid).uuid, "uuid check okay");
     assert.ok(suite.formulaUUID == tSuite.getSuite(suite.uuid).formulaUUID, "formulaUUID check okay");
 });


 QUnit.test("getSuiteIndex", function(assert) {
     var pSuite = pTestFactory.newTestSuite();
     assert.ok(pSuite.getSuiteIndex() == null, "No params passing result is Null");
     assert.ok(pSuite.getSuiteIndex("av1") == null, "Invalid params passing result is Null");
     pSuite.addSuite("Age");
     pSuite.addSuite("Sex");
     var fmarriage = pSuite.addSuite("Marriage");
     assert.ok(pSuite.getSuiteIndex(fmarriage.uuid) == 2, "Marriage is 2 Index");
 });


 QUnit.test("listSuite", function(assert) {
     var pSuite = pTestFactory.newTestSuite();
     assert.ok(pSuite.listSuite() != null, "Initial Suites not null");
     assert.ok(Array.isArray(pSuite.listSuite()), "Initial Suites type is array");
     assert.ok(pSuite.listSuite().length == 0, "Initial Suites is empty");
     pSuite.addSuite("Age");
     pSuite.addSuite("Sex");
     pSuite.addSuite("Marriage");
     assert.ok(pSuite.listSuite().length == 3, "List Suites has 3 suite");
 });


 QUnit.test("deleteSuite", function(assert) {

     var pSuite = pTestFactory.newTestSuite();
     var suite1 = pSuite.addSuite("age");
     var suite2 = pSuite.addSuite("sex");
     var suite3 = pSuite.addSuite("marriage");
     assert.ok(pSuite.listSuite().length == 3, "Added 3 suite");
     pSuite.deleteSuite(suite2.uuid);
     assert.ok(pSuite.listSuite().length == 2, "Removed 1 and 2 suite Back");
     assert.ok(pSuite.getSuite(suite2.uuid) == null, "Suite2 Removed Succeded");

 });




  /*================================================================
 * TESTS
 =================================================================*/



 QUnit.test("addTest", function(assert) {
     var tSuite = pTestFactory.newTestSuite();
     var suite = tSuite.addSuite("Sex");
     tSuite.addTest(suite.uuid, "Man");
     tSuite.addTest(suite.uuid, "Woman");
     tSuite.addTest(suite.uuid, "Other");
     assert.ok(tSuite.listTest(suite.uuid).length == 3, "Add 3 Test to Sex OK");

     suite = tSuite.addSuite("Age");
     tSuite.addTest(suite.uuid, "LessThen18");
     tSuite.addTest(suite.uuid, "BiggenThen18");
     assert.ok(tSuite.listTest(suite.uuid).length == 2, "Add 2 Test Age OK");
 });



 QUnit.test("getTestIndex", function(assert) {
     var tSuite = pTestFactory.newTestSuite();
     var suite = tSuite.addSuite("Sex");
     var suite2 = tSuite.addSuite("Age");
     tSuite.addTest(suite.uuid, "FerdiSex2015");
     var test2 = tSuite.addTest(suite.uuid, "FerdiSex2016");
     tSuite.addTest(suite.uuid, "FerdiSex2017");
     assert.ok(tSuite.listTest(suite.uuid).length == 3, "Add 3 Test to Sex OK");
     testIndex = tSuite.getTestIndex(suite.uuid, test2.uuid);
     assert.ok(testIndex === 1, "Get TestIndex OK");
 });


 QUnit.test("listTest", function(assert) {
     var tSuite = pTestFactory.newTestSuite();
     var suite = tSuite.addSuite("Sex");
     tSuite.addTest(suite.uuid, "Man");
     tSuite.addTest(suite.uuid, "Woman");
     tSuite.addTest(suite.uuid, "Other");
     assert.ok(tSuite.listTest(suite.uuid).length == 3, "Add 3 Test to Sex OK And List Test Tested");

     suite = tSuite.addSuite("Age");
     tSuite.addTest(suite.uuid, "LessThen18");
     tSuite.addTest(suite.uuid, "BiggenThen18");
     assert.ok(tSuite.listTest(suite.uuid).length == 2, "Add 2 Test Age OK List Test Tested");
 });

 QUnit.test("updateTest", function(assert) {
     var tSuite = pTestFactory.newTestSuite();
     var suite = tSuite.addSuite("Sex");
     tSuite.addTest(suite.uuid, "Man");
     test = tSuite.addTest(suite.uuid, "Woman");

     tSuite.updateTest(test.uuid)
     var xTest = tSuite.getTest(test.uuid);
     assert.ok(xTest.name == "Woman", "Params Null Then Nothing Changed");

     var params = { xyz: "abc" };
     tSuite.updateTest(test.uuid, params);
     xTest = tSuite.getTest(test.uuid);
     assert.ok(xTest.name == "Woman", "Params Not Has Prop Name");

     params = { name: "abc" };
     tSuite.updateTest(test.uuid, params);
     xTest = tSuite.getTest(test.uuid);
     assert.ok(xTest.name == "abc", "Params Set Name Property abc");

 });



 QUnit.test("deleteTest", function(assert) {

     var tSuite = pTestFactory.newTestSuite();
     var suite = tSuite.addSuite("Sex");
     tSuite.addTest(suite.uuid, "Man");
     tSuite.addTest(suite.uuid, "Woman");
     var test2 = tSuite.addTest(suite.uuid, "Other");
     assert.ok(tSuite.listTest(suite.uuid).length == 3, "Add 3 Test to Sex OK And List Test Tested");

     tSuite.deleteTest(test2.uuid);
     assert.ok(tSuite.listTest(suite.uuid).length == 2, "Removed 1 and 2 formulas Back");
     assert.ok(tSuite.getTest(test2.uuid) == null, "Test Removed Succeded");

 });