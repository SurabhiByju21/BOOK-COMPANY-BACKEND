// MAIN BACKEND FILE

// const db = require("./database/index.js"); //Import from database
// const mongoose = require('mongoose'); // Import from MongoDB
const dotenv = require("dotenv");
dotenv.config();
require('dotenv').config()
const express = require("express"); //To create our express app
const BookModel = require("./database/books");

const app = express();
app.use(express.json()); //Feature to run in json format

//Importing Mongoose
var mongoose = require('mongoose');
//Set up deault mongoose connection
// var mongoDB = 'mongodb+srv://surabhi_byju:m6V9o24EZkPdFPrl@cluster0.vtulq.mongodb.net/book-company?retryWrites=true&w=majority';
var mongoDB = process.env.MONGODB_URI;
//After promise is resolved
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => console.log("CONNECTION ESTABLISHED"));


// const { MongoClient } = require('mongodb'); //Connecting with the database
// const uri = "mongodb+srv://surabhi_byju:m6V9o24EZkPdFPrl@cluster0.vtulq.mongodb.net/book-company?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const bcollection = client.db("book-company").collection("books").findOne({ISBN: "1234Three"});
//   bcollection.then((data)=>console.log(data));
// });

// async function listDatabases(client) {
//     databsesList = await client.db().admin().listDatabases();
//     console.log("THE DATABASES ARE:");
//     databasesList.databases.forEach(db=>console.log(db.name));
// }

// async function main() {
//     const uri = "mongodb+srv://surabhi_byju:0RhZ6HremrmoDq8q@cluster0.vtulq.mongodb.net/book-company?retryWrites=true&w=majority";
//     const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
//     try {
//         await client.connect();
//         const result = await client.db("book-company").collection("books").findOne({ISBN: "1234Three"});
//         console.log(result);
//     }
//     catch(err) {
//         console.log(err);
//     }
//     finally {
//         await client.close();
//     }
// }
// main();


app.get("/", async (req, res) => {
    const getAllBooks = await BookModel;
    return res.json({"WELCOME": `No Books found for the category of`}); //Return to user
});

//http://localhost:3000/books
app.get("/books", async (req, res) => {
    const getAllBooks = await BookModel.find();
    return res.json(getAllBooks); //Return to user
});

//http://localhost:3000/book-isbn/12345Two
app.get("/book-isbn/:isbn", async (req, res) => {
    const {isbn} = req.params;
    const getSpecificBook = await BookModel.findOne({ISBN: isbn});
    if(getSpecificBook===null) {
        return res.json({"error": `No Book found for the ISBN of ${isbn}`});
    }
    return res.json(getSpecificBook[0]);
});

//http://localhost:3000/book-category/programming
app.get("/book-category/:category", async (req, res) => {
    const {category} = req.params;
    const getSpecificBooks = await BookModel.find({category: category});
    if(getSpecificBooks.length===0) {
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

// http://localhost:3000/author-isbn/12One
app.get("/author-isbn/:isbn", async (req, res) => {
    // console.log(req.params);
    const {isbn} = req.params;
    // console.log(isbn);
    const getSpecificAuthors = await AuthorModel.find({books:isbn});
    // console.log(getSpecificAuthors);
    // console.log(getSpecificAuthors.length);
    if(getSpecificAuthors.length===0) {
        return res.json({"error": `No Authors found for the book of ${isbn}`});
    }
    return res.json(getSpecificAuthors);
 });

app.get("/publications", (req, res) => {
    const getAllPublications = db.books;
    return res.json(getAllPublications); //Return to user
});

// http://localhost:3000/publication-isbn/12345Two
app.get("/publication-isbn/:isbn", (req, res) => {
   
});


app.post("/book", async (req, res) => {
    // const {newBook} = req.body;
    const addNewBook = await BookModel.create(req.body);
    // db.books.push(req.body);
    return res.json({
        books: addNewBook,
        message: "Book was Added !!!"
    });
});

app.post("/author", (req, res) => {   
    // db.authors.push(req.body); //req.body contains details of new book
    // return res.json(db.authors);
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
app.put("/author-update/:id", async (req, res) => {
    const {id} = req.params;
    const updateAuthor = await AuthorModel.findOneAndUpdate({id: id}, req.body, {new: true});
    return res.json( {authorUpdated: updateAuthor, message: "Author was updated !!!"} );
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

app.listen(process.env.PORT || 3000, () => {
    console.log("MY EXPRESS APP IS RUNNING.....")
})