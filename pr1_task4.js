const books = [
    { title: "The Hobbit", author: "J.R.R. Tolkien", year: 1937, rating: 4.8, isRead: true },
    { title: "The Lord of the Rings", author: "J.R.R. Tolkien", year: 1954, rating: 4.9, isRead: false },
    { title: "1984", author: "George Orwell", year: 1949, rating: 4.7, isRead: true },
    { title: "Animal Farm", author: "George Orwell", year: 1945, rating: 4.3, isRead: false },
    { title: "The Catcher in the Rye", author: "J.D. Salinger", year: 1951, rating: 3.9, isRead: false }
];

function getUnreadBooks(booksArray) {
    return booksArray.filter(book => !book.isRead).map(book => book.title);
}

function getBooksByAuthor(booksArray, authorName) {
    return booksArray
        .filter(book => book.author.toLowerCase() === authorName.toLowerCase())
        .sort((a, b) => a.year - b.year);
}

function getTopRatedBooks(booksArray) {
    return booksArray.filter(book => book.rating > 4).sort((a, b) => b.rating - a.rating);
}

function printResult(title, data) {
    const out = document.getElementById("output");
    out.textContent = title + "\n\n" + JSON.stringify(data, null, 2);
}

document.addEventListener("DOMContentLoaded", () => {
    const btnUnread = document.getElementById("btn-unread");
    const btnByAuthor = document.getElementById("btn-by-author");
    const btnTopRated = document.getElementById("btn-top-rated");
    const authorInput = document.getElementById("authorInput");

    btnUnread.addEventListener("click", () => {
        printResult("Непрочитані книги", getUnreadBooks(books));
    });

    btnByAuthor.addEventListener("click", () => {
        const authorName = authorInput.value.trim();
        if (!authorName) {
            const out = document.getElementById("output");
            out.textContent = "Введіть автора.";
            return;
        }
        const res = getBooksByAuthor(books, authorName);
        if (res.length === 0) {
            const out = document.getElementById("output");
            out.textContent = `Книги автора "${authorName}" не знайдено.`;
            return;
        }
        printResult(`Книги автора "${authorName}"`, res);
    });

    btnTopRated.addEventListener("click", () => {
        printResult("Топові книги (рейтинг > 4)", getTopRatedBooks(books));
    });
});
