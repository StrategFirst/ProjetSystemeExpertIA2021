const rules = process.data.regles;

// Pour chaque règle A
for(let i=0 ; i<rules.length ; i++) {
	// Pour chaque règle B différente de A
	for(let j=0 ; j<i ; j++) {
		// Pour chacune des conclusions de A et de B
		for(let ir=0 ; ir<rules[i].alors.length ; ir++ ) {
			for(let jr=0 ; jr<rules[j].alors.length ; jr++ ) {
				// Si une conclusion de A et une conclusion de B s'appliquant sur une même clé mais avec des domaines de difinitions disjoints
				if(
					rules[i].alors[ir].cle == rules[j].alors[jr].cle
					&&
					( ! Intersection(
						rules[i].alors[ir],
						rules[j].alors[jr]
					) )
				) {
					/* Affichage d'information */
					console.debug( console.color.grey , `Vérification de deux règles aboutissant sur le fait : ${rules[i].alors[ir].cle}` , console.color.reset);
					// Alors les deux règles (A,B) doivent avoirs chacune une prémisse sur une même clé mais avec des domaines de définitions disjoints
					// et cela, afin d'empécher que l'on puisse attribué deux (ou plus) valeurs différentes a une clé avec un une même base de fait
					let fix = false;
					for(let is=0 ; is<rules[i].si.length ; is++) {
						for(let js=0 ; js<rules[j].si.length ; js++) {
							if(
								rules[i].si[is].cle == rules[j].si[js].cle
								&&
								( ! Intersection(
									rules[i].si[is],
									rules[j].si[js]
								) )
							) {
								fix = true;
								/* Affichage d'information */
								console.debug( console.color.grey ,`Les deux règles ne pourrons pas créé d'incohérence grace au prémisse avec le fait ${rules[i].si[is].cle}` , console.color.reset );
								console.debug();
								break;
							}
						}
						if( fix ) break;
					}
					// Dans le cas contraires on indique qu'il faudra mettre à jour les règles pour ne pas avoir ce problème
					if( ! fix ) {
						console.error('⚠');
						console.error(' Les deux règles suivantes peuvent introduires des problèmes :');
						console.error(` Le fait : ${rules[i].alors[ir].cle} peut être obtenu via ces 2 règles : `);
						console.log( rules[i] , rules[j] );
						console.error(` mais à des valeurs différentes ! Il vous faut donc fixé au moins prémisse qui empêche l'obtentio de ces 2 règles simultanéments. `);
						process.exit(1);
					}
				}
			}
		}
	}
}

function Intersection( A , B ) {	
	// On fixe l'opérateurs s'il n'éxiste pas à l'opérateur par défaut
	if( A.operator == undefined ) A.operator = '==';
	if( B.operator == undefined ) B.operator = '==';

	// Si les deux ne sont pas sur le même ensemble de définition exemple entier et booléen alors peut importe la suite il y n'y a pas d'intersection
	if( (typeof (A.valeur)) != (typeof (B.valeur)) ) return false;

	// La suite dépend du type de valeur parmis les suivants
	switch ( typeof (A.valeur) ) {
		case 'number':
			let min, minInclude, max, maxInclude;
			switch( A.operator ) {
				case '==': min = A.valeur; minInclude = true; max = A.valeur; maxInclude = true; break;
				case '!=': min = A.valeur; minInclude = false; max = A.valeur; maxInclude = false; break;
				case '>=': min = A.valeur; minInclude = true; max = null; maxInclude = null; break;
				case '<=': max = A.valeur; maxInclude = true; min = null; minInclude = null; break;
				case '>': min = A.valeur; minInclude = false; max = null; maxInclude = null; break;
				case '<': max = A.valeur; maxInclude = false; min = null; minInclude = null; break;
			}

			switch( B.operator ) {
				case '==':
				return ( (max == null) || (max==B.valeur && maxInclude) || (max>B.valeur) )
					&&
					( (min == null) || (min==B.valeur && minInclude) || (min<B.valeur) );
				case '>=':
				return ( (max == null) || (max==B.valeur && maxInclude) || (max>B.valeur) );
				case '<=':
				return ( (min == null) || (min==B.valeur && minInclude) || (min<B.valeur) );
				case '>':
				return ( (max == null) || (max>B.valeur) );
				case '<':
				return ( (min == null) || (min<B.valeur) );
				case '!=':
				return (min != B.valeur) || (max != B.valeur) || (maxInclude == false && minInclude == false);
			}
		case 'string':
			// Pour simplifier les chaines de caractères ne seront pas pris en compte dans ce problème
			return false;
		case 'boolean':
			let aT,aF,bT,bF;
			switch( A.operator ) {
				case '==': aT = A.valeur; aF = ! A.valeur; break;
				case '!=': aT = ! A.valeur; aF = A.valeur; break;
				case '>=': aT = true; aF = ! A.valeur; break;
				case '<=': aF = true; aT = ! A.valeur; break;
				case '>': aF = false; aT = ! A.valeur; break;
				case '<': aT = false; aF =   A.valeur; break;
			}

			switch( B.operator ) {
				case '==': bT = B.valeur; bF = ! B.valeur; break;
				case '!=': bT = ! B.valeur; bF = B.valeur; break;
				case '>=': bT = true; bF = ! B.valeur; break;
				case '<=': bF = true; bT = ! B.valeur; break;
				case '>': bF = false; bT = ! B.valeur; break;
				case '<': bT = false; bF =   B.valeur; break;
			}
		return (aT && bT) || (aT && bT);
	}
}
