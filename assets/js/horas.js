const horasDisponibles = [
    "08:00 AM",
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
    "06:00 PM"
];

const horasContainer = document.getElementById("horasContainer");
const fechaSeleccionadaDiv = document.getElementById("fechaSeleccionada");
const confirmarBtn = document.getElementById("confirmarHoraBtn");
const mensajeConfirmacion = document.getElementById("mensajeConfirmacion");

let horaSeleccionada = null;

// Mostrar la fecha seleccionada guardada
const fechaGuardada = localStorage.getItem("fechaSeleccionada");
if (!fechaGuardada) {
    alert("No se ha seleccionado una fecha. Por favor, regresa al paso 1.");
    window.location.href = "citas.html";
} else {
    const fechaObj = new Date(fechaGuardada);
    const opcionesFecha = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
    fechaSeleccionadaDiv.textContent = `Fecha seleccionada: ${fechaObj.toLocaleDateString("es-ES", opcionesFecha)}`;
}

// Crear tarjetas de horas
horasDisponibles.forEach(hora => {
    const col = document.createElement("div");
    col.className = "col";

    const card = document.createElement("div");
    card.className = "card hora-card text-center p-3";
    card.textContent = hora;
    card.setAttribute("tabindex", "0");
    card.addEventListener("click", () => seleccionarHora(card, hora));
    card.addEventListener("keypress", e => {
        if (e.key === "Enter" || e.key === " ") seleccionarHora(card, hora);
    });

    col.appendChild(card);
    horasContainer.appendChild(col);
});

const siguienteHoraBtn = document.getElementById("siguienteHoraBtn");

function seleccionarHora(card, hora) {
    document.querySelectorAll(".hora-card.selected").forEach(c => c.classList.remove("selected"));
    card.classList.add("selected");
    horaSeleccionada = hora;
    siguienteHoraBtn.disabled = false;
}

siguienteHoraBtn.addEventListener("click", () => {
    if (!horaSeleccionada) {
        alert("Por favor selecciona una hora.");
        return;
    }
    // Guardamos la hora y vamos al paso 3
    localStorage.setItem("horaSeleccionada", horaSeleccionada);
    window.location.href = "formulario.html";
});
