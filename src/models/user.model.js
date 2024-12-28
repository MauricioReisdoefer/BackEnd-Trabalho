const {Model, DataTypes} = require('sequelize');

function defineUser(sequelize)
{
    class User extends Model{
        static associate(models){
            User.hasMany(models.Post);
            User.hasMany(models.Topic);
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