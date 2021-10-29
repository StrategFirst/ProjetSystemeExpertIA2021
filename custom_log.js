const logger = {
	add: (iteration,cle,valeur) => console.log( ` ${'\033[1;32m'}[${iteration}] ${'\033[0;97m'}- ${'\033[92m'}${cle} ${'\033[37m'}a été définie à ${'\033[96m'}${valeur} ${'\033[0m'}`),

	error: (iteration,cle,oldVal,newVal) => console.error( ` ${'\033[1;31m'}[${iteration}] ${'\033[0;97m'}- ${'\033[91m'}${cle} ${'\033[37m'}a déjà été définie à ${'\033[96m'}${oldVal} ${'\033[37m'}mais devrais être redéfinie à ${'\033[91m'}${newVal}`),

	end: (connaissance,newListe) => {
		console.log(`${'\n\033[97m'} Liste des fait finaux : `);
		Object.entries(connaissance).forEach( ([cle,valeur]) => {if(valeur !== null){console.log( ` ${'\033[0;97m'}• ${'\033[92m'}${cle} ${'\033[37m'}= ${'\033[95m'}${valeur}${newListe[cle]?'\033[93m [New !]':'\033[37;3m Défaut'}${'\033[0m'}` )}} )
	}
};

module.exports = logger;