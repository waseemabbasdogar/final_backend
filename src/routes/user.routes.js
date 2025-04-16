import { Router } from "express";
import { registerUser } from "../controllers/user.controllers.js";

import { upload } from "../middlewares/multer.middlewares.js";

const router = Router();


// get user details from frontend.
router.route('/register').post(
    upload.fields([
        {
            name : "avatar",
            maxCount : 1
        },
        {
            name : "coverImage",
            maxCount : 2
        }
    ]),
    registerUser)


export default router