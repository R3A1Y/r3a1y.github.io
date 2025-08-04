document.addEventListener("DOMContentLoaded", () => {
    const inputFecha = document.getElementById('fecha-cita');
    const btnSiguiente = document.getElementById('siguiente-btn');

    const hoy = new Date();
    const maxFecha = new Date();
    maxFecha.setDate(hoy.getDate() + 13); // Próximos 14 días contando hoy

    flatpickr(inputFecha, {
        dateFormat: "Y-m-d",
        minDate: hoy,
        maxDate: maxFecha,
        disable: [
            function (date) {
                return (date.getDay() === 0 || date.getDay() === 6); // domingos y sábados
            }
        ],
        onChange: function (selectedDates, dateStr) {
            btnSiguiente.disabled = selectedDates.length === 0;
        }
    });

    btnSiguiente.addEventListener('click', () => {
        const fechaSeleccionada = inputFecha.value;
        if (fechaSeleccionada) {
            localStorage.setItem("fechaSeleccionada", fechaSeleccionada);
            window.location.href = "horas.html";
        }
    });
});