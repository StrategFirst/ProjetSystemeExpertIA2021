Array.prototype.uniq = function () { return [... new Set(this)]; }
Array.prototype.contains = function (element) { return this.indexOf(element) !== -1; }