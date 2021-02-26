var previous = null;
var current = null;
setInterval(function() {

    $.getJSON("vData.json", function(json) {
        current = JSON.stringify(json);
        if (previous && current && previous !== current) {
            alert("Bazı dosyalarda değişiklik yapıldı, sayfa yenilenecektir.");
            location.reload();
        }
        previous = current;
    });
}, 120000);