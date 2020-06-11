$(document).ready(function() {
    $('#example').DataTable( {
        "ajax": {
            "url": "https://projectdividas.herokuapp.com/",
            "dataSrc": ""
        },
        "columns": [
            { "data": "name" },
            { "data": "valor" },
            { "data": "numeroparcelas" },
            { "data": "vencimento" },
            { "data": "TipoDeDivida" },
            { "data": "Status" }
        ]
    } );
})

$(document).ready(function(){
    $("select.btn btn-secondary dropdown-toggle").change(function(){
        var selectedMonth = $(this).children("option:selected").val();
        alert("You have selected the month - " + selectedMonth);
    });
});
