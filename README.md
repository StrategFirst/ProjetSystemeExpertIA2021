# IA_Projet_2021
Projet D'IA pour le S1 du M1 informatique

## Installation
Le seul pré-requis est node.js en version `14.x.x` ou plus, (recommandé `16.13.0`)

## Execution
Une fois le projet télécharger la commande :
`node moteur.js -r ./regles.json` 
vous permettra d'éxécutez le programme, le fichier `regles.json` devant être de la syntaxe suivante :

### Structure du fichier `regles.json` :
Une liste d'objet, chacun contenant deux attributs : `si` et `alors` 
qui sont réciproquement les prémisses et les conclusions pour chaque règle.

Tous deux contiennent une liste non vide d'un ou plusieurs éléments,
chaque élément est un objet avec comme champs :
   - `cle` : contient le nom de la variable
   - `valeur` : contient la valeur attendu ( si prémisse ) ou obtenu ( si conclusion )
   - `operator` ( optionnel ) : une chaine de caractère parmis la liste ci-dessous qui permettra la comparaison entre la clé et la valeur ce hamps est reserve à la partie premisses.
      - `==` (défaut) égalité
	  - `!=` Différence
	  - `>=` Supérrieur ou égale
	  - `>`  Supérrieur strict
	  - `<`  Inférrieur strict
	  - `<=` Inférrieur ou égale

### Paramètres
L'option `-r <nom de fichier>` ou `--regles <nom de fichier>` vous permet de fournir au programme le fichier des règles
elle est obligatoire

L'option `-t {nothing|small|all}` ou `--trace {nothing|small|all}` vous permet de configuer la quantité de log afficher
