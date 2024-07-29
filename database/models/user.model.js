import {BOOLEAN, DataTypes } from 'sequelize'
import sequelize from '../dbConnection.js'
 export const userModel = sequelize.define('user',{
    id:{
        type:DataTypes.INTEGER(100),
        primaryKey:true,
        autoIncrement:true
    },
    username:{
     type:DataTypes.STRING(100),
     allowNull:false
    },
    email:{
     type:DataTypes.STRING(100),
     unique:true,
     allowNull:false

    },
    password:{
     type:DataTypes.STRING(100),
     allowNull:false
    },
    loginStatus:{
        type:DataTypes.BOOLEAN,
        defaultValue:false,
        allowNull:false

    }
 })


