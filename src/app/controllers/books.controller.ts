import express, { Request, Response } from 'express';
import { Books } from '../models/books.model';

export const booksRoutes = express.Router();


booksRoutes.post('/', async (req: Request, res: Response) => {
    try {
        const body = req.body;
        body.available = true,
        body.copies = Number(body.copies),
        console.log(body)
        const books = await Books.create(body);

        res.status(201).json({
            success: true,
            message: "Books created Successfully",
            books
        })
    } catch (error: unknown) {
        if (error.name === 'ValidationError') {
            console.log("Mongoose Validation Error Caught:", error);

            return res.status(400).json({
                message: "Validation Failed",
                success: false,
                error: {
                    name: error.name,
                    error: error.errors
                }
            })
        }else if(error.code === 11000){
                const field = Object.keys(error.keyValue)[0];
                const value = error.keyValue[field];
                return res.status(409).json({
                    message: `Duplicate Entry: A book with this ${field} ${value} already exist`,
                    success: false,
                    error:{
                        name: "MongoError",
                        code: error.code,
                        keyValue: error.keyValue
                    }
                })
        }else{
            console.error('Unhandled Server Error:', error);
            return res.status(500).json({
                message: "An Unexpected Server Error Occured.",
                success: false,
                error:{
                    name: error.name || "Internal Server Error",
                    message: error.message || "Something Went On the server"
                }
            })
        }
        // console.log(error)
    }
})
booksRoutes.get('/', async (req: Request, res: Response) => {

    const genre = req.query.genre;
    const sortBy = req.query.sortBy;
    const sort = req.query.sort;
    const parseJson = JSON.parse(`{"${sortBy}": "${sort}"}`);
    const limit = Number(req.query.limit) || 10;
    console.log(Number(limit));

    let books = []
    if (genre) {
        books = await Books.find({ genre: genre }).sort(parseJson).limit(limit);
    }
    else {
        books = await Books.find()
    }


    res.status(201).json({
        success: true,
        message: "Books retrieved successfully",
        books
    })
})
booksRoutes.get('/:bookId', async (req: Request, res: Response) => {

    const bookId = req.params.bookId;
    const book = await Books.findById(bookId);

    res.status(201).json({
        success: true,
        message: "Book retrieved successfully",
        book
    })
})
booksRoutes.patch('/:bookId', async (req: Request, res: Response) => {

    const bookId = req.params.bookId;
    const updateBook = req.body;
    if(updateBook.copies === 0){
        updateBook.available = false;
    }else{
        updateBook.available = true
    }
    
    // const book = await Books.findByIdAndUpdate(bookId, updateBook, { new: true });
    const book2 = await Books.findOneAndUpdate({ _id: bookId }, updateBook, { new: true });

    res.status(200).json({
        success: true,
        message: "Book updated successfully",
        book2
    })
})
booksRoutes.delete('/:bookId', async (req: Request, res: Response) => {

    const bookId = req.params.bookId;
    await Books.findByIdAndDelete(bookId);

    res.status(201).json({
        success: true,
        message: "Book deleted successfully",
        data: null
    })
})