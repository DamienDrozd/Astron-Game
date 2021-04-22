export {playerShoot , bulletvisible}
import {component} from './main.js'
var ammo = []

  


function playerShoot(myGameArea, ammo, ammoTimer, player,bulletvisible ) {
    
    if (ammoTimer > 0 && ammoTimer < 30){
        ammoTimer++
    } else if (ammoTimer = 30) {
        ammoTimer = 0
    }
    ammo = bulletvisible(ammo)
    if ((myGameArea.keys && myGameArea.keys[39]) && (myGameArea.keys && myGameArea.keys[38])){
        if (ammoTimer == 0) {
            ammo.push(new component(10, 10, "green", player.x+ 29, player.y));
            ammoTimer = 1
            ammo[ammo.length-1].image = "BulletUpRight"
            ammo[ammo.length-1].speedX = 8
            ammo[ammo.length-1].speedY = -8
            // console.log("haut droite")
        }
    }
    if ((myGameArea.keys && myGameArea.keys[37]) && (myGameArea.keys && myGameArea.keys[38])){
        if (ammoTimer == 0) {
            ammo.push(new component(10, 10, "green", player.x, player.y));
            ammoTimer = 1
            ammo[ammo.length-1].image = "BulletUpLeft"
            ammo[ammo.length-1].speedX = -8
            ammo[ammo.length-1].speedY = -8
            // console.log("haut gauche")
        }
    }
    if (myGameArea.keys && myGameArea.keys[39]) {
        if (ammoTimer == 0) {
        
            ammo.push(new component(10, 10, "green", player.x+ 20, player.y));
            ammoTimer = 1
            ammo[ammo.length-1].image = "BulletRight"
            ammo[ammo.length-1].speedX = 8
        }
        
    }
    if (myGameArea.keys && myGameArea.keys[37]) {
        if (ammoTimer == 0) {
            ammo.push(new component(10, 10, "green", player.x, player.y));
            ammoTimer = 1
            ammo[ammo.length-1].image = "BulletLeft"
            ammo[ammo.length-1].speedX = -8
        }
    }
    
    return [ammo, ammoTimer]
}


function bulletvisible(ammo) {
    
    for (var i = 0; i < ammo.length; i++){
        
        ammo[i].newPos()
        ammo[i].update()
    }
    return ammo
}