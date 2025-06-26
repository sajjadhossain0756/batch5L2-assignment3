import mongoose from 'mongoose';
import app from './app';



const PORT = 'https://batch5-l2-assignment3-ooghvaoe9-sajjads-projects-4b88a90f.vercel.app/';


async function main() {
    try {

        await mongoose.connect('mongodb+srv://LibraryManagement:IBKnDN1L9dItKbEX@cluster0.ahkjv.mongodb.net/libraryManagementApp?retryWrites=true&w=majority&appName=Cluster0');
        console.log('server connected with mongodb!!')

        app.listen(PORT, () => {
            console.log(`Server is listen http://localhost:${PORT}`);
        })
    } catch (error) {
        console.log(error)
    }
}

main();