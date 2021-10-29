const logger = {
	add: (iteration,cle,valeur) => console.log( ` ${'\033[1;32m'}[${iteration}] ${'\033[0;97m'}- ${'\033[92m'}${cle} ${'\033[37m'}a été définie à ${'\033[96m'}${valeur} ${'\033[0m'}`),

	error: (iteration,cle,oldVal,newVal) => console.error( ` ${'\033[1;31m'}[${iteration}] ${'\033[0;97m'}- ${'\033[91m'}${cle} ${'\033[37m'}a déjà été définie à ${'\033[96m'}${oldVal} ${'\033[37m'}mais devrais être redéfinie à ${'\033[91m'}${newVal}`)
};

module.exports = logger;