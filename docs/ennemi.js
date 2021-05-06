export {ennemimove}

function ennemimove(ennemi){ // Function allowing every enemy entity to have a movement pattern
    for (var i = 0; i < ennemi.length; i++){ // Loop to test every enemy
        if (ennemi[i].time < 500) { 
            ennemi[i].speedX = 1; // Enemy movement to the right
            ennemi[i].time = ennemi[i].time + 1;
        } else if (ennemi[i].time > 500 && ennemi[i].time < 1000) {
            ennemi[i].speedX = -1; // Enemy movement to the left
            ennemi[i].time = ennemi[i].time + 1
        } else if (ennemi[i].time > 1000) {
            ennemi[i].time -= 1000; // Reset the time in between patterns
        }
        if (ennemi[i].image == "EnnemiFlying"){ // Flying enemy
            ennemi[i].speedY = 0 // No gravity
        }
    }
    return ennemi
    
}
