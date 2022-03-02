import { CommandInteraction } from "discord.js";
import { CommandInt } from "../interfaces/CommandInt";

export default class extends CommandInt {
    name = 'hello';
    description = 'Hello world!';
    async slashRun(interaction: CommandInteraction): Promise<void> {
        await interaction.reply(`Hello World!`);
    }
}