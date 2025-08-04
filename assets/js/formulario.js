document.addEventListener("DOMContentLoaded", () => {
    // Cargar datos previos desde localStorage y mostrar resumen
    const fecha = localStorage.getItem("fechaSeleccionada") || "--";
    const hora = localStorage.getItem("horaSeleccionada") || "--";

    document.getElementById("fechaResumen").textContent = "Fecha: " + fecha;
    document.getElementById("horaResumen").textContent = "Hora: " + hora;

    const tipoConsultaSeleccionado = localStorage.getItem("tipoConsulta") || "--";
    document.getElementById("tipoConsultaResumen").textContent = "Tipo de Consulta: " + tipoConsultaSeleccionado;

    // Escuchar cambios en tipo de consulta para actualizar resumen y localStorage
    const radiosConsulta = document.querySelectorAll('input[name="tipoConsulta"]');
    radiosConsulta.forEach((radio) => {
        radio.addEventListener("change", (e) => {
            const valor = e.target.value;
            localStorage.setItem("tipoConsulta", valor);
            document.getElementById("tipoConsultaResumen").textContent = "Tipo de Consulta: " + valor;
        });
    });

    // Actualizar mensaje resumen al escribir
    const mensajeInput = document.getElementById("mensaje");
    const mensajeResumen = document.getElementById("mensajeResumen");
    mensajeInput.addEventListener("input", () => {
        mensajeResumen.textContent = mensajeInput.value.trim() || "\u00A0"; // nbsp si vacío
    });
});

document.getElementById("formCita").addEventListener("submit", async function (e) {
    e.preventDefault();

    const form = e.target;

    // Validar el formulario usando validación nativa HTML5
    if (!form.checkValidity()) {
        form.classList.add('was-validated'); // Para mostrar mensajes de invalid-feedback si usas Bootstrap
        alert("Por favor completa todos los campos obligatorios correctamente.");
        return;
    }

    // Obtener valores del formulario y del localStorage
    const nombre = document.getElementById("nombre").value.trim();
    const correo = document.getElementById("email").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const tipoConsulta = document.querySelector('input[name="tipoConsulta"]:checked')?.value;
    const tipoDivorcio = document.getElementById("tipoDivorcio").value;
    const mensaje = document.getElementById("mensaje").value.trim();

    const fecha = localStorage.getItem("fechaSeleccionada");
    const hora = localStorage.getItem("horaSeleccionada");

    if (!fecha || !hora) {
        alert("No se ha seleccionado una fecha y hora válidas para la cita.");
        return;
    }

    const datosCita = {
        nombre,
        correo,
        telefono,
        tipoConsulta,
        tipoDivorcio,
        mensaje,
        fecha,
        hora,
    };

    try {
        const res = await fetch("http://localhost:5000/api/cita", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(datosCita),
        });

        if (res.ok) {
            // Guarda correo para uso futuro si quieres
            localStorage.setItem("correoUsuario", correo);

            // Redirige solo si el envío fue exitoso
            window.location.href = "citaCompleta.html";
        } else {
            const errorData = await res.json();
            alert("Error al enviar la cita: " + (errorData.message || "Error desconocido"));
        }
    } catch (error) {
        console.error(error);
        alert("Error al enviar la cita, intenta de nuevo más tarde.");
    }
});