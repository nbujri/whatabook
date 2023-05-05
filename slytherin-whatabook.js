/**
 * title: slytherin-whatabook.js
 * author: ngi bujri, janis gonzalez, william egge
 * date: may 5 2023
 * description: script to build and populate MongoDB collection
 */

// drop collections
db.books.drop();
db.customers.drop();
db.wishlistItems.drop();

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

// create wishlistItems collection
db.createCollection("wishlistItems", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["bookId", "customerId"],
      properties: {
        bookId: {
          bsonType: "string",
        },
        customerId: {
          bsonType: "string",
        },
      },
    },
  },
});

// DUMMY DATA

// books dummy data
const booksDummyData = [];
// create new documents and push to booksDummyData
for (let i = 0; i < 5; i++) {
  const newBook = {
    title: `title${i + 1}`,
    genre: `genre${i + 1}`,
    author: `author${i + 1}`,
    bookId: `b${i}`,
  };
  booksDummyData.push(newBook);
}
// insert documents from booksDummyData
db.books.insertMany(booksDummyData);

// customers dummy data
const customersDummyData = [];
// create new documents and push to customersDummyData
for (let i = 0; i < 5; i++) {
  const newCustomer = {
    firstName: `firstName${i + 1}`,
    lastName: `lastName${i + 1}`,
    customerId: `c${i}`,
    wishlist: [],
  };
  customersDummyData.push(newCustomer);
}
// insert documents from customersDummyData
db.customers.insertMany(customersDummyData);

// wishlistItems dummy data
const wishlistItemsDummyData = [];
// create new documents and push to wishlistItemsDummyData
for (let i = 0; i < 5; i++) {
  const newWishlistItem = {
    bookId: `b${i}`,
    customerId: `c${i}`,
  };
  wishlistItemsDummyData.push(newWishlistItem);
}
// insert documents from wishlistItemsDummyData
db.wishlistItems.insertMany(wishlistItemsDummyData);
