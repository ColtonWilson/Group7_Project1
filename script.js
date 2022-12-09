var baseUrlOne = "https://api.coinranking.com/v2/coins"
var baseUrlTwo = "https://api.currencyfreaks.com/latest?apikey=74322d673c074013814dab12cbf6be53"
var proxyUrl = "https://cors-anywhere.herokuapp.com/"
var apiKeyOne = "coinranking8e254f87ce60317d0418cdb55cb43b2fce3d857bd5f356ec"
var apiKeyTwo = "74322d673c074013814dab12cbf6be53"
//div for writing answer
var answer = document.getElementsByClassName('answer');
//div for submit button
var fetchButton = document.getElementById('fetch-button');
//div for saved conversion history
let conversionDiv = document.getElementById("conversionHistory");
//div for buttons
let buttonsDiv = document.getElementById("buttonsDiv");
//button for history
let viewHistoryBtn = document.getElementById("HistoryBtn");
//array to store conversion result
let emptyArray = [];
//array of conversion results from local storage
let storedArray = JSON.parse(window.localStorage.getItem("conversionResults"));
 // add Enter key for searching as well
$("input").keyup(function (event) {
    if (event.key === "Enter") {
        $clicked.click();
    }
})

//currencyConvert function
function currencyconvert(){


    let startcurrency = document.getElementById("begincurrency");
    var startvaluetext = startcurrency.options[startcurrency.selectedIndex].text;
    let amount = document.getElementById("currency-field");
    var amountvalue = amount.value;
    let endcurrency = document.getElementById("endcurrency");
    var endvaluetext = endcurrency.options[endcurrency.selectedIndex].text;

     let requestURL = "https://api.currencyfreaks.com/latest?apikey=" +
     apiKeyTwo + "&symbols=" + endvaluetext;

     fetch(requestURL)
     .then(function(response){
        return response.json();
     })
     .then(function(data){
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

        
        var multiply_both_numbers = number_rate * number_submitted;
        var currency_number = multiply_both_numbers.toFixed(2);


        finalAnswer.textContent = amountvalue +" was converted to " + endvaluetext +  " for a total of: " + currency_number;
        document.getElementById('answer').appendChild(finalAnswer);
        //capture the result to save into local storage
        let resultArray = defineResultArray(storedArray, emptyArray);
        let result = finalAnswer.innerHTML;
        let resultArrayCurrent = 
        {
            Result: result
        };
        resultArray.push(resultArrayCurrent);
        saveResult(resultArray);

     });
}

//click listener
 fetchButton.addEventListener('click', currencyconvert);

const saveResult = (array) => {
  window.localStorage.setItem("conversionResults", JSON.stringify(array));
}


const defineResultArray = (arr1, arr2) => {
  if(arr1 !== null) {
    return arr1
  } else {
    return arr2
  }
}

function displayAllResults() {
  let currencyArray = defineResultArray(storedArray, emptyArray);
  let resultArray = JSON.parse(currencyArray);
  resultArray.forEach((obj) => {
    let results = obj.Result;
    let resultP = document.createElement("p");
    console.log(results);
    resultP.innerText = `${results}`;
    conversionDiv.append(resultP);
  });
}


viewHistoryBtn.addEventListener("click", function() {
    storedArray = localStorage.getItem("conversionResults");
    var remove = document.getElementById("answer");
        if(remove.hasChildNodes())
        {
            remove.removeChild(remove.lastElementChild);
            remove.removeChild(remove.lastElementChild);
        }
    goBackBtn();
    clearHistoryBtn();
    displayAllResults();
    
  });


function goBackBtn() {
  let backBtn = document.createElement("input");
  backBtn.setAttribute("type", "button");
  backBtn.setAttribute("value", "Go Back");
  backBtn.setAttribute("class", "backBtn");
  backBtn.addEventListener("click", function(event){
    event.preventDefault();
    window.location.reload();
  })
  buttonsDiv.append(backBtn)
}

const removeEls = (...els) => {
  for (let el of els) el.remove();
}

function clearHistoryBtn() {    
  let clearBtn = document.createElement("input");
  clearBtn.setAttribute("type", "button");
  clearBtn.setAttribute("value", "Clear History");
  clearBtn.addEventListener("click", function(event){
    event.preventDefault();
    removeEls(conversionDiv);
    window.localStorage.removeItem("conversionResults");
    window.location.reload();
  })
  buttonsDiv.append(clearBtn)
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