
export{collide, testcollide}


 
function testcollide(obj1 = new component((width, height, color, x, y)), obj2 =new component(width, height, color, x, y) ) {// collision du joueur
        //detection si contact avec une surface
        if (obj1.x + obj1.width +1 > obj2.x  &&  obj1.y + obj1.height > obj2.y  && obj1.y-1 < obj2.y + obj2.height && obj1.x  < obj2.x + obj2.width +1) {
            //colision avec platforme en dessous
            if (obj1.y+obj1.height > obj2.y && obj1.x + obj1.width > obj2.x+5 && obj1.x   < obj2.x + obj2.width- 5  && obj1.y < obj2.y ){
                
                return "bas"
            }
            //colision avec platforme au-dessus
            if (obj1.y > obj2.y && obj1.y > obj2.y + obj2.height-10){
                console.log(obj1.y, obj2.y+obj2.height+10)
                return "haut"
            }
            //colision avec platforme de droite
            if (obj1.x < obj2.x + 10 && obj1.y < obj2.y + obj2.height && obj1.y + obj1.height > obj2.y ){
                return "gauche"
            }
            //colision avec platforme de gauche
             if (obj1.x + obj1.width > obj2.x + obj2.width -100   && obj1.y < obj2.y + obj2.height && obj1.y + obj1.height > obj2.y){
               return "droite"
            } 
            
        } 
        
    }

function collide(timerfall,jump,walljumptimer,player, platforme,nbjump){
    for (var i = 0; i < platforme.length; i++){
        var collidepos = testcollide(player,platforme[i])
        //console.log(collidepos)
        if (collidepos == "bas"){
            player.y = platforme[i].y - player.height;
            timerfall=0
            nbjump = 0
            jump = false
            player.accumulationY = 0
            if(walljumptimer>0){
                walljumptimer = 0
            }
        }
        if (collidepos == "haut"){
            player.y = platforme[i].y + platforme[i].height +1 ;
            timerfall = 40
            player.speedY = 0
        }
        if (collidepos == "gauche"){
            player.x = platforme[i].x - player.width+1;
            if (player.speedX>0){
                player.speedX=0
            }
        }
        if (collidepos == "droite"){
            player.x = platforme[i].x + platforme[i].width-1  ;
            if (player.speedX<0){
                player.speedX=0
            }
        }
        
            
        
    }

    

    
    return [timerfall,nbjump,jump,walljumptimer,player,platforme]
}
