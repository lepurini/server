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


/*
//restituisce le domande di un questionario e i dipendenti
app.get("/questionario/:id", (req, res) => {
    /*res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,OPTIONS,POST');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin, Content-Type, Accept, Accept-Language, Origin, User-Agent');
    res.setHeader("Content-Type", "application/json");

    res.writeHead(200);*/
/*
    res = settaHeader(res);

    /*console.log(fileVuoto);
    console.log(fileModello);
    console.log(req.params);*/
/*
    knex.select("*").from("domande_questionario").where("id_questionario", req.params.id).then((rows1) => {
        rows1 = aggiustaStringa(rows1);

        knex.select("*").from("dipendenti").whereNotNull("responsabile").orderBy('id', 'asc').then((rows2) => {
            rows2 = aggiustaStringa(rows2);
            /*console.log("dfsdf");
            var rows2; 
            ritornaDipendenti((da) =>{
                console.log("pppppp");
                console.log(rows2);
                rows2 = aggiustaStringa(da);
            })*/
/*var rows2;
 
ritornaDipendenti().then((da) => {
    console.log("poiuopiu")
    console.log(da)
    console.log("poiuopiu")
    rows2 = aggiustaStringa(da);
    console.log(da)*/
/*
            console.log(rows2);

            console.log("llllll");
            //fileModello = fileModello.replace("\"rimpiazzare\"", rows1);
            //fileModello = fileModello.replace("\"scambiare\"", rows2);
            fileModello = aggiustaFileDaMandare(fileModello, rows1, rows2);


            console.log("IU");
            res.end(fileModello);
            fileModello = fileVuoto;
        });
    });
});

//restituisce i dipendenti e le testate, usato per controllare chi ha fatto o no i questionari
app.get('/valutatore/:id', (req, res) => {
    /*res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,OPTIONS,POST');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin, Content-Type, Accept, Accept-Language, Origin, User-Agent');
    res.setHeader("Content-Type", "application/json");

    res.writeHead(200);*/
/*
    res = settaHeader(res);

    //console.log(1)

    knex.select("*").from("dipendenti").orderBy('id', 'asc').whereNotNull("responsabile").then((dipendenti) => {     /*.where("responsabile",)*/
/*      dipendenti = aggiustaStringa(dipendenti);
      knex.select("*").from("valutazione_te").where("id_questionario", req.params.id).where("id_valutatore", null).then((testate) => {
          testate = aggiustaStringa(testate);
          //console.log(1)
          //var dipendenti// = aggiustaStringa(selezionaDipendenti("responsabile", null));
          //selezionaDipendenti("responsabile", null, (dati) => {
          //console.log(1)
          //dipendenti = aggiustaStringa(dati);
          //})
          //console.log(1)
          //fileModello = fileModello.replace("\"rimpiazzare\"", testate);
          //fileModello = fileModello.replace("\"scambiare\"", dipendenti);
          fileModello = aggiustaFileDaMandare(fileModello, testate, dipendenti);

          console.log("omaewa");
          res.end(fileModello);
          fileModello = fileVuoto;
      });
      //})
  });
});


//restituisce i questionari
app.get('/init', (req, res) => {
  /*res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin, Content-Type, Accept, Accept-Language, Origin, User-Agent');
  res.setHeader("Content-Type", "application/json");

  res.writeHead(200);*/

/*res = settaHeader(res);

//console.log(req.params);

//if (req.url == "/init") {
knex.select("*").from("questionario").then((oggetto) => {
    a = JSON.stringify(oggetto);
    console.log(a);
    console.log("maniconeeeeeeeeeeu");
    /*rows1 = aggiustaStringa(rows1);knex.select("*").from("dipendenti").then((rows2) => {rows2 = aggiustaStringa(rows2);fileModello = fileModello.replace('"rimpiazzare"', rows1);fileModello = fileModello.replace('"scambiare"', rows2);console.log("IU")res.end(fileModello);});*/
/*  res.end(a);
});
//}
});

app.get('/prendiValutatori', (req, res) => {
/*res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,OPTIONS,POST');
res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin, Content-Type, Accept, Accept-Language, Origin, User-Agent');
res.setHeader("Content-Type", "application/json");

res.writeHead(200);*/

/*res = settaHeader(res);

knex.select("*").from("dipendenti").orderBy('id', 'asc').where("responsabile", null).then((valutatori) => {
    valutatori = JSON.stringify(valutatori);
    console.log(valutatori);
    console.log("IUUIIU");
    /*rows1 = aggiustaStringa(rows1);knex.select("*").from("dipendenti").then((rows2) => {rows2 = aggiustaStringa(rows2);fileModello = fileModello.replace('"rimpiazzare"', rows1);fileModello = fileModello.replace('"scambiare"', rows2);console.log("IU")res.end(fileModello);});*/
/*  res.end(valutatori);
})     /*.where("responsabile",)
});


//mette i risultati di un questionario nel database
app.post("/", (req, res) => {
let body = "";

res.setHeader('Access-Control-Allow-Headers', 'Accept,Accept-Language, Content - Language, Content - Type');
res = settaHeader(res);

/*res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,OPTIONS,POST');
res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin, Content-Type, Accept, Accept-Language, Origin, User-Agent');
res.setHeader("Content-Type", "application/json");*/
//res.setHeader('Access-Control-Allow-Headers', 'Accept,Accept-Language, Content - Language, Content - Type');

//res.writeHead(200);
/*
    req.on('data', chunk => {
        //console.log(chunk);
        //body += chunk;
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
        // res.writeHead(200);
        // res.end('ricevuto');

        res.end("true");
    });
});

/*app.get('/v/:responsabile/:id/:idQ', (req, res) => {
    res = settaHeader(res);
    /*res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,OPTIONS,POST');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin, Content-Type, Accept, Accept-Language, Origin, User-Agent');
    res.setHeader("Content-Type", "application/json");

    res.writeHead(200);*/

/*  console.log(1);

  knex.select("*").from("dipendenti").orderBy('id', 'asc').where("responsabile", req.params.responsabile).then((dipendenti) => {     /*.where("responsabile",)*/
/*    dipendenti = aggiustaStringa(dipendenti);
    knex.select("*").from("valutazione_te").where("id_valutatore", req.params.id).where("id_questionario", req.params.idQ).then((testate) => {
        testate = aggiustaStringa(testate);
        console.log(1);
        //var dipendenti// = aggiustaStringa(selezionaDipendenti("responsabile", null));
        //selezionaDipendenti("responsabile", null, (dati) => {
        console.log(1);
        //dipendenti = aggiustaStringa(dati);
        //})
        console.log(1);
        //fileModello = fileModello.replace("\"rimpiazzare\"", testate);
        //fileModello = fileModello.replace("\"scambiare\"", dipendenti);
        fileModello = aggiustaFileDaMandare(fileModello, testate, dipendenti);


        console.log("omaewa");
        res.end(fileModello);
        fileModello = fileVuoto;
    })
    //})
});
});*/



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
