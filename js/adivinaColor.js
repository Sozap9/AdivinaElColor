document.addEventListener("DOMContentLoaded", function () {
  const coloresDiv = document.getElementById("colores");
  const rgbText = document.getElementById("rgb");
  const aciertos = document.getElementById("aciertos");
  const fallos = document.getElementById("fallos");
  const mensaje = document.getElementById("mensaje");
  const nivelText = document.getElementById("nivel");
  const desplegable = document.getElementById("desplegable");

  let aciertosCount = 0;
  let fallosCount = 0;
  let juegoActivo = true;
  let dificultad = "Color";

  // Crear elementos de audio
  const aciertoSound = new Audio("./sounds/correct-choice-43861.mp3");
  const errorSound = new Audio("./sounds/wronganswer-37702.mp3");
  const aplausos = new Audio("./sounds/cheering.mp3");
  const abucheo = new Audio("./sounds/boo.mp3");

  // Actualizar la dificultad y reiniciar contadores
  desplegable.addEventListener("change", function () {
    const opciones = {
      option1: "Color",
      option2: "Tonalidades",
      option3: "Difícil",
      option4: "Infinito",
    };
    dificultad = opciones[desplegable.value] || "Color";
    nivelText.innerText = `Nivel: ${dificultad}`;

    // Reiniciar contadores de aciertos y fallos
    aciertosCount = 0;
    fallosCount = 0;
    aciertos.innerText = `Aciertos: ${aciertosCount}`;
    fallos.innerText = `Fallos: ${fallosCount}`;

    // Generar nuevos colores para el nuevo modo
    generarColores();
  });

  function generarColorAleatorio() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
  }

  function generarTonalidades(colorBase) {
    const [r, g, b] = colorBase.match(/\d+/g).map(Number);
    const tonalidades = [colorBase];
    while (tonalidades.length < 5) {
      const factor = Math.random() * 3 + 0.75; // Factor de variación
      const newR = Math.min(255, Math.max(0, Math.floor(r * factor)));
      const newG = Math.min(255, Math.max(0, Math.floor(g * factor)));
      const newB = Math.min(255, Math.max(0, Math.floor(b * factor)));
      const newColor = `rgb(${newR}, ${newG}, ${newB})`;
      if (!tonalidades.includes(newColor)) {
        tonalidades.push(newColor);
      }
    }
    return tonalidades;
  }

  function generarColores() {
    if (!juegoActivo) return;
    const colorCorrecto = generarColorAleatorio();
    rgbText.innerText = `Código rgb: ${colorCorrecto}`;
    rgbText.style.backgroundColor =
      dificultad === "Difícil" ? "transparent" : colorCorrecto;

    let colores;
    if (dificultad === "Tonalidades") {
      colores = generarTonalidades(colorCorrecto);
    } else {
      colores = [colorCorrecto];
      while (colores.length < 5) {
        const colorAleatorio = generarColorAleatorio();
        if (!colores.includes(colorAleatorio)) {
          colores.push(colorAleatorio);
        }
      }
    }

    colores.sort(() => Math.random() - 0.5);
    coloresDiv.innerHTML = "";

    colores.forEach((color) => {
      const divColor = document.createElement("div");
      divColor.classList.add("color");
      divColor.style.backgroundColor = color;
      divColor.addEventListener("click", function () {
        verificarSeleccion(color, colorCorrecto);
      });
      coloresDiv.appendChild(divColor);
    });
  }

  function verificarSeleccion(colorSeleccionado, colorCorrecto) {
    if (!juegoActivo) return;

    if (colorSeleccionado === colorCorrecto) {
      aciertosCount++;
      aciertos.innerText = `Aciertos: ${aciertosCount}`;
      aciertoSound.play(); // Reproducir sonido de acierto
      if (dificultad !== "Infinito" && aciertosCount === 3) {
        mostrarMensajeFinal("¡Enhorabuena lo lograste! Eres muy bueno adivinando colores 👌", aplausos);
      } else {
        generarColores();
      }
    } else {
      fallosCount++;
      fallos.innerText = `Fallos: ${fallosCount}`;
      errorSound.play(); // Reproducir sonido de error
      if (fallosCount === 3) {
        mostrarMensajeFinal("OOH, no lo conseguiste, debes seguir intentandolo 😭", abucheo);
      } else {
        generarColores();
      }
    }
  }

  function mostrarMensajeFinal(mensajeTexto, sonido) {
    document.getElementById("body").style.display = "none";
    document.body.insertAdjacentHTML(
      "beforeend",
      `<section class='mensajeFinal'>
        <p>${mensajeTexto}</p>
        <button id="botonInicio">🎨Volver al juego🎨</button>
      </section>`
    );
    document.getElementById("botonInicio").addEventListener("click", reiniciarJuego);
    const boton = document.getElementById("botonInicio");
    boton.style.padding = "8px 15px";
    boton.style.fontSize = "14px";
    sonido.play();
  }

  function reiniciarJuego() {
    document.querySelector('.mensajeFinal').remove();
    document.getElementById("body").style.display = "block";
    aciertosCount = 0;
    fallosCount = 0;
    aciertos.innerText = `Aciertos: ${aciertosCount}`;
    fallos.innerText = `Fallos: ${fallosCount}`;
    mensaje.innerText = "";
    generarColores();
    juegoActivo = true;
  }

  generarColores();
});

document.addEventListener("DOMContentLoaded", function () {
    const btnInfo = document.getElementById("btnInfo");
    const modalInfo = document.getElementById("infoJuego");
    const cerrarBtn = document.getElementById("cerrarBtn");

    btnInfo.addEventListener("click", function () {
        modalInfo.style.display = "flex";
    });

    cerrarBtn.addEventListener("click", function () {
        modalInfo.style.display = "none";
    });

    window.addEventListener("click", function (event) {
        if (event.target === modalInfo) {
            modalInfo.style.display = "none";
        }
    });
});

// Mostrar el modal de selección de modo al inicio
window.onload = function () {
    const modalModo = document.getElementById('modalModo');
    const modalInfo = document.getElementById('infoJuego'); 
    const btnInicio = document.getElementById('btnInicio');

    modalInfo.style.display = 'none';

    modalModo.style.display = 'block';

    btnInicio.addEventListener('click', function () {
        const modoSeleccionado = document.getElementById('modoJuego').value;

        modalModo.style.display = 'none';

        console.log('Modo seleccionado:', modoSeleccionado);
        inicializarModo(modoSeleccionado);
    });
};

// Función para inicializar el juego según el modo seleccionado
function inicializarModo(modo) {
    const opciones = {
        option1: "Color",
        option2: "Tonalidades",
        option3: "Difícil",
        option4: "Infinito",
    };

    dificultad = opciones[modo] || "Color";
    document.getElementById("nivelActual").innerText = dificultad;
    generarColores();
}

// Modal Reglas Juego
document.addEventListener("DOMContentLoaded", function () {
  const btn = document.getElementById("btnInfo");
  const modal = document.getElementById("infoJuego");
  const cerrarBtn = document.getElementById("cerrarBtn");

  btn.addEventListener("click", function () {
    modal.style.display = "flex";
  });

  cerrarBtn.addEventListener("click", function () {
    modal.style.display = "none";
  });

  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
});

function mostrarModal() {
  document.getElementById("modal").style.display = "none";
}

function cerrarModal() {
  document.getElementById("modal").style.display = "none";
}

function cambiarTab(event, tabName) {
  document
    .querySelectorAll(".tab-content")
    .forEach((tab) => (tab.style.display = "none"));
  document
    .querySelectorAll(".tab-button")
    .forEach((btn) => btn.classList.remove("active"));

  document.getElementById(tabName).style.display = "block";
  event.currentTarget.classList.add("active");
}
