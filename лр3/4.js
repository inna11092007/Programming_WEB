// Запитуємо ім’я користувача
const userName = prompt("Введіть своє ім’я:");

// Створюємо об’єкт з полем name і методом say()
const user = {
  name: userName,
  say() {
    alert(`Hello, ${this.name}!`);
  }
};

// Знаходимо кнопку
const btn = document.getElementById("hello");

// ❌ Якщо зробити ось так:
// btn.addEventListener("click", user.say);
// тоді this втратиться, бо метод викликається як звичайна функція,
// і this уже не вказує на об’єкт user.

// ✅ Тому ми “прив’язуємо” правильний контекст за допомогою bind:
btn.addEventListener("click", user.say.bind(user));
