class Memotest{
    constructor(dificultad){
        this.dificultad = dificultad;
    }

    //Check de dificultad y reparto las cartas en el tablero dependiendo de la misma
    armarTablero(dificultad){
        if (dificultad == 'value1') {
            this.repartirCartas(11,6);
        } else if (dificultad == 'value2') {
            this.repartirCartas(19,10);
        }else if (dificultad == 'value3') {
            this.repartirCartas(27,14);
        }
    }

    //Disparador de inicio de juego
    iniciarJuego() {
        this.armarTablero(this.dificultad);
    }

    //Distribuyo las cartas en orden aleatorio
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

                var divCartaOriginal = document.createElement('div');
                divCartaOriginal.classList.add('carta');
                divCartaOriginal.setAttribute('id',`carta-${numeroCarta}`);

                // CUANDO SE EJECUTA ESTE EVENTO ? - No es en el onclick
                divCartaOriginal.addEventListener('click',this.onClickFlipCard);
                
                var divSecretCard = document.createElement('div');
                divSecretCard.classList.add('cartaSecreta');
                divSecretCard.innerHTML = `<h2>?</h2>`;

                if(cantidadCartas == 27){
                    divCartaOriginal.innerHTML = `<img class="cartaDificil" src="../img/memo${numeroCarta}.png" alt="">`;
                    divCartaOriginal.appendChild(divSecretCard);
                    tablero.appendChild(divCartaOriginal);
                    
                    repartir++;
                }else{
                    divCartaOriginal.innerHTML = `<img src="../img/memo${numeroCarta}.png" alt="">`;
                    divCartaOriginal.appendChild(divSecretCard);
                    tablero.appendChild(divCartaOriginal);
                    
                    repartir++;
                }
                divCartaOriginal.childNodes[0].style.visibility=('hidden');

            }
        }
    }

    onClickFlipCard(){
        const ids = [];
        console.log('Dificultad-->',this.dificultad);
        if (this.dificultad == 'value1') {
            for (let index = 0; index < 6; index++) {
                ids.push(String(index+1));    
            }
        } else if (this.dificultad  == 'value2') {
            for (let index = 0; index < 10; index++) {
                ids.push(String(index+1));    
            }
        }else if (this.dificultad  == 'value3') {
            for (let index = 0; index < 14; index++) {
                ids.push(String(index+1));    
            }
        }
        console.log(ids) 
        // for (let index = 0; index < arrayCartas.length; index++) {
        //     var carta = arrayCartas[index];
        //     console.log(carta.getAttribute(id));
        // }
    }


   

    
}
