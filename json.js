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

//------------------------------------------------------------------------------------------------------

function settaHeader(res) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,OPTIONS,POST');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin, Content-Type, Accept, Accept-Language, Origin, User-Agent');
    res.setHeader("Content-Type", "application/json");

    res.writeHead(200);
    return res;
}

function aggiustaFileDaMandare(file, contenuto1, contenuto2, res) {
    file = file.replace("rimpiazzare", JSON.stringify(contenuto1));
    file = file.replace("scambiare", JSON.stringify(contenuto2));
    res.end(file);
    return fileVuoto;
}

function ritornaDatiDaDatabase(nomeTabella, whereColonna, whereParametro, whereNonNullo) {
    console.log("dentro");
    return knex.select("*").from(nomeTabella).where(whereColonna, whereParametro).whereNotNull(whereNonNullo).orderBy('id', 'asc');
}

function ritornaValutazioniTE(paramIdQuestionario, paramIdValutatore) {
    return knex.select("*").from("valutazione_te").where("id_questionario", paramIdQuestionario).where("id_valutatore", paramIdValutatore);
}

//------------------------------------------------------------------------------------------------------

//manda le domande del questionario scelto e i dipendenti
app.get("/questionario/:id", (req, res) => {
    res = settaHeader(res);

    ritornaDatiDaDatabase("domande_questionario", "id_questionario", req.params.id, "id").then((rows1) => {
        ritornaDatiDaDatabase("dipendenti", true, true, "responsabile").then((rows2) => {
            fileModello = aggiustaFileDaMandare(fileModello, rows1, rows2, res);
            console.log("primo get");
        });
    });
});

//restituisce i dipendenti e le testate, usato per controllare
//chi tra i dipendenti ha fatto o no un determinato questionario
app.get('/valutatore/:id', (req, res) => {
    res = settaHeader(res);

    ritornaDatiDaDatabase("dipendenti", true, true, "responsabile").then((dipendenti) => {
        ritornaValutazioniTE(req.params.id, null).then((testate) => {
            fileModello = aggiustaFileDaMandare(fileModello, testate, dipendenti, res);
            console.log("secondo get");
        });
    });
});


//restituisce i questionari
app.get('/init', (req, res) => {
    res = settaHeader(res);

    ritornaDatiDaDatabase("questionario", true, true, "id").then((oggetto) => {
        res.end(JSON.stringify(oggetto));
    });
});

//manda solo i responsabili
app.get('/prendiValutatori', (req, res) => {
    res = settaHeader(res);

    ritornaDatiDaDatabase("dipendenti", "responsabile", null, "id").then((valutatori) => {
        res.end(JSON.stringify(valutatori));
    });
});

//manda le testate di valutazione fatte da un responsabile sui suoi sottoposti,
//sull'interfaccia si potranno vedere i dipendenti con scritto se sono gia stati valutati dal responsabile
app.get('/v/:responsabile/:idV/:idQ', (req, res) => {
    res = settaHeader(res);

    ritornaDatiDaDatabase("dipendenti", "responsabile", req.params.responsabile, "id").then((dipendenti) => {
        ritornaValutazioniTE(req.params.idQ, req.params.idV).then((testate) => {
            fileModello = aggiustaFileDaMandare(fileModello, testate, dipendenti, res);
            console.log("terzo get");
        });
    });
});

app.get('/prendiRiposte/:idTE/:idQuestionario', (req, res) => {
    res = settaHeader(res);

    ritornaDatiDaDatabase("domande_questionario", "id_questionario", req.params.idQuestionario, "id").then((rows1) => {
        console.log(rows1);
        ritornaDatiDaDatabase("valutazione_de", "id_te", req.params.idTE, "id").then((rows2) => {
            fileModello = aggiustaFileDaMandare(fileModello, rows1, rows2, res);
            console.log("get per l'admin");
        });
    });
});

//mette la testata e le risposte alle varie domande di un questionario nel database
app.post("/", (req, res) => {
    let body = "";

    res.setHeader('Access-Control-Allow-Headers', 'Accept,Accept-Language, Content - Language, Content - Type');
    res = settaHeader(res);

    req.on('data', chunk => {
        body = body + chunk;
    });

    req.on('end', () => {
        body = JSON.parse(body);
        console.log(body);
        knex.insert({ data: body.data, tipo: body.tipo, id_dipendente: body.id_dipendente, id_valutatore: body.id_valutatore, id_questionario: body.id_questionario }).into("valutazione_te").returning('id').then((result) => {
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
        res.end("true");
    });
});