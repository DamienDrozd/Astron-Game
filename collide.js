import{dieanim} from './main.js'
import{testcollide} from './testcollide.js';
export{collide}


var chute = false
// Detects collision between two objects/entities
function collide(timerfall, jump, walljumptimer, player, platforme, nbjump, piegepik, ennemi, ammo, myGameArea, coins, score) {
    // Testing the collision between the coins and the players, then adds a score point
    for (var i = 0; i < coins.length; i++) { // Loop to test all of the game's coins
        var cScore = testcollide(player, coins[i]) // Call the testcollide function
        if (cScore != null) { // Verifies that the collision isn't inexistant
            coins.splice(i, 1) // splide to retract the coin object from the board and stop displaying it
            score += 10 // Adds a point to the score
            var audio = new Audio('sprite\\Audio\\PickCoin.wav'); // Creates the audio variable
            audio.play(); // Starts an audio when the player hits the coins
        }
    }
    // ------------------ Test the collision between the platform and the enemy --------------------
    for (var i = 0; i < platforme.length; i++) {
        for (var y = 0; y < ennemi.length; y++) {
            var collideEnnemyplatform = testcollide(ennemi[y], platforme[i])
            if (collideEnnemyplatform == "gauche") { // Tests if it collides on left
                ennemi[y].time = 500; // Between 500 and 1000 the enemy moves to the right
            }
            if (collideEnnemyplatform == "droite") {
                ennemi[y].time = 0; // Between 0 and 499 the enemy moves to the left
            }
            if (collideEnnemyplatform == "bas") {
                ennemi[y].speedY = 0; // Resets the Y speed (gravity) of the enemy when colliding with the ground
            }
        }
        var collidepos = testcollide(player, platforme[i])
        if (collidepos == "bas") { // Player hits the ground
            chute = true // He can fall
            player.y = platforme[i].y - player.height + 1; // Player is stuck above ground
            timerfall = 0 // Fall timer is reset
            nbjump = 0 // Jump number is reset
            // jump = false
            
            player.accumulationY = 0
            
            
            if (walljumptimer > 0) {
                walljumptimer = 0
            }
        }
        if (collidepos == "haut") {
            player.y = platforme[i].y + platforme[i].height + 1; // Player cannot get inside the object
            
            
            console.log(player.speedY )
            if (player.speedY<0){
                timerfall = 0
                player.speedY = 0
                player.accumulationY = 0    
            }
            console.log(player.speedY )
            
            
        }
        if (collidepos == "gauche") {
            player.x = platforme[i].x - player.width; // Player cannot get inside the object
            if (player.speedX > 0) {
                player.speedX = 0
                // player.accumulationX = 0
            }
        }
        if (collidepos == "droite") {
            player.x = platforme[i].x + platforme[i].width; // Player cannot get inside the object
            if (player.speedX < 0) {
                player.speedX = 0
                // player.accumulationX=0
            }
        }
    }
    // Tests player/enemy collisions
    for (var i = 0; i < ennemi.length; i++) {
        var collideEnnemy = testcollide(player, ennemi[i]) // The program tests the collisions between the player and the enemy
        if (collideEnnemy != null) {
            requestAnimationFrame(dieanim) // Starts death animation
        }
    }
    // Tests player/trap collisions
    for (var i = 0; i < piegepik.length; i++) {
        var pikPik = testcollide(player, piegepik[i]) // The program tests the collisions between the player and the traps
        if (pikPik != null) {
            requestAnimationFrame(dieanim) // Starts death animation
        }
    }


    // Tests enemy/trap collisions
    for (var i = 0; i < ennemi.length; i++) {
        for (var y = 0; y < piegepik.length; y++) { // The program tests the collisions between the enemy and the traps
            if (testcollide(ennemi[i], piegepik[y]) != null) {
                ennemi.splice(i, 1) // Deletes the enemy
                var audio = new Audio('sprite\\Audio\\Hit2.wav');
                audio.play();
            }
        }
    }
    // Tests projectile/enemy collisions
    for (var i = 0; i < ennemi.length; i++) {
        for (var y = 0; y < ammo.length; y++) { // The program tests the collisions between the enemy and the projectiles
            var ammoHit = testcollide(ammo[y], ennemi[i])
            if (ammoHit != null) {
                ennemi.splice(i, 1) // Deletes the enemy
                ammo[y].speedX = 0
                ammo.splice(y, 1) // Deletes the projectile
                score += 3 // Score goes up
                
                var audio = new Audio('sprite\\Audio\\Hit1.wav');
                audio.play();
                break
            }
        }
    }
    // Tests projectile/platform collisions
    for (var i = 0; i < platforme.length; i++) {
        for (var y = 0; y < ammo.length; y++) {
            var ammoWall = testcollide(ammo[y], platforme[i]) // The program tests the collisions between the platforms and the projectiles
            if (ammoWall != null) {
                ammo.splice(y, 1) // Deletes the projectiles
            }
        }
    }

    // Collision of projectiles and the screen border
    for (var i = 0; i < ammo.length; i++) {
        if (ammo[i].x > myGameArea.canvas.width && ammo[i].x > 0 || ammo[i].x < myGameArea.canvas.width && ammo[i].x < 0 || ammo[i].y > myGameArea.canvas.height && ammo[i].y > 0 || ammo[i].y < myGameArea.canvas.height && ammo[i].y < 0) {
            ammo.splice(i, 1) // Deletes the projectiles
        }
    }

    if (chute == false && timerfall == 0) {
        timerfall++
    }
    chute = false
    return [timerfall, nbjump, jump, walljumptimer, player, platforme, piegepik, ennemi, ammo, coins, score]
}