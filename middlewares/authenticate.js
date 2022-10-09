const jwt = require("jsonwebtoken");
const { User } = require("../models/modelUsers");
const { SECRET_KEY } = process.env;
const { requestError } = require('../helpers/index');


const authenticate = async (req, res, next) => {
    try {

        const {authorization = ""} = req.headers;
        const [bearer = "", token = ""] = authorization.split(" ");
        if(bearer !== "Bearer") {
            throw requestError(401);
        }
        try {
            const {id} = jwt.verify(token, SECRET_KEY)
            const user = await User.findById(id);
            if(!user || !user.token) {
                throw requestError(401);
            }
            req.user = user;
            next()
        }
        catch(error) {
            throw requestError(401, error.message);
        }
    } catch (error) {
        next(error)
    }
} 



// const guard = async (req, res, next) => {
//   const token = req.get("Authorization")?.split(" ")[1];
//   // const bearer = req.get("Authorization")?.split(" ")[0];

//   if (!verifyToken(token)) {
//     return res.status(HttpCode.UNAUTHORIZED).send({
//       status: "error",
//       code: HttpCode.UNAUTHORIZED,
//       message: "Not authorized",
//     });
//   }

//   const payload = jwt.decode(token);
//   const user = await usersRepository.findById(payload.id);

//   if (!user || user.token !== token) {
//     return res.status(HttpCode.UNAUTHORIZED).send({
//       status: "error",
//       code: HttpCode.UNAUTHORIZED,
//       message: "Not authorized",
//     });
//   }
//   req.user = user; // res.locals.user = user
//   next();
// };


module.exports = authenticate;