const iteration = require('./iteration_chainageAvant.js');
module.exports = (connaissance,regles) => {

	let nbAppliquer = -1;
	let nbIteration = 0;

	while( nbAppliquer != 0) {
		nbIteration++;

		// Récupération des règles applicables
		let applicable = iteration( connaissance , regles );

		// Application des règles 
		for(let ra of applicable) {
			for(let element of regles[ ra ].alors ) {
				if(connaissance[ element.cle] !== null) {
					if(connaissance[ element.cle ] !== element.valeur) {
						console.logger.error(nbIteration,element.cle,connaissance[element.cle],element.valeur);
					} else {

					}
				} else {
					console.logger.add(nbIteration,element.cle,element.valeur);
					connaissance[ element.cle ] = element.valeur;
				}
			}
		}

		// Retrait des règles déjà appliquer
		regles = regles.filter( (_,i) => !applicable.contains(i) );

		nbAppliquer = applicable.length;
	}

	console.logger.end()
}