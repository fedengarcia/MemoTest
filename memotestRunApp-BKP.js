localStorage.clear();

const getJugador =  (clave) => sessionStorage.getItem(clave);
const getLastView =  (clave) => sessionStorage.getItem(clave);
const saveLastView =  (clave,valor) => sessionStorage.setItem(clave,valor);
// const saveCard =  (clave,valor) => localStorage.setItem(clave,valor);
// const getCard =  (clave) => localStorage.getItem(clave);

saveCard('carta1','');
saveCard('carta2','');

const jugadorActual = JSON.parse(getJugador('Player'));

// GET del jugador ingresado y lo colocamos en la parte del Nombre
const jugador = document.getElementById('playerName');
jugador.innerHTML = `<h1 id='playerName'>Jugador: ${jugadorActual.nombre}`

//Declaracion del Boton para empezar a jugar
const btnComenzar = document.getElementById('btnComenzar');
btnComenzar.addEventListener('click', onClickComenzar);

//Declaracion del Boton para ir para atras
const btnAtras = document.getElementById('btnAtras');
btnAtras.addEventListener('click', onClickAtras);

//Tablero de juego oculto hasta elegir la dificultad y jugar.
var tablero = document.getElementById('tableConfig');
tablero.style.visibility=('hidden');

//Declaracion del form para elegir la dificultad
var memoMenu = document.getElementById('memoMenu');

//Guardo la viewAnterior
let viewAnterior = getLastView('ventana');
let memotest = '';

//CARTAS SELECCIONADAS
var cards = {
    'carta1':'',
    'carta2':''
}

// FUNCIONALIDAD BOTON PARA COMENZAR A JUGAR - CHECK SI HAY DIFICULTAD ELEGIDA
function onClickComenzar() {
    var dificultad = document.getElementById('dificultySelector');
    dificultad = dificultad.value;

    if(dificultad ==  'value0'){
        alert("Elige una fificultad");
    }else if (dificultad == 'value1' || dificultad == 'value2' || dificultad == 'value3') {
        memoMenu.style.visibility = "hidden";
        tablero.style.visibility=('visible');
        viewAnterior = 'memoMenu';
        memotest = new Memotest(dificultad);
        memotest.startGame();
   }
}

// FUNCIONALIDAD DEL BOTON PARA IR A LA VENTANA ANTERIOR - viewAnterior guarda la ventana anterior para saber donde se encuentra el usuario
function onClickAtras() {
    var tablero = document.getElementById('tableConfig');
    saveCard('carta1','');
    saveCard('carta2','');
    if(viewAnterior == 'index.html'){
        removeAllChildNodes(tablero);
        location.href = viewAnterior;
    }
    if (viewAnterior == 'memoMenu') {
        removeAllChildNodes(tablero);
        memoMenu.style.visibility = ('visible');
        tablero.style.visibility = ('hidden');
        viewAnterior = 'index.html';
    }
}

// Funcion para eliminar los hijos cuando se vuelve para atras. Sin esta funcion, las cartas se multiplicarian cuando van para atras y clickean en jugar nuevamente.
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

//Dar vuelta la carta
function onClickFlipCard(){
    var saveCard =  (clave,valor) => localStorage.setItem(clave,valor);
    var getCard =  (clave) => localStorage.getItem(clave);

    if(getCard('carta1') == '' && getCard('carta2') == ''){
        //Doy vuelta la carta y la guardo
        console.log('carta 1: ',this);
        saveCard('carta1',this.id);
        showCard(this);
    }else if ((getCard('carta1') != '') && getCard('carta2') == '') {
        console.log('carta 2: ',this);
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
    }//else if (getCard('carta1') != '' && getCard('carta2') != '') {
    //     if(this.id == getCard('carta1') && (this.childNodes[0].style.visibility == 'visible')){
    //         saveCard('carta1','');
    //         hideCard(this);
    //     }else if (this.id == getCard('carta2') && (this.childNodes[0].style.visibility == 'visible')) {
    //         saveCard('carta2','');
    //         hideCard(this);
    //     }
    // }

    
    if ((getCard('carta1') && getCard('carta2')) != '') {
        var card1 = document.getElementById(getCard('carta1'));
        var card2 = document.getElementById(getCard('carta2'));
        checkCard(card1,card2);
    }


    function checkCard(card1,card2) {
            
            if(card1.id === card2.id){
                console.log('Son iguales');
                setTimeout(() => {
                    saveCard('carta1','');
                    saveCard('carta2','');
                }, 1000);
                //remover el onclickButton, agregar contador de pares de cartas encontrados
            }else{
                console.log('Son distintas');
                setTimeout(() => {
                    saveCard('carta1','');
                    saveCard('carta2','');
                    hideCard(card1);
                    hideCard(card2);
                }, 1000);
                
               
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