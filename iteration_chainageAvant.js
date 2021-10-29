// Applique une itération du chainage avant,
// Prend paramètre un objet représentant une liste de connaissance et la liste de règle
// Retourne une liste de nouveau fait obtenu
module.exports = (connaissance,regles) => regles
	// On conserve que les règles applicables
	.map( (regle,id) => ( regle.si.every( premisse => ( ( premisse.not === true ) ? premisse.valeur != connaissance[ premisse.cle ] : premisse.valeur == connaissance[ premisse.cle ] ) ) ) ? id : null )
	// On extrait par la suite les conclusions
	.filter( v => v !== null );