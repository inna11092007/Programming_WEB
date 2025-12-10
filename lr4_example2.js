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
    createBook("The Pragmatic Programmer", "Andrew Hunt, David Thomas", 1999, true),
    createBook("JavaScript: The Good Parts", "Douglas Crockford", 2008, true)
];

const output = document.getElementById("output");
const showBtn = document.getElementById("showLibrary");
const addBtn = document.getElementById("addSample");

function displayLibrary() {
    output.textContent = "";
    library.forEach((book, index) => {
        output.textContent += `${index + 1}. ${book.bookInfo()}\n`;
    });
}

function addSampleBook() {
    const newBook = createBook("Eloquent JavaScript", "Marijn Haverbeke", 2018, false);
    library.push(newBook);
    displayLibrary();
}

showBtn.addEventListener("click", displayLibrary);
addBtn.addEventListener("click", addSampleBook);

displayLibrary();
