let mundo;
let imagemInicial;

function setup() {
    createCanvas(windowHeight, windowHeight);
    mundo = new Mundo();
    mundo.setup();

    // frameRate(80);

    // imagemInicial = new TelaInicial();
}

function draw() {
    background(100, 100, 100, 128);
    mundo.draw();
    mundo.step();

    // imagemInicial.draw();
}