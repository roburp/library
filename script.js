const myLibrary = [];

function Book(author, title, pages, isRead) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.isRead = isRead;
  this.uid = crypto.randomUUID();
}

function displayBooks() {}

function addBookToLibrary(author, title, pages, isRead) {
  const book = new Book(author, title, pages, isRead);
  myLibrary.push(book);
  displayBooks();
}

// const author = document.querySelector("#author").value;
// const title = document.querySelector("#title").value;
// const pages = document.querySelector("#pages").value;
// const read = document.querySelector("#isRead").checked;
