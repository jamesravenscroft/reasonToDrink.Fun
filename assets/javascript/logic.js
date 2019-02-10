//hello world

var name;
var date;
var country;
var region;
var city;

//code to save the input data from the html
$("#submit").on("click", function () {
    var name = $("#name").val();
    console.log(name);
    var date = $("#date").val();
    console.log(date);
    var country = $("#country").val();
    console.log(country);
    var city = $("#city").val();
    console.log(city);
    
})

