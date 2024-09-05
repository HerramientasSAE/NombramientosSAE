const puppeteer = require('puppeteer');
const jsdom = require('jsdom');
const https = require('https');

function buscarNombramientoBoja(organismoPrincipal, organismoSecundario, numBoja) {
  var hallazgos = [];
  urlCompuesta = 'https://www.juntadeandalucia.es/eboja/2023/'+ numBoja +'/s52.html';
  (async () => {
    try {
      // Abrimos una instancia del puppeteer y accedemos a la url de google
      const browser = await puppeteer.launch() ;
      const page = await browser.newPage();
      const response = await page.goto(urlCompuesta); //'https://www.google.com/search?q=web+scraping+libros');
      const body = await response.text();
      
      // Creamos una instancia del resultado devuelto por puppeter para parsearlo con jsdom
      const { window: { document } } = new jsdom.JSDOM(body);
    
      // Seleccionamos los títulos y lo mostramos en consola
      document.querySelectorAll('p')
      .forEach(element => {
      // console.log(element.textContent);
        if (element.textContent.toLowerCase().includes(organismoSecundario)){
          nombramientoAnuncio = element.textContent;
          nombramientoURL = element.nextElementSibling.childNodes[1].childNodes[1].href;
          hallazgos.push([nombramientoAnuncio, nombramientoURL]);
        // console.log(hallazgos);
        }
          
        });
        console.log("Hallazgos:", hallazgos.length);
      if (hallazgos.length>0){
        hallazgos.forEach (element =>{
          console.log(element);
        });
      }
      else{
        console.log("Ninguna publicación.");
      }

      // Cerramos el puppeteer
      await browser.close();
    } catch (error) {
      console.error(error);
    }
  })();
  
  return hallazgos;
}

module.exports.buscarNombramientoBoja = buscarNombramientoBoja;