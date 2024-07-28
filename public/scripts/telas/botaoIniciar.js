let botao;

class BotaoGerenciador {
    constructor(texto, x, y) {
      this.texto = texto;
      this.x = x;
      this.y = y;
      this.botao = createButton(this.texto);
      this.botao.mousePressed(() => this._alteraCena());
      this.botao.addClass('botao-tela-inicial');
  
    }
  
    draw() {
      this.botao.position(this.x, this.y);
      this.botao.center('horizontal');
    }
  
    _alteraCena() {
      this.botao.remove();
      cenaAtual = 'game';
    }
  
    recomecar() {
      // botaoGerenciador = new BotaoGerenciador('Recomeçar', width / 2, height / 2);
      cenaAtual = 'telaInicial';
  
    }
  }