import {} from './main.js';
import {testcollide} from './testcollide.js';
export{playermove}

var stopjump = false
function playermove(timerfall, jump, walljumptimer, nbjump, walljump, player, platforme, myGameArea) { // Player movements

    var testbas = "";
    for (var i = 0; i < platforme.length; i++) { //
        var testbas = testcollide(player, platforme[i])
        if (testbas == "bas") {
            break
        } else {
            testbas = ""
        }
    }

    console.log(nbjump)

    //-------------------------- Manages jumps/double jump --------------------------------------------------
    if (myGameArea.keys && myGameArea.keys[32]) {

        if (testbas == "bas"){
            if (nbjump == 0  && stopjump == false && jump == true) { // First jump
                timerfall++;
                player.accumulationY = -150; // Adds a Y force allowing the jump
                var audio = new Audio('sprite\\Audio\\jump2.wav'); // Jump audio
                audio.play();
                nbjump++ // Jump amount goes up
                timerfall = 1;
                jump = false
                walljumptimer = 0
                stopjump = true
            }
        } else{
        
            if (nbjump == 0 || nbjump == 1 && jump == true && walljump == false) { // Second jump
                var audio = new Audio('sprite\\Audio\\jump2.wav');
                audio.play(); // Jump audio
                player.accumulationY = -160; // Adds a Y force allowing the jump
                timerfall = 1;
                jump = false;
                nbjump++; // Jump amount goes up

                if (nbjump == 1){
                    nbjump++;
                }

                walljumptimer = 0
            }
        }
    } else {

        stopjump = false
        jump = true;
    }
    
    
    // ------------------------------------------- Manage wall jumps ------------------------------------------------
    for (var i = 0; i < platforme.length; i++) { //
        var collidepos = testcollide(player, platforme[i])
        if (collidepos != null) {


            if (player.x + player.width - 3 < platforme[i].x) {


                walljump = true

                if (myGameArea.keys && myGameArea.keys[32] && jump == true) {

                    var audio = new Audio('sprite\\Audio\\DoubleJump.wav'); // Jump audio
                    audio.play();
                    player.accumulationY = -110; // Adds a Y force allowing the jump
                    player.speedX = -20; // Adds a X force allowing the jump
                    timerfall = 1;
                    walljump = false
                    jump = false
                    walljumptimer = 1 // Cooldown timer for X movement after a wall jump
                }
            } else if (player.x + 3 > platforme[i].x + platforme[i].width) {
                walljump = true
                if (myGameArea.keys && myGameArea.keys[32] && jump == true) {
                    var audio = new Audio('sprite\\Audio\\Jump.wav'); // Jump audio
                    audio.play();
                    player.accumulationY = -110; // Adds a Y force allowing the jump
                    player.speedX = 20; // Adds a X force allowing the jump
                    timerfall = 1;
                    walljump = false
                    jump = false
                    walljumptimer = 1 // Cooldown timer for X movement after a wall jump
                }
            } else {
                walljump = false
                player.speedX = 0
            }
        } 
    }

    var test = false;
    for (var i = 0; i < platforme.length; i++) { //
        var collidepos = testcollide(player, platforme[i])
        if (collidepos != null) {
            test = true;
            break
        } 
    }

    if (test == false){
        walljump = false;
    }

    // Increase timers
    if (walljumptimer > 0) {
        walljumptimer++;
    }
    if (timerfall > 0) {
        timerfall++
    }

    player.speedY = player.accumulationY // Increase Y speed depending on the forces applied by the jumps
    var v0 = -player.speedY //+ player.speedX;
    player.speedY = 6 * timerfall / 16.7 + v0 / 16.5 * Math.sin(180) // Calculate the Y speed depending on hourly equations

    if (myGameArea.keys && myGameArea.keys[81]) { // If the player presses Q he moves to the left
        if (player.accumulationX > 0) {
            player.accumulationX = 0
        }
        player.accumulationX -= 0.5;// Increase the speed towards the left

    } else if (myGameArea.keys && myGameArea.keys[68]) { // If the player presses D he moves to the right
        if (player.accumulationX < 0) {
            player.accumulationX = 0
        }
        player.accumulationX += 0.5; // Increase the speed towards the right

    } else {
        player.accumulationX = 0
        if (walljumptimer == 0) {
            player.speedX = 0 //---------------------- Remove to get kinetics in jumps -----------------------------------------------------------
        }

    }


    if ((myGameArea.keys && myGameArea.keys[81]) && (myGameArea.keys && myGameArea.keys[68])) {
        
    }
    if (walljumptimer == 0 || walljumptimer > 15) { 
        player.speedX += player.accumulationX 
    } else {
        player.accumulationX = 0
    }
    if (player.speedX > 5) {
        player.speedX = 5
    }
    if (player.speedX < -5) {
        player.speedX = -5
    }
    //---------------------------------------------------------- Manage the sprites depending on the player's actions---------------------------------------------------------
    if (player.speedX > 0) {
        player.image = "PlayerRunningRight"
    } else if (player.speedX < 0) {
        player.image = "PlayerRunningLeft"
    } else {
        player.image = "PlayerStandingFace"
    }
    if (timerfall > 1) {
        if (player.speedX > 0) {
            player.image = "PlayerJumpRight"
        } else if (player.speedX < 0) {
            player.image = "PlayerJumpLeft"
        }
    }
    for (var i = 0; i < platforme.length; i++) { // Allows to prevent the player from glitching into walls
        var collidepos = testcollide(player, platforme[i]) // Tests the collision between players and obstacles
        if (collidepos != null) {
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
    }
    return [timerfall, jump, walljumptimer, nbjump, walljump, player, platforme]
}