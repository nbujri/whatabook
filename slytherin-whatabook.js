/**
 * title: slytherin-whatabook.js
 * author: ngi bujri, janis gonzalez, william egge
 * date: may 5 2023
 * description: script to build and populate MongoDB collection
 */

// drop collections
db.books.drop();
db.customers.drop();

// COLLECTIONS

// create books collection
db.createCollection("books", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["title", "genre", "author", "bookId"],
      properties: {
        title: {
          bsonType: "string",
        },
        genre: {
          bsonType: "string",
        },
        author: {
          bsonType: "string",
        },
        bookId: {
          bsonType: "string",
        },
      },
    },
  },
});

// create customers collection
db.createCollection("customers", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["firstName", "lastName", "customerId"],
      properties: {
        firstName: {
          bsonType: "string",
        },
        lastName: {
          bsonType: "string",
        },
        customerId: {
          bsonType: "string",
        },
        wishlist: {
          bsonType: "array",
        },
      },
    },
  },
});

// DUMMY DATA

// books dummy data
const book1 = {
  title: "book1",
  genre: "fantasy",
  author: "author1",
  bookId: "b1",
};
const book2 = {
  title: "book2",
  genre: "fantasy",
  author: "author1",
  bookId: "b2",
};
const book3 = {
  title: "book3",
  genre: "sci-fi",
  author: "author2",
  bookId: "b3",
};
const book4 = {
  title: "book4",
  genre: "mystery",
  author: "author3",
  bookId: "b4",
};
const book5 = {
  title: "book5",
  genre: "horror",
  author: "author4",
  bookId: "b5",
};
const booksDummyData = [book1, book2, book3, book4, book5];

// insert booksDummyData into books collection
db.books.insertMany(booksDummyData);

// customers dummy data
const customer1 = {
  firstName: "first1",
  lastName: "last1",
  customerId: "c1",
  wishlist: [
    {
      bookId: "b1",
    },
    {
      bookId: "b2",
    },
  ],
};
const customer2 = {
  firstName: "first2",
  lastName: "last2",
  customerId: "c2",
  wishlist: [
    {
      bookId: "b3",
    },
    {
      bookId: "b4",
    },
  ],
};
const customer3 = {
  firstName: "first3",
  lastName: "last3",
  customerId: "c3",
  wishlist: [
    {
      bookId: "b5",
    },
    {
      bookId: "b2",
    },
  ],
};
const customer4 = {
  firstName: "first4",
  lastName: "last4",
  customerId: "c4",
  wishlist: [
    {
      bookId: "b4",
    },
    {
      bookId: "b5",
    },
  ],
};
const customer5 = {
  firstName: "first5",
  lastName: "last5",
  customerId: "c5",
  wishlist: [
    {
      bookId: "b3",
    },
    {
      bookId: "b1",
    },
  ],
};

const customersDummyData = [
  customer1,
  customer2,
  customer3,
  customer4,
  customer5,
];

// insert customersDummyData into customers collection
db.customers.insertMany(customersDummyData);

// QUERIES

// display all books
db.books.find();

// display books by specified genre
db.books.find({ genre: "fantasy" });

// display books by specified author
db.books.find({ author: "author2" });

// display book by specified bookId
db.books.find({ bookId: "b5" });
