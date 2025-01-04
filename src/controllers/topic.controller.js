const errorTypes = require("../errors.js");
const { models } = require("../db.js");

exports.createTopic = async function createTopic(req, res, next){
    try{
        const { title_, text_ } = req.body;
        if (!title_ || !text_) {
            throw new errorTypes.validationError("Body em formato incompleto");
        }
        const user = await models.User.findByPk(req.user_id);
        if(!user){
            throw new errorTypes.notFoundError("Usuário não encontrado", 404);
        }
        const newTopic = await models.Topic.create({
            topicname: title_,
            description: text_,
            user_id: req.user_id
        })
        res.status(201).json(newTopic.toJSON());
    } catch(err){
        next(err);
    }
} //

exports.getTopic = async function getTopic(req, res, next){
    try{
        const topic_id_ = req.params['id'];
        const topic = await models.Topic.findByPk(topic_id_);
        if (!topic) {
            throw new errorTypes.notFoundError("Tópico não encontrado", 404)
        }
        res.json(topic.toJSON());
    } catch(err){
        next(err);
    }
}

exports.removeTopic = async function removeTopic(req, res, next){
    try {
        const topic_id_ = req.params['id'];
        const topic = await models.Topic.findByPk(topic_id_);
        if (!topic) {
            throw new errorTypes.notFoundError("Tópico não encontrado", 404);
        }
        if(req.user_id == topic.user_id)
        {
            await topic.destroy();
            return res.json({message : "Destruído com Sucesso", topic: topic.toJSON()})
        }
        throw new errorTypes.authError("Não é dono do tópico", 401);
    } catch(err){
        next(err);
    }
}

exports.updateTopic = async function updateTopic(req, res, next){
    try{
        const topic_id_ = req.params['id'];
        const { title_, text_,} = req.body;
        if(!title_ && !text_){
            throw new errorTypes.validationError("Body em formato incompleto");
        }
        const topic = await models.Topic.findByPk(topic_id_);
        if (!topic) {
            throw new errorTypes.notFoundError("Tópico não encontrado", 404);
        }
        if(req.user_id == topic.user_id)
        {
            if (title_ != undefined){ topic.topicname = title_};
            if (text_ != undefined){ topic.description = text_};
            await topic.save();
            res.json({ message: "Usuário atualizado com sucesso", topic: topic.toJSON()});
        }
        throw new errorTypes.validationError("Não é dono do tópico", 401);
    } catch(err){
        next(err);
    }
}

exports.getTopicPosts = async function getTopicPosts(req, res, next){
    try{
        const topic_id_ = req.params['id'];
        const topic = await models.Topic.findByPk(topic_id_);
        if (!topic) {
            // TODO: NotFoundError
            throw new errorTypes.validationError(`Tópico com id ${topic_id_} não encontrado`, 404);
        }

        const allPosts = await models.Post.findAll({
            where:{topic_id: topic_id_}
        })
        res.json({
            topic: topic.toJSON(),
            posts: allPosts
        });
    } catch(err){
        next(err);
    }
}

exports.getAllTopics = async function getAllTopics(req, res, next){
    try{
        const topics = await models.Topic.findAll()
        if(!topics){
            return res.status(404).json({ error: "Nenhum Tópico Encontrado" });
        }
        res.json(topics)
    } catch(err){
        return err
    }
}