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