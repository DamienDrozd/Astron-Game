export {ennemimove}

function ennemimove(ennemi){// fonction qui permet a chaque entité ennemie d'avoir un pattern de deplacement
    for (var i = 0; i < ennemi.length; i++){ //boucle pour tester chaque ennemie
        if (ennemi[i].time < 500) { 
            ennemi[i].speedX = 1; //deplacement de l'ennemie vers la droite
            ennemi[i].time = ennemi[i].time + 1;
        } else if (ennemi[i].time > 500 && ennemi[i].time < 1000) {
            ennemi[i].speedX = -1; //depalacement de l'ennemie vers la gauche
            ennemi[i].time = ennemi[i].time + 1
        } else if (ennemi[i].time > 1000) {
            ennemi[i].time -= 1000; // reset l'intervalle de temps du pattern
        }
        if (ennemi[i].image == "EnnemiFlying"){ // ennemie volant
            ennemi[i].speedY = 0 //pas de gravité
        }
    }
    return ennemi
    
}
