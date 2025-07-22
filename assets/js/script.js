document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("consultaForm");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    let valid = true;

    const campos = [
      "nombre",
      "correo",
      "telefono",
      "tipoDivorcio",
      "mensaje"
    ];

    campos.forEach((id) => {
      const campo = document.getElementById(id);
      if (!campo.value.trim()) {
        campo.classList.add("is-invalid");
        valid = false;
      } else {
        campo.classList.remove("is-invalid");
      }
    });

    // Validación de correo
    const correo = document.getElementById("correo");
    const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!correoRegex.test(correo.value)) {
      correo.classList.add("is-invalid");
      valid = false;
    }

    if (valid) {
      alert("Consulta enviada correctamente (simulado)");
      form.reset();
    }
  });
});
