localStorage.clear();

const getJugador =  (clave) => sessionStorage.getItem(clave);
const getLastView =  (clave) => sessionStorage.getItem(clave);
const saveLastView =  (clave,valor) => sessionStorage.setItem(clave,valor);

const memotest = new Memotest();
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
        memotest.startGame(dificultad);
   }
}

// FUNCIONALIDAD DEL BOTON PARA IR A LA VENTANA ANTERIOR - viewAnterior guarda la ventana anterior para saber donde se encuentra el usuario
function onClickAtras() {
    
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


function onClickFlipCard(){
    
    if(memotest.valorMemoria.length < 2){
        console.log(this.childNodes[0]);
        if(memotest.valorMemoria.length == 0 && this.childNodes[0].style.visibility == 'hidden'){
            console.log("carta1 Elegida: ",this.id);
            memotest.valorMemoria.push(this.id);
            showCard(this);
        }else if (memotest.valorMemoria.length == 1 && this.childNodes[0].style.visibility == 'hidden') {
            console.log("carta2 Elegida: ",this.id);
            memotest.valorMemoria.push(this.id);
            showCard(this);
            // checkCard();
            if(memotest.valorMemoria[0] == memotest.valorMemoria[1]){
                console.log("Son iguales! muy bien!");

                memotest.cartaEncontrada += 2;
                memotest.valorMemoria = [];

                if(memotest.cartaEncontrada == memotest.memoria.length){
                    if(memotest.dificultad == 'value1'){
                        alert("Terminaste el juego! Felicitaciones!, preparate para un nivel más dificil");
                    }else if (memotest.dificultad == 'value2'){
                        alert("Terminaste el juego! Felicitaciones!, preparate para el ultimo nivel");
                    }else if (memotest.dificultad == 'value3'){
                        alert("Terminaste el juego! Lo completaste en todas las dificultades. Vuelve a comenzar!");
                    }

                    if (memotest.dificultad != 'value3'){
                        let dificultadActual = parseInt(memotest.dificultad[5]);
                        let cambiarDificultad = dificultadActual + 1
                        memotest.dificultad = 'value' + String(cambiarDificultad);
                        removeAllChildNodes(tablero);
                        memotest.buildTableGame();
                    }else{
                        memotest.dificultad = 'value1' ;
                        removeAllChildNodes(tablero);
                        memotest.buildTableGame();
                    }
                }
            }else{
                var card1 = document.getElementById(memotest.valorMemoria[0]);
                var card2 = document.getElementById(memotest.valorMemoria[1]);
                setTimeout(() => {
                    hideCard(card1,card2);
                }, 1000);
                memotest.valorMemoria = [];
            }
            
        }
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

function hideCard(div1, div2) {
    console.log("Esconder-> ", div1.id);
    console.log("Esconder-> ", div2.id);

    div1.childNodes[0].style.visibility=('hidden');
    div1.childNodes[1].style.visibility=('visible');

    div2.childNodes[0].style.visibility=('hidden');
    div2.childNodes[1].style.visibility=('visible');

    // div1.childNodes[1].style.visibility=('visible');

    div1.childNodes[0].classList.remove('animate__animated');
    div1.childNodes[0].classList.remove('animate__flipInY');
    
    
    div1.childNodes[1].classList.add('animate__animated');
    div1.childNodes[1].classList.add('animate__bounceIn'); 

   
    // div2.childNodes[1].style.visibility=('visible');

    div2.childNodes[0].classList.remove('animate__animated');
    div2.childNodes[0].classList.remove('animate__flipInY');
    
    

    // div2.childNodes[1].classList.add('animate__animated');
    // div2.childNodes[1].classList.add('animate__bounceIn'); 
}