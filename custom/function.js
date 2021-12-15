// Retourne une copie du tableau, avec chaque élément unique, n'a pas besoin de paramètre et n'altère pas le tableau d'origine
Array.prototype.uniq = function () { return [... new Set(this)]; }

// Retourne un booléen en fonction de si l'élément fourni en paramètre est présent dans la liste ne prend pas d'autre paramètre et n'altère pas le tableau
Array.prototype.contains = function (element) { return this.indexOf(element) !== -1; }