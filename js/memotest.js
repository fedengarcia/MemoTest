class Memotest{
    constructor(dificultad){
        this.dificultad = dificultad;
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
    startGame() {
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
        var saveCard =  (clave,valor) => localStorage.setItem(clave,valor);
        var getCard =  (clave) => localStorage.getItem(clave);

        if(getCard('carta1') == '' && getCard('carta2') == ''){
            //Doy vuelta la carta y la guardo
            saveCard('carta1',this.id);
            showCard(this);
        }else if ((getCard('carta1') != '') && getCard('carta2') == '') {
            if(this.id != getCard('carta1')){
                //Si la carta elegida es distinta la doy vuelta
                saveCard('carta2',this.id);
                showCard(this);
            }else{
                if(this.childNodes[0].style.visibility == 'visible') {
                    //La vuelvo a dar vuelta
                    saveCard('carta1','');
                    hideCard(this)
                }else{
                    saveCard('carta2',this.id);
                    showCard(this)
                }
            }
            
        }else if (getCard('carta1') == '' && getCard('carta2') != '') {
            if(this.id !=  getCard('carta2')){
                //Si la carta elegida es distinta la doy vuelta
                saveCard('carta1',this.id);
                showCard(this);
            }else{
                if(this.childNodes[0].style.visibility == 'visible') {
                    //La vuelvo a dar vuelta
                    saveCard('carta2','');
                    hideCard(this)
                }else{
                    saveCard('carta1',this.id);
                    showCard(this)
                }
            }
        }else if (getCard('carta1') != '' && getCard('carta2') != '') {
            if(this.id == getCard('carta1') && (this.childNodes[0].style.visibility == 'visible')){
                saveCard('carta1','');
                hideCard(this);
            }else if (this.id == getCard('carta2') && (this.childNodes[0].style.visibility == 'visible')) {
                saveCard('carta2','');
                hideCard(this);
            }
        }

        function showCard(div){
            div.childNodes[0].style.visibility=('visible');
            div.childNodes[0].classList.add('animate__animated');
            div.childNodes[0].classList.add('animate__flipInY');
            div.childNodes[1].style.visibility=('hidden');
            div.childNodes[1].classList.remove('animate__animated');
            div.childNodes[1].classList.remove('animate__bounceIn');
        }

        function hideCard(div) {
            div.childNodes[0].style.visibility=('hidden');
            div.childNodes[0].classList.remove('animate__animated');
            div.childNodes[0].classList.remove('animate__flipInY');
            div.childNodes[1].style.visibility=('visible');
            div.childNodes[1].classList.add('animate__animated');
            div.childNodes[1].classList.add('animate__bounceIn'); 
        }

    }

    


}

