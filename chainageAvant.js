let auMoinsUneRegle = true;
let regleDejaUtilise = process.data.regles.map( () => false );

let connaissance = process.data.basedefait;


/* Affichage état initial : */
console.info();
console.info( console.color.white , 'Base de fait :' , console.color.reset );
Object.entries(connaissance).forEach( ([cle,valeur]) => {console.info( console.color.white , '•' , '\033[92m' , `${cle}`.padEnd(25) , console.color.grey , '=' ,  console.color.pink , `${valeur}` , console.color.reset )} );



let iteration = 0;
// Tant qu'au moins une règle à été appliquer pour une itération
while( auMoinsUneRegle ) {
	iteration++;
	auMoinsUneRegle = false;

	// Pour chacune des règles qui n'ont pas déjà été utilisées
	for(let i=0 ; i<regleDejaUtilise.length ; i++) {
		if( ! regleDejaUtilise[i] ) {

			// Pour chacune des prémisses de la règles on va voir si elle est applicable
			let regleApplicable = true;
			for(let element of process.data.regles[i].si) {
				let premisseValide = false;
				// Si une valeur a été défini pour cette clé
				if( connaissance[ element.key ] != undefined ) {

					// On vérifie si la valeur correspond à la condition
					switch( element.operator ) {
						case '>=': valide = ( connaissance[ element.key ] >= element.valeur ); break;
						case '<=': valide = ( connaissance[ element.key ] <= element.valeur ); break;
						case '>': valide = ( connaissance[ element.key ] > element.valeur ); break;
						case '<': valide = ( connaissance[ element.key ] < element.valeur ); break;
						case '!=': valide = ( connaissance[ element.key ] != element.valeur ); break;
						case '==':
						default: valide = ( connaissance[ element.key ] == element.valeur ); break;
					}

				}

				if( ! premisseValide ) {
					regleApplicable = true;
				}
			}

			// Si la règle est applicable, on mettra à jour la base de connaissances etc
			if( regleApplicable ) {
				auMoinsUneRegle = true;
				regleDejaUtilise[i] = true;

				for(let element of process.data.regles[i].alors) {
					connaissance[ element.cle ] = element.valeur;
				}
			}


		}
	}
}

/* Affichage résultat : */
console.log();
console.log( console.color.white , 'Résultat :' , console.color.reset );
Object.entries(connaissance).forEach( ([cle,valeur]) => {console.log( console.color.white , '•' , '\033[92m' , `${cle}`.padEnd(25) , console.color.grey , '=' ,  console.color.pink , `${valeur}` , console.color.reset )} );
