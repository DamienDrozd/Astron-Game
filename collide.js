import{dieanim} from './test.js'
export{collide, testcollide}


 
function testcollide(obj1 = new component((width, height, color, x, y)), obj2 =new component(width, height, color, x, y) ) {// collision du joueur
        //detection si contact avec une surface
        if (obj1.x + obj1.width +1 > obj2.x  &&  obj1.y + obj1.height > obj2.y  && obj1.y < obj2.y + obj2.height && obj1.x  < obj2.x + obj2.width +1) {
            //colision avec platforme en dessous
            if (obj1.y+obj1.height > obj2.y && obj1.x + obj1.width > obj2.x+5 && obj1.x   < obj2.x + obj2.width- 5  && obj1.y < obj2.y ){
                
                return "bas"
            }
            //colision avec platforme au-dessus
            if (obj1.y > obj2.y && obj1.y > obj2.y + obj2.height-10){
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
    var chute = false

function collide(timerfall,jump,walljumptimer,player, platforme,nbjump, piegepik,ennemi, ammo ){
    for (var i = 0; i < platforme.length; i++){
        
        for (var y = 0; y < ennemi.length; y++) {
            
            var collideEnnemyplatform = testcollide(ennemi[y],platforme[i])
        
            if (collideEnnemyplatform == "gauche") {
                ennemi[y].time = 500;
                
            }

            if (collideEnnemyplatform == "droite"){
                
                ennemi[y].time = 0;
            }
            if (collideEnnemyplatform == "bas"){
                ennemi[y].speedY = 0;
            }
        }



        var collidepos = testcollide(player,platforme[i])


        if (collidepos == "bas"){
                
                chute = true
                player.y = platforme[i].y - player.height+1;
                timerfall=0
                nbjump = 0
                //jump = false
                player.accumulationY = 0
                //player.accumulationY console.log("bas")
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
    for (var i = 0; i < ennemi.length; i++){
        var collideEnnemy = testcollide(player,ennemi[i])
         
        if (collideEnnemy != null ){
            
            requestAnimationFrame(dieanim)       
        }
    }

    for (var i = 0; i < piegepik.length; i++){
        var pikPik = testcollide(player, piegepik[i])
       

        if (pikPik != null){
            
            requestAnimationFrame(dieanim) 
        }   
    }  
    


        for (var i = 0; i < ennemi.length; i++) {
            for (var y = 0; y < piegepik.length; y++) {
                
                if (testcollide(ennemi[i],piegepik[y]) != null) {
                   ennemi.splice(i,1)
                } 



            }


        }
        for (var i = 0; i < ennemi.length; i++) {
            for (var y = 0; y < ammo.length; y++) {
                
                var ammoHit = testcollide(ammo[y], ennemi[i])
            
                if (ammoHit != null){
                    ennemi.splice(i,1)
                    console.log("kill")
                    ammo[y].speedX = 0
                    ammo.splice(y,1)
                    console.log(ammo)
                    break
                } 
            }
        }
        for (var i = 0; i < platforme.length; i++) {
            for (var y = 0; y < ammo.length; y++) {
                var ammoWall = testcollide(ammo[y], platforme[i])

                if (ammoWall != null){
                    ammo.splice(y,1)
                }
        
        
     

            

    if (chute == false && timerfall == 0){
         timerfall ++
        
    }
        chute = false

    return [timerfall,nbjump,jump,walljumptimer,player,platforme,piegepik, ennemi, ammo]
} 