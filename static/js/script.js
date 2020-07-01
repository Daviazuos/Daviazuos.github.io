$(document).ready(function() {
    $('#getDebts').DataTable( {
        "ajax": {
            "url": "https://projectdividas.herokuapp.com/",
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

$(document).ready(function() {
    $('#getCards').DataTable( {
        "ajax": {
            "url": "https://projectdividas.herokuapp.com//GetCards",
            "dataSrc": ""
        },
        "columns": [
            { "data": "Cardname" },
            { "data": "Vencimento" },
            { "data": "Fechamento" }
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
    $("#TipoDeDividaCartao").change(function () {
        if ($(this).val() == "parcelada") {
            $("#QuantidadeParcelasCartao").show();
        } else {
            $("#QuantidadeParcelasCartao").hide();
        }
    });
});

function onSubmit( form ){
    var data = objectifyForm(form);
    fetch("https://projectdividas.herokuapp.com//AddSimple", {
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

function onSubmitCard( form ){
    var data = objectifyForm(form);
    fetch("https://projectdividas.herokuapp.com//AddCard", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data),
            cache: 'default',
            mode: 'cors'
      }).then(res=>res.json())
      .catch((error) => {
      console.log(error)})
      alert("Cartão Adicionado!")
  }

function onSubmitCardValues( form ){
    var data = objectifyForm(form);
    fetch("http://127.0.0.1:5000//AddValuesCard", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data),
            cache: 'default',
            mode: 'cors'
      }).then(res=>res.json())
      .catch((error) => {
      console.log(error)})
      alert("Valor adicionado ao cartão!")
}

var API = "https://projectdividas.herokuapp.com//GetCardsNames";
$.getJSON(API)
        .done(function(data){    
        $.each(data, function (i, p) {
                $('#selectSkill').append($('<option>name="CardName"</option>').val(p.Cardname).html(p.Cardname));
            });
      });

function objectifyForm(formArray) 
    {
        var returnArray = {};
        for (var i = 0; i < formArray.length-1; i++)
        {
            returnArray[formArray[i]['name']] = formArray[i]['value'];
        }
        return returnArray;
    }