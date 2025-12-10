// Завдання 2: Робота з масивами та об'єктами

// 1. Створюємо масив library з кількома об'єктами книг
let library = [
    {
        title: "Harry Potter and the Sorcerer's Stone",
        author: "J.K. Rowling",
        year: 1997,
        isRead: true,
        bookInfo() {
            return `Назва: ${this.title}, Автор: ${this.author}, ` +
                `Рік видання: ${this.year}, Прочитана: ${this.isRead ? "Так" : "Ні"}`;
        }
    },
    {
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        year: 1937,
        isRead: false,
        bookInfo() {
            return `Назва: ${this.title}, Автор: ${this.author}, ` +
                `Рік видання: ${this.year}, Прочитана: ${this.isRead ? "Так" : "Ні"}`;
        }
    },
    {
        title: "1984",
        author: "George Orwell",
        year: 1949,
        isRead: true,
        bookInfo() {
            return `Назва: ${this.title}, Автор: ${this.author}, ` +
                `Рік видання: ${this.year}, Прочитана: ${this.isRead ? "Так" : "Ні"}`;
        }
    }
];

// Елемент для виводу на сторінку
const out = document.getElementById("output");

// 2. Функція displayLibrary, яка перебирає масив library
function displayLibrary(titleText) {
    let result = "";

    if (titleText) {
        result += titleText + "\n";
        result += "--------------------------------------\n";
    }

    library.forEach(book => {
        const info = book.bookInfo();
        console.log(info);         // вивід у консоль
        result += info + "\n";
    });

    result += "\n";
    out.textContent += result;     // додаємо текст у <pre>
}

// 3. Виклики згідно завдання

// спочатку показуємо початкову бібліотеку
displayLibrary("Початкова бібліотека:");

// додаємо нову книгу за допомогою push()
library.push({
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    year: 1925,
    isRead: false,
    bookInfo() {
        return `Назва: ${this.title}, Автор: ${this.author}, ` +
            `Рік видання: ${this.year}, Прочитана: ${this.isRead ? "Так" : "Ні"}`;
    }
});

// знову викликаємо displayLibrary
displayLibrary("Після додавання нової книги:");
