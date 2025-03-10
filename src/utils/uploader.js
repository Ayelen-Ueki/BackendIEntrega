import multer from "multer";
import __dirname from "./dirname.js";
import path from "path";


const storage = multer.diskStorage({
    //puedo darle el nombre que yo quiera al segundo parametro(en tanto coincida con el nombre asignado a la variable de file) o debe ser si o si file?
    destination:(req,prodImg,callback) =>{callback(null,path.join(__dirname,"/public/img"))},
    filename:(req, prodImg, callback) =>{callback(null, `${Date.now()}-${prodImg.originalname}`)}
})

const uploader = multer({storage : storage});

export default uploader