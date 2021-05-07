
export {component, myGameArea, camera,  changelevel, scoreboard }
import{updateGameArea} from './main.js';



function component(width, height, color, x, y, image) { // Create an object
    this.width = width; // Object width
    this.height = height; // Object height
    this.x = x; // X coordinates of the object
    this.y = y; // Y coordinates of the object
    this.speedX = 0; // X speed of the object
    this.speedY = 0; // Y speed of the object
    this.speed = Math.abs(this.speedX) + Math.abs(this.speedY)
    this.accumulationX = 0; // Accumulation of speed in X
    this.accumulationY = 0; // Accumulation of speed in Y
    this.color = color;
    this.image = image
    this.time = 0;
    this.affichagex = 0;
    this.affichagey = 0;
    this.update = function() { // Displays the object
        var ctx2 = myGameArea.context;
        ctx2.fillStyle = this.color; // Colour of the object
        if (myGameArea.keys && myGameArea.keys[46]) {
            ctx2.fillRect(this.x, this.y, this.width, this.height); // Displays the object
        }
        if (this.image != null) { // Displays the sprites depending on the size of them
            var ctx = myGameArea.canvas.getContext("2d");
            var img = document.getElementById(this.image);
            if (this.image == "BulletRight" || this.image == "BulletLeft" || this.image == "BulletUpRight" || this.image == "BulletUpLeft") {
                ctx.drawImage(img, this.x - this.width * 0.3, this.y - this.height / 2, this.width * 2, this.height * 2)
            } else if (this.image == "Ennemi1" || this.image == "Ennemi2" || this.image == "Ennemi3") {
                ctx.drawImage(img, this.x - this.width * 0.3, this.y - this.height / 1.5, this.width * 1.5, this.height * 1.5)
            } else if (this.image == "EnnemiFlying") {
                ctx.drawImage(img, this.x - this.width * 0.3, this.y - this.height / 2.5, this.width * 1.5, this.height * 1.5)
            } else if (this.image == "CoinSmall" || this.image == "CoinLarge") {
                ctx.drawImage(img, this.x - this.width * 0.3, this.y - this.height / 3, this.width * 1.5, this.height * 1.5)
            } else {
                ctx.drawImage(img, this.x - this.width * 0.3, this.y - this.height / 2, this.width * 1.5, this.height * 1.5)
            }

        }

    }
    this.newPos = function() { // Calculates the new position of the object for every frame depending on speed
        this.x += this.speedX; //
        this.y += this.speedY;
    }
}

var myGameArea = {
    canvas: document.getElementById("canvas"),
    start: function() {
        this.canvas.width = 1000; // Dynamic canvas size
        this.canvas.height = (1000) / (16 / 9);
        this.context = this.canvas.getContext("2d");
        requestAnimationFrame(updateGameArea);


        window.addEventListener('keydown', function(e) { // Keyboard management
            myGameArea.keys = (myGameArea.keys || []);
            myGameArea.keys[e.keyCode] = true;
        })
        window.addEventListener('keyup', function(e) {
            myGameArea.keys[e.keyCode] = false;
        })
    },
    clear: function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height); // Clean the canva for every frame
    }
}

function camera(player, platforme, piegepik, ennemi, endlevel, level, numerolevel, coins) {
    
    if (player.x <= 300 || player.x >= 600) { // The camera moves if the player is between 300 and 600

        if (player.x < 300) { // Player position is locked
            player.x = 300
        }
        if (player.x > 600) {
            player.x = 600
        }
        for (var i = 0; i < platforme.length; i++) { //
            platforme[i].x -= player.speedX // Platforms move depending on the player
        }
        for (var i = 0; i < piegepik.length; i++) { // Traps move depending on the player
            piegepik[i].x -= player.speedX
        }
        for (var i = 0; i < ennemi.length; i++) { // Enemies move depending on the player
            ennemi[i].x -= player.speedX
        }

        for (var i = 0; i < coins.length; i++) { // Coins move depending on the player
            coins[i].x -= player.speedX
        }
        endlevel.x -= player.speedX // End level moves depending on the player
        level[numerolevel].x -= player.speedX // Level design moves depending on the player
    }



    if (player.y>500){
        player.y -= 500
        
        for (var i = 0; i < platforme.length; i++) { 
            platforme[i].y -= 500
        }
        for (var i = 0; i < piegepik.length; i++) { 
            piegepik[i].y -= 500
        }
        for (var i = 0; i < ennemi.length; i++) { 
            ennemi[i].y -= 500
        }
        for (var i = 0; i < coins.length; i++) {
            coins[i].y -= 500
        }
        endlevel.y -= 500
        level[numerolevel].y -= 500
    }

    if (player.y<0){
        player.y += 500
        
        for (var i = 0; i < platforme.length; i++) { 
            platforme[i].y += 500
        }
        for (var i = 0; i < piegepik.length; i++) { 
            piegepik[i].y += 500
        }
        for (var i = 0; i < ennemi.length; i++) { 
            ennemi[i].y += 500
        }
        for (var i = 0; i < coins.length; i++) {
            coins[i].y += 500
        }
        endlevel.y += 500
        level[numerolevel].y += 500
    }


    return [player, platforme, piegepik, ennemi, endlevel, coins]
}


function changelevel(testcollide, player, endlevel, platforme, piegepik, ennemi, level, ammo, coins, numerolevel,gameanim,score) {
    if (testcollide(player, endlevel) != null) {
        endlevel.width = 0; // Reset the end level variable
        endlevel.height = 0
        numerolevel++
        level[numerolevel].score = score;
        if (numerolevel<level.length){ // If the level isn't the last then...
            level[numerolevel].start() // Create new objects for the next level and deletes the previous ones
        } else{
            gameanim = false // Locks the game
            
            var ctx = myGameArea.canvas.getContext("2d");
            var img = document.getElementById("EndGame");
            ctx.drawImage(img, 0, 0, 1000, 550); // End game image
        }
        
    }
    return [numerolevel, platforme, piegepik, ennemi, ammo, coins, gameanim]
}

function scoreboard(timer, score, NombreMort,FPSNORMAL) { // Displays the scoreboard
    timer++
    var ctx = myGameArea.canvas.getContext('2d');
    var img = document.getElementById("ScoreBoard"); // Scoreboard background
    ctx.drawImage(img, 60, 25, 200, 100);
    ctx.font = "15pt Arial"; // Font selection
    ctx.strokeStyle = "rgb(0,0,0)";
    ctx.fillStyle = "rgb(0,0,0)";
    ctx.fillText("TIMER:", 100, 50);
    ctx.fillText(Math.round(timer / 60), 200, 50); // Displays the timer
    ctx.fillText("Score:", 100, 70);
    ctx.fillText(score, 200, 70);  // Displays the score
    ctx.fillText("Deads:", 100, 90);
    ctx.fillText(NombreMort, 200, 90); // Displays the amount of death
    ctx.fillText("FPS:", 100, 110);
    ctx.fillText(Math.round(FPSNORMAL), 200, 110); // Displays the amount of death
    return timer
}
