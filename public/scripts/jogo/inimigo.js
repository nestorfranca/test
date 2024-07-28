class Inimigo {
    constructor(centerX, centerY, largura = 100, altura = 100) {
        this.centerX = centerX;     // posição do centro do objeto
        this.centerY = centerY;
        this.largura = largura;
        this.altura = altura;
        this.precisao = 0.7;

        this.setup();

        this.direcaoX = 1;
        this.direcaoY = -1;
        this.tempo_inicial = millis();
        this.vida = new Vida(round(this.largura), 3, 'red');
    }
    
    // atributos dinâmicos
    setup() {
         

        this.x = this.centerX - this.largura/2;
        this.y = this.centerY - this.altura/2;
        this.colisao = new Colisao(this.centerX, this.centerY, this.largura, this.altura, this.precisao);
        this.deletado = 0;

        // this.vida = new Vida();
        // this.velocidadeX = parseInt(random(-10, 10));
        this.velocidadeX = .5;

        this.velocidadeY = .5;        
    }
    
    // exibe a imagem do inimigo:
    draw() {
        this.setup();
        imagemInimigo.resize(0, this.largura);
        image(imagemInimigo, this.x, this.y, this.largura, this.altura)        
    }
    
    life(){
        this.vida.draw(this.x, this.y+this.altura);
    }

    // movimento é calcular a partir do centro do objeto:
    moveEixoX() {
        // console.log("direção " + this.direcaoX)
        this.centerX += (this.velocidadeX * this.direcaoX);        

        // this.centerX += this.velocidadeX;

        if (this.direcaoX == -1 && this.isMinX(mundo)) {
            // console.log("esquerda");
            this.centerX = mundo.getMinX() + this.largura / 2;
        }

        if (this.direcaoX == 1 && this.isMaxX(mundo)) {
            // console.log("direita");
            this.centerX = mundo.getMaxX() - this.largura / 2;
        }

        if (millis() - this.tempo_inicial >= 400) {
            this.tempo_inicial = millis();
            this.direcaoX = random() < 0.5 ? -1 : 1
        }
    }
    moveEixoY() {
        this.centerY += this.velocidadeY;
    }
    
    // atualiza os atributos e exibe o jogador:
    update() {
        this.setup();
        
        this.moveEixoX();
        this.moveEixoY();
        
        this.draw();
        this.life(); 
    }

    // ==================================================
    // Métodos Modificadores:
    deleta() {
        this.deletado = 1;
    }

    // ==================================================
    // Verificadores de posição:
    isMinX(objeto, offset = 0) {
        return this.getMinX() <= objeto.getMinX()+offset; 
    }
    
    isMaxX(objeto, offset = 0) {
        return this.getMaxX() >= objeto.getMaxX()-offset; 
    }

    isMinY(objeto, offset = 0) {
        return this.getMinY() <= objeto.getMinY()+offset; 
    }
    
    isMaxY(objeto, offset = 0) {
        return this.getMaxY() >= objeto.getMaxY()-offset; 
    }

    // ==================================================
    // Métodos Acessores:
    getMinX() {
        return this.x;
    }

    getMaxX() {
        return this.x + this.largura;
    }

    getMinY() {
        return this.y;
    }

    getMaxY() {
        return this.y + this.altura;
    }

    getCenterX() {
        return this.centerX;
    }

    getCenterY() {
        return this.centerY;
    }
}