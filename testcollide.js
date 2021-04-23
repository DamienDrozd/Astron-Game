export{testcollide}


//fonction qui permet de tester si il y a une collision entre deux objets et si la collision se passe en bas, en haut, a gauche ou a droite
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