/*
ListeRegle : [ 
	{ 
		premisse: [ x, y, z, ... ],
		conclusion: [ a, b, c, ...]
	}, ...
]
BaseFait : [ a, b, z, k ]
objectif: a | null

avec x, y, z, a, b, c, k des entiers
et si négatifs il signifie non fait
*/
function chainageAvant(ListeRegle, BaseFait, objectif=null) {
	let auMoinsUneRegle = true;
	let objectifAtteind = false;
	while( auMoinsUneRegle && ListeRegle.length>0 ) {
		auMoinsUneRegle = false;
		for(regle of ListeRegle) {
			let applicable = true;
			for(let p of regle.premisse) {
				if(p < 0) {
					//Si fait présent dans la base, mais doit être absent pour la règle
					if( BaseFait.indexOf(-p) != -1) { 
						applicable = false;
						break;
					}
				} else {
					//Si fait absent mais est requis dans la règle
					if( BaseFait.indexOf(p) == -1) {
						applicable = false;
						break;
					}
				}
			}
			if(applicable) {
				auMoinsUneRegle = true;
				for(let c of regle.conclusion ) {
					BaseFait.push(c);
					if(c == objectif) {
						objectifAtteind = true; 
					}
				}
			}
		}
	}
	return {
		objectifAtteind,
		BaseFait
	};
}

