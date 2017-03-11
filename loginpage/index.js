/**
 * Created by gisi on 11.03.17.
 */
console.log("hello world")



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