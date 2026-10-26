
/*

so basically sir tell us ki humko database se bat karni hai har jagah to iska ke util 

folder me ik function bna le jis se main isko call kar pau har jagah 


high order function - jo parameter or function dono ko aceppt kar sakte ahi 


*/

/*

const asyn = () => {}

    const asyn = (fucn) => () => {}

        const asyn = (func) => async () => {}

            */

// const asyncHandler = (fn) => async (req,res,next) => {

//     try{

//         await fn(req,res,next)

//     }
//     catch(error){
//         res.status(error.code || 500 ).json({

//             success : false,
//             message: error.message
//         })
//     }

// }

const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
    }
}

/*

go and search nodeapi error

*/

export { asyncHandler }

