console.log("hello world");

getCanvasHash();

function getCanvasHash() {
    "use strict";

   return  new Fingerprint2().get(function(result, components){

        let allResults = {
            hash: result,
            result: components
        };
        console.log(JSON.stringify(allResults));

    });
}



function main() {
    var e = returnEmail();
    var p = returnPass();
    var url = "http://10.99.155.2:4000/";
    //console.log(url);



    new Fingerprint2({excludeJsFonts: true}).get(function(result, components){

        var x =  {
            hash: result,
            result: components
        };

        x = JSON.stringify(x);
        /*
         console.log(result); //a hash, representing your device fingerprint
         console.log(components); // an array of FP components*/

        console.log(x);

        $.post(url, {
                email: e,
                password: p,
                fp: x
            },
            function (data) {
                console.log(data);
                console.log("overall hash:", data.matched.hash);
                console.log("matched percentage:", data.matched.percentage);
                console.log('canvas match', data.matched.canvasHash);
                document.getElementById("overallHash").innerHTML = data.matched.hash;
                document.getElementById("percentageValue").innerHTML = data.matched.percentage;
                var otherfields = data.matched.otherFields;

                document.getElementById("canvasHash").innerHTML = data.matched.canvasHash;


                // var otherFieldsStr = "";
                // for (i=0; i<otherFields.length ; i++)
                // {
                //     otherFieldsStr += data.matched.otherFields[i];
                // }

                console.log(data.matched.otherFields);

                document.getElementById("otherFields").innerHTML = JSON.stringify(data.matched.otherFields);

            });

        // fetch(url).then(function(response) {
        //     console.log('Status:', response.status)
        //
        //     response.json().then(function(data){
        //         console.log('FETCH Result:', data);
        //     }).catch(function(err){
        //         console.log('FETCH Parsing Error', err)
        //     });
        // /*});*/


    });


}

function returnEmail(){
   return document.getElementById('email').value;
}

function returnPass(){
    return document.getElementById('pwd').value;
}



