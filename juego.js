var perdisteWav = new Audio("/sonidos/failuresound.wav");
var saltoWav = new Audio("/sonidos/retrojump.wav");
var imgRex, imgNube, imgCactus, imgSuelo;


document.addEventListener('keydown', function(event){
    if(event.code == "Space") {
        console.log("salta")
        
        if(nivel.muerto === false && trex.saltando === false ){
            
            saltar();
            /* SONIDO_PERDISTE.play( ); */
        }if(trex.saltando === true) {
            return;
        }else {
            trex.saltando === true
            nivel.velocidad = 9;
            nube.velocidad = 1, nube.x = 730, nube.y = 20;
            nivel.marcador = 0;
            cactus.x = ancho + 100;
            nivel.muerto = false;
        }
    }
});



 
function cargaImagenes(){
    imgRex = new Image();
    imgNube = new Image();
    imgCactus = new Image();
    imgSuelo = new Image();

    imgRex.src = 'img/rex.png'
    imgNube.src = 'img/nube.png'
    imgCactus.src = 'img/cactus.png'
    imgSuelo.src = 'img/suelo.png'
}



var ancho = 700;
var alto = 300;
var canvas,ctx;


function inicializa(){
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    cargaImagenes();
}

function borraCanvas(){
    canvas = document.getElementById("canvas");
    /* console.log(canvas.width) */
    canvas.width = ancho;
    canvas.height = alto;
}

var suelo = 200;
var trex = {y: suelo, vy: 0, gravedad: 2, salto: 28, vymax: 9, saltando: false};
var nivel = {velocidad: 9, marcador: 0, muerto: false};
var cactus = {x: ancho + 100, y: suelo - 5};
var nube = {x: 730, y: 20, velocidad: 1};
var suelog = {x: 0, y: 242};

function dibujaRex(){
    ctx.drawImage(imgRex,0,0,69,69,100,trex.y,50,50)
}

function dibujarCactus(){
    ctx.drawImage(imgCactus,0,0,60,60,cactus.x,cactus.y,60,60)
}

function logicaCactus(){
    if(cactus.x < -100){
        cactus.x = ancho + 100;
        nivel.marcador++;
    }
    else{
        cactus.x -= nivel.velocidad;
    }
}

function dibujarNube(){
    ctx.drawImage(imgNube,0,0,75,75,nube.x,nube.y,75,75)
}

function logicaNube(){
    if(nube.x < -100){
        nube.x = ancho + 100;
    }
    else{
        nube.x -= nube.velocidad;
    }
}


function dibujarSuelo(){
    ctx.drawImage(imgSuelo,suelog.x,0,2377,12,0,suelog.y,2377,12)
}


function logicaSuelo(){
    if(suelog.x > 1700){
        suelog.x = 0;
    }
    else{
        suelog.x += nivel.velocidad;
    }
}



function saltar(){
    saltoWav.play();
    trex.saltando = true;
    trex.vy = trex.salto;
}

function gravedad(){
    if(trex.saltando == true){

        if(trex.y - trex.vy - trex.gravedad > suelo){
            trex.saltando = false;
            trex.vy = 0;
            trex.y = suelo;
        }
        else {
        trex.vy -= trex.gravedad;
        trex.y -= trex.vy;
        }
    }
}


function colision(){
    if(cactus.x >= 50 && cactus.x <= 150){
        if(trex.y >= suelo-25){
            nivel.muerto = true;
            nivel.velocidad = 0;
            nube.velocidad = 0;
            

            /* for (let step = 0; step < 1; step++) {
                // Se ejecuta 5 veces, con valores del paso 0 al 4.
                console.log('Camina un paso hacia el este');
              } */
            /* saltoWav.currentTime = -1;
            saltoWav.play(); */
            /* saltoWav.loop = false;
            saltoWav.play(); */
            
        }
        
        
    }
    
}

function sonidoMuerto() {
    for (let a = 0; a < 5; a++) {
        // Se ejecuta 5 veces, con valores del paso 0 al 4.
        console.log('Camina un paso hacia el este');
      }
}


function puntuacion(){
    
    if(nivel.muerto == true){
        ctx.font = "68px impact";
        ctx.fillStyle = "#555555";
        ctx.fillText(`Tu puntuacion: ${nivel.marcador}`,100,80);
        
    }else {
        ctx.font = "30px impact";
        ctx.fillStyle = "#555555";
        ctx.fillText(`${nivel.marcador}`,650,50);
    }
}


//BUCLE PRINCIPAL
const FPS = 50;
setInterval(function(){
    principal();
},1000/FPS);



function principal(){
    borraCanvas();
    gravedad();
    colision();
    logicaCactus();
    dibujarCactus();
    logicaNube();
    dibujarNube();
    logicaSuelo();
    dibujarSuelo();
    dibujaRex();
    puntuacion();
}