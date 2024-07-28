let jogador;
let inimigo;
let count = 0, horda;
let posicao;
let velocidadeJogador;
let hud;

class Mundo {
    constructor() {
        this.altura = height;
        this.largura = this.altura * 0.5;
        // this.x = (width - this.largura) / 2;
        // this.y = 0;
        this.x = 0;
        this.y = 0;
        this.inimigos = [];
        this.escala = height/100;
        jogador = new Jogador((this.largura/2), (height - 100), (7 * this.escala), (10 * this.escala), (0.5 * this.escala));
        this.tempoInicial = millis();
    }

    // inicializa os objetos:
    setup() {
        hud = new Hud();
    }

    // exibe a tela do jogo:
    draw() {

        // ==================================================
        // Tela central:
        imagemFundo.resize(0, height);
        image(imagemFundo, this.x, this.y, this.largura, this.altura, 0, this.y, this.largura, this.altura, CONTAIN);
        
        // inseri um filtro branco, para deixar a imagem menos escura:
        push();
        noStroke();
        fill(255, 255, 255, 50);
        rect(this.x, this.y, this.largura, this.altura);
        pop();

        // ==================================================
        // HUD:
        hud.draw();
    }

    // atualiza os objetos em campo:
    step() {

        // atualiza os parâmetros do jogador:
        jogador.update();
        
        this.geraInimigo(); 
        
        
        // exibe as hitbox (temporário)
        // jogador.colisao.drawHitBox();
        for (let inim of this.inimigos) {
            inim.update();
            // inim.colisao.drawHitBox();
        }

        // Verifica colisão ente o disparo e os inimigos - projeteis --
        this.verificaColisoes();

        // elimina os inimigos atingidos
        this.eliminaInimigo();
    }

    // cria a horda de inimígos:
    geraInimigo() {
        let len = this.inimigos.length;
        // Até o início da horda, terá uma espera de 1 segundo:
        if (millis() - this.tempoInicial >= 1000) {
            this.tempoInicial = millis();
            count = 0;
            posicao = random((this.x + 60/2), (this.largura - 60/2));
        }
        if (count == 0 && len == 0) {
            setTimeout(() => {
                if (count == 0) {
                    horda = parseInt(random(3, 6));   // número de naves na horda (3 a 5)
                    
                // inimigo = new Inimigo(posicao, -(count*60+30), 60, 60);  
                    inimigo = new Inimigo(posicao, -(6*this.escala/2), 6*this.escala, 6*this.escala);  
                    this.inimigos.push(inimigo);
                    count++;            
                }
            }, 1000);
        }
        
        // o restante da horda é exibida:
        else if (count < horda && (this.inimigos.length == 0 || !this.isMinY(this.inimigos[len-1], 10))) {
            // console.log("novo");
            // inimigo = new Inimigo(posicao, -(count*70+30), 60, 60);  
            inimigo = new Inimigo(posicao, -(6*this.escala/2), 6*this.escala, 6*this.escala);  
            this.inimigos.push(inimigo);
            count++;
        }
        // console.log("count: "+count);
        // console.log("hordas: "+horda);
        // console.log("len: "+this.inimigos.length);
        
        // atualiza os parâmetros dos inimigos
        for (let inim of this.inimigos) {
            inim.update();            
        }
    }

    // elimina os inimigos marcados:
    eliminaInimigo() {
        for (let i = this.inimigos.length-1; i >= 0; i--) {
            if (this.inimigos[i].deletado) {
                // console.log("deletou "+i);
                // this.inimigos.pop(i);
                this.inimigos.splice(i, 1);
            }
        }

        // Caso a horda seja toda destruída, zera o contador e uma nova horda iniciará
        if (count == horda && this.inimigos.length == 0) {
            count = 0;
        }

    }

    // projeteis --------------------------------------------------
    // verifica colisões entre os objetos:
    verificaColisoes() {
        let hitBoxJogador = jogador.colisao;
        let hitBoxInimigo;
        let hitBoxProjetil;

        // colisões entre jogador e inimigo:
        for (let inim of this.inimigos) {
            hitBoxInimigo = inim.colisao;
            // hitBoxInimigo.drawHitBox();

            if (hitBoxInimigo.colide(hitBoxJogador)) {
                jogador.vida.decremento();
                console.log(jogador.vida.finalX);
                if(jogador.vida.finalX <= 0){
                    push();
                    fill('#ff000022');
                    rect(0, 0, width, height);
                    imagemGameOver.resize(this.largura, 0);
                    image(imagemGameOver, this.x, (height - imagemGameOver.height)/2, imagemGameOver.width, imagemGameOver.height, 0, 0, width, height);
                    pop();
                    noLoop();
                }
                inim.deleta();
                // noLoop();
            }            
        }
        
        // colisões entre projetil e inimigo:
        for (let projetil of jogador.projeteis) {
            hitBoxProjetil = projetil.colisao;
            for (let inim of this.inimigos) {
                hitBoxInimigo = inim.colisao;
                if (hitBoxInimigo.colide(hitBoxProjetil)) {
                    projetil.deleta();
                    inim.vida.decremento();
                    if(inim.vida.finalX <= 0){
                        inim.deleta();
                    }
                }
            }
        }

        // verifica se o inimigo chegou ao fim da tela:
        for (let inim of this.inimigos) {
            if (this.isMaxY(inim, -inim.altura)) {
                inim.deleta();
            }
        }
    }
    // projeteis --------------------------------------------------
    

    // ==================================================
    // Verificadores de posição:
    isMinX(objeto, offset = 0) {
        return objeto.getMinX() < this.getMinX()+offset; 
    }
    
    isMaxX(objeto, offset = 0) {
        return objeto.getMaxX() > this.getMaxX()-offset; 
    }

    isMinY(objeto, offset = 0) {
        return objeto.getMinY() < this.getMinY()+offset; 
    }
    
    isMaxY(objeto, offset = 0) {
        return objeto.getMaxY() > this.getMaxY()-offset; 
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
        return this.x + this.largura / 2;
    }

    getCenterY() {
        return this.y + this.altura / 2;
    }
}