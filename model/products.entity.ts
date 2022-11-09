import { Optional, Model, DataTypes } from 'sequelize';
import db from '../db';

interface IProduct {
    id: number,
    name: number,
    description: string,
    price: number,
    category: number,
    createdAt: Date,
    updatedAt: Date
}

export type ProductCreationAttributes = Optional<IProduct, 'id'>;

export class Product extends Model<IProduct, ProductCreationAttributes> {
    declare id: number;
    declare name: number;
    declare description: string;
    declare price: number;
    declare category: number;
    declare createdAt: Date;
    declare updatedAt: Date;
}

Product.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        price: {
            type: DataTypes.REAL,
            allowNull: false
        },
        category: {
            type: new DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'categories',
                key: 'id'
            }
        },
        createdAt: {
            type: DataTypes.DATE
        },
        updatedAt: {
            type: DataTypes.DATE
        }
    },
    {
        sequelize: db,
        tableName: 'products',
        modelName: 'product'
    }
)