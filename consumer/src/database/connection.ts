import mongoose from "mongoose"

export async function connect(){
    try {
        const db = (await mongoose.connect(process.env.MONGODB_URL!)).connection
        return db
    } catch (error) {
        console.error("MongoDB Connection Error:", error);
        process.exit(1);
    }
}


