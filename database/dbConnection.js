import { Sequelize,DataTypes } from "sequelize";

const sequelize = new Sequelize('sequelize2', 'root', '', {
    host: 'localhost',
    dialect:'mysql' 
  });

sequelize.authenticate().then(()=>{
    console.log('Connection has been established successfully.');

}).catch((err)=>{
    console.error('Unable to connect to the database:');
})
export default sequelize