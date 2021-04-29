const getJugador =  (clave) => sessionStorage.getItem(clave);

var jugadorActual = JSON.parse(getJugador('Player'));

const jugador = document.getElementById('playerName');
jugador.innerHTML = `<h1 id='playerName'>Jugador: ${jugadorActual.nombre}`

var tablero = document.getElementById('tableConfig');
tablero.style.visibility=('hidden');

const btnComenzar = document.getElementById('btnComenzar');
btnComenzar.addEventListener('click', onClickComenzar);

var nivelDificultad = ''


function onClickComenzar() {
    var memoMenu = document.getElementById('memoMenu');
    var dificultad = document.getElementById('dificultySelector');
    dificultad = dificultad.value;

    if(dificultad ==  'value0'){
        alert("Elige una fificultad");
    }else if (dificultad == 'value1' || dificultad == 'value2' || dificultad == 'value3') {
        memoMenu.style.visibility = "hidden";
        tablero.style.visibility=('visible');
        var memotest = new Memotest(dificultad);
        memotest.iniciarJuego();
    }
}
