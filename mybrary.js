let myLibrary = [];

function updateLibraryDisplay(element) {
  let table = $("#libraryDisplay");
  let popUp = $("#submitBook");
  var newRow = "'<tr><td>"+element.title+"</td><td>"+element.author+"</td><td>"+element.pages.toString()+"</td><td>"+element.read.toString()+"</td></tr>'";
  console.log(newRow);
  table.append(newRow);
  popUp.css("display", "none");
}

class Book {
  constructor(title, author, nPages, read = false) {
    this.title = title;
    this.author = author;
    this.pages = nPages;
    this.read = read;
  }

  addToLibrary() {
    myLibrary.push(this);
    updateLibraryDisplay(this);
  }
}

$(() => {

  $( "#newBook" ).on( "click", function() {
    let popUp = $("#submitBook");
    popUp.css("display", "block");
  });

  $( "#submitBook" ).submit(function (e) {
    e.preventDefault();
    var book_title = $("#title");
    var book_author = $("#author");
    var pagecount = $("#npages");
    var bookRead = $("#readBox");
    var bookVal = "No"
    if (bookRead.is(":checked")){
      bookVal = "Yes"
    }
    var newBook = new Book(book_title.val(), book_author.val(), pagecount.val(), bookVal);
    newBook.addToLibrary();
    this.reset();
  });
});