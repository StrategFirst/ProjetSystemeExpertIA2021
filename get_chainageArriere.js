module.exports= (connaissances, baseFait, regles, etat_final)=>{


    if( chainage_arriere(connaissances,baseFait,regles,etat_final,0)){
        console.log("J4AI REUSSI MARTI")
    }


}

function chainage_arriere(connaissances, baseFait, regles, etatObj, it){

    //cas d'arrêt -> règle présente dans la base de fait ou demandable (connaissance[regle]=null)
    console.log("itération "+it);
    if(baseFait.includes(etatObj)){
        return true;
    }
    else   {
        // si il a une règle à developper developpe les règle permmettant d'obtenir l'état 

        //chercher s'il y une règle à développer 

        function filterbyRule (regle){

        return regle.alors.find((elt)=>elt.cle==etatObj)!==undefined;          
    }
        let reglesAdeveloppe = regles.filter(filterbyRule)
        .map(obj=>obj.si.map(rgl=>rgl.cle))
        .flat()
        
        reglesAdeveloppe=reglesAdeveloppe.uniq();
        console.log("regles a developper : " ,reglesAdeveloppe);
        

        //si le tableau de régles à dev n'est pas vide chercher si ces règles ont pu être obtenue à partir de la base de fait
        if(reglesAdeveloppe.length > 0){

        let results = reglesAdeveloppe.map((faitobj)=>{
            return chainage_arriere(connaissances,baseFait,regles,faitobj,it+1)
        })
        
        //regarder s'il y a au moins un elt vrai dans la liste et retourner vrai 
        console.log("résultats pour la regle : ",etatObj, results);
       for(let i=0;i<results.length;i++)
        { 
            if(results[i])
                return true;
        }
        
        return false;
        }
        //sinon c'est un fait demandable -> false
        else return false;
        
    }
    

}

