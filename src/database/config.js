import mongoose from 'mongoose';

export const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.URI_MONGO_DB);     // 2.(mongodb+srv://'backend53140:CoderCoder@cluster.ftieihd.mongodb.net/ecommerce');        //1. despues de "net/ecommerce"como ej, colocar el nombre de la base de datos que quiero que se conecte. 
        console.log('Base de datos OnLine');
    } catch (error) {
        console.log(`Error al levantar la base de datos ${error}`);
        process.exit(1);
    }
}
