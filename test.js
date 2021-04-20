export {startGame, vector, reset, component}
import {collide, testcollide} from './collide.js';
import {playermove} from './player.js';
import {ennemimove} from './ennemi.js';
// import {playerShoot} from './weapon.js';
    var player; //Variable joueur
    var release = true
    var platforme=[];
    var timerfall = 1;
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
    var mortaudio = true
    
    
    
    

function startGame() {// Fonction au lancement du jeu
    
    myGameArea.start(); // mise en place du canneva
    level[numerolevel].start();
    

}




 
function updateGameArea(){//fonction main, lue a chaque chaque frame
    myGameArea.clear()
    level[numerolevel].update();
    camera()

    

    for (var i = 0; i < ennemi.length; i++){
        ennemi[i].time++
    }


    ennemi = ennemimove(ennemi)
     
    
    
    


    
    
    var collidetab = collide(timerfall,jump,walljumptimer,player, platforme,nbjump, piegepik, ennemi)
    // timerfall,nbjump,jump,walljumptimer,player,platforme
    timerfall = collidetab[0]
    nbjump = collidetab[1]
    jump = collidetab[2]
    walljumptimer = collidetab[3]
    player = collidetab[4]
    

    var playermovetab = playermove(timerfall,jump,walljumptimer, nbjump ,walljump ,player, platforme , myGameArea, release);
    timerfall = playermovetab[0]
    jump= playermovetab[1]
    walljumptimer = playermovetab[2]
    nbjump= playermovetab[3]
    walljump= playermovetab[4]
    player= playermovetab[5]
    platforme = playermovetab[6]
    release = playermovetab[7]

    
    
    changelevel(testcollide,player,endlevel)
    
    player.newPos();
    player.update();
    

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

    if(myGameArea.keys && myGameArea.keys[27]){
        if (requestAnimationFrame(pause) == false ){
            requestAnimationFrame(pause)
        }
    }
   
    if (gameanim == true){
        if (requestAnimationFrame(updateGameArea) == false ){
            requestAnimationFrame(updateGameArea);
        }
    }
}


function changelevel(testcollide,player,endlevel){
    if (testcollide(player, endlevel)!= null){
        
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
        platforme[90]= new component(94, 124, "blue", 30, 0); //plafond
        platforme[91]= new component(96, 93, "blue", 124, 0);
        platforme[92]= new component(248, 156, "blue", 220, 0);
        platforme[93]= new component(93, 30, "blue", 468, 0);
        platforme[94]= new component(123, 156, "blue", 626, 0);
        platforme[95]= new component(124, 93, "blue", 750, 0);
        platforme[96]= new component(124, 156, "blue", 813, 0);
        platforme[97]= new component(62, 93, "blue", 937, 0);
        platforme[98]= new component(249, 30, "blue", 1000, 0);
        platforme[99]= new component(372, 124, "blue", 1188, 0);
        platforme[100]= new component(310, 156, "blue", 1250, 0);
        platforme[101]= new component(217, 187, "blue", 1344, 0);
        platforme[7]= new component(94, 143, "blue", 1560, 12);
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
        platforme[102]= new component(156, 188, "blue", 1250, 530);
        platforme[103]= new component(374, 126, "blue", 969, 530);
        platforme[104]= new component(186, 95, "blue", 813, 530);
        platforme[105]= new component(33, 30, "blue", 780, 530);
        platforme[106]= new component(248, 63, "blue", 532, 530);
        platforme[107]= new component(155, 125, "blue", 438, 530);
        platforme[108]= new component(186, 63, "blue", 282, 530);
        platforme[109]= new component(217, 94, "blue", 157, 530);
        platforme[110]= new component(188, 125, "blue", 30, 530);
        platforme[111]= new component(125, 156, "blue", 30, 530);
        platforme[21]= new component(95, 31, "blue", 1781, 625); //platform
        platforme[22]= new component(95, 31, "blue", 1687, 719);
        platforme[23]= new component(95, 31, "blue", 1875, 719);
        platforme[24]= new component(95, 31, "blue", 1781, 875);
        platforme[25]= new component(155, 31, "blue", 1407, 625);
        platforme[26]= new component(92, 188, "blue", 282, 782);
        platforme[27]= new component(63, 123, "blue", 30, 970); 
        platforme[28]= new component(60, 31, "red", 1911, 529); //tuyau1
        platforme[29]= new component(182, 31, "red", 1534, 940); //tuyau2
        platforme[30]= new component(30, 345, "red", 1562, 530); //tuyau3
        platforme[31]= new component(26, 247, "red", 1472, 723); //tuyau4
        platforme[32]= new component(27, 28, "red", 1379, 718); //tuyau5
        platforme[33]= new component(28, 121, "red", 254, 848); //tuyau6
        platforme[34]= new component(1812, 61, "blue", 188, 970); //sole
        platforme[35]= new component(63, 123, "blue", 30, 970);
        platforme[36]= new component(90, 10, "blue", 1283, 906); //platform suspendu
        platforme[37]= new component(90, 10, "blue", 1064, 844);
        platforme[38]= new component(90, 10, "blue", 689, 750);
        platforme[39]= new component(90, 10, "blue", 502, 844);
        platforme[136]= new component(90, 21, "blue", 877, 876); //tapis roulant
        /*----------- etage 3 ----------- */
        platforme[40]= new component(405, 30, "blue", 0, 1470); //sole
        platforme[41]= new component(718, 30, "blue", 563, 1470);
        platforme[42]= new component(155, 30, "blue", 1438, 1470);
        platforme[43]= new component(125, 373, "blue", 30, 1095); //platform
        platforme[44]= new component(63, 30, "blue", 155, 1125);
        platforme[45]= new component(93, 30, "blue", 375, 1157);
        platforme[46]= new component(156, 33, "blue", 438, 1403);
        platforme[47]= new component(31, 30, "blue", 500, 1344);
        platforme[48]= new component(124, 33, "blue", 594, 1247);
        platforme[49]= new component(93, 30, "blue", 844, 1375);
        platforme[137]= new component(91, 22, "blue", 220, 1282); //tapis roulant
        platforme[50]= new component(28, 28, "red", 155, 1155); //tuyau1
        platforme[51]= new component(28, 60, "red", 938, 1093); //tuyau2
        platforme[52]= new component(26, 63, "red", 1190, 1281); //tuyau3
        platforme[53]= new component(26, 63, "red", 1190, 1406);
        platforme[54]= new component(178, 28, "red", 1286, 1218); //tuyau4
        platforme[55]= new component(93, 156, "blue", 1563, 1500);//plafond
        platforme[56]= new component(91, 124, "blue", 1626, 1563);
        platforme[57]= new component(154, 62, "blue", 1688, 1657);
        platforme[112]= new component(281, 31, "blue", 563, 1031);
        platforme[113]= new component(219, 94, "blue", 656, 1031);
        platforme[114]= new component(344, 63, "blue", 750, 1031);
        platforme[115]= new component(157, 157, "blue", 1031, 1031);
        platforme[116]= new component(63, 157, "blue", 1156, 1124);
        platforme[117]= new component(407, 188, "blue", 1187, 1031);
        platforme[118]= new component(217, 156, "blue", 1532, 1031);
        platforme[119]= new component(251, 188, "blue", 1719, 1031);
        platforme[120]= new component(157, 188, "blue", 1813, 1218);
        platforme[121]= new component(126, 31, "blue", 1844, 1406);
        platforme[122]= new component(63, 157, "blue", 1907, 1436);
        /*----------- etage 4 ----------- */
        platforme[58]= new component(2000, 29, "blue", 0, 1999); //sole
        platforme[59]= new component(532, 29, "blue", 30, 1969);
        platforme[60]= new component(312, 29, "blue", 969, 1969);
        platforme[61]= new component(156, 29, "blue", 1375, 1969);
        platforme[62]= new component(313, 29, "blue", 1657, 1969);
        platforme[63]= new component(32, 30, "blue", 1938, 1813); //platforme
        platforme[64]= new component(29, 29, "blue", 1719, 1940); //box
        platforme[65]= new component(29, 90, "blue", 1689, 1878);
        platforme[66]= new component(29, 60, "blue", 1658, 1909);
        platforme[67]= new component(27, 60, "blue", 1502, 1909); //box 2 
        platforme[68]= new component(27, 29, "blue", 1471, 1940);
        platforme[69]= new component(27, 29, "blue", 1220, 1940); //box 3
        platforme[70]= new component(27, 152, "blue", 1189, 1815);
        platforme[71]= new component(27, 183, "blue", 1158, 1784);
        platforme[72]= new component(27, 213, "blue", 1127, 1753);
        platforme[73]= new component(27, 183, "blue", 1096, 1784);
        platforme[74]= new component(27, 121, "blue", 1065, 1846);
        platforme[75]= new component(27, 29, "blue", 1034, 1940);
        platforme[76]= new component(91, 27, "blue", 1282, 1814); //platform suspendu
        platforme[77]= new component(91, 27, "blue", 720, 1751);
        platforme[138]= new component(91, 22, "blue", 845, 1907); //tapis roulant
        platforme[139]= new component(91, 22, "blue", 595, 1907);
        platforme[78]= new component(28, 90, "red", 1942, 1879); //tuyau 1
        platforme[79]= new component(28, 122, "red", 1378, 1656); //tuyau 2
        platforme[80]= new component(26, 152, "red", 470, 1817); //tuyau 3
        platforme[81]= new component(23, 213, "red", 441, 1757);
        platforme[82]= new component(78, 23, "red", 384, 1755);
        platforme[83]= new component(23, 55, "red", 381, 1757);
        platforme[84]= new component(23, 83, "red", 411, 1787);
        platforme[85]= new component(83, 25, "red", 379, 1657); //tuyau 4
        platforme[86]= new component(84, 25, "red", 317, 1689);
        platforme[87]= new component(23, 153, "red", 317, 1717);
        platforme[88]= new component(22, 85, "red", 349, 1848);
        platforme[89]= new component(34, 22, "red", 372, 1910);
        platforme[135]= new component(1188, 31, "blue", 375, 1500);//plafond
        platforme[134]= new component(217, 157, "blue", 1344, 1530);
        platforme[133]= new component(186, 125, "blue", 1249, 1530);
        platforme[132]= new component(218, 94, "blue", 1188, 1530);
        platforme[131]= new component(218, 32, "blue", 1000, 1530);
        platforme[130]= new component(62, 63, "blue", 937, 1530);
        platforme[129]= new component(124, 126, "blue", 813, 1530);
        platforme[128]= new component(124, 63, "blue", 750, 1530);
        platforme[123]= new component(123, 125, "blue", 626, 1530);
        platforme[124]= new component(218, 63, "blue", 438, 1530);
        platforme[125]= new component(248, 155, "blue", 220, 1500);
        platforme[126]= new component(96, 94, "blue", 124, 1500);
        platforme[127]= new component(94, 124, "blue", 30, 1500);
        
        endlevel = new component(100, 100,"white",0,1900);
        /* --------- piège ------- */
        piegepik[0] = new component(120, 20,"white",720,480);
        /*---------- ennemie-------*/
        ennemi[0] = new component(30, 30, "red", 900, 440);

        var music = new Audio('sprite\\Audio\\MusicLoop.mp3');
        //music.play()

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
        endlevel = new component(100, 100,"white",0,1900);
        this.x = 0
        this.y = 0
        this.width = 2000
        this.height = 300

    },
    

    update : function(){
        var ctx = myGameArea.canvas.getContext("2d");
        var img = document.getElementById("level2");
        ctx.drawImage(img, this.x, this.y, this.width, this.height);
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


    if (player.y<=100 || player.y>=400 ){
        if (player.y<100){
            player.y = 100
        }
        if (player.y>400){
            player.y = 400
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
    
    
    
    requestAnimationFrame(dieanim)
    
    
    
        

}

    
function dieanim(){
    
    var audio = new Audio('sprite\\Audio\\Die.wav');
    
    if (mortaudio == true ) {
            audio.play();
            mortaudio = false
        }
    

    player.image = "PlayerDead"
    player.update();
    tmort--
    if(tmort>0 ){
        
        gameanim = false
        requestAnimationFrame(dieanim)
        
    } else if (tmort == 0){
        
        gameanim = true
        tmort = 100

        player.speedX = 0
        player.speedY = 0
        level[numerolevel].start()
        mortaudio = true

        requestAnimationFrame(updateGameArea);
        
        
        
        
    }
}

function pause(){
    
    
    
    
    if(myGameArea.keys && myGameArea.keys[13] && gameanim == false){
        var audio = new Audio('sprite\\Audio\\CloseMenu.ogg');
        console.log("test")
        audio.play();
        gameanim = true
        if (requestAnimationFrame(updateGameArea) == false){
            requestAnimationFrame(updateGameArea);
        }
        
    
        
            
        
    } else if (myGameArea.keys && myGameArea.keys[8] && gameanim == false) {
        var audio = new Audio('sprite\\Audio\\Jump.wav');
        audio.play();
        gameanim = true
        tmort = 100
        
        requestAnimationFrame(updateGameArea);
        
        player.speedX = 0
        player.speedY = 0
        level[numerolevel].start()
        

    } else {

        var ctx = myGameArea.canvas.getContext("2d");
        var img = document.getElementById("PauseMenu");
        ctx.drawImage(img, 0, 0, 1000, 1000/(16/9));

        gameanim = false
        
            requestAnimationFrame(pause)
        
    }
        
    
    
}