const container = document.querySelector(".shelf");
const dialog = document.querySelector("dialog");
const addBookForm = document.querySelector("#add-book-form");
const authorInput = document.querySelector("#author");
const titleInput = document.querySelector("#title");
const pagesInput = document.querySelector("#pages");
const isReadInput = document.querySelector("#isRead");

const myLibrary = [
  new Book("J.K. Rowling", "Harry Potter and the Sorcerer's Stone", 223, true),
  new Book("J.K. Rowling", "Harry Potter and the Chamber of Secrets", 251, false),
  new Book("J.K. Rowling", "Harry Potter and the Prisoner of Azkaban", 317, false),
];

//add Event Listener to bookshelf
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

//listeners to show dialog modal
const addBookDialogButton = document.querySelector(".add-btn");
addBookDialogButton.addEventListener("click", (e) => {
  dialog.showModal();
});

//dialog modal listeners
dialog.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON" && e.target.id === "confirm-btn") {
    e.preventDefault();

    const formData = getBookFormData(); //author, title, pages, isRead
    const validation = validateFormData(formData);

    if (!validation.valid) {
      alert(validation.message);
      const input = document.querySelector(validation.field);
      input.focus();
      input.select();
      return;
    }

    //submit -> add book & reset dialog
    addBookToLibrary(formData.author, formData.title, formData.pages, formData.isRead);
    resetDialogForm();
  }
  if (e.target.tagName === "BUTTON" && e.target.id === "cancel-btn") {
    resetDialogForm();
  }
});

//event listener for escape key to reset form as well (since it already closes the form by default)
dialog.addEventListener("keydown", (e) => {
  if (e.key == "Escape") {
    resetDialogForm();
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

//function to change Book read status from read / unread
Book.prototype.markRead = function () {
  this.isRead = !this.isRead;
};

function createBookElement(book) {
  const bookItem = document.createElement("div");
  bookItem.classList.add("book-item");
  bookItem.dataset.uid = book.uid;

  const bookTitle = document.createElement("h2");
  bookTitle.textContent = book.title;
  bookItem.appendChild(bookTitle);

  const bookInfo = document.createElement("div");
  bookInfo.classList.add("book-info");

  const infoAuthor = document.createElement("p");
  infoAuthor.classList.add("author");
  infoAuthor.textContent = `Author: ${book.author}`;

  const infoPages = document.createElement("p");
  infoPages.classList.add("pages");
  infoPages.textContent = `Pages: ${book.pages}`;

  const infoRead = document.createElement("p");
  infoRead.classList.add("read");
  infoRead.textContent = "Read: ";

  const markReadBtn = document.createElement("button");
  markReadBtn.setAttribute("type", "button");
  markReadBtn.classList.add("mark-read-btn");
  markReadBtn.classList.add(book.isRead ? "read-yes" : "read-no");
  markReadBtn.textContent = `${book.isRead ? "Yes" : "No"}`;
  infoRead.appendChild(markReadBtn);

  bookInfo.append(infoAuthor, infoPages, infoRead);
  bookItem.appendChild(bookInfo);

  const removeBtn = document.createElement("button");
  removeBtn.classList.add("remove-btn");
  removeBtn.textContent = "Remove";
  bookItem.appendChild(removeBtn);

  return bookItem;
}

function displayBooks() {
  container.innerHTML = ""; //clears the container

  myLibrary.forEach((book) => {
    container.appendChild(createBookElement(book));
  });
}

function addBookToLibrary(author, title, pages, isRead) {
  const book = new Book(author, title, pages, isRead);
  myLibrary.push(book);
  displayBooks();
}

function removeBookFromLibrary(uid) {
  const index = myLibrary.findIndex((book) => book.uid === uid);
  if (index !== -1) {
    myLibrary.splice(index, 1);
    displayBooks();
  }
}

//get Dialog form data
function getBookFormData() {
  return {
    author: authorInput.value.trim(),
    title: titleInput.value.trim(),
    pages: pagesInput.value,
    isRead: isReadInput.checked,
  };
}

function resetDialogForm() {
  dialog.close();
  addBookForm.reset();
}

function validateFormData({ author, title, pages }) {
  if (!author) return { valid: false, message: "Please enter an author.", field: "#author" };
  if (!title) return { valid: false, message: "Please enter a title.", field: "#title" };
  if (pages === "") return { valid: false, message: "Please enter a number of pages.", field: "#pages" };

  const numPages = Number(pages);
  if (isNaN(numPages) || numPages < 0 || !Number.isInteger(numPages)) {
    return { valid: false, message: "Please enter a valid number of pages.", field: "#pages" };
  }
  return { valid: true };
}

displayBooks();
