const jwt = require("jsonwebtoken")
const errorTypes = require("../errors.js");
exports.ensureLoggedIn = async function ensureLoggedIn(req, res, next){
    const token  = req.headers.authorization;
    console.log(token);
    let decoded;
    try{
        decoded = jwt.verify(token, 'senhasupersecreta');
    } catch(error){
        const newError = new errorTypes.authError("User not logged in. Token invalid");
        console.log(error)
        next(newError);
    }
    console.log(decoded)
    req.user_id = decoded;
    next();
}
