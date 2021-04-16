export {startGame, vector, reset}
import {collide, testcollide} from './collide.js';
import {playermove} from './player.js';
import {ennemimove} from './ennemi.js';
// import {playerShoot} from './weapon.js';
    var player; //Variable joueur
    
    var platforme=[];
    var timerfall = 0;
    var jump = false;
    var walljump = false
    var nbjump = 0;
    var walljumptimer = 0
    var piegepik = []
    var endlevel
    var level = []
    var numerolevel = 0
    var gameanim = true
    var tmort = 100
    var ennemi = [] //Variable ennemi
    
    
    
    

function startGame() {// Fonction au lancement du jeu
    
    myGameArea.start(); // mise en place du canneva
    level[0].start();
    

}




 
function updateGameArea(){//fonction main, lue a chaque chaque frame
    myGameArea.clear()
    
    level[numerolevel].update();
    camera()

    

    for (var i = 0; i < ennemi.length; i++){
        ennemi[i].time++
    }


    ennemi = ennemimove(ennemi)
     
    
    
    


    var playermovetab = playermove(timerfall,jump,walljumptimer, nbjump ,walljump ,player, platforme , myGameArea);
    timerfall = playermovetab[0]
    jump= playermovetab[1]
    walljumptimer = playermovetab[2]
    nbjump= playermovetab[3]
    walljump= playermovetab[4]
    player= playermovetab[5]
    platforme = playermovetab[6]
    
    var collidetab = collide(timerfall,jump,walljumptimer,player, platforme,nbjump, piegepik, ennemi)
    // timerfall,nbjump,jump,walljumptimer,player,platforme
    timerfall = collidetab[0]
    nbjump = collidetab[1]
    jump = collidetab[2]
    walljumptimer = collidetab[3]
    player = collidetab[4]
    

    
    
    changelevel(testcollide,player,endlevel)
    
    player.newPos();
    player.update();
    timerfall++;

    for (var i = 0; i < platforme.length; i++){
        platforme[i].newPos()
        platforme[i].update();
    }
    for (var i = 0; i < piegepik.length; i++){
        piegepik[i].newPos();
        piegepik[i].update();
    }
    for (var i = 0; i < ennemi.length; i++){
        ennemi[i].newPos();
        ennemi[i].update();
        ennemi[i].speedY = 1;

    }
     
    endlevel.newPos()
    endlevel.update()
   
    if (gameanim == true){
        requestAnimationFrame(updateGameArea);
    }
}


function changelevel(testcollide,player,endlevel){
    if (testcollide(player, endlevel)!= null){
        reset()
        platforme = []
        endlevel = 0
        numerolevel++
        level[numerolevel].start()
    }
}





function vector(x, y) {
    this.x = x;
    this.y = y
    this.norme = Math.sqrt(x*x+y*y)
}

function component(width, height, color, x, y, image) { // création d'un objet
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
  this.image = image
  this.time = 0;
  this.update = function(){// affichage de l'objet
    
    var ctx2 = myGameArea.context;
    ctx2.fillStyle = this.color;// couleur de l'objet
    ctx2.fillRect(this.x, this.y, this.width, this.height);// affichage de l'objet

    if(this.image != null){
        var ctx = myGameArea.canvas.getContext("2d");
        var img = document.getElementById(this.image);
        ctx.drawImage(img, this.x-this.width*0.3, this.y-this.height/2, this.width*1.5, this.height*1.5)
        
    }

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

level[0] = {
    start : function(){
        player = new component(25, 25, "red", 100, 0,"PlayerStandingFace"); //création du joueur
        platforme[0]= new component(30, 2000, "blue", 0, 0); //wall
        platforme[1]= new component(30, 2000, "blue", 1970, 0);
        platforme[2]= new component(720, 30, "blue", 0, 470); //sole
        platforme[3]= new component(938, 30, "blue", 844, 470);
        platforme[4]= new component(95, 31, "blue", 1875, 469);
        platforme[5]= new component(90, 10, "blue", 1408, 345); //platform suspendu
        platforme[6]= new component(95, 30, "blue", 1750, 314); 
        platforme[7]= new component(94, 143, "blue", 1560, 12); //plafond
        platforme[8]= new component(348, 11, "blue", 1560, 0);
        platforme[9]= new component(92, 125, "blue", 1625, 62);
        platforme[10]= new component(155, 60, "blue", 1690, 157);
        platforme[11]= new component(93, 93, "blue", 1907, 0);
        platforme[12]= new component(26, 57, "red", 1253, 410); //tuyau
        platforme[13]= new component(86, 26, "red", 1255, 409);
        platforme[14]= new component(26, 57, "red", 1315, 410);
        platforme[15]= new component(57, 26, "red", 1315, 441);
        platforme[16]= new component(30, 309, "red", 1940, 160); //tuyau2
        platforme[17]= new component(29, 27, "red", 1911, 442);
        /* ----------- etage 2 ----------- */
        platforme[18]= new component(1782, 30, "blue", 0, 500); //plafond
        platforme[19]= new component(30, 30, "blue", 1751, 530);
        platforme[20]= new component(94, 31, "blue", 1906, 499);
        platforme[21]= new component(95, 31, "blue", 1781, 625); //platform
        platforme[22]= new component(95, 31, "blue", 1687, 719);
        platforme[23]= new component(95, 31, "blue", 1875, 719);
        platforme[24]= new component(95, 31, "blue", 1781, 875);
        platforme[25]= new component(155, 31, "blue", 1407, 625);
        platforme[26]= new component(92, 188, "blue", 282, 782);
        platforme[27]= new component(63, 123, "blue", 30, 970); 
        platforme[69]= new component(94, 31, "red", 1906, 529); //red                   //
        platforme[28]= new component(182, 31, "purple", 1534, 940); // tuyau
        platforme[29]= new component(30, 345, "red", 1562, 530);
        platforme[30]= new component(1812, 61, "blue", 188, 970); //sole
        platforme[31]= new component(63, 123, "blue", 30, 970);
        platforme[32]= new component(90, 10, "blue", 1283, 906); //platform suspendu
        platforme[33]= new component(90, 10, "blue", 1064, 844);
        platforme[34]= new component(90, 10, "blue", 689, 750);
        platforme[35]= new component(90, 10, "blue", 502, 844);
        /*----------- etage 3 ----------- */
        platforme[36]= new component(405, 30, "blue", 0, 1470); //sole
        platforme[37]= new component(718, 30, "blue", 563, 1470);
        platforme[38]= new component(155, 30, "blue", 1438, 1470);
        platforme[39]= new component(125, 373, "blue", 30, 1095); //platform
        platforme[40]= new component(63, 30, "blue", 155, 1125);
        platforme[41]= new component(93, 30, "blue", 375, 1157);
        platforme[42]= new component(156, 33, "blue", 438, 1403);
        platforme[43]= new component(31, 30, "blue", 500, 1344);
        platforme[44]= new component(124, 33, "blue", 594, 1247);
        platforme[45]= new component(93, 30, "blue", 844, 1375);
        platforme[46]= new component(93, 156, "blue", 1563, 1500);//plafond
        platforme[47]= new component(91, 124, "blue", 1626, 1563);
        platforme[48]= new component(154, 62, "blue", 1688, 1657);
        /*----------- etage 4 ----------- */
        platforme[49]= new component(2000, 29, "blue", 0, 1999); //sole
        platforme[50]= new component(532, 29, "blue", 30, 1969);
        platforme[51]= new component(312, 29, "blue", 969, 1969);
        platforme[52]= new component(156, 29, "blue", 1375, 1969);
        platforme[53]= new component(313, 29, "blue", 1657, 1969);
        platforme[54]= new component(32, 30, "blue", 1938, 1813); //platforme
        platforme[55]= new component(29, 29, "blue", 1719, 1940); //box
        platforme[56]= new component(29, 90, "blue", 1689, 1878);
        platforme[57]= new component(29, 60, "blue", 1658, 1909);
        platforme[58]= new component(27, 60, "blue", 1502, 1909); //box 2 
        platforme[59]= new component(27, 29, "blue", 1471, 1940);
        platforme[60]= new component(27, 29, "blue", 1220, 1940); //box 3
        platforme[61]= new component(27, 152, "blue", 1189, 1815);
        platforme[62]= new component(27, 183, "blue", 1158, 1784);
        platforme[63]= new component(27, 213, "blue", 1127, 1753);
        platforme[64]= new component(27, 183, "blue", 1096, 1784);
        platforme[65]= new component(27, 121, "blue", 1065, 1846);
        platforme[66]= new component(27, 29, "blue", 1034, 1940);
        platforme[67]= new component(91, 27, "blue", 1282, 1814); //platform suspendu
        platforme[68]= new component(91, 27, "blue", 720, 1751);
        platforme[69]= new component(30, 30, "white", 950, 440)
        
        endlevel = new component(100, 100,"white",0,1900);
        /* --------- piège ------- */
        piegepik[0] = new component(120, 20,"white",720,480);
        /*---------- ennemie-------*/
        ennemi[0] = new component(30, 30, "red", 900, 440);

        

        this.x = 0
        this.y = 0
        this.width = 2000
        this.height = 2000

        

    },
    

    update : function(){
        var ctx = myGameArea.canvas.getContext("2d");
        var img = document.getElementById("level1");
        ctx.drawImage(img, this.x, this.y, this.width, this.height);
    }
}

level[1] = {
    start : function(){
        player = new component(25, 25, "red", 500, 0,"PlayerStandingFace"); //création du joueur
        platforme[0]= new component(720, 30, "blue", 0, 470);//création des platformes
        
        this.x = 0
        this.y = 0
        this.width = 2000
        this.height = 2000

    },
    

    update : function(){
        // var ctx = myGameArea.canvas.getContext("2d");
        // var img = document.getElementById("level2");d
        // ctx.drawImage(img, this.x, this.y, this.width, this.height);
    }
}

function camera(){
   
    if (player.x<=300 || player.x>=600 ){

        if (player.x<300){
            
            player.x = 300
        }
        if (player.x>600){
            
            player.x = 600
        }
        
            
        


        for (var i = 0; i < platforme.length; i++){ //
            platforme[i].x -= player.speedX   
            
        }
        for (var i = 0; i < piegepik.length; i++){ //
            piegepik[i].x -= player.speedX   
            
        }
        for (var i = 0; i < ennemi.length; i++){ //
            ennemi[i].x -= player.speedX   
            
        }
        endlevel.x -= player.speedX
        level[numerolevel].x -= player.speedX
        
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
        for (var i = 0; i < piegepik.length; i++){ //
            piegepik[i].y -= player.speedY  
        }
        for (var i = 0; i < ennemi.length; i++){ //
            ennemi[i].y -= player.speedY  
            
        }
        endlevel.y -= player.speedY
        level[numerolevel].y -= player.speedY
    }
    
}

function reset(){
    
    
    if (requestAnimationFrame(dieanim) ==false ){
        requestAnimationFrame(dieanim)
    }
    
        

}

    
function dieanim(){
    
    player.image = "PlayerDead"
    player.update();
    tmort--
    if(tmort>0){
        gameanim = false
        requestAnimationFrame(dieanim)
    } else{
        
        gameanim = true
        tmort = 100
        
        requestAnimationFrame(updateGameArea);
        
        player.speedX = 0
        player.speedY = 0
        level[numerolevel].start()
        
        
    }
}