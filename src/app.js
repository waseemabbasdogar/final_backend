import express from 'express'
import cors from 'cors'; // cross origin
import cookieParser from 'cookie-parser'; //

const app = express()

app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json({limit : "16kb"}));
app.use(express.urlencoded({extended : true, limit : "15kb"}));
app.use(express.static("public"));

app.use(cookieParser()) // to use user's browser cookie

export { app }


