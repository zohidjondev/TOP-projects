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
const myLibrary = [
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    pages: "180",
    desc: "A classic novel set in the Roaring Twenties.",
    isRead: "true",
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    pages: "281",
    desc: "A novel about racial injustice in the Deep South.",
    isRead: "false",
  },
  {
    title: "1984",
    author: "George Orwell",
    pages: "328",
    desc: "A dystopian novel about a totalitarian regime.",
    isRead: "true",
  },
  {
    title: "Moby-Dick",
    author: "Herman Melville",
    pages: "585",
    desc: "A whaling voyage and a captain's obsession with a white whale.",
    isRead: "false",
  },
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    pages: "279",
    desc: "A romantic novel about manners and marriage in early 19th-century England.",
    isRead: "true",
  },
];

// Main Book object constructor
function Book(title, author, pages, desc, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.desc = desc;
  this.isRead = isRead;
}

// The Loop over each element of myLibrary
for (item of myLibrary) {
  addBookToLibrary(item.title, item.author, item.pages, item.desc, item.isRead);
}

// Events
inputAddCard.addEventListener("click", () => {
  let selectedStatus;
  for (const radioButton of inputRadioButtons) {
    if (radioButton.checked) {
      selectedStatus = radioButton.value;
      break;
    }
  }

  if (
    inputTitle.value == "" ||
    inputAuthor.value == "" ||
    inputPages.value == "" ||
    textareaDesc.value == ""
  ) {
    showNotification(
      "error",
      "Please fill in all inputs before adding the book.",
      4000
    );
  } else {
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
    myLibrary.unshift(newBook);

    inputTitle.value = "";
    inputAuthor.value = "";
    inputPages.value = "";
    textareaDesc.value = "";

    showNotification("success", "Book added successfully!", 4000);
  }
});

// Functions
function createDomElement(htmlTag, className, textContent = "") {
  const element = document.createElement(htmlTag);
  if (className) element.classList.add(className);
  if (textContent) element.textContent = textContent;

  return element;
}

function addBookToLibrary(title, author, pages, desc, isRead) {
  const cards = document.querySelector(".cards");
  const firstChild = cards.firstChild;
  cards.classList.add("cards");

  const card = createDomElement("div", "card");

  // Title
  const cardTitle = createDomElement("div", "card-title");
  const cardTitleText = createDomElement("h1", "", title);
  cardTitle.appendChild(cardTitleText);
  card.append(cardTitle);

  // Author
  const cardAuthor = createDomElement("div", "card-author");
  const cardAuthorText = createDomElement("h2", "", author);
  cardAuthor.appendChild(cardAuthorText);
  card.append(cardAuthor);

  // Description
  const cardDesc = createDomElement("div", "card-short-desc");
  const cardDescText = createDomElement("h2", "", desc);
  cardDesc.appendChild(cardDescText);
  card.append(cardDesc);

  // Pages
  const cardPages = createDomElement("div", "card-pages");
  const cardPagesTitle = createDomElement("h4", "", "Pages");
  const cardPagesText = createDomElement("p", "", pages);
  cardPages.appendChild(cardPagesTitle);
  cardPages.appendChild(cardPagesText);
  card.append(cardPages);

  // Have read
  const cardIsRead = createDomElement("div", "card-have-read");
  const cardIsReadTitle = createDomElement("h4", "", "Have read?");

  // Converting from boolean to text for display
  let IsReadText = isRead === "false" ? "No" : "Yes";

  const cardIsReadText = createDomElement("p", "", IsReadText);
  cardIsRead.appendChild(cardIsReadTitle);
  cardIsRead.appendChild(cardIsReadText);
  card.append(cardIsRead);

  // Buttons
  const cardActionMenu = createDomElement("div", "card-action-menu");

  // Delete Button
  const cardDeleteBtn = createDomElement("button", "card-delete", "Delete");
  cardActionMenu.appendChild(cardDeleteBtn);

  // Change Status button
  const changeStatusBtn = createDomElement(
    "button",
    "card-have-read-btn",
    (IsReadText = isRead === "false" ? "I read it!" : "I didn't read it!")
  );
  cardActionMenu.appendChild(changeStatusBtn);
  card.appendChild(cardActionMenu);
  cards.insertBefore(card, firstChild);

  // Events
  cardDeleteBtn.addEventListener("click", () => {
    cards.removeChild(card);
  });

  changeStatusBtn.addEventListener("click", () => {
    if (changeStatusBtn.textContent == "I didn't read it!") {
      changeStatusBtn.textContent = "I read it!";
      cardIsReadText.textContent = "No";
    } else if (changeStatusBtn.textContent == "I read it!") {
      changeStatusBtn.textContent = "I didn't read it!";
      cardIsReadText.textContent = "Yes";
    }
  });
}

// Function to create and show notifications
function showNotification(type, message, duration = 3000) {
  const container = document.getElementById("notification-container");

  // Create notification div
  const notification = document.createElement("div");
  notification.classList.add("notification", type); // Add notification class and type (success, error, info)

  // Create message text
  notification.innerHTML = `<span>${message}</span>`;

  // Add close button
  const closeButton = document.createElement("button");
  closeButton.innerHTML = "&times;"; // Close icon
  notification.appendChild(closeButton);

  // Append notification to container
  container.appendChild(notification);

  // Close button functionality
  closeButton.addEventListener("click", () => {
    removeNotification(notification);
  });

  // Automatically remove after duration
  setTimeout(() => {
    removeNotification(notification);
  }, duration);
}

// Function to remove notification with fade-out animation
function removeNotification(notification) {
  notification.style.animation = "fade-out 0.5s forwards";
  notification.addEventListener("animationend", () => {
    notification.remove();
  });
}
