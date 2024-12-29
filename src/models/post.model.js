const {Model, DataTypes} = require('sequelize');

function definePost(sequelize){
    class Post extends Model{
        static associate(models){
            Post.belongsTo(models.User,{
                as: "user",
                foreignKey: "user_id"
            });
            Post.belongsTo(models.Topic, {
                as: "topic",
                foreignKey: "topic_id"
            });
        }
    }
    Post.init({
        posttitle: DataTypes.STRING,
        text: DataTypes.STRING,
        topic_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
        },
        {
            sequelize: sequelize,
            modelName: "post"
        }
    );

    return Post;
}

module.exports = definePost;
