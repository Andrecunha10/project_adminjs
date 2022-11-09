import { IUser, User } from "../model/user.entity";
import { Mail } from "../utils/mail";

export type IResult = {
    statusCode: number
    msg: string
}

export class UserController {

    public async confirmEmail(pin: string):Promise<IResult> {
        let result:IResult = {
            statusCode: 200,
            msg: ''
        };

        try {
            const user = await User.findOne({
                where:{
                    pin
                }
            });

            if(user){
                await User.update({
                    active: true,
                    pin:''
                },
                {where:{
                    pin
                }}
            )
            result.msg = "E-mail validado com sucesso!";
            }else{
                result.msg='Token inválido.';
                result.statusCode = 400
            }
        } catch (error) {
            result = {
                msg: 'Erro ao validar e-mail. Tente Novamente.',
                statusCode: 400
            }
        }

        return result

    }

    public sendToken(user: IUser): void{
        const mail = new Mail();
        
        try {
            if(user.pin){                
                mail.sendMail(user.name, user.email, user.pin)
            }
            return
        } catch (error) {
            console.log(`Erro ao enviar e-mail ${error}`)
        }
    }
}