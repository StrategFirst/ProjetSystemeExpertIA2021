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
$reset"
node moteur.js -r ./ReglesErreur1.json -bf ./BaseDeFait.json -t all
read -n 1
clear

echo -e "
╔===================╗
║  Chaînage avant   ║
║     Erreur 2      ║
║ $blink(suite : [enter])$reset ║
╚===================╝
$reset"
node moteur.js -r ./Regles.json -bf ./BaseDeFaitErreur2.json -t all
read -n 1
clear

echo -e "
╔===================╗
║  Chaînage avant   ║
║                   ║
║ $blink(suite : [enter])$reset ║
╚===================╝
$reset"
node moteur.js -r ./Regles.json -bf ./BaseDeFait.json -t all
read -n 1
clear