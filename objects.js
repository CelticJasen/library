let myLibrary = [];
let bookCount = 1;

class Book {
    constructor(count, title, author, pages, read){
        this.uniqueid = count;
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    get read(){
        return this._read;
    }
    get author(){
        return this._author;
    }
    get pages(){
        return this._pages;
    }
    get title(){
        return this._title;
    }
    get readString(){
        return this._readString;
    }

    set read(value){
        this._read = value;
    }
    set title(value){
        this._title = value;
    }
    set author(value){
        this._author = value;
    }
    set pages(value){
        this._pages = value;
    }
    set readString(value){
        this._readString = value;
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

    myLibrary[myLibrary.length] = new Book(bookCount, title, author, pages, read);

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
    let tableHeadRow = document.createElement("tr");
    let tableHeadUniqueId = document.createElement("th");
    let tableHeadTitle = document.createElement("th");
    let tableHeadAuthor = document.createElement("th");
    let tableHeadPages = document.createElement("th");
    let tableHeadRead = document.createElement("th");

    table.id = "bookTable";
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
        let toggleButton = document.createElement("button");

        tableUniqueId.textContent = myLibrary[i].uniqueid;
        tableTitle.textContent = myLibrary[i].title;
        tableAuthor.textContent = myLibrary[i].author;
        tablePages.textContent = myLibrary[i].pages;

        if(myLibrary[i].read){
            tableRead.textContent = "Read";
        }else{
            tableRead.textContent = "Unread";
        }

        deleteButton.innerText = "Delete this entry";
        deleteButton.id = myLibrary[i].uniqueid;
        deleteButton.onclick = function(){deleteEntry(this.id);};
        toggleButton.innerText = "Toggle read status";
        toggleButton.id = myLibrary[i].uniqueid;
        toggleButton.onclick = function(){toggleRead(this.id);};

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
    myLibrary = myLibrary.filter(Book => Book.uniqueid !== Number(id));

    displayBooks();
}

function toggleRead(id){
    myLibrary = myLibrary.map(x => {
        if(x.uniqueid === Number(id)){
            x.read = !x.read;
        }
        
        return x;
    });

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
