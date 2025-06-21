import express, { Request, Response } from 'express';
import { Books } from '../models/books.model';

export const booksRoutes = express.Router();


booksRoutes.post('/',async(req: Request,res: Response)=>{
     const body = req.body;

     const books = await Books.create(body);

     res.status(201).json({
        success: true,
        message: "Books created Successfully",
        books
     })
})
booksRoutes.get('/',async(req: Request,res: Response)=>{
      
    const books = await Books.find();

    res.status(201).json({
        success: true,
        message: "Books retrieved successfully",
        books
    })
})
booksRoutes.get('/:bookId',async(req: Request,res: Response)=>{
      
    const bookId = req.params.bookId;
    const book = await Books.findById(bookId);

    res.status(201).json({
        success: true,
        message: "Book retrieved successfully",
        book
    })
})
booksRoutes.put('/:bookId',async(req: Request,res: Response)=>{
      
    const bookId = req.params.bookId;
    const updateBook = req.body;
    const book = await Books.findByIdAndUpdate(bookId,updateBook,{new: true});

    res.status(201).json({
        success: true,
        message: "Book updated successfully",
        book
    })
})
booksRoutes.delete('/:bookId',async(req: Request,res: Response)=>{
      
    const bookId = req.params.bookId;
    const book = await Books.findByIdAndDelete(bookId);

    res.status(201).json({
        success: true,
        message: "Book deleted successfully",
        data: null
    })
})