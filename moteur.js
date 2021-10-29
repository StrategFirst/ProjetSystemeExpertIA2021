// Implémentation de méthode custom pour factorisé le code :
require('./custom_function.js');
console.logger = require('./custom_log.js');

// Extrait tous les faits possible à partir d'une liste de règles (au format spécifié dans le README.md )
const get_listeFait = require('./get_listeFait.js');

const chainageAvant = require('./get_chainageAvant.js');

// Récupération des règles dans le fichier regles.json
let regles = require('./regles.json');

let listeFait = get_listeFait( regles);

// Création du tableau de connaissance :
let connaissance = {};
listeFait.forEach( fait => connaissance[fait] = null );

// Pour l'instant la base de fait est généré aléatoirement à partir de la liste complète de fait :
let baseFait = listeFait.filter( () => Math.random() > 0.5 );
for(let fait of baseFait) connaissance[fait] = true;

chainageAvant( connaissance , regles );