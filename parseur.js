data= require("./regles.json");


var correspondances=Array(); // tableaux des correspondances [fait,fait2...]
data.forEach(regle => {
    regle.si.forEach( fait => {
        //console.log(fait);
        if(!correspondances.includes(fait))
        {
            correspondances.push(fait);
        }
    });
    regle.alors.forEach(fait=>{if(!correspondances.includes(fait))correspondances.push(fait); })
});

console.log(correspondances);

var regles = data.map(regle=>{
    const toID = fait=>correspondances.indexOf(fait);
    regle.si=regle.si.map(toID);
    regle.alors=regle.alors.map(toID);
    return regle;
})

console.log(regles);

const chainageAvant = require('./chainage-avant.js');
console.log(chainageAvant);