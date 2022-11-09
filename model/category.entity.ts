import { Optional, Model, DataTypes } from "sequelize";
import db from '../db'


interface ICategory {
    id: number,
    name: string,
    createdAt: Date,
    updatedAt: Date
}

export type CategoryCreationAtributes = Optional<ICategory, 'id'>;

export class Category extends Model<ICategory, CategoryCreationAtributes> {
        declare id: number;
        declare name: string;
        declare createdAt: Date;
        declare updatedAt: Date;
}

Category.init(
    {
        id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        createdAt:{
            type: DataTypes.DATE
        },
        updatedAt: {
            type: DataTypes.DATE
        },
    },
    {
        sequelize: db,
        tableName: 'categories',
        modelName: 'category'
    }
)