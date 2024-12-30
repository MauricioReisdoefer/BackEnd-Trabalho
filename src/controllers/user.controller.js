const models = require("../db.js");
const jwt = require("jsonwebtoken")

exports.createUser = async function createUser(req, res){
    const { username_, password_, email_ } = req.body;
    const newUser = await models.User.create({
        username: username_,
        password: password_,
        email: email_
    })
    console.log(newUser)
    res.json(newUser.toJSON());
}

exports.getUser = async function getUser(req, res){
    const user_id_ = req.params['id'];
    const user = await models.User.findByPk(user_id_);
    if (!user) {
        return res.status(404).json({ error: "Usuário Não Encontrado" });
    }
    res.json(user.toJSON());
}

exports.updateUser = async function updateUser(req, res){
    const user_id_ = req.params['id'];
    const { username_, password_, email_ } = req.body;
    const user = await models.User.findByPk(user_id_);
    if(!user){
        return res.status(404).json({ error: "Usuário Não Encontrado" })
    }

    if (username_ != undefined){ user.username = username_};
    if (password_ != undefined){ user.password = password_};
    if (email_ != undefined){ user.email = email_};
    await user.save();

    res.json({ message: "Usuário atualizado com sucesso", user: user.toJSON()});
}

exports.removeUser = async function removeUser(req, res){
    const user_id_ = req.params['id'];
    const user = await models.User.findByPk(user_id_);
    if(!user){
        return res.status(404).json({ error: "Usuário Não Encontrado" })
    }
    await user.destroy();
    res.json({message : "Destruído com Sucesso", user: user.toJSON()})
}

exports.allUsers = async function allUsers(req, res){
    const allUsers = await models.User.findAll();
    if(!allUsers){
        return res.status(404).json({ error: "Não Existem Usuários" })
    }
    res.json(allUsers);
}

exports.userTopics = async function userTopics(req, res){
    const user_id_ = req.params['id'];
    const user = await models.User.findByPk(user_id_);
    if (!user) {
        return res.status(404).json({ error: "Usuário Não Encontrado" });
    }
    const allTopics = await models.Topic.findAll({
        where:{user_id: user_id_}
    })
    res.json({
        user: user.toJSON(),
        topics: allTopics
    });
}

exports.userPosts = async function userPosts(req, res){
    const user_id_ = req.params['id'];
    const user = await models.User.findByPk(user_id_);
    if (!user) {
        return res.status(404).json({ error: "Usuário Não Encontrado" });
    }
    const allPosts = await models.Post.findAll({
        where:{user_id: user_id_}
    })
    res.json({
        user: user.toJSON(),
        topics: allPosts
    });
}

exports.userLogin = async function userLogin(req, res){
    const user_id_ = req.params['id'];
    const user = await models.User.findByPk(user_id_);
    if (!user) {
        return res.status(404).json({ error: "Usuário Não Encontrado" });
    }
    const newToken = jwt.sign({user_id: user_id_}, 'senhasupersecreta');
    const decodedToken = jwt.decode(newToken);
    res.json({ 
        message: "Login do User",
        webtoken: newToken,
        decoded: decodedToken,
    })
}
