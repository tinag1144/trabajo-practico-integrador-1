import { Sequelize } from "sequelize";
import "dotenv/config";

export const sequelize = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USER, 
    process.env.DB_PASSWORD, 
    {
  host: 'localhost',
  dialect: "mysql"
});

export const startDb = async () => {
    try {
  await sequelize.authenticate( );
  console.log('Connection has been established successfully.');
  await sequelize.sync({ force: false });
  console.log("Se crearon las tablas.");
  
} catch (error) {
  console.error('Unable to connect to the database:', error);
}
}