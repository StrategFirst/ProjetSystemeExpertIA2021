class ParameterError extends Error {
	constructor(info) {
		super(`Your parameter got something wrong ! Details : ${info}`);
	}
}

// Création d'un espace pour enregistrer stocker les informations cross fichier
process.data = {};

// Valeur par défaut :
process.data.tracemode = 'all';

// Parcour d'argv pour controller les valeurs
for(let i=0 ; i<process.argv.length ; i++) {
	if( process.argv[i] == '-r' || process.argv[i] == '--regles' ) {
		process.data.regles = require( process.argv[i+1] );
		i++;
	} else
	if( process.argv[i] == '-t' || process.argv[i] == '--traces' ) {
		process.data.tracemode = process.argv[i+1] ;
		i++;
	}
}

// le tracemode doit être parmis :
if( ! process.data.tracemode.match( /(nothing)|(small)|(all)/ ) ) {
	throw new ParameterError(`The only value accepted for tracemode are : nothing / small / all , but ${process.data.tracemode} has been given instead`);
}

// le format des règles doit êtres celui indiquer dans le README
if( ! (
	(process.data.regles instanceof Array) &&
	( process.data.regles.every( regle => (
		regle instanceof Object &&
		regle.si instanceof Array &&
		regle.si.every( premisse => (
			premisse.cle != undefined &&
			premisse.valeur != undefined
		) ) &&
		regle.alors instanceof Array &&
		regle.alors.every( conclusion => (
			conclusion.cle != undefined &&
			conclusion.valeur != undefined &&
			(
				conclusion.operator == undefined ||
				conclusion.operator.match( /(==)|(<=)|(>=)|(!=)|(>)|(<)/ )
			)
		) )
	) ) )
) ) {
	throw new ParameterError(`The given json file must match the syntax given in the README.md file`);
}