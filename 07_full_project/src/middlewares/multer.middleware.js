// basic sa dekhege ki multer kaise kam karega 


/// multer ki documentation pad li github wlae se 



import multer from "multer"


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(">>> [DEBUG] Multer destination called for file:", file.originalname);
    cb(null, "./public/temp")
  },
  filename: function (req, file, cb) {
    console.log(">>> [DEBUG] Multer filename called for file:", file.originalname);
    cb(null, file.originalname)
  }
  
})

export const upload = multer
({
     storage: storage
     })