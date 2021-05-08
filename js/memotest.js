class Memotest{
    constructor(dificultad){
        this.dificultad = dificultad;
    }

    //Check de dificultad y reparto las cartas en el tablero dependiendo de la misma
    armarTablero(){
        if (this.dificultad == 'value1') {
            this.repartirCartas(11,6);
        } else if (this.dificultad == 'value2') {
            this.repartirCartas(19,10);
        }else if (this.dificultad == 'value3') {
            this.repartirCartas(27,14);
        }
    }

    //Disparador de inicio de juego
    iniciarJuego() {
        this.armarTablero();
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
                

                // var divSecretCard = document.createElement('div');
                // divSecretCard.classList.add('cartaSecreta');
                // divSecretCard.innerHTML = `<h2>?</h2>`;

                // CUANDO SE EJECUTA ESTE EVENTO ? - No es en el onclick
                divCartaOriginal.addEventListener('click',this.onClickFlipCard);
                

                if(cantidadCartas == 27){
                    divCartaOriginal.innerHTML = `<div><img class="cartaDificil" src="../img/memo${numeroCarta}.png" alt=""></div><div class='cartaSecreta  animate__animated animate__bounceIn'><h2>?</h2></div>`;
                    tablero.appendChild(divCartaOriginal);
                    
                    repartir++;
                }else{
                    divCartaOriginal.innerHTML = `<div><img src="../img/memo${numeroCarta}.png" alt=""></div><div class="cartaSecreta animate__animated animate__bounceIn"><h2>?</h2></div>`;
                    tablero.appendChild(divCartaOriginal);
                    
                    repartir++;
                }
                
                divCartaOriginal.childNodes[0].style.visibility=('hidden');

            }
        }
    }

    //Dar vuelta la carta
    onClickFlipCard(){
        console.log(this.id);
        if (this.childNodes[0].style.visibility == 'visible'){
            this.childNodes[0].style.visibility=('hidden');
            this.childNodes[1].style.visibility=('visible');
            this.childNodes[0].classList.remove('animate__animated');
            this.childNodes[0].classList.remove('animate__flipInY');
            this.childNodes[1].classList.add('animate__animated');
            this.childNodes[1].classList.add('animate__bounceIn');
            
        }else{
            this.childNodes[0].classList.add('animate__animated');
            this.childNodes[0].classList.add('animate__flipInY');
            this.childNodes[0].style.visibility=('visible');
            this.childNodes[1].style.visibility=('hidden');
            this.childNodes[1].classList.remove('animate__animated');
            this.childNodes[1].classList.remove('animate__bounceIn');
            
        }   



    }


   

    
}
