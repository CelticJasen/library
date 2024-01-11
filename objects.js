const myLibrary = [];

function Book(title, author, pages, readStatus){
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readStatus = readStatus;
  this.changeStatus = function(){
    this.readStatus = !this.readStatus;
  };
}

function addBookToLibrary(newBook){
  myLibrary.push(newBook);
}

function removeBookFromLibrary(index){
  myLibrary.splice(index, 1);
}

function displayBookCollection(booksArray){
  if(document.querySelectorAll('.card')){
    const cards = document.querySelectorAll('.card');
    cards.forEach(function(element){
      element.remove();
    });
  }

  const container = document.getElementById("bookContainer");

  booksArray.forEach(book => {
    const card = document.createElement('div');
    card.classList.add('card');

    const title = document.createElement('h2');
    title.textContent = `Title: ${book.title}`;

    const author = document.createElement('p');
    author.textContent = `Author: ${book.author}`;

    const pages = document.createElement('p');
    pages.textContent = `Pages: ${book.pages}`;

    const readStatus = document.createElement('p');
    readStatus.textContent = `Read Status: ${book.readStatus ? 'Read' : 'Not Read'}`;

    const toggleButton = document.createElement('button');
    toggleButton.textContent = 'Toggle Read Status';
    toggleButton.addEventListener('click', () => {
      book.changeStatus();
      readStatus.textContent = `Read Status: ${book.readStatus ? 'Read' : 'Not Read'}`;
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
      const bookIndex = booksArray.indexOf(book);
      if(bookIndex !== -1){
        booksArray.splice(bookIndex, 1);
      }

      card.remove();
    });

    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(pages);
    card.appendChild(readStatus);
    card.appendChild(toggleButton);
    card.appendChild(deleteButton);

    container.appendChild(card);
  });
}

function toggleForm(){
  if(document.getElementById("bookForm")){
    document.getElementById("bookForm").remove();
    document.getElementById("overlay").style.width = "0%";
    document.getElementById("overlay").style.height = "0%"
    return;
  }

  const form = document.createElement("form");
  const overlay = document.getElementById("overlay");
  form.id = "bookForm";

  overlay.style.width = "100%";
  overlay.style.height = "100%";

  // Array of field details
  let fields = [
    { label: "Title", type: "text", id: "title", name: "title", required: true },
    { label: "Author", type: "text", id: "author", name: "author", required: true },
    { label: "Pages", type: "number", id: "pages", name: "pages", required: true },
    { label: "Read/Not Read", type: "select", id: "readStatus", name: "readStatus", required: true, options: ["Read", "Not Read"] }
  ];

  // Loop through the fields array and create corresponding elements
  fields.forEach(function (field) {
    let label = document.createElement("label");
    label.htmlFor = field.id;
    label.textContent = field.label + ":";

    let input;
    if (field.type === "select") {
      input = document.createElement("select");
      input.id = field.id;
      input.name = field.name;
      input.required = field.required;

      // Create options for select field
      field.options.forEach(function (optionText) {
        let option = document.createElement("option");
        option.value = optionText.toLowerCase().replace(" ", "");
        option.textContent = optionText;
        input.appendChild(option);
      });
    } else {
      input = document.createElement("input");
      input.type = field.type;
      input.id = field.id;
      input.name = field.name;
      input.required = field.required;
    }

    // Append label and input to the form
    form.appendChild(label);
    form.appendChild(input);
    form.appendChild(document.createElement("br"));
  });

  // Create a submit button
  let submitButton = document.createElement("input");
  submitButton.type = "button";
  submitButton.value = "Submit";
  submitButton.onclick = processForm;

  // Append the submit button to the form
  form.appendChild(submitButton);

  // Append the form to the body
  overlay.appendChild(form);
}

function processForm(){
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  const readStatus = document.getElementById('readStatus').value;
  const overlay = document.getElementById("overlay");

  const newBook = new Book(title, author, pages, readStatus);
  overlay.style.width = "0%";
  overlay.style.height = "0%";
  addBookToLibrary(newBook);
  document.getElementById("bookForm").remove();
  displayBookCollection(myLibrary);
}
