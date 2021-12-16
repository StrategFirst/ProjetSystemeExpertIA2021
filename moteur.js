// Récupération des paramètres
require('./parameters.js');

// Implémentation de méthode custom pour factorisé le code :
require('./custom/function.js');
require('./custom/log.js');

// Vérification de la cohérence des règles
require('./coherence.js');

// Lancement résolution
if( process.data.target && process.data.value )
	require('./chainageArriere.js');
else
	require('./chainageAvant.js');
