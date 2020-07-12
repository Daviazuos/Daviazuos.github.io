$(document).ready(function() {
    $('#getDebts').DataTable( {
        "ajax": {
            "url": "https://projectdividas.herokuapp.com//Simple",
            "dataSrc": ""
        },
        "columns": [
            { "data": "name" },
            { "data": "numeroparcelas" },
            { "data": "parcela" },
            { "data": "valor", render: $.fn.dataTable.render.number(',', '.', 2, '')},
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
    $("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
    });
})

$(document).ready(function() {
    $('#getCardDebts').DataTable( {
        "ajax": {
            "url": "https://projectdividas.herokuapp.com//Card",
            "dataSrc": ""
        },
        "columns": [
            { "data": "name" },
            { "data": "parcela" },
            { "data": "valor", render: $.fn.dataTable.render.number(',', '.', 2, '')},
            { "data": "vencimento" },
            { "data": "TipoDeDivida" },
            { "data": "Status" },
            { "data": "numeroparcelas" },
            { "data": "Descricao" }
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
        if ($(this).val() == "Parcelada") {
            $("#QuantidadeParcelasCartao").show();
        } else {
            $("#QuantidadeParcelasCartao").hide();
        }
    });
});

function onSubmit( form ){
    var data = objectifyForm(form);
    fetch("https://projectdividas.herokuapp.com//AddDebts", {
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
    console.log(JSON.stringify(data))
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
                $('#CardName').append($('<option class="dropdown-item" id="CardName" name="CardName">> </option>').val(p.Cardname).html(p.Cardname));
            });
      });  
    
var API = "https://projectdividas.herokuapp.com//GetDebtsSum/07/2020";
$.getJSON(API)
        .done(function(data){    
        $.each(data, function (i, p) {
                $('#SumValues').append($('<h1></h1>').val(p.Sum).html("R$ "+p.Sum));
            });
    });  

var APICard = "https://projectdividas.herokuapp.com//GetCardsSum/07/2020";
$.getJSON(APICard)
        .done(function(data){    
        $.each(data, function (i, p) {
                $('#SumCardValues').append($('<h1></h1>').val(p.Sum).html("R$ "+p.Sum));
            });
    });  

var APISum = "https://projectdividas.herokuapp.com/GetAllDebtsSum/07/2020";
$.getJSON(APISum)
        .done(function(data){    
        $.each(data, function (i, p) {
                $('#SumAllValues').append($('<h1></h1>').val(p.Sum).html("R$ "+p.Sum));
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

var APISumDebtsValues = "https://projectdividas.herokuapp.com//GetMonthSum/2020";

fetch(APISumDebtsValues).then(res => 
                        res.json()).then((out) =>
                        $(function () {
    // chart colors
    var colors = ['#007bff','#28a745','#333333','#c3e6cb','#dc3545','#6c757d'];
    console.log()
    /* large line chart */
    var chLine = document.getElementById("chLine");
    var chartData = {
    labels: out[0]['month'],
        datasets: [{
        data: out[0]['sum'],
        backgroundColor: colors[3],
        borderColor: colors[0],
        borderWidth: 4,
        pointBackgroundColor: colors[0]
    }]
    };

    if (chLine) {
    new Chart(chLine, {
    type: 'line',
    data: chartData,
    options: {
        scales: {
        yAxes: [{
            ticks: {
            beginAtZero: false
            }
        }]
        },
        legend: {
        display: false
        }
    }
    });
    }
}))