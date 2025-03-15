import multer from "multer";
import __dirname from "./dirname.js";
import path from "path";


const storage = multer.diskStorage({
    destination:(req,prodImg,callback) =>{callback(null,path.join(__dirname,"/public/img"))},
    filename:(req, prodImg, callback) =>{callback(null, `${Date.now()}-${prodImg.originalname}`)}
})

const uploader = multer({storage : storage});

export default uploader