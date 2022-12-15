import mongoose from 'mongoose';
import { Sequelize } from 'sequelize';

require('dotenv').config();

export const sequelize = new Sequelize(`mysql://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, {
    dialect: 'mysql'
},);


mongoDB()
    .then(result => console.log("Acessou o MongoDB."))
    .catch(err => console.log(err));

export async function mongoDB() {
  await mongoose.connect('mongodb://localhost:27017/report-database');
}