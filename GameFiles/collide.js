import{dieanim} from './main.js'
import{testcollide} from './testcollide.js';
export{collide}


var chute = false
//fonction qui permet de detecter une collision entre deux objets/entités
function collide(timerfall, jump, walljumptimer, player, platforme, nbjump, piegepik, ennemi, ammo, myGameArea, coins, score) {
    // test de la collision pièce/joueurs et ajout de point au score
    for (var i = 0; i < coins.length; i++) { //boucle pour tester toutes les pièces du jeu
        var cScore = testcollide(player, coins[i]) //appel de la fonction testcollide
        if (cScore != null) { //verifier que que la collision n'est pas inexistante
            coins.splice(i, 1) //splice pour retirer l'objet coins en question du tableau et donc ne plus l'afficher
            score += 10 // ajout de point au score
            var audio = new Audio('sprite\\Audio\\PickCoin.wav'); //création de la variable du son
            audio.play(); //lance un sond quand le joueur touche la pièce
        }
    }
    // ------------------test de la collision platforme/ennemi--------------------
    for (var i = 0; i < platforme.length; i++) {
        for (var y = 0; y < ennemi.length; y++) {
            var collideEnnemyplatform = testcollide(ennemi[y], platforme[i])
            if (collideEnnemyplatform == "gauche") { // test si collision à gauche
                ennemi[y].time = 500; //intervalle entre 500 à 1000 l'ennemie se dirige a droite
            }
            if (collideEnnemyplatform == "droite") {
                ennemi[y].time = 0; //intervalle de 0 à 499 ou l'ennemie se dirige a gauche
            }
            if (collideEnnemyplatform == "bas") {
                ennemi[y].speedY = 0; // remise à 0 de la vitesse en Y (gravité) de l'ennemie quand il rentre en contact avec le sol
            }
        }
        var collidepos = testcollide(player, platforme[i])
        if (collidepos == "bas") {
            chute = true
            player.y = platforme[i].y - player.height + 1;
            timerfall = 0
            nbjump = 0
            //jump = false
            player.accumulationY = 0
            if (walljumptimer > 0) {
                walljumptimer = 0
            }
        }
        if (collidepos == "haut") {
            player.y = platforme[i].y + platforme[i].height + 1;
            timerfall = 40
            player.speedY = 0
        }
        if (collidepos == "gauche") {
            player.x = platforme[i].x - player.width;
            if (player.speedX > 0) {
                player.speedX = 0
                // player.accumulationX = 0
            }
        }
        if (collidepos == "droite") {
            player.x = platforme[i].x + platforme[i].width;
            if (player.speedX < 0) {
                player.speedX = 0
                // player.accumulationX=0
            }
        }
    }
    // test de la collision joueur/ennemi
    for (var i = 0; i < ennemi.length; i++) {
        var collideEnnemy = testcollide(player, ennemi[i])
        if (collideEnnemy != null) {
            requestAnimationFrame(dieanim)
        }
    }
    // test de la collision joueur/piège
    for (var i = 0; i < piegepik.length; i++) {
        var pikPik = testcollide(player, piegepik[i])
        if (pikPik != null) {
            requestAnimationFrame(dieanim)
        }
    }


    // test de la collision ennemi/piège
    for (var i = 0; i < ennemi.length; i++) {
        for (var y = 0; y < piegepik.length; y++) {
            if (testcollide(ennemi[i], piegepik[y]) != null) {
                ennemi.splice(i, 1)
                var audio = new Audio('sprite\\Audio\\Hit2.wav');
                audio.play();
            }
        }
    }
    // test de la collision munition/ennemi
    for (var i = 0; i < ennemi.length; i++) {
        for (var y = 0; y < ammo.length; y++) {
            var ammoHit = testcollide(ammo[y], ennemi[i])
            if (ammoHit != null) {
                ennemi.splice(i, 1)
                ammo[y].speedX = 0
                ammo.splice(y, 1)
                score += 3
                console.log(score)
                var audio = new Audio('sprite\\Audio\\Hit1.wav');
                audio.play();
                break
            }
        }
    }
    // test de la collision munition/platforme
    for (var i = 0; i < platforme.length; i++) {
        for (var y = 0; y < ammo.length; y++) {
            var ammoWall = testcollide(ammo[y], platforme[i])
            if (ammoWall != null) {
                ammo.splice(y, 1)
            }
        }
    }

    //collision des balles avec les bords de l'écran
    for (var i = 0; i < ammo.length; i++) {
        if (ammo[i].x > myGameArea.canvas.width && ammo[i].x > 0 || ammo[i].x < myGameArea.canvas.width && ammo[i].x < 0 || ammo[i].y > myGameArea.canvas.height && ammo[i].y > 0 || ammo[i].y < myGameArea.canvas.height && ammo[i].y < 0) {
            ammo.splice(i, 1)
        }
    }

    if (chute == false && timerfall == 0) {
        timerfall++
    }
    chute = false
    return [timerfall, nbjump, jump, walljumptimer, player, platforme, piegepik, ennemi, ammo, coins, score]
}