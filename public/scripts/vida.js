class Vida {
    constructor() {
        this.vidas = 3;
    }

    decrement() {
        this.vidas -= 1;
        if (this.vidas < 0) {
            
        }
    }

    draw(context) {
        context.fillStyle = 'white';
        context.font = '20px Arial';
        context.fillText(`Vidas: ${this.vidas}`, 700, 20);
    }
}

