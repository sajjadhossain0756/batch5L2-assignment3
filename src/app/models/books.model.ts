import { model, Schema } from "mongoose";
import { booksStaticMethods, Ibooks } from "../interfaces/books.interface";


const booksSchema = new Schema<Ibooks, booksStaticMethods>({
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
        type: Boolean
    }
}, {
    versionKey: false,
    timestamps: true
}
);

booksSchema.static("availableStatus", function(newCopies: number){
    const newAvailabilityStatus = newCopies > 0;
    return newAvailabilityStatus;
})

booksSchema.pre('save',function(){
    if(this.copies >= 0){
        this.available = false
    }else{
        this.available = true;
    }
    
    console.log(this);
})

export const Books = model<Ibooks, booksStaticMethods>("Books", booksSchema);