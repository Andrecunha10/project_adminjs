import mongoose from 'mongoose';
const { Schema, model } = mongoose;

interface IReportUser{
    value: Number;
    date: Date;
}

const reportUserSchema = new Schema<IReportUser>(
    {
        value:  Number,
        date: Date,
    },
    {timestamps: true}
);

export const ReportUser = model<IReportUser>('ReportUser', reportUserSchema);