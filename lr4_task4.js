function createBook(title, author, year, isRead) {
    return {
        title,
        author,
        year,
        isRead,
        bookInfo() {
            return `Назва: ${this.title}, Автор: ${this.author}, Рік видання: ${this.year}, Прочитана: ${this.isRead ? "Так" : "Ні"}`;
        }
    };
}

let library = [
    createBook("Clean Code", "Robert C. Martin", 2008, false),
    createBook("The Hobbit", "J.R.R. Tolkien", 1937, false),
    createBook("1984", "George Orwell", 1949, true)
];

const outputEl = document.getElementById("output");
const addBtn = document.getElementById("addBookBtn");

function displayLibrary() {
    outputEl.textContent = "";
    outputEl.textContent += "Поточний список книг:\n\n";
    library.forEach((book, index) => {
        outputEl.textContent += `${index + 1}. ${book.bookInfo()}\n`;
    });
}

function addBookToLibrary() {
    const title = prompt("Введіть назву книги:");
    if (title === null) return;
    const t = title.trim();
    if (!t) return;

    const author = prompt("Введіть автора книги:");
    if (author === null) return;
    const a = author.trim();
    if (!a) return;

    const yearInput = prompt("Введіть рік видання книги:");
    if (yearInput === null) return;
    const y = Number(yearInput.trim());
    if (!Number.isFinite(y) || y <= 0) {
        alert("Рік потрібно ввести коректним числом");
        return;
    }

    const isRead = confirm("Чи прочитана книга? OK – Так, Скасувати – Ні");

    const newBook = createBook(t, a, Math.trunc(y), isRead);
    library.push(newBook);
    displayLibrary();
}

addBtn.addEventListener("click", addBookToLibrary);

displayLibrary();
