console.log("hello world");

getCanvasHash();

function getCanvasHash() {
    "use strict";

    new Fingerprint2().get(function(result, components){

        let allRe
        console.log(result); //a hash, representing your device fingerprint
        console.log(components); // an array of FP components
    });
}


function main()
{
    var email= returnEmail();
    var pass= returnPass();
    var url="http://10.99.155.2:4000/?email=" + email + "&password=" + pass;
    console.log(url);

    fetch(url).then(function(response) {
        console.log('Status:', response.status)

        response.json().then(function(data){
            console.log('FETCH Result:', data);
        }).catch(function(err){
            console.log('FETCH Parsing Error', err)
        });
    });
}

function returnEmail(){
   return document.getElementById('email').value;
}

function returnPass(){
    return document.getElementById('pwd').value;
}