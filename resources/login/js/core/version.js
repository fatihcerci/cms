impera = {
    version: "v.0.0.4"
};

var versionDataMap = {};

$(document).on('click','#imperaVersion',function(){
    if (!versionDataMap || Object.size(versionDataMap) <= 0) {
        versionCall();
    } else {
        showPopup(versionDataMap);
    }
});

$(document).on('change','#selectVersionInfo',function(){
    $('.versionList').remove();
    if (versionDataMap && Object.size(versionDataMap) > 0) {
        var versionUUID = $(this).val();
        if (versionUUID) {
            var versionData = versionDataMap[versionUUID];
            var versionInfo = '<ul class="versionList" style="margin-top:5px; width:100%;">';
            $.each(versionData.info, function (index, item) {
                if (item.message)
                    versionInfo += '<li style="font-size:11px;padding-bottom:3px;">'+item.message+'</li>';
            });
            versionInfo += '</ul>';

            $('.confirmMessageContent').append(versionInfo);
        }
    }
});


function versionCall() {
    $.ajax({
        type: "GET",
        url: pListAllDBURL + "version",
        dataType: "json",
        contentType: "application/json",
        timeout: 5000
    }).done(function (response) {
        showPopup(response.data);
    }).fail(function (xhr, exception) {
        gotException(xhr, exception);
    });
}

function showPopup(data) {
    var versionCombo = '<select id="selectVersionInfo">';
    $.each(data, function(versionIndex, versionData){
        versionDataMap[versionData.uuid] = versionData;

        var versionComboOption = '<option value="'+versionData.uuid+'">'+versionData.version+'</option>';
        versionCombo += versionComboOption;
    });
    versionCombo += '</select>';
    Confirm('Versiyon Bilgilendirme', versionCombo, 'Evet', 'Hayır', false, function () {});
    $('#selectVersionInfo').change();
}