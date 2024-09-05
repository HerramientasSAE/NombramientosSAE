// Un código node js para abrir un archivo con extensión json llamado "boja.json",
// lee el contenido, y guardar el último registro en una variable llamada ultimo.


// Importar el módulo necesario
const fs = require('fs');


function leerFichero(file) {
  // Leer el archivo de forma SINCRONA
  let archivo = fs.readFileSync(file, 'utf-8');
  // Parsear los datos a un objeto JSON
  let json = JSON.parse(archivo);
  // Obtener el último registro del objeto JSON
  let ultimo = json;

  // Mostrar el último registro por consola
  var ultimoN = ultimo.rows[ultimo.rows.length - 1];
  //console.log(file, ultimoN);
  return ultimoN;
}


//console.log(leerFichero('boja.json'));

module.exports.leerFichero = leerFichero;
