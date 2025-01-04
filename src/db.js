const {Sequelize} = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite', // Especifica o driver SQLite
    storage: './BD.sqlite' // Caminho do arquivo SQLite
});

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

module.exports = {
    sincronizaBanco,
    models: Models
};