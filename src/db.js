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
}

sincronizaBanco();
module.exports = Models