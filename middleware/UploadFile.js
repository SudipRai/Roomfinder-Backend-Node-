const express =require("express")
const multer=require("multer")
const path=require("path")
const app=express()

const storage=multer.diskStorage({
    destination:'./upload/images',
    filename:(req,file,cb)=>{
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})




const filefilter = function (req, file, cb) {
     console.log(file.mimetype)
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        cb(null, true)
    }
    else {
        cb(null, false)
    }
}
const upload=multer({
    storage:storage,
    filefilter:filefilter
})

module.exports = upload;