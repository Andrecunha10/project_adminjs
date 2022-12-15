 import {Model, Optional, DataTypes} from 'sequelize';
 import {sequelize} from '../db';

 export interface IUser {
    id: number;
    name: string;
    email: string;
    userName: string;
    encryptedPassword: string;
    role: string;
    active: boolean;
    pin: string | null;
    createdAt: Date;
    updatedAt: Date;
 }

 export type UserCreationAttributes = Optional<IUser, 'id'>;

export class User extends Model <IUser, UserCreationAttributes> {
    declare id: number;
    declare name: string;
    declare email: string;
    declare userName: string;
    declare encryptedPassword: string;
    declare role: string;
    declare active: boolean;
    declare pin: string | null;
    declare createdAt: Date;
    declare updatedAt: Date;
}

User.init(
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
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        userName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        encryptedPassword: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.ENUM('admin', 'user'),
            allowNull: false,
            defaultValue: 'user'
        },
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        pin: {
            type: DataTypes.STRING(6),
            allowNull: true
        },
        createdAt: {            
            type: DataTypes.DATE,
        },
        updatedAt: {
            type: DataTypes.DATE,
        },

    },
    {
        sequelize,
        tableName: 'users',
        modelName: 'user'
    }
)