
export {component, myGameArea, camera,  changelevel, scoreboard }
import{updateGameArea} from './main.js';



function component(width, height, color, x, y, image) { // création d'un objet
    this.width = width; //largeur de l'objet
    this.height = height; //hauteur de l'objet
    this.x = x; // Coordonée en x de l'objet
    this.y = y; //Coordonée en y de l'objet
    this.speedX = 0; //Vitesse de l'objet en X
    this.speedY = 0; //Vitesse de l'objet en Y
    this.speed = Math.abs(this.speedX) + Math.abs(this.speedY)
    this.accumulationX = 0; // accumulation de la vitesse en X
    this.accumulationY = 0; // accumulation de la vitesse en Y
    this.color = color;
    this.image = image
    this.time = 0;
    this.affichagex = 0;
    this.affichagey = 0;
    this.update = function() { // affichage de l'objet
        var ctx2 = myGameArea.context;
        ctx2.fillStyle = this.color; // couleur de l'objet
        if (myGameArea.keys && myGameArea.keys[46]) {
            ctx2.fillRect(this.x, this.y, this.width, this.height); // affichage de l'objet
        }
        if (this.image != null) {
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
    this.newPos = function() { //Calcul  de la nouvelle position de l'objet a chaque frame en fonction de la vitesse
        this.x += this.speedX; //
        this.y += this.speedY;
    }
}

var myGameArea = {
    canvas: document.createElement("canvas"),
    start: function() {
        this.canvas.width = 1000; // Taille du canneva dynamique
        this.canvas.height = (1000) / (16 / 9);
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        var globalID = requestAnimationFrame(updateGameArea);
        window.addEventListener('keydown', function(e) { // Gestion du clavier
            myGameArea.keys = (myGameArea.keys || []);
            myGameArea.keys[e.keyCode] = true;
        })
        window.addEventListener('keyup', function(e) {
            myGameArea.keys[e.keyCode] = false;
        })
    },
    clear: function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height); // Fonction pour nettoyer le canneva a chaque frame
    }
}

function camera(player, platforme, piegepik, ennemi, endlevel, level, numerolevel, coins) {
    
    if (player.x <= 300 || player.x >= 600) {

        if (player.x < 300) {
            player.x = 300
        }
        if (player.x > 600) {
            player.x = 600
        }
        for (var i = 0; i < platforme.length; i++) { //
            platforme[i].x -= player.speedX
        }
        for (var i = 0; i < piegepik.length; i++) { //
            piegepik[i].x -= player.speedX
        }
        for (var i = 0; i < ennemi.length; i++) { //
            ennemi[i].x -= player.speedX
        }

        for (var i = 0; i < coins.length; i++) {
            coins[i].x -= player.speedX
        }
        endlevel.x -= player.speedX
        level[numerolevel].x -= player.speedX
    }

    // if (player.y <= 100 || player.y >= 450) {
    //     if (player.y < 100) {
    //         player.y = 100
    //     }
    //     if (player.y > 450) {
    //         player.y = 450
    //     }
    //     player.y -= player.speedY
    //     for (var i = 0; i < platforme.length; i++) { //
    //         platforme[i].y -= player.speedY
    //     }
    //     for (var i = 0; i < piegepik.length; i++) { //
    //         piegepik[i].y -= player.speedY
    //     }
    //     for (var i = 0; i < ennemi.length; i++) { //
    //         ennemi[i].y -= player.speedY
    //     }
    //     for (var i = 0; i < coins.length; i++) {
    //         coins[i].y -= player.speedY
    //     }
    //     endlevel.y -= player.speedY
    //     level[numerolevel].y -= player.speedY
    // }

    if (player.y>500){
        player.y -= 500
        
        for (var i = 0; i < platforme.length; i++) { //
            platforme[i].y -= 500
        }
        for (var i = 0; i < piegepik.length; i++) { //
            piegepik[i].y -= 500
        }
        for (var i = 0; i < ennemi.length; i++) { //
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
        
        for (var i = 0; i < platforme.length; i++) { //
            platforme[i].y += 500
        }
        for (var i = 0; i < piegepik.length; i++) { //
            piegepik[i].y += 500
        }
        for (var i = 0; i < ennemi.length; i++) { //
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


function changelevel(testcollide, player, endlevel, platforme, piegepik, ennemi, level, ammo, coins, numerolevel,gameanim) {
    if (testcollide(player, endlevel) != null) {
        endlevel.width = 0;
        endlevel.height = 0
        numerolevel++
        console.log(numerolevel,level.length)
        if (numerolevel<level.length){
            level[numerolevel].start()
        } else{
            gameanim = false
            console.log("test")
            var ctx = myGameArea.canvas.getContext("2d");
            var img = document.getElementById("EndGame");
            ctx.drawImage(img, 0, 0, 1000, 550);
        }
        
    }
    return [numerolevel, platforme, piegepik, ennemi, ammo, coins, gameanim]
}

function scoreboard(timer, score) {
    timer++
    var ctx = myGameArea.canvas.getContext('2d');
    var img = document.getElementById("ScoreBoard");
    ctx.drawImage(img, 60, 25, 200, 85);
    ctx.font = "15pt Arial";
    ctx.strokeStyle = "rgb(0,0,0)";
    ctx.fillStyle = "rgb(0,0,0)";
    ctx.fillText("TIMER:", 100, 60);
    ctx.fillText(Math.round(timer / 60), 200, 60);
    ctx.fillText("Score:", 100, 85);
    ctx.fillText(score, 200, 85);
    return timer
}
