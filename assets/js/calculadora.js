function calcularCosto() {
    const tasaCambio = 60; // 1 USD = 60 DOP

    let totalDOP = 0;
    let resumen = [];

    // Tipo de divorcio (radio button)
    const tipoDivorcio = document.querySelector('input[name="divorcio"]:checked');
    if (tipoDivorcio) {
        totalDOP += parseFloat(tipoDivorcio.value);
        resumen.push(tipoDivorcio.nextElementSibling.innerText);
    }

    // Servicios adicionales (checkboxes)
    document.querySelectorAll('input[type="checkbox"]:checked').forEach(el => {
        totalDOP += parseFloat(el.value);
        resumen.push(el.nextElementSibling.innerText);
    });

    // Urgencia (radio button con porcentaje)
    const urgencia = document.querySelector('input[name="urgencia"]:checked');
    if (urgencia) {
        const porcentaje = parseFloat(urgencia.value);
        resumen.push(urgencia.nextElementSibling.innerText);
        totalDOP += totalDOP * porcentaje;
    }

    // ✅ Redondeo: siempre que termine en "0" (redondeo a decena)
    const totalDOPRedondeado = Math.round(totalDOP / 10) * 10;

    // Conversión a USD
    const totalUSD = Math.round(totalDOPRedondeado / tasaCambio);

    // Mostrar resumen
    const ul = document.getElementById("resumenOpciones");
    ul.innerHTML = "";
    resumen.forEach(opcion => {
        const li = document.createElement("li");
        li.innerText = opcion;
        ul.appendChild(li);
    });

    // Mostrar resultado limpio
    const resultadoTotal = document.getElementById("resultadoTotal");
    resultadoTotal.style.display = "block";
    resultadoTotal.innerHTML = `DOP ${totalDOPRedondeado.toLocaleString()}<br>USD ${totalUSD}`;

    // Mostrar recuadro de confirmación
    const confirmacion = document.getElementById("confirmacion");
    confirmacion.style.display = "block";
}




ocument.getElementById("calcularBtn").addEventListener("click", function () {
    let total = 0;
    let seleccion = [];

    const checkboxes = document.querySelectorAll('input[type="radio"]:checked');
    checkboxes.forEach((checkbox) => {
        total += parseInt(checkbox.value);
        seleccion.push(checkbox.dataset.nombre);
    });

    const resultadoTotal = document.getElementById("resultadoTotal");
    resultadoTotal.style.display = "block";
    resultadoTotal.innerHTML = `Costo total estimado: $${total}`;

    const confirmacion = document.getElementById("confirmacion");
    confirmacion.style.display = "block";
});

