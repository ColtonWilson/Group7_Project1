var baseUrlOne = "https://api.coinranking.com/v2/coins"
var baseUrlTwo = "https://api.currencyfreaks.com/latest?apikey=74322d673c074013814dab12cbf6be53"
var proxyUrl = "https://cors-anywhere.herokuapp.com/"
var apiKeyOne = "coinranking8e254f87ce60317d0418cdb55cb43b2fce3d857bd5f356ec"
var apiKeyTwo = "74322d673c074013814dab12cbf6be53"

var answer = document.getElementsByClassName('answer');
var fetchButton = document.getElementById('fetch-button');

let conversionDiv = document.getElementById("conversionHistory");
let buttonsDiv = document.getElementById("buttons")

let emptyArray = [];

let storedArray = JSON.parse(window.localStorage.getItem("conversions"));

 // add Enter key for searching as well
$("input").keyup(function () {
    if (event.key === "Enter") {
        $clicked.click();
    }
})

//currencyConvert function
function currencyconvert(){


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

     let requestURL = "https://api.currencyfreaks.com/latest?apikey=" +
     apiKeyTwo + "&symbols=" + endvaluetext;

     fetch(requestURL)
     .then(function(response){
        return response.json();
     })
     .then(function(data){
        console.log(data);
        var remove = document.getElementById("answer");
        if(remove.hasChildNodes())
        {
            remove.removeChild(remove.lastElementChild);
            remove.removeChild(remove.lastElementChild);
        }
        var exchangeRate = document.createElement('p');
        var finalAnswer = document.createElement('p');
        exchangeRate.innerHTML = '';
        finalAnswer.innerHTML = '';
        var rate = data.rates;

        //Get todays date
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = mm + '/' + dd + '/' + yyyy;
        //Print exchange rate to console
        exchangeRate.textContent =  "Exchange Rate for " +endvaluetext+" on "+ today + " is: " + rate[Object.keys(rate)[0]];
        var just_rate = rate[Object.keys(rate)[0]];
        document.getElementById('answer').appendChild(exchangeRate);

        //convert exchange rate to number
        var number_rate = Number(just_rate);
        var number_submitted = Number(amountvalue.replace(/[^0-9.-]+/g,""));
        console.log( number_rate);
        console.log(number_submitted);
        
        var multiply_both_numbers = number_rate * number_submitted;
        var currency_number = multiply_both_numbers.toFixed(2);
        console.log(multiply_both_numbers);
        console.log(typeof multiply_both_numbers);

        finalAnswer.textContent = amountvalue +" was converted to " + endvaluetext +  " for a total of: " + currency_number;
        document.getElementById('answer').appendChild(finalAnswer);

        let conversionArray = definecurrencyArray(storedArray, emptyArray);

        let conversionarrayCurrent = 
        {
            conversion: finalAnswer
        };

        conversionArray.push(conversionarrayCurrent);
        savecurrency(conversionArray);

     });
}

//click listener
 fetchButton.addEventListener('click', currencyconvert);

const savecurrency = (array) => {
  window.localStorage.setItem("conversions", JSON.stringify(array));
}


const definecurrencyArray = (arr1, arr2) => {
  if(arr1 !== null) {
    return arr1
  } else {
    return arr2
  }
}

function displayAllConversions() {
  let currencyArray = defineScoresArray(storedArray, emptyArray);

  currencyArray.forEach(obj => {
    let conversion = obj.conversions;
    let outputP = document.createElement("p");
    outputP.innerText = `${conversion}`;
    conversionDiv.append(outputP);
  });
}

function viewConversions() {
  ConversionBtn.addEventListener("click", function(event) {
    event.preventDefault();
    displayAllConversions();
    goBackBtn();
  });
}

function goBackBtn() {
  let backBtn = document.createElement("input");
  backBtn.setAttribute("type", "button");
  backBtn.setAttribute("value", "Go Back");
  backBtn.addEventListener("click", function(event){
    event.preventDefault();
    window.location.reload();
  })
  buttonsDiv.append(backBtn)
}

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