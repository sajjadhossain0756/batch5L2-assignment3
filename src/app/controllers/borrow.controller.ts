import express, { Request, Response } from 'express';
import { Books } from '../models/books.model';
import { Borrow } from '../models/borrow.model';

export const borrowRoutes = express.Router();

borrowRoutes.post('/',async(req: Request,res: Response)=>{
     const bookId = req.body.book;
     const requestQuantity = req.body.quantity;

     const book = await Books.findById(bookId);
     console.log(book);
     if(!book){
        throw new Error('Book Not Found')
     }
     if(!book.available || book.copies < requestQuantity){
        throw new Error('Not enough copies available for this book.')
     }

     const newCopies = book.copies - requestQuantity;
     const newAvailabilityStatus = newCopies > 0;

     const updateBook = await Books.findByIdAndUpdate(
        bookId,
        {
            $set: {
                copies: newCopies,
                available: newAvailabilityStatus
            }
        }
     );
     if(!updateBook){
        throw new Error('updatebook not found')
     }
     const body = req.body;
     const borrow = await Borrow.create(body);

     res.status(201).json({
        success: true,
        message: 'Book borrowed successfully ',
        borrow
     })
})