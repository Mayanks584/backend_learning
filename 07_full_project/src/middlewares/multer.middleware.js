// basic sa dekhege ki multer kaise kam karega 


/// multer ki documentation pad li github wlae se 



import multer from "multer"


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./pulic/temp")
  },
  filename: function (req, file, cb) {
 // original ko change karna to dekh li 
      cb(null, file.originalname)
    }
  
})

export const upload = multer
({
     storage: storage
     })