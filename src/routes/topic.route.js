const express = require('express')
const router = express.Router()
const models = require("../db.js");


router.post("/CreateTopic", async (req, res) =>{
    const { title_, text_, userid} = req.body;
    const user = await models.User.findByPk(userid);
    if(!user){
        return res.status(404).json({ error: "Usuário Inexistente"});
    }
    const newTopic = await models.Topic.create({
        topicname: title_,
        description: text_,
        user_id: userid
    })
    console.log(newTopic)
    res.json(newTopic.toJSON());
})

router.get("/GetTopic/:id", async (req, res) =>{
    const topic_id_ = req.params['id'];
    const topic = await models.Topic.findByPk(topic_id_);
    if (!topic) {
        return res.status(404).json({ error: "Tópico Não Encontrado" });
    }
    res.json(topic.toJSON());
})

router.get("/RemoveTopic/:id", async (req, res) => {
    const topic_id_ = req.params['id'];
    const topic = await models.Topic.findByPk(topic_id_);
    if (!topic) {
        return res.status(404).json({ error: "Tópico Não Encontrado" });
    }
    await topic.destroy();
    res.json({message : "Destruído com Sucesso", topic: topic.toJSON()})
})

router.put("/UpdateTopic/:id", async (req, res) => {
    const topic_id_ = req.params['id'];
    const { title_, text_,} = req.body;
    const topic = await models.Topic.findByPk(topic_id_);
    if (!topic) {
        return res.status(404).json({ error: "Tópico Não Encontrado" });
    }

    if (title_ != undefined){ topic.topicname = title_};
    if (text_ != undefined){ topic.description = text_};
    await topic.save();

    res.json({ message: "Usuário atualizado com sucesso", topic: topic.toJSON()});
})


router.get("/GetTopic/Posts/:id", async (req, res) =>{
    const topic_id_ = req.params['id'];
    const topic = await models.Topic.findByPk(topic_id_);
    if (!topic) {
        return res.status(404).json({ error: "Tópico Não Encontrado" });
    }

    const allPosts = await models.Post.findAll({
        where:{topic_id: topic_id_}
    })
    res.json({
        topic: topic.toJSON(),
        posts: allPosts
    });
})

module.exports = router;