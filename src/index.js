/*

// This is approach to connect with db by import all required data in index.js file

// Firstly import mongoose becuase we have to connect db through mongoose.
import mongoose from "mongoose"


import { DB_NAME } from "./constants.js"; // to give db name in mongoose.connect with URI, so we have to import db name from constants

*/



// require('dotenv').config({path : '/.env'})  // import or require dotenv as to available all env. variables as soon as index.js file loads
import dotenv from 'dotenv'
import connectDB from "./db/index.js";

dotenv.config({
    path : '/.env'
})  // to use this go in package.json and add in "dev" -r dotenv/config --experimental-json-modules


connectDB()   // to connect with db 
.then(()=>{
    app.listen(process.env.PORT || 8000, ()=>{
        console.log(` Server is listening on port ${process.env.PORT}`);
    })
})
.catch((error)=>{
    console.log('MONGO DB Connection failed. !!!!', error);
})


















// also import express to use app.on functions 
// import express from "express"
// const app = express();


// we can connect db directly in index.js file by using
// function connectDB(){}

// connectDB()     


// but better to use IIFI (;) instead above function
// ;( async ()=> {
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
//         app.on("error", ()=> {
//             console.log("app is not able to connect db", error);
//             throw error
//         })  // using app.on as soon as db connect loads this.

//         app.listen(process.env.PORT, ()=> {
//             console.log("server is listening at port: ${process.env.PORT}")
//         })
//     } catch (error) {
//         console.log("MONGODB connection not supported", error);
//         throw error;
//     }
// })



/* 
The above mention approach in which imported mongoose, express, db name in index.js file and as file run db connect app loads, but this approach pollutes the index.js file, so a better approach can be used by defining db in another folder and importing in index.js file.
*/























