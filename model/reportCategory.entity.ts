import mongoose from 'mongoose';
const { Schema, model } = mongoose;

interface IReportCategory{
    name: String;
    value: Number;
    date: Date;
}

const reportCategorySchema = new Schema<IReportCategory>(
    {
        name: String,
        value:  Number,
        date: Date,
    },
    {timestamps: true}
);

export const ReportCategory = model<IReportCategory>('ReportCategory', reportCategorySchema);