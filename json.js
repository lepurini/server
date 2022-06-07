const fs = require('fs');
const express = require('express');
//const { rows } = require('pg/lib/defaults');
const knex = require('knex')({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        port: 5432,
        user: 'postgres',
        password: 'root',
        database: 'postgres'
    }
});

const app = express();

const host = 'localhost';
const port = 8000;

const percorsoFileModello = "./fileModello.txt";
var fileModello;







app.get('/', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,OPTIONS,POST');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin, Content-Type, Accept, Accept-Language, Origin, User-Agent');
    res.setHeader("Content-Type", "application/json");


    res.writeHead(200);

    knex.select("*").from("domande_questionario").then((rows1) => {   //domande_questionario dipendenti
        rows1 = aggiustaStringa(rows1);

        knex.select("*").from("dipendenti").then((rows2) => {
            rows2 = aggiustaStringa(rows2);

            fileModello = fileModello.replace('"rimpiazzare"', rows1);
            fileModello = fileModello.replace('"scambiare"', rows2);

            res.end(fileModello);
        });
    });
});


app.post("/", (req, res) => {
    let body = "";

    res.setHeader('Access-Control-Allow-Headers', 'Accept,Accept-Language, Content - Language, Content - Type');

    req.on('data', chunk => {
        body += chunk;
    });

    req.on('end', () => {
        console.log(body);
        res.writeHead(200);
        res.end('ricevuto');
    });
});



app.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
    fs.readFile(percorsoFileModello, 'utf8', (err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        //console.log(data);
        fileModello = data;
    });
});


function aggiustaStringa(contenuto) {
    contenuto = JSON.stringify(contenuto);
    contenuto = contenuto.substring(1, contenuto.length - 1);
    return contenuto;
}