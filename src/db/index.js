import mongoose from "mongoose"  // to connect db

import { DB_NAME } from "../constants.js" // db name required so imported

const connectDB = async () => {
    try {
        const connectionIstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n MongoDB connected !! DB Host: ${connectionIstance.connection.host}`)
    } catch (error) {
        console.log("MONGODB connection FAILED.", error);
        process.exit(1)
    }
}

export default connectDB