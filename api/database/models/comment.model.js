import {DataTypes } from 'sequelize'
import sequelize from '../dbConnection.js'
import { userModel } from './user.model.js';
import { postModel } from './post.model.js';

export const commentModel =  sequelize.define('comment',{
    content:{
     type:DataTypes.STRING(100)
    },
  } )
 userModel.hasMany(postModel, {
    foreignKey: 'authorId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });
  postModel.belongsTo(userModel, { foreignKey: 'authorId' });
  
  postModel.hasMany(commentModel, {
    foreignKey: 'postId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });
  commentModel.belongsTo(postModel, { foreignKey: 'postId' });
  
  userModel.hasMany(commentModel, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });
  commentModel.belongsTo(userModel, { foreignKey: 'userId' });