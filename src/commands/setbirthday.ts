import { ApplicationCommandOptionData, CommandInteraction } from "discord.js";
import { Command } from "../interfaces/CommandInt";
import { DB } from '../config';

export default class extends Command {
    months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    name = 'setbirthday';
    description = 'Set your birthday'
    options: ApplicationCommandOptionData[] = [
        {
            name: 'month',
            description: 'Month of birth',
            type: 'STRING',
            required: true,
            choices: this.months.map((arg) => ({
                name: arg,
                value: arg
            }))
        },
        {
            name: 'day',
            description: 'Day of birth',
            type: 'INTEGER',
            required: true
        },
        {
            name: 'year',
            description: 'Year of birth',
            type: 'INTEGER',
            required: false
        },
    ]
    async slashRun(interaction: CommandInteraction): Promise<void> {
        let month = this.months.indexOf(interaction.options.getString('month')!);
        let day = interaction.options.getInteger('day')!;
        let year = interaction.options.getInteger('year') || 0;
        
        const dateString = new Date(year, month, day).toDateString(); // default year is 1900; means user has not supplied year

        let targetBirthdayData = await interaction.client.mongo.collection(DB.BIRTHDAYS).findOne({ discordId: interaction.user.id });

        if (!targetBirthdayData) {
            await interaction.client.mongo.collection(DB.BIRTHDAYS).insertOne({
                discordId: interaction.user.id,
                birthday: dateString
            });
        } else {
            await interaction.client.mongo.collection(DB.BIRTHDAYS).findOneAndUpdate(
                { discordId: interaction.user.id },
                { $set: { birthday: dateString }}
            )
        }
        return interaction.reply({ content: `Your birthday has been set to: ${dateString}`, ephemeral: true });
    }
}