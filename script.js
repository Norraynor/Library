let myLibrary = [];
const table = document.querySelector("#table");
const newBook = document.querySelector("#new");
const loadBook = document.querySelector("#load");
const submitButton = document.querySelector("#submit");
const bookForm = document.forms["book-form"];
const titleElement = bookForm.elements.title;
const authorElement = bookForm.elements.author;
const pagesElement = bookForm.elements.pages;
const radioButtonElement = bookForm.elements.read;
let canHide = false;
//myLibrary = [new Book("boobit","bub",2,false), new Book("nice book","why",15,false)]

const sessionStorage = window.sessionStorage;
let loadedLibrary = [];

function Book(title,author,pages,read=false){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = Boolean(read);
/*
    this.toggleRead = document.createElement("input");
    this.toggleRead.type = "checkbox";
    this.toggleRead.id = "checkbox-read";
    this.toggleRead.addEventListener("click",changeRead);

    this.deleteButton = document.createElement("button");
    this.deleteButton.id = "delete-button";
    this.deleteButton.textContent = "del";
    this.deleteButton.addEventListener("click",deleteBook);
    */
}
Book.prototype.info = function(){
    let message;

    if(!this.read){
        message = this.title+" by "+this.author+", "+this.pages+" pages, "+"not read yet.";
    }else{
        message = this.title+"by"+this.author+","+this.pages+" pages,"+"read.";
    }

    return message;
}
function createBookElements(){
    Book.prototype.toggleRead = document.createElement("input");
    Book.prototype.toggleRead.type = "checkbox";
    Book.prototype.toggleRead.id = "checkbox-read";
    Book.prototype.toggleRead.addEventListener("click",changeRead);
    
    Book.prototype.deleteButton = document.createElement("button");
    Book.prototype.deleteButton.id = "delete-button";
    Book.prototype.deleteButton.textContent = "del";
    Book.prototype.deleteButton.addEventListener("click",deleteBook);
}

function addBookToLibrary(title,author,pages,read) {
    myLibrary.push(new Book(title,author,pages,read));
    //createBookElements();
    //console.log(JSON.stringify(myLibrary));
    saveStorage();
}
function changeRead(ele){
    let result;
    if (ele.target.checked) {
        result = true;
    }else{
        result = false;
    }
    myLibrary[this.dataset.index].read = result;
    updateList();
}
function deleteBook(){
    myLibrary.splice(this.dataset.index,1);
    saveStorage();
    updateList();
}
function updateList(){
    clearBooks();
    showBooks();
}
function saveStorage(){
    sessionStorage.setItem("library",JSON.stringify(myLibrary));
}
function loadStorage(){
    loadedLibrary = JSON.parse(sessionStorage.getItem("library"));
    loadedLibrary.forEach((book, i) => {
        currentBook = loadedLibrary[i];
        book = new Book(currentBook.title,currentBook.author,currentBook.pages,currentBook.read);
        book.index = i;
        createBookElements();
        book.deleteButton.dataset.index = book.index;
        book.toggleRead.dataset.index = book.index;
        book.toggleRead.checked = book.read;
        loadedLibrary[i] = book;
    });
    myLibrary=loadedLibrary;
    updateList();
}
function showBooks(){
    firstRow();
    myLibrary.forEach((book,i) => {
        book.index = i;
        createBookElements();
        book.deleteButton.dataset.index = book.index;
        book.toggleRead.dataset.index = book.index;
        book.toggleRead.checked = book.read;
        row = document.createElement("tr");
        for(const prop in book){
            if(book[prop].constructor === Function){
                continue;
            }
            if(prop === "read" || prop ==="index"){
                continue;
            }
            column = document.createElement("td");
            if(book[prop].id !== "delete-button" && book[prop].id !== "checkbox-read"){
                column.textContent = book[prop];
            }
            else{
                column.appendChild(book[prop]);
            }            
            row.appendChild(column);  
        };
        table.appendChild(row);
    });
}
function firstRow(){
    const book = myLibrary[0];
    row = document.createElement("tr");
    for(const prop in book){
        let newValue = "";
        column = document.createElement("td");
        if(book[prop].constructor === Function){
            continue;
        }
        if(prop === "read" || prop ==="index"){
            continue;
        }
        if(prop === "toggleRead"){
            newValue = "Read yet?";
            column.textContent = newValue;
            row.appendChild(column); 
        }
        else if(prop==="deleteButton"){
            newValue = "Delete book";
            column.textContent = newValue;
            row.appendChild(column); 
        }
        else{
            column.textContent = prop.slice(0,1).toUpperCase() + prop.slice(1).toLowerCase();
            row.appendChild(column); 
        } 
    };
    table.appendChild(row);
}
function clearBooks(){
    table.textContent="";
}
function getBookData(event){
    canHide=true;
    let radioValue = false;
    radioButtonElement.forEach(element => {
        if(element.checked){
            radioValue = element.value;
        }
    });
    if(!pagesElement.value){
        alert("You need to write number");
        pagesElement.style.borderColor = "red";
        canHide=false;
        event.preventDefault();
    }
    else{
        pagesElement.style.borderColor = "green";
    }
    if(!authorElement.value){
        alert("Fill out the author");
        authorElement.style.borderColor = "red";
        canHide=false;
        event.preventDefault();
    }
    else{
        authorElement.style.borderColor = "green";
    }
    if(!titleElement.value){
        alert("Fill out the title");
        titleElement.style.borderColor = "red";
        canHide=false;
        event.preventDefault();
    }
    else{
        titleElement.style.borderColor = "green";
    }
    if(canHide){
        addBookToLibrary(titleElement.value,authorElement.value,pagesElement.value,radioValue);
        closeForm();
        event.preventDefault();
        updateList();
    }
}
function openForm(){
    bookForm.style.display = "block";
    titleElement.value = "";
    authorElement.value = "";
    pagesElement.value = "";

}
function closeForm(){
    bookForm.style.display = "none";
}
newBook.addEventListener("click",()=>{openForm()});
loadBook.addEventListener("click",()=>{loadStorage()});