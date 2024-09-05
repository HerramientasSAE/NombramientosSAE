/*    
Este código realiza el seguimiento de nombramientos en SAE publicados en Boja
Cada vez que el servidor express recibe una petición GET a la dirección "/" (index) se realiza un proceso basado en settimeout:
- consulta la API de Boja y descarga la lista de números publicados (graba archivo boja.json).
- compara el último número publicado con el último número revisado (lee último valor de boja.json y ultimo.json). También, actualiza el fichero ultimo.json (copia de boja.json como ultimo.json después de la comprobación).
- Si es distinto, comprueba el contenido de la sección Nombramientos; si encuentra algún nombramiento en Gerencia SAE lo almacena en el fichero hallazgos.json; si no, almacena "Sin novedad".
- Después, el Bot de Telegram publica el/los nuevo nombramiento en el Canal de Telegram XXXX. [ Durante la fase BETA, publica también si no hay nombramientos. Cuando sea versión final, sólo publicará los nombramientos.]
OJO: LA HORA EN REPLIT ESTÁ EN UTC
*/

const leerFichero = require('./leerFichero.js');
const enviaMensaje = require('./sendM.js');
const consultaApi = require('./consultaApi.js');
const comparaGuarda = require('./comparaGuarda.js');
const buscarNombramientoBoja3 = require('./scraperBoja3');
const leerHallazgos = require('./leerHallazgos.js');

var num = 0;

var organismoPrincipal = 'Consejería de Empleo, Empresa y Trabajo Autónomo';
var organismoSecundario = 'servicio andaluz de empleo';

console.log("Index.js en marcha");

const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');

router.get('/', function(req, res) {
  ////////////////////////////////////
  // esta función actualiza el listado de nº-fecha disponible en la Api Boja, y lo guarda en el fichero boja.json
  setTimeout(() => {
    console.log("Primer cron Nombramientos SAE");
    consultaApi.consultaApi();
    console.log("Archivo descargado.");
  }, 500);

  setTimeout(() => {
    console.log('Segundo trabajo de cron Nomb SAE.');
    actualiza = comparaGuarda.comparaGuarda('boja.json', 'ultimo.json');
    console.log(actualiza[0], actualiza[0] == 'hay un BOJA nuevo: ');
    if (actualiza[0] == 'hay un BOJA nuevo: ') {
      enviaMensaje.enviaMensaje(actualiza[0] + actualiza[1]);
    }
  }, 10000);

  setTimeout(() => {
    console.log('Este es un tercer trabajo de cron Nomb SAE.', actualiza[1].toString());

    try {
      novedad = buscarNombramientoBoja3.buscarNombramientoBoja3(organismoPrincipal, organismoSecundario, actualiza[1].toString());
    }
    catch (err) { console.log(err); }
    finally { console.log(3); }
  }, 20000);

  setTimeout(() => {
    console.log('Este es un 4º trabajo de cron Nomb SAE.', actualiza[0]);
    console.log(4, actualiza[0] == 'hay un BOJA nuevo: ');
    novedad = leerHallazgos.leerHallazgos('hallazgos.json');
    if (actualiza[0] == 'hay un BOJA nuevo: ') {
      enviaMensaje.enviaMensaje('Nomb SAE:' + novedad.toString());
    }
  }, 30000);

  ////////////////////////////////////
  res.sendFile(path.join(__dirname, '/index.html'));
});
app.use('/', router);

//if they go to '/lol'
router.get('/lol', function(req, res) {
  res.sendFile(path.join(__dirname, '/lol.html'));
});
app.use('/lol', router);

const PUERTO = process.env.PORT || 3000;
let server = app.listen(PUERTO, function() {
  console.log(`App server is running on port ${PUERTO}`);
  console.log('to end press Ctrl + C');
});


