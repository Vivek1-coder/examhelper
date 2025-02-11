import mongoose, { Schema, Document } from "mongoose";

export interface INotification extends Document {
    message: string;
    createdAt: Date;
}

const NotificationSchema: Schema = new Schema({
    message: {
        type: String,
        required: true,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const NotificationModel = mongoose.models.Notification || mongoose.model<INotification>("Notification", NotificationSchema);
export default NotificationModel;
