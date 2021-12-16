#!/bin/bash
clear
# Programme pour démo rapide

blink="\033[5m"
reset="\033[0m"

echo -e $reset

echo -e "
╔===================╗
║  Chaînage avant   ║
║     Erreur 1      ║
║ $blink(suite : [enter])$reset ║
╚===================╝
$reset
≡ node moteur.js -r ./ReglesErreur1.json -bf ./BaseDeFait.json -t all"
node moteur.js -r ./ReglesErreur1.json -bf ./BaseDeFait.json -t all
read -n 1
clear

echo -e "
╔===================╗
║  Chaînage avant   ║
║     Erreur 2      ║
║ $blink(suite : [enter])$reset ║
╚===================╝
$reset
≡ node moteur.js -r ./Regles.json -bf ./BaseDeFaitErreur2.json -t all"
node moteur.js -r ./Regles.json -bf ./BaseDeFaitErreur2.json -t all
read -n 1
clear

echo -e "
╔===================╗
║  Chaînage avant   ║
║                   ║
║ $blink(suite : [enter])$reset ║
╚===================╝
$reset
≡ node moteur.js -r ./Regles.json -bf ./BaseDeFait.json -t all"
node moteur.js -r ./Regles.json -bf ./BaseDeFait.json -t all
read -n 1
clear

echo -e "
╔===================╗
║ Chaînage arrière1 ║
║                   ║
║ $blink(suite : [enter])$reset ║
╚===================╝
$reset
≡ node moteur.js -r ./Regles.json -bf ./BaseDeFait.json -t nothing -c accepté"
node moteur.js -r ./Regles.json -bf ./BaseDeFait.json -t nothing -c accepté
read -n 1
clear

echo -e "
╔===================╗
║ Chaînage arrière2 ║
║                   ║
║ $blink(suite : [enter])$reset ║
╚===================╝
$reset
≡ node moteur.js -r ./Regles.json -bf ./BaseDeFait.json -t small -c accepté"
node moteur.js -r ./Regles.json -bf ./BaseDeFait.json -t small -c accepté
read -n 1
clear

echo -e "
╔===================╗
║ Chaînage arrière3 ║
║                   ║
║ $blink(suite : [enter])$reset ║
╚===================╝
$reset
≡ node moteur.js -r ./Regles.json -bf ./BaseDeFait.json -t all -c accepté"
node moteur.js -r ./Regles.json -bf ./BaseDeFait.json -t all -c accepté
read -n 1
clear
