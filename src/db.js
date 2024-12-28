const {Sequelize} = require('sequelize');
const { FORCE } = require('sequelize/lib/index-hints');
const sequelize = new Sequelize('sqlite::memory:');

const Models = {
    User: require("./models/user.model.js")(sequelize),
    Topic: require("./models/topic.model.js")(sequelize),
    Post: require("./models/post.model.js")(sequelize)
}



async function sincronizaBanco(){
    await sequelize.sync({force : true});

    for(const modelKey in Models){
        Models[modelKey].associate(Models);
    }

    const newUser = await Models.User.create({
        username: "Allan",
        password: "1234",
        email: "allanreidelas245@gmail.com"
    })

    const newTopic = await Models.Topic.create({
        topicname: "Tópico sobre IFC",
        description: "Professor Alisson"
    })

    const newPost = await Models.Post.create({
        posttitle: "Post sobre o alisson",
        text: "Alisson gordo ovo desgraçado humpty dumpty"
    })

    console.log(newUser.toJSON());
    console.log(newTopic.toJSON());
    console.log(newPost.toJSON());
}


sincronizaBanco();