module.exports = (regles) => regles
	.map( regle => 
		regle.si.map( premisse => premisse.cle )
		.concat(
			regle.alors.map( conclusion => conclusion.cle )
		)
	)
	.flat()
	.uniq();