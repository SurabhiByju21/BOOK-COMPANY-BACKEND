// MAIN BACKEND FILE

const db = require("./database/index.js"); //Import from database
// console.log(db.books);
// console.log(db.authors);
// console.log(db.publications);

const express = require("express"); //To create our express app

const app = express();
app.use(express.json()); //Feature to run in json format

app.get("/", (req, res) => {
    const getAllBooks = db.books;
    return res.json({"WELCOME": `No Books found for the category of`}); //Return to user
});

//http://localhost:3000/book
app.get("/books", (req, res) => {
    const getAllBooks = db.books;
    return res.json(getAllBooks); //Return to user
});

//http://localhost:8000/is/12345Two
app.get("/is/:isbn", (req, res) => {
    const {isbn} = req.params;
    const getSpecificBook = db.books.filter((book) =>
    book.ISBN == isbn);
    if(getSpecificBook.length==0) {
        return res.json({"error": `No Book found for the ISBN of ${isbn}`});
    }
    return res.json(getSpecificBook[0]);
});

//http://localhost:5000/book-category/programming
app.get("/book-category/:category", (req, res) => {
    const {category} = req.params;
    const getSpecificBooks = db.books.filter((book) =>
    book.category.includes(category));
    if(getSpecificBooks.length==0) {
        return res.json({"error": `No Books found for the category of ${category}`});
    }
    return res.json(getSpecificBooks);
});

//API for all authors

app.get("/authors", (req, res) => {
    const getAllAuthors = db.authors;
    return res.json(getAllAuthors); //Return to user
});

app.get("/author/:id", (req, res) => {
    let {id} = req.params;
    id = Number(id);
    const getSpecificAuthors = db.books.filter((author) =>
    author.id === id);
    if(getSpecificAuthors.length==0) {
        return res.json({"error": `No Author found for the id of ${id}`});
    }
    return res.json(getSpecificAuthors[0]);
});

app.get("/publications", (req, res) => {
    const getAllPublications = db.books;
    return res.json(getAllPublications); //Return to user
});

app.post("/book", (req, res) => {
    const {newBook} = req.body;
    db.books.push(req.body);
    return res.json(db.books);
});

app.post("/author", (req, res) => {
    db.authors.push(req.body);
    return res.json(db.authors);
});

//http://localhost:3000/book-update/12345ONE
app.put("/book-update/:isbn", (req, res) => {
    console.log(req.body);
    console.log(req.params);
    const {isbn} = req.params;
    db.books.forEach((book) => {
        if(book.ISBN === isbn) {
            console.log({...book, ...req.body});
            return{...book, ...req.body};
        }
        return book;
    })
    return res.json(db.books);
    // db.books.push(req.body);
    // return res.json(db.books);
});

//http://localhost:3000/author-update/1
app.put("/author-update/:id", (req, res) => {
});

//http://localhost:3000/publication-update/1
app.put("/publication-update/:id", (req, res) => {
});


//http://localhost:3000/book-delete/12345ONE
app.delete("/book-delete/:isbn", (req, res) => {    
    console.log(req.params);
    const {isbn} = req.params;
    const filteredBooks = db.books.filter((book) => book.ISBN!==isbn); 
    console.log(filteredBooks);
    db.books = filteredBooks;
    return res.json(db.books);
    // db.books.push(req.body);
    // return res.json(db.books);
});

// For deleting one aspect
//http://localhost:3000/book-delete/12345ONE/1
app.delete("/book-delete/:isbn/:id", (req, res) => {    
    // console.log(req.params);
    let {isbn, id} = req.params;
    id = Number(id);
    db.books.forEach((book) => {
        if(book.ISBN === isbn) {
            if(!book.authors.includes(id)){
                return;
            }
            book.authors = book.authors.filter ((author) => author !== id);
            return book; 
        }
        return book;
    })
    return res.json(db.books);
});

//http://localhost:3000/author-book-delete/1/12345ONE
app.delete("/author-book-delete/:id/:isbn", (req, res) => {    
});

app.listen(3000, () => {
    console.log("MY EXPRESS APP IS RUNNING.....")
})