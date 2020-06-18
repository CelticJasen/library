let myLibrary = [];
let bookCount = 1;

function book(count, title, author, pages, read){
    this.uniqueid = count;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    function info(){
        let readString = "";

        if(this.read){
            readString = "has been read";
        }else{
            readString = "not read yet";
        }

        return `${this.title} by ${this.author}, ${this.pages} pages, ${readString}`;
    }
}

function addBookToLibrary(){
    if(document.getElementsByName("title")[0].value == 0 || document.getElementsByName("author")[0].value == 0 || document.getElementsByName("pages")[0].value == 0){
        alert("Something's missing...");
        return;
    }

    let title = document.getElementsByName("title")[0].value;
    let author = document.getElementsByName("author")[0].value;
    let pages = document.getElementsByName("pages")[0].value;
    let read = document.getElementsByName("read")[0].checked;

    myLibrary[myLibrary.length] = new book(bookCount, title, author, pages, read);

    bookCount++;

    clearForm();
}

function clearForm(){
    document.getElementById("bookForm").reset();
}

function displayBooks(){
    if(document.getElementById("bookTable")){
        document.getElementById("bookTable").parentNode.removeChild(document.getElementById("bookTable"));
    }

    let bookDisplay = document.getElementById("bookDisplay");
    let table = document.createElement("table");
    table.id = "bookTable";
    let tableHeadRow = document.createElement("tr");
    let tableHeadUniqueId = document.createElement("th");
    let tableHeadTitle = document.createElement("th");
    let tableHeadAuthor = document.createElement("th");
    let tableHeadPages = document.createElement("th");
    let tableHeadRead = document.createElement("th");

    tableHeadUniqueId.textContent = "ID";
    tableHeadTitle.textContent = "Title";
    tableHeadAuthor.textContent = "Author";
    tableHeadPages.textContent = "Pages";
    tableHeadRead.textContent = "Read";

    tableHeadRow.appendChild(tableHeadUniqueId);
    tableHeadRow.appendChild(tableHeadTitle);
    tableHeadRow.appendChild(tableHeadAuthor);
    tableHeadRow.appendChild(tableHeadPages);
    tableHeadRow.appendChild(tableHeadRead);

    table.appendChild(tableHeadRow);

    for(i = 0; i < myLibrary.length; i++){
        let tableRow = document.createElement("tr");
        let tableUniqueId = document.createElement("td");
        let tableTitle = document.createElement("td");
        let tableAuthor = document.createElement("td");
        let tablePages = document.createElement("td");
        let tableRead = document.createElement("td");
        let deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete this entry";
        deleteButton.id = myLibrary[i].uniqueid;
        deleteButton.onclick = function(){deleteEntry(this.id);};
        let toggleButton = document.createElement("button");
        toggleButton.innerText = "Toggle read status";
        toggleButton.id = myLibrary[i].uniqueid;
        toggleButton.onclick = function(){toggleRead(this.id);};

        tableUniqueId.textContent = myLibrary[i].uniqueid;
        tableTitle.textContent = myLibrary[i].title;
        tableAuthor.textContent = myLibrary[i].author;
        tablePages.textContent = myLibrary[i].pages;

        if(myLibrary[i].read){
            tableRead.textContent = "Read";
        }else{
            tableRead.textContent = "Unread";
        }

        tableRow.appendChild(tableUniqueId);
        tableRow.appendChild(tableTitle);
        tableRow.appendChild(tableAuthor);
        tableRow.appendChild(tablePages);
        tableRow.appendChild(tableRead);
        tableRow.appendChild(toggleButton);
        tableRow.appendChild(deleteButton);

        table.appendChild(tableRow);
    }

    bookDisplay.appendChild(table);
}

function deleteEntry(id){
    myLibrary = myLibrary.filter(book => book.uniqueid !== Number(id));

    displayBooks();
}

function toggleRead(id){
    for(i = 0; i < myLibrary.length; i++){
        if(myLibrary[i].uniqueid === Number(id)){
            myLibrary[i].read = !myLibrary[i].read;
        }
    }

    displayBooks();
}

function openForm(){
    document.getElementById("addBookForm").style.display = "block";
}

function closeForm(){
    document.getElementById("addBookForm").style.display = "none";
}

document.getElementById("displayForm").addEventListener("click", openForm);
document.getElementById("closeButton").addEventListener("click", closeForm);
document.getElementById("displayBooks").addEventListener("click", displayBooks);
document.getElementById("addBook").addEventListener("click", addBookToLibrary);