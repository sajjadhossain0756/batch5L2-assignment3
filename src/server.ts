import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';

let server: Server;

const PORT = 5001;


async function main() {
    try {

        await mongoose.connect('mongodb+srv://LibraryManagement:IBKnDN1L9dItKbEX@cluster0.ahkjv.mongodb.net/libraryManagementApp?retryWrites=true&w=majority&appName=Cluster0');
        console.log('server connected with mongodb!!')

        server = app.listen(PORT, () => {
            console.log(`Server is listen http://localhost:${PORT}`);
        })
    } catch (error) {
        console.log(error)
    }
}

main();