const camposEditables = ["cameDebe", "dolyDebe", "deudaComunitaria", "cartera", "tarjeta"];

function parseNumber(value) {
    let num = parseFloat(value.replace(/[^0-9.-]+/g,""));
    return isNaN(num) ? 0 : num;
}

function actualizarTotales() {
    const came = parseNumber(document.getElementById("cameDebe").textContent);
    const doly = parseNumber(document.getElementById("dolyDebe").textContent);
    const deudaCom = parseNumber(document.getElementById("deudaComunitaria").textContent);
    const cartera = parseNumber(document.getElementById("cartera").textContent);
    const tarjeta = parseNumber(document.getElementById("tarjeta").textContent);

    const totalDeudas = came + doly + deudaCom;
    document.getElementById("total").textContent = "$" + totalDeudas.toFixed(2);

    const totalCartera = cartera + tarjeta;
    document.getElementById("totalCartera").textContent = "$" + totalCartera.toFixed(2);

    const masDebe = totalDeudas + totalCartera;
    document.getElementById("masDebe").textContent = "$" + masDebe.toFixed(2);
}

// Guardar y escuchar cambios en las celdas
camposEditables.forEach(id => {
    const celda = document.getElementById(id);
    const valor = localStorage.getItem(id);
    if(valor) celda.textContent = valor;

    celda.addEventListener('input', (e) => {
        localStorage.setItem(id, e.target.textContent);
        actualizarTotales();
    });
});

document.addEventListener("DOMContentLoaded", actualizarTotales);
