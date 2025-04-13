import { v2 as cloudinary } from "cloudinary";
import fs from 'fs';

cloudinary.config({
    cloud_name : process.env.CLAUDINAY_CLOUD_NAME,
    api_key : process.env.CLAUDINAY_CLOUD_API,
    api_secret : process.env.CLAUDINAY_CLOUD_SECRET
});


const uploadFile = async (localFilePath)=>{
    try {
        if(!localFilePath) return null;

        // upload file
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type : "auto"
        });
        // file has been uploaded successfully
        // console.log("file is uploaded", response.url);
        fs.unlinkSync(localFilePath);
        return response;
        
    } catch (error) {
        fs.unlinkSync(localFilePath)
        return null;
    }
};


export { uploadFile }
