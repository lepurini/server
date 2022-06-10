const fs = require('fs');
const express = require('express');
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
var fileModello, fileVuoto;




app.get("/questionario/:id", (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,OPTIONS,POST');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin, Content-Type, Accept, Accept-Language, Origin, User-Agent');
    res.setHeader("Content-Type", "application/json");

    res.writeHead(200);

    console.log(fileVuoto);
    console.log(fileModello);
    console.log(req.params);

    knex.select("*").from("domande_questionario").where("id_questionario", req.params.id).then((rows1) => {
        rows1 = aggiustaStringa(rows1);

        knex.select("*").from("dipendenti").then((rows2) => {
            rows2 = aggiustaStringa(rows2);

            fileModello = fileModello.replace('"rimpiazzare"', rows1);
            fileModello = fileModello.replace('"scambiare"', rows2);

            console.log("IU")
            res.end(fileModello);
            fileModello = fileVuoto;
        });
    });
})

app.get('/valutatore/:id', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,OPTIONS,POST');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin, Content-Type, Accept, Accept-Language, Origin, User-Agent');
    res.setHeader("Content-Type", "application/json");

    res.writeHead(200);

    knex.select("*").from("dipendenti").then((dipendenti) => {
        dipendenti = aggiustaStringa(dipendenti);
        knex.select("*").from("valutazione_te").where("id_questionario", req.params.id).then((testate) => { 
            testate = aggiustaStringa(testate);

            fileModello = fileModello.replace('"rimpiazzare"', dipendenti);
            fileModello = fileModello.replace('"scambiare"', testate);

            console.log("omaewa");
            res.end(fileModello);
            fileModello = fileVuoto;
        })
    });
});


app.get('/init', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,OPTIONS,POST');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin, Content-Type, Accept, Accept-Language, Origin, User-Agent');
    res.setHeader("Content-Type", "application/json");

    res.writeHead(200);

    //console.log(req.params);

    if (req.url == "/init") {
        knex.select("*").from("questionario").then((oggetto) => {
            a = JSON.stringify(oggetto);
            console.log(a);
            console.log("maniconeeeeeeeeeeu");
            /*rows1 = aggiustaStringa(rows1);
    
            knex.select("*").from("dipendenti").then((rows2) => {
                rows2 = aggiustaStringa(rows2);
    
                fileModello = fileModello.replace('"rimpiazzare"', rows1);
                fileModello = fileModello.replace('"scambiare"', rows2);
    
                console.log("IU")
                res.end(fileModello);
            });*/
            res.end(a);
        });
    }

    /*if (req.url == "/questionario/:id") {
        console.log("cioa");
        knex.select("*").from("domande_questionario").where("id_questionario", req.params.id).then((rows1) => {
            rows1 = aggiustaStringa(rows1);

            knex.select("*").from("dipendenti").then((rows2) => {
                rows2 = aggiustaStringa(rows2);

                fileModello = fileModello.replace('"rimpiazzare"', rows1);
                fileModello = fileModello.replace('"scambiare"', rows2);

                console.log("IU")
                res.end(fileModello);
            });
        });
    }*/
});





app.post("/", (req, res) => {
    let body = "";

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,OPTIONS,POST');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin, Content-Type, Accept, Accept-Language, Origin, User-Agent');
    res.setHeader("Content-Type", "application/json");
    res.setHeader('Access-Control-Allow-Headers', 'Accept,Accept-Language, Content - Language, Content - Type');

    res.writeHead(200);

    req.on('data', chunk => {
        //console.log(chunk);
        //body += chunk;
        body = body + chunk;
    });

    req.on('end', () => {
        body = JSON.parse(body);
        console.log(body);
        knex.insert({ data: body.data, tipo: body.tipo, id_dipendente: body.id_dipendente, id_valutatore: null, id_questionario: body.id_questionario }).into("valutazione_te").returning('id').then((result) => {
            let id = result[0].id;
            body.risposteDomande.forEach(element => {
                knex.insert({ id_te: id, id_domanda: element.id_domanda, note: element.nota, punteggio: element.punteggio }).into("valutazione_de").then(() => {
                });
            });
            body.domFinali.forEach(element => {
                knex.insert({ id_te: id, id_domanda: element.id_domanda, note: element.nota, punteggio: null }).into("valutazione_de").then(() => {
                });
            });
        });
        // res.writeHead(200);
        // res.end('ricevuto');

        res.end("true");
    });
});



app.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
    fs.readFile(percorsoFileModello, 'utf8', (err, data) => {
        if (err) {
            console.log(err);
            return;
        }

        fileVuoto = fileModello = data;
    });
});


function aggiustaStringa(contenuto) {
    contenuto = JSON.stringify(contenuto);
    contenuto = contenuto.substring(1, contenuto.length - 1);
    return contenuto;
}