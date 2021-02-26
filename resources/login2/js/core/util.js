var stringConstructor = "test".constructor;
var arrayConstructor = [].constructor;
var objectConstructor = {}.constructor;

var COLOR_BLOCK_DEFAULT = "#515d8a";
var COLOR_CODE_BLOCK = "#473d8b";
var COLOR_DECISION_TABLE = "#519469";
var COLOR_LOGICAL_DECISION_TABLE = "#efbe52";
var COLOR_SQL_BLOCK = "#dc8eea";

function isDateValid(date) {
    isValid = true;
    if (Object.prototype.toString.call(date) === "[object Date]") {
        // it is a date
        if (isNaN(date.getTime())) { // d.valueOf() could also work
            isValid = false;
        } else {
            // date is valid
        }
    } else {
        isValid = false;
    }

    return isValid;
}

function getCurrentDate() {
    var currentDate = new Date();
    var dd = currentDate.getDate();
    var mm = currentDate.getMonth() + 1; //January is 0!
    var yyyy = currentDate.getFullYear();

    if (dd < 10) {
        dd = '0' + dd;
    }

    if (mm < 10) {
        mm = '0' + mm;
    }

    currentDate = dd + '/' + mm + '/' + yyyy;
    return currentDate;
}

function getSqlColumns(sqlText) {
    var text = sqlText;
    var aliasColumns = [];
    var columns = [];
    var regExString = new RegExp("(?:select)(.*?)(?:from)", "ig");
    var testRE = regExString.exec(text);
    if (testRE && testRE.length > 1) {
        //console.log(testRE[1]); //return second result.
        text = testRE[1];
        var arrayText = text.split(",");
        for (var i = 0; i < arrayText.length; i++) {
            var splitArray = arrayText[i].split(" ");

            for (var j = 0; j < splitArray.length; j++) {
                var index = -1;
                if (splitArray[j] === 'as') {
                    index = j;
                    aliasColumns.push(splitArray[index + 1]);
                } else {
                    if (splitArray[j].length > 1)
                        columns.push(splitArray[j]);
                }
            }
        }
    }

    if (aliasColumns.length > 0)
        return aliasColumns;

    return columns;
}

function checkType(object) {
    if (!object) {
        return 0;
    } else if (object.constructor === stringConstructor) {
        return 0;
    } else if (object.constructor === arrayConstructor) {
        return "Array";
    } else if (object.constructor === objectConstructor) {
        return "Object";
    } else {
        return 0;
    }
}


function returnWord(text, caretPos) {
    var index = text.indexOf(caretPos);
    var preText = text.substring(0, caretPos);
    if (preText.indexOf(" ") > 0) {
        var words = preText.split(" ");
        return words[words.length - 1]; //return last word
    }
    else {
        return preText;
    }
}

function getCaretPosition(ctrl) {
    var CaretPos = 0;   // IE Support
    if (document.selection) {
        ctrl.focus();
        var Sel = document.selection.createRange();
        Sel.moveStart('character', -ctrl.value.length);
        CaretPos = Sel.text.length;
    }
    // Firefox support
    else if (ctrl.selectionStart || ctrl.selectionStart === '0')
        CaretPos = ctrl.selectionStart;
    return (CaretPos);
}

function getPaginateClassElement(clsElement) {
    var currentTable = $(clsElement).clone();
    $(clsElement).find("tbody tr").each(function (index) {
        if (index !== 0) {
            var row = $(this);
            if (row.is(':hidden')) {
                var checkValue = row.find(".poolVariableName").text();
                currentTable.find("tbody tr").each(function (index) {
                    var currentRow = $(this);
                    var currentValue = currentRow.find(".poolVariableName").text();
                    if (checkValue === currentValue) {
                        currentRow.remove();
                    }
                });
            }
        }
    });

    return currentTable.find(clsElement);

}

function getCurrentPage(element) {
    var currentPage = 1;
    try {
        currentPage = $(element) && $(element).length > 0 ?
            $(element).pagination('getCurrentPage') : 1;
    } catch (e) {
        currentPage = 1;
    }

    return currentPage;
}

function paginate(clsElement, element, search, currentPage) {
    var pageParts = search === true ? getPaginateClassElement(clsElement) : $(clsElement);
    var numPages = pageParts.length;
    var perPage = 5;

    pageParts.slice(perPage).hide();

    $(element).pagination({
        items: numPages,
        itemsOnPage: perPage,
        cssStyle: "light-theme",
        prevText: "Önceki",
        nextText: "Sonraki",
        currentPage: currentPage,
        onPageClick: function (pageNum) {
            var start = perPage * (pageNum - 1);
            var end = start + perPage;
            pageParts.hide().slice(start, end).show();
        }
    });

    if ($(element) && $(element).length > 0 && currentPage)
        $(element).pagination('selectPage', currentPage);


}

function getMax(arr, prop) {
    var max;
    for (var i = 0; i < arr.length; i++) {
        if (!max || parseInt(arr[i][prop]) > parseInt(max[prop]))
            max = arr[i];
    }
    return max;
}

function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
}

function getExtension(filename) {
    var parts = filename.split('.');
    return parts[parts.length - 1];
}

function isExcel(filename) {
    var ext = getExtension(filename);
    switch (ext.toLowerCase()) {
        case 'xlsx':
            return true;
    }
    return false;
}

function fileExists(url, callback) {
    fetch(url, {
        method: "head",
        mode: "no-cors"
    }).then(function (response) {
        if (response.ok) {
            callback(true);
        } else {
            callback(false);
        }
    }).catch(function (error) {
        callback(false);
    });
}

function sort(items, text) {
    return items.sort(function(a, b) {
        if (a[text]) {
            return a[text].localeCompare(b[text]);
        }
    });
}

function sortByValue(obj1, obj2, text) {
    var found = false;
    var lastItems = [];
    var prevItems = [];

    for (var i=0; i<obj1.length; i++) {
        var item1 = obj1[i][text];
        //console.log(item1);
        if (item1) {
            for (var j=0; j<obj2.length; j++) {
                var item2 = obj2[j][text];
                //console.log(item2);
                if (item1 === item2) {
                    prevItems.push(obj1[i]);
                    found = true;
                    break;
                } else { found = false; }
            }
            if (!found) lastItems.push(obj1[i]);
        }
    }

    //console.log(prevItems);
    prevItems = sort(prevItems, 'adı');
    //console.log(lastItems);
    lastItems = sort(lastItems, 'adı');
    var result = prevItems.concat(lastItems);
    return result;

}


function Confirm(title, msg, $true, $false, showButtons, action) {
    $('.confirm').remove();
    var popupSettings = '<div class="pop_up_1 confirm">' +
        '<div class="test_main" style="width: inherit;">' +
        '<div class="test_header">' +
        '<span class="test_header_title">test_header</span>' +
        '<input class="test_close" type="button" value="x"></div>' +
        '<div class="test_header_form" id="testvariables_panel">' +
        '<div class="panel" style="width: 90%;"></div>' +
        '<div class="clear"></div><div class="clear">' +
        '</div></div></div></div>';

    var iconError = '<i class="fa fa-question-circle fa-3x" style="color:#F60;" aria-hidden="true"></i>';
    var iconInfo = '<i class="fa fa-info-circle fa-3x" style="color:#F60;" aria-hidden="true"></i>';
    var icon = showButtons === true ? iconError : iconInfo;
    var content =
        '<div class="confirmMessages">' +
        '<span>' +
        icon +
        '</span>' +
        '<p class="confirmMessageContent" style="width:85%;">' + msg + '</p></div>';
    var buttons =
        '<div class="confirmButtons">' +
        '<div><input type="button" class="doAction" value="' + $true + '"/></div>' +
        '<div><input type="button" class="cancelAction" value="' + $false + '"/></div>' +
        '</div>';
    content += showButtons === true ? buttons : "";

    $('.shadow').append(popupSettings);
    if (showButtons === true) {
        $('.pop_up_1.confirm').css({"width": "480px", "height": "180px"});
    } else {
        $('.pop_up_1.confirm').css({"width": "480px", "height": "240px"});
    }
    $('.pop_up_1.confirm').find('.panel').append(content);


    $(".test_header_title").text(title);
    $(".shadow").addClass("open_test");
    $(".pop_up_1.confirm").addClass("open_test");

    $('body').off('click', '.doAction');
    $('body').on('click', '.doAction', function () {
        action();
        $(".test_close").click();
    });

    $('.cancelAction').click(function () {
        $(".test_close").click();
    });
}

function ConfirmPopup(title, msg, $true, $false, action) {

    var choosePopup = $(".pop_up_1.settings");
    if (!choosePopup.is(":visible"))
        choosePopup = $(".pop_up_1.confirm");
    if (!choosePopup.is(":visible")) {
        var container = $(".TestContextMenuContainer");
        $("#context_test_menu_template").append(container);
        $(".TestContextMenuContainer").toggleClass("slide_left");
        $("#testvariables_panel").show();
        choosePopup = $(".pop_up_1.open_test");
    }

    $('.table-popup').remove();
    var popupDiv = '<div class="table-popup">' +
        '<div class="pop_content panel">' +
        '<div class="pop_header">' +
        '<span class="pop_title">test pop up</span>' +
        '<button class="test_close1">x</button>' +
        '</div>' +
        '</div></div>';

    //'<div><p>' + msg + '</p></div>'

    var iconError = '<i class="fa fa-question-circle fa-3x" style="color:#F60;" aria-hidden="true"></i>';
    var messageDiv =
        '<div class="confirmMessages">' +
        '<span>' +
        iconError +
        '</span>' +
        '<p class="confirmMessageContent" style="width:85%;">' + msg + '</p></div>';
    var content =  messageDiv +
        '<div><input type="button" class="popDoAction" value="' + $true + '"/></div>' +
        '<div><input type="button" class="popCancelAction" value="' + $false + '"/></div>';

    choosePopup.find('.test_header_form').append(popupDiv);

    $('.pop_content').append(content);
    $(".pop_title").text(title);

    $(".table-popup").show();

    $('body').off('click', '.popDoAction');
    $('body').on('click', '.popDoAction', function () {
        action();
        $(".table-popup").hide();
    });

    $('.popCancelAction').click(function () {
        $(".table-popup").hide();

    });

    $('.test_close1').click(function () {
        $(".table-popup").hide();
    });
}

function getVariableType(type) {
    var text = '';
    if (type) {
        switch (type) {
            case "Select":
                text = "Seçim";
                break;
            case "Integer":
                text = "Sayı";
                break;
            case "String":
                text = "Metin";
                break;
            case "Date":
                text = "Tarih";
                break;
            default:
                text = "";
        }
    }

    return text;
}

function findObjectsWithLike(obj, targetProp, targetValue, finalResults, caseSensitive) {

    function getObject(theObject) {
        //var result = null;
        if (theObject instanceof Array) {
            for (var i = 0; i < theObject.length; i++) {
                getObject(theObject[i]);
            }
        } else {
            for (var prop in theObject) {
                if (theObject.hasOwnProperty(prop)) {
                    //console.log(prop + ': ' + theObject[prop]);
                    if (prop === targetProp) {
                        //console.log('--found id');
                        var objectValue = theObject[prop];


                        if (caseSensitive === true) {
                            if (objectValue.toLocaleLowerCase().indexOf(targetValue) !== -1) {
                                finalResults.push(theObject);
                            }
                        } else {
                            if (objectValue.indexOf(targetValue) !== -1) {
                                //console.log('----found porop', prop, ', ', theObject[prop]);
                                finalResults.push(theObject);
                            }
                        }


                    }
                    if (theObject[prop] instanceof Object || theObject[prop] instanceof Array) {
                        getObject(theObject[prop]);
                    }
                }
            }
        }
    }

    getObject(obj);

}

function findObjects(obj, targetProp, targetValue, finalResults, caseSensitive) {

    function getObject(theObject) {
        //var result = null;
        if (theObject instanceof Array) {
            for (var i = 0; i < theObject.length; i++) {
                getObject(theObject[i]);
            }
        } else {
            for (var prop in theObject) {
                if (theObject.hasOwnProperty(prop)) {
                    //console.log(prop + ': ' + theObject[prop]);
                    if (prop === targetProp) {
                        //console.log('--found id');
                        if (caseSensitive === true) {
                            if (toType(theObject[prop]) === "string" && theObject[prop].toLocaleLowerCase() === targetValue.toLocaleLowerCase()) {
                                finalResults.push(theObject);
                            }
                        } else {
                            if (theObject[prop] === targetValue) {
                                finalResults.push(theObject);
                            }
                        }
                    }
                    if (theObject[prop] instanceof Object || theObject[prop] instanceof Array) {
                        getObject(theObject[prop]);
                    }
                }
            }
        }
    }

    getObject(obj);

}

function find(where, searchKey, check, caseSensitive) {
    var isUsed = false;
    var finalResults = [];
    var modelData = {
        categories: pModel.listCategory()
    };

    findObjects(modelData, where, searchKey, finalResults, caseSensitive);
    if (finalResults && finalResults.length > 0) {
        for (var i = 0; i < finalResults.length; i++) {
            var item = finalResults[i];
            switch (check) {
                case 'formulaUUID':
                    if (item.hasOwnProperty("formulaUUID") && item.formulaUUID) {
                        isUsed = true;
                    }
                    break;
                case 'folderUUID':
                    if (item.hasOwnProperty("folderUUID") && item.folderUUID) {
                        isUsed = true;
                    }
                    break;
                case 'category':
                    if (item.hasOwnProperty("folders") && item.hasOwnProperty("versions")) {
                        isUsed = true;
                    }
                    break;
                case 'categoryUUID':
                    if (item.hasOwnProperty("categoryUUID") && item.categoryUUID) {
                        isUsed = true;
                    }
                    break;
                default :
                    isUsed = true;
            }

            if (isUsed)
                break;
        }
    }

    return isUsed;
}

Object.size = function (obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

function predicateBy(prop) {
    return function (a, b) {
        if (typeof a[prop] === 'string' &&
            typeof b[prop] === 'string') {
            if (a[prop].toLocaleLowerCase() > b[prop].toLocaleLowerCase()) {
                return 1;
            } else if (a[prop].toLocaleLowerCase() < b[prop].toLocaleLowerCase()) {
                return -1;
            }
            return 0;
        } else {
            if (a[prop] > b[prop]) {
                return 1;
            } else if (a[prop] < b[prop]) {
                return -1;
            }
            return 0;
        }
    }
}

function shortString() {
    var shorts = document.querySelectorAll('.shortOption');
    if (shorts) {
        Array.prototype.forEach.call(shorts, function(ele) {
            var str = ele.innerText,
                indt = '...';

            if (ele.hasAttribute('data-limit')) {
                if (str.length > ele.dataset.limit) {
                    var result = str.substring(0, ele.dataset.limit - indt.length).trim() + indt;
                    ele.innerText = result;
                    str = null;
                    result = null;
                }
            } else {
                throw Error('Cannot find attribute \'data-limit\'');
            }
        });
    }
}


function array_move(arr, old_index, new_index) {
    if (new_index >= arr.length) {
        var k = new_index - arr.length + 1;
        while (k--) {
            arr.push(undefined);
        }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr;
}

function toType(obj) {
    return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}

String.prototype.toEnglish = function () {
    var str = this;
    str = str.replace("ü", "u");
    str = str.replace("ı", "i");
    str = str.replace("ö", "o");
    str = str.replace("ü", "u");
    str = str.replace("ş", "s");
    str = str.replace("ğ", "g");
    str = str.replace("ç", "c");
    str = str.replace("Ü", "U");
    str = str.replace("İ", "I");
    str = str.replace("Ö", "O");
    str = str.replace("Ü", "U");
    str = str.replace("Ş", "S");
    str = str.replace("Ğ", "G");
    str = str.replace("Ç", "C");
    return str;
};