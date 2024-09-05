// abrir un archivo con extensión json llamado "boja.json",  
// leer el contenido, y guardar el último registro en una variable llamada ultimo.
// abrir un archivo llamado "ultimo.json", lee y guarda el último registro en una variable llamada anterior.
// si son iguales, la variable respuesta = "Sin novedad".
// si son distintos, respuesta = "hay un BOJA nuevo", y copia/guarda el fichero boja.json como ultimo.json

// Importar el módulo necesario
const fs = require('fs').promises;
const leerFichero = require('./leerFichero.js');

// función para leer el contenido de los ficheros
function comparaGuarda(file1, file2) {

  // Leer el archivo último
  var ultimoN = leerFichero.leerFichero(file1);
  console.log('ultimo ', ultimoN);

  // leer también el anterior
  var anteriorN = leerFichero.leerFichero(file2);
  console.log('anterior ', anteriorN);

  console.log((ultimoN[0] === anteriorN[0]));
  // compara
  if (ultimoN[0] === anteriorN[0]) {
    var respuesta = ["Sin novedad.", ultimoN[0]];
  } else {
    var respuesta = ["hay un BOJA nuevo: ", ultimoN[0]];

    // actualiza el fichero anterior.json que ahora debe contener también el nº new

    try {
      fs.copyFile(file1, file2);
      console.log('Archivo copiado exitosamente.');
    } catch (error) {
      console.error('Error al copiar el archivo.', error);
    }
  }  // fin del else
  return respuesta;

} // fin function

//console.log(comparaGuarda('boja.json', 'ultimo.json'));

module.exports.comparaGuarda = comparaGuarda;
