import mongoose from 'mongoose';
const { Schema, model } = mongoose;

interface IReportProduct{
    name: String;
    value: Number;
    date: Date;
}

const reportProductSchema = new Schema<IReportProduct>(
    {
        name: String,
        value:  Number,
        date: Date,
    },
    {timestamps: true}
);

export const ReportProduct = model<IReportProduct>('ReportProduct', reportProductSchema);