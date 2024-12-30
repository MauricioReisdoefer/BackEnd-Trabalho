const models = require("../db.js");

exports.createTopic = async function createTopic(req, res){
    const { title_, text_ } = req.body;
    const user = await models.User.findByPk(req.user_id);
    if(!user){
        return res.status(404).json({ error: "Usuário Inexistente"});
    }
    const newTopic = await models.Topic.create({
        topicname: title_,
        description: text_,
        user_id: req.user_id
    })
    res.status(201).json(newTopic.toJSON());
}

exports.getTopic = async function getTopic(req, res){
    const topic_id_ = req.params['id'];
    const topic = await models.Topic.findByPk(topic_id_);
    if (!topic) {
        return res.status(404).json({ error: "Tópico Não Encontrado" });
    }
    res.json(topic.toJSON());
}

exports.removeTopic = async function removeTopic(req, res){
    const topic_id_ = req.params['id'];
    const topic = await models.Topic.findByPk(topic_id_);
    if (!topic) {
        return res.status(404).json({ error: "Tópico Não Encontrado" });
    }
    if(req.user_id == topic.user_id)
    {
        await topic.destroy();
        return res.json({message : "Destruído com Sucesso", topic: topic.toJSON()})
    }
    return res.status(401).json({error: "Não é o dono do Tópico"});
}

exports.updateTopic = async function updateTopic(req, res){
    const topic_id_ = req.params['id'];
    const { title_, text_,} = req.body;
    const topic = await models.Topic.findByPk(topic_id_);
    if (!topic) {
        return res.status(404).json({ error: "Tópico Não Encontrado" });
    }
    if(req.user_id == topic.user_id)
    {
        if (title_ != undefined){ topic.topicname = title_};
        if (text_ != undefined){ topic.description = text_};
        await topic.save();
        res.json({ message: "Usuário atualizado com sucesso", topic: topic.toJSON()});
    }
    return res.status(401).json({error: "Não é o dono do Tópico"});
}

exports.getTopicPosts = async function getTopicPosts(req, res){
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
}