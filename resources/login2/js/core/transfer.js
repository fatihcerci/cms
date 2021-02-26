var categories = {};

function initTransferCombos(which) {
    var defaultOption = '<option value="-1">---</option>';
    switch (which) {
        case "all" :
            $('#fromCategory').find('option').remove();
            $('#fromFolder').find('option').remove();
            $('#fromFormula').find('option').remove();
            $('#fromCategory').append(defaultOption);
            $('#fromFolder').append(defaultOption);
            $('#fromFormula').append(defaultOption);
            break;
        case "folderFormula":
            $('#fromFolder').find('option').remove();
            $('#fromFormula').find('option').remove();
            $('#fromFolder').append(defaultOption);
            $('#fromFormula').append(defaultOption);
            break;
        case "formula":
            $('#fromFormula').find('option').remove();
            $('#fromFormula').append(defaultOption);
            break;
    }
}

function loadCategory() {
    initTransferCombos('all');

    var htmlCategory = '';
    if (categories) {
        categories = sort(categories, "name");
        for (var i = 0; i < categories.length; i++) {
            var category = categories[i];
            htmlCategory += '<option value="' + category.uuid + '">' + category.name + '</option>';
        }
        $('#fromCategory').append(htmlCategory);
        //if (htmlFormula) $('#fromFormula').append(htmlFormula);
    }
}

function loadFolder(categoryUUID) {
    if (categoryUUID) {
        var htmlFolder = '';
        for(var i=0; i < categories.length; i++) {
            var category = categories[i];
            if (categoryUUID === category.uuid) {
                var folders = category.folders;
                folders = sort(folders, "name");
                if (folders) {
                    for (var j = 0; j < folders.length; j++) {
                        var folder = folders[j];
                        htmlFolder += '<option value="' + folder.uuid + '">' + folder.name + '</option>';
                    }
                    $('#fromFolder').append(htmlFolder);
                }
            }
        }
    }
}

function loadFormula(categoryUUID, folderUUID) {
    if (categoryUUID && folderUUID) {
        var htmlFormula = '';
        for(var i=0; i < categories.length; i++) {
            var category = categories[i];
            if (categoryUUID === category.uuid) {
                var folders = category.folders;
                if (folders) {
                    for (var j = 0; j < folders.length; j++) {
                        var folder = folders[j];
                        if (folderUUID === folder.uuid) {
                            var formulas = folder.formulas;
                            formulas = sort(formulas, "name");
                            if (formulas) {
                                for (var k = 0; k < formulas.length; k++) {
                                    var formula = formulas[k];
                                    htmlFormula += '<option value="' + formula.uuid + '">' + formula.name + '</option>';
                                }
                                $('#fromFormula').append(htmlFormula);
                            }
                        }
                    }
                }
            }
        }
    }
}

function transferModel(data) {
    var url = editorURL + dbURL + "transfer";
    var token = sessionStorage.getItem("token");
    $.ajax({
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', token);
        },
        type: "POST",
        url: url,
        data: data,
        dataType: "json",
        contentType: "application/json",
        timeout: 5000
    }).done(function (response) {
        console.log(response);
        if (response) {
            displayWarningMsg(response.msg);
        } else {
            displayWarningMsg("Model Aktarımı Başarısız Oldu.");
        }
    }).fail(function (xhr, exception) {
        gotException(xhr, exception);
    });
}

$(document).on('change', '#fromCategory', function (e) {
   e.preventDefault();
   var categoryUUID = $('#fromCategory option:selected').val();
   initTransferCombos('folderFormula');
   loadFolder(categoryUUID);

});

$(document).on('change', '#fromFolder', function (e) {
    e.preventDefault();
    var categoryUUID = $('#fromCategory option:selected').val();
    var folderUUID = $('#fromFolder option:selected').val();
    initTransferCombos('formula');
    loadFormula(categoryUUID, folderUUID);

});

$(document).on('click', '#clearTransferInputs', function (e) {
    e.preventDefault();
    loadCategory();
    $('#transferUrl').val('');

});

$(document).on('click', '#transferSelectedModel', function (e) {
    e.preventDefault();
    var categoryUUID = $('#fromCategory option:selected').val();
    var folderUUID = $('#fromFolder option:selected').val();
    var formulaUUID = $('#fromFormula option:selected').val();
    var transferUrl = $('#transferUrl').val();

    if (!transferUrl) {
        displayWarningMsg("Lütfen Bağlantı Yolunu Boş Bırakmayınız.");
    } else {
        if (categoryUUID === '-1' || folderUUID === '-1' || formulaUUID === '-1') {
            displayWarningMsg("Lütfen Formül Seçimi Yapınız.");
        } else {
            var formulaHead = pModel.getFormulaHeadWithFormulaUUID(formulaUUID);
            if (!formulaHead) {
                displayWarningMsg("Lütfen Formül Versiyonu Seçimi Yapınız.");
            } else {
                var version = pModel.getVersionWithFormulaUUID(formulaHead.baseFormulaUUID);
                if (!version) {
                    displayWarningMsg("Versiyon Bilgisi Bulunamadı.");
                } else {
                    var formula = pModel.getFormula(formulaUUID);
                    var data = {
                        connectionUrl: transferUrl,
                        categoryUUID: categoryUUID,
                        folderUUID: folderUUID,
                        formulaUUID: formulaUUID,
                        formula: formula,
                        version: version,
                        formulaHead: formulaHead
                    };

                    transferModel(JSON.stringify(data));
                }
            }
        }
    }
});

$(document).on('click', '.iconTransfer', function (e) {
    e.preventDefault();
    categories = pModel.listCategory();
    $('.content_menu').hide();
    $('.main3').hide();
    $('.menu2').hide();
    $('.main_content2').find('.form').find('.main2').css({'height': '0px'});
    $('.main2').css({'height': '0px'});
    $('.tag_category_name').text('');
    $('.tag_category_name').hide();
    $('.version_compare').hide();
    $('.transfer_model').show();
    var menuTitle = '<div class="menu_title"></div> <span class="m_c_btn m_c_btn_close "></span><span>MODEL AKTARIM</span>';
    $("#middleFrameLabel").html(menuTitle);
    $('.main_content.urun2').removeClass('open_main').addClass("open_main7");
    loadCategory();
});