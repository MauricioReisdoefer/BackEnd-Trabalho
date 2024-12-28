const {Model, DataTypes} = require('sequelize');

function definePost(sequelize){
    class Post extends Model{
        static associate(models){
            Post.belongsTo(models.User);
            Post.belongsTo(models.Topic);
        }
    }
    Post.init({
        posttitle: DataTypes.STRING,
        text: DataTypes.STRING,
        },
        {
            sequelize: sequelize,
            modelName: "post"
        }
    );

    return Post;
}

module.exports = definePost;
