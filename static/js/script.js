$(document).ready(function() {
    $('#getDebts').DataTable( {
        "ajax": {
            "url": "http://127.0.0.1:5000/",
            "dataSrc": ""
        },
        "columns": [
            { "data": "name" },
            { "data": "valor", render: $.fn.dataTable.render.number(',', '.', 2, '')},
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


$(function () {
    $("#TipoDeDivida").change(function () {
        if ($(this).val() == "parcelada") {
            $("#QuantidadeParcelas").show();
        } else {
            $("#QuantidadeParcelas").hide();
        }
    });
});

$(function () {
    $("#exampleCheck1").change(function () {
        if ($(this).val() == true) {
            $("#inputNameDebts").show();
        } else {
            $("#inputNameDebts").hide();
        }
    });
});

function onSubmit( form ){
    var data = objectifyForm(form);
    fetch("http://127.0.0.1:5000/AddSimple", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data),
            cache: 'default',
            mode: 'cors'
      }).then(res=>res.json())
      .catch((error) => {
      console.log(error)})
      alert("Valor Adicionado!")
  }

function objectifyForm(formArray) 
    {
        var returnArray = {};
        for (var i = 0; i < formArray.length-1; i++)
        {
            returnArray[formArray[i]['name']] = formArray[i]['value'];
        }
        return returnArray;
    }
