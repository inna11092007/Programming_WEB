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
    createBook("Harry Potter and the Sorcerer's Stone", "J.K. Rowling", 1997, true),
    createBook("The Hobbit", "J.R.R. Tolkien", 1937, false),
    createBook("1984", "George Orwell", 1949, true),
    createBook("Clean Code", "Robert C. Martin", 2008, false)
];

const runBtn = document.getElementById("run");
const output = document.getElementById("output");

function addLine(text = "") {
    output.textContent += text + "\n";
}

function runTask3() {
    output.textContent = "";

    console.clear();
    console.log("Початковий масив library:", library);

    const sortedLibrary = [...library].sort((a, b) => a.year - b.year);
    const unreadBooks = library.filter(book => !book.isRead);
    const tolkienBook = library.find(book => book.author === "J.R.R. Tolkien");

    console.log("Відсортовані книги:", sortedLibrary);
    console.log("Непрочитані книги:", unreadBooks);
    console.log("Книга Толкіна:", tolkienBook);

    addLine("=== Відсортувати за роком (зростання) ===");
    sortedLibrary.forEach(book => addLine(book.bookInfo()));

    addLine();
    addLine("=== Непрочитані книги ===");
    if (unreadBooks.length) {
        unreadBooks.forEach(book => addLine(book.bookInfo()));
    } else {
        addLine("Непрочитаних книг не знайдено");
    }

    addLine();
    addLine("=== Книга автора J.R.R. Tolkien ===");
    if (tolkienBook) {
        addLine(tolkienBook.bookInfo());
    } else {
        addLine("Книгу не знайдено");
    }
}

runBtn.addEventListener("click", runTask3);
runTask3();
