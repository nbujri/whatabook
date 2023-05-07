import pymongo
from pymongo import MongoClient

# Establish a connection to the MongoDB server
client = MongoClient("mongodb://localhost:27017")

# Connect to the desired database
db = client["your_database_name"]

# Define helper functions
def display_books(books):
    print("List of Books:")
    for book in books:
        print(f"{book['_id']}: {book['title']} by {book['author']} - Genre: {book['genre']}")
    print("\n")

def get_genres(books):
    genres = set()
    for book in books:
        genres.add(book['genre'])
    return list(genres)

def get_books_by_genre(genre):
    return db.books.find({"genre": genre})

def get_customer_wishlist(customer_id):
    customer = db.customers.find_one({"_id": customer_id})
    if customer:
        return db.books.find({"_id": {"$in": [item["book_id"] for item in customer["wishlist"]]}})
    else:
        return None

# Display a list of books
books = db.books.find()
display_books(books)

# Display a list of books by genre
genres = get_genres(db.books.find())
print("Genres:")
for i, genre in enumerate(genres, 1):
    print(f"{i}. {genre}")

selected_genre = int(input("\nEnter the number of the genre you want to display books for: ")) - 1
if 0 <= selected_genre < len(genres):
    books_by_genre = get_books_by_genre(genres[selected_genre])
    display_books(books_by_genre)
else:
    print("Invalid genre selection.\n")

# Display a customer's wishlist by customerId
customer_id = input("Enter a customerId (e.g., c1007, c1008, or c1009): ")
wishlist = get_customer_wishlist(customer_id)
if wishlist:
    print(f"Wishlist for Customer {customer_id}:")
    display_books(wishlist)
else:
    print("Invalid customerId.\n")

# Close the connection to the MongoDB server
client.close()
