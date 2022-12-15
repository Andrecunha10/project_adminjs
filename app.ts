import AdminJS, { ValidationError } from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import express from 'express';
import {sequelize, mongoDB} from './db';
import * as AdminJSSequelize from '@adminjs/sequelize';
import * as AdminJSMongoose from '@adminjs/mongoose';
import bodyParser from 'body-parser';
const bcrypt = require('bcrypt');

import session from 'express-session';
const MySQLStore = require('express-mysql-session')(session);

import { Category } from "./model/category.entity";
import { Product } from './model/products.entity';
import { User } from './model/user.entity';
import { ReportCategory } from './model/reportCategory.entity';
import { ReportProduct } from './model/reportProduct.entity';
import { ReportUser } from './model/reportUser.entity';

import {auth} from './routes/auth';
import hbs from 'hbs';
import { UserController } from './controller/userController';
const path = require('node:path');

require('dotenv').config();

const PORT = process.env.PORT_HOST;
const userCtrl = new UserController();

import cookieKey from './utils/cookieKey';
import setResources from './utils/setResources';
import { report } from './routes/report';

sequelize.sync()
    .then(result => console.log("Acessou o Sequelize."))
    .catch(err => console.log(err));

mongoDB();


AdminJS.registerAdapter({
    Resource: AdminJSSequelize.Resource,
    Database: AdminJSSequelize.Database
});

AdminJS.registerAdapter({
    Resource: AdminJSMongoose.Resource,
    Database: AdminJSMongoose.Database
  });

const start = async () => {
    const adminOptions = {
        resources:[
            setResources(ReportCategory),
            setResources(ReportProduct),
            setResources(ReportUser),
            setResources(Category),
            setResources(Product),
            setResources(User, 
                {
                    encryptedPassword: {
                        isVisible: {
                            list: false, edit: false, create: false, show: false
                        },
                    },
                    password: {
                        type: 'password',
                        isVisible: {
                            list: false, edit: true, create: true, show: false
                        },
                        isRequired: true
                    },
                    active: {
                        isVisible: {
                            list: true, edit: false, create: false, show: true
                        },
                    },
                    pin: {
                        isVisible: {
                            list: false, edit: false, create: false, show: false
                        },
                    },
                },
                {
                    new: {
                        before: async (request: any) => {
                            // const user = await User.findOne({
                            //     where: {
                            //         email: request.payload.email
                            //     }
                            // })
                            // if(user) {
                            //     throw new ValidationError({
                            //         email: {
                            //             message: 'User Already Exists!'
                            //         }
                            //     })
                            // }                             
                            request.payload.encryptedPassword = await bcrypt.hash(request.payload.password, 10);
                            request.payload.pin = Math.floor(100000 + Math.random() * 900000).toString();

                            userCtrl.sendToken(request.payload);
                    
                            return request;
                        }
                    },
                    edit: {
                        before: async (request: any) => {
                            if (request.payload.password) {
                                request.payload.encryptedPassword = await bcrypt.hash(request.payload.password, 10)
                            }
                            return request
                        }
                    }
                }
            )
        ],
        rootPath: '/admin',
        dashboard: {
            handler: async () => {},
            component: AdminJS.bundle('./components/dashboard')
        },
        branding:{
            logo: 'https://latuapizza.netlify.app/static/media/logo_mobile.71fcb308b79062714ab8c07b745dc9a0.svg',
            companyName: 'La Tua Pizza',
            favicon: '/static/favicon.ico'
        }
    };

    const app = express();
   
    const admin = new AdminJS(adminOptions);

    const sessionStore = new MySQLStore({
        connectionLimit: 10,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        createDatabaseTable: true
    });

    // const adminRouter = AdminJSExpress.buildRouter(admin);
    const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
        admin,
        {
            authenticate: async (email, password) => {
                const user = await User.findOne({
                    where: {
                        email
                    }
                })
                if (user){
                    const verifyPassword = await bcrypt.compare(password, user.encryptedPassword);
                    if(verifyPassword) {
                        // if (user.role === 'user'){
                        //    return
                        // }
                        if(user.active){
                            return user
                        }else{
                            userCtrl.sendToken(user);
                            return false
                        }                        
                    }
                }
                return false
            },
            cookieName: 'adminJs',
            cookiePassword: cookieKey(),
        },
        null,
        {
            store: sessionStore as any,
            saveUninitialized: true,
            secret: cookieKey(),
            cookie: {
              httpOnly: process.env.NODE_ENV === 'production',
              secure: process.env.NODE_ENV === 'production',
            },
            name: 'adminjs'
        },
    );
    
    app.use(express.json());
    hbs.registerPartials(path.join(__dirname, 'views'));
    app.set('view engine', 'hbs');
    app.use(admin.options.rootPath, adminRouter);
    app.use(bodyParser.urlencoded({extended: true}));
    app.use('/auth', auth);
    app.use('/report', report);
    app.use('/static', express.static('public'));
    app.listen(PORT, () => {
        console.log(`Projeto rodando na porta ${PORT}`)
    });
}

start();