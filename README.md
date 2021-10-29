# IA_Projet_2021
Projet D'IA pour le S1 du M1 informatique

### Structure du fichier `regles.json` :
Une liste d'objet, chacun contenant deux attributs : `si` et `alors` 
qui sont réciproquement les prémisses et les conclusions pour chaque règle.

Tous deux contiennent une liste non vide d'un ou plusieurs éléments,
chaque élément est un objet avec comme champs :
   - `cle` : contient le nom de la variable
   - `valeur` : contient la valeur attendu ( si prémisse ) ou obtenu ( si conclusion )
   - `not` ( optionnel ) : un booleen
      - Dans une prémisse: si et seulement si `true` le champs doit être de valeur différente à celle indiquer 
	  - Dans une conclusion : inutilisé