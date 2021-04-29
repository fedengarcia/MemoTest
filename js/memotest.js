class Memotest{
    constructor(dificultad){
        this.dificultad = dificultad;
    }

    armarTablero(dificultad){
        if (dificultad == 'value1') {
            this.repartirCartas(11,6);
        } else if (dificultad == 'value2') {
            this.repartirCartas(19,10);
        }else if (dificultad == 'value3') {
            this.repartirCartas(27,14);
        }
    }

    iniciarJuego() {
        this.armarTablero(this.dificultad);
    }

    repartirCartas(cantidadCartas,randomNumber){
        var repetido = [];
        var repartir = 0
        var tablero = document.getElementById('tableConfig');

        while(repartir <= cantidadCartas) {
            var numeroCarta = Math.floor((Math.random() * randomNumber) + 1);
            var count = 0;
            for (let index = 0; index < repetido.length; index++) {
                if (repetido[index] == numeroCarta) {
                    count = count + 1;
                }
            }
            if(count < 2){
                repetido.push(numeroCarta);
                var div = document.createElement('div');
                div.classList.add('carta');
                div.innerHTML = `<h2>En construcción</h2>`
                tablero.appendChild(div);
                repartir++;
            }
            
        }
    }

}
