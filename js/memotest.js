class Memotest{
    constructor(){
        this.dificultad = '';
        this.memoria = [];
        this.valorMemoria = [];
        this.cartaEncontrada = 0;
    }

    //Check de dificultad y reparto las cartas en el tablero dependiendo de la misma
    buildTableGame(){
        if (this.dificultad == 'value1') {
            this.dealCards(11,6);
        } else if (this.dificultad == 'value2') {
            this.dealCards(19,10);
        }else if (this.dificultad == 'value3') {
            this.dealCards(27,14);
        }
    }

    //Disparador de inicio de juego
    startGame(dificultad) {
        this.dificultad = dificultad;
        this.buildTableGame();
    }

    //Distribuyo las cartas en orden aleatorio
    dealCards(cantidadCartas,randomNumber){
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
                

                // var divSecretCard = document.createElement('div');
                // divSecretCard.classList.add('cartaSecreta');
                // divSecretCard.innerHTML = `<h2>?</h2>`;

                // LE AGREGO EL EVENTO ONCLICK
                divCartaOriginal.addEventListener('click',onClickFlipCard);
                

                if(cantidadCartas == 27){
                    divCartaOriginal.innerHTML = `<div><img class="cartaDificil" src="../img/memo${numeroCarta}.png" alt=""></div><div class='cartaSecreta  animate__animated animate__bounceIn'><h2>?</h2></div>`;
                    tablero.appendChild(divCartaOriginal);
                    
                    repartir++;
                }else{
                    divCartaOriginal.innerHTML = `<div><img src="../img/memo${numeroCarta}.png" alt=""></div><div class="cartaSecreta animate__animated animate__bounceIn"><h2>?</h2></div>`;
                    tablero.appendChild(divCartaOriginal);
                    
                    repartir++;
                }
                //Oculto la carta original
                divCartaOriginal.childNodes[0].style.visibility=('hidden');

            }
        }
        this.memoria = repetido;

    }


    
    
    


}

