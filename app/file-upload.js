const multer = require('multer');
var storage = multer.diskStorage({
    destination:(req , file ,cb)=>{
        cb(null, "uploads/")
    },

    filename: (req, file,cb)=>{
        const ext = file.originalname.split('.').pop()
        const newName = Date.now() +"."+ ext
        cb(null, newName)
    }
    })
    const upload = multer({
        storage:storage,
        limits:{fileSize:2000000},
        fileFilter:(req , file ,cb)=>{
            if (file.mimetype == "image/jpeg" || file.mimetype == "image/jpg" || file.mimetype == "image/png"){
                cb(null, true)
            } else {
                cb(null, false)
                return cb(new Error("Invalid file"))
            }
        }
    })


    module.exports = upload