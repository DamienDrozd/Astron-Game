import {} from './main.js';
import {testcollide} from './collide.js';
export{playermove}

var stopjump = false

function playermove(timerfall,jump,walljumptimer, nbjump,walljump ,player, platforme, myGameArea){//déplacement du joueur
    
    var audio = new Audio('sprite\\Audio\\jump2.wav');
    
    // if (timerfall == 0)
        
            // console.log (timerfall )
    //--------------------------Gestion des sauts/double saut--------------------------------------------------
    if (myGameArea.keys && myGameArea.keys[32]) {
        
        if (nbjump == 0 && jump == true && stopjump == false ){//premier saut
            timerfall++;
            player.accumulationY = -150; 
            audio.play();
            nbjump++
            jump = false
            walljumptimer = 0
            stopjump = true
        
        }
        if (nbjump == 1 && jump == true && walljump == false){// deuxième saut
            audio.play();
            player.accumulationY = -160; 
            timerfall = 1;
            jump = false;
            nbjump++;
            walljumptimer = 0
        }

    
        
    }   else {
        
        stopjump = false
        jump = true;
        // walljumptimer = 0
        
    }
    
    

   
    // -------------------------------------------Gestion du walljump------------------------------------------------
    for (var i = 0; i < platforme.length; i++){ // 
        var collidepos = testcollide(player,platforme[i])
        if (collidepos!=null){
            
        
            if (player.x + player.width -3 < platforme[i].x  ){
            
            
                walljump = true
                
                if (myGameArea.keys && myGameArea.keys[32] && jump == true) {
                
                    console.log("droite")
                    audio.play();
                    player.accumulationY = -110  ; 
                    player.speedX = -20;
                    timerfall = 1;
                    walljump = false
                    jump = false
                    walljumptimer=1
                    
                    
                
                } 
                
            }else if (player.x + 3> platforme[i].x + platforme[i].width ){
                walljump = true
                
                if (myGameArea.keys && myGameArea.keys[32] && jump == true) {
                
                    console.log("gauche")
                    audio.play();
                    player.accumulationY = -110  ; 
                    player.speedX = 20;
                    timerfall = 1;
                    walljump = false
                    jump = false
                    walljumptimer=1
                    
                
                
                }
            
                
                
            } else {
                walljump = false
                player.speedX=0
            }

        }
        

    }

 

    if (walljumptimer > 0){
        walljumptimer++;
    }
    if (timerfall > 0){
        timerfall++
    }

    
    
    player.speedY=player.accumulationY

    
    

    

    
    
    
    
    var v0 = - player.speedY //+ player.speedX;


        
            player.speedY = 6  *timerfall/16.7 + v0/16.5 * Math.sin(180) // Calcul de la vitesse en y en fonction des équations horaires
            


    
    if (myGameArea.keys && myGameArea.keys[81]) {
        if(player.accumulationX > 0 ){ 
            player.accumulationX = 0
        }
        player.accumulationX -=0.5; 
        
    }  else if (myGameArea.keys && myGameArea.keys[68]) {
        if(player.accumulationX < 0 ){ 
            player.accumulationX = 0
        }
        player.accumulationX += 0.5;
        
    } else{ 
        
            player.accumulationX = 0
            if (walljumptimer == 0){
                player.speedX = 0 // A enlever pour avoir de la cinétique dans les sauts -----------------------------------------------------------------
            }
    }

    
    if ((myGameArea.keys && myGameArea.keys[81]) && (myGameArea.keys && myGameArea.keys[68])) {
        player.accumulationX = 0; 
    }
    
    if (walljumptimer == 0 || walljumptimer>15){
        player.speedX+=player.accumulationX
    } else{
        player.accumulationX = 0
    }
    
    
    if (player.speedX>5){
        player.speedX=5
    }
    if (player.speedX<-5){
        player.speedX=-5
    }


    
    if (player.speedX > 0){
        player.image ="PlayerRunningRight"
    }else if (player.speedX < 0){
        player.image ="PlayerRunningLeft"
        
    } else{
        player.image = "PlayerStandingFace"
    }
    
    if (timerfall>1){
        
        if (player.speedX > 0){
            player.image = "PlayerJumpRight"
        }else if (player.speedX < 0){
            player.image ="PlayerJumpLeft"
        }
        
    } 

    for (var i = 0; i < platforme.length; i++){ // 
        var collidepos = testcollide(player,platforme[i])
        if (collidepos!=null){
            
            if (collidepos == "gauche"){
                player.x = platforme[i].x - player.width;
                if (player.speedX>0){
                    player.speedX=0
                    // player.accumulationX = 0
                }
            }
            if (collidepos == "droite"){
                player.x = platforme[i].x + platforme[i].width   ;
                if (player.speedX<0){
                    player.speedX=0
                    // player.accumulationX=0
                }
            }
        }
    }
    
   
    
    return [timerfall,jump,walljumptimer, nbjump,walljump ,player, platforme]
} 