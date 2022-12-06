var baseUrlOne = "https://api.coinranking.com/v2/coins"
var baseUrlTwo = "https://api.currencyfreaks.com/latest?apikey=74322d673c074013814dab12cbf6be53"
var proxyUrl = "https://cors-anywhere.herokuapp.com/"
var apiKeyOne = "coinranking8e254f87ce60317d0418cdb55cb43b2fce3d857bd5f356ec"

var answer = document.getElementsByClassName('answer');
var fetchButton = document.getElementById('fetch-button');


 // add Enter key for searching as well
$("input").keyup(function () {
    if (event.key === "Enter") {
        $clicked.click();
    }
})

//currencyConvert function
function currencyconvert(){

    let requestURL = '';

    let startcurrency = document.getElementById("begincurrency");
    var startvalue = startcurrency.value;
    var startvaluetext = startcurrency.options[startcurrency.selectedIndex].text;
    let amount = document.getElementById("currency-field");
    var amountvalue = amount.value;
    let endcurrency = document.getElementById("endcurrency");
    var endvalue = endcurrency.value;
    var endvaluetext = endcurrency.options[endcurrency.selectedIndex].text;

    console.log(startvaluetext);
    console.log(endvaluetext);
    console.log(amountvalue);
}

//click listener
 fetchButton.addEventListener('click', currencyconvert);


//First API
fetch(`${proxyUrl}${baseUrlOne}`, {
    method: "GET",
    headers: {
        'Content-Type': 'application/json',
        'x-access-token': `${apiKeyOne}`,
        'Access-Control-Allow-Origin': '*'
    }
}).then((response) => {
    if(response.ok)
    {
        response.json().then((json)=> {
            console.log(json.data.coins)

           
        })
    }
}).catch((error) => {
    console.log(error);
 });


 //Second API
 fetch(`${baseUrlTwo}`, {
    
}).then((response) => {
    if(response.ok)
    {
        response.json().then((json)=> {
            console.log(json)

        })
    }
}).catch((error) => {
    console.log(error);
 });






 //Currency Check
 //
 //
 ///
 ///
 $("input[data-type='currency']").on({
    keyup: function() {
      formatCurrency($(this));
    },
    blur: function() { 
      formatCurrency($(this), "blur");
    }
});


function formatNumber(n) {
  // format number 1000000 to 1,234,567
  return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}


function formatCurrency(input, blur) {
  // appends $ to value, validates decimal side
  // and puts cursor back in right position.
  
  // get input value
  var input_val = input.val();
  
  // don't validate empty input
  if (input_val === "") { return; }
  
  // original length
  var original_len = input_val.length;

  // initial caret position 
  var caret_pos = input.prop("selectionStart");
    
  // check for decimal
  if (input_val.indexOf(".") >= 0) {

    // get position of first decimal
    // this prevents multiple decimals from
    // being entered
    var decimal_pos = input_val.indexOf(".");

    // split number by decimal point
    var left_side = input_val.substring(0, decimal_pos);
    var right_side = input_val.substring(decimal_pos);

    // add commas to left side of number
    left_side = formatNumber(left_side);

    // validate right side
    right_side = formatNumber(right_side);
    
    // On blur make sure 2 numbers after decimal
    if (blur === "blur") {
      right_side += "00";
    }
    
    // Limit decimal to only 2 digits
    right_side = right_side.substring(0, 2);

    // join number by .
    input_val = "$" + left_side + "." + right_side;

  } else {
    // no decimal entered
    // add commas to number
    // remove all non-digits
    input_val = formatNumber(input_val);
    input_val = "$" + input_val;
    
    // final formatting
    if (blur === "blur") {
      input_val += ".00";
    }
  }
  
  // send updated string to input
  input.val(input_val);

  // put caret back in the right position
  var updated_len = input_val.length;
  caret_pos = updated_len - original_len + caret_pos;
  input[0].setSelectionRange(caret_pos, caret_pos);
}