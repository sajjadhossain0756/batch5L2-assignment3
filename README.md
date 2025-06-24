
##             ::Library Management API with Express, TypeScript, MongoDB & Mongoose::

###      Live Link of this Project: https://batch5-l2-assignment3.vercel.app/

## Introduction: 
welcome to the library Management System! This Project is a Super backend API built
for managing books and borrowing operations within a library. In this project we will create a new
book with details to our books collection And borrow book details we will post to borrow collection
In mongodb atlas database. also we can update,delete,get data from database.


## Used Technologies:

###  Typescript:# For type-safe and scaleable javascript development.
###  Express: A fast, unopinionated, minimalist web framework for node.js .
###  MongoDB: A flexible NoSQL document database.
###  Mongoose: An elegent mongoDB object modeling for node.js, providing schema-based
###  Solutions to model your applications data.


## List of API Routes:

#  Books Related API:
### Post: /api/books/, this route we can create a new books data to database;
### Get: /api/books/, this route we find all books data from database;
### Get: /api/books/:bookId, this route we find a books by this bookId;
### Put: /api/books/:bookId,  this route we can update books data by bookId;
### Delete: /api/books/:bookId, this route we can delete a book by bookId;

#  Borrow Books Related API:
### Post: /api/borrow/, this route we can create a borrow books details with referencing bookId,
### borrow quantity and duedate.
### Get: /api/borrow/, this route we can see how many time one book borrowed and totalQuantities of
### borrow copies