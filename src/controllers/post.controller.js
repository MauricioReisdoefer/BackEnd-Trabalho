const models = require("../db.js");
exports.createPost = async function createPost(req, res){
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
}

exports.getPost = async function getPost(req, res){
    const post_id_ = req.params['id'];
    const post = await models.Topic.findByPk(post_id_);
    if (!post) {
        return res.status(404).json({ error: "Post Não Encontrado" });
    }
    res.json(post.toJSON());
}

exports.deletePost = async function deletePost(req, res){
    const post_id_ = req.params['id'];
    const post = await models.User.findByPk(post_id_);
    if (!post) {
        return res.status(404).json({ error: "Post Não Encontrado" });
    }
    await post.destroy();
    res.json({message : "Destruído com Sucesso", post: post.toJSON()})
}

exports.updatePost = async function updatePost(req, res){
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
}