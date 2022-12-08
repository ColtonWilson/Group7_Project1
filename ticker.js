var baseUrlOne = "https://api.coinranking.com/v2/coins"
var baseUrlTwo = "https://api.currencyfreaks.com/latest?apikey=74322d673c074013814dab12cbf6be53"
var proxyUrl = "https://cors-anywhere.herokuapp.com/"
var apiKeyOne = "coinranking8e254f87ce60317d0418cdb55cb43b2fce3d857bd5f356ec"
var apiKeyTwo = "74322d673c074013814dab12cbf6be53"

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

