import mongoose from "mongoose"

export async function connect(){
    const db = (await mongoose.connect(process.env.MONGODB_URL!)).connection
    db.on('error', console.error.bind(console, 'connection error:'))
    db.once('open', function() {
        console.log("Connected to MongoDB")
    })

    return db
}


