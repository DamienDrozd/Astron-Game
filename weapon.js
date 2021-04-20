export {playerShoot}
import {component} from './test.js'
var ammo = []

function playerShoot(myGameArea, player) {

    if (myGameArea.keys && myGameArea.keys[101]){
        ammo[0] = new component(1, 1, "white", player.x, player.y)
        for (var i = 0; i < ammo.length; i++){
            ammo[i].speedX = 3

        }
    }


}