const inputBuscar = document.getElementById('inputBuscar');
const faqSection = document.getElementById('faqSection');

inputBuscar.addEventListener('input', () => {
    const filtro = inputBuscar.value.toLowerCase();

    // Obtener todas las preguntas y categorías
    const categorias = faqSection.querySelectorAll('.faq-category');

    categorias.forEach(categoria => {
        let categoriaVisible = false;

        const items = categoria.querySelectorAll('.accordion-item');

        items.forEach(item => {
            const preguntaBtn = item.querySelector('button.accordion-button');
            const textoPregunta = preguntaBtn.textContent.toLowerCase();
            const respuestaDiv = item.querySelector('.accordion-body').textContent.toLowerCase();

            if (textoPregunta.includes(filtro) || respuestaDiv.includes(filtro)) {
                item.style.display = '';
                categoriaVisible = true;
            } else {
                item.style.display = 'none';
            }
        });

        // Mostrar u ocultar categoría según si tiene items visibles
        if (categoriaVisible) {
            categoria.style.display = '';
        } else {
            categoria.style.display = 'none';
        }
    });
});