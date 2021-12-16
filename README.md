# IA_Projet_2021
Projet D'IA pour le S1 du M1 informatique

Réalisé par Charles SAUVAGNAC, Mathieu TOULON

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

L'option `-bf <nom de fichier.json>` ou `--basedefait <nom de fichier.json>` vous permet de fournir au programme le fichier de base de fait
elle est obligatoire

L'option `-c <nom de fait>` ou `--cible <nom de fait>` vous permet de basculer en chainage arrière afin de savoir si le fait fourni est obtenable ou non

### Code de retour du programme

 0 : En cas de bonne execution

 1 : En cas d'incohérence dans les règles
 
 2 : En cas d'erreur au niveau des paramètres

### Exemples
Des exemples sont disponibles dans le fichier `demo.sh`

Quelques exemples suplémentaires :

- Chainage arrière echec
	```bash
	node moteur.js -r ./exempleRegles.json -bf ./exempleBaseDeFait.json -t all -c alpha -v A
	```

- Chainage arrière réussite
	```bash
	node moteur.js -r ./exempleRegles.json -bf ./exempleBaseDeFait.json -t all -c alpha -v α
	```

- Chainage avant
	```bash
	node moteur.js -r ./exempleRegles.json -bf ./exempleBaseDeFait.json -t all
	```