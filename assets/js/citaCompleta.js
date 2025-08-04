document.getElementById("fechaCita").innerText = localStorage.getItem("fechaSeleccionada") || "No seleccionada";
document.getElementById("horaCita").innerText = localStorage.getItem("horaSeleccionada") || "No seleccionada";
document.getElementById("tipoConsulta").innerText = localStorage.getItem("tipoConsulta") || "No especificada";
document.getElementById("emailUsuario").innerText = localStorage.getItem("correoUsuario") || "No proporcionado";