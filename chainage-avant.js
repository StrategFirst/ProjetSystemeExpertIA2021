/*
ListeRegle : [ 
	{ 
		si: [ x, y, z, ... ],
		alors: [ a, b, c, ...]
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
	let dejaUtilise = ListeRegle.map(k=>false);
	while( auMoinsUneRegle && dejaUtilise.some(k=>!k) ) {
		console.log(dejaUtilise);
		auMoinsUneRegle = false;
		for(let i in ListeRegle) {
			if( !dejaUtilise[+i] ) {
				const regle = ListeRegle[i];
				let applicable = true;
				for(let p of regle.si) {
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
					for(let c of regle.alors ) {
						BaseFait.push(c);
						if(c == objectif) {
							objectifAtteind = true; 
						}
					}
					dejaUtilise[+i] = true;
				}
			}
		}
	}
	return {
		objectifAtteind,
		BaseFait
	};
}

module.export = chainageAvant;

console.log(
	chainageAvant(
		[
			{
				si: [1, 2, 3],
				alors: [4]
			},
			{
				si: [2, 5],
				alors: [6]
			},
			{
				si: [7, 4],
				alors: [6]
			},
			{
				si: [1],
				alors: [8]
			},
			{
				si: [2],
				alors: [3]
			},
			{
				si: [6, 8],
				alors: [9]
			},
			{
				si: [7],
				alors: [2]
			},
			{
				si: [8, 7],
				alors: [6]
			}
		],
		[7, 1],
		9
	)
);
