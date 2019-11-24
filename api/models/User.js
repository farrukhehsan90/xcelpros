const sequelize=require('sequelize');
const db=require('../../config/db');


    const User=db.define('users',{
        firstName:{
            type:sequelize.STRING
        },
        lastName:{
        type:sequelize.STRING
    },
    email:{
        type:sequelize.STRING,
        allowNull:false
    },
    password:{
        type:sequelize.STRING,
        allowNull:false
    },
    phone:{
        type:sequelize.STRING
    },
    dateOfBirth:{
        type:sequelize.DATE
    }
},{
    freezeTableName:true
});

module.exports=User;