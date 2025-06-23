import { model, Schema } from "mongoose";
import { Ibooks } from "../interfaces/books.interface";


const booksSchema = new Schema<Ibooks>({
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true },
    genre: {
        type: String,
        enum: ["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"],
        required: true
    },
    isbn: { type: String, required: true, unique: true },
    description: String,
    copies: { 
        type: Number, 
        required: true, 
        min: [0,`Copies must be a positive number, got {VALUE}`] 
    },
    available: {
        type: Boolean,
        default: true
    }
}, {
    versionKey: false,
    timestamps: true
}
);

export const Books = model("Books", booksSchema);