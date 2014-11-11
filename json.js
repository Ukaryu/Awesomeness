var xmlhttp = new XMLHttpRequest();
var url = "localhost:3000/pubs";

xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var myArr = JSON.parse(xmlhttp.responseText);
        myFunction(myArr);
    }
}
xmlhttp.open("GET", url, true);
xmlhttp.send();

function myFunction(arr) {
    var out = "";
    var i;
    for(i = 0; i < arr.length; i++) {
        out += '<p>' + arr[i].Pub + '</p>';
        out += '<p>' + arr[i].Aldersgrense + '</p>';
        out += '<p>' + arr[i].�pningstider + '</p>';
        out += '<p>' + arr[i].Type + '</p>';
        out += '<p>' + arr[i].Gate/adresse + '</p>';
        out += '<p>' + arr[i].Tlf + '</p>';
        out += '<p>' + arr[i].Mail + '</p>';
        out += '<p>' + arr[i].Kleskode + '</p>';
    }
    document.getElementById("lol").innerHTML = out;
}
