let auMoinsUneRegle = true;
let regleDejaUtilise = process.data.regles.map( () => false );

let connaissance = process.data.basedefait.clone();


/* Affichage état initial : */
console.info();
console.info( console.color.white , 'Base de fait :' , console.color.reset );
Object.entries(connaissance).forEach( ([cle,valeur]) => {console.info( console.color.white , '•' , console.color.lime , `${cle}`.padEnd(25) , console.color.grey , '=' ,  console.color.blue , `${valeur}` , console.color.reset )} );


console.debug();
console.debug( console.color.white , 'Itération :' , console.color.reset );
let iteration = 0;
// Tant qu'au moins une règle à été appliquer pour une itération
while( auMoinsUneRegle ) {
	iteration++;
	auMoinsUneRegle = false;
	console.debug( console.color.cyan , `■ Itération ${iteration} : ` , console.color.reset );

	// Pour chacune des règles qui n'ont pas déjà été utilisées
	for(let i=0 ; i<regleDejaUtilise.length ; i++) {
		if( ! regleDejaUtilise[i] ) {

			// Pour chacune des prémisses de la règles on va voir si elle est applicable
			let regleApplicable = true;
			for(let element of process.data.regles[i].si) {
				let premisseValide = false;
				// Si une valeur a été défini pour cette clé
				if( connaissance[ element.cle ] !== undefined ) {

					// On vérifie si la valeur correspond à la condition
					switch( element.operator ) {
						case '>=': premisseValide = ( connaissance[ element.cle ] >= element.valeur ); break;
						case '<=': premisseValide = ( connaissance[ element.cle ] <= element.valeur ); break;
						case '>': premisseValide = ( connaissance[ element.cle ] > element.valeur ); break;
						case '<': premisseValide = ( connaissance[ element.cle ] < element.valeur ); break;
						case '!=': premisseValide = ( connaissance[ element.cle ] !== element.valeur ); break;
						case '==':
						default: premisseValide = ( connaissance[ element.cle ] === element.valeur ); break;
					}

				}

				if( ! premisseValide ) {
					regleApplicable = false;
				}
			}

			// Si la règle est applicable, on mettra à jour la base de connaissances etc
			if( regleApplicable ) {
				console.debug( console.color.yellow , 'Nouvelle règle appliquée : ' , console.color.reset );
				
				auMoinsUneRegle = true;
				regleDejaUtilise[i] = true;

				for(let element of process.data.regles[i].alors) {
					console.debug( console.color.darkcyan , element.cle.padEnd(20) , '➔' , `${element.valeur}`.padStart(10) , console.color.reset );

					if( connaissance[ element.cle ] !== undefined && connaissance[ element.cle ] != element.valeur ) {
						console.warn( console.color.darkyellow , '⚠' , 'Le fait' , console.color.darkgrey , `${element.cle}` , console.color.darkyellow , 'a déjà comme valeur' , console.color.blue , `${connaissance[ element.cle ]}` , console.color.darkyellow , 'mais vous souhaitez mettre la valeur' , console.color.pink , `${element.valeur}` , console.color.darkyellow , 'votre de base de fait avec le jeu de règle comporte des incohérences !' , console.color.reset );
					}
					connaissance[ element.cle ] = element.valeur;
				}
			}


		}
	}
}

/* Affichage résultat : */
console.log();
console.log( console.color.white , 'Résultat :' , console.color.reset );
Object.entries(connaissance).forEach( ([cle,valeur]) => {console.log( console.color.white , '•' , '\033[92m' , `${cle}`.padEnd(25) , console.color.grey , '=' ,  console.color.blue , `${valeur}` , console.color.reset )} );
