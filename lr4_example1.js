const book = {
    title: "Clean Code",
    author: "Robert C. Martin",
    year: 2008,
    isRead: false,
    bookInfo() {
        return `Назва: ${this.title}, Автор: ${this.author}, Рік видання: ${this.year}, Прочитана: ${this.isRead ? "Так" : "Ні"}`;
    }
};

const output = document.getElementById("output");
const showBtn = document.getElementById("showInfo");
const toggleBtn = document.getElementById("toggleRead");

function renderBook() {
    output.textContent = book.bookInfo();
}

showBtn.addEventListener("click", renderBook);

toggleBtn.addEventListener("click", () => {
    book.isRead = !book.isRead;
    renderBook();
});

renderBook();
