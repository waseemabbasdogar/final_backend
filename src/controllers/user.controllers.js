import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from '../utils/apiError.js';
import { User } from '../models/user.models.js';
import { uploadFile } from "../utils/claudinary.js";
import { apiResponse } from '../utils/apiResponse.js';

// const registerUser = asyncHandler( async (req, res) => {
//     res.status(200).json({
//         message : "ok"
//     })
// } );

const registerUser = asyncHandler( async (req, res) => {
    // 1. get user details from frontend
    // 2. validation (not empty)
    // 3. check user already exist by username or email
    // 4. check for images (check for avatar)
    // 5. upload them on cloudinay (avatar)
    // 6. create user Object -- create entry in db
    // 7. remove password and fresh token fields from response
    // 8. check for user creation 
    // 9. return response


    // 1. get user details from frontend
    const {fullName, username, email, password} = req.body;
    console.log("email", email);
    

    // 2. validation (not empty)

    // if(fullName === ""){
    //     throw new apiError(400, 'full name is required.')
    // };
    if(
        [fullName, email, password, username].some((field) => field?.trim() === "")
    ){
        throw new apiError(400, 'all fields are required.')
    }

    // 3. check user already exist by username or email
    const exitedUser = User.findOne({
        $or : [{ username }, { email }]
    });

    if(exitedUser) {
        throw new apiError(409, 'User with email and username already exited.')
    }


    // 4. check for images (check for avatar)
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if(!avatarLocalPath) {
        throw new apiError(400, "avatar image is must.")
    }


    // 5. upload them on cloudinay (avatar)
    const avatar = await uploadFile(avatarLocalPath);
    const coverImage = await uploadFile(coverImageLocalPath);

    if(!avatar){
        throw new apiError(400, "avatar image is must.");
    }


    // 6. create user Object -- create entry in db
    const user = await User.create({
        fullName,
        avatar : avatar.url,
        coverImage : coverImage?.url || "",
        email,
        password,
        username : username.toLowerCase()
    })


    // 7. remove password and fresh token fields from response
    const createdUser = await User.findById(_id).select(
        "-password -refreshToken"
    )

    // 8. check for user creation
    if(!createdUser){
        throw new apiError(500, "something went wrong while registering a user.")
    }


    // 9. return response
    return res.status(201).json(
        new apiResponse(200, createdUser, 'User registered successfully.')
    )

} );

export {registerUser}