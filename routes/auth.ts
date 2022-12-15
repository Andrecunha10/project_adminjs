import {Router} from 'express';
import { IResult, UserController } from '../controller/userController';

const auth = Router();

const userCtrl = new UserController();

auth.get('/confirm-email', (req, res) => {
    return res.render('confirm-email')
});

auth.post('/confirm-email', async (req, res) => {
        //TODO: user email para localizar o usuário.

        const result: IResult = await userCtrl.confirmEmail(req.body.pin);
        return res.status(result.statusCode).send({message: result.msg});
});

export {auth};