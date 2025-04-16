import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from '../utils/apiError.js';

// const registerUser = asyncHandler( async (req, res) => {
//     res.status(200).json({
//         message : "ok"
//     })
// } );

const registerUser = asyncHandler( async (req, res) => {
    // get user details from frontend
    // validation (not empty)
    // check user already exist by username or email
    // check for images (check for avatar)
    // upload them on cloudinay (avatar)
    // create user Object -- create entry in db
    // remove password and fresh token fields from response.
    // check for user creation 
    // return response

    const {fullName, username, email, password} = req.body;
    console.log("email", email);
    
    // validation of fields.

    // if(fullName === ""){
    //     throw new apiError(400, 'full name is required.')
    // };
    if(
        [fullName, email, password, username].some((field) => field?.trim() === "")
    ){
        throw new apiError(400, 'all fields are required.')
    }

} );

export {registerUser}