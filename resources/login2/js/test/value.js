 QUnit.module("pValueHolder");

 QUnit.test("addHolder", function(assert) {
     var pHolder = pValueFactory.newValueHolder();
     var holder = pHolder.addHolder("Age");
     assert.ok(pHolder.holders.length == 1, "One Holder Added");
     assert.ok(holder.name == "Age", "Holder Name Sets");
     assert.ok(holder.uuid != undefined, "Holder UUID Sets");
     holder = pHolder.addHolder("Sex");
     assert.ok(pHolder.holders.length == 2, "Second Holder Added");
     holder = pHolder.addHolder();
     assert.ok(holder.name == null, "Holder Name Null If Params Not Gives");
 });

 
 QUnit.test("getHolder", function(assert) {
     var pHolder = pValueFactory.newValueHolder();     
     assert.ok(pHolder.holders.length == 0, "No Holder Added Yet");
     var holder = pHolder.getHolder();
     assert.ok(holder == null, "uuid params not passed then holder null");
     var holder = pHolder.getHolder("a1234")
     assert.ok(holder == null, "undefined uuid params passed then holder null");
     holder = pHolder.addHolder("Age");
     assert.ok(holder.uuid == pHolder.getHolder(holder.uuid).uuid, "uuid check okay");
     assert.ok(holder.name == pHolder.getHolder(holder.uuid).name, "name check okay");
 });



 QUnit.test("getHolderIndex", function(assert) {
     var pHolder = pValueFactory.newValueHolder();
     assert.ok(pHolder.getHolderIndex() == null, "No params passing result is Null");
     assert.ok(pHolder.getHolderIndex("av1") == null, "Invalid params passing result is Null");
     pHolder.addHolder("Age");
     pHolder.addHolder("Sex");
     var fmarriage = pHolder.addHolder("Marriage");
     assert.ok(pHolder.getHolderIndex(fmarriage.uuid) == 2, "Marriage is 2 Index");
 });



 QUnit.test("listHolder", function(assert) {
     var pHolder = pValueFactory.newValueHolder();
     assert.ok(pHolder.listHolder() != null, "Initial Holders not null");
     assert.ok(Array.isArray(pHolder.listHolder()), "Initial Holders type is array");
     assert.ok(pHolder.listHolder().length == 0, "Initial Holders is empty");
     pHolder.addHolder("Age");
     pHolder.addHolder("Sex");
     pHolder.addHolder("Marriage");
     assert.ok(pHolder.listHolder().length == 3, "List Holders has 3 holder");
 });



 QUnit.test("deleteHolder", function(assert) {

     var pHolder = pValueFactory.newValueHolder();
     var holder1 = pHolder.addHolder("age");
     var holder2 = pHolder.addHolder("sex");
     var holder3 = pHolder.addHolder("marriage");
     assert.ok(pHolder.listHolder().length == 3, "Added 3 holder");
     pHolder.deleteHolder(holder2.uuid);
     assert.ok(pHolder.listHolder().length == 2, "Removed 1 and 2 holder Back");
     assert.ok(pHolder.getHolder(holder2.uuid) == null, "Holder2 Removed Succeded");

 });




 /*================================================================
 * VALUES
 =================================================================*/



 QUnit.test("addValue", function(assert) {
     var pHolder = pValueFactory.newValueHolder();
     var holder = pHolder.addHolder("Sex");
     pHolder.addValue(holder.uuid, "Man");
     pHolder.addValue(holder.uuid, "Woman");
     pHolder.addValue(holder.uuid, "Other");
     assert.ok(pHolder.listValue(holder.uuid).length == 3, "Add 3 Value to Sex OK");

     holder = pHolder.addHolder("Age");
     pHolder.addValue(holder.uuid, "LessThen18");
     pHolder.addValue(holder.uuid, "BiggenThen18");
     assert.ok(pHolder.listValue(holder.uuid).length == 2, "Add 2 Value Age OK");
 });



 QUnit.test("getValueIndex", function(assert) {
     var pHolder = pValueFactory.newValueHolder();
     var holder = pHolder.addHolder("Sex");
     var holder2 = pHolder.addHolder("Age");
     pHolder.addValue(holder.uuid, "FerdiSex2015");
     var formula2 = pHolder.addValue(holder.uuid, "FerdiSex2016");
     pHolder.addValue(holder.uuid, "FerdiSex2017");
     assert.ok(pHolder.listValue(holder.uuid).length == 3, "Add 3 Value to Sex OK");
     formulaIndex = pHolder.getValueIndex(holder.uuid, formula2.uuid);
     assert.ok(formulaIndex === 1, "Get ValueIndex OK");
 });


 QUnit.test("listValue", function(assert) {
     var pHolder = pValueFactory.newValueHolder();
     var holder = pHolder.addHolder("Sex");
     pHolder.addValue(holder.uuid, "Man");
     pHolder.addValue(holder.uuid, "Woman");
     pHolder.addValue(holder.uuid, "Other");
     assert.ok(pHolder.listValue(holder.uuid).length == 3, "Add 3 Value to Sex OK And List Value Tested");

     holder = pHolder.addHolder("Age");
     pHolder.addValue(holder.uuid, "LessThen18");
     pHolder.addValue(holder.uuid, "BiggenThen18");
     assert.ok(pHolder.listValue(holder.uuid).length == 2, "Add 2 Value Age OK List Value Tested");
 });

 QUnit.test("updateValue", function(assert) {
     var pHolder = pValueFactory.newValueHolder();
     var holder = pHolder.addHolder("Sex");
     pHolder.addValue(holder.uuid, "Man");
     formula = pHolder.addValue(holder.uuid, "Woman");

     pHolder.updateValue(formula.uuid)
     var xValue = pHolder.getValue(formula.uuid);
     assert.ok(xValue.name == "Woman", "Params Null Then Nothing Changed");

     var params = { xyz: "abc" };
     pHolder.updateValue(formula.uuid, params);
     xValue = pHolder.getValue(formula.uuid);
     assert.ok(xValue.name == "Woman", "Params Not Has Prop Name");

     params = { name: "abc" };
     pHolder.updateValue(formula.uuid, params);
     xValue = pHolder.getValue(formula.uuid);
     assert.ok(xValue.name == "abc", "Params Set Name Property abc");

 });



 QUnit.test("deleteValue", function(assert) {

     var pHolder = pValueFactory.newValueHolder();
     var holder = pHolder.addHolder("Sex");
     pHolder.addValue(holder.uuid, "Man");
     pHolder.addValue(holder.uuid, "Woman");
     var formula2 = pHolder.addValue(holder.uuid, "Other");
     assert.ok(pHolder.listValue(holder.uuid).length == 3, "Add 3 Value to Sex OK And List Value Tested");

     pHolder.deleteValue(formula2.uuid);
     assert.ok(pHolder.listValue(holder.uuid).length == 2, "Removed 1 and 2 formulas Back");
     assert.ok(pHolder.getValue(formula2.uuid) == null, "Value Removed Succeded");

 });


