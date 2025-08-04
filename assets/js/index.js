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
      const res = await fetch("http://localhost:5000/api/consulta", {
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