const {Model, DataTypes} = require('sequelize');

function defineTopic(sequelize){
    class Topic extends Model{
        static associate(models){
            Topic.belongsTo(models.User, {
                as: "user",
                foreignKey: "user_id"
            });
            Topic.hasMany(models.Post, {
                as: "post",
                foreignKey: "topic_id"
            });


        }
    }
    Topic.init({
        topicname: DataTypes.STRING,
        description: DataTypes.STRING,
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
        },
        {
            sequelize: sequelize,
            modelName: "topic"
        }
    );

    return Topic;
}

module.exports = defineTopic;