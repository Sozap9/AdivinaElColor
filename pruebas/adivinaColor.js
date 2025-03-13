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
  let dificultad = "Fácil";

  // Actualizar la dificultad
  desplegable.addEventListener("change", function () {
    const opciones = {
      option1: "Fácil",
      option2: "Medio",
      option3: "Difícil",
    };
    dificultad = opciones[desplegable.value] || "Fácil";
    nivelText.innerText = `Nivel: ${dificultad}`;
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
      const factor = Math.random() * 0.5 + 0.75; // Factor de variación
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
    if (dificultad === "Medio") {
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
      if (aciertosCount === 3) {
        mensaje.innerText = "¡Ganaste!";
        mostrarMensajeYReiniciar();
      } else {
        generarColores();
      }
    } else {
      fallosCount++;
      fallos.innerText = `Fallos: ${fallosCount}`;
      if (fallosCount === 3) {
        mensaje.innerText = "¡Fallaste!";
        mostrarMensajeYReiniciar();
      } else {
        generarColores();
      }
    }
  }

  function mostrarMensajeYReiniciar() {
    setTimeout(() => {
      aciertosCount = 0;
      fallosCount = 0;
      aciertos.innerText = `Aciertos: ${aciertosCount}`;
      fallos.innerText = `Fallos: ${fallosCount}`;
      mensaje.innerText = "";
      generarColores();
      juegoActivo = true;
    }, 2000);
  }

  generarColores();
});
