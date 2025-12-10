function addZero(v){
    return v < 10 ? "0" + v : String(v);
}

function nowString(){
    const d = new Date();
    return `${addZero(d.getHours())}:${addZero(d.getMinutes())}:${addZero(d.getSeconds())}`;
}

const t21 = document.getElementById("t21");
const s21 = document.getElementById("s21");
const b21start = document.getElementById("b21start");
const b21stop = document.getElementById("b21stop");

let i21 = null;
let to21 = null;

function stop21(){
    if(i21){ clearInterval(i21); i21 = null; }
    if(to21){ clearTimeout(to21); to21 = null; }
    s21.textContent = "";
    s21.className = "status";
    b21start.disabled = false;
}

function start21(){
    stop21();
    t21.textContent = nowString();
    i21 = setInterval(() => {
        t21.textContent = nowString();
    }, 1000);

    to21 = setTimeout(() => {
        alert("пройшла ще одна хвилина!");
    }, 60000);

    s21.textContent = "Годинник запущено.";
    s21.className = "status ok";
    b21start.disabled = true;
}

b21start.addEventListener("click", start21);
b21stop.addEventListener("click", stop21);

const t22 = document.getElementById("t22");
const s22 = document.getElementById("s22");
const b22start = document.getElementById("b22start");
const b22stop = document.getElementById("b22stop");

let i22 = null;
let to22 = null;

function stop22(){
    if(i22){ clearInterval(i22); i22 = null; }
    if(to22){ clearTimeout(to22); to22 = null; }
    s22.textContent = "";
    s22.className = "status";
    b22start.disabled = false;
}

function start22(){
    stop22();
    t22.textContent = nowString();

    i22 = setInterval(() => {
        t22.textContent = nowString();
    }, 5000);

    s22.textContent = "Відлік 30 секунд до спроби закриття...";
    s22.className = "status warn";
    b22start.disabled = true;

    to22 = setTimeout(() => {
        s22.textContent = "Спроба закриття вкладки...";
        s22.className = "status warn";

        try{ window.close(); }catch(e){}

        setTimeout(() => {
            if(!document.hidden){
                s22.textContent = "Браузер не дозволив закрити вкладку. Це ок 🙂";
                s22.className = "status ok";
                b22start.disabled = false;
            }
        }, 300);
    }, 30000);
}

b22start.addEventListener("click", start22);
b22stop.addEventListener("click", stop22);

const t23 = document.getElementById("t23");
const s23 = document.getElementById("s23");
const b23start = document.getElementById("b23start");
const b23stop = document.getElementById("b23stop");
const b23reset = document.getElementById("b23reset");

let i23 = null;
let start23Time = null;

function format23(elapsedSec){
    const sec = elapsedSec % 60;
    const min = Math.floor(elapsedSec / 60) % 60;
    const hr = Math.floor(elapsedSec / 3600);

    if(elapsedSec < 60){
        return addZero(sec);
    }
    if(elapsedSec < 3600){
        return `${addZero(min)}:${addZero(sec)}`;
    }
    return `${addZero(hr)}:${addZero(min)}:${addZero(sec)}`;
}

function render23(){
    const elapsed = Math.floor((Date.now() - start23Time) / 1000);
    t23.textContent = format23(elapsed);
}

function stop23(){
    if(i23){ clearInterval(i23); i23 = null; }
    s23.textContent = "";
    s23.className = "status";
    b23start.disabled = false;
}

function start23(){
    stop23();
    start23Time = Date.now();
    render23();
    i23 = setInterval(render23, 1000);
    s23.textContent = "Секундомер запущено.";
    s23.className = "status ok";
    b23start.disabled = true;
}

function reset23(){
    stop23();
    t23.textContent = "00";
}

b23start.addEventListener("click", start23);
b23stop.addEventListener("click", stop23);
b23reset.addEventListener("click", reset23);

const t24 = document.getElementById("t24");
const s24 = document.getElementById("s24");
const b24start = document.getElementById("b24start");
const b24stop = document.getElementById("b24stop");

let i24 = null;

function stop24(){
    if(i24){ clearInterval(i24); i24 = null; }
    s24.textContent = "";
    s24.className = "status";
    b24start.disabled = false;
}

function start24(){
    stop24();
    t24.textContent = nowString();
    s24.textContent = "Перше оновлення буде через 30 секунд.";
    s24.className = "status warn";
    b24start.disabled = true;

    i24 = setInterval(() => {
        alert("Час на сторінці оновлено.");
        t24.textContent = nowString();
    }, 30000);
}

b24start.addEventListener("click", start24);
b24stop.addEventListener("click", stop24);

const t25 = document.getElementById("t25");
const s25 = document.getElementById("s25");
const b25update = document.getElementById("b25update");

function update25(){
    t25.textContent = nowString();
    s25.textContent = "Час оновлено.";
    s25.className = "status ok";
    setTimeout(() => {
        s25.textContent = "";
        s25.className = "status";
    }, 1200);
}

b25update.addEventListener("click", update25);

document.addEventListener("DOMContentLoaded", () => {
    t25.textContent = nowString();
});
