sessionStorage.clear();
$('.mainTitle').append('<h1 class="headerMemoTitle">MEMOTEST</h1>');

document.getElementById('errorJugador').style.visibility = "hidden";
document.getElementById('errorEmail').style.visibility = "hidden";
const guardarJugador =  (clave,valor) => sessionStorage.setItem(clave,valor);
const guardarViewAnterior =  (clave,valor) => sessionStorage.setItem(clave,valor);
const botonJugar = document.getElementById("btnJugar");
botonJugar.addEventListener("click", onClickPlay);



function onClickPlay(){
    
    var nombreJugador = document.getElementById("nombreJugador");
    var emailJugador = document.getElementById("emailJugador");

    var errorJugador = document.getElementById('errorJugador')
    var errorEmail = document.getElementById("errorEmail");
   
    var jugador = nombreJugador.value;
    var email = emailJugador.value;

    if(jugador == ''){
        errorJugador.style.visibility = "visible";
    }else{  
        var jugador =  new Jugador(jugador,email);
        guardarJugador ('Player',JSON.stringify(jugador));
        guardarViewAnterior ('ventana','index.html')
        location.href = "memotest.html";
    }

}



// if(jugador == '' && email == ''){
//     errorJugador.style.visibility = "visible";
//     errorEmail.style.visibility = "visible";
// }else if (email == '' && jugador != '') {
//     errorJugador.style.visibility = "hidden";
//     errorEmail.style.visibility = "visible";
// } else if (jugador == '' && email != '') {
//     errorEmail.style.visibility = "hidden";
//     errorJugador.style.visibility = "visible";
// } else{  
//     var jugador =  new Jugador(jugador,email);
//     guardarJugador ('Player',JSON.stringify(jugador));
//     guardarViewAnterior ('ventana','index.html')
//     location.href = "memotest.html";
// }