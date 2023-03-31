let myLibrary = {};
let rowID = 1;

function pad(num, size) {
  num = num.toString();
  while (num.length < size) num = "0" + num;
  return num;
}

function updateLibraryDisplay(element) {
  let table = $("#libraryDisplay");
  let popUp = $("#submitBook");
  var rowStr = pad(parseInt(element.id), 4);
  var newRow = "'<tr class=\"tableRow\"><td>"+rowStr+"</td><td>"+element.title+"</td><td>"+element.author+"</td><td>"+element.pages.toString()+"</td><td>"+element.read.toString()+"</td><td><button id=\"delete"+rowStr+"\">Delete Book</button></tr>'";
  table.append(newRow);
  popUp.css("display", "none");
  rowID += 1;
  $( "#delete"+rowStr ).on( "click", function(){
    $(this).parent().parent().remove();
  });
}

class Book {
  constructor(title, author, nPages, read = false) {
    this.title = title;
    this.author = author;
    this.pages = nPages;
    this.read = read;
    this.id = rowID;
  }

  addToLibrary() {
    myLibrary[rowID] = this;
    updateLibraryDisplay(this);
  }

  removeBook(){
    var rowStr = parseInt(this.id).toString();
    var rowToDelete = $("#"+rowStr);
    rowToDelete.remove();
    delete myLibrary[this.id];
  };
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

  $( "#clearAll" ).on( "click", function(){
    rowID = 1;
    myLibrary = {};
    $( ".tableRow" ).remove();
  });
});