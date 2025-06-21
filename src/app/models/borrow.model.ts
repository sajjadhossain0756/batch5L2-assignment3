import { model, Schema } from "mongoose";
import { Iborrow } from "../interfaces/borrow.interface";

const borrowSchema = new Schema<Iborrow>({
    book: {
        type: Schema.Types.ObjectId,
        ref: "Books",
        required: true
    },
    quantity: {type: Number,required: true},
    dueDate: {type: String,required:true}
}, {
    versionKey: false,
    timestamps: true
}
);

export const Borrow = model("Borrow", borrowSchema)