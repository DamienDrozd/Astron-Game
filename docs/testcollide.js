export{testcollide}


// Function allowing to test if there is a collision between two objects and if the collision is down, up, left or right
function testcollide(obj1 = new component((width, height, color, x, y)), obj2 =new component(width, height, color, x, y) ) {// collision du joueur
// Detects a contact with a surface

if (obj1.x + obj1.width +1 > obj2.x  &&  obj1.y + obj1.height > obj2.y  && obj1.y < obj2.y + obj2.height && obj1.x  < obj2.x + obj2.width +1) {
// Collision with a platform underneath
if (obj1.y+obj1.height > obj2.y && obj1.x + obj1.width > obj2.x+5 && obj1.x   < obj2.x + obj2.width- 5  && obj1.y < obj2.y ){

return "bas"
}
// Collision with a platform above
if (obj1.y > obj2.y && obj1.y > obj2.y + obj2.height-10){
return "haut"
}
// Collision with a platform on the right
if (obj1.x < obj2.x + 10 && obj1.y < obj2.y + obj2.height && obj1.y + obj1.height > obj2.y ){
return "gauche"
}
// Collision with a platform on the left
if (obj1.x + obj1.width > obj2.x + obj2.width -100   && obj1.y < obj2.y + obj2.height && obj1.y + obj1.height > obj2.y){
return "droite"
}

}

}