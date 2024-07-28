class Hud {
    constructor() {

    }


    draw() {
        // Draw the HUD:
        push();
        // translate((width - this.largura)/2, 0);
        // angleMode(DEGREES);
        // rotate(90);
        // noStroke();
        // fill(50);
        // rect(0, 0, (width - mundo.largura)/2, mundo.altura);
        // rect((width + mundo.largura)/2, 0, (width - mundo.largura)/2, mundo.altura);
        // rotate(0);
        image(imagemHUD9, mundo.largura, 0, mundo.largura, height);
        pop();
        // image(imagemHUD1, (width + mundo.largura)/2, 0, (width - mundo.largura)/2, height);
    }
}