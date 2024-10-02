// Input
const inputTitle = document.querySelector(".inputTitle");
const inputAuthor = document.querySelector(".inputAuthor");
const inputPages = document.querySelector(".inputPages");
const textareaDesc = document.querySelector(".textareaDesc");
const inputRadioButtons = document.querySelectorAll("input[name='have-read']");
const inputAddCard = document.querySelector("button.input-add-card");

// Card
const cardTitle = document.querySelector(".card-title h1");
const cardDesc = document.querySelector(".card-short-desc p");
const cardPages = document.querySelector(".card-pages h4");
const cardIsRead = document.querySelector(".card-have-read h4");

// Main Array
const myLibrary = [];

// Events
inputAddCard.addEventListener("click", () => {
  let selectedStatus;
  for (const radioButton of inputRadioButtons) {
    if (radioButton.checked) {
      selectedStatus = radioButton.value;
      break;
    }
  }
  const newBook = new Book(
    inputTitle.value,
    inputAuthor.value,
    inputPages.value,
    textareaDesc.value,
    selectedStatus
  );
  addBookToLibrary(
    newBook.title,
    newBook.author,
    newBook.pages,
    newBook.desc,
    newBook.isRead
  );
  myLibrary.push(newBook);

  inputTitle.value = "";
  inputAuthor.value = "";
  inputPages.value = "";
  textareaDesc.value = "";
});
