function addZero(v){
    return v < 10 ? "0" + v : String(v);
}

function renderClock(){
    const now = new Date();
    const h = addZero(now.getHours());
    const m = addZero(now.getMinutes());
    const s = addZero(now.getSeconds());
    document.getElementById("clock").textContent = `${h}:${m}:${s}`;
}

function startClock(){
    renderClock();
    setInterval(renderClock, 1000);
}

document.addEventListener("DOMContentLoaded", startClock);
