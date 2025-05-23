const container = document.querySelector(".shelf");

const myLibrary = [
  {
    author: "J.K. Rowling",
    title: "Harry Potter and the Sorcerer's Stone",
    pages: 223,
    isRead: true,
    uid: crypto.randomUUID(),
  },
  {
    author: "J.K. Rowling",
    title: "Harry Potter and the Chamber of Secrets",
    pages: 251,
    isRead: false,
    uid: crypto.randomUUID(),
  },
  {
    author: "J.K. Rowling",
    title: "Harry Potter and the Prisoner of Azkaban",
    pages: 317,
    isRead: false,
    uid: crypto.randomUUID(),
  },
];

//add Event Listener to page
container.addEventListener("click", (e) => {
  // Check if clicked element is a Remove button
  if (e.target.tagName === "BUTTON" && e.target.classList.contains("remove-btn")) {
    // Get the book's id from the closest parent with dataset.uid
    const bookId = e.target.closest(".book-item").dataset.uid;
    removeBookFromLibrary(bookId);
  }
  if (e.target.tagName === "BUTTON" && e.target.classList.contains("mark-read-btn")) {
    // Get the book's id from the closest parent with dataset.uid
    const bookId = e.target.closest(".book-item").dataset.uid;
    const book = myLibrary.find((book) => book.uid === bookId);
    if (book) {
      book.markRead();
      displayBooks();
    }
  }
});

//Book constructor
function Book(author, title, pages, isRead) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.isRead = isRead;
  this.uid = crypto.randomUUID();
}

//change Book read status from read / unread
Book.prototype.markRead = function () {
  this.isRead = !this.isRead;
};

function displayBooks() {
  container.innerHTML = ""; //clears the container

  myLibrary.forEach((book) => {
    const bookItem = document.createElement("div");
    bookItem.classList.add("book-item");
    bookItem.dataset.uid = book.uid;

    const bookTitle = document.createElement("h2");
    bookTitle.textContent = book.title;
    bookItem.appendChild(bookTitle);

    const bookInfo = document.createElement("div");
    bookInfo.classList.add("book-info");
    bookItem.appendChild(bookInfo);

    const infoAuthor = document.createElement("p");
    infoAuthor.classList.add("author");
    infoAuthor.textContent = `Author: ${book.author}`;
    bookInfo.appendChild(infoAuthor);

    const infoPages = document.createElement("p");
    infoPages.classList.add("pages");
    infoPages.textContent = `Pages: ${book.pages}`;
    bookInfo.appendChild(infoPages);

    const infoRead = document.createElement("p");
    infoRead.classList.add("read");
    infoRead.textContent = `Read: ${book.isRead ? "Yes" : "No"}`;
    bookInfo.appendChild(infoRead);

    const markReadBtn = document.createElement("button");
    markReadBtn.classList.add("mark-read-btn");
    markReadBtn.textContent = `Mark as ${book.isRead ? "Unread" : "Read"}`;
    bookItem.appendChild(markReadBtn);

    const removeBtn = document.createElement("button");
    removeBtn.classList.add("remove-btn");
    removeBtn.textContent = "Remove";
    bookItem.appendChild(removeBtn);
    // removeBtn.addEventListener("click", (e) => {
    //   removeBookFromLibrary(e.target.parentElement.dataset.id);
    // });

    // removeBtn.addEventListener("click", () => {
    //   removeBookFromLibrary(book.uid);
    // });

    container.appendChild(bookItem);
  });
}

function addBookToLibrary(author, title, pages, isRead) {
  const book = new Book(author, title, pages, isRead);
  myLibrary.push(book);
  displayBooks();
}

// const author = document.querySelector("#author").value;
// const title = document.querySelector("#title").value;
// const pages = document.querySelector("#pages").value;
// const read = document.querySelector("#isRead").checked;

function removeBookFromLibrary(uid) {
  const index = myLibrary.findIndex((book) => book.uid === uid);
  if (index !== -1) {
    myLibrary.splice(index, 1);
    displayBooks();
  }
}

displayBooks();
