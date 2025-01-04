const errorTypes = require("../errors.js");
const { models } = require("../db.js");

exports.createPost = async function createPost(req, res, next){
    try {
        const { title_, text_, topicid} = req.body;
        if(!req.body.title_ || !req.body.text_ || !req.body.topicid){
            throw new errorTypes.validationError("Body em formato incorreto")
        }
        const user = await models.User.findByPk(req.user_id);
        if(!user){
            throw new errorTypes.notFoundError("Usuário não encontrado")
        }
        const topic = await models.Topic.findByPk(topicid);
        if(!topic){
            throw new errorTypes.notFoundError("Tópico não encontrado")
        }
        const newPost = await models.Post.create({
            posttitle: title_,
            text: text_,
            user_id: req.user_id,
            topic_id: topicid
        })
        res.status(201).json(newPost.toJSON());
    }
    catch(err) {
        next(err);
    }
}

exports.getPost = async function getPost(req, res, next){
    try{
        const post_id_ = req.params['id'];
        const post = await models.Topic.findByPk(post_id_);
        if (!post) {
            throw new errorTypes.notFoundError("Post não encontrado");
        }
        res.status(200).json(post.toJSON());
    } catch(err){
        next(err);
    }
}

exports.deletePost = async function deletePost(req, res, next){
    try{
        const post_id_ = req.params['id'];
        const post = await models.User.findByPk(post_id_);
        if (!post) {
            throw new errorTypes.notFoundError("Post não encontrado");
        }
        if(post.user_id == req.user_id){
            await post.destroy();
            return res.status(200).json({message : "Destruído com Sucesso", post: post.toJSON()});
        }
        throw new errorTypes.authErrorError("Não é o dono do Post", 401);
    } catch(err){
        next(err);
    }
}

exports.updatePost = async function updatePost(req, res){
    try{
        const post_id_ = req.params['id'];
        const { title_, text_} = req.body;
        const post = await models.User.findByPk(post_id_);
        if (!post) {
            throw new errorTypes.notFoundError("Post não encontrado");
        }
        if(post.user_id == req.user_id)
        {
            if (title_ != undefined){ post.posttitle = title_};
            if (text_ != undefined){ post.text = text_};
            await post.save();
            res.status(200).json({ message: "Post atualizado com sucesso", post: post.toJSON()});
        }
        throw new errorTypes.authError("Não é o dono do Post", 401);
    } catch (err){
        next(err);
    }
}