// Book Class
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
        this.borrowed = false;  // Indicates whether the book is currently borrowed
    }

    // Method to check if the book is borrowed
    isBorrowed() {
        return this.borrowed;
    }
}

// User Class
class User {
    constructor(name, id) {
        this.name = name;
        this.id = id;
        this.borrowedBooks = [];  // List of borrowed books
    }

    // Method to borrow a book
    borrowBook(book) {
        if (this.borrowedBooks.length >= 3) {
            console.log('Cannot borrow more than 3 books');
            return false;
        }
        if (book.isBorrowed()) {
            console.log('Book is already borrowed');
            return false;
        }
        book.borrowed = true;
        this.borrowedBooks.push(book);
        return true;
    }

    // Method to return a book
    returnBook(isbn) {
        const bookIndex = this.borrowedBooks.findIndex(book => book.isbn === isbn);
        if (bookIndex !== -1) {
            const book = this.borrowedBooks.splice(bookIndex, 1)[0];
            book.borrowed = false;
            return true;
        }
        console.log('Book not found in borrowed books');
        return false;
    }

    // Method to peek a book information
    peekBook(isbn) {
        return this.borrowedBooks.find(book => book.isbn === isbn);
    }
}

// Library Class
class Library {
    constructor() {
        this.books = [];  // Collection of books
        this.members = [];  // Collection of users
    }

    // Method to register a new user
    registerMember(user) {
        if (this.members.find(member => member.id === user.id)) {
            console.log('User already registered');
            return false;
        }
        this.members.push(user);
        return true;
    }

    // Method to add a new book to the library collection
    addNewBook(book) {
        if (this.books.find(b => b.isbn === book.isbn)) {
            console.log('Book with this ISBN already exists');
            return false;
        }
        this.books.push(book);
        return true;
    }

    // Method to allow a user to borrow a book
    borrowBook(userId, isbn) {
        const user = this.members.find(member => member.id === userId);
        const book = this.books.find(b => b.isbn === isbn);

        if (!user) {
            console.log('User not found');
            return false;
        }
        if (!book) {
            console.log('Book not found');
            return false;
        }

        return user.borrowBook(book);
    }

    // Method to allow a user to return a book
    returnBook(userId, isbn) {
        const user = this.members.find(member => member.id === userId);

        if (!user) {
            console.log('User not found');
            return false;
        }

        return user.returnBook(isbn);
    }
}

// Sample usage:

// Creating instances of Book
const book1 = new Book('The Great Gatsby', 'F. Scott Fitzgerald', '1234567890');
const book2 = new Book('1984', 'George Orwell', '0987654321');
const book3 = new Book('To Kill a Mockingbird', 'Harper Lee', '1112131415');
const book4 = new Book('The Catcher in the Rye', 'J.D. Salinger', '1617181920');

// Creating instance of Library
const library = new Library();

// Adding books to the library
library.addNewBook(book1);
library.addNewBook(book2);
library.addNewBook(book3);
library.addNewBook(book4);

// Creating instance of User
const user1 = new User('Alice', 'U001');
const user2 = new User('Bob', 'U002');

// Registering users to the library
library.registerMember(user1);
library.registerMember(user2);

// User borrowing books
library.borrowBook('U001', '1234567890');  // Alice borrows The Great Gatsby
library.borrowBook('U001', '0987654321');  // Alice borrows 1984
library.borrowBook('U001', '1112131415');  // Alice borrows To Kill a Mockingbird
library.borrowBook('U001', '1617181920');  // Alice tries to borrow The Catcher in the Rye but fails

// User returning a book
library.returnBook('U001', '1234567890');  // Alice returns The Great Gatsby

// Checking borrowed book status
console.log(user1.peekBook('0987654321'));  // Details of borrowed book 1984

// User trying to borrow a book already borrowed
library.borrowBook('U002', '0987654321');  // Bob tries to borrow 1984 but fails