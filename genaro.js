// Persistencia de checkboxes
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const progressBar = document.getElementById('progressBar');
const stats = document.getElementById('stats');

function updateProgress() {
    const total = checkboxes.length;
    const completed = Array.from(checkboxes).filter(cb => cb.checked).length;
    const percent = Math.round((completed / total) * 100);
    progressBar.style.width = percent + "%";
    progressBar.textContent = percent + "%";
    stats.textContent = `Ejercicios completados: ${completed} / ${total}`;

    if (percent === 100) launchConfetti();
}

// Confetti simple
function launchConfetti() {
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti-piece');
        confetti.style.left = Math.random() * 100 + "%";
        confetti.style.backgroundColor = `hsl(${Math.random() * 360},100%,50%)`;
        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), 3000);
    }
}

checkboxes.forEach(cb => {
    const saved = localStorage.getItem(cb.dataset.id);
    if (saved === 'true') cb.checked = true;
    cb.addEventListener('change', () => {
        localStorage.setItem(cb.dataset.id, cb.checked);
        updateProgress();
    });
});

// Inicializa progreso
updateProgress();

// Reset
function resetChecks() {
    checkboxes.forEach(cb => {
        cb.checked = false;
        localStorage.setItem(cb.dataset.id, false);
    });
    updateProgress();
}

// Barra de progreso de tiempo y etapas
function updateTimeProgress() {
    const start = new Date('2025-09-17'); // fecha inicio
    const end = new Date('2026-08-17');   // fecha fin
    const now = new Date();
    const bar = document.getElementById('timeProgressBar');

    let percent = ((now - start) / (end - start)) * 100;
    if (percent < 0) percent = 0;
    if (percent > 100) percent = 100;

    // Determinar etapa según porcentaje
    let etapa = 1;
    let color = '#ff9999'; // rojo claro inicial

    if (percent <= 20) { etapa = 1; color = '#ff9999'; }          // Base y tono
    else if (percent <= 45) { etapa = 2; color = '#ff4d4d'; }     // Volumen moderado
    else if (percent <= 75) { etapa = 3; color = '#cc0000'; }     // Definición estética
    else { etapa = 4; color = '#800000'; }                        // Consolidación

    bar.style.width = percent + '%';
    bar.style.backgroundColor = color;
    bar.textContent = `${Math.floor(percent)}% - Etapa ${etapa}`;
}

// Inicializa al cargar la página y actualiza cada minuto
updateTimeProgress();
setInterval(updateTimeProgress, 60000);
