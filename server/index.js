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
    let sql = `SELECT COUNT(*) AS 'status' FROM authentication WHERE email = "${email}" AND password = "${password}";`;
    db.query(sql, function (error, results, fields) {
        if (results[0].status) {
            res.send({
                status: "success"
            });
        } else {
            res.status = 400;
            res.send({
                status: "Invalid credentials",
                errors: [
                    "Authentication failure"
                ]
            });
        }
    });
}

app.post("/", function(req, res) {
    console.log("hello");
    console.log(req.body);

    let email = req.body.email;
    let password = req.body.password;
    let fingerprintingResults = req.body.fp;
    authenticateViaCredentials(email, password, fingerprintingResults, res);
});

app.listen(PORT, function(data) {
    console.log("Listening on port " + PORT);
});