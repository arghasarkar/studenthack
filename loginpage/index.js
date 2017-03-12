console.log("hello world");

getCanvasHash();

function getCanvasHash() {
    "use strict";

    new Fingerprint2().get(function(result, components){


        console.log(result); //a hash, representing your device fingerprint
        console.log(components); // an array of FP components
    });
}


function main() {
    var e = returnEmail();
    var p = returnPass();
    var url = "http://10.99.155.2:4000/";
    console.log(url);
    $.post(url, {
            email: e,
            password: p
        },
        function (data) {
            console.log(data);
            console.log("matched percentage:", data.matched.percentage);
            console.log('canvas match', data.matched.canvasHash);
            document.getElementById("percentageValue").innerHTML = data.matched.percentage;
            var otherfields = data.matched.otherFields;

            document.getElementById("canvasHash").innerHTML = data.matched.canvasHash;

        });

    for (i=0; i<otherFields.length ; i++)
    {
        document.getElementById("otherFields").innerHTML = data.matched.otherFields;
    }
    // fetch(url).then(function(response) {
    //     console.log('Status:', response.status)
    //
    //     response.json().then(function(data){
    //         console.log('FETCH Result:', data);
    //     }).catch(function(err){
    //         console.log('FETCH Parsing Error', err)
    //     });
    // /*});*/


}

function returnEmail(){
   return document.getElementById('email').value;
}

function returnPass(){
    return document.getElementById('pwd').value;
}



