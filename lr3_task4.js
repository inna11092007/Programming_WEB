let userName = prompt("Введіть, будь ласка, ваше ім'я:", "Інна");
if (!userName) userName = "Інна";

const user = {
    name: userName,
    say() {
        alert(`Hello, ${this.name}!`);
    }
};

const btnHello = document.getElementById("hello");
btnHello.addEventListener("click", user.say.bind(user));
