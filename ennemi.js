export {ennemimove}


function ennemimove(ennemi, ennemiTime){
    for (var i = 0; i < ennemi.length; i++){
        if (ennemiTime < 500) {
            ennemi[i].speedX = 1;
            ennemiTime = ennemiTime + 1;
        } else if (ennemiTime > 500 && ennemiTime < 1000) {
            ennemi[i].speedX = -1;
            ennemiTime = ennemiTime + 1
        } else if (ennemiTime > 1000) {
            ennemiTime -= 1000;
        }
        
    }
        return [ennemi, ennemiTime]
        
    }
