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
      required: ["firstName", "lastName", "customerID"],
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
