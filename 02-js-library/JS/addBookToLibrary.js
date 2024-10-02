function addBookToLibrary(title, author, pages, desc, isRead) {
  const cards = document.querySelector(".cards");
  cards.classList.add("cards");

  const card = document.createElement("div");
  card.classList.add("card");

  // Title
  const cardTitle = document.createElement("div");
  cardTitle.classList.add("card-title");
  const cardTitleh1 = document.createElement("h1");
  cardTitleh1.textContent = title;
  cardTitle.appendChild(cardTitleh1);
  card.append(cardTitle);

  // Author
  const cardAuthor = document.createElement("div");
  cardAuthor.classList.add("card-author");
  const cardAuthorh2 = document.createElement("h2");
  cardAuthorh2.textContent = author;
  cardAuthor.appendChild(cardAuthorh2);
  card.append(cardAuthor);

  // Desc
  const cardDesc = document.createElement("div");
  cardDesc.classList.add("card-short-desc");
  const cardDescp = document.createElement("h2");
  cardDescp.textContent = desc;
  cardDesc.appendChild(cardDescp);
  card.append(cardDesc);

  // Pages
  const cardPages = document.createElement("div");
  cardPages.classList.add("card-pages");
  const cardPagesh4 = document.createElement("h4");
  cardPagesh4.textContent = "Pages";
  const cardPagesp = document.createElement("p");
  cardPagesp.textContent = pages;
  cardPages.appendChild(cardPagesh4);
  cardPages.appendChild(cardPagesp);
  card.append(cardPages);

  // IsRead
  const cardIsRead = document.createElement("div");
  cardIsRead.classList.add("card-have-read");
  const cardIsReadh4 = document.createElement("h4");

  // logic for conterting the inout of true/false to yes/no
  let convertedIsRead;
  if (isRead == "false") {
    convertedIsRead = "No";
  } else {
    convertedIsRead = "Yes";
  }

  cardIsReadh4.textContent = "Have read?";
  const cardIsReadp = document.createElement("p");
  cardIsReadp.textContent = convertedIsRead;
  cardIsRead.appendChild(cardIsReadh4);
  cardIsRead.appendChild(cardIsReadp);
  card.append(cardIsRead);

  // Buttons
  const cardActionMenu = document.createElement("div");
  cardActionMenu.classList.add("card-action-menu");

  // Delete Button
  const cardDeleteBtn = document.createElement("button");
  cardDeleteBtn.classList.add("card-delete");
  cardDeleteBtn.textContent = "Delete";
  cardActionMenu.appendChild(cardDeleteBtn);

  // Change Status button

  const cardChangeStatusBtn = document.createElement("button");
  cardChangeStatusBtn.classList.add("card-have-read-btn");

  // Logic for making the text corresponding to its status
  let convertedTextStatus;

  if (convertedIsRead == "Yes") {
    convertedTextStatus = "I didn't read it!";
  } else if (convertedIsRead == "No") {
    convertedTextStatus = "I read it!";
  }

  cardChangeStatusBtn.textContent = convertedTextStatus;

  cardActionMenu.appendChild(cardChangeStatusBtn);
  card.appendChild(cardActionMenu);

  cards.appendChild(card);

  // Events

  cardDeleteBtn.addEventListener("click", () => {
    cards.removeChild(card);
  });

  cardChangeStatusBtn.addEventListener("click", () => {
    if (cardChangeStatusBtn.textContent == "I didn't read it!") {
      cardChangeStatusBtn.textContent = "I read it!";
      cardIsReadp.textContent = "No";
    } else if (cardChangeStatusBtn.textContent == "I read it!") {
      cardChangeStatusBtn.textContent = "I didn't read it!";
      cardIsReadp.textContent = "Yes";
    }
  });
}
