import { Document, model, Schema } from "mongoose";

export interface BirthdayInt extends Document {
    discordId: string;
    birthday: string;
}

export const Birthday = new Schema({
    discordId: String,
    birthday: String,
});

export default model("birthday", Birthday);