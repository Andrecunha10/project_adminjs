import moment from 'moment';
import { ReportProduct } from '../model/reportProduct.entity';

class ReportProductController {
     constructor () {

     }

     async get({select_date, start_date, end_date}: any){

        let match: any = {
            "$match": {
                "date": {
                    "$gte": new Date(start_date),
                    "$lte": new Date(end_date+'T20:59:59'),
                }
            }
        }
        
        if(start_date === '' || end_date === ''){
            let dateFrom: any;

            if (select_date === 'custom') {
                dateFrom = moment().subtract(7,'d').format('YYYY-MM-DD');
            } else {
                dateFrom = moment().subtract(parseInt(select_date),'d').format('YYYY-MM-DD');
            }
            
            match = {
                "$match": {
                    'date': {
                        $gte: new Date(dateFrom)
                    }
                }
            };
        }      

        return await ReportProduct.aggregate([
            match,
            {
                $group:{
                    _id: "$name",
                    sum: {
                        $sum:{
                            "$toInt": "$value"
                        }
                    }
                }
            },
            {
                "$sort": {
                    "sum": -1
                }
            },
            { $limit: 6}
        ]);
     }
}

export default ReportProductController;