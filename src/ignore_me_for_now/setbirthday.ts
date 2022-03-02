import { CommandInt } from "../interfaces/CommandInt";
import BirthdayModel from "../database/models/BirthdayModel";

export const setbirthday: CommandInt = {
    name: 'setbirthday',
    description: 'Set your birthday',
    slash: false,
    run: async (message) => {
        const{ author, channel, content } = message;
        const date = content.split(" ").slice(1).join(" "); // exclude the command name
        
        let targetBirthdayData = await BirthdayModel.findOne({ discordId: author.id });
        if (!targetBirthdayData) {
            targetBirthdayData = await BirthdayModel.create({
                discordId: author.id,
                birthday: date
            });
        }

        await message.reply(`Your birthday has been set to ${date}`);
    }
}