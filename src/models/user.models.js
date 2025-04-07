import mongoose, {Schema} from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const userSchema = new Schema({
    username : {
        type : String,
        required : true,
        lowercase : true,
        unique : true,
        index : true
    },
    email : {
        type : String,
        required : true,
        lowercase : true,
        unique : true,
    },
    fullName : {
        type : String,
        required : true,
        lowercase : true,
        unique : true,
    },
    password : {
        type : String,
        required : [true, "password must"],
        unique : true,
    },
    avatar : {
        type : String,  // cluadinary url
        required : true,
    },
    coverImage : {
        type : String,  // from claudinary url
        required : true
    },
    watchHistory : [
        {
            type : Schema.Types.ObjectId,
            ref : "url"
        }
    ],
    refreshToken : {
        type : String,
        required : true
    }
}, {
    timestamps : true
});


userSchema.pre("save", async function (next){
    if(this.isModified("password")) return next();
    this.password = bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.isPasswordCorrect = async function (password){
    return await bcrypt.compare(password, this.password)
};

userSchema.methods.generateAccessToken =  function () {
    jwt.sign(
        {
            _id : this._id,
            email : this.email,
            username : this.username,
            fullName : this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn : ACCESS_TOKEN_EXPIRY
        }
    )
};

userSchema.methods.generateAccessToken =  function () {
    jwt.sign(
        {
            _id : this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn : REFRESH_TOKEN_EXPIRY
        }
    )
};

export const User = mongoose.model("User", userSchema);