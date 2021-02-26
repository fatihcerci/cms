var token = sessionStorage.getItem("token");
var ip = sessionStorage.getItem("ip");
var dutyId = sessionStorage.getItem("dutyId");
var appUserName = sessionStorage.getItem("userName");
console.log("IP " + ip);
if (!token) window.location.href = "/peditorweb/index.html";

console.log(token);

var pModel = pModelFactory.newModel();
var pHolder = pValueFactory.newValueHolder();
var pDbCatalog = pDbCatalogFactory.newDbCatalog();
var pVariable = pVariableFactory.newVariable();
var tHolder = pTestFactory.newTestSuite();
var searchPoolVariableMap = {};
var modeOfInput = "new"; //edit
//var environment = window.location.hostname === 'localhost' ? 'localhost' : ip;
var environment = window.location.hostname === 'localhost' ? 'localhost' : ip;
console.log("Env " + environment);

var testEngineURL = "http://" + environment + ":8082";
var editorURL = "http://" + environment + ":8083";
var dbURL = "/api/v1/db/";
var uploadUrl = ':8083/api/v1/decisiontable/upload';
var version = "0.0.4";
var pListDBURL = "http://" + environment + ":8083/api/v1/db/list/guest/";
var pListAllDBURL = "http://" + environment + ":8083/api/v1/db/listAll/";
var userValues = {};
var permissions = {};
var rulePermissions = [];
var categoryId = "";
var runOnceSearchVariable = false;
//var formulaClicked = false;

//Category Events
var MSG_SUCCESS_CATEGORY_ADD = "$category_name İsminde Yeni Kategori Eklendi.";
var MSG_SUCCESS_CATEGORY_DEL = "$category_name İsminde Kategorinin Durumu $active Yapıldı.";
var MSG_SUCCESS_CATEGORY_EDIT = "Kategori $category_name Olarak Güncellendi.";
var MSG_WARN_HAS_MORE_FOLDERS = "Kategori altındaki tüm kural seti ve formüller $activeParam olacaktır. Onaylıyor musunuz?";

//Folder Events
var MSG_SUCCESS_FOLDER_ADD = "$folder_name İsminde Yeni Kural Seti Eklendi.";
var MSG_SUCCESS_FOLDER_DEL = "$folder_name İsminde Kural Setinin ve Altında Yer Alan Formüllerin Durumu $active Yapıldı.";
var MSG_SUCCESS_FOLDER_EDIT = "Kural seti $folder_name olarak güncellendi.";
var MSG_WARN_HAS_MORE_FORMULAS = "Kural seti altındaki tüm formüller $activeParam olacaktır. Onaylıyor musunuz?";

//Formula Events
var MSG_SUCCESS_FORMULA_ADD = "Kural setine $formula_name isminde Formül Eklendi.";
var MSG_SUCCESS_FORMULA_EDIT = "Formül ismi $formula_name olarak güncellendi.";
var MSG_SUCCESS_FORMULA_DEL = "$formula_name İsmindeki Formülün Durumu $active Yapıldı.";
var MSG_SUCCESS_FORMULA_ORDER_CNAHGED = "Formül Sıraları Değiştirildi.";

var MSG_SUCCESS_FORMULA_VERSION_ADDED = "$formulaName Adlı Formul Versiyonu Oluşturuldu.";
var MSG_SUCCESS_FORMULA_VERSION_DELETED = "Formül Versiyonu Silindi.";
var MSG_SUCCESS_FORMULA_VERSION_UPDATED = "Formül Versiyonu Güncellendi.";

//Layer Events
var MSG_SUCCESS_LAYER_ADD = "Formüle $layer_name isminde Katman Eklendi.";
var MSG_SUCCESS_LAYER_DEL = "$layer_name İsmindeki Katman Silindi.";

//Box Events
var MSG_SUCCESS_BOX_ADD = "Katmana $box_name isminde Kutu Eklendi.";
var MSG_SUCCESS_BOX_DEL = "$box_name İsmindeki Kutu Silindi.";
var MSG_SUCCESS_BOX_UPDATE = "Kutu Güncellendi.";
var MSG_SUCCESS_RESULT_BOX_UPDATE = "Sonuç Kutusu Güncellendi.";

//Variable Events
var MSG_SUCCESS_VARIABLE_ADD = "Formüle $variable_name Değişkeni Eklendi.";
var MSG_SUCCESS_POOL_VARIABLE_ADD = "$variable_name Değişkeni Eklendi.";
var MSG_SUCCESS_VARIABLE_DEL = "$variable_name İsmindeki Değişken Silindi.";
var MSG_WARN_VARIABLE_HAS_ADDED = "Formüle $variable_name Değişkeni Daha Önce Eklendi.";
var MSG_SUCCESS_VARIABLE_UPDATE = "$variable_name Değişkeni Güncellendi.";
var MSG_SUCCESS_VALUE_ADD = "$value_name Değeri Eklendi.";
var MSG_SUCCESS_VALUE_UPDATE = "$value_name Değeri Güncellendi.";
var MSG_SUCCESS_VALUE_DELETE = "$value_name Değeri Silindi.";
var MSG_SUCCESS_VALUE_SAME = "$value_name Değeri Daha Önce Kaydedilmiş.";
var MSG_WARN_VARIABLE_USED = "$variable_name değişkeni; $category_name kategorisindeki " +
    "$folder_name kuralındaki $formula_name formülünde daha önce kullanılmış.";

//Box Variable Events..
var MSG_SUCCESS_BOX_VARIABLE_RELEASE = "Değişken Kutudan Çıkarıldı.";
var MSG_SUCCESS_BOX_VARIABLE_CONNECT = "Değişken Kutuya Girdi Olarak Eklendi.";
var MSG_SUCCESS_BOX_BOX_CONNECT = "Kutu Sonuç Kutusuna Girdi Olarak Eklendi.";
var MSG_SUCCESS_BOX_OUTPUT_VARIABLE_CONNECT = "Kutuya Çıktı Değişkeni Eklendi.";
var MSG_SUCCESS_BOX_OUTPUT_VARIABLE_UPDATE = "Kutuya Çıktı Değişkeni Güncellendi.";
var MSG_SUCCESS_BOX_RELEASE = "Kutu Sonuç Kutusundan Çıkarıldı.";

//Test
var MSG_SUCCESS_TEST_CREATION = "Test Başarı ile Oluşturuldu.";
var MSG_SUCCESS_TEST_DELETED = "Test Silindi.";
var MSG_SUCCESS_TEST_STATE_SAVED = "Test Değerleri Başarı ile Kaydedildi.";
var MSG_SUCCESS_TEST_EDIT = "Test ismi $test_name Olarak Güncellendi.";

//CATALOG
var MSG_SUCCESS_CATALOG_CREATION = "Veritabanı Tanımı Yapıldı.";
var MSG_SUCCESS_CATALOG_DELETED = "Veritabanı Tanımı Silindi.";
var MSG_SUCCESS_CATALOG_UPDATED = "Veritabanı Tanımı Güncellendi.";
var MSG_SUCCESS_CATALOG_NOT_FOUND = "Veritabanı Tanımı Bulunamadı.";
var MSG_SUCCESS_CATALOG_TABLE_NOT_FOUND = "Veritabanı Tanım Tablosu Bulunamadı.";
var MSG_WARN_CHOOSE_CATALOG = "Katalog Seçimi Yapılmalıdır.";
var MSG_HAS_NO_PERMISSION = "İşlemi Gerçekleştirmek İçin Yetkiniz Bulunmamaktadır.";
//var editorURL = "http://peditor-env.tpxrwvfaeg.eu-west-1.elasticbeanstalk.com";
//var testEngineURL = "http://pengine-env.ay8wmdh2cx.eu-west-1.elasticbeanstalk.com";


$(function () {
	
	var connectionOptions = {
        "force new connection":true,
        "reConnectionAttempts":"Infinity",
        "timeout":"10000"
    };
    var socket = io('http://'+ip+':8083');
    socket.on("connect", function () {
        console.log("Connected!");
    });
    socket.on("connect_error", function () {
        console.log("socket.io connect error!");
    });
    socket.on("error", function () {
        console.log("socket.io connect error!");
    });

    socket.on("wsMessage", function(wsData) {
        if (wsData) {
            console.log(wsData);
            $(".shadow").addClass("open_test");
			var lockMessage = wsData.username + " : "+ wsData.msg;
			console.log(lockMessage);
            displayWarningMsg(lockMessage);
        }
    });
	
    $(".content_menu").on("scroll", function (e) {
        if (this.scrollTop > 47) {
            $(".content_menu").find('.menu_search').css({"top": "48px", "position": "fixed", "z-index": "1"});
        } else {

            $(".content_menu").find('.menu_search').css({"top": "", "position": "relative", "z-index": ""});
        }

    });


    /*var role = sessionStorage.getItem("role");
    if (role && role === "admin") { $(".role_admin").show(); } else { $(".role_admin").hide();}*/
    $('#openTestEditorBtn').attr("disabled", true);
    $('#updateVariableBtn').attr("disabled", true);
    $("#imperaVersion").text(impera.version);
    $(".category_menu.urun_menu").show();
    $(".ruleSet.urun_menu").hide();
    $('.tag_category_name').text('');
    $('.tag_category_name').hide();
    $('#downloadTemplate').attr('action', "http://" + environment + uploadUrl);

    categoryId = "";
    //URL
    var pModelURL = "https://s3-eu-west-1.amazonaws.com/priceengine2/pmodel/model.json?";
    var pValueURL = "https://s3-eu-west-1.amazonaws.com/priceengine2/pmodel/value.json?";
    var pTestURL = "https://s3-eu-west-1.amazonaws.com/priceengine2/pmodel/test.json?";


    var username = localStorage.getItem("profile_email");
    if (username != null) {
        pModelURL = "https://s3-eu-west-1.amazonaws.com/priceengine2/pmodel/" + username + "/model.json?";
        pValueURL = "https://s3-eu-west-1.amazonaws.com/priceengine2/pmodel/" + username + "/value.json?";
        pTestURL = "https://s3-eu-west-1.amazonaws.com/priceengine2/pmodel/" + username + "/test.json?";
        pListDBURL = "http://" + environment + ":8083/api/v1/pdbmodel/list/" + username;

    }


    $('#slide_output').hide();
    $('.validate_error_box').hide();

    $(document).ajaxStart(function () {
        $('.loading').show();
    });
    $(document).ajaxComplete(function () {
        $('.loading').hide();
    });

    modelCall();

    $("#uploadTrg").on('load', function () {
        // ok , now you know that the file is uploaded , you can do what you want , for example tell the user that the file is uploaded 
        //alert("The file is uploaded");

        var isVisibleDecisionTableBtn = $("#downloadDecisionTableBtn").is(":visible");
        var isVisibleLocalDecisionTableBtn = $("#downloadLogicalDecisionTableBtn").is(":visible");
        if (isVisibleDecisionTableBtn) {
            validateDecisionTable();
        } else if (isVisibleLocalDecisionTableBtn) {
            validateLogicalDecisionTable();
        }
    });

    $(".main3").hide();

    //General Display Settings ...
    $(".m_c_btn").click(function () {
        $('.m_c_btn').toggleClass("m_c_btn_close");
        $('.content_menu').toggleClass("content_menu_close");
        $('.main_content').toggleClass("open_main5");
        $('.open_main').toggleClass("open_full");
        $('.library').toggleClass("library_close");
        $('.library_btn').toggleClass("library_btn_close");
    });

    $(".settings_pan").click(function () {
        $('.settings_pan').toggleClass("settings_pan_min");
        $('.main3').toggleClass("main_max");
        $('.main2').toggleClass("main22_max");
        $('.menu2').toggleClass("menu2_close");
        $('.settings_pan span').toggleClass("close");
    });

    $(".ruleSet.urun_menu .title").click(function () {
        $(".ruleSet.urun_menu").addClass("close_urun");
        //$(".main_content").addClass("open_main");
        $(".category_menu.urun_menu").show();
        $(".category_menu.urun_menu").removeClass("close_urun");
        $("#variable_list").removeAttr("data-uuid");

        resetRender(false);
    });

    $('#loadTable').click(function () {
        $('#openTestEditorBtn').attr("disabled", true);
    });

    $(".title_arrow").click(function () {
        $(".ruleSet.urun_menu .title").click();
    });

    $('body').on("keyup", "#txtSelectedId", function (e) {
        e.preventDefault();

        if (e.keyCode === 13) {

            var variableObj = $(this).parents(".variable");
            if (variableObj.length > 0) {

                //Create Variable
                var formulaUUID = $("#variable_list").attr("data-uuid");
                var variableName = $("#txtSelectedId").val();
                variableName = variableName.trim();
                if (!variableName) {
                    displayWarningMsg("Lütfen Alanı Boş Bırakmayınız.");
                } else {
                    var variable = pModel.addVariable(formulaUUID, variableName);
                    var variableObj = $(this).parents(".variable");
                    variableObj.find(".btnLabelVariable").text(variableName);
                    variableObj.find(".btnLabelVariable").prop('title', variableName);
                    variableObj.children().show();
                    variableObj.attr("data-uuid", variable.uuid);

                    //Reset Input
                    $("#txtSelectedId").val("");
                    $("#input_template").append($(".InputTextAndSubmitContainer"));
                    saveModel(MSG_SUCCESS_VARIABLE_ADD.replace("$variable_name", variableName),
                        {item: variableName, itemUUID: variable.uuid, itemType: "variable", action: "create"});
                }

            } else if ($(this).parents(".test").length > 0) {
                if (modeOfInput == "new") {
                    //Create Test
                    if (!checkPermissionControl(ACTION_NAMES.TEST.ADD)) {
                        displayWarningMsg(MSG_HAS_NO_PERMISSION);
                        return false;
                    }

                    var testObj = $(this).parents(".test");
                    var testName = $("#txtSelectedId").val();
                    testName = testName.trim();
                    if (!testName) {
                        displayWarningMsg("Lütfen Alanı Boş Bırakmayınız.");
                    } else {
                        testObj.find(".btnLabelTest").text(testName);
                        testObj.find(".btnLabelTest").prop('title', testName);
                        testObj.children().show();
                        var formulaUUID = $("#variable_list").attr("data-uuid");
                        var suite = tHolder.getSuiteWithFormulaUUID(formulaUUID);
                        var test = tHolder.addTest(suite.uuid, testName);
                        testObj.attr("data-uuid", test.uuid);

                        //Reset Input
                        $("#txtSelectedId").val("");
                        $("#input_template").append($(".InputTextAndSubmitContainer"));
                        saveTest(MSG_SUCCESS_TEST_CREATION);
                    }
                } else if (modeOfInput == "edit") {
                    //Edit test
                    if (!checkPermissionControl(ACTION_NAMES.TEST.UPDATE)) {
                        displayWarningMsg(MSG_HAS_NO_PERMISSION);
                        return false;
                    }
                    var testObj = $(this).parents(".test");
                    var testUUID = testObj.attr("data-uuid");
                    var testName = $("#txtSelectedId").val();
                    testName = testName.trim();
                    if (!testName) {
                        displayWarningMsg("Lütfen Alanı Boş Bırakmayınız.");
                    } else {
                        var params = {name: testName}
                        tHolder.updateTest(testUUID, params);
                        testObj.find(".btnLabelTest").text(testName);
                        testObj.find(".btnLabelTest").prop('title', testName);
                        testObj.children().show();

                        //Reset Input
                        $("#txtSelectedId").val("");
                        $("#input_template").append($(".InputTextAndSubmitContainer"));
                        saveModel(MSG_SUCCESS_TEST_EDIT.replace("$test_name", testName),
                            {item: testName, itemUUID: testUUID, itemType: "test", action: "update"});
                    }

                }

            } else if ($(this).parents(".category").length > 0) {
                var categoryName = $("#txtSelectedId").val();
                categoryName = categoryName.trim();
                if (categoryName)
                    categoryName = categoryName.substring(0, 25);
                var doNothing = false;
                var categoryObj = $(this).parents(".category");
                if (categoryObj) {
                    var categoryUUID = categoryObj.attr("data-uuid");
                    var currentCategory = pModel.getCategory(categoryUUID);
                    if (currentCategory && currentCategory.name === categoryName) {
                        doNothing = true;
                    }
                }

                if (!doNothing) {

                    var isUsed = find('name', categoryName, 'category', true);

                    if (isUsed) {
                        displayWarningMsg("Aynı Kategori Adı Daha Önce Kullanılmış.");
                    } else {
                        if (modeOfInput === "new") {
                            //Create Category
                            if (!checkPermissionControl(ACTION_NAMES.CATEGORY.ADD)) {
                                displayWarningMsg(MSG_HAS_NO_PERMISSION);
                                return false;
                            }

                            if (!categoryName) {
                                displayWarningMsg("Lütfen Alanı Boş Bırakmayınız.");
                            } else {

                                var category = pModel.addCategory(categoryName);
                                categoryObj = $(this).parents(".category");
                                categoryObj.find(".btnLabelCategory").val(categoryName);
                                categoryObj.find(".btnLabelCategory").prop('title', categoryName);
                                categoryObj.children().show();
                                categoryObj.attr('data-uuid', category.uuid);
                                categoryId = category.uuid;
                                //Reset Input
                                $("#txtSelectedId").val("");
                                $("#input_template").append($(".InputTextAndSubmitContainer"));
                                categorySort();
                                saveModel(MSG_SUCCESS_CATEGORY_ADD.replace("$category_name", categoryName),
                                    {item: categoryName, itemUUID: categoryId, itemType: "category", action: "create"});
                            }
                        } else if (modeOfInput === "edit") {
                            //Edit Category

                            if (!checkPermissionControl(ACTION_NAMES.CATEGORY.UPDATE)) {
                                displayWarningMsg(MSG_HAS_NO_PERMISSION);
                                return false;
                            }

                            categoryObj = $(this).parents(".category");
                            var categoryUUID = categoryObj.attr("data-uuid");

                            if (!checkPermissionControl(ACTION_NAMES.CATEGORY.UPDATE)) {
                                displayWarningMsg(MSG_HAS_NO_PERMISSION);
                                return false;
                            }

                            if (!categoryName) {
                                displayWarningMsg("Lütfen Alanı Boş Bırakmayınız.");
                            } else {
                                var category = pModel.getCategory(categoryUUID);
                                var oldCategoryName = category.name;
                                var params = {
                                    name: categoryName,
                                    folders: category.folders,
                                    versions: category.versions
                                };
                                pModel.updateCategory(categoryUUID, params);
                                categoryId = undefined;
                                categoryObj.find(".btnLabelCategory").val(categoryName);
                                categoryObj.find(".btnLabelCategory").prop('title', categoryName);
                                categoryObj.children().show();
                                //Reset Input
                                $("#txtSelectedId").val("");
                                $("#input_template").append($(".InputTextAndSubmitContainer"));
                                categorySort();
                                var ajaxSaveModel = saveModel(MSG_SUCCESS_CATEGORY_EDIT.replace("$category_name", categoryName),
                                    {
                                        item: categoryName,
                                        itemUUID: categoryUUID,
                                        itemType: "category",
                                        action: "update"
                                    });
                                $.when(ajaxSaveModel).done(function (r1, r2) {
                                    var data = {
                                        name: oldCategoryName,
                                        level: "category",
                                        active: true,
                                        changeName: "E",
                                        newName: categoryName
                                    };
                                    changeFormulaCollection(data);
                                });
                            }
                        }
                    }
                }

            } else if ($(this).parents(".formula").length === 0) {
                var folderName = $("#txtSelectedId").val();
                folderName = folderName.trim();
                if (folderName)
                    folderName = folderName.substring(0, 25);
                var doNothing = false;
                var folderObj = $(this).parents(".folder");
                if (folderObj) {
                    var folderUUID = folderObj.attr("data-uuid");
                    var currentFolder = pModel.getFolder(folderUUID);
                    if (currentFolder && currentFolder.name === folderName) {
                        doNothing = true;
                    }
                }

                if (!doNothing) {

                    var isUsed = find('name', folderName, 'categoryUUID', true);

                    if (isUsed) {
                        displayWarningMsg("Aynı Kural Seti Adı Daha Önce Kullanılmış.");
                    } else {
                        if (modeOfInput === "new") {
                            //Create Folder

                            if (!checkPermissionControl(ACTION_NAMES.FOLDER.ADD)) {
                                displayWarningMsg(MSG_HAS_NO_PERMISSION);
                                return false;
                            }

                            if (!folderName) {
                                displayWarningMsg("Lütfen Alanı Boş Bırakmayınız.");
                            } else {
                                var folder = pModel.addFolder(categoryId, folderName);
                                var categoryOld = pModel.getCategory(folder.categoryUUID);
                                if (categoryOld && categoryOld.active === false) {
                                    categoryOld.active = true;
                                    var categoryObj = $(".category[data-uuid=" + folder.categoryUUID + "]");
                                    changeCategoryStatus(categoryObj, categoryOld.name, folder.categoryUUID, categoryOld.active, true);
                                }

                                folderObj = $(this).parents(".folder");
                                folderObj.find(".btnLabelFolder").val(folderName);
                                folderObj.find(".btnLabelFolder").prop('title', folderName);
                                folderObj.children().show();
                                folderObj.attr('data-uuid', folder.uuid);
                                //Reset Input
                                $("#txtSelectedId").val("");
                                $("#input_template").append($(".InputTextAndSubmitContainer"));
                                folderSort();
                                saveModel(MSG_SUCCESS_FOLDER_ADD.replace("$folder_name", folderName),
                                    {item: folderName, itemUUID: folder.uuid, itemType: "folder", action: "create"});

                            }
                        } else if (modeOfInput === "edit") {
                            //Edit Folder

                            if (!checkPermissionControl(ACTION_NAMES.FOLDER.UPDATE)) {
                                displayWarningMsg(MSG_HAS_NO_PERMISSION);
                                return false;
                            }

                            folderObj = $(this).parents(".folder");
                            var folderUUID = folderObj.attr("data-uuid");
                            var oldFolder = pModel.getFolder(folderUUID);
                            var oldFolderName = oldFolder.name;
                            if (!folderName) {
                                displayWarningMsg("Lütfen Alanı Boş Bırakmayınız.");
                            } else {
                                var params = {name: folderName};
                                pModel.updateFolder(folderUUID, params);
                                folderObj.find(".btnLabelFolder").val(folderName);
                                folderObj.find(".btnLabelFolder").prop('title', folderName);
                                folderObj.children().show();
                                //Reset Input
                                $("#txtSelectedId").val("");
                                $("#input_template").append($(".InputTextAndSubmitContainer"));
                                folderSort();
                                var ajaxSaveModel = saveModel(MSG_SUCCESS_FOLDER_EDIT.replace("$folder_name", folderName),
                                    {item: folderName, itemUUID: folderUUID, itemType: "folder", action: "update"});

                                $.when(ajaxSaveModel).done(function (r1, r2) {
                                    var data = {
                                        name: oldFolderName,
                                        level: "folder",
                                        active: true,
                                        changeName: "E",
                                        newName: folderName
                                    };
                                    changeFormulaCollection(data);
                                });
                            }
                        }
                    }
                }
            } else {
                //Create Formula
                var formulaName = $("#txtSelectedId").val();
                formulaName = formulaName.trim();
                if (formulaName)
                    formulaName = formulaName.substring(0, 25);
                var doNothing = false;
                var formulaObj = $(this).parents(".formula");
                if (formulaObj) {
                    var formulaUUID = formulaObj.attr("data-uuid");
                    var currentFormula = pModel.getFormula(formulaUUID);
                    if (currentFormula && currentFormula.name === formulaName) {
                        doNothing = true;
                    }
                }

                if (!doNothing) {

                    var isUsed = find('name', formulaName.toLocaleUpperCase(), 'folderUUID', true);
                    if (isUsed) {
                        displayWarningMsg("Aynı Formül Adı Daha Önce Kullanılmış.");
                    } else {
                        if (modeOfInput === "new") {
                            //Create Formula

                            if (!checkPermissionControl(ACTION_NAMES.FORMULA.ADD)) {
                                displayWarningMsg(MSG_HAS_NO_PERMISSION);
                                return false;
                            }

                            var folderObj = $(this).parents(".folder");
                            var folderUUID = folderObj.attr("data-uuid");

                            if (!formulaName) {
                                displayWarningMsg("Lütfen Alanı Boş Bırakmayınız.");
                            } else {
                                var formula = pModel.addFormula(folderUUID, formulaName);

                                var folderOld = pModel.getFolder(folderUUID);
                                if (folderOld && folderOld.active === false) {
                                    folderOld.active = true;

                                    changeFolderStatus(folderObj, folderOld.name, folderUUID, folderOld.active, true);
                                }

                                //var folderObj = $(this).parents(".folder");
                                formulaObj = $(this).parents(".formula");
                                formulaObj.find(".btnLabelFormula").text(formulaName);
                                formulaObj.find(".btnLabelFormula").prop('title', formulaName);
                                formulaObj.children().show();
                                formulaObj.attr("data-uuid", formula.uuid);
                                //formulaObj.find(".formula_order").text(formula.order);

                                //Reset Input
                                $("#txtSelectedId").val("");
                                $("#input_template").append($(".InputTextAndSubmitContainer"));
                                formulaSort();
                                saveModel(MSG_SUCCESS_FORMULA_ADD.replace("$formula_name", formulaName),
                                    {item: formulaName, itemUUID: formula.uuid, itemType: "formula", action: "create"});
                            }
                        } else if (modeOfInput === "edit") {
                            //Edit Formula

                            if (!checkPermissionControl(ACTION_NAMES.FORMULA.UPDATE)) {
                                displayWarningMsg(MSG_HAS_NO_PERMISSION);
                                return false;
                            }

                            //var folderObj = $(this).parents(".folder");
                            formulaObj = $(this).parents(".formula");
                            var formulaUUID = formulaObj.attr("data-uuid");

                            if (!formulaName) {
                                displayWarningMsg("Lütfen Alanı Boş Bırakmayınız.");
                            } else {
                                var params = {name: formulaName};
                                pModel.updateFormula(formulaUUID, params);

                                formulaObj.find(".btnLabelFormula").text(formulaName);
                                formulaObj.find(".btnLabelFormula").prop('title', formulaName);
                                formulaObj.children().show();

                                //Reset Input
                                $("#txtSelectedId").val("");
                                $("#input_template").append($(".InputTextAndSubmitContainer"));
                                formulaSort();
                                var ajaxSaveModel = saveModel(MSG_SUCCESS_FORMULA_EDIT.replace("$formula_name", formulaName),
                                    {item: formulaName, itemUUID: formulaUUID, itemType: "formula", action: "update"});
                                $.when(ajaxSaveModel).done(function (r1, r2) {
                                    var data = {
                                        name: formulaUUID,
                                        level: "formula",
                                        active: true,
                                        changeName: "E",
                                        newName: formulaName
                                    };
                                    changeFormulaCollection(data);
                                });
                            }
                        }
                    }
                }

            }
        }
    });


    //Close Context Automaticly 
    $(document).mouseup(function (e) {
        var container = $(".FolderContextMenuContainer");
        if (!container.is(e.target) // if the target of the click isn't the container...
            && container.has(e.target).length === 0) // ... nor a descendant of the container
        {
            $("#context_folder_menu_template").append(container);

        }

        var container2 = $(".FormulaContextMenuContainer");
        if (!container2.is(e.target) // if the target of the click isn't the container...
            && container2.has(e.target).length === 0) // ... nor a descendant of the container
        {
            $("#context_formula_menu_template").append(container2);

        }

        var container3 = $(".CategoryContextMenuContainer");
        if (!container3.is(e.target) // if the target of the click isn't the container...
            && container3.has(e.target).length === 0) // ... nor a descendant of the container
        {
            $("#context_category_menu_template").append(container3);

        }

        var container4 = $(".TestContextMenuContainer");
        if (!container4.is(e.target) // if the target of the click isn't the container...
            && container4.has(e.target).length === 0) // ... nor a descendant of the container
        {
            $("#context_test_menu_template").append(container4);

        }

        var container5 = $(".InputTextAndSubmitContainer");
        if (!container5.is(e.target) // if the target of the click isn't the container...
            && container5.has(e.target).length === 0) // ... nor a descendant of the container
        {
            displayTemplateAgain('#categories', ".category", ".CategoryNameContainer");
            displayTemplateAgain('#folders', ".folder", ".FolderNameContainer");
            displayTemplateAgain('#formula_menu_list', ".formula", ".FormulaNameContainer");
            displayTemplateAgain('.tests', ".test", ".TestNameContainer");
            $("#txtSelectedId").val('');
            $("#input_template").append(container5);


        }

        var container6 = $("#poolVariable_list");
        if (!container6.is(e.target) // if the target of the click isn't the container...
            && container6.has(e.target).length === 0) // ... nor a descendant of the container
        {
            var containerContentMenu = $(".content_menu");
            if (!containerContentMenu.is(e.target) && containerContentMenu.has(e.target).length === 0) {
                $("#poolVariable_list").empty();
                $("#txtSearchVariable").val('');
            }

        }

        var container7 = $(".wm.wm_open");
        if (!container7.is(e.target) // if the target of the click isn't the container...
            && container7.has(e.target).length === 0) // ... nor a descendant of the container
        {
            if ($(".wm").hasClass("wm_open") === true) {
                $(".wm").toggleClass("wm_open");
                $(".wm_open_btn").toggleClass("wm_close_btn");
                $(".main2").toggleClass("main2_close");
                $("#txtSearchVariable").val('');
            }

        }

    });

    //==============================================================================================
    //  CATEGORY
    //==============================================================================================

    //New Category Create Event ....
    $('body').on("click", "#category_btn", function (e) {
        e.preventDefault();

        $('#txtSearchCategory').val('');
        $('#txtSearchCategory').keyup();
        var dom_html = $("#category_template").html();
        var categoryName = "TempCategoryName";
        dom_html = dom_html.replace("$category_name", categoryName);
        $('#categories').prepend(dom_html);


        if ($(".InputTextAndSubmitContainer").length === 0) {
            var inputTemplateContainer = '<div class="InputTextAndSubmitContainer">' +
                '<input type="text" name="folder_name" id="txtSelectedId"></div>';
            $('#input_template').html(inputTemplateContainer);
        }

        $("#categories").children().first().children().hide();
        reShowInputTemplate('#categories', ".category", ".CategoryNameContainer");
        $("#txtSelectedId").val('');
        $("#txtSelectedId").focus();
        modeOfInput = "new";


    });

    //Displays Rules...
    $('body').on("click", ".btnLabelCategory", function (e) {
        e.preventDefault();
        showContent();
        $("#txtSelectedId").val("");
        $("#input_template").append($(".InputTextAndSubmitContainer"));
        pModel.folders = {};
        pModel.versions = {};
        var categoryObj = $(this).parents(".category");
        var categoryUUID = categoryObj.attr("data-uuid");
        categoryId = categoryUUID;
        var category = pModel.getCategory(categoryUUID);

        $('.tag_category_name').text(category.name);
        $('.tag_category_name').show();
        $('#variable_list').empty();

        var menuTitle = '<div class="menu_title"></div> <span class="m_c_btn m_c_btn_close "></span><span>FORMÜL ÖZELLİKLERİ</span>';
        $("#middleFrameLabel").html(menuTitle);
        pModel.folders = category.folders;
        pModel.versions = category.versions;
        //for (var i=0; i < pModel.folders)
        //pModel.formulaMap[formula.uuid] = formula;
        var folders = category.folders;
        for (var i = 0; i < folders.length; i++) {
            var folder = folders[i];
            var dom_html = $("#folder_template").html();
            dom_html = dom_html.replace("$folder_name", folder.name);
            $("#folders").prepend(dom_html);
            var folderObj = $("#folders").children().first();
            folderObj.attr('data-uuid', folder.uuid);
            folderObj.attr('title', folder.name);

            var childFolder = folderObj.find(".FolderNameContainer");
            if (folder.active === false)
                childFolder.addClass("folderDisabled");

            var formulas = folder.formulas;
            for (var j = 0; j < formulas.length; j++) {
                var formula = formulas[j];
                if (pModel.getFormulaHeadWithFormulaUUID(formula.uuid) === undefined) { // It's Not A Formula Version. Its real formula
                    var dom_html = $("#formula_template").html();
                    dom_html = dom_html.replace("$formula_name", formula.name);
                    //dom_html = dom_html.replace("$formula_order", formula.order);

                    folderObj.find(".menu_list").prepend(dom_html);
                    var formulaObj = folderObj.find(".menu_list").children().first();
                    var child = formulaObj.find(".FormulaNameContainer").find("li > a");
                    if (formula.active === false)
                        child.attr("disabled", true);
                    formulaObj.attr('data-uuid', formula.uuid);
                    formulaObj.attr('title', formula.name);
                }
            }
        }

        folderSort();

        $(".category_menu.urun_menu").hide();
        $(".category_menu.urun_menu").addClass("close_urun");

        $(".ruleSet.urun_menu").show();
        $(".ruleSet.urun_menu").removeClass("close_urun");
    });

    //Category Setting Event
    $('body').on("click", ".category_settings_btn", function (e) {
        e.preventDefault();
        $(this).after($(".CategoryContextMenuContainer"));
        $(".CategoryContextMenuContainer").removeClass("slide_left");
        setTimeout(function () {
            $(".CategoryContextMenuContainer").toggleClass("slide_left");
        }, 10);

        if ($(this).parents(".CategoryNameContainer").hasClass("categoryDisabled")) {
            $('#btn_category_edit').addClass("disabledAllMenuItem");
            $('#btn_category_delete').text("Kategori Aktif Yap");
        } else {

            $('#btn_category_edit').removeClass("disabledAllMenuItem");
            $('#btn_category_delete').text("Kategori Pasif Yap");
        }
    });

    $('body').on("click", "#btn_category_edit", function (e) {
        e.preventDefault();
        var categoryObj = $(this).parents(".category");
        var categoryUUID = categoryObj.attr("data-uuid");
        var category = pModel.getCategory(categoryUUID);
        $("#txtSelectedId").val(category.name);
        $("#context_category_menu_template").append($(".CategoryContextMenuContainer"));
        categoryObj.prepend($(".InputTextAndSubmitContainer"));
        categoryObj.find(".CategoryNameContainer").hide();
        $("#txtSelectedId").focus();
        modeOfInput = "edit";
    });

    $('body').on("click", "#btn_category_delete", function (e) {
        e.preventDefault();
        if (!checkPermissionControl(ACTION_NAMES.CATEGORY.DELETE)) {
            displayWarningMsg(MSG_HAS_NO_PERMISSION);
            return false;
        }

        var categoryObj = $(this).parents(".category");
        var categoryUUID = categoryObj.attr("data-uuid");
        var category = pModel.getCategory(categoryUUID);
        var categoryName = category.name;
        var activeParam = category.active === false;

        var allFormula = pModel.listFormulaByCategory(categoryUUID);
        var listFormulaUUID = pModel.listFormulaUUID(allFormula);
        var ajaxFormulaInUse = formulaInUse(activeParam === false ? listFormulaUUID.join() : null);
        $.when(ajaxFormulaInUse).done(function (response) {
            var result = null;
			try {
				result = JSON.parse(response);
			} catch (e) {
				result = response;
			}
            var formulaInUse = result.data;
            if (formulaInUse) {
                displayWarningMsg("Formül veya Formüller Kullanımdadır. Pasif Yapma İşlemi Gerçekleştirilemez.");
            } else {

                var hasMoreFolders = category.folders ? category.folders.length > 0 : false;

                if (hasMoreFolders) {
                    var paramMsg = activeParam ? 'aktif' : 'pasif';
                    var msg = MSG_WARN_HAS_MORE_FOLDERS.replace("$activeParam", paramMsg);
                    Confirm('Kategori Durum Değiştirme', msg,
                        'Evet', 'Hayır', true, function () {
                            changeCategoryStatus(categoryObj, categoryName, categoryUUID, activeParam, false);
                        });
                } else {
                    changeCategoryStatus(categoryObj, categoryName, categoryUUID, activeParam, false);
                }
            }
        });

    });

    $('body').on("keyup", "#txtSearchCategory", function (e) {
        e.preventDefault();
        var filter = $("#txtSearchCategory").val().toLocaleUpperCase();
        $(".btnLabelCategory").each(function () {
            if ($(this).val().toLocaleUpperCase().indexOf(filter) > -1) {
                $(this).parents(".category").show();
            } else {
                $(this).parents(".category").hide();
            }
        });

    });

    //==============================================================================================
    //  FOLDER
    //==============================================================================================

    //New Folder Create Event ....
    $('body').on("click", "#folder_btn", function (e) {
        e.preventDefault();
        $('#txtSearchFolder').val('');
        $("#txtSearchFolder").keyup();

        var dom_html = $("#folder_template").html();
        var foldername = "TempFolderName";
        dom_html = dom_html.replace("$folder_name", foldername);
        $(this).next().prepend(dom_html);
        if ($(".InputTextAndSubmitContainer").length === 0) {
            var inputTemplateContainer = '<div class="InputTextAndSubmitContainer">' +
                '<input type="text" name="folder_name" id="txtSelectedId"></div>';
            $('#input_template').html(inputTemplateContainer);
        }
        $("#folders").children().first().children().hide();
        reShowInputTemplate('#folders', ".folder", ".FolderNameContainer");
        $("#txtSelectedId").val('');
        $("#txtSelectedId").focus();
        modeOfInput = "new";

    });


    //Folder Setting Event
    $('body').on("click", ".folder_settings_btn", function (e) {
        e.preventDefault();
        $(this).after($(".FolderContextMenuContainer"));
        $(".FolderContextMenuContainer").removeClass("slide_left");
        setTimeout(function () {
            $(".FolderContextMenuContainer").toggleClass("slide_left");
        }, 10);1165

        if ($(this).parents(".FolderNameContainer").hasClass("folderDisabled")) {
            //$('#btn_folder_add_formula').addClass("disabledAllMenuItem");
            $('#btn_folder_edit').addClass("disabledAllMenuItem");
            $('#btn_folder_delete').text("Kural Seti Aktif Yap");
        } else {
            //$('#btn_folder_add_formula').removeClass("disabledAllMenuItem");
            $('#btn_folder_edit').removeClass("disabledAllMenuItem");
            $('#btn_folder_delete').text("Kural Seti Pasif Yap");
        }
    });


    $('body').on("click", "#btn_folder_delete", function (e) {
        e.preventDefault();

        if (!checkPermissionControl(ACTION_NAMES.FOLDER.DELETE)) {
            displayWarningMsg(MSG_HAS_NO_PERMISSION);
            return false;
        }

        var folderObj = $(this).parents(".folder");
        var folderUUID = folderObj.attr("data-uuid");
        var folder = pModel.getFolder(folderUUID);
        var hasMoreFormulas = folder.formulas ? folder.formulas.length > 0  : false;
        var category = pModel.getCategory(folder.categoryUUID);
        if (category) {
            if (category.active === false) {
                displayWarningMsg("Kategori Pasifken, Kural Seti Aktif Yapılamaz.");
                return false;
            }
        }

        var folderName = folder.name;
        var activeParam = folder.active === false;


        var allFormula = pModel.listFormula(folderUUID);
        var listFormulaUUID = pModel.listFormulaUUID(allFormula);
        var ajaxFormulaInUse = formulaInUse(activeParam === false ? listFormulaUUID.join() : null);
        $.when(ajaxFormulaInUse).done(function (response) {
            var result = null;
			try {
				result = JSON.parse(response);
			} catch (e) {
				result = response;
			}
            var formulaInUse = result.data;
            if (formulaInUse) {
                displayWarningMsg("Formül veya Formüller Kullanımdadır. Pasif Yapma İşlemi Gerçekleştirilemez.");
            } else {

                if (hasMoreFormulas) {
                    var paramMsg = activeParam? 'aktif' : 'pasif';
                    var msg = MSG_WARN_HAS_MORE_FORMULAS.replace("$activeParam", paramMsg);
                    Confirm('Kural Seti Durum Değiştirme', msg,
                        'Evet', 'Hayır', true, function () {
                            changeFolderStatus(folderObj, folderName, folderUUID, activeParam, false);
                        });
                } else {
                    changeFolderStatus(folderObj, folderName, folderUUID, activeParam, false);
                }

                $("#variable_list").html("");
                $("#layers").html("");
                initHtml();
            }
        });


    });


    $('body').on("click", "#btn_folder_edit", function (e) {
        e.preventDefault();
        var folderObj = $(this).parents(".folder");
        var folderUUID = folderObj.attr("data-uuid");
        var folder = pModel.getFolder(folderUUID);
        $("#txtSelectedId").val(folder.name);
        $("#context_folder_menu_template").append($(".FolderContextMenuContainer"));
        folderObj.prepend($(".InputTextAndSubmitContainer"));
        folderObj.find(".FolderNameContainer").hide();
        $("#txtSelectedId").focus();
        modeOfInput = "edit";
    });


    //New Formula Create Event ....
    $('body').on("click", "#btn_folder_add_formula", function (e) {
        e.preventDefault();
        var folderObj = $(this).parents(".folder");
        var folderUUID = folderObj.attr("data-uuid");

        $("#context_folder_menu_template").append($(".FolderContextMenuContainer"));
        var dom_html = $("#formula_template").html();
        folderObj.find(".menu_list").prepend(dom_html);
        folderObj.find(".menu_list").addClass("menu_list_open");
        //folderObj.find(".menu_list").attr("id","formula_menu_list");
        folderObj.find(".menu_list").children().first().children().hide();
        folderObj.find(".menu_list").children().first().prepend($(".InputTextAndSubmitContainer"));
        $("#txtSelectedId").val('');
        $("#txtSelectedId").focus();
        modeOfInput = "new";

    });

    $('body').on("keyup", "#txtSearchFolder", function (e) {
        e.preventDefault();
        var filter = $("#txtSearchFolder").val().toLocaleUpperCase();
        $(".btnLabelFolder").each(function () {
            if ($(this).val().toLocaleUpperCase().indexOf(filter) > -1) {
                $(this).parents(".folder").show();
            } else {
                $(this).parents(".folder").hide();
            }
        });

    });


    //Displays/Hide Folders Formulas...
    $('body').on("click", ".btnLabelFolder", function (m) {
        showContent();

        var folders = $(this).parents("#folders");

        $.each(folders, function (index, item) {
            var menuList = $(item).find(".folder > .FolderNameContainer > .menu_list");
            if ($(menuList).hasClass("menu_list_open")) {
                $(menuList).removeClass("menu_list_open");
                $(menuList).attr("id", "");
            }
        });

        $(this).parents(".folder").find(".menu_list").toggleClass("menu_list_open");
        if ($(this).parents(".folder").find(".menu_list").hasClass("menu_list_open")) {
            $(this).parents(".folder").find(".menu_list").attr("id", "formula_menu_list");
        } else {
            $(this).parents(".folder").find(".menu_list").attr("id", "");
        }


        $('#variable_list').empty();
        $(".menu2").hide();
        var menuTitle = '<div class="menu_title"></div> <span class="m_c_btn m_c_btn_close "></span><span>FORMÜL ÖZELLİKLERİ</span>';
        $("#middleFrameLabel").html(menuTitle);
        formulaSort();

    });

    //==============================================================================================
    //  FORMULA
    //==============================================================================================

    //Formula Setting Event
    $('body').on("click", ".formula_settings_btn", function (e) {
        e.preventDefault();

        $(this).after($(".FormulaContextMenuContainer"));

        $(".FormulaContextMenuContainer").removeClass("slide_left");
        setTimeout(function () {
            $(".FormulaContextMenuContainer").toggleClass("slide_left");
        }, 10);

        if ($(this).closest("li").find(".btnLabelFormula").attr("disabled") === "disabled") {
            $('#btn_formula_edit').addClass("disabledAllMenuItem");
            $('#btn_formula_copy').addClass("disabledAllMenuItem");
            $('#btn_formula_delete').text("Formül Aktif Yap");
        } else {
            $('#btn_formula_edit').removeClass("disabledAllMenuItem");
            $('#btn_formula_copy').removeClass("disabledAllMenuItem");
            $('#btn_formula_delete').text("Formül Pasif Yap");
        }
    });


    //FormulaHead Delete Event
    $('body').on("click", ".formulahead_settings_btn", function (e) {
        e.preventDefault();
        if (!checkPermissionControl(ACTION_NAMES.FORMULA.DELETE_VERSION)) {
            displayWarningMsg(MSG_HAS_NO_PERMISSION);
            return false;
        }
        var isFormula = false;
        var formulaHeadObj = $(this).parents(".formulahead");
        var formulaHeadUUID = formulaHeadObj.attr("data-uuid");
        var prevFormulaHead = undefined;
        if ($("[data-uuid='" + formulaHeadUUID + "']").prev().length > 0) {
            var prevFormulaHeadUUID = $("[data-uuid='" + formulaHeadUUID + "']").prev().attr("data-uuid");
            prevFormulaHead = pModel.getFormulaHead(prevFormulaHeadUUID);
            if (!prevFormulaHead) {
                prevFormulaHead = pModel.getFormula(prevFormulaHeadUUID);
                isFormula = true;
            }

        }

        var formulaHead = pModel.getFormulaHead(formulaHeadUUID);
        pModel.deleteFormulaHead(formulaHead.uuid);
        pModel.deleteFormula(formulaHead.formulaUUID);

        var ajaxSaveModel = saveModel(MSG_SUCCESS_FORMULA_VERSION_DELETED,
            {item: formulaHead.name, itemUUID: formulaHead.uuid, itemType: "formula", action: "delete"});
        $.when(ajaxSaveModel).done(function (r1, r2) {
            var ajaxDeleteFormulaCollection = deleteFormulaCollection(formulaHead.formulaUUID);
            $.when(ajaxDeleteFormulaCollection).done(function (r1, r2) {
                if (formulaHead)
                    generateFormula(formulaHead.baseFormulaUUID);

            });
        });


        formulaHeadObj.remove();

        var selectedVersionShowIn = false;
        var totalVersions = $('#FormulaVersionList > .formulahead').length;
        $("#FormulaVersionList").children().each(function () {

            var firstChild = $(this).find(".FormulaHeadNameContainer").find("li > a");
            if (firstChild.hasClass(totalVersions > 1 ? "selectedVersion" : "selected")) {
                //var formulaHeadObjSelected = $(this).parents(".formulahead");

                var formulaHeadUUIDSelected = $(this).attr("data-uuid");
                var formulaHead = pModel.getFormulaHead(formulaHeadUUIDSelected);
                if (formulaHead != null) {

                    renderFormula(formulaHead.formulaUUID);
                } else {
                    renderFormula(formulaHeadUUIDSelected);
                }
                selectedVersionShowIn = true;
                return false;
            }

        });

        if (prevFormulaHead && !selectedVersionShowIn) {
            if (isFormula) {
                $('#chkActive').hide();
                $('#lblChkActive').hide();
                renderFormula(prevFormulaHead.uuid)
            } else {
                renderFormula(prevFormulaHead.formulaUUID);
            }

        }

        $('#chkActive').prop('checked', false);
        /*$(".main3").hide();
        $('#variable_list').empty();
        $(".menu2").hide();
        var menuTitle = '<div class="menu_title"></div> <span class="m_c_btn m_c_btn_close "></span><span>FORMÜL ÖZELLİKLERİ</span>';
        $("#middleFrameLabel").html(menuTitle);
        $('.tag_category_name').text('');
        $('.tag_category_name').hide();
        showContent();*/

    });


    $('body').on("click", "#btn_formula_copy", function (e) {
        e.preventDefault();
        //console.log("Formula Copy Run");
        var formulaObj = $(this).parents(".formula");
        var formulaUUID = formulaObj.attr("data-uuid");
        var formula = pModel.getFormula(formulaUUID);
        var cloneFormula = pModel.cloneFormula(formulaUUID);
        var isUsed = find('name', cloneFormula.name.toLocaleUpperCase(), 'folderUUID', true);
        if (isUsed) {
            displayWarningMsg("Aynı Formül Adı Daha Önce Kullanılmış.");
            pModel.deleteFormula(cloneFormula.uuid);
            return false;
        }

        cloneDecisionTableAndSaveAll(formula, cloneFormula, formulaObj);

    });


    $('body').on("click", "#btn_formula_delete", function (e) {
        e.preventDefault();

        if (!checkPermissionControl(ACTION_NAMES.FORMULA.DELETE)) {
            displayWarningMsg(MSG_HAS_NO_PERMISSION);
            return false;
        }

        var parentFolder = $(this).closest('.FolderNameContainer');
        if (parentFolder && parentFolder.hasClass('folderDisabled')) {
            displayWarningMsg("Kural Seti Pasifken, Formül Aktif Yapılamaz.");
            return false;
        }


        var formulaObj = $(this).parents(".formula");
        var formulaUUID = formulaObj.attr("data-uuid");
        var formula = pModel.getFormula(formulaUUID);
        var formulaName = formula.name;
        var activeParam = formula.active === false;
        var listFormulaUUID = [];
        listFormulaUUID.push('"'+formulaUUID+'"');
        var ajaxFormulaInUse = formulaInUse(activeParam === false ? listFormulaUUID.join() : null);
        $.when(ajaxFormulaInUse).done(function (response) {
            var result = null;
			try {
				result = JSON.parse(response);
			} catch (e) {
				result = response;
			}
            var formulaInUse = result.data;
            if (formulaInUse) {
                displayWarningMsg("Formül veya Formüller Kullanımdadır. Pasif Yapma İşlemi Gerçekleştirilemez.");
            } else {
                $("#context_folder_menu_template").append($(".FormulaContextMenuContainer"));
                //pModel.deleteFormula(formulaUUID);

                pModel.updateFormula(formulaUUID, {active: activeParam});

                var msg = MSG_SUCCESS_FORMULA_DEL.replace("$formula_name", formulaName);
                msg = msg.replace("$active", activeParam ? "Aktif" : "Pasif");

                var ajaxSaveModel = saveModel(msg, {item: formulaName, itemUUID: formulaUUID,
                    itemType: "formula", action: "delete"});

                $.when(ajaxSaveModel).done(function (r1, r2) {
                    var data = {
                        name: formulaUUID,
                        level: "formula",
                        active: activeParam,
                        changeName: "H"
                    };
                    changeFormulaCollection(data);
                });


                $(".main3").hide();
                $('#variable_list').empty();
                $(".menu2").hide();
                var menuTitle = '<div class="menu_title"></div> <span class="m_c_btn m_c_btn_close "></span><span>FORMÜL ÖZELLİKLERİ</span>';
                $("#middleFrameLabel").html(menuTitle);
                $('.tag_category_name').text('');
                $('.tag_category_name').hide();

                var child = formulaObj.find(".FormulaNameContainer").find("li > a");
                child.attr("disabled", !activeParam);
            }
        });



        //formulaObj.remove();

    });


    //Edit Formula Name
    $('body').on("click", "#btn_formula_edit", function (e) {
        e.preventDefault();
        var formulaObj = $(this).parents(".formula");
        var formulaUUID = formulaObj.attr("data-uuid");
        var formula = pModel.getFormula(formulaUUID);
        $("#txtSelectedId").val(formula.name);
        $("#context_folder_menu_template").append($(".FormulaContextMenuContainer"));
        formulaObj.prepend($(".InputTextAndSubmitContainer"));
        formulaObj.find(".FormulaNameContainer").hide();
        $("#txtSelectedId").focus();
        modeOfInput = "edit";

    });


    //Displays Selected Formula Layers, Variables, And Others ... 
    $('body').on("click", ".btnLabelFormula", function (e) {
        e.preventDefault();
        showContent();
        var formulaObj = $(this).parents(".formula");
        var formulaUUID = formulaObj.attr("data-uuid");

        var version = pModel.getVersionWithFormulaUUID(formulaUUID);
        if (version && version.formulaHeads) {
            for (var i = 0; i < version.formulaHeads.length; i++) {
                var formulaHead = version.formulaHeads[i];

                if (formulaHead && formulaHead.active === true) {
                    formulaUUID = formulaHead.formulaUUID;
                    break;
                }
            }
        }

        //formulaClicked = true;
        renderFormula(formulaUUID);
        $('#FormulaVersionList').hide();
        $('#panelCreateVersion').hide();

        variableSort();
        $('.menu2').show();
        sortBoxVariable();
    });


    $('body').on("click", ".btnLabelFormulaHead", function (e) {
        e.preventDefault();
        var formulaHeadObj = $(this).parents(".formulahead");
        var totalVersions = $('#FormulaVersionList > .formulahead').length;
        var formulaHeadUUID = formulaHeadObj.attr("data-uuid");
        var formulaHead = pModel.getFormulaHead(formulaHeadUUID);
        var formulaUUID = "";


        if (formulaHead != null) {
            var baseFormula = pModel.getFormula(formulaHead.baseFormulaUUID);
            renderFormula(formulaHead.formulaUUID);
            if (formulaHead.active === true) {
                $(this).removeClass().addClass("btnLabelFormulaHead selected");
            } else {
                $(this).removeClass().addClass("btnLabelFormulaHead selectedVersion");
            }
            $('#chkActive').prop('checked', formulaHead.active);
            $('#chkActive').show();
            $('#lblChkActive').show();

            var activated = false;
            if (baseFormula) {
                $("#FormulaVersionList").children().each(function () {
                    if ($(this).attr("data-uuid") !== baseFormula.uuid) {
                        var fHead = pModel.getFormulaHead($(this).attr("data-uuid"));
                        if (fHead) {
                            if (fHead.active === true) {
                                activated = true;
                                return false;
                            }
                        }
                    }
                });

                if (!activated) {
                    $("#FormulaVersionList").children().each(function () {
                        if ($(this).attr("data-uuid") === baseFormula.uuid) {
                            var firstChild = $(this).find(".FormulaHeadNameContainer").find("li > a");
                            if (!firstChild.hasClass("selectedVersion")) {
                                firstChild.addClass("selected");
                                return false;
                            }
                        }
                    });
                }

            }

        } else {
            renderFormula(formulaHeadUUID); //Base FormulaUUID;
            if (totalVersions > 1) {
                $(this).removeClass().addClass("btnLabelFormulaHead selected");
            } else {
                $(this).removeClass().addClass("btnLabelFormulaHead selectedVersion");

            }
            $('#chkActive').hide();
            $('#lblChkActive').hide();
        }


    });

    //$("#txtVersionStartDate").inputmask("99/99/9999", {"placeholder": "dd/mm/yyyy"});
    //$("#txtVersionEndDate").inputmask("99/99/9999", {"placeholder": "dd/mm/yyyy"});

    $("#createNewFormulaVersion").click(function (e) {
        e.preventDefault();
        if (!checkPermissionControl(ACTION_NAMES.FORMULA.ADD_VERSION)) {
            displayWarningMsg(MSG_HAS_NO_PERMISSION);
            return false;
        }
        //var sDate = $("#txtVersionStartDate").val();
        //var eDate = $("#txtVersionEndDate").val();
        //var partsStartDate = sDate.split('/');
        //var partsEndDate = eDate.split('/');
        //var startDate = new Date(partsStartDate[2], partsStartDate[1] - 1, partsStartDate[1]);
        //var endDate = new Date(partsEndDate[2], partsEndDate[1] - 1, partsEndDate[0]);

        //var isStartDateValid = isDateValid(startDate);
        //var isEndDateValid = isDateValid(endDate);
        var isStartDateValid = true;

        if (!isStartDateValid) {
            displayWarningMsg("Versiyon Başlangıcı Geçerli Bir Tarih Değil");
        } else {
            var tag = 1;
            $('#chkActive').prop('checked', false);
            //var isActive = $('#chkActive').is(":checked");
            var formulaUUID = $("#variable_list").attr("data-uuid");
            var baseFormulaUUID = undefined;
            var fHead = pModel.getFormulaHeadWithFormulaUUID(formulaUUID);

            var version = pModel.getVersionWithFormulaUUID(formulaUUID);
            if (!version) {
                if (fHead)
                    version = pModel.getVersionWithFormulaUUID(fHead.baseFormulaUUID);
            }
            if (version) {
                var formulaHeads = pModel.listFormulaHead(version.uuid);
                if (formulaHeads && formulaHeads.length > 0) {
                    $.each(formulaHeads, function (index, item) {
                        var itemFormulaUUID = item.formulaUUID;
                        var formula = pModel.getFormula(itemFormulaUUID);
                        var formulaName = formula.name;
                        var index = formulaName.indexOf("_");
                        var startIndex = index + 1;
                        var endIndex = formulaName.length;
                        var subFormulaName = formulaName.substring(startIndex, endIndex);
                        if ($.isNumeric(subFormulaName)) {
                            var lastIndex = Number(parseInt(subFormulaName)) + Number(1);
                            tag = lastIndex;
                        } else {
                            tag = formulaHeads.length + 1;
                        }
                    });
                }
            } else {
                tag = 1;
            }
            baseFormulaUUID = fHead ? fHead.baseFormulaUUID : formulaUUID;

            var logDate = getCurrentDate();
            var cloneFormula = pModel.cloneFormula(formulaUUID, tag);
            var index = pModel.getFormulaIndex(cloneFormula.folderUUID, formulaUUID);
            pModel.insertFormula(cloneFormula, index);
            var formulaHead = pModel.addFormulaHead(baseFormulaUUID, cloneFormula.uuid, formulaUUID, logDate, false);
            var dom_html = $("#formulahead_template").html();
            dom_html = dom_html.replace("$formula_name", cloneFormula.name);
            //dom_html = dom_html.replace("$formula_end_date", formulaHead.endDate);
            $("#FormulaVersionList").append(dom_html);
            var formulaObj = $("#FormulaVersionList").children().last();
            formulaObj.attr('data-uuid', formulaHead.uuid);
            var versionMessage = MSG_SUCCESS_FORMULA_VERSION_ADDED.replace("$formulaName", cloneFormula.name);


            $("#FormulaVersionList").children().each(function () {

                var child = $(this).find(".FormulaHeadNameContainer").find("li > a");
                if (child.hasClass("selectedVersion")) {
                    child.removeClass("selectedVersion");
                }

                if ($(this).attr("data-uuid") === formulaHead.uuid) {
                    child.addClass("selectedVersion");
                }

            });

            renderFormula(formulaHead.formulaUUID);


            var ajaxSaveModel = saveModel(versionMessage, {
                item: cloneFormula.name,
                itemUUID: cloneFormula.uuid,
                itemType: "formula",
                action: "create"
            });

            $.when(ajaxSaveModel).done(function (r1, r2) {
                generateFormula(cloneFormula.uuid);
            });
            //$("#txtVersionStartDate").val("");
            $('#chkActive').prop('checked', false);
            $('#chkActive').removeAttr("checked");

        }


    });


    $('body').on("click", "#validateFormulaBtn", function (e) {
        e.preventDefault();

        var formulaUUID = $("#variable_list").attr("data-uuid");
        var msg = "";
        //First Rule Variable Select Not Set Holder...
        //Second Rule Variable Is Used AnyWhere...
        var vList = pModel.listVariable(formulaUUID);
        for (var i = 0; i < vList.length; i++) {
            var v = vList[i];
            if (v.type == "Select" && pHolder.getHolder(v.holderUUID) == null) {
                var msgTemp001 = "<span class='error'>(Değişken Hatası) $variableName değişkeninin seçim değer kümesi atanmamıştır.</span></br>"
                msg += msgTemp001.replace("$variableName", v.name);
            }
            if (!isVariableUseAsAnInput(v, formulaUUID)) {
                var msgTemp002 = "<span class='error'>(Değişken Hatası) $variableName değişkeni hiç bir kutuda kullanılmamıştır.</span></br>"
                msg += msgTemp002.replace("$variableName", v.name);
            }
        }

        //Box Usage Rule...
        var formulaOutputMap = {};
        var allBox = new Array();
        var layers = pModel.listLayer(formulaUUID);
        for (var i = 0; i < layers.length; i++) {
            var bList = pModel.listBox(layers[i].uuid);
            for (var j = 0; j < bList.length; j++) {
                var box = bList[j];
                allBox.push(box);
                var outputs = box.outputs;
                for (var k = 0; k < outputs.length; k++) {
                    var output = outputs[k];
                    formulaOutputMap[output.variableUUID] = output;
                }
            }
        }

        var hasMultiResult = false;

        for (var i = 0; i < allBox.length; i++) {
			if (allBox.length <= 1) {
                var msgTemp009 = "<span class='error'>Lütfen en az bir tane kutu ekleyiniz.</span></br>"
                msg += msgTemp009;
            }
            var box = allBox[i];
            if (box.name != "ResultBox" && formulaOutputMap[box.uuid] === null) {
                var msgTemp003 = "<span class='error'>(Kutu Hatası) $boxName değişkeni hiç bir kutuda kullanılmamıştır.</span></br>"
                msg += msgTemp003.replace("$boxName", box.name);

            }

            if (box.type == "DecisionTable") {
                if (box.decisiontable_uploaded_valid == null || box.decisiontable_uploaded_valid === false) {
                    var msgTemp004 = "<span class='error'>(Kutu Hatası) $boxName 'e geçerli bir karar tablosu yüklenmemiştir</span></br>"
                    msg += msgTemp004.replace("$boxName", box.name);
                }
            } else if (box.type == "LogicalDecisionTable") {
                hasMultiResult = box.multiResult ? box.multiResult : false;
                if (box.decisiontable_uploaded_valid == null || box.decisiontable_uploaded_valid === false) {
                    var msgTemp004 = "<span class='error'>(Kutu Hatası) $boxName 'e geçerli bir karar tablosu yüklenmemiştir</span></br>"
                    msg += msgTemp004.replace("$boxName", box.name);
                }

                if (hasMultiResult && allBox.length > 1) {
                    var msgTemp008 = "<span class='error'>Çoklu sonuç kutusu olduğundan, birden fazla kutu kullanılamaz.</span></br>"
                    msg += msgTemp008;
                }

            } else if (box.type == "CodeBlock") { //Consisteny && Syntax Check
                var code = box.codeblock_text;


                //Consistency Check
                if (!code.includes("@result")) {
                    var msgTemp005 = "<span class='error'>(Kutu Hatası) $boxName Kod blogunda @result değişkeni kullanılmamıştır</span></br>"
                    msg += msgTemp005.replace("$boxName", box.name);
                }


                var inputs = box.inputs;
                for (var j = 0; j < inputs.length; j++) {
                    var input = inputs[j];
                    var iVariable = pModel.getVariable(input.variableUUID);
                    if (iVariable) {
                        var inputVTag = "@answer." + iVariable.name;
                        if (!code.includes(inputVTag)) {
                            var msgTemp006 = "<span class='error'>(Kutu Hatası) $boxName Kod blogunda $inputVTag değişkeni kullanılmamıştır</span></br>"
                            msg += msgTemp006.replace("$inputVTag", inputVTag).replace("$boxName", box.name);
                        }
                    }

                }

                var outputs = box.outputs;
                for (var j = 0; j < outputs.length; j++) {
                    var output = outputs[j];
                    var iBox = pModel.getBox(output.variableUUID);
                    if (iBox) {
                        var inputBTag = "@" + iBox.name + "_Result";

                        if (!code.includes(inputBTag)) {
                            var msgTemp007 = "<span class='error'>(Kutu Hatası) $boxName Kod blogunda $inputBTag değişkeni kullanılmamıştır</span></br>"
                            msg += msgTemp007.replace("$inputBTag", inputBTag).replace("$boxName", box.name);
                        }
                    }
                }

                //Syntax Check
                var codeInit = "var result=-1;";
                var codeCheck = box.codeblock_text;
                var codeCheck = code.replaceAll("@result", "result");

                for (var j = 0; j < inputs.length; j++) {
                    var input = inputs[j];
                    var iVariable = pModel.getVariable(input.variableUUID);
                    if (iVariable) {
                        var inputVTag = "@answer." + iVariable.name;
                        codeInit = codeInit + "var " + iVariable.name + "=-1;";
                        codeCheck = codeCheck.replaceAll(inputVTag, iVariable.name);
                    }
                }


                for (var j = 0; j < outputs.length; j++) {
                    var output = outputs[j];
                    var iBox = pModel.getBox(output.variableUUID);
                    if (iBox) {
                        var inputBTag = "@" + iBox.name + "_Result";
                        codeInit = codeInit + "var " + iBox.name + "=-1;";
                        codeCheck = codeCheck.replaceAll(inputBTag, iBox.name);
                    }
                }

                codeCheckTotal = codeInit + codeCheck;
                //console.log(box.name + "==" + codeCheckTotal);


                try {
                    eval(codeCheckTotal);
                } catch (err) {
                    //$err
                    var msgTemp008 = "<span class='error'>(Kutu Hatası) $boxName Kod blogunda yazım hatası</span></br>"
                    msg += msgTemp008.replace("$boxName", box.name);
                }


            }


        }


        if (msg == "") {
            $('#openTestEditorBtn').attr("disabled", false);
            displayWarningMsg('<span class="String">Formül Doğrulandı</span>');

            var ajaxClearPricingEngineCache = clearPricingEngineCache();
            $.when(ajaxClearPricingEngineCache).done(function (r1, r2) {
                generateFormula();
            });
        } else {
            $('#openTestEditorBtn').attr("disabled", true);
            displayWarningMsg(msg);
        }


    });


    //==============================================================================================
    //  VARIABLE
    //==============================================================================================


    //Select Variable Type
    $('body').on("click", ".btnLabelVariable", function (e) {
        e.preventDefault();
        var variableUUID = $(this).parents(".variable").attr("data-uuid");
        var variable = pModel.getVariable(variableUUID);
        if (variable) {
            $(".menu2_form").show();
            $(".menu2").attr('data-uuid', variable.uuid);
            $(".VariableContextProperties").append($('.SelectedContextHistory'));
            selectedVariable(variable);
        }

    });

    var selectVariableValueType = $('#selectVariableValueType');


    //Select Type If Select
    selectVariableValueType.change(function (e) {
        e.preventDefault();

        $("#selectValueIDDetails").empty();
        if (selectVariableValueType.val() === "Select") {
            $("#selectValueID").val('');
            $("#SelectValueIdContainer").show();
        } else {
            $("#SelectValueIdContainer").hide();

        }
    });


    $("#selectValueID").change(function (e) {
        e.preventDefault();
        var holderUUID = $("#selectValueID").val();
        var holder = pHolder.getHolder(holderUUID);
        var values = holder.values;
        $("#selectValueIDDetails").empty();
        for (var i = 0; i < values.length; i++) {
            $("#selectValueIDDetails").append("<li>" + values[i].name + "</li>");
        }
    });

    $("#btn_add_variable").click(function (e) {
        e.preventDefault();

        var dom_html = $("#variable_template").html();
        var variableName = "TempVariableName";
        dom_html = dom_html.replace("$variable_name", variableName);
        $("#variable_list").prepend(dom_html);
        $("#variable_list").children().first().children().hide();
        $("#variable_list").children().first().prepend($(".InputTextAndSubmitContainer"));
        $("#txtSelectedId").val('');
        $("#txtSelectedId").focus();
        modeOfInput = "new";
    });

    $("#updateVariableBtn").click(function (e) {
        e.preventDefault();

        if (!checkPermissionControl(ACTION_NAMES.VARIABLE.UPDATE)) {
            displayWarningMsg(MSG_HAS_NO_PERMISSION);
            return false;
        }

        var variableUUID = $(".menu2").attr('data-uuid');
        var params = {
            name: $("#txtSelectedVariable").val(),
            type: $("#selectVariableValueType").val(),
            holderUUID: $("#selectValueID").val()
        };
        pModel.updateVariable(variableUUID, params);
        saveModel(MSG_SUCCESS_VARIABLE_UPDATE.replace("$variable_name", params.name),
            {item: $("#txtSelectedVariable").val(), itemUUID: variableUUID, itemType: "variable", action: "update"});
        $("#variable_list").children().each(function () {
            if ($(this).attr("data-uuid") == variableUUID) {
                $(this).find(".btnLabelVariable").html(params.name);
            }
        });

        $(".input_output").each(function () {
            if ($(this).attr("data-variable-uuid") == variableUUID) {
                //$(this).text(params.name);
                $(this).html(params.name + '<input type="button" class="close_io" value="x">');
            }
        });


    });

    $("#deleteVariableBtn").click(function (e) {
        e.preventDefault();
        var variableUUID = $(".menu2").attr('data-uuid');
        var variable = pModel.getVariable(variableUUID);
        var variableName = variable.name;

        if (!checkPermissionControl(ACTION_NAMES.VARIABLE.DELETE_FROM_FORMULA)) {
            displayWarningMsg(MSG_HAS_NO_PERMISSION);
            return false;
        }

        Confirm('Değişken Silme İşlemi', 'Değişkeni formülden silmek istediğinizden emin misiniz?', 'Evet', 'Hayır', true, function () {

            pModel.deleteVariable(variableUUID);
            saveModel(MSG_SUCCESS_VARIABLE_DEL.replace("$variable_name", variableName),
                {item: variableName, itemUUID: variableUUID, itemType: "variable", action: "delete"});
            $("#variable_list").children().each(function () {
                if ($(this).attr("data-uuid") === variableUUID) {
                    $(this).remove();
                    rightPartContextPropertiesReset();
                }
            });

            $(".input_output").each(function () {
                if ($(this).attr("data-variable-uuid") === variableUUID) {
                    $(this).remove();
                }
            });
        });

    });


    $('body').on("keyup", "#txtSearchVariable", function (e) {
        e.preventDefault();
        $('#poolVariable_list').empty();

        var formulaUUID = $("#variable_list").attr("data-uuid");
        var filter = $("#txtSearchVariable").val().toLocaleLowerCase();
        if (!formulaUUID) {
            //displayWarningMsg("Lütfen Öncelikle Bir Formül Seçiniz.");
            if (filter) {
                var isUsed = false;
                var formulaUUID = null;
                var finalResults = [];
                var data = {
                    categories: pModel.listCategory()
                };

                findObjectsWithLike(data, 'name', filter, finalResults, true);
                if (finalResults && finalResults.length > 0) {
                    for (var j = 0; j < finalResults.length; j++) {
                        var result = finalResults[j];
                        if (result.hasOwnProperty("formulaUUID") && result.formulaUUID) {
                            var formula = pModel.getFormula(result.formulaUUID);

                            if (formula) {
                                var version = pModel.getVersionWithFormulaUUID(formula.uuid);
                                var categories = pModel.listCategory();

                                var foundFolder = undefined;
                                for (var k = 0; k < categories.length; k++) {
                                    var itemCategory = categories[k];
                                    for (var m = 0; m < itemCategory.folders.length; m++) {
                                        var folder = itemCategory.folders[m];
                                        if (formula.folderUUID === folder.uuid) {
                                            foundFolder = folder;
                                            break;
                                        }
                                    }
                                    if (foundFolder)
                                        break;
                                }
                                var category = pModel.getCategory(foundFolder.categoryUUID);
                                var variable = pModel.getVariable(result.uuid);
                                if (variable) {
                                    var element = '<li class="table_searchPoolVariable">';
                                    var idCategory = "cb_" + j;
                                    var idFolder = "fb_" + j;
                                    var idFormula = "fr_" + j;
                                    var idVariable = "var_" + j;
                                    element += '<input type="checkbox" id="' + idCategory + '"/>' +
                                        '<label for="' + idCategory + '" title="' + category.name + '">$category_name</label>';
                                    var categoryNameCut = category.name.length > 20 ?
                                        category.name.substring(0, 20) + ".." : category.name;
                                    element = element.replace("$category_name", categoryNameCut);
                                    element += '<ul><li>';
                                    element += '<input type="checkbox" id="' + idFolder + '"/>' +
                                        '<label for="' + idFolder + '" title="' + folder.name + '">$folder_name</label>';
                                    var folderNameCut = folder.name.length > 20 ?
                                        folder.name.substring(0, 20) + ".." : folder.name;
                                    element = element.replace("$folder_name", folderNameCut);

                                    if (version) {
                                        var vFormula = pModel.getFormula(version.formulaUUID);
                                        var idFormula = "fr_" + vFormula.uuid;
                                        var cssColor = "#519469";
                                        var fxVariableId = "0_fxVar_" + idFormula;
                                        element += '<ul><li>';
                                        element += '<input type="checkbox" id="' + idFormula + '" />' +
                                            '<label for="' + idFormula + '" ' +
                                            'title="' + vFormula.name + '" style="color:' + cssColor + '">' +
                                            '$formula_name</label>';
                                        var vFormulaNameCut = vFormula.name.length > 20 ?
                                            vFormula.name.substring(0, 20) + ".." : vFormula.name;
                                        element = element.replace("$formula_name", vFormulaNameCut);
                                        element += '<ul><li>';
                                        element += '<input type="checkbox" id="' + idVariable + '"/>' +
                                            '<label id="' + fxVariableId + '" for="' + idVariable + '" ' +
                                            'title="' + variable.name + '" >$variable_name</label>';

                                        var vFormulaVarNameCut = variable.name.length > 20 ?
                                            variable.name.substring(0, 20) + ".." : variable.name;
                                        element = element.replace("$variable_name", vFormulaVarNameCut);
                                        element += '</li></ul>';
                                        element += '</li></ul>';
                                        if (version.formulaHeads && version.formulaHeads.length > 0) {
                                            var fxVariableId = 0;
                                            for (var f = 0; f < version.formulaHeads.length; f++) {
                                                fxVariableId += "fxVar_" + f;
                                                var fxId = "fx_" + guid();
                                                var fHead = version.formulaHeads[f];
                                                var fx = pModel.getFormula(fHead.formulaUUID);
                                                idFormula += "_" + f + "_" + guid();
                                                idVariable += "_" + f;
                                                var cssColor = "#666";
                                                if (fHead.active === false) {
                                                    cssColor = "#bbb";
                                                }
                                                element += '<ul><li>';
                                                element += '<input type="checkbox" id="' + idFormula + '" />' +
                                                    '<label for="' + idFormula + '" ' +
                                                    'title="' + fx.name + '" style="color:' + cssColor + '">' +
                                                    '$formula_name</label>';
                                                var fxNameCut = fx.name.length > 20 ?
                                                    fx.name.substring(0, 20) + ".." : fx.name;
                                                element = element.replace("$formula_name", fxNameCut);
                                                element += '<ul><li>';
                                                element += '<input type="checkbox" id="' + idVariable + '"/>' +
                                                    '<label id="' + fxVariableId + '" for="' + idVariable + '" ' +
                                                    'title="' + variable.name + '" >$variable_name</label>';

                                                var fxVariableNameCut = variable.name.length > 20 ?
                                                    variable.name.substring(0, 20) + ".." : variable.name;
                                                element = element.replace("$variable_name", fxVariableNameCut);
                                                element += '</li></ul>';
                                                element += '</li></ul>';
                                            }
                                        }
                                    } else {
                                        var formulaHead = pModel.getFormulaHeadWithFormulaUUID(formula.uuid);
                                        if (formulaHead) {
                                            //console.log();
                                            continue;
                                        }
                                        element += '<ul><li>';
                                        element += '<input type="checkbox" id="' + idFormula + '" />' +
                                            '<label for="' + idFormula + '" title="' + formula.name + '">$formula_name</label>';
                                        var formulaNameCut = formula.name.length > 20 ?
                                            formula.name.substring(0, 20) + ".." : formula.name;
                                        element = element.replace("$formula_name", formulaNameCut);
                                        element += '<ul><li>';
                                        element += '<input type="checkbox" id="' + idVariable + '"/>' +
                                            '<label for="' + idVariable + '" title="' + variable.name + '" >$variable_name</label>';

                                        var variableNameCut = variable.name.length > 20 ?
                                            variable.name.substring(0, 20) + ".." : variable.name;
                                        element = element.replace("$variable_name", variableNameCut);
                                        element += '</li></ul>';
                                        element += '</li></ul>';
                                    }

                                    element += '</li></ul></li>';
                                    $('#poolVariable_list').append(element);

                                }

                            }


                        }
                    }
                }
            }

        } else {
            filter = filter.toLocaleUpperCase();
            filter = filter.trim();
            if (filter) {
                var poolVariables = pVariable.listPoolVariable();
                if (poolVariables && poolVariables.length > 0) {
                    for (var i = 0; i < poolVariables.length; i++) {
                        var item = poolVariables[i];
                        if (item.name.toLocaleUpperCase().indexOf(filter) > -1) {
                            //'<input type="button" id="selectPoolVariable" value="&#10003;">' +

                            var $divVariable = $("#variable_list .variable");
                            var beforeAdded = false;
                            $.each($divVariable, function (index, data) {
                                if ($(data).find(".VariableNameContainer").find("li > a").text().toLocaleLowerCase() === item.name.toLocaleLowerCase()) {
                                    beforeAdded = true;
                                    return false;
                                }
                            });

                            if (!beforeAdded) {
                                var poolElement = '<li class="table_poolVariable" data-uuid="$uuid">$pool_variable_name' +

                                    '</li>';
                                poolElement = poolElement.replace("$uuid", item.uuid);
                                poolElement = poolElement.replace("$pool_variable_name", item.name);
                                $('#poolVariable_list').append(poolElement);
                            }
                        }
                    }
                } else {
                    $('#poolVariable_list').empty();
                }
            } else {
                $('#poolVariable_list').empty();
            }
        }


        /*$(".btnLabelVariable").each(function () {
            if ($(this).text().toLocaleUpperCase().indexOf(filter) > -1) {
                $(this).parents(".variable").show();
            } else {
                $(this).parents(".variable").hide();
            }
        });*/

    });


    //==============================================================================================
    //  LAYER
    //==============================================================================================

    $("#addLayerBtn").click(function (e) {
        e.preventDefault();
        if (!checkPermissionControl(ACTION_NAMES.LAYER.ADD)) {
            displayWarningMsg(MSG_HAS_NO_PERMISSION);
            return false;
        }
        var formulaUUID = $("#variable_list").attr("data-uuid");
        var formula = pModel.getFormula(formulaUUID);
        var layerName = "Katman_" + (formula.layerLastIndex);
        var layers = pModel.listLayer(formulaUUID);
        var layer = pModel.addLayer(formulaUUID, layerName);
        saveModel(MSG_SUCCESS_LAYER_ADD.replace("$layer_name", layerName),
            {item: layerName, itemUUID: layer.uuid, itemType: "layer", action: "create"});

        var dom_html = $("#layer_template").html();
        dom_html = dom_html.replace("$layer_name", layerName);
        $("#layers").append(dom_html);
        var layerObj = $("#layers").children().last();
        layerObj.attr("data-uuid", layer.uuid);
    })


    $('body').on("click", ".del_layer_btn", function (e) {
        e.preventDefault();

        if (!checkPermissionControl(ACTION_NAMES.LAYER.DELETE)) {
            displayWarningMsg(MSG_HAS_NO_PERMISSION);
            return false;
        }

        var layerObj = $(this).parents(".layer");
        var layerUUID = layerObj.attr("data-uuid");
        var layer = pModel.getLayer(layerUUID);
        var layerName = layer.name;
        var formulaUUID = $("#variable_list").attr("data-uuid");
        Confirm('Katman Silme İşlemi', 'Katmanı silmek istediğinizden emin misiniz?', 'Evet', 'Hayır', true, function () {

            pModel.deleteLayer(layerUUID);
            rightPartContextPropertiesReset();
            saveModel(MSG_SUCCESS_LAYER_DEL.replace("$layer_name", layerName),
                {item: layerName, itemUUID: layer.uuid, itemType: "layer", action: "delete"});
            layerObj.remove();
            if (formulaUUID) {
                var layers = pModel.listLayer(formulaUUID);
                if (layers.length < 2) {
                    $('#txtResultCodeBlocks').val('');
                }
            }
            $(".test_close").click();
        });

    });


    //==============================================================================================
    //  BOXES
    //==============================================================================================


    $('body').on("click", ".add_box_btn", function (e) {
        e.preventDefault();

        if (!checkPermissionControl(ACTION_NAMES.BOX.ADD)) {
            displayWarningMsg(MSG_HAS_NO_PERMISSION);
            return false;
        }

        var layerObj = $(this).parents(".layer");
        var layerUUID = layerObj.attr("data-uuid");
        var layer = pModel.getLayer(layerUUID);
        var boxes = pModel.listBox(layerUUID);
        var boxName = "";
        if (!boxes || boxes.length === 0)
            boxName = layer.name + "_KT_" + (boxes.length + 1);

        $.each(boxes, function (index, item) {
            var itemBoxName = item.name;
            var index = itemBoxName.indexOf("_KT_");
            var startIndex = index + 4;
            var endIndex = itemBoxName.length;
            var subBoxName = itemBoxName.substring(startIndex, endIndex);
            if ($.isNumeric(subBoxName)) {
                var lastIndex = Number(parseInt(subBoxName)) + Number(1);
                boxName = layer.name + "_KT_" + lastIndex;
            } else {
                boxName = layer.name + "_KT_" + (boxes.length + 1);
            }
        });
        //var boxType = $("#selectBoxType").val();
        var boxType = '';
        var box = pModel.addBox(layerUUID, boxName, boxType);
        saveModel(MSG_SUCCESS_BOX_ADD.replace("$box_name", boxName),
            {item: box.name, itemUUID: box.uuid, itemType: "box", action: "create"});

        var dom_html = $("#box_template").html();
        dom_html = dom_html.replace("$box_name", boxName);
        layerObj.append(dom_html);
        var boxObj = layerObj.children().last();
        boxObj.attr("data-uuid", box.uuid);

    });


    $('body').on("click", ".KT_box_edit", function (e) {
        e.preventDefault();
        resetUploadFile();

        if (!checkPermissionControl(ACTION_NAMES.BOX.UPDATE)) {
            displayWarningMsg(MSG_HAS_NO_PERMISSION);
            return false;
        }

        var boxUUID = $(this).parent().attr("data-uuid");
        var box = pModel.getBox(boxUUID);
        var selectBoxType = $("#selectBoxType");
        $(".menu2").attr('data-uuid', boxUUID);
        $("#txtSelectedBox").val(box.name);
        $("#txtBoxHeader").val(box.boxHeader);
        $("#txtBoxDetail").val(box.boxDetail);
        $('#boxDetails').hide();
        selectBoxType.val(box.type);
        fillAutoCompleteDataToTextArea("#txtCodeBlocks", box, true);
        //var src = "https://s3-eu-west-1.amazonaws.com/priceengine2/decurrentdecisiontablelinkcisiontables/";
        /*var src = "../pengine/decisiontables/";
        src = src + box.uuid + ".xlsx?" + guid();*/
        var src = editorURL + "/download/" + box.uuid;
        $("#decisiontablelink").attr('href', src);
        $("#localdecisiontablelink").attr('href', src);
        //$("#currentdecisiontablelink").attr('href', src);

        rightPartContextPropertiesReset();
        $(".menu2").append($(".BoxContextProperties"));
        var selectBoxTypeVal = selectBoxType.val();
        var boxTypeColor = getBoxTypeColor(selectBoxTypeVal);
        $(".boxTypeColor").css("background-color", boxTypeColor);

        if (selectBoxTypeVal === null || selectBoxType === '') {
            $("#CodeBlockContainer").hide();
            $("#DecisionTableContainer").hide();
            $("#downloadLogicalDecisionTableBtn").hide();
            $("#downloadDecisionTableBtn").hide();
            $("#LogicalOutputs").hide();
        } else if (selectBoxTypeVal === "DecisionTable") {
            $("#DecisionTableContainer").show();
            $("#downloadDecisionTableBtn").show();
            $("#CodeBlockContainer").hide();
            $("#downloadLogicalDecisionTableBtn").hide();
            $("#LogicalOutputs").hide();
        } else if (selectBoxTypeVal === "LogicalDecisionTable") {
            $("#DecisionTableContainer").show();
            $("#downloadLogicalDecisionTableBtn").show();
            $("#downloadDecisionTableBtn").hide();
            $("#CodeBlockContainer").hide();
            $("#LogicalOutputs").show();
            $('#chkMultiResult').prop('checked', box.multiResult ? box.multiResult : false);
            fillBoxOutputs(boxUUID);

        } else {
            $("#CodeBlockContainer").show();
            $("#DecisionTableContainer").hide();
            $("#downloadLogicalDecisionTableBtn").hide();
            $("#downloadDecisionTableBtn").hide();
            $("#LogicalOutputs").hide();
            if (selectBoxTypeVal === "SQLBlock") {
                fillSqlCombo(boxUUID);
            } else if (selectBoxTypeVal === "CodeBlock") {
                $('#selectCatalog').remove();
                $('#lblCatalog').remove();
                $('#selectCatalogTable').remove();
                $('#lblTable').remove();
            }
        }

        if (box.name === "ResultBox") { //ResultBox Properties Kısmı Gösterilmeyecek
            $(".menu2_form").hide();
        } else {
            $(".menu2_form").show();
        }

        $('#btn_show_box_detail').click();


    });


    $('body').on("click", ".close_io", function (e) {
        e.preventDefault();

        if (!checkPermissionControl(ACTION_NAMES.VARIABLE.DELETE_FROM_BOX)) {
            displayWarningMsg(MSG_HAS_NO_PERMISSION);
            return false;
        }

        if (!checkPermissionControl(ACTION_NAMES.BOX.DELETE)) {
            displayWarningMsg(MSG_HAS_NO_PERMISSION);
            return false;
        }

        var ioObj = $(this).parent();
        var ioUUID = ioObj.attr("data-uuid");
        var boxIO = pModel.boxIOMap[ioUUID];
        var itemName = boxIO.name;
        var itemId = boxIO.uuid;
        var itemType = "variable";
        var message = MSG_SUCCESS_BOX_VARIABLE_RELEASE;
        if (boxIO) {
            var box = pModel.getBox(boxIO.boxUUID);
            if (box) {
                if (box.name.indexOf("ResultBox") !== -1) {
                    itemName = box.name;
                    itemId = box.uuid;
                    itemType = "box";
                    message = MSG_SUCCESS_BOX_RELEASE;
                }
            }
        }
        pModel.deleteBoxIO(ioUUID);
        ioObj.remove();
        saveModel(message, {item: itemName, itemUUID: itemId, itemType: itemType, action: "delete"});
    });


    $("#deleteBoxBtn").click(function (e) {
        e.preventDefault();

        if (!checkPermissionControl(ACTION_NAMES.BOX.DELETE)) {
            displayWarningMsg(MSG_HAS_NO_PERMISSION);
            return false;
        }

        Confirm('Kutu Silme İşlemi', 'Kutuyu silmek istediğinizden emin misiniz?', 'Evet', 'Hayır', true, function () {
            var boxUUID = $(".menu2").attr('data-uuid');
            var box = pModel.getBox(boxUUID);
            pModel.deleteBox(boxUUID);
            var resultBoxUUID = $(".KT_box.KT_box_result").attr('data-uuid');
            //console.log("Result Box uuid " + resultBoxUUID);
            pModel.deleteBoxFromResultBox(resultBoxUUID, boxUUID);
            saveModel(MSG_SUCCESS_BOX_DEL.replace("$box_name", box.name),
                {item: box.name, itemUUID: box.uuid, itemType: "box", action: "delete"});

            $(".KT_box").each(function () {
                if ($(this).attr("data-uuid") === boxUUID) {
                    $(this).remove();
                    rightPartContextPropertiesReset();
                }
            });


            $(".input_output").each(function () {
                if ($(this).attr("data-box-uuid") === boxUUID) {
                    $(this).remove();
                }
            });

            $(".test_close").click();

        });


    });


    $("#updateBoxBtn").click(function (e) {
        e.preventDefault();

        if (!checkPermissionControl(ACTION_NAMES.BOX.UPDATE)) {
            displayWarningMsg(MSG_HAS_NO_PERMISSION);
            return false;
        }

        $('#openTestEditorBtn').attr("disabled", true);
        var warn = false;
        var boxUUID = $(".menu2").attr('data-uuid');
        var box = pModel.getBox(boxUUID);
        var boxType = $("#selectBoxType").val();
        var boxHeader = $("#txtBoxHeader").val();
        boxHeader = boxHeader.trim();
        boxHeader = boxHeader.substring(0, 20);
        var boxDetail = $("#txtBoxDetail").val();
        boxDetail = boxDetail.trim();
        boxDetail = boxDetail.substring(0, 160);
        var multiResult = $('#chkMultiResult').is(":checked");
        var boxTypeColor = getBoxTypeColor(boxType);
        $(".boxTypeColor").css("background-color", boxTypeColor);
        var params = {
            name: $("#txtSelectedBox").val(),
            type: boxType,
            codeblock_text: $("#txtCodeBlocks").val(),
            boxDetail: boxDetail,
            boxHeader: boxHeader,
            multiResult: multiResult
        };

        if (boxType !== "LogicalDecisionTable" && boxType !== "SQLBlock") {
            params["outputs"] = [];
        }

        if (boxType === "SQLBlock") {
            var catalog = $('#selectCatalog option:selected').val();
            //var table = $('#selectCatalogTable option:selected').val();
            //var column = $('#selectCatalogTableColumn option:selected').val();
            if (catalog) {
                if (catalog === "---") {
                    warn = true;
                }
            } else {
                warn = true;
            }
            var sql_condition = {
                catalog: catalog,
                user: getEmail()
            };
            params["sql_condition"] = sql_condition;
        }

        if (warn) {
            displayWarningMsg(MSG_WARN_CHOOSE_CATALOG)
        } else {
            var triangleClassName = boxType === "DecisionTable" ? "triangle_decision_table" :
                boxType === "LogicalDecisionTable" ? "triangle_logical_decision_table" :
                    boxType === "CodeBlock" ? "triangle_code_block" :
                        boxType === "SQLBlock" ? "triangle_sql_block" : "triangle";
            var boxTypeColor = getBoxTypeColor(boxType);
            $("[data-uuid='" + boxUUID + "']").find(".KT_box_header").text(boxHeader);
            $("[data-uuid='" + boxUUID + "']").find("div[class^='triangle']").removeClass().addClass(triangleClassName);
            $(".boxTypeColor").css("background-color", boxTypeColor);

            pModel.updateBox(boxUUID, params);
            fillAutoCompleteDataToTextArea("#txtCodeBlocks", box, true);
            saveModel(MSG_SUCCESS_BOX_UPDATE,
                {item: params.name, itemUUID: boxUUID, itemType: "box", action: "update"});
        }
    });


    $("#addLogicalOutputBtn").click(function (e) {
        e.preventDefault();
        var formulaUUID = $("#variable_list").attr("data-uuid");
        var formula = pModel.getFormula(formulaUUID);

        var outputVariableName = $("#txtOutputVariable").val();
        outputVariableName = outputVariableName.trim();
        if (!outputVariableName || outputVariableName === null || outputVariableName === '') {
            displayWarningMsg("Lütfen Geçerli Çıktı Değişken Değeri Giriniz.");
        } else {
            var warnSameName = false;
            if (formula && formula.variables && formula.variables.length > 0) {
                for (var i = 0; i < formula.variables.length; i++) {
                    var formulaVariable = formula.variables[i];
                    if (formulaVariable) {
                        if (formulaVariable.name === outputVariableName) {
                            displayWarningMsg("Çıktı Değişken Adı, Değişken Adlarıyla Aynı Olamaz.");
                            warnSameName = true;
                            break;
                        }
                    }
                }
            }

            if (!warnSameName) {

                var outputVariableType = $("#selectOutputVariableValueType").val();
                var boxUUID = $(".menu2").attr('data-uuid');
                var boxOutputId = $('#boxOutputId').text();
                var btnText = $("#addLogicalOutputBtn").val();
                if (!boxOutputId && btnText === 'Ekle') {
                    if (!checkPermissionControl(ACTION_NAMES.VARIABLE.ADD_LOGICAL_OUTPUT)) {
                        displayWarningMsg(MSG_HAS_NO_PERMISSION);
                        return false;
                    }
                    var variable_box_UUID = guid();
                    pModel.addBoxIO(outputVariableName, boxUUID, 'output', variable_box_UUID, outputVariableType);
                    var boxIO = pModel.getBoxIOWithType(boxUUID, variable_box_UUID, 'output');
                    var outputElement = '<li class="table_output" data-uuid="$uuid" data-box-type="$boxType">$io_name' +
                        '<input type="button" id="editOutput" value="...">' +
                        '<input type="button" id="removeOutput" class="close_output" value="x">' +
                        '</li>';
                    outputElement = outputElement.replace("$uuid", boxIO.uuid);
                    outputElement = outputElement.replace("$boxType", outputVariableType);
                    outputElement = outputElement.replace("$io_name", outputVariableName);
                    $('#outputlist').append(outputElement);
                    saveModel(MSG_SUCCESS_BOX_OUTPUT_VARIABLE_CONNECT,
                        {item: outputVariableName, itemUUID: boxIO.uuid, itemType: "variable", action: "create"});

                } else if (boxOutputId && btnText === 'Değiştir') {
                    // TODO UPDATE_LOGICAL_OUTPUT
                    var params = {
                        name: outputVariableName,
                        variableType: outputVariableType
                    };

                    var newOutputText = outputVariableName + '<input type="button" id="editOutput" value="...">' +
                        '<input type="button" id="removeOutput" class="close_output" value="x">'
                    $(".table_output[data-uuid=" + boxOutputId + "]").html(newOutputText);

                    pModel.updateBoxIO(null, boxOutputId, null, params);
                    saveModel(MSG_SUCCESS_BOX_OUTPUT_VARIABLE_UPDATE,
                        {item: params.name, itemUUID: boxOutputId, itemType: "variable", action: "update"});
                }
                $('#boxOutputId').text('');
                $('#txtOutputVariable').val('');
                $("#addLogicalOutputBtn").val('Ekle');
            }
        }

    });

    $('body').on("click", ".close_output", function (e) {
        e.preventDefault();

        if (!checkPermissionControl(ACTION_NAMES.VARIABLE.DELETE_FROM_BOX)) {
            displayWarningMsg(MSG_HAS_NO_PERMISSION);
            return false;
        }

        var outputUUID = $(this).closest("li").attr('data-uuid');
        $('#boxOutputId').text('');
        $('#txtOutputVariable').val('');
        $("#addLogicalOutputBtn").val('Ekle');
        $(this).closest("li").remove();
        var deletedIO = pModel.deleteBoxIO(outputUUID);
        if (deletedIO) {
            saveModel(MSG_SUCCESS_BOX_VARIABLE_RELEASE,
                {item: deletedIO.name, itemUUID: outputUUID, itemType: "variable", action: "delete"});
        } else {
            displayWarningMsg("Silme işleminde hata oluştu! Lütfen yetkili kişiye haber veriniz.");
        }
    });

    function fillBoxOutputs(boxUUID) {
        $('#outputlist').empty();
        var boxUUID = boxUUID ? boxUUID : $(".menu2").attr('data-uuid');
        var listOutputs = pModel.listBoxIO(boxUUID, 'output');

        if (listOutputs) {
            for (var i = 0; i < listOutputs.length; i++) {
                var boxOutput = listOutputs[i];
                if (boxOutput.variableType !== 'LogicalDecisionTable' &&
                    boxOutput.variableType !== 'SQLBlock' &&
                    boxOutput.variableType !== 'CodeBlock') {
                    var outputElement = '<li class="table_output" data-uuid="$uuid" data-box-type="$boxType">$io_name' +
                        '<input type="button" id="editOutput" value="...">' +
                        '<input type="button" id="removeOutput" class="close_output" value="x">' +
                        '</li>';
                    outputElement = outputElement.replace("$uuid", boxOutput.uuid);
                    outputElement = outputElement.replace("$boxType", boxOutput.variableType);
                    outputElement = outputElement.replace("$io_name", boxOutput.name);
                    $('#outputlist').append(outputElement);

                }
            }
        }
    }

    function fillSqlCombo(boxUUID) {
        var boxUUID = boxUUID ? boxUUID : $(".menu2").attr('data-uuid');
        var box = pModel.getBox(boxUUID);
        if (box && box.sql_condition) {

            makeSqlBlockCatalogCombo(true, box.sql_condition);


            /*$("#selectCatalog > [value=" + box.sql_condition.catalog + "]").attr("selected", "true");

            var catalogCombo = $('#selectCatalog').val(box.sql_condition.catalog);*/
            /*makeSqlBlockTablesCombo(catalogCombo);
            var tableCombo = $('#selectCatalogTable').val(box.sql_condition.table);
            makeSqlBlockTableColumnsCombo(tableCombo);

            $('#selectCatalogTableColumn').val(box.sql_condition.column);*/
        }
    }

    $("#selectBoxType").change(function (e) {
        e.preventDefault();
        resetUploadFile();
        var selectBoxTypeVal = $("#selectBoxType").val();
        var boxTypeColor = getBoxTypeColor(selectBoxTypeVal);
        $(".boxTypeColor").css("background-color", boxTypeColor);
        $('.clsSelectCatalog').hide();
        $('#txtCodeBlocks').val('');
        if (selectBoxTypeVal === "DecisionTable") {
            $("#DecisionTableContainer").show();
            $("#CodeBlockContainer").hide();
            $("#downloadDecisionTableBtn").show();
            $("#downloadLogicalDecisionTableBtn").hide();
            $("#LogicalOutputs").hide();
        } else if (selectBoxTypeVal === "LogicalDecisionTable") {

            $("#DecisionTableContainer").show();
            $("#CodeBlockContainer").hide();
            $("#downloadDecisionTableBtn").hide();
            $("#downloadLogicalDecisionTableBtn").show();
            $("#LogicalOutputs").show();
            fillBoxOutputs();
        } else {
            $("#CodeBlockContainer").show();
            $("#DecisionTableContainer").hide();
            $("#downloadDecisionTableBtn").hide();
            $("#downloadLogicalDecisionTableBtn").hide();
            $("#LogicalOutputs").hide();
            if (selectBoxTypeVal === "SQLBlock") {
                makeSqlBlockCatalogCombo();
            } else if (selectBoxTypeVal === 'CodeBlock') {
                $('#selectCatalog').remove();
                $('#lblCatalog').remove();
                $('#selectCatalogTable').remove();
                $('#lblTable').remove();

            }


        }

    });


    $("#downloadDecisionTableBtn").click(function (e) {
        e.preventDefault();

        if (!checkPermissionControl(ACTION_NAMES.TABLE.CREATE)) {
            displayWarningMsg(MSG_HAS_NO_PERMISSION);
            return false;
        }

        $('#openTestEditorBtn').attr("disabled", true);
        var boxUUID = $(".menu2").attr('data-uuid');
        var box = pModel.getBox(boxUUID);
        var holderArray = new Array();

        var msg = "";
        var iSelectExist = false;
        var inputs = box.inputs;
        for (var i = 0; i < inputs.length; i++) {
            var input = inputs[i];
            var variable = pModel.getVariable(input.variableUUID);
            if (variable.type != "Select") {
                var msgTemp000X1 = "<span class='error'>(KararTablosu Hatası) $boxName kutusundaki $inputName değişkenlerinin tipi seçim olmalıdır</span></br>"
                msg = msg + msgTemp000X1.replace("$boxName", box.name).replace("$inputName", variable.name);

            } else {
                iSelectExist = true;
                var holder = pHolder.getHolder(variable.holderUUID);
                if (holder == null) {
                    var msgTemp000X2 = "<span class='error'>(KararTablosu Hatası) $boxName kutusundaki $inputName değişkenlerinin değer kümesi atanmamış</span></br>"
                    msg = msg + msgTemp000X2.replace("$boxName", box.name).replace("$inputName", variable.name);
                } else {
                    holderArray.push(holder);
                }
            }
        }

        //Check Outputs
        var outputs = box.outputs;
        var outputsName = "";
        for (var i = 0; i < outputs.length; i++) {
            var iBox = pModel.getBox(outputs[i].variableUUID);
            var msgTemp000X0 = "<span class='error'>(KararTablosu Hatası) $boxName kutusundaki $outputName değişkeni Karar Tablosu için uygun değil.</span></br>"
            msg = msg + msgTemp000X0.replace("$boxName", box.name).replace("$outputsName", iBox.name);
        }

        //Holder Array
        if (!iSelectExist) {
            var msgTemp000X3 = "<span class='error'>(KararTablosu Hatası) $boxName kutusundaki hiç seçim değişkeni yoktur.</span></br>"
            msg = msg + msgTemp000X3.replace("$boxName", box.name);

        }

        if (msg === "") {
            var dt = {name: box.uuid, holders: holderArray};
            var dtJSON = JSON.stringify(dt);
            $.ajax({
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', token);
                },
                type: "POST",
                url: editorURL + "/api/v1/decisiontable/template",
                data: dtJSON,
                dataType: "json",
                contentType: "application/json",
                timeout: 5000,
                success: function (data) {
                    if (data.msg) {
                        displayWarningMsg(data.msg);
                    }
                },
                error: function (xhr, exception) {
                    gotException(xhr, exception);
                }
            });
        } else {
            displayWarningMsg(msg);
        }

    });

    $("#downloadLogicalDecisionTableBtn").click(function (e) {
        e.preventDefault();

        if (!checkPermissionControl(ACTION_NAMES.TABLE.CREATE)) {
            displayWarningMsg(MSG_HAS_NO_PERMISSION);
            return false;
        }
        $('#openTestEditorBtn').attr("disabled", true);
        var boxUUID = $(".menu2").attr('data-uuid');
        var box = pModel.getBox(boxUUID);
        var msg = "";
        var inputVariableArray = getInputVariables(box);
        var outputVariableArray = getOutputVariables(box);

        //Check Outputs
        var outputs = box.outputs;
        if (outputs.length === 0) {
            var msgTemp000X0 = "<span class='error'>(MantıksalKararTablosu Hatası) $boxName kutusunda tanımlı bir çıktı değişkeni bulunmamaktadır.</span></br>";
            msg = msg + msgTemp000X0.replace("$boxName", box.name)
        }

        if (msg === "") {
            var dt = {name: box.uuid, inputVariables: inputVariableArray, outputVariables: outputVariableArray};
            var dtJSON = JSON.stringify(dt);
            $.ajax({
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', token);
                },
                type: "POST",
                url: editorURL + "/api/v1/logicaldecisiontable/template",
                data: dtJSON,
                dataType: "json",
                contentType: "application/json",
                timeout: 5000,
                success: function (data) {
                    if (data.msg) {
                        displayWarningMsg(data.msg);
                    }
                },
                error: function (xhr, exception) {
                    gotException(xhr, exception);
                }
            });
        } else {
            displayWarningMsg(msg);
        }

    });


    //==============================================================================================
    //  WARNING MSG
    //==============================================================================================


    $('body').on("click", ".wm_open_btn", function (k) {
        $(".wm").toggleClass("wm_open");
        $(this).toggleClass("wm_close_btn");
    });

    $('body').on("click", ".wm_open_btn", function (k) {
        $(".main2").toggleClass("main2_close");
    });


    //==============================================================================================
    //  TEST EDITOR
    //==============================================================================================

    // overlay pop_up

    $('body').on("click", "#openTestEditorBtn", function (e) {
        e.preventDefault();
        $('.pop_up_1.settings').remove();
        $('.pop_up_1.confirm').hide();

        $("#test_result").text('');
        $("#test_error").text('');


        var formulaUUID = $("#variable_list").attr("data-uuid");
        var formula = pModel.getFormula(formulaUUID);
        $(".test_header_title").text(formula.name + " Formül Test Ekranı");
        $(".shadow").addClass("open_test");
        $(".pop_up_1").addClass("open_test testEditor");

        var suite = tHolder.getSuiteWithFormulaUUID(formulaUUID);
        if (suite == undefined) {
            suite = tHolder.addSuite(formulaUUID);
        }

        $(".tests").html("");
        $("#testvariables_panel").hide();
        var tests = suite.tests;
        for (var i = 0; i < tests.length; i++) {
            test = tests[i];
            var dom_html = $("#test_template").html();
            dom_html = dom_html.replace("$test_name", test.name);
            $(".tests").prepend(dom_html);
            var testObj = $(".tests").children().first();
            testObj.attr('data-uuid', test.uuid);
        }

    });

    $('body').on("click", ".test_close", function (e) {
        $(".shadow").removeClass("open_test");
        $(".pop_up_1").removeClass("open_test testEditor");

    });

    $('body').on("click", "#btnNewTest", function (e) {
        e.preventDefault();
        var dom_html = $("#test_template").html();
        var testName = "TempTestName";
        dom_html = dom_html.replace("$test_name", testName);
        $(".tests").prepend(dom_html);
        $(".tests").children().first().children().first().hide();
        $(".tests").children().first().prepend($(".InputTextAndSubmitContainer"));
        $("#txtSelectedId").focus();
        modeOfInput = "new";

    });


    $('body').on("click", ".btnLabelTest", function (e) {
        e.preventDefault();
        var testObj = $(this).parents(".test");
        var testUUID = testObj.attr("data-uuid");
        $("#testvariables_list").html("");
        $("#testvariables_list").attr("data-uuid", testUUID);
        $("#test_result").text("");
        $("#test_error").text("");
        $("#visualizeResult").hide();
        var formulaUUID = $("#variable_list").attr("data-uuid");
        var formula = pModel.getFormula(formulaUUID);
        var variables = formula.variables;

        var sortedArray = variables.sort(function (a, b) {
            return a.name.localeCompare(b.name);
        });

        for (var i = 0; i < sortedArray.length; i++) {
            variable = sortedArray[i];
            var dom_html = $("#testvariable_template").html();
            dom_html = dom_html.replace("$variable_name", variable.name);
            $("#testvariables_list").append(dom_html);
            var testVariableObj = $("#testvariables_list").children().last();
            testVariableObj.attr("data-uuid", variable.uuid);
            var textInput = testVariableObj.find(".testVariableInput");
            textInput.removeAttr("data-inputmask-alias");
            textInput.removeAttr("data-inputmask-inputformat");
            var selectInput = testVariableObj.find(".testVariableSelect");
            if (variable.type == "Select") {
                textInput.hide();
                var holder = pHolder.getHolder(variable.holderUUID);
                var values = holder.values;
                for (var j = 0; j < values.length; j++) {
                    var value = values[j];
                    var dom_html = '<option value="$variablevalue_value">$variablevalue_name</option>';
                    dom_html = dom_html.replace("$variablevalue_value", value.uuid).replace("$variablevalue_name", value.name);
                    selectInput.append(dom_html);
                }
            } else if (variable.type === 'Date') {
                textInput.attr("data-inputmask-alias", "date");
                textInput.attr("data-inputmask-inputformat", "dd/mm/yyyy");
                textInput.inputmask();
                //textInput.inputmask("99/99/9999", {"placeholder": "dd/mm/yyyy"});
                selectInput.hide();
            } else {
                selectInput.hide();
            }
        }

        var test = tHolder.getTest(testUUID);
        if (test != null) {
            var variableStates = test.variableStates;
            for (var i = 0; i < variableStates.length; i++) {
                variableUUID = variableStates[i].variableUUID;
                var variable = pModel.getVariable(variableUUID);
                if (variable) {
                    if (variable.type == "Select") {
                        var select = '#testvariables_list >  [data-uuid="$variableUUID"] > .testVariableSelect'
                        select = select.replace("$variableUUID", variableUUID);
                        var selectObj = $(select);
                        if (selectObj.length > 0) {
                            selectObj.val(variableStates[i].value);
                        }
                    } else {
                        var input = '#testvariables_list >  [data-uuid="$variableUUID"] > .testVariableInput'
                        input = input.replace("$variableUUID", variableUUID);
                        var inputObj = $(input);
                        if (inputObj.length > 0) {
                            inputObj.val(variableStates[i].value);
                        }

                    }
                }
            }
        }


        $("#testvariables_panel").show();
    });


    $('body').on("click", "#saveTestBtn", function (e) {
        e.preventDefault();
        $(".testvariable").each(function () {
            var testUUID = $("#testvariables_list").attr("data-uuid");
            var variableUUID = $(this).attr("data-uuid");
            if (variableUUID != null) {
                var variable = pModel.getVariable(variableUUID);
                var val = "";
                if (variable.type == "Select") {
                    var selectObj = $(this).find(".testVariableSelect");
                    val = selectObj.val();
                } else {
                    var inputObj = $(this).find(".testVariableInput");
                    val = inputObj.val();
                }
                tHolder.addVariableState(testUUID, variableUUID, val);
            }

        });
        saveTest(MSG_SUCCESS_TEST_STATE_SAVED);
    });


    $('body').on("click", "#runTestBtn", function (e) {
        e.preventDefault();
        runTest();
    });


    //Test Setting Event
    $('body').on("click", ".test_settings_btn", function (e) {
        e.preventDefault();
        $(this).after($(".TestContextMenuContainer"));

        $(".TestContextMenuContainer").removeClass("slide_left");
        setTimeout(function () {
            $(".TestContextMenuContainer").toggleClass("slide_left");
        }, 10);
    });


    $('body').on("click", "#btn_test_delete", function (e) {
        e.preventDefault();
        $("#test_error").text("");
        $("#test_result").text("");
        $("#testvariables_list").html("");
        $("#testvariables_panel").hide();
        var testObj = $(this).parents(".test");
        //var folderUUID = folderObj.data("UUID");
        var testUUID = testObj.attr("data-uuid");
        ConfirmPopup('Test Silme İşlemi', 'Testi silmek istediğinizden emin misiniz?',
            'Evet', 'Hayır', function () {


                $("#context_test_menu_template").append($(".TestContextMenuContainer"));
                tHolder.deleteTest(testUUID);
                saveTest(MSG_SUCCESS_TEST_DELETED);
                $("#test_error").text("");
                $("#test_result").text("");
                $("#testvariables_list").html("");
                $("#testvariables_panel").hide();
                testObj.remove();
            });


    });


    //test formula test new rename
    $('body').on("click", "#btn_test_rename", function (e) {
        e.preventDefault();
        $("#test_error").text("");
        $("#test_result").text("");
        var testObj = $(this).parents(".test");
        var testUUID = testObj.attr("data-uuid");
        var test = tHolder.getTest(testUUID);
        $("#txtSelectedId").val(test.name);
        $("#context_test_menu_template").append($(".TestContextMenuContainer"));
        testObj.prepend($(".InputTextAndSubmitContainer"));
        testObj.find(".TestNameContainer").hide();
        $("#txtSelectedId").focus();
        modeOfInput = "edit";

    });

    $('body').on("click", "#btn_model_history", function (e) {
        e.preventDefault();
        $('.content_menu').hide();
        $('.main_content.urun2.open_main').hide();
        $('.model_history').show();

    });

    $('body').on("click", "#btn_global_settings", function (e) {
        e.preventDefault();

        $('.settings').remove();
        var popupSettings = '<div class="pop_up_1 settings">' +
            '<div class="test_main" style="width: inherit;">' +
            '<div class="test_header">' +
            '<span class="test_header_title">test_header</span>' +
            '<input class="test_close" type="button" value="x"></div>' +
            '<div class="test_header_form" id="testvariables_panel">' +
            '<div class="panel" style="width: 92%;"></div>' +
            '<div class="clear"></div><div class="clear"></div>' +
            '</div></div></div>';

        var variablesDiv = '<div class="table-container">' +
            '<div class="table-row">' +
            '<div class="table-left">' +
            '<div><input type="text" tabindex="1" placeholder="Değişken Ara" id="txtSearchPoolVariable" ' +
            'name="txtSearchPoolVariable" size="25"/></div>' +
            '</div>' +
            '</div>' +
            '<div class="table-row">' +
            '<div class="table-left">' +
            '<div><input type="text" tabindex="2" placeholder="Değişken Adı" maxlength="25" id="txtVariableName" ' +
            'name="txtVariableName" size="25" required/></div>' +
            '</div>' +
            '<div class="table-middle"><div>' +
            '<select id="selectPoolVariableValueType">' +
            '<option value="Integer">Sayı</option>' +
            '<option value="Date">Tarih</option>' +
            '<option value="String">Metin</option>' +
            '<option value="Select">Seçim</option>' +
            '</select></div></div>' +
            '<div class="table-right">' +
            '<div id="SelectPoolValueIdContainer" style="display: none;">' +
            '<select id="selectPoolValueID">' +
            '</select>' +
            '<ul id="selectPoolValueIDDetails" style="display:none;">' +
            '</ul>' +
            '</div></div></div>' +
            '<div class="table-row">' +
            '<div class="table-right">' +
            '<div><input type="text" tabindex="4" placeholder="Açıklama" maxlength="140" id="txtVariableDescription" ' +
            'name="txtVariableDescription" size="25" required/></div>' +
            '</div>' +
            '<div class="table-right" style="vertical-align:top; ">' +
            '<input type="button" id="btn_save_pool_variable"  style="padding: 0px 10px 1px 10px !important;" value="Kaydet"/>' +
            '<input type="button" id="btn_clear_pool_variable" style="padding: 0px 10px 1px 10px !important;" value="Temizle"/>' +
            '</div>' +
            '</div></div>' +
            '<span id="editedPoolVariable" style="display:none;"></span>' +
            '<span id="editedPoolVariableName" style="display:none;"></span>' +
            '<div id="variableDocuments"></div><div id="page-variable-nav"></div>';


        var dbDiv = '<div class="table-container">' +
            '<div class="table-row">' +
            '<div class="table-left">' +
            '<div><input type="text" tabindex="1" placeholder="Katalog Adı" id="txtDbCatalogName" ' +
            'name="txtDbCatalogName" size="40" required/></div>' +
            '</div></div>' +
            '<div class="table-row">' +
            '<div class="table-left">' +
            '<div><input type="text" tabindex="2" placeholder="Sunucu" id="txtDbServer" ' +
            'name="txtDbServer" size="40" required/></div>' +
            '<div><input type="text" tabindex="3" placeholder="Veritabanı" id="txtDbName" ' +
            'name="txtDbName" size="40" required/></div>' +
            '</div>' +
            '<div class="table-right">' +
            '<div><input type="text" tabindex="4" placeholder="Kullanıcı Adı" id="txtDbUsername" ' +
            'name="txtDbUsername" size="40" required/></div>' +

            '<div><input type="password" tabindex="5" placeholder="Şifre" id="txtDbPassword" ' +
            'name="txtDbPassword" size="40" required/></div>' +
            '<div><input type="button" tabindex="6" id="btn_save_catalog" value="Kaydet"/></div>' +
            '</div></div>' +
            '</div>' +
            '<span id="editedCatalog" style="display:none;"></span>' +
            '<div id="catalogDocuments"></div><div id="page-catalog-nav"></div>';
        var tabs =
            '<input type="radio" name="nav" id="variableTab" checked="checked" class="tabMenu"/>' +
            '<label for="variableTab" class="tabMenuLabel">Değişkenler</label>' +
            '<input type="radio" name="nav" id="choosableValues" class="tabMenu"/>' +
            '<label for="choosableValues" class="tabMenuLabel">Seçimli Değerler</label>' +
            '<input type="radio" name="nav" id="db" class="tabMenu"/>' +
            '<label for="db" class="tabMenuLabel">Veritabanı</label>';

        var tabContents =
            '<div class="tableContent db"></div>' +
            '<div class="tableContent choosableValues"></div>' +
            '<div class="tableContent variableTab"></div>';
        var tableDiv = '<div class="table-container">' +
            '<div class="table-row">' +
            '<div class="table-left">' +
            '<input type="text" placeholder="Yeni Seçimli Değer" ' +
            'id="newSelectiveValueItem" style="margin-left:0px;"/>' +
            '</div>' +
            '<div class="table-left" style="position: absolute;margin-left: 0px;margin-top: -3px;">' +
            '<input type="button" id="btn_save_selective_value" ' +
            'value="Kaydet" style="margin-left:5px;"/>' +
            '</div></div>' +
            '</div>' +

            '<div id="valueDocuments"></div>' +
            '<div id="page-nav"></div>';


        $('.shadow').append(popupSettings);
        $('.pop_up_1.settings').css({"width": "800px", "height": "575px", "overflow": "overlay"});
        $('.pop_up_1.settings').find('.panel').append(tabs);
        $('.pop_up_1.settings').find('.panel').append(tabContents);
        $('.pop_up_1.settings').find('.tableContent.variableTab').append(variablesDiv);
        $('.pop_up_1.settings').find('.tableContent.choosableValues').append(tableDiv);
        $('.pop_up_1.settings').find('.tableContent.db').append(dbDiv);


        $(".test_header_title").text("Tanımlama Ekranı");
        $(".shadow").addClass("open_test");
        $(".pop_up_1.settings").addClass("open_test");
        if (userValues) {
            fillSelectivePoolValueCombo(userValues);
        } else {
            valueCall();
        }
        loadValueCombo();
        loadCatalogTable(1);
        loadVariableTable(1);

    });


    //==============================================================================================
    //  RESULT BOX
    //==============================================================================================


    //ResultBox Code Block Updated
    $("#txtResultCodeBlocks").keyup(function () {
        var formulaUUID = $("#variable_list").attr("data-uuid");
        var formula = pModel.getFormula(formulaUUID);
        var layers = formula.layers;
        for (var i = 0; i < layers.length; i++) {
            var layer = layers[i];
            if (layer.name == "ResultLayer") { //KT_Box_Result
                $(".layer_result").attr("data-uuid", layer.uuid);
                var box = layer.boxes[0];
                fillAutoCompleteDataToTextArea("#txtResultCodeBlocks", box, false);
            }
        }
    });

    $('body').on("click", ".KT_result_box_save", function (e) {
        e.preventDefault();

        if (!checkPermissionControl(ACTION_NAMES.BOX.SAVE_RESULT)) {
            displayWarningMsg(MSG_HAS_NO_PERMISSION);
            return false;
        }

        var formulaUUID = $("#variable_list").attr("data-uuid");
        var formula = pModel.getFormula(formulaUUID);
        var layers = formula.layers;
        for (var i = 0; i < layers.length; i++) {
            var layer = layers[i];
            if (layer.name == "ResultLayer") { //KT_Box_Result
                $(".layer_result").attr("data-uuid", layer.uuid);
                var box = layer.boxes[0];
                var params = {name: box.name, type: box.type, codeblock_text: $("#txtResultCodeBlocks").val()};
                var formulaParams = {returnType: $(".selectReturnType option:selected").val()};
                pModel.updateBox(box.uuid, params);
                pModel.updateFormula(formulaUUID, formulaParams);
                saveModel(MSG_SUCCESS_RESULT_BOX_UPDATE,
                    {item: box.name, itemUUID: box.uuid, itemType: "box", action: "update"});

            } //enf of if
        } //enf of for

    });

    //==============================================================================================
    //  HEADER
    //==============================================================================================

    $("#lblUserName").text(localStorage.getItem("profile_name"));
    $("#lblEmail").text(localStorage.getItem("profile_email"));

    $('body').on("click", "#btnLogout", function (e) {
        e.preventDefault();
        sessionStorage.clear();
        window.location.href = "/peditorweb/index.html";

    });


    $('#downloadTemplate').submit(function (e) {
        //e.preventDefault();  //prevent form from submitting

        if (!checkPermissionControl(ACTION_NAMES.TABLE.DOWNLOAD)) {
            displayWarningMsg(MSG_HAS_NO_PERMISSION);
            return false;
        }

        var fullPath = $("#uploadExcelFile").val();
        var filename = fullPath.replace(/^.*[\\\/]/, '');
        var excelFile = isExcel(filename);
        if (!excelFile) {
            resetUploadFile();
            displayWarningMsg("Lütfen şablon olarak indirilen excel dosyasını seçiniz.");
            return false;
        }

    });

});

function resetUploadFile() {
    $("#uploadExcelFile").val('');
    if (!/safari/i.test(navigator.userAgent)) {
        $("#uploadExcelFile").type = '';
        $("#uploadExcelFile").type = 'file';
    }
}

function isVariableUseAsAnInput(v, formulaUUID) {

    var layers = pModel.listLayer(formulaUUID);
    for (var i = 0; i < layers.length; i++) {
        var bList = pModel.listBox(layers[i].uuid);
        for (var j = 0; j < bList.length; j++) {
            var inputs = bList[j].inputs;
            for (var k = 0; k < inputs.length; k++) {
                var input = inputs[k];
                if (input.variableUUID == v.uuid) {
                    return true;
                }
            }
        }
    }
    return false;

}

function fillAutoCompleteDataToTextArea(selectorComp, box, render) {

    if (render) {
        $(selectorComp).val("");
        $(selectorComp).val(box.codeblock_text);
    }
    //console.log("Box ilki" + box);
    //console.log("Box ilki name" + box.name);
    //console.log("Box ilki type" + box.uuid);
    var autoComplateData = [];
    if ('SQLBlock' === box.type) {
        var resultIndex = autoComplateData.indexOf("result");
        if (resultIndex !== -1) autoComplateData.splice(resultIndex, 1);
    } else {
        autoComplateData.push("result");
    }
    var i;
    for (i = 0; i < box.inputs.length; i++) {
        var input = box.inputs[i];
        if (input) {
            if (input.variableUUID !== undefined) {
                var variable = pModel.getVariable(input.variableUUID);
                if (variable) {
                    //console.log(variable);
                    autoComplateData.push("answer." + variable.name);
                }
            }
        }
    }


    for (i = 0; i < box.outputs.length; i++) {
        var output = box.outputs[i];
        if (output.variableUUID !== undefined) {
            var boxOutput = pModel.getBox(output.variableUUID);
            if (boxOutput) {
                autoComplateData.push(boxOutput.name + "_Result");
            }
        }
    }

    var boxOutputArray = [];


    for (i = 0; i < box.outputs.length; i++) {
        output = box.outputs[i];
        if (output.variableUUID) {
            var selectedBox = pModel.getBox(output.variableUUID);

            if (selectedBox) {
                if (selectedBox.outputs && selectedBox.outputs.length > 0) {
                    for (var j = 0; j < selectedBox.outputs.length; j++) {
                        var obj = {};
                        obj.boxUUID = selectedBox.outputs[j].boxUUID;
                        obj.name = selectedBox.outputs[j].name;
                        obj.selected = selectedBox.outputs[j].selected;
                        obj.type = selectedBox.outputs[j].type;
                        obj.uuid = selectedBox.outputs[j].uuid;
                        obj.variableType = selectedBox.outputs[j].variableType;
                        obj.variableUUID = selectedBox.outputs[j].variableUUID;
                        boxOutputArray.push(obj);
                    }
                }
            }
        }

    }

    $(selectorComp).atwho({
        at: "@",
        data: autoComplateData,
        startWithSpace: false,
        suffix: "",
        limit: 20,
        callbacks: {
            sorter: function (query, items, searchKey) {
                var sortedItems = items.sort(predicateBy("name"));
                return sortedItems.slice(0);
            }
        }
    }).atwho({
        at: ".",
        data: boxOutputArray,
        startWithSpace: false,
        limit: 20,
        callbacks: {
            filter: function (query, data, searchKey) {

                var str = $(selectorComp).val();
                var id = "";
                if (selectorComp.charAt(0) === '#')
                    id = selectorComp.slice(1);
                var text = document.getElementById(id);
                var caretPos = getCaretPosition(text);
                var word = returnWord(str, caretPos);
                var beforeDotString = "";

                if (word != null) {
                    beforeDotString = word.substring(word.lastIndexOf("@") + 1, word.lastIndexOf("."));
                } else {
                    beforeDotString = str.substring(str.lastIndexOf("@") + 1, str.lastIndexOf("."));
                }
                var found = false;
                var foundHolderId = -1;

                for (var i = box.outputs.length - 1; i >= 0; i--) {
                    var boxResultName = box.outputs[i].name + "_Result";
                    if (boxResultName === beforeDotString) {
                        found = true;
                        foundHolderId = box.outputs[i].variableUUID;
                        ///foundHolderId = box.outputs[i].boxUUID;
                        break;

                    }
                }

                if (found) {
                    for (i = boxOutputArray.length - 1; i >= 0; i--) {
                        if (boxOutputArray[i].boxUUID === foundHolderId) {
                            for (var j = data.length - 1; j >= 0; j--) {
                                if (data[j].variableType === 'LogicalDecisionTable' ||
                                    data[j].variableType === 'SQLBlock') {
                                    data.splice(j, 1);
                                } else {
                                    if (data[j].boxUUID && data[j].boxUUID !== foundHolderId) {
                                        data.splice(j, 1);
                                    }
                                }
                            }
                            return data;
                        }

                    }
                }
            },
            sorter: function (query, items, searchKey) {
                var sortedItems = items.sort(predicateBy("name"));
                return sortedItems.slice(0);
            }
        }
    });


}


function rightPartContextPropertiesReset() {
    $("#context_variable_properties").append($(".VariableContextProperties")); //VariableContextReset
    $("#context_box_properties").append($(".BoxContextProperties")); //BoxContextReset
    $("#context_formula_properties").append($(".FormulaContextProperties")); //FormulaContextReset
}

function checkPermissionControl(actionName) {
    var hasPermission = false;

    if (permissions && permissions.data && permissions.data.length > 0) {
        for (var i = 0; i < permissions.data.length; i++) {
            var permissionItem = permissions.data[i];
            if (permissionItem === actionName) {
                hasPermission = true;
                break;
            }
        }
    }

    return hasPermission;
}

function permissionCall() {
    var url = GLOBALS.PROTOCOL + GLOBALS.HOST + GLOBALS.PERMISSION_URL + dutyId + '","hierarchical":false,"checkLocation":false,"parentPermission":"root.rule_engine"}';
    $.ajax({
        type: "GET",
        url: url
    }).done(function (response) {
        if (response.error && response.error === 1) {
            permissions = {};
        } else {
            permissions = JSON.parse(response);
            //console.log("Permss " + permissions.data[0].key);
        }
    }).fail(function (xhr, exception) {
        gotException(xhr, exception);
    });
}

function saveDbCollection(url, data, successMsg, logData) {
    var ajaxSaveModel = $.ajax({
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', token);
        },
        type: "POST",
        url: url,
        data: data,
        dataType: "json",
        contentType: "application/json",
        timeout: 5000

    }).done(function (data) {
        if (data.result) {
            if (successMsg) {
                displayWarningMsg(successMsg);
                if (logData) {
                    logData.detail = {};
                    logData.detail = successMsg;
                    postModelLog(editorURL + dbURL + "log/model_log", logData, token);
                }
            }
        } else {
            displayWarningMsg(data.msg);
        }
    }).fail(function (xhr, exception) {
        // If fail
        gotException(xhr, exception);
    });

    return ajaxSaveModel;
}

function getEmail() {
    var email = localStorage.getItem("profile_email");
    if (!email) {
        email = "guest";
    }

    return email;
}

function saveModel(successMsg, logData) {
    var email = getEmail();
    //"/api/v1/pmodel/"
    if (categoryId && categoryId !== "") {
        var category = pModel.getCategory(categoryId);
        if (category) {
            category.folders = pModel.folders && pModel.folders.length > 0 ? pModel.folders : [];
            category.versions = pModel.versions && pModel.versions.length > 0 ? pModel.versions : [];
        }
    }
    var url = editorURL + dbURL + "struct/" + email + "/model";
    pModel.lastMessage = successMsg;
    return saveDbCollection(url, pModel.toJSON(email), successMsg, logData);
}

function saveValue(successMsg, logData) {
    var email = getEmail();
    //"/api/v1/pmodel/"
    if (userValues) {
        var url = editorURL + dbURL + "struct/" + email + "/value";
        pHolder.lastMessage = successMsg;
        saveDbCollection(url, pHolder.toJSON(email), successMsg, logData);
    }
}

function saveTest(successMsg) {
    var email = getEmail();
    //"/api/v1/test/"
    var url = editorURL + dbURL + "struct/" + email + "/test";
    tHolder.lastMessage = successMsg;
    return saveDbCollection(url, tHolder.toJSON(email), successMsg);
}

function saveCatalog(successMsg) {
    var email = getEmail();
    //"/api/v1/test/"
    var url = editorURL + dbURL + "struct/" + email + "/catalog";
    pDbCatalog.lastMessage = successMsg;
    return saveDbCollection(url, pDbCatalog.toJSON(email), successMsg);
}

function saveVariable(successMsg, logData) {
    var email = getEmail();
    //"/api/v1/test/"
    var url = editorURL + dbURL + "struct/" + email + "/variable";
    return saveDbCollection(url, pVariable.toJSON(email), successMsg, logData);
}

function runTest() {

    var formulaUUID = $("#variable_list").attr("data-uuid");
    var formula = pModel.getFormula(formulaUUID);
    var testURL = testEngineURL + "/api/v1/price/" + formulaUUID;
    $("#test_result").text('');
    $("#test_error").text('');
    var testState = {};
    var uuidValMap = {};
    testState.userName = {};
    testState.formulaName = {};
    testState.userName = appUserName.toLowerCase();
    testState.formulaName = formula.name;
    $("#testvariables_list > .testvariable").each(function () {
        var variableUUID = $(this).attr("data-uuid");
        var variable = pModel.getVariable(variableUUID);
        var val = "";
        if (variable.type == "Select") {
            val = $(this).find(".testVariableSelect option:selected").text();
        } else if (variable.type == "Integer") {
            var sval = $(this).find(".testVariableInput").val();
            val = parseFloat(sval);
        } else if (variable.type == "Url") {
            var urlVal = $(this).find(".testVariableInput").val();
            val = getDataFromUrl(urlVal);
        } else {
            val = $(this).find(".testVariableInput").val();
        }
        testState[variable.name] = val;
        uuidValMap[variable.uuid] = val;
    });

    var testStateJSON = JSON.stringify(testState);

    $.ajax({
        type: "POST",
        url: testURL,
        data: testStateJSON,
        dataType: "json",
        contentType: "application/json",
        timeout: 5000,
        success: function (response) {
            //console.log(data)
            var ruleResultVisible = true;
            //var hasError = false;
            if (response.messages && response.messages.length > 0) {
                $("#test_error").css('color', 'red');
                //hasError = true;
                for (var i = 0; i < response.messages.length; i++) {
                    var message = response.messages[i];
                    $("#test_error").text(message.text + "\n");
                }
                if (response.data.rulesResult && (response.data.rulesResult.rulesResult === 0 || response.data.rulesResult === 0))
                    ruleResultVisible = false;

                //ruleResultVisible = !hasError;
            }
            if (ruleResultVisible) {
                var checkTypeResult = checkType(response.data.rulesResult);
                if (checkTypeResult === 0) {
                    $("#test_result").text(response.data.rulesResult);
                } else if (checkTypeResult === "Object" || checkTypeResult === "Array") {
                    $("#test_result").text(JSON.stringify(response.data.rulesResult));
                }
            }


            $("#visualizeResult").show();
            //var formula = pModel.getFormula(formulaUUID);
            localStorage.setItem('visualize_formula_json', JSON.stringify(formula));


            uuidValMap["ResultBox"] = response.data.rulesResult;
            if (response.debug) {
                for (var i = 0; i < response.debug.length; i++) {
                    var debug = response.debug[i];
                    uuidValMap[debug.uuid] = debug.val;
                }

                localStorage.setItem('visualize_uuidval_json', JSON.stringify(uuidValMap));
            }
        },
        error: function (xhr, exception) {
            gotException(xhr, exception);
        }
    });
}

function getDataFromUrl(url) {
    var score = 0;
    $.ajax({
        async: false,
        type: 'GET',
        url: url,
        timeout: 5000,
        success: function (data) {
            score = data.rates.TRY;
        },
        error: function (xhr, exception) {
            gotException(xhr, exception);
        }
    });

    return score;

}

function resetRender(clearAll) {


    $("#folders").html('');
    pModel.folders = {};
    pModel.versions = {};
    $("#variable_list").html("");
    $("#layers").html("");

    //Right Properties and Versions Load
    rightPartContextPropertiesReset();
    if (clearAll !== false) {
        $(".menu2").append($(".FormulaContextProperties"));
        $("#FormulaVersionList").html("");
    }

    initHtml();
}

function initHtml() {
    $('#txtSearchCategory').val('');
    $('#txtSearchFolder').val('');
    $('#txtSearchCategory').keyup();
    $('#txtSearchFolder').keyup();
    //$(".menu2").html('');
    $('.menu2').hide();
    $(".main3").hide();
    //$(".wm_open_btn").trigger("click");
    if ($(".wm").hasClass("wm_open"))
        $(".wm").toggleClass("wm_open");
    var menuTitle = '<div class="menu_title"></div> <span class="m_c_btn m_c_btn_close "></span><span>FORMUL ÖZELLIKLERI</span>';
    $("#middleFrameLabel").html(menuTitle);
    $('.tag_category_name').text('');
    $('.tag_category_name').hide();
}

function renderFormula(formulaUUID) {
    //console.log("formula uuid " + formulaUUID);
    var formula = pModel.getFormula(formulaUUID);
    var folder = pModel.getFolder(formula.folderUUID);

    if (folder && formula && (folder.active === false || formula.active === false)) {
        $('.content_menu').addClass('disabledAll');
        $('.main_content').addClass('disabledAll');
    } else {
        $('.content_menu').removeClass('disabledAll');
        $('.main_content').removeClass('disabledAll');
    }

    var dom_html = '<div class="menu_title"></div><span class="m_c_btn m_c_btn_close "></span><span>$folder_name</span>$formula_name'
    dom_html = dom_html.replace("$folder_name", folder.name).replace("$formula_name", formula.name);
    $("#middleFrameLabel").html(dom_html);
    $("#txtSelectedFormula").val(formula.name);
    $(".main3").show();
    $(".selectReturnType").val(formula.returnType ? formula.returnType : "Object");
    $("#variable_list").html("");
    $("#layers").html("");

    //Right Properties and Versions Load
    rightPartContextPropertiesReset();

    $(".menu2").append($(".FormulaContextProperties"));
    $("#FormulaVersionList").html("");


    //Render Versions..
    var version = pModel.getVersionWithFormulaUUID(formulaUUID);
    var fHead = pModel.getFormulaHeadWithFormulaUUID(formulaUUID); //Only Visible For Real Formula
    if (fHead != null) {
        version = pModel.getVersionWithFormulaUUID(fHead.baseFormulaUUID);
    }


    //Render BaseVersion
    var baseFHead = {};
    if (version != null) {
        baseFHead.uuid = version.formulaUUID;
        baseFHead.baseFormulaUUID = version.formulaUUID;
        baseFHead.formulaUUID = version.formulaUUID;
    } else {
        baseFHead.uuid = formulaUUID;
        baseFHead.baseFormulaUUID = formulaUUID;
        baseFHead.formulaUUID = formulaUUID;
    }
    //baseFHead.createdDate = "Ana Versiyon";
    renderFormulaHead(baseFHead, formulaUUID, true);


    //Display FormulaHead
    if (version != null) {
        for (var i = 0; i < version.formulaHeads.length; i++) {
            var formulaHead = version.formulaHeads[i];
            renderFormulaHead(formulaHead, formulaUUID, false);
        }
    }


    $("#variable_list").attr("data-uuid", formulaUUID);
    var variables = formula.variables;
    for (var i = 0; i < variables.length; i++) {
        variable = variables[i];
        var dom_html = $("#variable_template").html();
        dom_html = dom_html.replace("$variable_name", variable.name);
        $("#variable_list").prepend(dom_html);
        var variableObj = $("#variable_list").children().first();
        variableObj.attr('data-uuid', variable.uuid);

    }

    variableSort();

    $(".KT_box_result > .input_output").remove();

    var layers = formula.layers;
    for (var i = 0; i < layers.length; i++) {

        var layer = layers[i];
        if (layer.name == "ResultLayer") { //KT_Box_Result
            $(".layer_result").attr("data-uuid", layer.uuid);
            var box = layer.boxes[0];
            var boxObj = $(".KT_box_result");

            fillAutoCompleteDataToTextArea("#txtResultCodeBlocks", box, true);
            renderBox(boxObj, box);
            continue;
        }

        var dom_html = $("#layer_template").html();
        dom_html = dom_html.replace("$layer_name", layer.name);
        $("#layers").append(dom_html);
        var layerObj = $("#layers").children().last();
        layerObj.attr('data-uuid', layer.uuid);

        var boxes = layer.boxes; //Normal Boxes
        for (j = 0; j < boxes.length; j++) {
            var box = boxes[j];
            var dom_html = $("#box_template").html();
            dom_html = dom_html.replace("$box_name", box.name);
            layerObj.append(dom_html);
            var boxObj = layerObj.children().last();
            renderBox(boxObj, box);
        }

    }
}

function sortBoxVariable() {
    var elem = $('.boxVariables');
    for (var i = 0; i < elem.length; i++) {
        var el = elem[i];
        Sortable.create(el, {
            onEnd: function (evt) {
                var elem = evt.item;
                var data_box_uuid = $(elem).attr("data-box-uuid");
                //console.log("Box uuid : " + data_box_uuid);

                var box = pModel.getBox(data_box_uuid);
                if (box) {
                    var inputs = box.inputs;
                    if (inputs && inputs.length > 0) {
                        var newArr = Object.assign([], inputs);
                        var reversed = newArr.reverse();
                        array_move(reversed, evt.oldIndex, evt.newIndex);
                        box.inputs = reversed.reverse();
                        saveModel("", {item: box.name, itemUUID: box.uuid, itemType: "variable", action: "sort"});
                    }
                }

            }
        });
    }
}

function renderFormulaHead(formulaHead, formulaUUID, baseFlag) {
    var dom_html = $("#formulahead_template").html();
    var formula = undefined;
    var selectedVersion = false;

    if (formulaHead && formulaHead.formulaUUID) {

        formula = pModel.getFormula(formulaHead.formulaUUID);

    } else {
        formula = pModel.getFormula(formulaUUID);
    }
    dom_html = dom_html.replace("$formula_name", formula.name);

    $("#FormulaVersionList").append(dom_html);
    var formulaHeadObj = $("#FormulaVersionList").children().last();
    formulaHeadObj.attr('data-uuid', formulaHead.uuid);
    var isActive = formulaHead.active ? true : false;

    if (isActive) {
        $('#chkActive').show();
        $('#lblChkActive').show();
        $('#chkActive').prop('checked', isActive);
    }

    if (formulaHead.formulaUUID === formulaUUID) {
        if (formulaHead.formulaUUID === formulaHead.baseFormulaUUID) {
            $('#chkActive').hide();
            $('#lblChkActive').hide();
        } else {
            formulaHeadObj.find(".btnLabelFormulaHead").addClass("selectedVersion");
            selectedVersion = true;
        }
    } else {
        if (isActive) {
            formulaHeadObj.find(".btnLabelFormulaHead").addClass("selected");
            selectedVersion = false;
        }
    }

    if (baseFlag) {

        if (!selectedVersion) {
            formulaHeadObj.find(".btnLabelFormulaHead").addClass("selectedVersion");
        }
        formulaHeadObj.find(".formulahead_settings_btn").hide();
    } else {
        if (selectedVersion) {
            var formulaBaseHeadObj = undefined;
            var baseFormula = pModel.getFormula(formulaHead.baseFormulaUUID);
            if (baseFormula) {
                $("#FormulaVersionList").children().each(function () {
                    if ($(this).attr("data-uuid") === baseFormula.uuid) {
                        formulaBaseHeadObj = $(this);
                        return false;
                    }
                });
                if (formulaBaseHeadObj) {
                    formulaBaseHeadObj.find(".btnLabelFormulaHead").removeClass("selectedVersion");
                }
            }
        }

    }
}


function renderBox(boxObj, box) {


    boxObj.attr("data-uuid", box.uuid);

    var triangleClassName = box.type === "DecisionTable" ? "triangle_decision_table" :
        box.type === "LogicalDecisionTable" ? "triangle_logical_decision_table" :
            box.type === "CodeBlock" ? "triangle_code_block" :
                box.type === "SQLBlock" ? "triangle_sql_block" : "triangle";
    boxObj.find('.triangle').removeClass("triangle").addClass(triangleClassName);
    var inputs = box.inputs;
    for (var k = 0; k < inputs.length; k++) {
        var input = inputs[k];
        var dom_html = $("#io_template").html();
        var variable = pModel.getVariable(input.variableUUID);
        if (variable != null) {
            dom_html = dom_html.replace("$io_name", variable.name);
            //akif
            var inputObj;
            if ($(boxObj).find(".boxVariables").length > 0) {
                $(boxObj).find(".boxVariables").prepend(dom_html);
                inputObj = $(boxObj).find(".boxVariables").children().first();
            } else {
                boxObj.prepend(dom_html);
                inputObj = boxObj.children().first();
            }
            inputObj.attr('data-box-type', box.type);
            inputObj.attr('data-box-uuid', box.uuid);
            inputObj.attr('data-uuid', input.uuid);
            inputObj.attr("data-variable-uuid", input.variableUUID);
        } else {
            //console.log("variable bulunamadı:" + input.variableUUID);
        }
    }
    boxObj.find(".KT_box_header").text(box.boxHeader ? box.boxHeader : 'Başlık');

    var outputs = box.outputs;
    for (var k = 0; k < outputs.length; k++) {
        var output = outputs[k];
        var dom_html = $("#io_template").html();
        var box = pModel.getBox(output.variableUUID); //this is boxUUID
        if (box != null) {
            dom_html = dom_html.replace("$io_name", box.name);
            //akif
            var outputObj;
            if ($(boxObj).find(".boxVariables").length > 0) {
                $(boxObj).find(".boxVariables").prepend(dom_html);
                outputObj = $(boxObj).find(".boxVariables").children().first();
            } else {
                boxObj.prepend(dom_html);
                outputObj = boxObj.children().first();
            }

            //boxObj.prepend(dom_html);
            //var outputObj = boxObj.children().first();

            outputObj.attr('data-uuid', output.uuid);
            outputObj.attr("data-box-uuid", output.variableUUID);
            outputObj.attr("data-box-type", output.type);
            appendOutputVariablesToBox(output);

        }

    }

}


function getBoxVariableDiv(boxObj) {
    var objHtml = $(boxObj)[0].outerHTML;
    var newObjHtml = '<div id="boxVariables">' + objHtml;
    newObjHtml += '</div>';
    //console.log(newObjHtml);
    $(boxObj).replaceWith(newObjHtml);
}

function validateDecisionTable() {
    //console.log("Validate decision table");
    var boxUUID = $(".menu2").attr('data-uuid');
    var box = pModel.getBox(boxUUID);
    var holderArray = [];
    for (var i = 0; i < box.inputs.length; i++) {
        var input = box.inputs[i];
        var variable = pModel.getVariable(input.variableUUID);
        var holder = pHolder.getHolder(variable.holderUUID);
        holderArray.push(holder);
    }

    if (holderArray.length > 0) {
        var dt = {name: box.uuid, holders: holderArray};
        var dtJSON = JSON.stringify(dt);
        $.ajax({
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', token);
            },
            type: "POST",
            url: editorURL + "/api/v1/decisiontable/validate",
            data: dtJSON,
            dataType: "json",
            contentType: "application/json",
            timeout: 5000,
            success: function (data) {
                var msg = "";
                for (var i = 0; i < data.length; i++) {
                    msg += data[i] + "</br>"
                }

                if (msg == "Karar Tablosu düzgün oluşturulmuş.</br>") { //TODO Fix..
                    box.decisiontable_uploaded_valid = true;
                } else {
                    box.decisiontable_uploaded_valid = true;
                }
                saveModel(msg);
            },
            error: function (textStatus, errorThrown) {
                // alert(textStatus);
            }
        });
    }
}

function validateLogicalDecisionTable() {

    var boxUUID = $(".menu2").attr('data-uuid');
    var box = pModel.getBox(boxUUID);
    var msg = "";
    var inputVariableArray = getInputVariables(box);
    var outputVariableArray = getOutputVariables(box);
    if (inputVariableArray.length > 0 && box.outputs.length > 0) {
        var dt = {name: box.uuid, inputVariables: inputVariableArray, outputVariables: outputVariableArray};
        var dtJSON = JSON.stringify(dt);
        $.ajax({
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', token);
            },
            type: "POST",
            url: editorURL + "/api/v1/logicaldecisiontable/validate",
            data: dtJSON,
            dataType: "json",
            contentType: "application/json",
            timeout: 5000,
            success: function (data) {
                var msg = "";
                for (var i = 0; i < data.length; i++) {
                    msg += data[i] + "</br>"
                }

                if (msg == "Mantıksal Karar Tablosu düzgün oluşturulmuş.</br>") { //TODO Fix..
                    box.decisiontable_uploaded_valid = true;
                } else {
                    box.decisiontable_uploaded_valid = true;
                }
                saveModel(msg);
            },
            error: function (xhr, exception) {
                gotException(xhr, exception)
            }
        });
    }
}


function cloneDecisionTableAndSaveAll(formula, cloneFormula, formulaObj) {

    //Cloning Decision Table 
    var diffArray = new Array();
    var layers = formula.layers
    var clone_layers = cloneFormula.layers;
    for (var i = 0; i < layers.length; i++) {
        var boxes = layers[i].boxes;
        var clone_boxes = clone_layers[i].boxes;
        for (var j = 0; j < boxes.length; j++) {
            var box = boxes[j];
            var cBox = clone_boxes[j];
            if (box.type == "DecisionTable") {
                //console.log("uuid:" + box.uuid + " clone uuid:" + cBox.uuid);
                diffArray.push({boxUUID: box.uuid, cBoxUUID: cBox.uuid});
            }
        }
    }


    if (diffArray.length > 0) {
        var dt = {diff: diffArray};
        var dtJSON = JSON.stringify(dt);
        $.ajax({
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', token);
            },
            type: "POST",
            url: editorURL + "/api/v1/decisiontable/clone",
            data: dtJSON,
            dataType: "json",
            contentType: "application/json",
            timeout: 5000,
            success: function (data) {
                cloningSucceeded(formula, cloneFormula, formulaObj);
            },
            error: function (textStatus, errorThrown) {
                displayWarningMsg(textStatus);
            }
        });
    } else {
        cloningSucceeded(formula, cloneFormula, formulaObj);
    }
}


function cloningSucceeded(formula, cloneFormula, formulaObj) {
    if (!checkPermissionControl(ACTION_NAMES.FORMULA.COPY)) {
        displayWarningMsg(MSG_HAS_NO_PERMISSION);
        return false;
    }

    var index = pModel.getFormulaIndex(formula.folderUUID, formula.uuid);
    pModel.insertFormula(cloneFormula, index);
    saveModel(formula.name + " isimli formul kopyalandı", {
        item: formula.name,
        itemUUID: formula.uuid,
        itemType: "formula",
        action: "clone"
    });

    $("#context_folder_menu_template").append($(".FormulaContextMenuContainer"));

    var dom_html = $("#formula_template").html();
    formulaObj.after(dom_html);
    var formulaCloneObj = formulaObj.next();
    formulaCloneObj.find(".btnLabelFormula").text(cloneFormula.name);
    formulaCloneObj.attr("data-uuid", cloneFormula.uuid);
    formulaCloneObj.children().show();

}


function clearPricingEngineCache() {
    var ajaxClearPricingEngineCache = $.ajax({
        type: "POST",
        url: testEngineURL + "/api/v1/clearcache",
        dataType: "json",
        timeout: 5000,
        success: function (data) {
            //displayWarningMsg(data.msg);
        },
        error: function (xhr, exception) {
            gotException(xhr, exception);
        }
    });

    return ajaxClearPricingEngineCache;
}

function generateFormula(uuid) {
    var formulaUUID = uuid ? uuid : $("#variable_list").attr("data-uuid");
    //console.log(formulaUUID);
    var versionIsActive = false;
    var versionFormula = pModel.getVersionWithFormulaUUID(formulaUUID);
    if (versionFormula && versionFormula.formulaHeads && versionFormula.formulaHeads.length > 0) {
        for (var i = 0; i < versionFormula.formulaHeads.length; i++) {
            var item = versionFormula.formulaHeads[i];
            if (item.active === true) {
                versionIsActive = true;
                break;
            }
        }
    }
    var formula = pModel.getFormula(formulaUUID);
    var folder = pModel.getFolder(formula.folderUUID);
    var formulaHead = pModel.getFormulaHeadWithFormulaUUID(formulaUUID);
    var formulaJSON = JSON.stringify(formula);
    var jsonParseObj = JSON.parse(formulaJSON);
    var category = pModel.getCategory(folder.categoryUUID);

    jsonParseObj.folderName = folder.name;
    jsonParseObj.categoryName = category.name;
    jsonParseObj.active = formulaHead ? formulaHead.active : !versionIsActive;

    jsonParseObj.version = version;
    jsonParseObj.baseFormulaUUID = formulaHead ? formulaHead.baseFormulaUUID : formulaUUID;
    jsonParseObj.linkedFormulaUUID = formulaHead ? formulaHead.linkedFormulaUUID : formulaUUID;
    //console.log(formulaHead);
    if (formulaHead) {
        jsonParseObj.startDate = formulaHead.startDate;
    }
    formulaJSON = JSON.stringify(jsonParseObj);
    //eski url editorURL + "/api/v1/pricingformula/generate"
    $.ajax({
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', token);
        },
        type: "POST",
        url: "http://" + environment + ":8083/api/v1/db/pricingformula/generate/guest",
        data: formulaJSON,
        dataType: "json",
        contentType: "application/json",
        timeout: 5000
    }).then(function (data) {
        if (!uuid) {
            var str = JSON.stringify(data.formula.rows, undefined, "\t");
            displayWarningMsg(syntaxHighlight(str));
        }
    });
}

function syntaxHighlight(json) {
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}


function displayWarningMsg(msg) {
    $(".wm_main").html(msg);

    if ($(".wm").hasClass("wm_open") == false) {
        $(".wm").toggleClass("wm_open");
        $(".wm_open_btn").toggleClass("wm_close_btn");
        $(".main2").toggleClass("main2_close");
    }
}


function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}


String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};


//==============================================================================================
//  NORMAL DRAG & DROP
//==============================================================================================
var draggingUUID = "";
var draggingType = ""

function allowDrop(ev) {
    /* The default handling is to not allow dropping elements. */
    /* Here we allow it by preventing the default behaviour. */
    ev.preventDefault();

}

function drag(ev) {
    /* Here is specified what should be dragged. */
    /* This data will be dropped at the place where the mouse button is released */
    /* Here, we want to drag the element itself, so we set it's ID. */
    ev.dataTransfer.setData("text/html", ev.target.getAttribute("data-uuid"));
    draggingUUID = ev.target.getAttribute("data-uuid");
    draggingType = ev.target.getAttribute("class");
}

function drop(ev) {
    /* The default handling is not to process a drop action and hand it to the next 
       higher html element in your DOM. */
    /* Here, we prevent the default behaviour in order to process the event within 
       this handler and to stop further propagation of the event. */
    ev.preventDefault();
    /* In the drag event, we set the *variable* (it is not a variable name but a 
       format, please check the reference!) "text/html", now we read it out */
    var data = ev.dataTransfer.getData("text/html").split(">")[1];
    /* As we put the ID of the source element into this variable, we can now use 
       this ID to manipulate the dragged element as we wish. */
    /* Let's just move it through the DOM and append it here */
    //ev.target.appendChild(document.getElementById(data));


    if (draggingType == "variable") {
        var boxObj = $(ev.target).parent();

        var variable = pModel.getVariable(draggingUUID);
        var flagExist = false;

        if ($(boxObj).find(".boxVariables").length > 0) {
            $(boxObj).find(".boxVariables").children().each(function () {
                if ($(this).attr("data-variable-uuid") == draggingUUID) {
                    flagExist = true;
                }
            });
        } else {
            boxObj.children().each(function () {
                if ($(this).attr("data-variable-uuid") == draggingUUID) {
                    flagExist = true;
                }
            });
        }


        if (!flagExist) {
            if (!checkPermissionControl(ACTION_NAMES.VARIABLE.ADD_TO_BOX)) {
                displayWarningMsg(MSG_HAS_NO_PERMISSION);
                return false;
            }
            var dom_html = $("#io_template").html();
            dom_html = dom_html.replace("$io_name", variable.name);
            var boxUUID = boxObj.attr("data-uuid");
            var box = pModel.getBox(boxUUID);
            var io = pModel.addBoxIO(variable.name, boxUUID, "input", draggingUUID, variable.type);
            if (io) {
                saveModel(MSG_SUCCESS_BOX_VARIABLE_CONNECT, {
                    item: variable.name,
                    itemUUID: variable.uuid,
                    itemType: "variable",
                    action: "create"
                });
                // akif
                var ioObj;
                //boxObj.prepend(dom_html);
                //var ioObj = boxObj.children().first();
                if ($(boxObj).find(".boxVariables").length > 0) {
                    $(boxObj).find(".boxVariables").prepend(dom_html);
                    ioObj = $(boxObj).find(".boxVariables").children().first();
                } else {
                    boxObj.prepend(dom_html);
                    ioObj = boxObj.children().first();
                }

                ioObj.attr("data-uuid", io.uuid);
                ioObj.attr("data-variable-uuid", draggingUUID);
                fillAutoCompleteDataToTextArea("#txtCodeBlocks", box, true);
            }
        } else {
            displayWarningMsg("Aynı Değişkeni Kutunun İçerisine Atamazsınız.");
        }


    } else if (draggingType == "KT_box") {
        var boxObj = $(ev.target).parent();
        var box = pModel.getBox(draggingUUID);

        var flagExist = false;

        if ($(boxObj).find(".boxVariables").length > 0) {
            $(boxObj).find(".boxVariables").children().each(function () {
                if ($(this).attr("data-box-uuid") == draggingUUID) {
                    flagExist = true;
                }
            });
        } else {
            boxObj.children().each(function () {
                if ($(this).attr("data-box-uuid") == draggingUUID) {
                    flagExist = true;
                }
            });
        }


        var targetBoxUUID = boxObj.attr("data-uuid");
        var flagSame = targetBoxUUID == draggingUUID;


        //Layer Validation
        var draggingBox = pModel.getBox(draggingUUID);
        var targetBox = pModel.getBox(targetBoxUUID);
        if (targetBox.type !== 'LogicalDecisionTable' && targetBox.type !== 'SQLBlock' && targetBox.name !== 'ResultBox') {
            displayWarningMsg("Sadece Mantıksal Karar Tablosu Kutusu ve SQL Kutusu Hedef Kutu Olabilir.");
            return false;
        }

        if (targetBox.type === 'SQLBlock' && draggingBox.type !== 'CodeBlock') {
            displayWarningMsg("Sadece SQL Kutusuna, Kod Bloğu Kutusu Taşınabilir.");
            return false;
        }

        var draggingLayerIndex = pModel.getLayer(draggingBox.layerUUID).layerIndex;
        var targetLayerIndex = pModel.getLayer(targetBox.layerUUID).layerIndex;
        var flagLayer = targetLayerIndex > draggingLayerIndex;

        if (!flagExist && !flagSame && flagLayer) {
            if (!checkPermissionControl(ACTION_NAMES.BOX.ADD_TO_RESULT)) {
                displayWarningMsg(MSG_HAS_NO_PERMISSION);
                return false;
            }
            var dom_html = $("#io_template").html();
            dom_html = dom_html.replace("$io_name", box.name);
            var boxUUID = boxObj.attr("data-uuid");
            var io = pModel.addBoxIO(box.name, boxUUID, "output", draggingUUID, box.type);
            if (io)
                saveModel(MSG_SUCCESS_BOX_BOX_CONNECT, {
                    item: box.name,
                    itemUUID: box.uuid,
                    itemType: "box",
                    action: "create"
                });
            // akif
            //boxObj.prepend(dom_html);
            //var ioObj = boxObj.children().first();
            if ($(boxObj).find(".boxVariables").length > 0) {
                $(boxObj).find(".boxVariables").prepend(dom_html);
                var ioObj = $(boxObj).find(".boxVariables").children().first();
            } else {
                boxObj.prepend(dom_html);
                var ioObj = boxObj.children().first();
            }

            ioObj.attr("data-uuid", io.uuid);
            ioObj.attr("data-box-uuid", draggingUUID);
            ioObj.attr("data-box-type", io.type);
            appendOutputVariablesToBox(io);
        } else {
            if (flagExist) {
                displayWarningMsg("Aynı Çıktıyı Bir Kutunun İçerisine Atamazsınız.");
            } else if (flagSame) {
                displayWarningMsg("Aynı Kutuyu Aynı Kutuya Atamazsınız.");
            } else if (!flagLayer) {
                displayWarningMsg("Kutuyu Sadece Kendisinden Daha Altta Yer Alan Katmanlara Atabilirsiniz");
            }
        }


    }

    draggingUUID = "";
    draggingType = "";
}

function appendOutputVariablesToBox(io) {
    $('.multiSelectOutput').html('');
    if (io.type === 'output') {
        var box = pModel.getBox(io.variableUUID);
        if (box) {
            var data_uuid = io.uuid;
            if (!$(".input_output[data-uuid=" + data_uuid + "]").parents().hasClass('KT_box_result')) {

                if (box.type === 'LogicalDecisionTable') {
                    var data_box_uuid = $(".input_output[data-uuid=" + data_uuid + "]").attr("data-box-uuid");
                    var boxOutputs = pModel.listBoxIO(data_box_uuid, 'output');
                    if (boxOutputs && boxOutputs.length > 0) {
                        $('#upDownArrow').show();
                        var dom_html = "<ul>";
                        for (var i = 0; i < boxOutputs.length; i++) {
                            var checked = false;
                            if (boxOutputs[i].selected) {
                                checked = true;
                            }
                            var checkboxId = guid();
                            if (checked) {
                                dom_html += "<li style='width:50px;'><input type='checkbox' id=" + checkboxId + " value=" + boxOutputs[i].uuid +
                                    " data-uuid=" + data_uuid + " onchange='toggleCheckbox(this);' checked/>" +
                                    "<label>" + boxOutputs[i].name + "</label></li>";
                            } else {
                                dom_html += "<li style='width:50px;'><input type='checkbox' id=" + checkboxId + " value=" + boxOutputs[i].uuid +
                                    " data-uuid=" + data_uuid + " onchange='toggleCheckbox(this);'/>" +
                                    "<label>" + boxOutputs[i].name + "</label></li>";
                            }


                        }
                        dom_html += "</ul>";
                        $('.multiSelectOutput').append(dom_html);
                        var upDownArrow = "<i class='fas fa-arrow-circle-down' id='upDownArrow' " +
                            "data-uuid=" + data_uuid + " aria-hidden='true'></i>";
                        var outputDiv = $(".input_output[data-uuid=" + data_uuid + "]");
                        outputDiv.prepend(upDownArrow);
                        outputDiv.find('.slide_output').attr("data-uuid", data_uuid);
                        outputDiv.find('.multiSelectText').attr("data-uuid", data_uuid);
                        outputDiv.find('.multiSelectOutput').attr("data-uuid", data_uuid);


                    }
                }
            }
        }
    }
}

$(document).on('click', '.KT_box .input_output i', function (e) {
    var $clicked = $(e.target);
    var data_uuid = $clicked.parent().attr("data-uuid");
    var upDownArrow = $("#upDownArrow[data-uuid=" + data_uuid + "]");
    //$("#slide_output[data-uuid="+data_uuid+"]").slideToggle('fast');
    $(".slide_output[data-uuid='" + data_uuid + "']").slideToggle('fast');
    if (upDownArrow.hasClass("fa fa-arrow-circle-up")) {
        upDownArrow.removeClass().addClass('fa fa-arrow-circle-down');
    } else {
        upDownArrow.removeClass().addClass('fa fa-arrow-circle-up');
    }
});

$(document).on('click', function (e) {

    var $clicked = $(e.target);
    if (!$clicked.parents().hasClass("KT_box")) {
        $('.slide_output').hide();

    }

});

function toggleCheckbox(element) {

    var data_uuid = $(element).attr("data-uuid");

    var title = $(element).next('label').text() + " ";
    var selected = false;
    if ($(element).is(':checked')) {
        var html = '<span title="' + title + '">' + title + '</span>';
        $(".multiSelectText[data-uuid=" + data_uuid + "]").append(html);
        selected = true;
    } else {
        selected = false;
        $('span[title="' + title + '"]').remove();
    }

    var params = {
        selected: selected
    };

    var uuid = $(element).val();
    pModel.updateBoxIO(null, uuid, null, params);
    saveModel(MSG_SUCCESS_VARIABLE_UPDATE);
}

function getInputVariables(box) {

    var inputVariableArray = [];
    var inputs = box.inputs;
    var outputs = box.outputs;
    var i = 0;
    //console.log(outputs);
    if (outputs.length > 0) {
        for (i = 0; i < outputs.length; i++) {
            if (outputs[i].variableType === 'LogicalDecisionTable') {
                var logicalDecisionTableBox = pModel.getBox(outputs[i].variableUUID);
                if (logicalDecisionTableBox) {
                    var logicalDecisionTableOutputs = pModel.listBoxIO(outputs[i].variableUUID, 'output');
                    if (logicalDecisionTableOutputs && logicalDecisionTableOutputs.length > 0) {
                        for (i = 0; i < logicalDecisionTableOutputs.length; i++) {
                            if (logicalDecisionTableOutputs[i].hasOwnProperty("selected")) {
                                if (logicalDecisionTableOutputs[i].selected) {
                                    var obj = Object.assign({}, logicalDecisionTableOutputs[i]);
                                    obj.name = logicalDecisionTableBox.name + "_Result." + obj.name;
                                    //console.log(obj);
                                    inputVariableArray.push(obj);

                                }
                            }
                        }
                    }
                }
            } else if (outputs[i].variableType === 'SQLBlock') {
                var sqlBlockBox = pModel.getBox(outputs[i].variableUUID);
                if (sqlBlockBox) {
                    if (sqlBlockBox.codeblock_text && sqlBlockBox.codeblock_text.length > 0) {
                        var column = sqlBlockBox.sql_condition.column;
                        if (column) {
                            obj = {};
                            obj.name = sqlBlockBox.name + "_Result." + column;
                            inputVariableArray.push(obj);

                        }
                    }
                }
            } else if (outputs[i].variableType === 'CodeBlock') {
                var codeBlockBox = pModel.getBox(outputs[i].variableUUID);
                if (codeBlockBox) {
                    if (codeBlockBox.codeblock_text && codeBlockBox.codeblock_text.length > 0) {
                        obj = {};
                        obj.name = codeBlockBox.name + "_Result";
                        inputVariableArray.push(obj);
                    }
                }
            }
        }
    }

    //console.log("Array input : " + inputVariableArray.length);

    for (i = 0; i < inputs.length; i++) {
        var input = inputs[i];

        var variable = pModel.getVariable(input.variableUUID);
        if (variable)
            inputVariableArray.push(variable);
    }

    return inputVariableArray;
}

function getOutputVariables(box) {

    var outputs = Object.assign([], box.outputs);
    for (var i = 0; i < outputs.length; i++) {
        var output = outputs[i];
        if (output.variableType === 'LogicalDecisionTable' ||
            output.variableType === 'SQLBlock' ||
            output.variableType === 'CodeBlock') {
            outputs.splice(i, 1);
        }
    }

    return outputs;
}


function modelCall() {
    var dataModel = {version: version};
    var dtModelJSON = JSON.stringify(dataModel);

    return $.ajax({
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', token);
        },
        type: "POST",
        url: pListDBURL + "model",
        data: dtModelJSON,
        dataType: "json",
        contentType: "application/json",
        timeout: 5000
    }).done(function (response) {
        //console.log(response.data);
        pModel.fromJSON(response.data);
        var categories = response.data.categories;

        for (var i = 0; i < categories.length; i++) {
            var category = categories[i];
            var dom_html = $("#category_template").html();
            dom_html = dom_html.replace("$category_name", category.name);
            $("#categories").prepend(dom_html);
            var categoryObj = $("#categories").children().first();
            categoryObj.attr('data-uuid', category.uuid);
            categoryObj.attr('title', category.name);
            category.active === false ?
                categoryObj.find(".CategoryNameContainer").addClass("categoryDisabled") :
                categoryObj.find(".CategoryNameContainer").removeClass("categoryDisabled")
        }


        categorySort();

        valueCall();
    }).fail(function (xhr, exception) {
        // If fail
        gotException(xhr, exception);
    });

    //return dfd.promise();
}

function valueCall() {

    var dataValue = {version: version};
    var dtValueJSON = JSON.stringify(dataValue);
    userValues = {};
    return $.ajax({
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', token);
        },
        type: "POST",
        url: pListDBURL + "value",
        data: dtValueJSON,
        dataType: "json",
        contentType: "application/json",
        timeout: 5000

    }).done(function (response) {
        userValues = response.data;
        fillSelectiveValueCombo(userValues);
        fillSelectivePoolValueCombo(userValues);
        testCall();
    }).fail(function (xhr, exception) {
        // If fail
        gotException(xhr, exception);
    });

    //return dfd.promise();
}

function testCall() {
    var dataTest = {version: version};
    var dtTestJSON = JSON.stringify(dataTest);
    return $.ajax({
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', token);
        },
        type: "POST",
        url: pListDBURL + "test",
        data: dtTestJSON,
        dataType: "json",
        contentType: "application/json",
        timeout: 5000

    }).done(function (response) {
        tHolder.fromJSON(response.data);
        variableCall();
    }).fail(function (xhr, exception) {
        // If fail
        gotException(xhr, exception);
    });
    //return dfd.promise();
}

function catalogCall() {
    var dataCatalog = {version: version};
    var dtCatalogJSON = JSON.stringify(dataCatalog);
    var ajaxCatalog = $.ajax({
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', token);
        },
        type: "POST",
        url: pListDBURL + "catalog",
        data: dtCatalogJSON,
        dataType: "json",
        contentType: "application/json",
        timeout: 5000
    }).done(function (response) {
        if (response.data) {
            pDbCatalog.fromJSON(response.data);
            catalogs = response.data.catalogs;
            makeCatalogTable(catalogs, 1);
        }
    }).fail(function (xhr, exception) {
        gotException(xhr, exception);
    });

    return ajaxCatalog;
}

function variableCall() {
    var dataVariable = {version: version};
    var dtVariableJSON = JSON.stringify(dataVariable);
    var ajaxVariable = $.ajax({
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', token);
        },
        type: "POST",
        url: pListDBURL + "variable",
        data: dtVariableJSON,
        dataType: "json",
        contentType: "application/json",
        timeout: 5000
    }).done(function (response) {
        if (response.data) {
            pVariable.fromJSON(response.data);
            makeVariableTable(response.data.variables, 1);

        }

        permissionCall();

    }).fail(function (xhr, exception) {
        gotException(xhr, exception);
    });

    return ajaxVariable;
}

function deferRequests() {
    var dfd = $.Deferred();
    dfd.resolve();
    return dfd.promise();
}

function gotException(xhr, exception) {
    var msg = '';
    if (xhr.status === 0) {
        msg = 'Bağlantı sağlanamadı. Lütfen daha sonra tekrar deneyiniz';
    } else if (xhr.status == 404) {
        msg = 'Requested page not found. [404]';
    } else if (xhr.status == 500) {
        msg = 'Internal Server Error [500].';
    } else if (exception === 'parsererror') {
        msg = 'Requested JSON parse failed.';
    } else if (exception === 'timeout') {
        msg = 'Time out error.';
    } else if (exception === 'abort') {
        msg = 'Ajax request aborted.';
    } else {
        msg = 'Uncaught Error.\n' + xhr.responseText;
    }
    console.log(msg);
}

function loadValueCombo() {
    var currentPage = getCurrentPage('#page-nav');

    var valueDocuments = $('#valueDocuments');
    valueDocuments.empty();
    valueDocuments.attr('data-uuid', userValues._id);
    var htmlCombo = '<select id="selectDbValues" onchange="loadValueTable(this,' + currentPage + ');">' +
        '<option value="-1">---</option>';

    $.each(userValues.data, function (index, data) {
        var context = {
            uuid: data.uuid,
            name: data.name
        };
        htmlCombo += '<option value="' + context.uuid + '">' + context.name + '</option>';
    });
    htmlCombo += '</select>';

    valueDocuments.append(htmlCombo);
    var htmlSaveElement = '<span class="spanIcon" style="display:none;" ' +
        'title="Değeri Güncelle" id="spanSaveValueHolder">' +
        '<i class="fas fa-save fa-2x" aria-hidden="true" ></i></span>';
    var htmlEditElement = '<span class="spanIcon" title="Değeri Güncelle" id="spanEditValueHolder">' +
        '<i class="fas fa-pencil-alt fa-2x" aria-hidden="true" ></i></span>';
    var htmlAddElement = '<span class="spanIcon" title="Yeni Değer Ekle"><i id="btn_add_new_value" ' +
        'class="fa fa-plus-square fa-2x" aria-hidden="true" ></i></span>';
    var htmlDeleteElement = '<span class="spanIcon" title="Seçimli Değer Sil"><i id="btn_delete_selective_value" ' +
        'class="fa fa-minus-circle fa-2x" aria-hidden="true"></i></span>';
    var htmlHolderInputElement = '<span class="spanIcon" style="display:none;" id="spanValueHolder">' +
        '<input type="text" id="txtValueHolder"/></span>';
    valueDocuments.append(htmlSaveElement);
    valueDocuments.append(htmlEditElement);
    valueDocuments.append(htmlAddElement);
    valueDocuments.append(htmlDeleteElement);
    valueDocuments.append(htmlHolderInputElement);

}

function loadValueTable(combo, currentPage) {
    var uuid = $(combo).val();
    $('#newValueItemRow').remove();
    $('#valueTable').remove();
    var htmlTable = '<div id="newValueItemRow">' +
        '<input type="text" placeholder="Yeni Değer" id="newValueItem" ' +
        'style="margin-bottom: 3px; width:149px;"/>' +
        '<input type="button" id="btn_save_value_item" ' +
        'value="Kaydet" style="margin-left:5px; margin-top:3px;">' +
        '<span id="editedValueItem" style="display:none;"></span>' +
        '<span id="editedValueItemName" style="display:none;"></span>' +
        '</div>' +
        '<table class="responsetable" id="valueTable">' +
        '<tr><th>Sıra</th>' +
        '<th>Değer</th>' +
        '<th></th></tr>';
    var contextFieldCount = 0;
    $.each(userValues.data, function (index, data) {
        if (uuid === data.uuid) {
            $.each(data.values, function (valueIndex, dataValue) {
                var context = {
                    rowNum: valueIndex + 1,
                    name: dataValue.name,
                    uuid: dataValue.uuid
                };
                contextFieldCount = Object.keys(context).length;
                htmlTable += '<tbody><tr class="paginate paginateValue"><td>' + context.rowNum + '</td><td>' + context.name + '</td>' +
                    '<td style="text-align: center;">' +
                    '<span id="btn_edit_value" title="Düzenle" style="cursor: hand;" ' +
                    'data-name="' + context.name + '" data-uuid="' + context.uuid + '">' +
                    '<i class="fas fa-pencil-alt fa-1x tableCrudButtons" aria-hidden="true"></i>' +
                    '</span>' +
                    '<span id="btn_delete_value" title="Değer Sil" style="cursor: hand;" data-uuid="' + context.uuid + '">' +
                    '<i class="fas fa-trash-alt fa-1x tableCrudButtons" aria-hidden="true"></i>' +
                    '</span></td></tr></tbody>';
            });

        }
    });

    //htmlTable += '<tfoot><td colspan="3"><span style="padding:1px;"></span></td></tfoot>';
    var footer = '<tfoot><td style="text-align: right;" colspan="4">' +
        '<a id="createValuesExcelFile" title="Excel\'e Aktar" style="cursor:pointer;">' +
        '<i class="far fa-file-excel fa-2x" style="color:#ffffff;" aria-hidden="true"></i>' +
        '</a>' +
        '</td></tfoot>';

    htmlTable += userValues && userValues.data.length > 0 ? footer : '';
    htmlTable += '</table>';
    $('#valueDocuments').append(htmlTable);
    $('#newValueItemRow').hide();
    $('#txtValueHolder').val('');
    $('#spanSaveValueHolder').hide();
    $('#spanSaveValueHolder').hide();
    $('#spanValueHolder').hide();
    $('#spanEditValueHolder').show();

    paginate(".paginateValue", "#page-nav", false, currentPage);

}

function loadVariableTable(currentPage) {
    var variables = pVariable.listPoolVariable();
    if (variables && variables.length > 0) {
        makeVariableTable(variables, currentPage);
    } else {
        variableCall();
    }
}

function loadCatalogTable(currentPage) {
    var catalogs = pDbCatalog.listDbCatalog();
    if (catalogs && catalogs.length > 0) {
        makeCatalogTable(catalogs, currentPage);
    } else {
        catalogCall();
    }
}

function makeCatalogTable(catalogs, currentPage) {
    $('#catalogTable').remove();
    var htmlTable = '<table class="responsetable" id="catalogTable">' +
        '<tr><th>Sıra</th>' +
        '<th>Katalog Adı</th>' +
        '<th>Sunucu</th>' +
        '<th>Veritabanı</th>' +
        '<th></th></tr>';

    var contextFieldCount = 0;

    $.each(catalogs, function (catalogIndex, dataCatalog) {
        var context = {
            rowNum: catalogIndex + 1,
            name: dataCatalog.name,
            server: dataCatalog.server,
            database: dataCatalog.database,
            uuid: dataCatalog.uuid
        };

        contextFieldCount = Object.keys(context).length;

        htmlTable += '<tbody><tr class="paginate paginateCatalog">' +
            '<td>' + context.rowNum + '</td>' +
            '<td>' + context.name + '</td>' +
            '<td>' + context.server + '</td>' +
            '<td>' + context.database + '</td>' +
            '<td style="text-align: center;">' +
            '<span id="btn_edit_catalog" title="Düzenle" style="cursor: hand;" data-uuid="' + context.uuid + '">' +
            '<i class="fas fa-pencil-alt fa-1x tableCrudButtons" aria-hidden="true"></i>' +
            '</span>' +
            '<span id="btn_delete_catalog" title="Sil" style="cursor: hand;" data-uuid="' + context.uuid + '">' +
            '<i class="fas fa-trash-alt fa-1x tableCrudButtons" aria-hidden="true"></i>' +
            '</span></td></tr></tbody>';
    });

    //htmlTable += '<tfoot><td colspan="4"><span style="padding:1px;"></span></td></tfoot>';
    var footer = '<tfoot><td style="text-align: right;" colspan="5">' +
        '<a id="createCatalogExcelFile" title="Excel\'e Aktar" style="cursor:pointer;">' +
        '<i class="far fa-file-excel fa-2x" style="color:#ffffff;" aria-hidden="true"></i>' +
        '</a>' +
        '</td></tfoot>';

    htmlTable += catalogs && catalogs.length > 0 ? footer : '';
    htmlTable += '</table>';

    $('#catalogDocuments').append(htmlTable);

    paginate(".paginateCatalog", "#page-catalog-nav", false, currentPage);
}


function makeVariableTable(variables, currentPage) {
    $('#variableTable').remove();
    var htmlTable = '<table class="responsetable variableClassTable" id="variableTable">' +
        '<tr><th>Sıra</th>' +
        '<th>Değişken Adı</th>' +
        '<th>Değişken Tipi</th>' +
        '<th></th></tr>';
    var contextFieldCount = 0;
    $.each(variables, function (variableIndex, dataVariable) {
        var context = {
            rowNum: variableIndex + 1,
            name: dataVariable.name,
            type: getVariableType(dataVariable.type),
            uuid: dataVariable.uuid
        };
        contextFieldCount = Object.keys(context).length;
        htmlTable += '<tbody><tr class="paginate paginateVariable">' +
            '<td>' + context.rowNum + '</td>' +
            '<td class="poolVariableName">' + context.name + '</td>' +
            '<td>' + context.type + '</td>' +
            '<td style="text-align: center;">' +
            '<span id="btn_edit_variable" title="Düzenle" style="cursor: hand;" data-uuid="' + context.uuid + '">' +
            '<i class="fas fa-pencil-alt fa-1x tableCrudButtons" aria-hidden="true"></i>' +
            '</span>' +
            '<span id="btn_delete_variable" title="Sil" style="cursor: hand;" data-uuid="' + context.uuid + '">' +
            '<i class="fas fa-trash-alt fa-1x tableCrudButtons" aria-hidden="true"></i>' +
            '</span></td></tr></tbody>';
    });

    var footer = '<tfoot><td style="text-align: right;" colspan="4">' +
        '<a id="createPoolVariablesExcelFile" title="Excel\'e Aktar" style="cursor:pointer;">' +
        '<i class="far fa-file-excel fa-2x" style="color:#ffffff;" aria-hidden="true"></i>' +
        '</a>' +
        '</td></tfoot>';

    htmlTable += variables && variables.length > 0 ? footer : '';
    htmlTable += '</table>';

    $('#variableDocuments').append(htmlTable);


    paginate(".paginateVariable", "#page-variable-nav", false, currentPage);

}

$(document).on("keyup", "#txtVariableName", function (e) {
    e.preventDefault();
    var variableName = e.target.value;
    variableName = variableName.trim();

    if (e.keyCode === 13) {
        savePoolVariable(variableName);
    }
});

$(document).on("keyup", "#txtSearchPoolVariable", function (e) {
    e.preventDefault();
    var value = $(this).val().toLocaleUpperCase();
    value = value.trim();

    if ($(this).is(":focus")) {
        $("#page-variable-nav").pagination('destroy');
        $(".variableClassTable tbody tr").each(function (index) {
            if (index !== 0) {
                var row = $(this);

                var poolVariableNameText = row.find(".poolVariableName").text().toLocaleUpperCase();
                if (poolVariableNameText.indexOf(value) !== -1) {
                    row.show();
                } else {
                    row.hide();
                }


            }
        });

        paginate(".paginateVariable", "#page-variable-nav", !!value, null);

    }


});

$(document).on('click', '#spanEditValueHolder', function (e) {
    if ($('#selectDbValues option:selected').val() !== "-1") {
        var selectedText = $("#selectDbValues option:selected").text();
        $('#spanSaveValueHolder').show();
        $('#spanValueHolder').show();
        $('#txtValueHolder').val(selectedText);
        $(this).hide();
    } else {
        displayWarningMsg("Lütfen seçim yapınız.");
    }

});

$(document).on('click', '#spanSaveValueHolder', function (e) {
    var uuid = $("#selectDbValues option:selected").val();
    var selectedText = $("#selectDbValues option:selected").text();
    var found = findInFormula(uuid, 'holderUUID');
    var firstPreview = false;
    if (found && found.isUsed === true) {
        isVariableUsedBefore(found.formulaUUID, selectedText);
        firstPreview = true;
    } else {
        var valueHolder = $('#txtValueHolder').val();
        if (valueHolder) {
            valueHolder = valueHolder.trim();
            if (userValues) {
                $.each(userValues.data, function (index, data) {
                    if (uuid === data.uuid) {
                        data.name = valueHolder;
                        var params = {
                            name: valueHolder
                        };

                        pHolder.updateHolder(uuid, params);
                        saveValue(MSG_SUCCESS_VALUE_UPDATE.replace("$value_name", valueHolder),
                            {item: valueHolder, itemUUID: uuid, itemType: "value", action: "update"});
                        $("#selectDbValues option:selected").text(valueHolder);
                        return false;
                    }
                });
            }

            firstPreview = true;

        } else {
            displayWarningMsg("Lütfen alanı boş bırakmayınız!");
        }

    }

    if (firstPreview) {
        $('#spanSaveValueHolder').hide();
        $('#spanValueHolder').hide();
        $('#spanEditValueHolder').show();
    }


});

$(document).on('click', '#btn_add_new_value', function (e) {
    var uuid = $('#valueDocuments').attr('data-uuid');
    if (userValues) {
        if (uuid === userValues._id && $('#selectDbValues option:selected').val() !== "-1") {
            $('#newValueItem').val('');
            $('#newValueItemRow').show();
        }
    }
});

$(document).on('keydown', '#newValueItem', function (e) {
    var newValue = e.target.value;
    newValue = newValue.trim();
    if (e.keyCode === 13) {  //checks whether the pressed key is "Enter"
        saveValueItem(newValue);
    }
});

$(document).on('click', '#btn_save_value_item', function (e) {
    var newValue = $('#newValueItem').val();
    newValue = newValue.trim();
    saveValueItem(newValue);

});

$(document).on('click', '#btn_delete_value', function (e) {
    var uuid = $(this).attr('data-uuid');
    var selectedText = $("#selectDbValues option:selected").text();
    var selectedVal = $("#selectDbValues option:selected").val();
    var currentPage = getCurrentPage('#page-nav');
    var found = findInFormula(selectedVal, 'holderUUID');

    if (found && found.isUsed === true) {
        isVariableUsedBefore(found.formulaUUID, selectedText);
    } else {
        if (userValues && uuid) {
            $.each(userValues.data, function (index, data) {
                if (selectedText === data.name) {
                    $.each(data.values, function (valueIndex, dataValue) {
                        if (dataValue.hasOwnProperty("uuid") && dataValue.uuid) {
                            if (uuid === dataValue.uuid) {
                                ConfirmPopup('Değer Silme İşlemi', 'Değeri silmek istediğinizden emin misiniz?',
                                    'Evet', 'Hayır', function () {

                                        data.values.splice(valueIndex, 1);
                                        saveValue(MSG_SUCCESS_VALUE_DELETE.replace("$value_name", dataValue.name),
                                            {
                                                item: dataValue.name,
                                                itemUUID: uuid,
                                                itemType: "value",
                                                action: "delete"
                                            });
                                        loadValueTable($("#valueDocuments option:selected"), currentPage);
                                        var variableUUID = $(".menu2").attr('data-uuid');
                                        if (variableUUID) {
                                            var variable = pModel.getVariable(variableUUID);
                                            if (variable)
                                                selectedVariable(variable);
                                        }

                                    });
                            }
                        }
                    });
                }
            });
        }
    }
});

$(document).on('click', '#btn_edit_value', function (e) {
    var selectedText = $("#selectDbValues option:selected").text();
    var selectedVal = $("#selectDbValues option:selected").val();
    var found = findInFormula(selectedVal, 'holderUUID');
    if (found && found.isUsed === true) {
        isVariableUsedBefore(found.formulaUUID, selectedText);
    } else {

        var uuid = $(this).attr('data-uuid');
        var name = $(this).attr('data-name');
        $('#editedValueItem').text(uuid);
        $('#editedValueItemName').text(name);
        $('#btn_save_value_item').val('Güncelle');
        $('#newValueItemRow').show();
        $('#newValueItem').val(name);
    }
});


$(document).on('click', '#btn_delete_variable', function (e) {

    var currentPage = getCurrentPage('#page-variable-nav');

    var uuid = $(this).attr('data-uuid');
    if (uuid) {
        var variables = pVariable.listPoolVariable();
        $.each(variables, function (variableIndex, dataVariable) {
            if (uuid === dataVariable.uuid) {
                ConfirmPopup('Değişken Tanımı Silme İşlemi', 'Değişkeni silmek istediğinizden emin misiniz?',
                    'Evet', 'Hayır', function () {


                        var found = findInFormula('name', dataVariable.name);

                        /*var isUsed = false;
                        var formulaUUID = null;
                        var finalResults = [];
                        var data = {
                            categories: pModel.listCategory()
                        };

                        findObjects(data, 'name', dataVariable.name, finalResults, true);
                        if (finalResults && finalResults.length > 0) {
                            for (var i = 0; i < finalResults.length; i++) {
                                var item = finalResults[i];
                                if (item.hasOwnProperty("formulaUUID") && item.formulaUUID) {
                                    isUsed = true;
                                    formulaUUID = item.formulaUUID;
                                    break;
                                }
                            }
                        }*/

                        if (found && found.isUsed === true) {
                            isVariableUsedBefore(found.formulaUUID, dataVariable.name);
                        } else {
                            pVariable.deletePoolVariable(uuid);
                            var ajaxSaveVariable =
                                saveVariable(MSG_SUCCESS_VARIABLE_DEL.replace("$variable_name", dataVariable.name),
                                    {item: dataVariable.name, itemUUID: uuid, itemType: "variable", action: "delete"});
                            $.when(ajaxSaveVariable).done(function (r1, r2) {
                                loadVariableTable(currentPage);

                                $('#txtSearchPoolVariable').keyup();
                            });

                            $(".table-popup").hide();
                            $('#btn_save_pool_variable').val('Kaydet');

                            $('#btn_clear_pool_variable').click();


                        }
                    });
            }
        });
    }

});

$(document).on('click', '#btn_edit_variable', function (e) {
    var uuid = $(this).attr('data-uuid');
    if (uuid) {
        var poolVariables = pVariable.listPoolVariable();
        $.each(poolVariables, function (poolVariableIndex, dataPoolVariable) {
            if (uuid === dataPoolVariable.uuid) {
                $('#txtVariableName').val(dataPoolVariable.name);
                $('#txtVariableDescription').val(dataPoolVariable.description);
                $('#selectPoolVariableValueType').val(dataPoolVariable.type);
                if (dataPoolVariable.type === 'Select') {
                    $('#SelectPoolValueIdContainer').show();
                    $('#selectPoolValueID').val(dataPoolVariable.holderUUID);
                } else {
                    $('#SelectPoolValueIdContainer').hide();
                    $('#selectPoolValueID').val('');
                }
                $('#editedPoolVariable').text(dataPoolVariable.uuid);
                $('#editedPoolVariableName').text(dataPoolVariable.name);
                $('#btn_save_pool_variable').val('Güncelle');
            }
        });
    }
});


$(document).on('click', '#btn_save_catalog', function (e) {
    e.preventDefault();

    var currentPage = getCurrentPage('#page-catalog-nav');

    var name = $('#txtDbCatalogName').val();
    var server = $('#txtDbServer').val();
    var database = $('#txtDbName').val();
    var username = $('#txtDbUsername').val();
    var password = $('#txtDbPassword').val();
    if (!name || !server || !database || !password || !password) {
        displayWarningMsg("Tüm alanlar zorunludur.");
    } else {
        var params = {
            name: name,
            server: server,
            database: database,
            username: username,
            password: password
        };
        var url = editorURL + dbURL + "generate/" + username + "/" + password;
        $.ajax({
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', token);
            },
            type: "GET",
            url: url,
            dataType: "json",
            contentType: "application/json",
            timeout: 5000
        }).done(function (response) {
            if (response.data) {
                params.username = response.data.username;
                params.password = response.data.password;

                var selectedUUID = $('#editedCatalog').text();
                var message = MSG_SUCCESS_CATALOG_CREATION;
                if (selectedUUID) {
                    params.uuid = selectedUUID;
                    message = MSG_SUCCESS_CATALOG_UPDATED;
                    pDbCatalog.updateCatalog(params);
                } else {
                    pDbCatalog.addDbCatalog(params);
                }

                var ajaxSaveCatalog = saveCatalog(message);
                $.when(ajaxSaveCatalog).done(function (r1, r2) {
                    loadCatalogTable(currentPage);
                });
                $(':input[type="text"]').val('');
                $(':input[type="password"]').val('');
                $('#editedCatalog').empty();
            }
        }).fail(function (xhr, exception) {
            gotException(xhr, exception);
        });
    }

});

$(document).on('click', '#btn_delete_catalog', function (e) {
    var uuid = $(this).attr('data-uuid');
    var currentPage = getCurrentPage('#page-catalog-nav');
    if (uuid) {
        var catalogs = pDbCatalog.listDbCatalog();
        $.each(catalogs, function (catalogIndex, dataCatalog) {
            if (uuid === dataCatalog.uuid) {
                ConfirmPopup('Veritabanı Tanımı Silme İşlemi', 'Veritabanı tanımını silmek istediğinizden emin misiniz?',
                    'Evet', 'Hayır', function () {
                        pDbCatalog.deleteCatalog(uuid);
                        var ajaxSaveCatalog = saveCatalog(MSG_SUCCESS_CATALOG_DELETED);
                        $.when(ajaxSaveCatalog).done(function (r1, r2) {
                            loadCatalogTable(currentPage);
                        });
                    });

            }
        });
    }
});

$(document).on('click', '#btn_edit_catalog', function (e) {
    var uuid = $(this).attr('data-uuid');
    if (uuid) {
        var catalogs = pDbCatalog.listDbCatalog();
        $.each(catalogs, function (catalogIndex, dataCatalog) {
            if (uuid === dataCatalog.uuid) {
                $('#txtDbCatalogName').val(dataCatalog.name);
                $('#txtDbServer').val(dataCatalog.server);
                $('#txtDbName').val(dataCatalog.database);
                $('#editedCatalog').text(dataCatalog.uuid);
            }
        });
    }
});

$(document).on('keydown', '#newSelectiveValueItem', function (e) {
    var newSelectiveValue = e.target.value;
    if (e.keyCode === 13) {  //checks whether the pressed key is "Enter"
        saveSelectiveValueItem(newSelectiveValue);
    }
});

$(document).on('click', '#btn_save_selective_value', function (e) {
    var newSelectiveValue = $('#newSelectiveValueItem').val();
    saveSelectiveValueItem(newSelectiveValue);
});

$(document).on('click', '#btn_delete_selective_value', function (e) {
    $('#newValueItemRow').remove();
    var selectedText = $("#valueDocuments option:selected").text();
    if (selectedText !== '---') {
        if (userValues) {
            $.each(userValues.data, function (index, data) {
                if (data.hasOwnProperty("name")) {
                    if (selectedText === data.name) {
                        ConfirmPopup('Seçimli Değer Silme İşlemi', 'Seçimli değeri silmek istediğinizden emin misiniz?',
                            'Evet', 'Hayır', function () {
                                /*var finalResults = [];
                                var formulaUUID = null;
                                var isUsed = false;
                                var modelData = {
                                    categories: pModel.listCategory()
                                };

                                findObjects(modelData, 'holderUUID', data.uuid, finalResults, true);
                                if (finalResults && finalResults.length > 0) {
                                    for (var i = 0; i < finalResults.length; i++) {
                                        var item = finalResults[i];
                                        if (item.hasOwnProperty("formulaUUID") && item.formulaUUID) {
                                            isUsed = true;
                                            formulaUUID = item.formulaUUID;
                                            break;
                                        }
                                    }
                                }*/
                                var found = findInFormula('holderUUID', data.uuid);

                                if (found && found.isUsed) {
                                    isVariableUsedBefore(found.formulaUUID, data.name);
                                } else {
                                    userValues.data.splice(index, 1);
                                    saveValue(MSG_SUCCESS_VALUE_DELETE.replace("$value_name", selectedText),
                                        {item: data.name, itemUUID: data.uuid, itemType: "value", action: "delete"});
                                    loadValueCombo();
                                    fillSelectiveValueCombo(userValues);
                                }
                            });
                    }
                }
            });
        }
    }
    $('#newSelectiveValueItem').val('');
});

function fillSelectiveValueCombo(userValues) {
    $("#selectValueID").empty();
    $("#selectValueIDDetails").empty();
    pHolder.fromJSON(userValues.data);
    for (var i = 0; i < userValues.data.length; i++) {
        var holder = userValues.data[i];
        var dom_html = '<option value="$key">$text</option>';
        dom_html = dom_html.replace("$key", holder.uuid).replace("$text", holder.name);
        $("#selectValueID").append(dom_html);
    }
}

function fillSelectivePoolValueCombo(userValues) {
    $("#selectPoolValueID").empty();
    $("#selectPoolValueIDDetails").empty();
    pHolder.fromJSON(userValues.data);
    for (var i = 0; i < userValues.data.length; i++) {
        var holder = userValues.data[i];
        var dom_html = '<option value="$key">$text</option>';
        dom_html = dom_html.replace("$key", holder.uuid).replace("$text", holder.name);
        $("#selectPoolValueID").append(dom_html);
    }
}

$(document).on('click', '#btn_clear_cache', function (e) {
    clearPricingEngineCache();
});

$(document).on('click', '#editOutput', function (e) {
    e.preventDefault();
    var text = $(this).closest("li").text();
    var outputUUID = $(this).closest("li").attr('data-uuid');
    var optionType = $(this).closest("li").attr('data-box-type');

    $('#selectOutputVariableValueType option[value=' + optionType + ']').attr("selected", "selected");
    $('#txtOutputVariable').val(text);
    $('#addLogicalOutputBtn').val('Değiştir');
    $('#boxOutputId').text(outputUUID);

});


function makeSqlBlockCatalogCombo(trigger, val) {
    $('.comboLabel').remove();
    $('#selectCatalog').remove();
    $('#selectCatalogTable').remove();
    $('#selectCatalogTableColumn').remove();
    var ajaxCatalogCall = catalogCall();
    $.when(ajaxCatalogCall).done(function (r1, r2) {

        // Tablo ve kolon secimi kaldırıldı. Jira-597 20182601 necipakif
        //
        var htmlCombo = '<div class="comboLabel" id="lblCatalog">Katalog</div>' +
            '<select id="selectCatalog" class="clsSelectCatalog" onchange="makeSqlBlockTablesCombo(this);">' +
            '<option value="-1">---</option>';
        var catalogs = pDbCatalog.listDbCatalog();
        if (catalogs && catalogs.length > 0) {
            $.each(catalogs, function (index, data) {
                var context = {
                    uuid: data.uuid,
                    name: data.name,
                    "database": data.database
                };
                htmlCombo += '<option value="' + context.uuid +
                    '" data-catalog-name="' + context.database + '">' + context.name + '</option>';
            });
        }
        htmlCombo += '</select>';

        $('#CodeBlockContainer').prepend(htmlCombo);
        if (val) {
            $('#selectCatalog').val(val.catalog);
            if (trigger) {
                $('#CodeBlockContainer').find(".clsSelectCatalog").val(val.catalog);
                makeSqlBlockTablesCombo($('#CodeBlockContainer').find(".clsSelectCatalog option:selected"), true, val);
            }
        }

        //$('.clsSelectCatalog').show();
    });
}


function makeSqlBlockTablesCombo(combo, trigger, val) {
    $('#selectCatalogTable').remove();
    $('#selectCatalogTableColumn').remove();
    $('#lblTable').remove();
    $('#lblColumn').remove();
    var uuid = $(combo).val();
    if (uuid !== "-1") {
        var catalog = $('#CodeBlockContainer').find(".clsSelectCatalog option:selected").attr("data-catalog-name");
        var email = getEmail();
        var dataCatalog = {uuid: uuid, "catalog": catalog};
        var dtCatalogJSON = JSON.stringify(dataCatalog);
        var url = editorURL + dbURL + "catalog/" + email;
        $.ajax({
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', token);
            },
            type: "POST",
            url: url,
            data: dtCatalogJSON,
            dataType: "json",
            contentType: "application/json",
            timeout: 5000
        }).done(function (response) {
            //'onchange="makeSqlBlockTableColumnsCombo(this);">' +
            if (response) {
                if (response.error === 1) {
                    displayWarningMsg(MSG_SUCCESS_CATALOG_NOT_FOUND);
                } else if (response.data && response.data.length > 0) {
                    var htmlCombo = '<div class="comboLabel" id="lblTable">Tablo Adı</div>' +
                        '<select id="selectCatalogTable" class="clsSelectCatalogTable" ' +
                        '<option value="-1">---</option>';
                    var tables = response.data;
                    $.each(tables, function (index, data) {
                        var context = {
                            name: data.TABLE_NAME
                        };
                        htmlCombo += '<option class="shortOption" data-limit="20" value="' + context.name + '">' + context.name + '</option>';
                    });

                    htmlCombo += '</select>';
                    //$('#CodeBlockContainer').prepend(htmlCombo);
                    $(htmlCombo).insertAfter('#selectCatalog');
                    shortString();
                    /*if (trigger) {
                        $('#CodeBlockContainer').find(".clsSelectCatalogTable").val(val.table);
                        makeSqlBlockTableColumnsCombo($('#CodeBlockContainer').find(".clsSelectCatalogTable option:selected"), true, val);
                    }*/
                }
            }
        }).fail(function (xhr, exception) {
            gotException(xhr, exception);
        });
    } else {
        $('#selectCatalogTable').remove();
        $('#selectCatalogTableColumn').remove();
        $('#lblTable').remove();
        $('#lblColumn').remove();

    }

}

function makeSqlBlockTableColumnsCombo(combo, trigger, val) {
    $('#selectCatalogTableColumn').remove();
    $('#lblColumn').remove();

    var table = $(combo).val();

    if (table !== "-1") {
        var catalog = $('#selectCatalog option:selected').attr("data-catalog-name");
        var uuid = $('#selectCatalog option:selected').val();
        var email = getEmail();
        var dataCatalog = {uuid: uuid, "catalog": catalog, "table": table};
        var dtCatalogJSON = JSON.stringify(dataCatalog);
        var url = editorURL + dbURL + "catalog/" + email;
        $.ajax({
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', token);
            },
            type: "POST",
            url: url,
            data: dtCatalogJSON,
            dataType: "json",
            contentType: "application/json",
            timeout: 5000
        }).done(function (response) {

            if (response) {
                if (response.error === 1) {
                    displayWarningMsg(MSG_SUCCESS_CATALOG_NOT_FOUND);
                } else if (response.data && response.data.length > 0) {
                    var htmlCombo = '<div class="comboLabel" id="lblColumn">Kolon Adı</div>' +
                        '<select id="selectCatalogTableColumn" class="clsSelectCatalogTableColumn" >' +
                        '<option value="-1">---</option>';
                    var tables = response.data;
                    $.each(tables, function (index, data) {
                        var context = {
                            val: data.COLUMN_NAME,
                            name: data.COLUMN_NAME
                        };
                        htmlCombo += '<option value="' + context.val + '">' + context.name + '</option>';
                    });

                    htmlCombo += '</select>';
                    $('#CodeBlockContainer').append(htmlCombo);
                    if (trigger) {
                        $('#CodeBlockContainer').find(".clsSelectCatalogTableColumn").val(val.column);
                    }
                }
            }
        }).fail(function (xhr, exception) {
            gotException(xhr, exception);
        });
    } else {
        $('#selectCatalogTableColumn').remove();
    }

}

function getBoxTypeColor(boxType) {
    return boxType === "DecisionTable" ? COLOR_DECISION_TABLE :
        boxType === "LogicalDecisionTable" ? COLOR_LOGICAL_DECISION_TABLE :
            boxType === "CodeBlock" ? COLOR_CODE_BLOCK :
                boxType === "SQLBlock" ? COLOR_SQL_BLOCK : COLOR_BLOCK_DEFAULT;
}


$(document).on('change', '#uploadExcelFile', function (event) {

    if (!checkPermissionControl(ACTION_NAMES.TABLE.LOAD)) {
        displayWarningMsg(MSG_HAS_NO_PERMISSION);
        return false;
    }

    if (event.target && event.target.files && event.target.files.length > 0) {
        var file = event.target.files[0];
        var excelFile = isExcel(file.name);
        var boxUUID = $(".menu2").attr('data-uuid');
        var box = pModel.getBox(boxUUID);
        if (box) {

            if (file.name !== box.uuid + ".xlsx") {
                displayWarningMsg("Lütfen şablon olarak indirilen excel dosyasını seçiniz.");
                resetUploadFile();
            }
        }

        if (!excelFile) {
            $(this).val('');
            if (!/safari/i.test(navigator.userAgent)) {
                $(this).type = '';
                $(this).type = 'file';
            }
            displayWarningMsg("Lütfen şablon olarak indirilen excel dosyasını seçiniz.");
        }

    }

});

function downloadExcelFile(event, href) {
    event.preventDefault();

    if (!checkPermissionControl(ACTION_NAMES.TABLE.DOWNLOAD)) {
        displayWarningMsg(MSG_HAS_NO_PERMISSION);
        return false;
    }

    var link = href ? href : this.href;
    $.ajax({
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', token);
        },
        type: "GET",
        url: link,
        timeout: 5000
    }).done(function (data) {
        if (data.msg) {
            displayWarningMsg(data.msg);
        } else {
            window.open(link, '_blank');
            //window.open('data:application/vnd.ms-excel,' + encodeURIComponent(data));
        }
    }).fail(function (xhr, exception) {
        // If fail
        gotException(xhr, exception);
    });

}

$(document).on('click', '#decisiontablelink', downloadExcelFile);
//$(document).on('click', '#currentdecisiontablelink', downloadExcelFile);
$(document).on('click', '#localdecisiontablelink', downloadExcelFile);

$(document).on('change', '#selectPoolVariableValueType', function (e) {
    e.preventDefault();
    $("#selectPoolValueIDDetails").empty();
    if ($('#selectPoolVariableValueType').val() === "Select") {
        $("#selectPoolValueID").val('');
        $("#SelectPoolValueIdContainer").show();
    } else {
        $("#SelectPoolValueIdContainer").hide();
    }
});

$(document).on('change', '#selectPoolValueID', function (e) {
    e.preventDefault();
    var holderUUID = $("#selectPoolValueID").val();
    var holder = pHolder.getHolder(holderUUID);
    var values = holder.values;
    $("#selectPoolValueIDDetails").empty();
    for (var i = 0; i < values.length; i++) {
        $("#selectPoolValueIDDetails").append("<li>" + values[i].name + "</li>");
    }
});

$(document).on('click', '#selectPoolVariable', function (e) {
    e.preventDefault();

    if (!checkPermissionControl(ACTION_NAMES.VARIABLE.ADD_TO_FORMULA)) {
        displayWarningMsg(MSG_HAS_NO_PERMISSION);
        return false;
    }

    var poolVariableUUID = $(this).closest("li").attr('data-uuid');
    var poolVariable = pVariable.getPoolVariable(poolVariableUUID);
    var formulaUUID = $("#variable_list").attr("data-uuid");

    if (poolVariable && formulaUUID) {
        var variable = pModel.addVariable(formulaUUID, poolVariable.name,
            poolVariable.type, poolVariable.holderUUID);

        var dom_html = $("#variable_template").html();
        dom_html = dom_html.replace("$variable_name", variable.name);
        dom_html = dom_html.replace("$variable_uuid", variable.uuid);

        $("#variable_list").prepend(dom_html);
        var variableObj = $("[data-uuid='" + variable.uuid + "']").find(".variable");
        variableObj.find(".btnLabelVariable").text(variable.name);
        variableObj.children().show();
        //variableObj.attr("data-uuid", variable.uuid);
        searchPoolVariableMap = {};
        $('#poolVariable_list').empty();
        saveModel(MSG_SUCCESS_VARIABLE_ADD.replace("$variable_name", variable.name),
            {item: variable.name, itemUUID: variable.uuid, itemType: "variable", action: "create"});
    } else {
        displayWarningMsg("Lütfen Öncelikle Bir Formül Seçiniz.");
    }

});

$(document).on('click', '.table_poolVariable', function (e) {
    e.preventDefault();
    var poolVariableUUID = $(this).closest("li").attr('data-uuid');
    var selectedPoolVariable = undefined;
    if (poolVariableUUID) {
        if (searchPoolVariableMap && Object.size(searchPoolVariableMap) > 0) {
            selectedPoolVariable = searchPoolVariableMap[poolVariableUUID];
            if (selectedPoolVariable) {
                $(this).removeClass("table_poolVariableSelected");
                delete searchPoolVariableMap[poolVariableUUID];
            } else {
                selectedPoolVariable = pVariable.getPoolVariable(poolVariableUUID);
                searchPoolVariableMap[poolVariableUUID] = selectedPoolVariable;
                $(this).addClass("table_poolVariableSelected");
            }
        } else {
            selectedPoolVariable = pVariable.getPoolVariable(poolVariableUUID);
            searchPoolVariableMap[poolVariableUUID] = selectedPoolVariable;
            $(this).addClass("table_poolVariableSelected");
        }
    }

    if (searchPoolVariableMap && Object.size(searchPoolVariableMap) > 0) {
        if ($(this).parent().find(".addAllPoolVariable").length === 0) {
            var poolAddElement = '<li class="table_poolVariable addAllPoolVariable">EKLE</li>';
            $('#poolVariable_list').append(poolAddElement);
        }
    } else {
        if ($(this).parent().find(".addAllPoolVariable").length > 0) {
            $('.addAllPoolVariable').remove();
        }
    }
});

$(document).on('click', '.addAllPoolVariable', function (e) {
    e.preventDefault();
    var isAdded = false;
    var hasVariable = false;
    var messages = "";
    var itemName, itemId;

    if (!checkPermissionControl(ACTION_NAMES.VARIABLE.ADD_TO_FORMULA)) {
        displayWarningMsg(MSG_HAS_NO_PERMISSION);
        return false;
    }

    if (searchPoolVariableMap && Object.size(searchPoolVariableMap) > 0) {
        for (var item in searchPoolVariableMap) {
            if (searchPoolVariableMap.hasOwnProperty(item)) {
                hasVariable = false;
                var poolVariable = searchPoolVariableMap[item];
                var formulaUUID = $("#variable_list").attr("data-uuid");
                if (poolVariable && formulaUUID) {

                    var formula = pModel.getFormula(formulaUUID);
                    if (formula.variables && formula.variables.length > 0) {
                        for (var i = 0; i < formula.variables.length; i++) {
                            var formulaVariable = formula.variables[i];
                            if (formulaVariable.name === poolVariable.name) {
                                hasVariable = true;
                                break;
                            }
                        }
                    }

                    if (!hasVariable) {
                        var variable = pModel.addVariable(formulaUUID, poolVariable.name,
                            poolVariable.type, poolVariable.holderUUID);

                        var dom_html = $("#variable_template").html();
                        dom_html = dom_html.replace("$variable_name", variable.name);
                        dom_html = dom_html.replace("$variable_uuid", variable.uuid);

                        $("#variable_list").prepend(dom_html);
                        //var variableObj = $("[data-uuid='" + variable.uuid + "']").find(".variable");
                        var variableObj = $("[data-uuid='" + variable.uuid + "']");
                        variableObj.find(".btnLabelVariable").text(variable.name);


                        variableObj.children().show();

                        //variableObj.attr("data-uuid", variable.uuid);
                        isAdded = true;
                        itemName = variable.name;
                        itemId = variable.uuid;
                        messages += MSG_SUCCESS_VARIABLE_ADD.replace("$variable_name", variable.name) + "\n";
                    } else {
                        itemName = poolVariable.name;
                        itemId = poolVariable.uuid;
                        var errorText = MSG_WARN_VARIABLE_HAS_ADDED.replace("$variable_name", poolVariable.name);
                        var msgTemp = '<span class="error">' + errorText + '</span></br>';
                        messages += msgTemp;
                    }
                } else {
                    displayWarningMsg("Lütfen Öncelikle Bir Formül Seçiniz.");
                }
            }
        }
    }

    variableSort();

    if (isAdded === true) {
        searchPoolVariableMap = {};
        $('#poolVariable_list').empty();
        saveModel(messages);
    } else {
        if (messages && messages !== "") {
            displayWarningMsg(messages);
        }
    }


});

function createDefinitionsExcel(e, params) {
    var data = params.data;
    var dtJSON = JSON.stringify(data);
    var src = params.src;

    $.ajax({
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', token);
        },
        type: "POST",
        url: editorURL + "/api/v1/excel/generate",
        data: dtJSON,
        dataType: "json",
        contentType: "application/json",
        timeout: 5000
    }).done(function (response) {
        downloadExcelFile(e, src);
    }).fail(function (xhr, exception) {
        gotException(xhr, exception);
    });
}

$(document).on('click', '#createPoolVariablesExcelFile', function (e) {
    var headers = ["Değişken Adı", "Değişken Tipi"];
    var data = {
        headers: headers,
        variables: pVariable.listPoolVariable(),
        name: "variables.xlsx",
        sheetName: "Değişkenler"
    };
    var src = editorURL + "/download/variables";
    var params = {
        data: data,
        src: src
    };
    createDefinitionsExcel(e, params);
});

$(document).on('click', '#createValuesExcelFile', function (e) {
    var valuesData = [];
    //var uuid = $("#valueDocuments option:selected").val();
    //var type = $("#valueDocuments option:selected").text();
    $.each(userValues.data, function (index, data) {
        var type = data.name;
        $.each(data.values, function (valueIndex, dataValue) {
            var context = {
                name: dataValue.name,
                type: type
            };
            valuesData.push(context);
        });

    });

    var headers = ["Değişken Adı", "Değişken Tekil Nu"];
    var data = {headers: headers, variables: valuesData, name: "values.xlsx", sheetName: "Seçimli Değer"};
    var src = editorURL + "/download/values";
    var params = {
        data: data,
        src: src
    };
    createDefinitionsExcel(e, params);
});

$(document).on('click', '#createCatalogExcelFile', function (e) {
    var headers = ["Şema Adı", "Şema Bilgisi"];
    var catalogData = [];
    var catalogs = pDbCatalog.listDbCatalog();
    if (catalogs && catalogs.length > 0) {
        for (var i = 0; i < catalogs.length; i++) {
            var item = catalogs[i];
            var context = {
                name: item.name,
                type: "Sunucu : " + item.server + " " + "Veri tabanı : " + item.database
            };
            catalogData.push(context);
        }
    }

    var data = {headers: headers, variables: catalogData, name: "catalogs.xlsx", sheetName: "Kataloglar"};
    var src = editorURL + "/download/catalogs";
    var params = {
        data: data,
        src: src
    };
    createDefinitionsExcel(e, params);
});


function displayTemplateAgain(elem, clazz, childClazz) {
    var totalHiddenField = $(elem).find(clazz).find(childClazz).filter(":hidden").length;
    if ($(elem).find(clazz).length > 0 && totalHiddenField > 0) {
        var count = 0;
        $(elem).children().each(function () {
            //&& count < totalHiddenField
            if ($(this).attr("data-uuid")) {
                if ($(this).find(childClazz).css('display') === 'none')
                    $(this).find(childClazz).css('display', '');
            }
            count++;
        });

    }
}

function removeFromTemplate(elem, clazz, childClazz) {
    var totalHiddenField = $(elem).find(clazz).find(childClazz).filter(":hidden").length;
    if ($(elem).find(clazz).length > 0 && totalHiddenField > 1) {
        var count = 1;
        $(elem).children().each(function () {
            if (!$(this).attr("data-uuid") && count < totalHiddenField) {
                if ($(this).find(childClazz).css('display') === 'none')
                    $(this).remove();
            }
            count++;
        });

    }
}

function reShowInputTemplate(elem, clazz, childClazz) {
    removeFromTemplate(elem, clazz, childClazz);
    if ($(elem).find(".InputTextAndSubmitContainer").css('display') === 'none')
        $(elem).find(".InputTextAndSubmitContainer").show();
    $(elem).children().first().prepend($(".InputTextAndSubmitContainer"));
}

function isVariableUsedBefore(formulaUUID, variableName) {
    var messageUsed = MSG_WARN_VARIABLE_USED.replace("$variable_name", variableName);
    if (formulaUUID) {
        var formula = pModel.getFormula(formulaUUID);
        var folder = pModel.getFolder(formula.folderUUID);
        var category = undefined;

        try {
            category = pModel.getCategory(folder.categoryUUID);
        } catch (err) {
            category = undefined;
        }
        $(".table-popup").hide();
        if (!formula || !folder || !category) {
            displayWarningMsg("Değişken Daha Önce Kullanılmış");
        } else {
            messageUsed = messageUsed.replace("$formula_name", formula.name);
            messageUsed = messageUsed.replace("$folder_name", folder.name);
            messageUsed = messageUsed.replace("$category_name", category.name);
            displayWarningMsg(messageUsed);
        }

    }
}

function selectedVariable(variable) {
    var poolVariable = pVariable.getPoolVariableWithName(variable.name.toLocaleLowerCase());
    $("#txtSelectedVariable").val(variable.name);
    $("#txtSelectedVariableDescription").val(poolVariable ? poolVariable.description : '');
    $("#selectVariableValueType").val(variable.type);
    $("#selectValueID").val(variable.holderUUID);
    var holder = pHolder.getHolder(variable.holderUUID);
    if (holder != null) {
        var values = holder.values;
        $("#selectValueIDDetails").empty();
        for (var i = 0; i < values.length; i++) {
            $("#selectValueIDDetails").append("<li>" + values[i].name + "</li>");
        }
    }
    rightPartContextPropertiesReset();
    $(".menu2").append($(".VariableContextProperties"));
    $("#SelectValueIdContainer").hide();
    if (variable.type == "Select") {
        $("#SelectValueIdContainer").show();
    }

    $('#txtSelectedVariable').prop('disabled', true);
    $('#txtSelectedVariableDescription').prop('disabled', true);
    $('#selectVariableValueType').prop('disabled', true);
    $('#selectValueID').prop('disabled', true);
}

$(document).on('click', '#btn_show_box_detail', function (e) {
    $('#boxDetails').toggle();
});

$(document).on('click', '#btn_show_versions', function (e) {
    $('#FormulaVersionList').toggle();
    $('#panelCreateVersion').toggle();
});

$(document).on('change', '#chkActive', function (e) {
    if (!checkPermissionControl(ACTION_NAMES.FORMULA.UPDATE_VERSION)) {
        displayWarningMsg(MSG_HAS_NO_PERMISSION);
        return false;
    }
    var isActive = $('#chkActive').is(":checked");
    var formulaHeadObj = $("#FormulaVersionList").find(".formulahead > .FormulaHeadNameContainer");
    formulaHeadObj = $(formulaHeadObj).find(".btnLabelFormulaHead.selectedVersion")
        .closest(".FormulaHeadNameContainer").closest(".formulahead");
    var formulaHeadUUID = formulaHeadObj.attr("data-uuid");

    var formulaHead = pModel.getFormulaHead(formulaHeadUUID);
    var updateData = {versions: []};

    if (formulaHead) {
        var version = pModel.getVersion(formulaHead.versionUUID);
        updateData.versions.push({formulaUUID: formulaHead.baseFormulaUUID, active: isActive !== true});
        for (var i = 0; i < version.formulaHeads.length; i++) {
            var fHead = version.formulaHeads[i];
            if (fHead.uuid === formulaHead.uuid) {
                fHead.active = isActive;
            } else {
                fHead.active = false;
            }
            fHead.updatedDate = getCurrentDate();

            updateData.versions.push({formulaUUID: fHead.formulaUUID, active: fHead.active});
        }
        renderFormula(formulaHead.formulaUUID);
        var ajaxSaveModel = saveModel(MSG_SUCCESS_FORMULA_VERSION_UPDATED, {
            item: formulaHead.name,
            itemUUID: formulaHead.uuid,
            itemType: "formula",
            action: "update"
        });

        $.when(ajaxSaveModel).done(function (r1, r2) {
            updateFormulaCollection(updateData);
        });

    }
});

$(document).on('click', '#btn_save_pool_variable', function (e) {
    var variableName = $('#txtVariableName').val();
    variableName = variableName.trim();
    savePoolVariable(variableName);

});

$(document).on('click', '#btn_clear_pool_variable', function (e) {
    $('#txtVariableName').val('');
    $('#txtVariableDescription').val('');
    $('#selectPoolVariableValueType').val('Integer');
    $('#SelectPoolValueIdContainer').hide();
    $('#selectPoolValueID').val('');
    $('#txtVariableName').focus();
    $('#editedPoolVariable').empty();
    $('#editedPoolVariableName').empty();

});

function savePoolVariable(variableName) {
    var currentPage = getCurrentPage('#page-variable-nav');
    var poolVariableType = $('#selectPoolVariableValueType option:selected').val();
    var poolHolderUUID = poolVariableType === 'Select' ? $('#selectPoolValueID').val() : "";
    var selectedName = $('#editedPoolVariableName').text();
    var description = $('#txtVariableDescription').val().trim();
    var btnValue = $('#btn_save_pool_variable').val();
    if (!variableName) {
        displayWarningMsg("Lütfen Alanı Boş Bırakmayınız.");
    } else {
        variableName = variableName.substring(0, 25);
        var isSameVariable = false;
        var updateVariable = false;
        //var isSelectedChange = false;
        var variableType = null;
        var poolVariables = pVariable.listPoolVariable();
        if (poolVariables && poolVariables.length > 0) {
            $.each(poolVariables, function (index, data) {
                if (variableName.toLocaleLowerCase() === data.name.toLocaleLowerCase()) {
                    variableType = data.type;
                    isSameVariable = true;
                    return false;
                }
            });
        }

        if (isSameVariable === true) {
            if (variableName === selectedName && variableType !== poolVariableType) {
                isSameVariable = false;
            } else if (variableName === selectedName && variableType === poolVariableType) {
                if (btnValue && btnValue === 'Güncelle') {
                    isSameVariable = false;
                    updateVariable = true;
                }
            }
        }

        if (isSameVariable) {
            displayWarningMsg("Aynı Değişken Adında Kayıt Bulunmaktadır.");
        } else {
            var params = {
                name: variableName,
                type: poolVariableType,
                holderUUID: poolHolderUUID,
                description: description
            };
            var selectedUUID = $('#editedPoolVariable').text();


            var message = MSG_SUCCESS_POOL_VARIABLE_ADD.replace("$variable_name", variableName);
            if (selectedUUID) {

                var isUsed = false;
                var formulaUUID = null;
                var finalResults = [];
                var data = {
                    categories: pModel.listCategory()
                };

                findObjects(data, 'name', variableName, finalResults, true);
                if (finalResults && finalResults.length > 0) {
                    for (var i = 0; i < finalResults.length; i++) {
                        var item = finalResults[i];
                        if (item.hasOwnProperty("formulaUUID") && item.formulaUUID) {
                            isUsed = true;
                            formulaUUID = item.formulaUUID;
                            break;
                        }
                    }
                }

                findObjects(data, 'name', selectedName, finalResults, true);
                if (finalResults && finalResults.length > 0) {
                    for (var j = 0; j < finalResults.length; j++) {
                        var item = finalResults[j];
                        if (item.hasOwnProperty("formulaUUID") && item.formulaUUID) {
                            isUsed = true;
                            formulaUUID = item.formulaUUID;
                            break;
                        }
                    }
                }


                //isUsed = isSelectedChange === true ? false : isUsed;
                if (isUsed === true && !updateVariable) {
                    isVariableUsedBefore(formulaUUID, variableName);

                } else {
                    message = MSG_SUCCESS_VARIABLE_UPDATE.replace("$variable_name", variableName);
                    pVariable.updatePoolVariable(selectedUUID, params);
                    var ajaxSaveVariable = saveVariable(message,
                        {item: variableName, itemUUID: selectedUUID, itemType: "variable", action: "update"});
                    $.when(ajaxSaveVariable).done(function (r1, r2) {
                        loadVariableTable(currentPage);
                        $('#txtSearchPoolVariable').keyup();
                    });
                }

            } else {
                var pVar = pVariable.addPoolVariable(variableName, poolVariableType, poolHolderUUID, description);
                var ajaxSaveVariable = saveVariable(message,
                    {item: variableName, itemUUID: pVar.uuid, itemType: "variable", action: "create"});
                $.when(ajaxSaveVariable).done(function (r1, r2) {
                    loadVariableTable(currentPage);
                    $('#txtSearchPoolVariable').keyup();
                });
            }


        }

        $('#btn_save_pool_variable').val('Kaydet');
        $('#btn_clear_pool_variable').click();


    }
}

function saveSelectiveValueItem(newSelectiveValue) {
    newSelectiveValue = newSelectiveValue.trim();
    if (!newSelectiveValue) {
        displayWarningMsg("Lütfen Alanı Boş Bırakmayınız.");
    } else {
        if (userValues) {
            var newSelectiveData = {
                name: newSelectiveValue,
                uuid: guid(),
                values: []
            };
            var found = false;
            $.each(userValues.data, function (index, data) {
                if (newSelectiveValue === data.name) {
                    found = true;
                }
            });
            if (!found) {
                userValues.data.push(newSelectiveData);
                saveValue(MSG_SUCCESS_VALUE_ADD.replace("$value_name", newSelectiveValue),
                    {item: newSelectiveValue, itemUUID: newSelectiveData.uuid, itemType: "value", action: "create"});
                loadValueCombo();
                fillSelectiveValueCombo(userValues);
                fillSelectivePoolValueCombo(userValues);
                $('#newSelectiveValueItem').val('');
            } else {
                displayWarningMsg(MSG_SUCCESS_VALUE_SAME.replace("$value_name", newSelectiveValue));
            }

        }
        $('#newValueItemRow').hide();
    }
}

function saveValueItem(newValue) {
    if (!newValue) {
        displayWarningMsg("Lütfen Alanı Boş Bırakmayınız.");
    } else {
        var currentPage = getCurrentPage('#page-nav');
        var selectedText = $("#valueDocuments option:selected").text();
        if (userValues) {
            $.each(userValues.data, function (index, data) {
                if (selectedText === data.name) {
                    var holderUUID = data.uuid;
                    var found = false;
                    $.each(data.values, function (valueIndex, dataValue) {
                        if (newValue.toLocaleLowerCase() === dataValue.name.toLocaleLowerCase()) {
                            found = true;
                        }
                    });

                    if (!found) {
                        var selectedValueUUID = $('#editedValueItem').text();
                        var selectedValueName = $('#editedValueItemName').text();


                        if (selectedValueName && selectedValueUUID) {
                            var params = {
                                uuid: selectedValueUUID,
                                name: newValue
                            };

                            pHolder.updateValue(selectedValueUUID, params);

                            saveValue(MSG_SUCCESS_VALUE_UPDATE.replace("$value_name", newValue),
                                {item: newValue, itemUUID: selectedValueUUID, itemType: "value", action: "update"});
                            loadValueTable($("#valueDocuments option:selected"), currentPage);
                        } else {
                            var addedValue = {
                                name: newValue,
                                uuid: guid(),
                                holderUUID: holderUUID
                            };

                            //var obj = Object.assign({}, addedValue);
                            data.values.push(addedValue);
                            pHolder.valueMap[addedValue.uuid] = addedValue;
                            saveValue(MSG_SUCCESS_VALUE_ADD.replace("$value_name", newValue),
                                {item: newValue, itemUUID: addedValue.uuid, itemType: "value", action: "create"});
                            loadValueTable($("#valueDocuments option:selected"), currentPage);
                            var variableUUID = $(".menu2").attr('data-uuid');
                            if (variableUUID) {
                                var variable = pModel.getVariable(variableUUID);
                                if (variable)
                                    selectedVariable(variable);
                            }
                        }
                    } else {
                        displayWarningMsg(MSG_SUCCESS_VALUE_SAME.replace("$value_name", newValue));
                    }
                }
            });
        }
        $('#newValueItemRow').hide();
        $('#editedValueItem').empty();
        $('#editedValueItemName').empty();
        $('#btn_save_value_item').val('Kaydet');
    }
}

var itemUUID;
var itemType;

$(document).on("contextmenu", ".category", function (event) {
    itemUUID = null;
    itemType = null;
    event.preventDefault();
    event.stopPropagation();
    $("ul.contextMenu")
        .show()
        .css({top: event.pageY + 12, left: event.pageX + 8, zIndex: 1});
    itemUUID = $(this).attr("data-uuid");
    itemType = "category";
});

$(document).on("contextmenu", ".folder", function (event) {
    event.preventDefault();
    event.stopPropagation();
    itemUUID = null;
    itemType = null;

    $("ul.contextMenu")
        .show()
        .css({top: event.pageY + 12, left: event.pageX + 8, zIndex: 1});
    itemUUID = $(this).attr("data-uuid");
    itemType = "folder";

});

$(document).on("contextmenu", ".formula", function (event) {
    itemUUID = null;
    itemType = null;
    event.preventDefault();
    event.stopPropagation();
    $("ul.contextMenu")
        .show()
        .css({top: event.pageY + 12, left: event.pageX + 8, zIndex: 1});
    itemUUID = $(this).attr("data-uuid");
    itemType = "formula";

});

$(document).on("contextmenu", ".KT_box", function (event) {
    itemUUID = null;
    itemType = null;
    event.preventDefault();
    event.stopPropagation();
    $("ul.contextMenu")
        .show()
        .css({top: event.pageY + 12, left: event.pageX + 8, zIndex: 999});
    itemUUID = $(this).attr("data-uuid");
    itemType = "box";

});

$(document).click(function () {
    var isHovered = $("ul.contextMenu").is(":hover");
    if (isHovered === false) {
        $("ul.contextMenu").fadeOut("fast");
    }
});

$(document).on("click", "#history", function (event) {
    event.preventDefault();
    var limit = $("#historyLimit").val();
    limit = limit && $.isNumeric(limit) ? limit : 10;
    limit = parseInt(limit) > 20 ? 20 : parseInt(limit);
    var logData = {
        "itemType": itemType,
        "itemUUID": itemUUID,
        "limit": limit
    };

    postModelLog(editorURL + dbURL + "log", logData, token).then(function (response) {
        if (response) {
            var msg = "";
            if (response.data && response.data.length > 0) {
                for (var i = 0; i < response.data.length; i++) {
                    var dataItem = response.data[i];
                    var detail = dataItem.detail ? dataItem.detail : "";
                    msg += "Kullanıcı : " + dataItem.username + " " + "Açıklama : " + detail + " Tarih : " + dataItem.createdTime + "</br>";
                }
                displayWarningMsg(msg);
            }

        }
    });

});

function showContent() {
    if (!$('.content_menu').is(':visible')) {
        $('.model_history').hide();
        $('.version_compare').hide();
        $('.transfer_model').hide();
        $('.main_content2 .form > .main2').css({height: 'calc(100% - 31px); '});
        $('.main2').css({height: "calc(100% - 122px)"});
        $('.main_content.urun2').removeClass('open_main7').addClass("open_main");
        $('.main_content.urun2.open_main').show();
        $('.content_menu').show();
        //$('.main3').show();
    }
}


function changeFormulaCollection(data) {
    var email = getEmail();
    return $.ajax({
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', token);
        },
        type: "PUT",
        data: JSON.stringify(data),
        url: editorURL + dbURL + "pricingformula/change/" + email,
        contentType: "application/json",
        timeout: 5000
    });
}

function updateFormulaCollection(data) {
    var email = getEmail();
    $.ajax({
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', token);
        },
        type: "PUT",
        data: JSON.stringify(data),
        dataType: "json",
        url: editorURL + dbURL + "pricingformula/" + email,
        contentType: "application/json",
        timeout: 5000
    });
}

function deleteFormulaCollection(formulaUUID) {
    //var email = getEmail();
    return $.ajax({
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', token);
        },
        type: "DELETE",
        url: editorURL + dbURL + "pricingformula/" + formulaUUID,
        contentType: "application/json",
        timeout: 5000
    });
}

$(document).on('click', '#visualizeResult', function (e) {
    window.open('visualize.html', '_blank');
});

function findInFormula(targetProp, targetValue) {
    var isUsed = false;
    var formulaUUID = null;
    var finalResults = [];
    var dataCategories = {
        categories: pModel.listCategory()
    };
    //'holderUUID'
    findObjects(dataCategories, targetProp, targetValue, finalResults, false);

    if (finalResults && finalResults.length > 0) {
        for (var i = 0; i < finalResults.length; i++) {
            var item = finalResults[i];
            if (item.hasOwnProperty("formulaUUID") && item.formulaUUID) {
                isUsed = true;
                formulaUUID = item.formulaUUID;
                break;
            }
        }
    }

    var found = {isUsed: isUsed, formulaUUID: formulaUUID};
    return found;
}

function categorySort() {
    var $divVariable = $("#categories .category");
    var alphabeticallyOrderedDivVariables = $divVariable.sort(function (a, b) {

        var compA = $(a).find(".CategoryNameContainer").find("span > .btnLabelCategory").val().toLocaleLowerCase().toEnglish();
        var compB = $(b).find(".CategoryNameContainer").find("span > .btnLabelCategory").val().toLocaleLowerCase().toEnglish();
        return (compA < compB) ? -1 : (compA > compB) ? 1 : 0;

    });

    $("#categories").html(alphabeticallyOrderedDivVariables);
}

function folderSort() {
    var $divVariable = $("#folders .folder");
    var alphabeticallyOrderedDivVariables = $divVariable.sort(function (a, b) {

        var compA = $(a).find(".FolderNameContainer").find(".btnLabelFolder").val().toLocaleLowerCase().toEnglish();
        var compB = $(b).find(".FolderNameContainer").find(".btnLabelFolder").val().toLocaleLowerCase().toEnglish();
        return (compA < compB) ? -1 : (compA > compB) ? 1 : 0;

    });
    $("#folders").html(alphabeticallyOrderedDivVariables);

}

function formulaSort() {
    var $divVariable = $("#formula_menu_list .formula");
    var alphabeticallyOrderedDivVariables = $divVariable.sort(function (a, b) {
        var compA = $(a).find(".FormulaNameContainer").find(".btnLabelFormula").text().toLocaleLowerCase().toEnglish();
        var compB = $(b).find(".FormulaNameContainer").find(".btnLabelFormula").text().toLocaleLowerCase().toEnglish();
        return (compA < compB) ? -1 : (compA > compB) ? 1 : 0;
    });

    $("#formula_menu_list").html(alphabeticallyOrderedDivVariables);
}

function variableSort() {
    var $divVariable = $("#variable_list .variable");
    var alphabeticallyOrderedDivVariables = $divVariable.sort(function (a, b) {

        var compA = $(a).find(".VariableNameContainer").find(".btnLabelVariable").text().toLocaleLowerCase().toEnglish();
        var compB = $(b).find(".VariableNameContainer").find(".btnLabelVariable").text().toLocaleLowerCase().toEnglish();
        return (compA < compB) ? -1 : (compA > compB) ? 1 : 0;

    });
    $("#variable_list").html(alphabeticallyOrderedDivVariables);
}

function changeCategoryStatus(categoryObj,categoryName,categoryUUID,activeParam, notAll) {
    $("#context_category_menu_template").append($(".CategoryContextMenuContainer"));
    var child = categoryObj.find(".CategoryNameContainer");
    activeParam ? child.removeClass("categoryDisabled") : child.addClass("categoryDisabled");

    pModel.updateCategory(categoryUUID, {active: activeParam, notAll:notAll});
    categoryId = undefined;

    var msg = MSG_SUCCESS_CATEGORY_DEL.replace("$category_name", categoryName);
    msg = msg.replace("$active", activeParam ? "Aktif" : "Pasif");

    var ajaxSaveModel = saveModel(msg,{item: categoryName, itemUUID: categoryUUID,
        itemType: "category", action: "delete"});
    //categoryObj.remove();

    $.when(ajaxSaveModel).done(function (r1, r2) {
        var data = {
            name: categoryName,
            level: "category",
            active: activeParam,
            changeName: "H"
        };
        changeFormulaCollection(data);
    });
}

function changeFolderStatus(folderObj, folderName, folderUUID, activeParam, notAll) {
    $("#context_folder_menu_template").append($(".FolderContextMenuContainer"));

    //pModel.deleteFolder(folderUUID);
    pModel.updateFolder(folderUUID, {active: activeParam, notAll: notAll});

    var msg = MSG_SUCCESS_FOLDER_DEL.replace("$folder_name", folderName);
    msg = msg.replace("$active", activeParam ? "Aktif" : "Pasif");

    var ajaxSaveModel = saveModel(msg, {item: folderName, itemUUID: folderUUID,
        itemType: "folder", action: "delete"});

    var child = folderObj.find(".FolderNameContainer");
    activeParam ? child.removeClass("folderDisabled") : child.addClass("folderDisabled");
    if (false === notAll) {
        $('#formula_menu_list').each(function () {
            var child = $(this).find(".FormulaNameContainer").find("li > a");
            child.attr("disabled", !activeParam);
        });
    }
    //folderObj.remove();

    $.when(ajaxSaveModel).done(function (r1, r2) {
        var data = {
            name: folderName,
            level: "folder",
            active: activeParam,
            changeName: "H"
        };
        changeFormulaCollection(data);
    });
}

function formulaInUse(listFormulaUUID) {
    if (listFormulaUUID) {
        var url = "http://" + environment + ':8080/reasurans/dispatch?cmd=' +
            'isThereAnyRecordFormulaInUseByFormulUUID&jp={"formulUUID":[' + listFormulaUUID + ']}';
        /*var url ='http://impera.cs.com.tr/reasurans/dispatch?cmd='+
            'isThereAnyRecordFormulaInUseByFormulUUID&jp={"formulUUID":["'+listFormulaUUID+'"]}"';*/
        return $.ajax({
            type: "GET",
            url: url,
            contentType: "application/json",
            timeout: 5000
        });
    } else {
        return JSON.stringify({data:false});
    }

}

function runSQL() {

}
