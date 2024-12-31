const jwt = require("jsonwebtoken")
const errorTypes = require("../errors.js");
exports.ensureLoggedIn = async function ensureLoggedIn(req, res, next){
    const token  = req.headers.authorization;
    console.log(token);
    let decoded;
    try{
        decoded = await jwt.verify(token, 'senhasupersecreta');
    } catch(error){
        const newError = new errorTypes.authError("User not logged in. Token invalid");
        next(newError);
    }
    req.user_id = decoded.user_id;
    next();
}
