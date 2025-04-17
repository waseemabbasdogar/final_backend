import { v2 as cloudinary } from "cloudinary";
import fs from 'fs';

const uploadFile = async (localPathFile)=> {
    try {
        if(!localPathFile) return null;
        // upload a file
        const response = await cloudinary.uploader.upload(localPathFile, {
            resource_type : "auto"
        })
        // file has been uploaded successfully
        console.log("file has uploaded", response.url);
        fs.unlinkSync(localPathFile);
        return response;

    } catch (error) {
        fs.unlinkSync(localPathFile);
        return null;
    }
};

export { uploadFile };