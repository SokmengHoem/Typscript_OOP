class Book {
  constructor(
    public title: string,
    public author: string,
    public genre: string,
    public ISBN?: string,
    public available: boolean = true
  ) {}
}

class UserAccount {
  protected borrowed_books: string[]= [];
  constructor(public name : string){}

  borrowBook(bookTitle:string, library:Library):string {
    const bookAvailability = library.borrowBook(bookTitle);
    if (bookAvailability) {
      this.borrowed_books.push(bookTitle);
    }
    return bookAvailability;
  }

  viewBorrowedBook():string[] {
    return this.borrowed_books;
  }
};
//for student
class Student extends UserAccount {
  constructor(name: string) {
    super(name);
  }

  borrowBook(bookTitle: string, library: Library): string {
    if (this.borrowed_books.length >= 5){
      return "Sorry, you can't borrow more than 5 books";
    }else{
      return super.borrowBook(bookTitle, library);
    }
  }
      
}

//for Admin

class Admin extends UserAccount {
  constructor(name: string) {
    super(name);
  }

  borrowBook(bookTitle: string, library: Library): string {
    return super.borrowBook(bookTitle, library);
  }

  // returnBook(bookTitle: string, library: Library): string {
  //   return library.returnBook(bookTitle);
  // }
}

class Library {
  private books: Book[] = [];

  constructor(public name: string) {}
  addBook(book: Book): void {
    this.books.push(book);
  }
  removeBook(title: string) {
    this.books = this.books.filter((book) => book.title !== title && book.ISBN !== title);
  }
  searchBook(titleOrISBN: string) {
    titleOrISBN = titleOrISBN.toLowerCase(); // Convert to lowercase
    console.log(titleOrISBN); // Log the lowercase value
    const foundBooks = this.books.filter(
      (book) => 
        book.title.toLowerCase() === titleOrISBN ||  // Convert book title to lowercase for comparison
        book.ISBN === titleOrISBN ||  
        book.author.toLowerCase() === titleOrISBN ||  // Convert author name to lowercase for comparison
        book.genre.toLowerCase() === titleOrISBN     // Convert genre to lowercase for comparison
    );
    return foundBooks.length > 0 ? foundBooks : "Not found";
  }
  
  printBooks(): void {
    let i = 1;
    this.books.forEach((book) => {
      console.log(`===================> Book #${i++}`);
      console.log(
        `Title: ${book.title} , Author ${book.author} ,Genre: ${book.genre} , Available: ${book.available}, ISBN: ${book.ISBN}`
      );
      console.log("===================");
    });
  }

  borrowBook(title:string):string {
    const foundBook = this.books.find((book) => book.title === title);
    if (foundBook && foundBook.available) {
      foundBook.available = false;
      return `You have successfully borrowed ${title}`;
    }
    return `Sorry, ${title} is not available`;
  }

  returnBook(title:string):string {
    const foundBook = this.books.find((book) => book.title === title);
    if (foundBook &&!foundBook.available) {
      foundBook.available = true;
      return `You have successfully returned ${title}`;
    }
    return `Sorry, ${title} is not available`;
  }
}

//add book
let book1 = new Book("First Love", "Sok", "Love", "123");
let book2 = new Book("Reactjs", "dara", "Code", "468");
let book3 = new Book("Principles of Economics","Vireak","Economics","8888");
let book4 = new Book("Clay tablets", "Jon", "history", "9999");
let book5 = new Book("History of Angkor", "vichet", "history", "1100");
let book6 = new Book("History of Wat Phnom", "Vuth", "history", "1111");
let library = new Library("Rean An");
library.addBook(book1);
library.addBook(book2);
library.addBook(book3);
library.addBook(book4);
library.addBook(book5);
library.addBook(book6);

//print
// console.log("Books in Library:");
// library.printBooks();

//remove book
// library.removeBook("468");
// console.log("Books in Library after remove:");
// library.printBooks();

//Search Book by title and ISBN
// console.log("Search Book:");
// const foundBookByISBN = library.searchBook("123"); // Assuming ISBN is stored in the Book class as 'ISBN'
// console.log(foundBookByISBN);

//Borrow Book from admin and student

let admin = new Admin("admin");
let student = new Student("Li Tang");
//let student2 = new Student("student2");

//console.log(admin.borrowBook("Reactjs", library));
//more than for student
// console.log(student.borrowBook("First Love", library));
// console.log(student.borrowBook("Reactjs", library));
// console.log(student.borrowBook("Principles of Economics",library));
// console.log(student.borrowBook("Clay tablets",library));
// console.log(student.borrowBook("History of Angkor", library));
// console.log(student.borrowBook("History of Wat Phnom", library));

//for return book
//console.log(library.returnBook("First Love"))
