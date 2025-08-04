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

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("consultaForm");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    // Verificamos campos con HTML5
    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      return;
    }

    // Recolectamos los datos
    const datos = {
      nombre: document.getElementById("nombre").value.trim(),
      correo: document.getElementById("correo").value.trim(),
      telefono: document.getElementById("telefono").value.trim(),
      tipoDivorcio: document.getElementById("tipoDivorcio").value,
      mensaje: document.getElementById("mensaje").value.trim()
    };

    try {
      const res = await fetch("https://divorcios-backend.onrender.com/api/consulta", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(datos)
      });

      const result = await res.json();

      if (res.ok) {
        alert("✅ Consulta enviada satisfactoriamente. Te contactaremos pronto.");
        form.reset();
        form.classList.remove("was-validated");
      } else {
        alert("❌ Hubo un problema: " + result.message);
      }
    } catch (error) {
      console.error(error);
      alert("❌ Error al enviar el formulario. Intenta de nuevo.");
    }
  });
});