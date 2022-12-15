import moment from 'moment';
import { ReportUser } from '../model/reportUser.entity';

class ReportUserController {
     constructor () {

     }

     async get({select_date, start_date, end_date}: any){

       
        
        
               let dateFrom = moment().subtract(360,'d').format('YYYY-MM-DD');
            
            
                let match = {
                "$match": {
                    'date': {
                        $gte: new Date(dateFrom)
                    }
                }
            };

        return await ReportUser.aggregate([
            match,
            {
                $group:{
                    _id: {$month: "$date"},
                    sum: {
                        $sum:{
                            "$toInt": "$value"
                        }
                    }
                }
            },
            {
                "$sort": {
                    "_id": 1
                }
            }
        ]);
     }
}

export default ReportUserController;