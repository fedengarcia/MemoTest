const getJugador =  (clave) => sessionStorage.getItem(clave);
const getViewAnterior =  (clave) => sessionStorage.getItem(clave);
const guardarViewAnterior =  (clave,valor) => sessionStorage.setItem(clave,valor);

var jugadorActual = JSON.parse(getJugador('Player'));

// GET del jugador ingresado y lo colocamos en la parte del Nombre
const jugador = document.getElementById('playerName');
jugador.innerHTML = `<h1 id='playerName'>Jugador: ${jugadorActual.nombre}`

//Tablero de juego oculto hasta elegir la dificultad y jugar.
var tablero = document.getElementById('tableConfig');
tablero.style.visibility=('hidden');

//Declaracion del Boton para empezar a jugar
const btnComenzar = document.getElementById('btnComenzar');
btnComenzar.addEventListener('click', onClickComenzar);

//Declaracion del Boton para ir para atras
const btnAtras = document.getElementById('btnAtras');
btnAtras.addEventListener('click', onClickAtras);

//Declaracion del form para elegir la dificultad
var memoMenu = document.getElementById('memoMenu');

//Guardo la viewAnterior
let viewAnterior = getViewAnterior('ventana');


// const btnFlipCard = document.getElementById('btnFlipCard');
// btnFlipCard.addEventListener('click', onclickFlipCard);


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
        memotest.iniciarJuego();
   }
}

// FUNCIONALIDAD DEL BOTON PARA IR A LA VENTANA ANTERIOR - viewAnterior guarda la ventana anterior para saber donde se encuentra el usuario
function onClickAtras() {
    var tablero = document.getElementById('tableConfig');

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

//Encargada de mostrar las cartas ocultas
function onclickFlipCard() {
    

}