const {Model, DataTypes} = require('sequelize');

function defineUser(sequelize)
{
    class User extends Model{
        static associate(models){
                User.hasMany(models.Post, {
                    foreignKey: 'user_id'
                });
            User.hasMany(models.Topic, {
                foreignKey: 'user_id'
            });
        }
    }
    User.init({
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        email: DataTypes.STRING
        },
        {
            sequelize: sequelize,
            modelName: "user"
        }
    );
    return User;
}

module.exports = defineUser;