$(document).ready(function() {
    $('#getDebts').DataTable( {
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
        ],
        bFilter: false,
        bInfo: false,
        paging: false

    } );
})

var myHeaders = new Headers();
myHeaders.append('Content-Type', 'application/json');

function onSubmit( form ){
    var data = objectifyForm(form);
    fetch("https://projectdividas.herokuapp.com/", {
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