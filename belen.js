// Persistencia de checkboxes
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const progressBar = document.getElementById('progressBar');
const stats = document.getElementById('stats');

function updateProgress() {
    const total = checkboxes.length;
    const completed = Array.from(checkboxes).filter(cb => cb.checked).length;
    const percent = Math.round((completed/total)*100);
    progressBar.style.width = percent + "%";
    progressBar.textContent = percent + "%";
    stats.textContent = `Ejercicios completados: ${completed} / ${total}`;

    if(percent===100) launchConfetti();
}

// Confetti simple
function launchConfetti(){
    for(let i=0;i<50;i++){
        const confetti = document.createElement('div');
        confetti.classList.add('confetti-piece');
        confetti.style.left = Math.random()*100 + "%";
        confetti.style.backgroundColor = `hsl(${Math.random()*360},100%,50%)`;
        document.body.appendChild(confetti);
        setTimeout(()=>confetti.remove(),3000);
    }
}

checkboxes.forEach(cb => {
    const saved = localStorage.getItem(cb.dataset.id);
    if(saved==='true') cb.checked=true;
    cb.addEventListener('change', ()=>{
        localStorage.setItem(cb.dataset.id, cb.checked);
        updateProgress();
    });
});

// Inicializa progreso
updateProgress();

// Reset
function resetChecks(){
    checkboxes.forEach(cb=>{
        cb.checked=false;
        localStorage.setItem(cb.dataset.id,false);
    });
    updateProgress();
}