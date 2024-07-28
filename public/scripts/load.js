let imagemJogador;
let imagemInimigo;
let imagemFundo;
let imagemProjetil;
let imagemGameOver;
let imagemTelaInicial

let imagemHUD1;
let imagemHUD2;
let imagemHUD3;
let imagemHUD4;
let imagemHUD5;
let imagemHUD6;
let imagemHUD7;
let imagemHUD8;

let somProjetil

function preload() {
    // load the images here
    imagemJogador = loadImage("img/player.png");
    imagemInimigo = loadImage("img/enemy.png");
    imagemFundo = loadImage("img/background.jpg");
    imagemGameOver = loadImage("img/game-over.png");
    imagemTelaInicial = loadImage("img/tela_inical1.jpeg")
    
    imagemHUD1 = loadImage("img/interface/frame3.png");
    imagemHUD2 = loadImage("img/interface/frame8.png");
    imagemHUD3 = loadImage("img/interface/frame1(1).png");
    imagemHUD4 = loadImage("img/interface/frame2.png");
    imagemHUD5 = loadImage("img/interface/frame4.png");
    imagemHUD6 = loadImage("img/interface/frame5.png");
    imagemHUD7 = loadImage("img/interface/frame6.png");
    imagemHUD8 = loadImage("img/interface/frame7.png");
    imagemHUD9 = loadImage("img/interface/frame2(2).png");
    
    imagemProjetil = loadImage("img/projetil.png");
    somProjetil = loadSound("sounds/snd_projetil.wav");
}

// Dispara e inicia a rajada.
function keyPressed() {
    if (key === ' ') {
        jogador.atiraRajada();
    }
}

// Para a rajada quando a tecla espaço é solta.
function keyReleased() {
    if (key === ' ') {
        jogador.disparando = false; // Para de atirar quando a tecla é solta
    }
}