localStorage.clear();

const getJugador =  (clave) => sessionStorage.getItem(clave);
const getLastView =  (clave) => sessionStorage.getItem(clave);
const saveLastView =  (clave,valor) => sessionStorage.setItem(clave,valor);
const saveCard =  (clave,valor) => localStorage.setItem(clave,valor);
const getCard =  (clave) => localStorage.getItem(clave);

saveCard('carta1','');
saveCard('carta2','');

$('.memoHeader1').append('<h1 class="headerMemoTitle">MEMOTEST</h1>');

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

