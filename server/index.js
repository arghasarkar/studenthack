"use strict";

let express = require("express");
let cors = require("cors");
let myParser = require("body-parser");
let app = express();
let mysql = require("mysql");

const PORT = 4000;

app.use(myParser.urlencoded({extended : true}));
app.use(cors());

let db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'MyNewPass',
    database: 'studenthack'
});

db.connect();

function authenticateViaCredentials(email, password, fingerprintingResults, res) {
    let sql = `SELECT * FROM authentication WHERE email = "${email}" AND password = "${password}";`;

    db.query(sql, function (error, results, fields) {
        //console.log(results[0].id);
        if (results[0]) {
            res.status = 200;

            let sqlFP = `SELECT * FROM fingerprint WHERE authentication_id = '${results[0].id}';`;
            //console.log(sqlFP);

            db.query(sqlFP, function (_error, _results, _fields) {
                if (_results[0]) {

                    res.send({
                        status: "success",
                        matched: matchHash(fingerprintingResults, _results[0].fingerprint)
                    });
                } else {
                    res.send({
                        status: "success",
                        matched:(matchHash(fingerprintingResults, ""))
                    })
                }

            });

        } else {
            res.status = 400;
            res.send({
                status: "Invalid credentials",
                errors: [
                    "Authentication failure",
                    {
                        input: {
                            email: email,
                            password: password
                        }
                    }
                ]
            });
        }
    });
}

function matchHash(liveHash, dbHash) {
    let percentageMatch = 0;
    let hashMatch = false;


    console.log(liveHash);


    if (liveHash === undefined || liveHash == "") {
        liveHash = "{}";
    }

    let liveHashDecoded;//= JSON.parse(liveHash);
    let dbHashDecoded;// = JSON.parse(dbHash);

    liveHashDecoded = JSON.parse(liveHash);
    dbHashDecoded = JSON.parse(dbHash);


    if (liveHashDecoded.hash && dbHashDecoded.hash) {
        if (liveHashDecoded.hash == dbHashDecoded.hash) {
            hashMatch = true;

            percentageMatch += 75;
        }
    }

    let liveResults;
    let dbResults;

    if (liveHashDecoded.result && dbHashDecoded.result) {
        liveResults = liveHashDecoded.result;
        dbResults = dbHashDecoded.result;
    }


    /*liveHash = JSON.parse(liveHash);
    //dbHash = JSON.parse(dbHash);

    if (liveHash.hash && dbHash.hash) {
        return liveHash.hash == dbHash.hash;
    }*/

    let match = {
        percentage: percentageMatch,
        hash: hashMatch,
        canvasHash: matchCanvas(liveResults, dbResults),
        otherFields: ["Hello World"]
    };
    return match;
}

function matchCanvas(live, db) {
    let liveCanvas = "";
    let dbCanvas = "";
    console.log(live);
    console.log(db);

    for (let i = 0; i < live.length; i++) {
        if (live[i].key == "canvas") {
            liveCanvas = live[i].value;
        }
    }

    for (let i = 0; i < db.length; i++) {
        if (db[i].key == "canvas") {
            dbCanvas = db[i].value
        }
    }

    return liveCanvas == dbCanvas;
}

app.post("/", function(req, res) {
    //console.log("hello");
    //console.log(req.body);

    let email = req.body.email;
    let password = req.body.password;
    let fingerprintingResults = req.body.fp;
    authenticateViaCredentials(email, password, fingerprintingResults, res);
});

app.listen(PORT, function(data) {
    console.log("Listening on port " + PORT);
});