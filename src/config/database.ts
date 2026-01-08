import mongoose from 'mongoose';

export const connectDB = async () =>{
    try {
    
       await mongoose.connect("mongodb+srv://sammi:120209@cluster0.x893w.mongodb.net/?appName=Cluster0")
        //mongodb+srv://sammi:120209@cluster0.wva9k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
        console.log('MongoDB подключена успешно');
    } catch (err) {
        console.error('Ошибка подключения:', err);
        process.exit(1);
    }
}