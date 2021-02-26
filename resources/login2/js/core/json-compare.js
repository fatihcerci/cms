var jsonObj = {};
var firstFormulaObj = {};
var secondFormulaObj = {};
var f1, f2;
var jsonViewer = new JSONViewer();
var firstJsonViewer = new JSONViewer();
var secondJsonViewer = new JSONViewer();


var deepDiffMapper = function () {
    return {
        VALUE_CREATED: 'oluşturuldu',
        VALUE_UPDATED: 'güncellendi',
        VALUE_DELETED: 'silindi',
        VALUE_UNCHANGED: 'değişmedi',

        map: function (obj1, obj2) {

            if (this.isFunction(obj1) || this.isFunction(obj2)) {
                throw 'Invalid argument. Function given, object expected.';
            }


            if (this.isValue(obj1) || this.isValue(obj2)) {
                return {
                    tipi: this.compareValues(obj1, obj2),
                    veri: (obj2 === undefined) ? obj1 : obj2
                };
            }

            if (this.isArray(obj1)) obj1 = sort(obj1, 'uuid');
            if (this.isArray(obj2)) obj2 = sort(obj2, 'uuid');

            var diff = {};

            for (var key in obj1) {

                if (this.isFunction(obj1[key])) {
                    continue;
                }

                var value2 = undefined;
                if ('undefined' != typeof(obj2[key])) {
                    value2 = obj2[key];
                }

                diff[key] = this.map(obj1[key], value2);


            }

            for (var key in obj2) {

                if (this.isFunction(obj2[key]) || ('undefined' != typeof(diff[key]))) {
                    continue;
                }

                diff[key] = this.map(undefined, obj2[key]);

            }

            return diff;

        },

        compareValues: function (value1, value2) {
            if (value1 === value2) {
                return this.VALUE_UNCHANGED;
            }
            if (this.isDate(value1) && this.isDate(value2) && value1.getTime() === value2.getTime()) {
                return this.VALUE_UNCHANGED;
            }
            if ('undefined' == typeof(value1)) {
                return this.VALUE_CREATED;
            }
            if ('undefined' == typeof(value2)) {
                return this.VALUE_DELETED;
            }

            return this.VALUE_UPDATED;
        },
        isFunction: function (obj) {
            return {}.toString.apply(obj) === '[object Function]';
        },
        isArray: function (obj) {
            return {}.toString.apply(obj) === '[object Array]';
        },
        isObject: function (obj) {
            return {}.toString.apply(obj) === '[object Object]';
        },
        isDate: function (obj) {
            return {}.toString.apply(obj) === '[object Date]';
        },
        isString: function (obj) {
            return {}.toString.apply(obj) === '[object String]';
        },
        isValue: function (obj) {
            return !this.isObject(obj) && !this.isArray(obj);
        }
    }
}();


var setJSON = function () {
    try {
        //var value = textarea.value;
        var f1_new = JSON.stringify(f1, ['name', 'variables', 'name', 'type', 'layers', 'name', 'boxes', 'name', 'type', 'codeblock_text', 'inputs', 'name', 'outputs', 'name']);
        var f2_new = JSON.stringify(f2, ['name', 'variables', 'name', 'type', 'layers', 'name', 'boxes', 'name', 'type', 'codeblock_text', 'inputs', 'name', 'outputs', 'name']);
        //var result = deepDiffMapper.map(JSON.parse(f1_new), JSON.parse(f2_new));
        //var result = deepDiffMapper.map(f1, f2);
        //var s = JSON.stringify(result);

        //var newJson = JSON.parse(replaceJSONFields(s));
        var firstJson = JSON.parse(replaceJSONFields(f1_new));
        var secondJson = JSON.parse(replaceJSONFields(f2_new));

        var diff = objectDiff.diff(firstJson, secondJson);
        var newJsonHtml = objectDiff.convertToXMLString(diff);
        $(".resultDiff").html('');
        $(".resultDiff").append(newJsonHtml);
        //jsonObj = newJson;
        firstFormulaObj = firstJson;
        secondFormulaObj = secondJson;
        jsonObj = JSON.parse(replaceJSONFields(JSON.stringify(diff)));;

        //textarea.value = JSON.stringify(result);
    } catch (err) {
        alert(err);
    }
};

var replaceJSONFields = function (s) {
    var t = s.replace(/"variables"/g, '"değişkenler"');
    t = t.replace(/"name"/g, '"adı"');
    t = t.replace(/"type"/g, '"tipi"');
    t = t.replace(/"layers"/g, '"katmanlar"');
    t = t.replace(/"boxes"/g, '"kutular"');
    t = t.replace(/"inputs"/g, '"girdiler"');
    t = t.replace(/"outputs"/g, '"çıktılar"');
    t = t.replace(/"CodeBlock"/g, '"Kod Bloğu"');
    t = t.replace(/"SQLBlock"/g, '"SQL Bloğu"');
    t = t.replace(/"DecisionTable"/g, '"Karar Tablosu"');
    t = t.replace(/"LogicalDecisionTable"/g, '"Mantıksal Karar Tablosu"');
    t = t.replace(/"codeblock_text"/g, '"kod bloğu"');

    t = t.replace(/"output"/g, '"çıktı"');
    t = t.replace(/"input"/g, '"girdi"');
    t = t.replace(/"ResultBox"/g, '"Sonuç Kutusu"');
    t = t.replace(/"ResultLayer"/g, '"Sonuç Katmanı"');

    t = t.replace(/"changed"/g, '"Durum"');
    t = t.replace(/"object change"/g, '"Nesne Değişti "');
    t = t.replace(/"primitive change"/g, '"Alan Değişti"');
    t = t.replace(/"equal"/g, '"Eşit"');
    t = t.replace(/"removed"/g, '"Silindi"');
    t = t.replace(/"added"/g, '"Eklendi"');
    t = t.replace(/"value"/g, '"Değer"');
    return t;
};

//var loadJsonBtn = document.querySelector("button.load-json");
$(document).on("click", "#toggleVersionLevels", function (event) {
    event.preventDefault();
    jsonViewer.showJSON(jsonObj, null, 1);
    firstJsonViewer.showJSON(firstFormulaObj, null, 1);
    secondJsonViewer.showJSON(secondFormulaObj, null, 1);
});

$(document).on("click", "#openVersionLevels", function (event) {
    event.preventDefault();
    jsonViewer.showJSON(jsonObj);
    firstJsonViewer.showJSON(firstFormulaObj);
    secondJsonViewer.showJSON(secondFormulaObj);
});

$(document).on("click", "#changeVersionView", function (event) {
    event.preventDefault();
    if ($('#json').is(':visible')) {
        $('#json').hide();
        $('#resultXmlDiff').show();
    } else {
        $('#resultXmlDiff').hide();
        $('#json').show();

    }
});

//var maxlvlBtn = document.querySelector("button.maxlvl");

/*loadJsonBtn.addEventListener("click", function() {
    setJSON();
    jsonViewer.showJSON(jsonObj);
    firstJsonViewer.showJSON(firstFormulaObj);
    secondJsonViewer.showJSON(secondFormulaObj);
    //firstJsonViewer.showJSON(firstFormulaObj, null, 1);
    //secondJsonViewer.showJSON(secondFormulaObj, null, 1);
});
*/


$(document).on("contextmenu", ".list-link", function (event) {
    event.preventDefault();
    event.stopPropagation();
    var innerText = $(this).text();
    var lastIndex = innerText.indexOf(":");
    var res = innerText.substring(0, lastIndex);
    console.log(res);
    $('.compareDiv').find('.highlight').removeClass('highlight');
    $('.compareDiv').highlightText(res, 'highlight');

});

$(document).on("contextmenu", ".type-string", function (event) {
    event.preventDefault();
    event.stopPropagation();
    var innerText = $(this).text();
    //innerText = innerText.replace(/['"]+/g, '')
    var lastIndex = innerText.indexOf(":");
    var res = null;
    if (lastIndex !== -1)
        res = innerText.substring(0, lastIndex);
    $('.compareDiv').find('.highlight').removeClass('highlight');
    $('.compareDiv').highlightText(res ? res : innerText, 'highlight');

});

$(document).on("click", "#compareVersion", function (event) {
    event.preventDefault();
    var checkedBoxes  =$('.compareChk:checked');
    var numberOfChecked = checkedBoxes.length;
    if (numberOfChecked !== 2) {
        displayWarningMsg("Lütfen Sadece 2 Versiyon Seçimi Yapınız.");
    } else {
        f1 = null;
        f2 = null;
        /*var baseVersion = false;
        var versions = [];
        var foundF1 = false;*/
        $.each(checkedBoxes, function (index, element) {
            var dataUUID = $(element).closest(".formulahead").attr("data-uuid");
            var formula;
            var formulaHead = pModel.getFormulaHead(dataUUID);
            if (formulaHead) {
                //baseVersion = false;
                formula = pModel.getFormula(formulaHead.formulaUUID);
                /*if (versions.length === 0) {
                    versions.push(formulaHead.linkedFormulaUUID);
                } else {
                    foundF1 = versions[0] === formula.uuid;
                }*/
            } else {
                //baseVersion = true;
                formula = pModel.getFormula(dataUUID);
            }

            /*if (baseVersion || foundF1) {
                f1 = formula;
            } else {
                f2 = formula;
            }*/

            if (f1) {
                f2 = formula;
            } else {
                f1 = formula;
            }
        });


        $('.content_menu').hide();
        $('.main3').hide();
        $('.main_content2').find('.form').find('.main2').css({'height':'0px'});
        $('.main2').css({'height':'0px'});

        $('.version_compare').show();
        changeView('vertical');
        $('.main_content.urun2').removeClass('open_main').addClass("open_main7");

        $('#verticalLayout').click();


    }

});

function changeView(view) {
    var html = '';
    $('.versionView').html('');
    switch (view) {
        case 'vertical':
            html += '<div class="columns versionVerticalJsonView">' +
                '<div class="column compareDiv" id="firstFormula">' +
                '<p style="font-weight: bolder;">Versiyon 1</p>' +
                '</div>' +
                '<div class="column compareDiv" id="secondFormula">' +
                '<p style="font-weight: bolder;">Versiyon 2</p>' +
                '</div>' +
                '<div class="column compareDiv" id="resultXmlDiff" style="display: none;">' +
                '<p style="font-weight: bolder;">Karşılaştırma Sonucu</p>' +
                '<pre class="json-viewer resultDiff"></pre>' +
                '</div>' +
                '<div class="column compareDiv" id="json">' +
                '<p style="font-weight: bolder;">Karşılaştırma Sonucu</p>' +
                '</div>' +
                '</div>';
            $('.versionView').append(html);

            break;
        case 'horizontal':
            html += '<div class="columns versionHorizontalJsonView">' +
                '<div class="columns bottomTopCompareDiv" id="json">' +
                '<p style="font-weight: bolder;">Karşılaştırma Sonucu</p>' +
                '</div>' +
                '<div class="columns bottomTopCompareDiv" id="resultXmlDiff" style="display: none;" >' +
                '<p style="font-weight: bolder;">Karşılaştırma Sonucu</p>' +
                '<pre class="json-viewer resultDiff"></pre>' +
                '</div>'+
                '</div>' +
                '<div class="columns">' +
                '<div class="column bottomCompareDiv" id="firstFormula">' +
                '<p style="font-weight: bolder;">Versiyon 1</p>' +
                '</div>' +
                '<div class="column bottomCompareDiv" id="secondFormula">' +
                '<p style="font-weight: bolder;">Versiyon 2</p>' +
                '</div>' +
                '</div>';
            $('.versionView').append(html);

            break;
    }
}

$(document).on('click', '#verticalLayout', function (e) {
    e.preventDefault();
    if($('#verticalLayout').hasClass("vertical")) {
        $('#verticalLayout').removeClass("vertical").addClass("verticalBorder");
    } else {
        if ($('#horizontalLayout').hasClass("horizontalBorder"))
            $('#verticalLayout').removeClass("verticalBorder").addClass("vertical");
    }
    if($('#horizontalLayout').hasClass("horizontalBorder")) {
        $('#horizontalLayout').removeClass("horizontalBorder").addClass("horizontal");
    }

    changeView('vertical');
    document.querySelector("#json").appendChild(jsonViewer.getContainer());
    document.querySelector("#firstFormula").appendChild(firstJsonViewer.getContainer());
    document.querySelector("#secondFormula").appendChild(secondJsonViewer.getContainer());
    setJSON();
    jsonViewer.showJSON(jsonObj);
    firstJsonViewer.showJSON(firstFormulaObj);
    secondJsonViewer.showJSON(secondFormulaObj);
});

$(document).on('click', '#horizontalLayout', function (e) {
    e.preventDefault();
    if($('#horizontalLayout').hasClass("horizontal")) {
        $('#horizontalLayout').removeClass("horizontal").addClass("horizontalBorder");
    } else {
        if($('#verticalLayout').hasClass("verticalBorder"))
            $('#horizontalLayout').removeClass("horizontalBorder").addClass("horizontal");
    }
    if($('#verticalLayout').hasClass("verticalBorder")) {
        $('#verticalLayout').removeClass("verticalBorder").addClass("vertical");
    }

    changeView('horizontal');
    document.querySelector("#json").appendChild(jsonViewer.getContainer());
    document.querySelector("#firstFormula").appendChild(firstJsonViewer.getContainer());
    document.querySelector("#secondFormula").appendChild(secondJsonViewer.getContainer());
    setJSON();
    jsonViewer.showJSON(jsonObj);
    firstJsonViewer.showJSON(firstFormulaObj);
    secondJsonViewer.showJSON(secondFormulaObj);
});



(function ($) {

    $.fn.highlightText = function (text, className) {
        function highlight(node) {
            if (node.nodeType == 3) {
                var val = node.nodeValue;
                var valTemp = node.nodeValue;
                var textTemp = text;
                var addChar = 0;
                if (val.indexOf('"') > -1) {
                    addChar = 2;
                    val = val.replace(/['"]+/g, '');
                    text = text.replace(/['"]+/g, '');
                }
                val = val.toLocaleLowerCase();
                text = text.toLocaleLowerCase();
                var pos = val.indexOf(text);
                if (pos >= 0 && !$(node.parentNode).hasClass(className)) {
                    var span = document.createElement("span");
                    span.className = className;
                    span.appendChild(document.createTextNode(valTemp.substr(pos, text.length + addChar)));
                    node.parentNode.insertBefore(span, node.parentNode.insertBefore(
                        document.createTextNode(valTemp.substr(pos + text.length + addChar)),
                        node.nextSibling));
                    node.nodeValue = valTemp.substr(0, pos);
                }
            } else if (!$(node).is("button, select, textarea")) {
                $.each(node.childNodes, function () {
                    highlight(this);
                });
            }
        }

        return this.each(function () {
            highlight(this);
        });
    };

})(jQuery);