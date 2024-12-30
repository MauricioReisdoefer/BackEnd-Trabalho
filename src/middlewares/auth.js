const jwt = require("jsonwebtoken")
exports.ensureLoggedIn = async function ensureLoggedIn(req, res){
    const token  = req.headers.authorization;
    console.log(token);
    let decoded;
    try{
        decoded = await jwt.verify(token, 'senhasupersecreta');
    } catch(error){
        return res.status(401).json({ err: "Token Falso" });
    }
    res.json(decoded);
}
