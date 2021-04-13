export {startGame, vector}
import {collide, testcollide} from './collide.js';
import {playermove} from './player.js';
    
    var player; //Variable joueur
    
    var platforme=[];
    var scalaire;
    var alphawann = 0;
    var v0;
    var timerfall = 0;
    var jump = false;
    var walljump = false
    var nbjump = 0;
    var walljumptimer = 0

    
    
    

function startGame() {// Fonction au lancement du jeu
    
    myGameArea.start(); // mise en place du canneva
    Map1()

    

}

function Map1(){
    player = new component(30, 30, "red", 500, 0); //création du joueur
    platforme[0]= new component(10000, 30, "blue", 0, 500);//création des platformes
    platforme[1]= new component(30, 200, "green", 500, 401);
    platforme[2]= new component(30, 10000, "blue", 0, 0);
    platforme[3]= new component(200, 60, "purple", 400, 400);
    platforme[4]= new component(200, 60, "purple", 600, 300);
    platforme[5]= new component(200, 60, "purple", 700, 200);
    
     var ctx = document.getElementById('canvas').getContext('2d');
  var img = new Image();
  img.onload = function() {
    ctx.drawImage(img, 0, 0);
    ctx.beginPath();
    ctx.moveTo(30, 96);
    ctx.lineTo(70, 66);
    ctx.lineTo(103, 76);
    ctx.lineTo(170, 15);
    ctx.stroke();
  };
  img.src = 'https://mdn.mozillademos.org/files/5395/backdrop.png';
    
}


 
function updateGameArea(){//fonction main, lue a chaque chaque frame
    myGameArea.clear()
    
    camera()
    
    
    var playermovetab = playermove(timerfall,jump,walljumptimer, nbjump ,walljump ,player, platforme , myGameArea);
    timerfall = playermovetab[0]
    jump= playermovetab[1]
    walljumptimer = playermovetab[2]
    nbjump= playermovetab[3]
    walljump= playermovetab[4]
    player= playermovetab[5]
    platforme = playermovetab[6]
    
    var collidetab = collide(timerfall,jump,walljumptimer,player, platforme,nbjump)
    // timerfall,nbjump,jump,walljumptimer,player,platforme
    timerfall = collidetab[0]
    nbjump = collidetab[1]
    jump = collidetab[2]
    walljumptimer = collidetab[3]
    player = collidetab[4]
    
    
    
    player.newPos();
    player.update();
    timerfall++;
    for (var i = 0; i < platforme.length; i++){
        platforme[i].update();
    }
    
    requestAnimationFrame(updateGameArea);
    
}








function vector(x, y) {
    this.x = x;
    this.y = y
    this.norme = Math.sqrt(x*x+y*y)
}

function component(width, height, color, x, y) { // création d'un objet
  this.width = width;//largeur de l'objet
  this.height = height;//hauteur de l'objet
  this.x = x;// Coordonée en x de l'objet
  this.y = y;//Coordonée en y de l'objet
  this.speedX = 0;//Vitesse de l'objet en X
  this.speedY = 0;//Vitesse de l'objet en Y
  this.speed=Math.abs(this.speedX)+ Math.abs(this.speedY)
  this.accumulationX = 0;
  this.accumulationY = 0;
  this.color = color;
  this.update = function(){// affichage de l'objet
    var ctx = myGameArea.context;
    ctx.fillStyle = this.color;// couleur de l'objet
    ctx.fillRect(this.x, this.y, this.width, this.height);// affichage de l'objet
  }
  this.newPos = function() { //Calcul  de la nouvelle position de l'objet a chaque frame en fonction de la vitesse
    this.x += this.speedX;// 
    this.y += this.speedY;
    this.speed = Math.abs(player.speedX)+ Math.abs(player.speedY)
  }
}




var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
         this.canvas.width = 1000;// Taille du canneva dynamique
         this.canvas.height = (1000)/(16/9);
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        var globalID = requestAnimationFrame(updateGameArea);

        window.addEventListener('keydown', function (e) {// Gestion du clavier
        myGameArea.keys = (myGameArea.keys || []);
        myGameArea.keys[e.keyCode] = true;
        })
        window.addEventListener('keyup', function (e) {
        myGameArea.keys[e.keyCode] = false;
        })
 
    },
        
    clear : function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);// Fonction pour nettoyer le canneva a chaque frame
  }
}

function camera(){
   
    if (player.x<=300 || player.x>=800 ){

        if (player.x<300){
            
            player.x = 300
        }
        if (player.x>800){
            
            player.x = 800
        }
        
            
        


        for (var i = 0; i < platforme.length; i++){ //
            platforme[i].x -= player.speedX   
            
            }
    }


    if (player.y<=100 || player.y>=500 ){
        if (player.y<100){
            player.y = 100
        }
        if (player.y>500){
            player.y = 500
        }
        
        player.y  -= player.speedY
        for (var i = 0; i < platforme.length; i++){ //
            platforme[i].y -= player.speedY   
            
            }
    }
    
}