class Projetil {
    constructor(centerX, centerY, largura = 0.5, altura = 2, vel = 10) {
        this.centerX = centerX;
        this.centerY = centerY;
        this.largura = largura;
        this.altura = altura;
        this.vel = vel;
        this.deletado = false;

        this.setup();
    }

    setup() {
        this.x = this.centerX - this.largura / 2;
        this.y = this.centerY - this.altura / 2;
        this.colisao = new Colisao(this.centerX, this.centerY, this.largura, this.altura);
    }

    draw() {
        push();
            image(imagemProjetil, this.x, this.y, this.largura*mundo.escala, this.altura*mundo.escala);
        // fill(255, 0, 0);
        // rect(this.x, this.y, this.largura, this.altura);
        pop();
    }

    move() {
        this.centerY -= this.vel;
    }

    update() {
        this.move();
        this.setup();
        this.draw();
    }

    deleta() {
        this.deletado = true;
    }
}
