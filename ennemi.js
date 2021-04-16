export {ennemimove}


function ennemimove(ennemi){
    for (var i = 0; i < ennemi.length; i++){
        if (ennemi[i].time < 500) {
            ennemi[i].speedX = 1;
            ennemi[i].time = ennemi[i].time + 1;
        } else if (ennemi[i].time > 500 && ennemi[i].time < 1000) {
            ennemi[i].speedX = -1;
            ennemi[i].time = ennemi[i].time + 1
        } else if (ennemi[i].time > 1000) {
            ennemi[i].time -= 1000;
        }
        
    }
        return ennemi
        
    }
