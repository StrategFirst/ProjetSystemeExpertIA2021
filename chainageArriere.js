
function recursChainageArriere( connaissance , regles , reglesUtilisee , faitObjectif ) {
	// On ne conserve dans les objectifs que les fait qui ne sont pas des connaissances
	faitObjectif = faitObjectif.filter( fait => connaissance[ fait.cle ] === undefined );
	if( faitObjectif.length == 0 ) {
		console.log( console.color.lime , 'V' , console.color.grey , 'Succès solution trouvé !' , console.color.reset );
		return true;
	}

	// Pour chacune des règles
	for(let i=0 ; i<reglesUtilisee.length ; i++) {
		// Si nous ne l'avons pas encore utilisée
		if( ! reglesUtilisee[i] ) {

			// Et que cette règle contribue à notre recherche
			if(	regles[i].alors.some( element => faitObjectif.some( target => { return target.cle == element.cle && target.valeur == element.valeur })) ) {
				console.debug('Descente sur la',i,'ème règle.');
				// Alors on va chercher si on trouve recursivement une solution
				// /!\ On va dupliquer les tableau pour éviter d'éditer les mêmes
				// connaissance identique
				// regles identique
				let reglesUtilisee_next = reglesUtilisee.clone();
				let faitObjectif_next = faitObjectif.clone();

				reglesUtilisee_next[i] = true;
				faitObjectif_next = faitObjectif_next
					// Retrait ancien
					.filter( fait => regles[i].alors.every( conclusion => conclusion.cle != fait.cle ) );
					// Ajout des nouveaux
					faitObjectif_next.push( ... regles[i].si );
				
				let result = recursChainageArriere( connaissance , regles , reglesUtilisee_next , faitObjectif_next );
				// Si cette branche était nous as trouvé une solution on s'arrête
				if( result ) {
					console.info( console.color.yellow , '-' , console.color.grey , `Règles utilisées :` , console.color.darkgrey , regles[i] ,  console.color.reset );
					return true;
				}
				// Sinon on continu de chercher d'autre règle qui nous fournisse la solution
			}
		}
	}

	// si nous sommes ici c'est qu'aucune règles nous a permit d'avoirs la solution on s'arrête donc

	console.debug( console.color.red , 'X' , console.color.grey , 'Backtrack suite à l\'échec' , console.color.reset );
	return false;

}
/* Affichage état initial : */
console.info();
console.info( console.color.white , 'Base de fait :' , console.color.reset );
Object.entries( process.data.basedefait ).forEach( ([cle,valeur]) => {console.info( console.color.white , '•' , console.color.lime , `${cle}`.padEnd(25) , console.color.grey , '=' ,  console.color.blue , `${valeur}` , console.color.reset )} );


const resultat = recursChainageArriere( 
	process.data.basedefait ,
	process.data.regles ,
	process.data.regles.map( () => false ), 
	[ { cle : process.data.target , valeur : true } ] );

if( ! resultat ) {
	console.log( 'Le fait demander n\'est pas obtenable' );
}