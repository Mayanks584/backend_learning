import { asyncHandler } from "../utils/asysnchandler.js"


const register = asyncHandler( async (req, res) => {

        res.status(200).json({
        message:"ok"
    })
})

// ye method kab run karega usko btane ke liye hum routes bnate hai 

export {register}