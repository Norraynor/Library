let myLibrary = [];
const table = document.querySelector("#table");
const newBook = document.querySelector("#new");
const submitButton = document.querySelector("#submit");
const bookForm = document.forms["book-form"];
const titleElement = bookForm.elements.title;
const authorElement = bookForm.elements.author;
const pagesElement = bookForm.elements.pages;
const radioButtonElement = bookForm.elements.read;
let canHide = false;
myLibrary = [new Book("boobit","bub",2,false), new Book("nice book","why",15,false)]

function Book(title,author,pages,read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.info = function(){
        let message;

        if(!read){
            message = title+" by "+author+", "+pages+"pages, "+"not read yet.";
        }else{
            message = title+"by"+author+","+pages+"pages,"+"read.";
        }

        return message;
    }
}

function addBookToLibrary(title,author,pages,read) {
    // do stuff here
    myLibrary.push(new Book(title,author,pages,read));
}

function showBooks(){
    myLibrary.forEach(book => {
        row = document.createElement("tr");
        for(const prop in book){
            if(book[prop].constructor === Function){
                continue;
            }
            column = document.createElement("td");
            column.textContent = book[prop];
            row.appendChild(column);  
        };
        table.appendChild(row);
    });
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
    console.log(canHide);
    if(canHide){
        addBookToLibrary(titleElement.value,authorElement.value,pagesElement.value,radioValue);
        closeForm();
        event.preventDefault();
        clearBooks();
        showBooks();
    }
}
function openForm(){
    console.log("opening form");
    bookForm.style.display = "block";
    titleElement.value = "";
    authorElement.value = "";
    pagesElement.value = "";

}
function closeForm(){
    console.log("closing form");
    bookForm.style.display = "none";
}
newBook.addEventListener("click",()=>{openForm()});