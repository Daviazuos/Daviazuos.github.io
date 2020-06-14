$(document).ready(function() {
    $('#getDebts').DataTable( {
        "ajax": {
            "url": "http://127.0.0.1:5000/",
            "dataSrc": ""
        },
        "columns": [
            { "data": "name" },
            { "data": "valor" },
            { "data": "numeroparcelas" },
            { "data": "vencimento" },
            { "data": "TipoDeDivida" },
            { "data": "Status" }
        ],
        bFilter: false,
        bInfo: false,
        paging: false

    } );
})

function SendValues() {
    document.getElementById('myform').submit();
    var formData = JSON.stringify($("#myform").serializeArray());
    $.ajax({
        url: "http://127.0.0.1:5000/AddSimple",
        type: "POST",
        data: formData,
        dataType:'json',
        success: function (response) {
            console.log(response);
        },
        error: function(error){
            console.log("Something went wrong", error);
        }
    });
}
