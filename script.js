const container = document.querySelector(".shelf");
const dialog = document.querySelector("dialog");

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
    const authorInput = document.querySelector("#author");
    const titleInput = document.querySelector("#title");
    const pagesInput = document.querySelector("#pages");

    const author = document.querySelector("#author").value.trim();
    const title = document.querySelector("#title").value.trim();
    const pages = document.querySelector("#pages").value;
    const isRead = document.querySelector("#isRead").checked;

    //validation for author and title
    const validations = [
      { value: author, input: authorInput, message: "Please enter an author." },
      { value: title, input: titleInput, message: "Please enter a title." },
      // add more validations here if needed
    ];
    for (const { value, input, message } of validations) {
      if (value == "") {
        alert(message);
        input.focus();
        input.select();
        return;
      }
    }

    //validation for pages
    let numPages = Number(pages);
    if (isNaN(numPages) || numPages < 0 || !Number.isInteger(numPages) || numPages == "") {
      alert("Please enter a valid number of pages.");
      pagesInput.focus();
      pagesInput.select();
      return;
    }

    addBookToLibrary(author, title, pages, isRead);
    dialog.close();
    document.querySelector("#add-book-form").reset();
  }
  if (e.target.tagName === "BUTTON" && e.target.id === "cancel-btn") {
    dialog.close();
    document.querySelector("#add-book-form").reset();
  }
});

//event listener for escape key to reset form as well (since it already closes the form by default)
dialog.addEventListener("keydown", (e) => {
  if (e.key == "Escape") {
    dialog.close();
    document.querySelector("#add-book-form").reset();
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
