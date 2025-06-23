import express, { Request, Response } from 'express';
import { Books } from '../models/books.model';
import { Borrow } from '../models/borrow.model';

export const borrowRoutes = express.Router();


borrowRoutes.post('/',async(req: Request,res: Response)=>{
     const bookId = req.body.book;
     const requestQuantity = req.body.quantity;

     const book = await Books.findById(bookId);
     
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
borrowRoutes.get('/',async(req: Request,res: Response)=>{
        
        const data = await Borrow.aggregate([
         //   stage-1
         {$group:{_id: "$book", totalQuantity: {$sum: "$quantity"}}},
         //   stage-2
         {$lookup: {from: "books",localField: "_id",foreignField: "_id",as:"bookDetails"}},
         //   stage-3
         {$unwind: "$bookDetails"},
         //   stage-4
         {$project:{_id:0,book:{title: "$bookDetails.title",isbn: "$bookDetails.isbn"},totalQuantity: 1}}
        ])

        res.status(201).json({
           success: true,
           message: "Find all borrow books Successfully",
           data
        })
})