const formulario = document.getElementById('formulario');
const alertas = document.getElementById('alertas');

formulario.addEventListener('submit', function(event) {
    event.preventDefault();

    const peso = parseFloat(document.getElementById('peso').value);
    const minutos = parseFloat(document.getElementById('minutos').value);
    const actividad = document.querySelector('input[name="actividad"]:checked').value;

    if (isNaN(peso) || peso < 1 || peso > 120) {
        mostrarAlerta('warning', 'Ingrese un peso válido entre 1 y 120 kg.');
        return;
    }
    if (isNaN(minutos) || minutos < 5 || minutos > 150) {
        mostrarAlerta('warning', 'Ingrese una cantidad válida de minutos entre 5 y 150.');
        return;
    }

    let MET;
    if (actividad === 'caminar') {
        MET = 3.5;
    } else if (actividad === 'correr') {
        MET = 8.0;
    }

    const calorias = calcularCalorias(MET, peso, minutos);
    mostrarAlerta('success', `Calorías quemadas: ${calorias.toFixed(2)}`);
});

function calcularCalorias(MET, peso, minutos) {
    return MET * 3.5 * peso * (minutos / 200);
}

function mostrarAlerta(tipo, mensaje) {
    const alertaDiv = document.createElement('div');
    alertaDiv.classList = `alert alert-${tipo} alert-dismissible fade show`;
    alertaDiv.innerHTML = `<strong>${mensaje}</strong>`;
    alertaDiv.innerHTML += `<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>`;
    alertas.innerHTML = '';
    alertas.appendChild(alertaDiv);
}