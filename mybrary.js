let myLibrary = {};
let rowID = 0;

function updateLibraryDisplay(element) {
  let table = $("#libraryDisplay");
  let popUp = $("#submitBook");
  var rowStr = parseInt(element.rowID).toString();
  var newRow = "'<tr id=\""+rowStr+"\"><td>"+element.title+"</td><td>"+element.author+"</td><td>"+element.pages.toString()+"</td><td>"+element.read.toString()+"</td><td><button class=\"deleteBook\">Delete Book</button></tr>'";
  table.append(newRow);

  $( ".deleteBook ").on( "click", function(element) {
    var rowStr = parseInt(element.rowID).toString();
    var rowToDelete = $("#"+rowStr);
    rowToDelete.remove();
    delete myLibrary[element.rowID];
  });

  popUp.css("display", "none");
}

class Book {
  constructor(title, author, nPages, read = false) {
    this.title = title;
    this.author = author;
    this.pages = nPages;
    this.read = read;
    this.id = rowID;
    rowID += 1;
  }

  addToLibrary() {
    myLibrary[rowID] = this;
    updateLibraryDisplay(this);
  }
};

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