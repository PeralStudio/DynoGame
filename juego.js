let perdisteWav = new Audio("/sonidos/failuresound.wav");
let saltoWav = new Audio("/sonidos/retrojump.wav");
let imgRex, imgNube, imgCactus, imgSuelo;

let ancho = 700;
let alto = 300;
let canvas, ctx;

let suelo = 200;
let trex = { y: suelo, vy: 0, gravedad: 2, salto: 28, vymax: 9, saltando: false };
let nivel = { velocidad: 9, marcador: 0, muerto: false };
let cactus = { x: ancho + 100, y: suelo - 5 };
let nube = { x: 730, y: 20, velocidad: 1 };
let suelog = { x: 0, y: 242 };


document.addEventListener('keydown', function (event) {
    if (event.code == "Space") {
        console.log("salta")

        if (nivel.muerto === false && trex.saltando === false) saltar();
        if (trex.saltando === true) {
            return;
        } else {
            trex.saltando === true
            nivel.velocidad = 9;
            nube.velocidad = 1, nube.x = 730, nube.y = 20;
            nivel.marcador = 0;
            cactus.x = ancho + 100;
            nivel.muerto = false;
        }
    }
});

//Cargar Imagenes
function cargaImagenes() {
    imgRex = new Image();
    imgNube = new Image();
    imgCactus = new Image();
    imgSuelo = new Image();

    imgRex.src = '/img/Rex.png'
    imgNube.src = '/img/Nube.png'
    imgCactus.src = '/img/Cactus.png'
    imgSuelo.src = '/img/Suelo.png'
}

//Iniciar Canvas y cargar las imagenes
function inicializa() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    cargaImagenes();
}

function borraCanvas() {
    canvas = document.getElementById("canvas");
    /* console.log(canvas.width) */
    canvas.width = ancho;
    canvas.height = alto;
}

function dibujaRex() {
    cargaImagenes();
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    ctx.drawImage(imgRex, 0, 0, 69, 69, 100, trex.y, 50, 50)
}

function dibujarCactus() {
    cargaImagenes();
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    ctx.drawImage(imgCactus, 0, 0, 60, 60, cactus.x, cactus.y, 60, 60)
}

function logicaCactus() {
    if (cactus.x < -100) {
        cactus.x = ancho + 100;
        nivel.marcador++;
    }
    else {
        cactus.x -= nivel.velocidad;
    }
}

function dibujarNube() {
    cargaImagenes();
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    ctx.drawImage(imgNube, 0, 0, 75, 75, nube.x, nube.y, 75, 75)
}

const logicaNube = () => nube.x < -100 ? nube.x = ancho + 100 : nube.x -= nube.velocidad;

function dibujarSuelo() {
    cargaImagenes();
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    ctx.drawImage(imgSuelo, suelog.x, 0, 2377, 12, 0, suelog.y, 2377, 12)
}

function logicaSuelo() {
    (suelog.x > 1700) ? suelog.x = 0 : suelog.x += nivel.velocidad;
}

function saltar() {
    saltoWav.play();
    trex.saltando = true;
    trex.vy = trex.salto;
}

let gravedad = () => {
    if (trex.saltando == true) {

        if (trex.y - trex.vy - trex.gravedad > suelo) {
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

function colision() {
    if (cactus.x >= 50 && cactus.x <= 150) {
        if (trex.y >= suelo - 25) {
            nivel.muerto = true;
            nivel.velocidad = 0;
            nube.velocidad = 0;
        }
    }
}

function puntuacion() {

    if (nivel.muerto == true) {
        ctx.font = "68px impact";
        ctx.fillStyle = "#555555";
        ctx.fillText(`Tu puntuacion: ${nivel.marcador}`, 100, 80);

    } else {
        ctx.font = "30px impact";
        ctx.fillStyle = "#555555";
        ctx.fillText(`${nivel.marcador}`, 650, 50);
    }
}

//BUCLE PRINCIPAL
const FPS = 50;
setInterval(function () {
    principal();
}, 1000 / FPS);

function principal() {
    borraCanvas();
    gravedad();
    dibujarCactus();
    dibujaRex();
    colision();
    logicaCactus();
    logicaNube();
    dibujarNube();
    logicaSuelo();
    dibujarSuelo();
    puntuacion();
}