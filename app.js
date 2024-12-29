const express = require('express');
const app = express();
const PORT = 8080;
const models = require("./src/db.js")

app.use(express.json());

app.post("/CreateUser", async (req, res) =>{
    const { username_, password_, email_ } = req.body;
    const newUser = await models.User.create({
        username: username_,
        password: password_,
        email: email_
    })
    console.log(newUser)
    res.json(newUser.toJSON());
})

app.get("/GetUser/:id", async (req, res) =>{
    const user_id_ = req.params['id'];
    const user = await models.User.findByPk(user_id_);
    if (!user) {
        return res.status(404).json({ error: "Usuário Não Encontrado" });
    }
    res.json(user.toJSON());
})

app.put("/UpdateUser/:id", async (req, res) => {
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

app.get("/RemoveUser/:id", async (req, res) => {
    const user_id_ = req.params['id'];
    const user = await models.User.findByPk(user_id_);
    if(!user){
        return res.status(404).json({ error: "Usuário Não Encontrado" })
    }
    await user.destroy();
    res.json({message : "Destruído com Sucesso", user: user.toJSON()})
})

app.get("/AllUsers", async (req, res) =>{
    
})

app.post("/CreateTopic", async (req, res) =>{
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

app.get("/GetTopic/:id", async (req, res) =>{
    const topic_id_ = req.params['id'];
    const topic = await models.Topic.findByPk(topic_id_);
    if (!topic) {
        return res.status(404).json({ error: "Tópico Não Encontrado" });
    }
    res.json(topic.toJSON());
})

app.get("/RemoveTopic/:id", async (req, res) => {
    const topic_id_ = req.params['id'];
    const topic = await models.Topic.findByPk(topic_id_);
    if (!topic) {
        return res.status(404).json({ error: "Tópico Não Encontrado" });
    }
    await topic.destroy();
    res.json({message : "Destruído com Sucesso", topic: topic.toJSON()})
})

app.put("/UpdateTopic/:id", async (req, res) => {
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

app.post("/CreatePost", async (req, res) =>{
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

app.get("/GetPost/:id", async (req, res) =>{
    const post_id_ = req.params['id'];
    const post = await models.Topic.findByPk(post_id_);
    if (!post) {
        return res.status(404).json({ error: "Post Não Encontrado" });
    }
    res.json(post.toJSON());
})

app.get("/RemovePost/:id", async (req, res) => {
    const post_id_ = req.params['id'];
    const post = await models.User.findByPk(post_id_);
    if (!post) {
        return res.status(404).json({ error: "Post Não Encontrado" });
    }
    await post.destroy();
    res.json({message : "Destruído com Sucesso", post: post.toJSON()})
})

app.put("/UpdatePost/:id", async (req, res) => {
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

app.get("/GetUser/Topics/:id", async (req, res) => {
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

app.get("/GetUser/Posts/:id", async (req, res) => {
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

app.get("/GetTopic/Posts/:id", async (req, res) =>{
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

app.listen(PORT, ()=>{
    console.log(`App listening on port ${PORT}`);
});