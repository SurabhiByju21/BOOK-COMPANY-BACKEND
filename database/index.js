let books = [
    { 
        ISBN: "12345ONE", //Primary key
        title: "Getting started with MERN", 
        authors: [1, 2], // As names might be the same
        language: "en",
        pubDate: "2021-07-07",
        numOfPage: 225,
        category: ["fiction", "programming", "tech", "web dev"],
        publication: 1,},
    {
        ISBN: "12345Two",
        title: "Getting started with Python",
        authors: [1,2],
        language: "en",
        pubDate: "2021-07-07",
        numOfPage: 550,
        category: ["fiction", "programming", "web dev"],
        publication: 1,
    }
];

let authors = [
    {
        id: 1,
        name:"surabhi",
        books: ["12345ONE", "12345Two"], // Two books can have same name but not same id
    },
    {
        id: 2,
        name:"ram",
        books: ["12345ONE", "12345Two"],
    }
];

let publications = [
    {
        id: 1,
        name:"ShapeAI Publications",
        books: ["12345ONE", "12345Two"],
    },
    {
        id: 2,
        name:"Byju Publications",
        books: [],
    }
];

module.exports = {books, authors, publications}; //Export database