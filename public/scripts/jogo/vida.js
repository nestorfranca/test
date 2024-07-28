// let life;
// var vidaMaxima;
class Vida {
    constructor(finalX, vidas, color) {
        this.vidas = vidas;
        this.finalX = finalX;
        this.color = color;
        this.vidaMaxima = this.finalX;
        this.life = round(this.finalX)/this.vidas;
    }

    decremento(){
        // console.log(life);
        this.finalX -= this.life;
        if(this.finalX <= 0){
            this.finalX = 0;
        }
    }

    draw(x, y){
        push();
            fill(0);
            rect(x, y, round(this.vidaMaxima), 5);
        pop();
        push();
            noStroke();
            fill(this.color);
            rect(x, y, round(this.finalX), 5);
        pop();
    }
}

