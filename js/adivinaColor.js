document.addEventListener("DOMContentLoaded", () => {
    const rgbColorDisplay = document.getElementById("rgbColor");
    const colorDivs = document.querySelectorAll(".color");
    const contadorAciertos = document.getElementById("contadorAciertos");
    const contadorFallos = document.getElementById("contadorFallos");
    const mensajeTexto = document.getElementById("mensajeTexto");
    const nivelActual = document.getElementById("nivelActual");
    const desplegable = document.getElementById("desplegable");

    let aciertos = 0;
    let fallos = 0;
    let nivel = 1;

    function generarColorAleatorio() {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return `rgb(${r}, ${g}, ${b})`;
    }

    function iniciarJuego() {
        const colores = [];
        for (let i = 0; i < 5; i++) {
        colores.push(generarColorAleatorio());
        }

        const colorCorrecto = colores[Math.floor(Math.random() * colores.length)];
        rgbColorDisplay.textContent = colorCorrecto;

        colorDivs.forEach((div, index) => {
        div.style.backgroundColor = colores[index];
        div.onclick = () =>
            verificarColor(div.style.backgroundColor, colorCorrecto);
        });
    }

    function verificarColor(colorSeleccionado, colorCorrecto) {
        if (colorSeleccionado === colorCorrecto) {
        aciertos++;
        contadorAciertos.textContent = aciertos;
        mensajeTexto.textContent = "¡Correcto!";
        } else {
        fallos++;
        contadorFallos.textContent = fallos;
        mensajeTexto.textContent = "¡Incorrecto!";
        }

        if (aciertos === 3) {
        mensajeTexto.textContent = "¡Ganaste el juego!";
        reiniciarJuego();
        } else if (fallos === 3) {
        mensajeTexto.textContent = "¡Perdiste el juego!";
        reiniciarJuego();
        } else {
        iniciarJuego();
        }
    }

    function reiniciarJuego() {
        aciertos = 0;
        fallos = 0;
        contadorAciertos.textContent = aciertos;
        contadorFallos.textContent = fallos;
        nivel++;
        nivelActual.textContent = nivel;
        iniciarJuego();
    }

    iniciarJuego();
    });
