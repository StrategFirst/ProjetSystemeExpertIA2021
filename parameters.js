class ParameterError extends Error {
	constructor(info) {
		super(`Your parameter got something wrong ! Details : ${info}`);
	}
}

try {
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
		} else
		if( process.argv[i] == '-bf' || process.argv[i] == '--basedefait' ) {
			process.data.basedefait = require( process.argv[i+1] );
		} else
		if( process.argv[i] == '-c' || process.argv[i] == '--cible' ) {
			process.data.target = process.argv[i+1];
		} else
		if( process.argv[i] == '-v' || process.argv[i] == '--valeurcible' ) {
			process.data.value = process.argv[i+1];
			if( process.data.value.match( /(true)|(false)/ ) ) process.data.value = (process.data.value == 'true'); else
			if( process.data.value.match( /(-?)([0-9]+)/ ) ) process.data.value = (parseInt(process.data.value));
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
} catch( err ) {
	console.error( err );
	console.trace( err );
	process.exit( 2 );
}