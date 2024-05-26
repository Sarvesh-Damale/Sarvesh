import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null,"public/images")
    },
    filename:function (req, file, cb){
        const name=Date.now()+ "-" + file.originalname;
        console.log(name)
        cb(null,name);
    }
})

 const fileupload=multer({storage:storage})

 export default fileupload;
