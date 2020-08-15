var d = new Date();
var monthActual = d.getMonth() +1;
var yearActual = d.getFullYear();


$(document).ready(function(){
    $.getJSON("https://projectdividas.herokuapp.com//Simple", function(data){
    var concept_list= '';
    $.each(data, function(key, value){
        concept_list += '<tr>';
        concept_list += '<td>'+value.name+'</td>';
        concept_list += '<td>R$ '+parseFloat(value.valor).toFixed(2)+'</td>';
        concept_list += '<td>'+value.numeroparcelas+'</td>';
        concept_list += '<td>'+value.parcela+'</td>';
        concept_list += '<td>'+value.vencimento+'</td>';
        concept_list += '<td>'+value.TipoDeDivida+'</td>';
        concept_list += '<td>'+value.Status+'</td>';
        concept_list += '</tr>';
    });
    $('#GetSimple').append(concept_list);
      });
    });

var APIAllreceived = "https://projectdividas.herokuapp.com/GetReceived";

$.getJSON(APIAllreceived)
    .done(function(dataReceived)
    {  
        $.getJSON("https://projectdividas.herokuapp.com//GetAllValues/"+07+"/"+yearActual, function(data){
            var concept_list= '';
            var name = 0
            $.each(data, function(key, value)
            {
                var newRadioButton = '';
                name = name + 1
                concept_list += '<tr>';
                concept_list += '<td>'+value.Name+'</td>';
                concept_list += '<td>R$ '+parseFloat(value.Valor).toFixed(2)+'</td>';
                concept_list += '<td>'+value.Vencimento+'</td>';
                for(var received in dataReceived) 
                {
                    var dia = dataReceived[received].Date.substring(8,10)  
                    var valor = dataReceived[received].Value
                    newRadioButton += '<div class="form-check form-check-inline"> <input class="form-check-input" type="radio" name='+name+' id='+dia+' value='+dia+'> <label class="form-check-label" for='+dia+'>'+dia+'</label></div>'
                }
                concept_list += '<td>'+newRadioButton+'</td>';
                concept_list += '<td>'+'<button class="btn btn-primary btn-md" onclick="verifica('+name+","+parseFloat(value.Valor)+');"></button>'+'</td>';
            });
            $('#GetAllValues').append(concept_list);
        });
    });

var valor = 0

function verifica(nameid, valueid)
    {
    $.getJSON(APIAllreceived)
        .done(function (ReceivedValues)
        {
            var radios = document.getElementsByName(nameid);
            for (var i = 0, length = radios.length; i < length; i++) 
            {
                if (radios[i].checked) 
                {
                    for(var valuesNew in ReceivedValues)
                    {
                        var dayreceived = ReceivedValues[valuesNew].Date.substring(8,10)
                        if(dayreceived == radios[i].value)
                        {
                            valor = parseFloat(ReceivedValues[valuesNew].Value) - valueid
                        }
                    }
                }
            }
        })
        console.log(valor)
    }

var API = "https://projectdividas.herokuapp.com//GetDebtsSum/"+monthActual+"/"+yearActual;
$.getJSON(API)
        .done(function(data){    
        $.each(data, function (i, p) {
                $('#SumValues').append($('<h1></h1>').val(p.Sum).html("R$ "+parseFloat(p.Sum).toFixed(2)));
            });
    });  

$(document).ready(function(){
    $.getJSON("https://projectdividas.herokuapp.com/GetReceived", function(data){
    var concept_list= '';
    $.each(data, function(key, value){
        concept_list += '<tr>';
        concept_list += '<td>'+value.Date+'</td>';
        concept_list += '<td>R$ '+parseFloat(value.Value).toFixed(2)+'</td>';
        concept_list += '<td>'+value.Type+'</td>';
        concept_list += '</tr>';
    });
    $('#GetReceived').append(concept_list);
        });
});


$(document).ready(function(){
    $.getJSON("https://projectdividas.herokuapp.com//Simple", function(data){
    var concept_list= '';
    $.each(data, function(key, value){
        concept_list += '<tr>';
        concept_list += '<td>'+value.name+'</td>';
        concept_list += '<td>R$ '+parseFloat(value.valor).toFixed(2)+'</td>';
        concept_list += '<td>'+value.numeroparcelas+'</td>';
        concept_list += '<td>'+value.parcela+'</td>';
        concept_list += '<td>'+value.vencimento+'</td>';
        concept_list += '<td>'+value.TipoDeDivida+'</td>';
        concept_list += '<td>'+value.Status+'</td>';
        concept_list += '</tr>';
    });
    $('#CardValues').append(concept_list);
        });
    });

$(document).ready(function(){
    $.getJSON("https://projectdividas.herokuapp.com/GetReceived", function(data){
    var concept_list= '';
    $.each(data, function(key, value){
        concept_list += '<tr>';
        concept_list += '<td>'+value.Date+'</td>';
        concept_list += '<td>R$ '+parseFloat(value.Value).toFixed(2)+'</td>';
        concept_list += '<td>'+value.Type+'</td>';
        concept_list += '</tr>';
    });
    $('#GetReceived').append(concept_list);
        });
});

$(document).ready(function(){
    $.getJSON("https://projectdividas.herokuapp.com/GetSumByCardName/"+monthActual+"/"+yearActual, function(data){
    var concept_list= '';
    $.each(data, function(key, value){
        concept_list += '<tr>';
        concept_list += '<td>'+value.Cardname+'</td>';
        concept_list += '<td>R$ '+parseFloat(value.Sum).toFixed(2)+'</td>';
        concept_list += '<td>'+value.DueDate+'</td>';
        concept_list += '<td>'+'<button class="btn btn-primary btn-md" onclick="CreateCardTable(\'' + value.Cardname + '\');" id="cardnameValue" data-toggle="modal" data-target="#CardModal">Analítico</button>'+'</td>';
        concept_list += '</tr>';
    });
    $('#getSumCardDebts').append(concept_list);
        });
});

function CreateCardTable(cardname){
    $.getJSON("https://projectdividas.herokuapp.com//Card/"+cardname, function(data){

    var concept_list= '<thead><tr> <th scope="col">Parcela</th> <th scope="col">Plano</th> <th scope="col">Valor</th> <th scope="col">Descrição</th> <th scope="col">Tipo</th> <th scope="col">Status</th> </tr></thead>';
    $("#getCardDebts").empty();
    $.each(data, function(key, value){
        concept_list += '<tr>';
        concept_list += '<td>'+value.parcela+'</td>';
        concept_list += '<td>'+value.numeroparcelas+'</td>';
        concept_list += '<td> R$ '+parseFloat(value.valor).toFixed(2)+'</td>';
        concept_list += '<td>'+value.Descricao+'</td>';
        concept_list += '<td>'+value.TipoDeDivida+'</td>';
        concept_list += '<td>'+value.Status+'</td>';
        concept_list += '</tr>';
        });
    $('#getCardDebts').append(concept_list);
    });
}

$(document).ready(function(){
    $.getJSON("https://projectdividas.herokuapp.com//GetMonthSum/"+yearActual, function(data){
    var newList = [];

    for(var meses in data[0].month) 
    {  
        newList.push([data[0].month[meses],data[0].sum[meses]])      
    }
    
    var concept_list= '';
    $.each(newList, function(key, value){
        concept_list += '<tr>';
        concept_list += '<td>'+value[0]+'</td>';
        concept_list += '<td>R$ '+parseFloat(value[1]).toFixed(2)+'</td>';
        concept_list += '<td>'+'<button class="btn btn-primary btn-md">Analítico</button>'+'</td>';
        concept_list += '</tr>';
    });
    $('#MonthValues').append(concept_list);
        });
    });

$(document).ready(function() {
    $("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
    });
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
    $("#TipoDeDivida").change(function () {
        if ($(this).val() == "parcelada") {
            $("#QuantidadeParcelas").show();
        } else {
            $("#QuantidadeParcelas").hide();
        }
    });
});

function Login() {
  var done=0;
  var usuario = document.getElementById('username').value;
  usuario=usuario.toLowerCase();
  var senha= document.getElementById('password').value;
  senha=senha.toLowerCase();
  if (usuario=="admin" && senha=="admin") {
    window.location="homepage.html";
    done=1;
  }
  if (done==0) { alert("Dados incorretos, tente novamente"); }
}

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

function onSubmitReceived( form ){
var data = objectifyForm(form);

fetch("https://projectdividas.herokuapp.com//AddReceived", {
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
    fetch("https://projectdividas.herokuapp.com//AddValuesCard", {
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
    
var API = "https://projectdividas.herokuapp.com//GetDebtsSum/"+monthActual+"/"+yearActual;
$.getJSON(API)
        .done(function(data){    
        $.each(data, function (i, p) {
                $('#SumValues').append($('<h1></h1>').val(p.Sum).html("R$ "+parseFloat(p.Sum).toFixed(2)));
            });
    });  

var APICard = "https://projectdividas.herokuapp.com//GetCardsSum/"+monthActual+"/"+yearActual;
$.getJSON(APICard)
        .done(function(data){    
        $.each(data, function (i, p) {
                $('#SumCardValues').append($('<h1></h1>').val(p.Sum).html("R$ "+parseFloat(p.Sum).toFixed(2)));
            });
    });  

var APISum = "https://projectdividas.herokuapp.com/GetAllDebtsSum/"+monthActual+"/"+yearActual;
$.getJSON(APISum)
        .done(function(data){    
        $.each(data, function (i, p) {
                $('#SumAllValues').append($('<h1></h1>').val(p.Sum).html("R$ "+parseFloat(p.Sum).toFixed(2)));
            });
    });  

var APISumReceived = "https://projectdividas.herokuapp.com/GetSumReceived";
$.getJSON(APISumReceived)
        .done(function(data){    
        $.each(data, function (i, p) {
                $('#SumAllReceived').append($('<h1></h1>').val(p.Sum).html("R$ "+parseFloat(p.Sum).toFixed(2)));
            });
    });
    

var APIAllSum = "https://projectdividas.herokuapp.com//GetMonthSum/"+yearActual;

$.getJSON(APIAllSum)
    .done(function(data){  
        var newList = parseFloat(0)
        for(var meses in data[0].month) 
        {  
            var value = parseFloat(data[0].sum[meses])
            newList += value
        }
    $('#SumAll').append($('<h1></h1>').val(newList).html("R$ "+newList.toFixed(2)));
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

var APISumDebtsValues = "https://projectdividas.herokuapp.com//GetMonthSum/"+yearActual;
var APISumReceived = "https://projectdividas.herokuapp.com/GetSumReceived";

var result = []

fetch(APISumReceived).then(res => 
    res.json()).then((out) =>
    $(function () {
        result = Array(12).fill(out[0].Sum)}))

fetch(APISumDebtsValues).then(res => 
                        res.json()).then((out) =>
                        $(function () {
                            var ctx = document.getElementById('chLine').getContext('2d');
                            var myChart = new Chart(ctx, {
                                type: 'bar',
                                data: {
                                    labels: out[0]['month'],
                                    datasets: [{
                                        label: 'Dividas',
                                        data: out[0]['sum'],
                                        backgroundColor: [
                                            'rgba(255, 99, 132, 0.2)',
                                            'rgba(255, 99, 132, 0.2)',
                                            'rgba(255, 99, 132, 0.2)',
                                            'rgba(255, 99, 132, 0.2)',
                                            'rgba(255, 99, 132, 0.2)',
                                            'rgba(255, 99, 132, 0.2)',
                                            'rgba(255, 99, 132, 0.2)',
                                            'rgba(255, 99, 132, 0.2)',
                                            'rgba(255, 99, 132, 0.2)',
                                            'rgba(255, 99, 132, 0.2)',
                                            'rgba(255, 99, 132, 0.2)',
                                            'rgba(255, 99, 132, 0.2)'
                                        ],
                                        borderColor: [
                                            'rgba(255, 99, 132, 0.2)',
                                            'rgba(255, 99, 132, 0.2)',
                                            'rgba(255, 99, 132, 0.2)',
                                            'rgba(255, 99, 132, 0.2)',
                                            'rgba(255, 99, 132, 0.2)',
                                            'rgba(255, 99, 132, 0.2)',
                                            'rgba(255, 99, 132, 0.2)',
                                            'rgba(255, 99, 132, 0.2)',
                                            'rgba(255, 99, 132, 0.2)',
                                            'rgba(255, 99, 132, 0.2)',
                                            'rgba(255, 99, 132, 0.2)',
                                            'rgba(255, 99, 132, 0.2)'
                                        ],
                                        borderWidth: 1
                                    },{
                                        label: 'Recebido',
                                        data: result,
                                        backgroundColor: [
                                            'rgba(75, 192, 192, 0.2)',
                                            'rgba(75, 192, 192, 0.2)',
                                            'rgba(75, 192, 192, 0.2)',
                                            'rgba(75, 192, 192, 0.2)',
                                            'rgba(75, 192, 192, 0.2)',
                                            'rgba(75, 192, 192, 0.2)',
                                            'rgba(75, 192, 192, 0.2)',
                                            'rgba(75, 192, 192, 0.2)',
                                            'rgba(75, 192, 192, 0.2)',
                                            'rgba(75, 192, 192, 0.2)',
                                            'rgba(75, 192, 192, 0.2)',
                                            'rgba(75, 192, 192, 0.2)'
                                        ],
                                        borderColor: [
                                            'rgba(75, 192, 192, 0.2)',
                                            'rgba(75, 192, 192, 0.2)',
                                            'rgba(75, 192, 192, 0.2)',
                                            'rgba(75, 192, 192, 0.2)',
                                            'rgba(75, 192, 192, 0.2)',
                                            'rgba(75, 192, 192, 0.2)',
                                            'rgba(75, 192, 192, 0.2)',
                                            'rgba(75, 192, 192, 0.2)',
                                            'rgba(75, 192, 192, 0.2)',
                                            'rgba(75, 192, 192, 0.2)',
                                            'rgba(75, 192, 192, 0.2)',
                                            'rgba(75, 192, 192, 0.2)'
                                        ],
                                        borderWidth: 1
                                    }]
                                },
                                options: {
                                    scales: {
                                        yAxes: [{
                                            ticks: {
                                                beginAtZero: true
                                            }
                                        }]
                                    }
                                }
                            })}))