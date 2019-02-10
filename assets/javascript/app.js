$(document).ready(function(){

var now = new Date();

var day = ("0" + now.getDate()).slice(-2);
var month = ("0" + (now.getMonth() + 1)).slice(-2);
var today = now.getFullYear()+"-"+(month)+"-"+(day) ;
$('#date').val(today);

var config = {
apiKey: "AIzaSyAcInbqzuEob8iQJg2J9F_6qW_09Ct9FTQ",
authDomain: "reason-to-drink.firebaseapp.com",
databaseURL: "https://reason-to-drink.firebaseio.com",
projectId: "reason-to-drink",
storageBucket: "reason-to-drink.appspot.com",
messagingSenderId: "115034502037"
};
firebase.initializeApp(config);

var database = firebase.database();

$("#submit").on("click", function(event) {
event.preventDefault();

var name = $("#name").val().trim();
console.log(name);

//JR3: OK I think this is the part we need to append the year
var date = $("#date").val().trim();
console.log(date);


var country = $("#country").val().trim();
console.log(country);
var state = $("#state").val().trim();
console.log(state);
var region = $("#region").val().trim();
console.log(region);

var toAdd = {
name: name,
date: date,
country: country,
state: state,
region: region
}


database.ref().push(toAdd);


database.ref().on("value", function(snapshot) {
  $("#name-display").text(snapshot.val().name);
  $("#date-display").text(snapshot.val().date);
  $("#country-display").text(snapshot.val().country);
  $("#state-display").text(snapshot.val().state);
  $("#region-display").text(snapshot.val().region);
  
})


console.log(date);

searchCity = $("#region").val();
searchState = $("#state").val();
searchCountry = $("#country").val();
clearTable("brewTable");
clearDiv();
getHolidays();
getBreweries(searchCountry, searchState, searchCity);


 
  }) 
});


///////////////////  BREWERY API CODE  /////////////////////////////////////

var searchDate;
// JR3: we might want to change this to breweryYear so we don't have a conflict between the holiday api and brewery api
var year = "2019";
var month = "01";
var day = "19";
var searchCountry;
var searchState;
var searchCity;

// this is no longer required
function getHolidays() {
//what is needed for CalendarIndex
//country, year, api_key(a964218e0494e47c37482a2d99753eaa276f1978), state

var country = searchCountry;
console.log(country);
var dateCal = "2019";
var state = searchState;
console.log(state);

var queryURLTwo = "https://calendarific.com/api/v1/holidays?country=" + country + "&year=" + dateCal + "&state=" + state + "&api_key=a964218e0494e47c37482a2d99753eaa276f1978";



$.ajax({
url: queryURLTwo,
method: "GET"
}).then(function(response) {
console.log(response);
var useMe = response.response.holidays;
console.log(useMe.length);
for(var j = 0; j <useMe.length; j++) {
console.log(j);
var nombre = useMe[j].name;
console.log(nombre);
var newDate = useMe[j].date;
var newNewDate = newDate.slice(0, 10)
console.log('newDate', newNewDate);

$("#holDiv").append("<p>" + nombre + newNewDate + "</p>")

}
});

};

function getBreweries(country, state, city){
var queryURL = "https://api.openbrewerydb.org/breweries?";
if(city) queryURL = queryURL + "&by_city=" + city;
if(state) queryURL = queryURL  + "&by_state=" + state;
if(country) queryURL = queryURL  + "&by_country=" + country;

callAjax(queryURL);

};

function callAjax(queryURL){
$.ajax({
url: queryURL,
method: "GET"
})
.then(function(response) {
  //$("#resultsDiv").text(JSON.stringify(response));
  for(i=0; i<response.length; i++){
    var resultName = response[i].name; 
    var resultCity = response[i].city; 
    var resultState = response[i].state;
    var resultCountry = response[i].country; 
    var resultStreet = response[i].street;
    var resultZip = response[i].postal_code;
    var resultPhone = response[i].phone;
    var resultSite = response[i].website_url;
    var resultBreweryType = response[i].brewery_type;
  $("#brewTable").append(
                          "<tr>" 
                          + "<td>" 
                            + "<div><h5>" + resultName + "</h5></div>" 
                            + "<div><a href='" + resultSite + "'>" + resultSite + "</a></div>" 
                            + "<div>" + resultStreet + "</div>" 
                          + "</td>" 
                          + "<td>" + resultCity + "</td><td>" + resultState + "</td><td>" + resultCountry + "</td><td></tr>");
  
  }
  
  console.log(response);

});
};




function clearTable(tableID){
$("#"+tableID+ " tbody").empty();
}      
function clearDiv(){
$("#holDiv").empty();
}      

function showDiv() {
    document.getElementById('welcomeDiv').style.display = "block";
 }