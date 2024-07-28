class Jogador {
    constructor(centerX, centerY, largura = 54, altura = 75, velocidade = 3) {
        this.centerX = centerX;     // posição do centro do objeto
        this.centerY = centerY;     
        this.largura = largura;
        this.altura = altura;
        this.velocidade = velocidade;

        this.precisao = 0.7;
        
        this.setup();

        this.vida = new Vida(round(this.largura), 10, 'green');
        
        // projeteis --------------------------------------------------
        this.projeteis = []; // Array para armazenar os projeteis
        this.tirosRestantes = 0; // Contador para rajadas
        this.ultimoDisparo = 0;  // Tempo do último disparo
        this.intervaloRajada = 0; // Intervalo entre cada tiro na rajada (em milissegundos)
        
        this.direcaoX = -1;
        this.direcaoY = -1;
        this.disparando = false;    // Flag para saber se está disparando
        // projeteis --------------------------------------------------
    }

    // atributos dinâmicos
    setup() {
        this.x = this.centerX - this.largura/2;
        this.y = this.centerY - this.altura/2;
        this.colisao = new Colisao(this.centerX, this.centerY, this.largura, this.altura, this.precisao);

        this.tempoRajada = 50; // Intervalo entre cada rajada (em milissegundos) -- projeteis
    }

    // Função para atirar - // projeteis ------------------------------
    atira() {
        let agora = millis();
        if (this.tirosRestantes > 0 && agora - this.ultimoDisparo >= this.intervaloRajada) {
            let projetil = new Projetil(this.centerX, this.centerY - this.altura / 2);
            this.projeteis.push(projetil);
            this.tirosRestantes--;
            this.ultimoDisparo = agora;
            somProjetil.play();
        }
    }

    atiraRajada() {
        if (!this.disparando) {
            this.tirosRestantes = 1;    // Quantidade de tiros por rajada(depois aumentar de acordo com a fase).
            this.disparando = true;
            this.ultimoDisparo = millis();
        }
    }
    // projeteis --------------------------------------------------
    
    life(){
        this.vida.draw(this.x, this.y+this.altura);
    }

    // exibe a imagem do jogador:
    draw() {
        image(imagemJogador, this.x, this.y, this.largura, this.altura)
    }

    // movimento é calcular a partir do centro do objeto:
    moveEixoX() {
        if((keyIsDown(65) === true || keyIsDown(37) === true)) {  // A ou "Seta p/ Esquerda"
            this.direcaoX = 0;
            this.centerX -= this.velocidade;
        }
        if(keyIsDown(68) === true || keyIsDown(39) === true) {  // D ou "Seta p/ Direita"
            this.direcaoX = 1;
            this.centerX += this.velocidade;
        }

        if (this.direcaoX == 0 && this.isMinX(mundo)) {
            // console.log("esquerda");
            this.centerX = mundo.getMinX() + this.largura / 2;
        }

        if (this.direcaoX == 1 && this.isMaxX(mundo)) {
            // console.log("direita");
            this.centerX = mundo.getMaxX() - this.largura / 2;
        }
    }
    
    moveEixoY() {
        if(keyIsDown(87) === true || keyIsDown(38) === true) {  // W ou "Seta p/ Cima"
            this.direcaoY = 0;
            this.centerY -= this.velocidade;
        }
        if(keyIsDown(83) === true || keyIsDown(40) === true) {  // S ou "Seta p/ Baixo"
            this.direcaoY = 1;
            this.centerY += this.velocidade;
        }

        if (this.direcaoY == 0 && this.isMinY(mundo)) {
            // console.log("cima");
            this.centerY = mundo.getMinY() + this.altura / 2;
        }

        if (this.direcaoY == 1 && this.isMaxY(mundo)) {
            // console.log("baixo");
            this.centerY = mundo.getMaxY() - this.altura / 2;
        }
    }

    // atualiza os atributos e exibe o jogador:
    update() {
        console.log(this.vida.finalX);

        this.setup();
        this.moveEixoX();
        this.moveEixoY();    
        this.draw();
        this.life();
        
        this.updateProjeteis();  // projeteis

        let agora = millis();
        if (this.tirosRestantes > 0) {
            this.atira();
        } else if (this.disparando && agora - this.ultimoDisparo >= this.tempoRajada) {
            this.tirosRestantes = 1; // define o tamanho da rajada
            this.ultimoDisparo = agora;
        }
    }

    // Atualiza os projeteis ---------------------------------------
    updateProjeteis() {
        for (let i = this.projeteis.length - 1; i >= 0; i--) {
            let projetil = this.projeteis[i];
            projetil.update();
            if (projetil.centerY < 0 || projetil.deletado) {
                // somProjetil.play();
                this.projeteis.splice(i, 1);
            }
        }
    }
    // projeteis --------------------------------------------------
    
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