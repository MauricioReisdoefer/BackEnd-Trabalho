const {Model, DataTypes} = require('sequelize');

function defineTopic(sequelize){
    class Topic extends Model{
        static associate(models){
            Topic.belongsTo(models.User);
            Topic.hasMany(models.Post);
        }
    }
    Topic.init({
        topicname: DataTypes.STRING,
        description: DataTypes.STRING,
        },
        {
            sequelize: sequelize,
            modelName: "topic"
        }
    );

    return Topic;
}

module.exports = defineTopic;