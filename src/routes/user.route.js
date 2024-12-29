const express = require('express')
const router = express.Router()
const models = require("../db.js");


router.post("/CreateUser", async (req, res) =>{
    const { username_, password_, email_ } = req.body;
    const newUser = await models.User.create({
        username: username_,
        password: password_,
        email: email_
    })
    console.log(newUser)
    res.json(newUser.toJSON());
})

router.get("/GetUser/:id", async (req, res) =>{
    const user_id_ = req.params['id'];
    const user = await models.User.findByPk(user_id_);
    if (!user) {
        return res.status(404).json({ error: "Usuário Não Encontrado" });
    }
    res.json(user.toJSON());
})

router.put("/UpdateUser/:id", async (req, res) => {
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
})

router.get("/RemoveUser/:id", async (req, res) => {
    const user_id_ = req.params['id'];
    const user = await models.User.findByPk(user_id_);
    if(!user){
        return res.status(404).json({ error: "Usuário Não Encontrado" })
    }
    await user.destroy();
    res.json({message : "Destruído com Sucesso", user: user.toJSON()})
})

router.get("/AllUsers", async (req, res) =>{
    const allUsers = await models.User.findAll();
    if(!allUsers){
        return res.status(404).json({ error: "Não Existem Usuários" })
    }
    res.json(allUsers);
})


router.get("/GetUser/Topics/:id", async (req, res) => {
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
})

router.get("/GetUser/Posts/:id", async (req, res) => {
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
})

module.exports = router;