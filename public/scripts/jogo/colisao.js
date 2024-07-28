class Colisao {
    constructor (objetoX, objetoY, objetoLargura, objetoAltura, precisao = 1.0) {
        this.largura = objetoLargura * precisao;
        this.altura = objetoAltura * precisao;
        this.x = objetoX - this.largura/2;
        this.y = objetoY - this.altura/2;
    }
    
    drawHitBox() {
        // let precisaoObjeto = 0.7;
        // let precisaoColisor = 0.7;

        // let objetoLargura = objeto.largura * precisaoObjeto;
        // let objetoAltura = objeto.altura * precisaoObjeto;
        // let objetoX = objeto.centerX - objetoLargura/2;
        // let objetoY = objeto.centerY - objetoAltura/2;

        // let colisorLargura = colisor.largura * precisaoColisor;
        // let colisorAltura = colisor.altura * precisaoColisor;
        // let colisorX = colisor.centerX - colisorLargura/2;
        // let colisorY = colisor.centerY - colisorAltura/2;

        push();
            fill(100,100,100, 50);
            rect(this.x, this.y, this.largura, this.altura);
            // rect(colisorX, colisorY, colisorLargura, colisorAltura);
        pop();
    }

    colide(hitBoxColisor) {
        
        // let objetoX = hitBoxObjeto.x;
        // let objetoY = hitBoxObjeto.y;
        // let objetoLargura = hitBoxObjeto.largura;
        // let objetoAltura = hitBoxObjeto.altura;

        let objetoX = this.x;
        let objetoY = this.y;
        let objetoLargura = this.largura;
        let objetoAltura = this.altura;

        let colisorX = hitBoxColisor.x;
        let colisorY = hitBoxColisor.y;
        let colisorLargura = hitBoxColisor.largura;
        let colisorAltura = hitBoxColisor.altura;

        const colisao = collideRectRect(
            objetoX,    objetoY,    objetoLargura,  objetoAltura,
            colisorX,   colisorY,   colisorLargura, colisorAltura,
        );

        return colisao;
    }
}