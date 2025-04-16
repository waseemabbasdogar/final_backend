import mongoose, {mongo, Schema} from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = new Schema({
    username : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true,
        index : true
    },
    fullName : {
        type : String,
        required : true,
        unique : true,
        index : true
    },
    email : {
        type : String,
        required : true,
        unique : true,
    },
    password : {
        type : String,
        required : true,
        unique : true,
    },
    avatar : {
        type : String, // from cloudinary
        required : true,
        unique : true,
    },
    coverImage : {
        type : String, // from cloudinary
        required : true,
    },
    watchHistory : {
        type : Schema.Types.ObjectId,
        ref : "Video"
    },
    refreshTokens : {
        type : String
    }

}, {
    timestamps : true
});

userSchema.pre("save", async function(localPathFile){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessTokens = function(){
    return jwt.sign({
        _id : this._id,
        username : this.username,
        fullName : this.fullName,
        email : this.email
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn : process.env.ACCESS_TOKEN_EXPIRY
    }
    )
}

userSchema.methods.generateRefreshTokens = function(){
    return jwt.sign({
        _id : this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn : process.env.REFRESH_TOKEN_EXPIRY
    }
    )
}

export const User = mongoose.model("User", userSchema);