const fetch = require('node-fetch');


function buscarNombramientoBoja2(organismoPrincipal, organismoSecundario, numBoja) {
  var hallazgos = [];
  urlCompuesta = 'https://datos.juntadeandalucia.es/api/v0/boja/search?titleSec=2.%20Autoridades%20y%20personal&organisation=Consejer%C3%ADa%20de%20Empleo%2C%20Empresa%20y%20Trabajo%20Aut%C3%B3nomo&type=-&subtitle=2.1.%20Nombramientos%2C%20situaciones%20e%20incidencias&version=-&order_by=id&mode=ASC&format=json&size=0&year=2023&number='+ numBoja;

return fetch(urlCompuesta)
  .then(response => response.json())
  //.then(data => console.log(data));
  .then(data => {
    data.results.forEach(element => {
    resultado = element.summaryNoHtml;
    if(resultado.toLowerCase().includes(organismoSecundario)) {
      hallazgos.push(resultado);}
    if (hallazgos.length<1) {hallazgos.push('Sin novedad.'); }
    });
    console.log("hallazgos: ", hallazgos);
     return hallazgos;
  });
};

/*
a =  buscarNombramientoBoja2('consejería de empleo, empresa y trabajo autónomo', 'servicio andaluz de empleo', 124);
setTimeout (() => {
  console.log((a));
}, 6000);
*/
module.exports.buscarNombramientoBoja2 = buscarNombramientoBoja2;

// console.log(buscarNombramientoBoja('¿es necesario mantener esto?', 'servicio andaluz de empleo', 119));
/////////////////////       ///////////////////////////////////
// función para averiguar el número del último Boja publicado --> pasado a Replit en web --> pasado tb a otro fichero
