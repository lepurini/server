const http = require("http");
const fs = require('fs');

const host = 'localhost';
const port = 8000;

//Percorso file con le domande
const fileJSON = "./domande.json";
//variabile che verrà riempita con le domande e spedita
var fileDaMandare;


const requestListener = function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,OPTIONS,POST');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin, Content-Type, Accept, Accept-Language, Origin, User-Agent');


    if (req.method == "GET") {
        res.setHeader("Content-Type", "application/json");

        res.writeHead(200);

        fs.readFile(fileJSON, 'utf8', (err, data) => {
            if (err) {
                console.log(err);
                return;
            }
            console.log(data);
            fileDaMandare = data;
        });
        res.end(fileDaMandare);
    }
    else if (req.method == "POST") {
        
    }
};

//server in ascolto sulla porta 8000
const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});

/*{
    "domande": ["PROBLEM SOLVING", "ORIENTAMENTO AL RISULTATO", "DECISIONE", "COOPERAZIONE", "FLESSIBILITA'", "INNOVAZIONE", "RESISTENZA ALLO STRESS", "IMPATTO"],
    "descrizione": ["aaaa", "bbbb", "cccc", "dddd", "eeee'", "ffff", "gggg", "hhhh"]
}*/