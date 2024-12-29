const express = require('express')
const router = express.Router()
const models = require("../db.js");

router.post("/CreatePost", async (req, res) =>{
    const { title_, text_, userid, topicid} = req.body;
    const user = await models.User.findByPk(userid);
    if(!user){
        return res.status(404).json({ error: "Usuário Inexistente"});
    }
    const topic = await models.Topic.findByPk(topicid);
    if(!topic){
        return res.status(404).json({ error: "Tópico Inexistente"});
    }
    const newPost = await models.Post.create({
        posttitle: title_,
        text: text_,
        user_id: userid,
        topic_id: topicid
    })
    console.log(newPost)
    res.json(newPost.toJSON());
})

router.get("/GetPost/:id", async (req, res) =>{
    const post_id_ = req.params['id'];
    const post = await models.Topic.findByPk(post_id_);
    if (!post) {
        return res.status(404).json({ error: "Post Não Encontrado" });
    }
    res.json(post.toJSON());
})

router.get("/RemovePost/:id", async (req, res) => {
    const post_id_ = req.params['id'];
    const post = await models.User.findByPk(post_id_);
    if (!post) {
        return res.status(404).json({ error: "Post Não Encontrado" });
    }
    await post.destroy();
    res.json({message : "Destruído com Sucesso", post: post.toJSON()})
})

router.put("/UpdatePost/:id", async (req, res) => {
    const post_id_ = req.params['id'];
    const { title_, text_} = req.body;
    const post = await models.User.findByPk(post_id_);
    if (!post) {
        return res.status(404).json({ error: "Post Não Encontrado" });
    }
    if (title_ != undefined){ post.posttitle = title_};
    if (text_ != undefined){ post.text = text_};
    await post.save();

    res.json({ message: "Post atualizado com sucesso", post: post.toJSON()});
})

module.exports = router;