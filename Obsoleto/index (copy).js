// versión anterior, funcional Aunque casi nunca salta, y menos a las 7:00
// puede ser porque usa Replit gratuito, o bien porque el código es regularcito... 
// ...
// cambio a versión basasda en set time out


/*
const cron = require('node-cron');
const leerFichero = require('./leerFichero.js');
const enviaMensaje = require('./sendM.js');
const consultaApi = require('./consultaApi.js');
const comparaGuarda = require('./comparaGuarda.js');
const buscarNombramientoBoja3 = require('./scraperBoja3');
const leerHallazgos = require('./leerHallazgos.js');

var num = 0;
var organismoPrincipal = 'consejería de empleo, empresa y trabajo autónomo';
var organismoSecundario = 'servicio andaluz de empleo';

console.log("Index.js en marcha");
//enviaMensaje.enviaMensaje('Bot desde RepIit: ' + num);
///*********************
cron.schedule('17 * * * *', function() {
    console.log("Prueba 17.");
      });
///*********************

const express = require('express');//Set up the express module
const app = express();
const router = express.Router();
const path = require('path');

router.get('/', function(req, res) {
  ////////////////////////////////////
  // Schedule tasks to be run on the server.
  cron.schedule('0 0 15 * * *', function() {
    console.log("Primer cron");
    consultaApi.consultaApi();  // esta función actualiza el listado de nº-fecha disponible en la Api Boja, y lo guarda en el fichero hoja.json
    console.log("Archivo descargado.");
  });

  //  enviaMensaje.enviaMensaje('Bot desde RepIit: '+num);

  cron.schedule('15 0 15 * * *', function() {
    console.log('Este es un segundo trabajo de cron.');
    actualiza = comparaGuarda.comparaGuarda('boja.json', 'ultimo.json');
    console.log(actualiza[0], actualiza[0] == 'hay un número nuevo: ');
    if (actualiza[0] == 'hay un BOJA nuevo: ') {
      enviaMensaje.enviaMensaje(actualiza[0] + actualiza[1]);
    }
  });

  cron.schedule('30 0 15 * * *', function() {
    console.log('Este es un tercer trabajo de cron.', actualiza[1].toString());
    //if (actualiza[0] == 'hay un número nuevo: ') {
    try {
      novedad = buscarNombramientoBoja3.buscarNombramientoBoja3(organismoPrincipal, organismoSecundario, actualiza[1].toString());
    }
    catch (err) { console.log(err); }
    finally { console.log(3); }
    //}
    //enviaMensaje.enviaMensaje(novedad.toString());
  });

  cron.schedule('45 0 15 * * *', function() {
    console.log('Este es un 4º trabajo de cron.', actualiza[0]);
    console.log(4, actualiza[0] == 'hay un número nuevo: ');
    novedad = leerHallazgos.leerHallazgos('hallazgos.json');
    // if (actualiza[0] == 'hay un número nuevo: ') {
    enviaMensaje.enviaMensaje(novedad.toString());
    //  }
    //  else { console.log(actualiza[0]); }
  });

  ////////////////////////////////////
  res.sendFile(path.join(__dirname, '/index.html'));
});
app.use('/', router);

//if they go to '/lol'
router.get('/lol', function(req, res) {
  res.sendFile(path.join(__dirname, '/lol.html'));
});
app.use('/lol', router);

let server = app.listen(3000, function() {
  console.log('App server is running on port 3000');
  console.log('to end press Ctrl + C');
});
/*    OJO: LA HORA EN REPLIT ESTÁ EN UTC
Este código realiza el seguimiento de nombramientos en SAE publicados en Boja
Cada día, a las 07:00 (05:00 UTC), consulta la API de Boja y descarga la lista de números publicados (graba archivo boja.json).
A las 07:00, compara el último número publicado con el último número revisado (lee último valor de boja.json y ultimo.json). También, actualiza el fichero ultimo.json (copia de boja.json como ultimo.json después de la comprobación).
Si es distinto, comprueba el contenido de la sección Nombramientos; si encuentra algún nombramiento en Gerencia SAE lo almacena en la variable XY. .
A las 07:00, el Bot de Telegram publica el/los nuevo nombramiento en el Canal de Telegram XXXX. [ Durante la fase BETA, publica también si no hay nombramientos. Cuando sea versión final, sólo publicará los nombramientos.]

*/

/*
 * * * * * *
  | | | | | |
  | | | | | day of week
  | | | | month
  | | | day of month
  | | hour
  | minute
  second ( optional )
*/


// no funciona porque las variables que quiero usar NO EXISTEN, son var locales dentro de cada tarea de cron.
// quizás tengamos que usar cron-job.org para mantener despierto el replit. O bien, para cargar