"""
Title: console_application.py
Written by: Ngi Bujri, Janis Gonzalez, William Egge
Description: a console application that allows a user to interact with the whatabook database
Date: May 12th 2023
"""

# Import statements
import pymongo
from pymongo import MongoClient

# Establish a connection to the server
client = MongoClient("mongodb+srv://web335_user:s3cret@bellevueuniversity.up6klva.mongodb.net/web335DB?retryWrites=true&w=majority")

# Connect to the database
db = client['web335DB']

# Display all documents in the books collection
def display_books(books):
    print("List of Books:")
    for book in books:
        print(f"{book['bookId']}: {book['title']} by {book['author']} - Genre: {book['genre']}")
    print("\n")

# Get a list of all genres in the books collection
def get_genres(books):
    genres = set()
    for book in books:
        genres.add(book['genre'])
    return list(genres)

# Get all books in a given genre
def get_books_by_genre(genre):
    return db.books.find({"genre": genre})

# Get a customer's wishlist
def get_customer_wishlist(customer_id):
    customer = db.customers.find_one({"customerId": customer_id})
    if customer:
        return db.books.find({"bookId": {"$in": [item["bookId"] for item in customer["wishlist"]]}})
    else:
        return None

# Display all books
books = db.books.find()
display_books(books)

# Display all genres
genres = get_genres(db.books.find())
print("Genres:")
for i, genre in enumerate(genres, 1):
    print(f"{i}. {genre}")

# Display all books in a given genre
selected_genre = int(input("\nEnter the number of the genre you want to display books for: ")) - 1
if 0 <= selected_genre < len(genres):
    books_by_genre = get_books_by_genre(genres[selected_genre])
    display_books(books_by_genre)
else:
    print("Invalid genre selection.\n")

# Display a customer's wishlist
customer_id = input("Enter a customerId (e.g., c1, c2, or c3): ")
wishlist = get_customer_wishlist(customer_id)
if wishlist:
    print(f"Wishlist for Customer {customer_id}:")
    display_books(wishlist)
else:
    print("Invalid customerId.\n")

# Close the connection
client.close()